import { Suspense } from 'react';
import { Metadata } from 'next';
import Table from '@/app/ui/forms/table';
import { lusitana } from '@/app/ui/fonts';
import { FormTableSkeleton } from '@/app/ui/skeletons';
import { CreateForm } from '@/app/ui/forms/buttons';
import Search from '@/app/ui/search';

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
      <Suspense fallback={<FormTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      {/* Pagination */}
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
