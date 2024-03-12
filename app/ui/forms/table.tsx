import Image from 'next/image';
import { UpdateForm, DeleteForm } from '@/app/ui/forms/buttons';
import FormStatus from '@/app/ui/forms/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchForms } from '@/app/lib/data';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const forms = await fetchForms();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {forms?.map((form) => (
              <div
                key={form.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <ClipboardDocumentListIcon width={28} />
                      <p>{form.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Created By: Bob Ross
                    </p>
                  </div>
                  <FormStatus status={form.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">Updated By: Bob Ross</p>
                    <p>{form.updatedAt.toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateForm id={form.id} />
                    <DeleteForm id={form.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Form
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Approved By
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Updated By
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {forms?.map((form) => (
                <tr
                  key={form.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <ClipboardDocumentListIcon width={28} />
                      <p>{form.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">Bob Ross</td>
                  <td className="whitespace-nowrap px-3 py-3">Bob Ross</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {form.updatedAt.toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <FormStatus status={form.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateForm id={form.id} />
                      <DeleteForm id={form.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
