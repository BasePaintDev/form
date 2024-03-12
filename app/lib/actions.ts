'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/db/prisma';

export type State = {
  errors?: {
    id?: string[];
    title?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  status: z.enum(['pending', 'published']),
});

const CreateForm = FormSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
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
  const { title, status } = validatedFormData.data;
  try {
    await prisma.form.create({
      data: {
        title: title,
        status: status,
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
  const { id, title, status } = validatedFormData.data;
  try {
    await prisma.form.update({
      where: { id: id },
      data: {
        title: title,
        status: status,
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
    return { message: 'Database Error: Failed to Delete' };
  }
}
