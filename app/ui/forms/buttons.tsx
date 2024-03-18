import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  ArchiveBoxArrowDownIcon,
  ArrowUturnUpIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  editForm,
  deleteForm,
  createField,
  deleteField,
  deleteFormVersion,
  proposeFormVersion,
  approveFormVersion,
  archiveFormVersion,
  declineFormVersion,
  revertFormVersion,
} from '@/app/lib/actions';
import type { FormVersion } from '@prisma/client';
import { Bars2Icon } from '@heroicons/react/16/solid';

export function CreateForm() {
  return (
    <Link
      href="/dashboard/forms/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Form</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function EditForm({ id }: { id: string }) {
  const editFormWithId = editForm.bind(null, id);
  return (
    <form action={editFormWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Edit</span>
        <PencilIcon className="w-5" />
      </button>
    </form>
  );
}

export function CreateField({ id }: { id: string }) {
  const createFieldWithId = createField.bind(null, id);
  return (
    <form
      action={createFieldWithId}
      className="rounded border border-black bg-gray-100 px-2 text-left"
    >
      <button type="submit" className="flex items-center">
        <Bars2Icon className="mr-2 inline-block h-4 w-4" /> Short Answer
      </button>
    </form>
  );
}

export function DeleteField({ id }: { id: string }) {
  const deleteFieldWithId = deleteField.bind(null, id);
  return (
    <button
      className="rounded-md border bg-gray-100 p-2 hover:bg-gray-50"
      formAction={deleteFieldWithId}
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" />
    </button>
  );
}

export function DeleteForm({ id }: { id: string }) {
  const deleteFormWithId = deleteForm.bind(null, id);
  return (
    <form action={deleteFormWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
export function ProposeFormVersion({ form }: { form: FormVersion }) {
  const proposeFormWithId = proposeFormVersion.bind(null, form);
  return (
    <form action={proposeFormWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Pending</span>
        <CheckIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteFormVersion({ id }: { id: string }) {
  const deleteFormWithId = deleteFormVersion.bind(null, id);
  return (
    <form action={deleteFormWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
export function ApproveFormVersion({ form }: { form: FormVersion }) {
  const approveFormWithId = approveFormVersion.bind(null, form);
  return (
    <form action={approveFormWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Approve</span>
        <ShieldCheckIcon className="w-5" />
      </button>
    </form>
  );
}
export function DeclineFormVersion({ form }: { form: FormVersion }) {
  const declineFormWithId = declineFormVersion.bind(null, form);
  return (
    <form action={declineFormWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Decline</span>
        <XMarkIcon className="w-5" />
      </button>
    </form>
  );
}
export function ViewFormVersion({ id }: { id: string }) {
  return (
    <button type="button" className="rounded-md border p-2 hover:bg-gray-100">
      <span className="sr-only">View</span>
      <EyeIcon className="w-5" />
    </button>
  );
}
export function PreviewFormVersion({ id }: { id: string }) {
  return (
    <button type="button" className="rounded-md border p-2 hover:bg-gray-100">
      <span className="sr-only">Preview</span>
      <ClipboardDocumentListIcon className="w-5" />
    </button>
  );
}
export function ArchiveFormVersion({ form }: { form: FormVersion }) {
  const archiveFormWithId = archiveFormVersion.bind(null, form);
  return (
    <form action={archiveFormWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Archive</span>
        <ArchiveBoxArrowDownIcon className="w-5" />
      </button>
    </form>
  );
}
export function RevertFormVersion({ form }: { form: FormVersion }) {
  const revertFormWithId = revertFormVersion.bind(null, form);
  return (
    <form action={revertFormWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Revert</span>
        <ArrowUturnUpIcon className="w-5" />
      </button>
    </form>
  );
}
