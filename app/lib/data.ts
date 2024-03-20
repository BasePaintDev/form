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

const VERSIONS_PER_PAGE = 5;
export async function fetchFormById(id: string, currentPage: number) {
  const offset = (currentPage - 1) * VERSIONS_PER_PAGE;
  try {
    const form = await prisma.form.findUnique({
      where: {
        id: id,
      },
      include: {
        versions: {
          orderBy: {
            createdAt: 'desc',
          },
          skip: offset,
          take: VERSIONS_PER_PAGE,
        },
      },
    });
    return form;
  } catch (error) {
    console.error('Database Error: Failed to fetch form');
    throw new Error('Failed to fetch form data.');
  }
}

export async function fetchFormVersionById(id: string) {
  try {
    const form = await prisma.formVersion.findUnique({
      where: {
        id: id,
      },
      include: {
        form: true,
        fields: true,
      },
    });
    return form;
  } catch (error) {
    console.error('Database Error: Failed to fetch form');
    throw new Error('Failed to fetch form data.');
  }
}

export async function fetchVersionCount(id: string) {
  try {
    const formCount = await prisma.formVersion.count({
      where: {
        formId: id,
      },
    });
    return Math.ceil(formCount / VERSIONS_PER_PAGE);
  } catch (error) {
    console.error('Database Error: Failed to fetch form');
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
        fields: true,
      },
    });
    return draft;
  } catch (error) {
    console.error('Database Error: Failed to fetch form');
    throw new Error('Failed to fetch form data.');
  }
}

const ITEMS_PER_PAGE = 5;
export async function fetchFilteredForms(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const forms = await prisma.form.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        versions: {
          where: {
            OR: [
              { status: 'published' },
              { status: 'draft' },
              { status: 'pending' },
            ],
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: { title: 'asc' },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });
    return forms;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch forms.');
  }
}
export async function fetchFilteredFormsCount() {
  try {
    const formsCount = await prisma.form.count({
      orderBy: { title: 'asc' },
    });
    return Math.ceil(formsCount / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch forms count.');
  }
}
