'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import prisma from '@/db/prisma';
import type { FormVersion } from '@prisma/client';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    id?: string[];
    title?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  formId: z.string(),
  formVersionId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  status: z.enum(['draft', 'pending', 'published', 'archived']),
});

const CreateForm = FormSchema.omit({
  formId: true,
  formVersionId: true,
  createdAt: true,
  updatedAt: true,
  status: true,
});

const UpdateForm = FormSchema.omit({
  createdAt: true,
  updatedAt: true,
  status: true,
});

const FieldSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  label: z.string(),
  type: z.enum(['text', 'email', 'password', 'number', 'date', 'textarea']),
  formId: z.string(),
});

const CreateField = FieldSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const UpdateField = FieldSchema.omit({
  createdAt: true,
  updatedAt: true,
  formId: true,
});

function createNewVersion(
  currentVersion: string,
  versionLevel: 'major' | 'minor' | 'patch',
) {
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  switch (versionLevel) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
  }
}

export async function createField(id: string) {
  try {
    const field = await prisma.field.create({
      data: {
        label: 'New Field',
        type: 'text',
        form: {
          connect: {
            id: id,
          },
        },
      },
    });
  } catch (error) {
    console.error('Database Error: Failed to create field', error);
    return { message: 'Database Error: Failed to create field' };
  }
  revalidatePath(`/dashboard/forms/${id}/edit`);
}

export async function deleteField(id: string) {
  try {
    const field = await prisma.field.delete({
      where: { id: id },
    });
  } catch (error) {
    console.error('Database Error: Failed to create field', error);
    return { message: 'Database Error: Failed to create field' };
  }
  revalidatePath(`/dashboard/forms/${id}/edit`);
}

export async function createForm(prevState: State, formData: FormData) {
  let rawFormData = Object.fromEntries(formData);
  const validatedFormData = CreateForm.safeParse(rawFormData);
  if (!validatedFormData.success) {
    const state: State = {
      errors: validatedFormData.error.flatten().fieldErrors,
      message: 'Missing or invalid form data',
    };
    return state;
  }
  const { title } = validatedFormData.data;
  let form;
  try {
    form = await prisma.form.create({
      data: {
        title: title,
      },
    });
  } catch (error) {
    const state: State = {
      message: 'Database Error: Failed to create form',
    };
    return state;
  }
  await editForm(form.id);
  revalidatePath(`/dashboard/forms/${form.id}/edit`);
  redirect(`/dashboard/forms/${form.id}/edit`);
}

export async function updateForm(prevState: State, formData: FormData) {
  let rawFormData = Object.fromEntries(formData);
  let rawFieldData = [];
  for (const [key, value] of Object.entries(rawFormData)) {
    if (key.startsWith('label-') || key.startsWith('type-')) {
      const fieldId = key.substring(key.indexOf('-') + 1);
      let field: any = rawFieldData.find((field) => field.id === fieldId);
      if (!field) {
        field = { id: fieldId };
        rawFieldData.push(field);
      }
      field[key.startsWith('label-') ? 'label' : 'type'] = value;
    }
  }

  const promises = rawFieldData.map(async (fieldData) => {
    const validatedFieldData = UpdateField.safeParse(fieldData);
    if (!validatedFieldData.success) {
      const state: State = {
        errors: validatedFieldData.error.flatten().fieldErrors,
        message: 'Missing or invalid form data',
      };
      return state;
    }
    const { id, label, type } = validatedFieldData.data;
    try {
      const field = await prisma.field.update({
        where: { id: id },
        data: {
          label: label,
          type: type,
        },
      });
    } catch (error) {
      console.error('Database Error: Failed to update field', error);
      return { message: 'Database Error: Failed to update field' };
    }
  });
  await Promise.all(promises);
  const validatedFormData = UpdateForm.safeParse(rawFormData);
  if (!validatedFormData.success) {
    const state: State = {
      errors: validatedFormData.error.flatten().fieldErrors,
      message: 'Missing or invalid form data',
    };
    return state;
  }
  const { formId, formVersionId, title } = validatedFormData.data;
  try {
    await prisma.form.update({
      where: { id: formId },
      data: {
        title: title,
        versions: {
          update: {
            where: { id: formVersionId },
            data: { status: 'draft' },
          },
        },
      },
    });
  } catch (error) {
    const state: State = {
      message: 'Database Error: Failed to create form',
    };
    return state;
  }
  revalidatePath(`/dashboard/forms/${formId}/edit`);
  redirect(`/dashboard/forms/${formId}/edit`);
}

