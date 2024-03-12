'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/db/prisma';
import type { FormVersion } from '@prisma/client';

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
});

const FieldSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  type: z.enum(['text', 'email', 'password', 'number', 'date', 'textarea']),
  formId: z.string(),
});

const CreateField = FieldSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

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
  try {
    await prisma.form.create({
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
  revalidatePath('/dashboard/forms');
  return { message: 'Form created successfully' };
}

export async function updateForm(prevState: State, formData: FormData) {
  let rawFormData = Object.fromEntries(formData);
  const validatedFormData = UpdateForm.safeParse(rawFormData);
  if (!validatedFormData.success) {
    const state: State = {
      errors: validatedFormData.error.flatten().fieldErrors,
      message: 'Missing or invalid form data',
    };
    return state;
  }
  const { formId, formVersionId, title, status } = validatedFormData.data;
  try {
    await prisma.form.update({
      where: { id: formId },
      data: {
        title: title,
        versions: {
          update: {
            where: { id: formVersionId },
            data: { status: status },
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
  revalidatePath('/dashboard/forms');
  return { message: 'Form updated successfully' };
}

export async function deleteForm(id: string) {
  try {
    await prisma.form.delete({ where: { id: id } });
    revalidatePath('/dashboard/forms');
    return { message: 'Form deleted' };
  } catch (error) {
    console.error('Database Error: Failed to delete form', error);
    return { message: 'Database Error: Failed to Delete' };
  }
}

export async function deleteFormVersion(id: string) {
  try {
    await prisma.formVersion.delete({ where: { id: id } });
    revalidatePath('/dashboard/forms');
    return { message: 'Form deleted' };
  } catch (error) {
    console.error('Database Error: Failed to delete form', error);
    return { message: 'Database Error: Failed to Delete' };
  }
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
    revalidatePath('/dashboard/forms');
    return { message: 'Form Declined' };
  } catch (error) {
    console.error('Database Error: Failed to decline form', error);
    return { message: 'Database Error: Failed to Decline' };
  }
}

export async function approveFormVersion(form: FormVersion) {
  try {
    await prisma.form.update({
      where: { id: form.formId },
      data: {
        versions: {
          update: {
            where: { id: form.id },
            data: { status: 'published' },
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
    revalidatePath('/dashboard/forms');
    return { message: 'Form Proposed' };
  } catch (error) {
    console.error('Database Error: Failed to propose form', error);
    return { message: 'Database Error: Failed to Propose' };
  }
}

export async function archiveFormVersion(form: FormVersion) {
  try {
    await prisma.form.update({
      where: { id: form.formId },
      data: {
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
        versions: {
          update: {
            where: { id: form.id },
            data: { status: 'published' },
          },
        },
      },
    });
    revalidatePath('/dashboard/forms');
    return { message: 'Form Reverted' };
  } catch (error) {
    console.error('Database Error: Failed to revert form', error);
    return { message: 'Database Error: Failed to Revert' };
  }
}
