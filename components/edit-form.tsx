'use client';

import { Contact } from '@prisma/client';
import { useFormState } from 'react-dom';
import { SubmitButton } from './button';
import { updateContact } from '@/lib/actions';

export default function UpdateForm({ contact }: { contact: Contact }) {
  const updateContactWithId = updateContact.bind(null, contact.id);
  const [state, formAction] = useFormState(updateContactWithId, null);

  return (
    <>
      <div>
        <form action={formAction}>
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Full name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={contact.name}
              placeholder="Full Name..."
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              <p className="mt-2 text-sm text-red-500">{state?.error?.name}</p>
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={contact.phoneNumber}
              placeholder="Phone Number..."
            />
            <div id="phone-error" aria-live="polite" aria-atomic="true">
              <p className="mt-2 text-sm text-red-500">{state?.error?.phoneNumber}</p>
            </div>
          </div>
          <div id="message-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.message}</p>
          </div>
          <SubmitButton label="update" />
        </form>
      </div>
    </>
  );
}