export async function deleteForm(id: string) {
  try {
    await prisma.form.delete({ where: { id: id } });
  } catch (error) {
    console.error('Database Error: Failed to delete form', error);
    return { message: 'Database Error: Failed to Delete' };
  }
  revalidatePath('/dashboard/forms');
  redirect('/dashboard/forms');
}

export async function deleteFormVersion(id: string) {
  try {
    await prisma.formVersion.delete({ where: { id: id } });
  } catch (error) {
    console.error('Database Error: Failed to delete form', error);
    return { message: 'Database Error: Failed to Delete' };
  }
  revalidatePath('/dashboard/forms');
  redirect('/dashboard/forms');
}

export async function declineFormVersion(form: FormVersion) {
  try {
    await prisma.form.update({
      where: { id: form.formId },
      data: {
        versions: {
          update: {
            where: { id: form.id },
            data: { status: 'draft' },
          },
        },
      },
    });
  } catch (error) {
    console.error('Database Error: Failed to decline form', error);
    return { message: 'Database Error: Failed to Decline' };
  }
  revalidatePath('/dashboard/forms');
  redirect('/dashboard/forms');
}

export async function approveFormVersion(form: FormVersion) {
  try {
    await prisma.form.update({
      where: { id: form.formId },
      data: {
        currentVersionId: form.id,
        versions: {
          update: {
            where: { id: form.id },
            data: { status: 'published' },
          },
        },
      },
    });
    await prisma.formVersion.updateMany({
      where: {
        formId: form.formId,
        id: { not: form.id },
        status: 'published',
      },
      data: {
        status: 'archived',
      },
    });
  } catch (error) {
    console.error('Database Error: Failed to approve form', error);
    return { message: 'Database Error: Failed to Approve' };
  }
  revalidatePath('/dashboard/forms');
  redirect('/dashboard/forms');
}

export async function proposeFormVersion(form: FormVersion) {
  try {
    await prisma.form.update({
      where: { id: form.formId },
      data: {
        versions: {
          update: {
            where: { id: form.id },
            data: { status: 'pending' },
          },
        },
      },
    });
  } catch (error) {
    console.error('Database Error: Failed to propose form', error);
    return { message: 'Database Error: Failed to Propose' };
  }
  revalidatePath('/dashboard/forms');
  redirect('/dashboard/forms');
}

export async function archiveFormVersion(form: FormVersion) {
  try {
    await prisma.form.update({
      where: { id: form.formId },
      data: {
        currentVersionId: null,
        versions: {
          update: {
            where: { id: form.id },
            data: { status: 'archived' },
          },
        },
      },
    });

    revalidatePath('/dashboard/forms');
    return { message: 'Form Approved' };
  } catch (error) {
    console.error('Database Error: Failed to approve form', error);
    return { message: 'Database Error: Failed to Approve' };
  }
}
export async function revertFormVersion(form: FormVersion) {
  try {
    await prisma.form.update({
      where: { id: form.formId },
      data: {
        currentVersionId: form.id,
        versions: {
          update: {
            where: { id: form.id },
            data: { status: 'published' },
          },
        },
      },
    });
    await prisma.formVersion.updateMany({
      where: {
        formId: form.formId,
        id: { not: form.id },
        status: 'published',
      },
      data: {
        status: 'archived',
      },
    });
  } catch (error) {
    console.error('Database Error: Failed to revert form', error);
    return { message: 'Database Error: Failed to Revert' };
  }
  revalidatePath('/dashboard/forms');
  redirect('/dashboard/forms');
}

export async function editForm(id: string) {
  try {
    let latestVersion = await prisma.formVersion.findFirst({
      where: {
        formId: id,
        OR: [
          {
            status: 'published',
          },
          {
            status: 'archived',
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
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
    if (!latestVersion && !draft) {
      draft = await prisma.formVersion.create({
        data: {
          version: '1.0.0',
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
    } else if (latestVersion && !draft) {
      const newVersion = createNewVersion(latestVersion.version, 'minor');
      draft = await prisma.formVersion.create({
        data: {
          version: newVersion,
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
    } else if (draft?.status === 'pending') {
      await prisma.formVersion.update({
        where: { id: draft.id },
        data: {
          status: 'draft',
        },
      });
    }
  } catch (error) {
    console.error('Database Error: Failed to fetch form');
    throw new Error('Failed to fetch form data.');
  }
  revalidatePath(`/dashboard/forms/${id}/edit`);
  redirect(`/dashboard/forms/${id}/edit`);
}
