import { Metadata } from 'next';
import { fetchFormVersionById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Forms',
};

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;
  const [form] = await Promise.all([fetchFormVersionById(id)]);
  if (!form) notFound();

  return (
    <>
      <h1>{form.form.title}</h1>
    </>
  );
}
