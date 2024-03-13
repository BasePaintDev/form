import Breadcrumbs from '@/app/ui/forms/breadcrumbs';
import Form from '@/app/ui/forms/edit-form';
import { fetchEditForm } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [draft] = await Promise.all([fetchEditForm(id), []]);
  if (!draft) notFound();
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
      <Form draft={draft} />
    </main>
  );
}
