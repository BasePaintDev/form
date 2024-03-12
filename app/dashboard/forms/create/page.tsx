import Form from '@/app/ui/forms/create-form';
import Breadcrumbs from '@/app/ui/forms/breadcrumbs';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Forms', href: '/dashboard/forms' },
          {
            label: 'Create Form',
            href: '/dashboard/forms/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
