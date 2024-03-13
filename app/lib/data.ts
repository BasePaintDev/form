import prisma from '@/db/prisma';

export async function fetchForms() {
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

export async function fetchEditForm(id: string) {
  try {
    let draft = await prisma.formVersion.findFirst({
      where: {
        formId: id,
        status: 'draft',
      },
      include: {
        form: true,
      },
    });
    return draft;
  } catch (error) {
    console.error('Database Error: Failed to fetch form');
    throw new Error('Failed to fetch form data.');
  }
}
