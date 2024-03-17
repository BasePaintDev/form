import { Suspense } from 'react';
import { Metadata } from 'next';
import Table from '@/app/ui/forms/table';
import { lusitana } from '@/app/ui/fonts';
import { FormTableSkeleton } from '@/app/ui/skeletons';
import { CreateForm } from '@/app/ui/forms/buttons';
import Search from '@/app/ui/search';
import { fetchFormById, fetchVersionCount } from '@/app/lib/data';
import { Pagination } from '@/app/ui/pagination';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/app/ui/forms/breadcrumbs';

export const metadata: Metadata = {
  title: 'Forms',
};

export default async function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
  params: {
    id: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const id = params.id;
  const [form, totalPages] = await Promise.all([
    fetchFormById(id, currentPage),
    fetchVersionCount(id),
  ]);
  if (!form) notFound();

  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Form', href: '/dashboard/forms' },
          {
            label: 'View Form',
            href: `/dashboard/forms/${params.id}`,
            active: true,
          },
        ]}
      />

      {/* Create Form */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search forms..." />
        <CreateForm />
      </div>

      {/* Form Table */}

      <Suspense key={form.id} fallback={<FormTableSkeleton />}>
        <Table versions={form.versions} title={form.title} formId={form.id} />
      </Suspense>

      {/* Pagination */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
