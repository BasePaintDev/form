'use client';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateForm } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { redirect } from 'next/navigation';
import type { Form, FormVersion, Field } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';
import {
  Bars3Icon,
  UserIcon,
  HomeIcon,
  PhoneIcon,
  AtSymbolIcon,
  ChevronUpDownIcon,
  CheckIcon,
  CheckCircleIcon,
  CalculatorIcon,
  CalendarIcon,
  ListBulletIcon,
  Bars3BottomLeftIcon,
  BookmarkIcon,
} from '@heroicons/react/16/solid';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { CreateField } from '@/app/ui/forms/buttons';
import EditField from '@/app/ui/forms/edit-field';
import clsx from 'clsx';

type Draft = {
  form: Form;
} & FormVersion & { fields: Field[] };

export default function Form({ draft }: { draft: Draft }) {
  noStore();
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateForm, initialState);
  if (state?.message == 'Form updated successfully')
    redirect('/dashboard/forms');
  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="bg-blue-200 md:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium">Fields</h2>
            <div className="my-2 border-b border-black"></div>
            <div className="grid grid-cols-2 gap-2">
              <CreateField id={draft.id} />
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <Bars3Icon className="mr-2 inline-block h-4 w-4" /> Long Answer
              </button>
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <UserIcon className="mr-2 inline-block h-4 w-4" /> Name
              </button>
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <HomeIcon className="mr-2 inline-block h-4 w-4" /> Address
              </button>
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <AtSymbolIcon className="mr-2 inline-block h-4 w-4" /> Email
              </button>
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <PhoneIcon className=" mr-2 inline-block h-4 w-4" /> Phone
              </button>
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <CalculatorIcon className="mr-2 inline-block h-4 w-4" />
                Number
              </button>
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <ChevronUpDownIcon className="mr-2 inline-block h-4 w-4" />
                Dropdown List
              </button>
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <CheckCircleIcon className="mr-2 inline-block h-4 w-4" /> Radio
                Buttons
              </button>
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <CheckIcon className="mr-2 inline-block h-4 w-4" /> Checkbox
              </button>
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <CalendarIcon className="mr-2 inline-block h-4 w-4" /> Date
              </button>
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <ArrowUpTrayIcon className="mr-2 inline-block h-4 w-4" /> File
                Upload
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium">Content</h2>
            <div className="my-2 border-b border-black"></div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <BookmarkIcon className="mr-2 inline-block h-4 w-4" /> Header
              </button>
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <Bars3BottomLeftIcon className="mr-2 inline-block h-4 w-4" />{' '}
                Description Area
              </button>
              <button
                type="button"
                className="flex items-center rounded border border-black bg-gray-100 px-2 text-left text-gray-500"
                disabled
              >
                <ListBulletIcon className="mr-2 inline-block h-4 w-4" /> List
              </button>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <form action={dispatch} className="flex-grow">
          <div className="flex-grow rounded-md bg-gray-50 p-4 md:p-6 ">
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
            {/* Form Version Id */}
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
            {/* Form Fields */}
            {draft.fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className={clsx('p-4', {
                    'bg-blue-100': index % 2 === 0,
                    'bg-blue-50': index % 2 === 1,
                  })}
                >
                  <EditField {...field} />
                </div>
              );
            })}
            <div className="mt-6 flex justify-end gap-4">
              <Link
                href="/dashboard/forms"
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
              >
                Cancel
              </Link>
              <Button type="submit">Update Form</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
