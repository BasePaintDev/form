import prisma from '@/db/prisma';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

export async function fetchForms() {
  noStore();

  try {
    const forms = await prisma.form.findMany({
      orderBy: {
        title: 'asc',
      },
      include: {
        versions: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return forms;
  } catch (error) {
    console.error('Database Error: Failed to fetch forms');
    throw new Error('Failed to fetch form data.');
  }
}

export async function fetchEditFormById(id: string) {
  noStore();

  try {
    let draft = await prisma.formVersion.findFirst({
      where: {
        formId: id,
        OR: [
          {
            status: 'draft',
          },
          {
            status: 'pending',
          },
        ],
      },
      include: {
        form: true,
      },
    });
    if (!draft) {
      draft = await prisma.formVersion.create({
        data: {
          version: '0.0.0001',
          status: 'draft',
          form: {
            connect: {
              id: id,
            },
          },
        },
        include: {
          form: true,
        },
      });
    } else if (draft.status === 'pending') {
      draft = await prisma.formVersion.update({
        where: {
          id: draft.id,
        },
        data: {
          status: 'draft',
        },
        include: {
          form: true,
        },
      });
    }
    revalidatePath('dashboard/forms');
    return draft;
  } catch (error) {
    console.error('Database Error: Failed to fetch form');
    throw new Error('Failed to fetch form data.');
  }
}
