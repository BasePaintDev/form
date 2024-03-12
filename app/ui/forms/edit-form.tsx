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
import type { Form } from '@prisma/client';

export default function Form({ form }: { form: Form }) {
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
                id="id"
                name="id"
                type="text"
                value={form.id}
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
                defaultValue={form.title}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>
        {/* Form Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the form status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="draft"
                  name="status"
                  type="radio"
                  value="draft"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked={form.status === 'draft'}
                  required
                />
                <label
                  htmlFor="draft"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-500 px-3 py-1.5 text-xs font-medium text-gray-100"
                >
                  Draft <DocumentIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked={form.status === 'pending'}
                  required
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-gray-100"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="published"
                  name="status"
                  type="radio"
                  value="published"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked={form.status === 'published'}
                  required
                />
                <label
                  htmlFor="published"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Published <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="archived"
                  name="status"
                  type="radio"
                  value="archived"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked={form.status === 'archived'}
                  required
                />
                <label
                  htmlFor="archived"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white"
                >
                  Archived <ArchiveBoxIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
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
