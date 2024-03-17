import FormStatus from '@/app/ui/forms/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import type { Form, FormVersion } from '@prisma/client';
import {
  EditForm,
  DeleteForm,
  ProposeFormVersion,
  DeleteFormVersion,
  ApproveFormVersion,
  DeclineFormVersion,
  PreviewFormVersion,
  ViewFormVersion,
  ArchiveFormVersion,
  RevertFormVersion,
} from '@/app/ui/forms/buttons';

export default async function Table({
  versions,
  title,
  formId,
}: {
  versions: FormVersion[];
  title: string;
  formId: string;
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {versions?.map((version) => (
              <div
                key={version.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <ClipboardDocumentListIcon width={28} />
                      <p>{version.version}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Created By: Bob Ross
                    </p>
                  </div>
                  <FormStatus status={version.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">Updated By: Bob Ross</p>
                    <p>{version.updatedAt.toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-end gap-2"></div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  {title}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Approved By
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Updated By
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Updated At
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                    <EditForm id={formId} />
                    <DeleteForm id={formId} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {versions?.map((version) => (
                <tr
                  key={version.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <PreviewFormVersion id={version.id} />
                      <ViewFormVersion id={version.id} />
                      <p>{version.version}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">Bob Ross</td>
                  <td className="whitespace-nowrap px-3 py-3">Bob Ross</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(version.updatedAt)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <FormStatus status={version.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {version.status === 'draft' && (
                        <>
                          <ProposeFormVersion form={version} />
                          <DeleteFormVersion id={version.id} />
                        </>
                      )}
                      {version.status === 'pending' && (
                        <>
                          <ApproveFormVersion form={version} />
                          <DeclineFormVersion form={version} />
                        </>
                      )}
                      {version.status === 'published' && (
                        <>
                          <ArchiveFormVersion form={version} />
                        </>
                      )}
                      {version.status === 'archived' && (
                        <>
                          <RevertFormVersion form={version} />
                        </>
                      )}
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
