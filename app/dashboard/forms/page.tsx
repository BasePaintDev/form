import { Suspense } from 'react';
import { Metadata } from 'next';
import Table from '@/app/ui/forms/table';
import { lusitana } from '@/app/ui/fonts';
import { FormTableSkeleton } from '@/app/ui/skeletons';
import { CreateForm } from '@/app/ui/forms/buttons';
import Search from '@/app/ui/search';
import { fetchForms } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Forms',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const forms = await fetchForms();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Forms</h1>
      </div>
      {/* Create Form */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search forms..." />
        <CreateForm />
      </div>

      {/* Form Table */}
      {forms.map((form) => (
        <Suspense key={form.id} fallback={<FormTableSkeleton />}>
          <Table versions={form.versions} title={form.title} formId={form.id} />
        </Suspense>
      ))}

      {/* Pagination */}
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
