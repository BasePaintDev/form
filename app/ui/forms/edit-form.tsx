'use client';
import Link from 'next/link';
import {
  ArchiveBoxIcon,
  CheckIcon,
  ClockIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updateForm } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { redirect } from 'next/navigation';
import type { Form, FormVersion } from '@prisma/client';

type Draft = {
  form: Form;
} & FormVersion;

export default function Form({ draft }: { draft: Draft }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateForm, initialState);
  if (state?.message == 'Form updated successfully')
    redirect('/dashboard/forms');
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Form Id */}
        <div className="mb-4 hidden">
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="formId"
                name="formId"
                type="text"
                value={draft.form.id}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                required
                readOnly
                aria-disabled
              />
            </div>
          </div>
        </div>
        {/* Form Id */}
        <div className="mb-4 hidden">
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="formVersionId"
                name="formVersionId"
                type="text"
                value={draft.id}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                required
                readOnly
                aria-disabled
              />
            </div>
          </div>
        </div>
        {/* Form Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Form Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={draft.form.title}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/forms"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Form</Button>
      </div>
    </form>
  );
}
