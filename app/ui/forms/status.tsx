import {
  ArchiveBoxIcon,
  CheckIcon,
  ClockIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function status({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-500 text-gray-100': status === 'draft',
          'bg-red-500 text-gray-100': status === 'pending',
          'bg-green-500 text-white': status === 'published',
          'bg-black text-gray-100': status === 'archived',
        },
      )}
    >
      {status === 'draft' ? (
        <>
          Draft
          <DocumentIcon className="ml-1 w-4" />
        </>
      ) : null}
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4" />
        </>
      ) : null}
      {status === 'published' ? (
        <>
          Published
          <CheckIcon className="ml-1 w-4" />
        </>
      ) : null}
      {status === 'archived' ? (
        <>
          Archived
          <ArchiveBoxIcon className="ml-1 w-4" />
        </>
      ) : null}
    </span>
  );
}
