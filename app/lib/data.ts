import { prisma } from '@/db/prisma';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchForms() {
  noStore();

  try {
    const forms = await prisma.form.findMany({
      orderBy: {
        title: 'asc',
      },
    });
    return forms;
  } catch (error) {
    console.error('Database Error: Failed to fetch forms');
    throw new Error('Failed to fetch form data.');
  }
}

export async function fetchFormById(id: string) {
  noStore();

  try {
    const form = await prisma.form.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return form;
  } catch (error) {
    console.error('Database Error: Failed to fetch form');
    throw new Error('Failed to fetch form data.');
  }
}
