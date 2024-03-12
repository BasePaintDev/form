import Breadcrumbs from '@/app/ui/forms/breadcrumbs';
import Form from '@/app/ui/forms/edit-form';
import { fetchFormById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [form] = await Promise.all([fetchFormById(id), []]);
  if (!form) notFound();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Form', href: '/dashboard/forms' },
          {
            label: 'Edit Form',
            href: `/dashboard/form/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form form={form} />
    </main>
  );
}
