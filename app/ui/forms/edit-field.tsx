import { Field } from '@prisma/client';
import { DeleteField } from '@/app/ui/forms/buttons';

export default function EditField(field: Field) {
  return (
    <div>
      <div className="flex justify-end">
        <DeleteField id={field.id} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="mb-4">
          <div className="mb-4">
            <label
              htmlFor={`label-${field.id}`}
              className="mb-2 block text-sm font-medium"
            >
              Label
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id={`label-${field.id}`}
                  name={`label-${field.id}`}
                  type="text"
                  defaultValue={field.label}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-4">
            <label
              htmlFor={`type-${field.id}`}
              className="mb-2 block text-sm font-medium"
            >
              Type
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id={`type-${field.id}`}
                  name={`type-${field.id}`}
                  type="text"
                  defaultValue={field.type}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
