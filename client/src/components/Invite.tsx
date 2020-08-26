import React from 'react';
import { Trip } from '../types/Trip';
import * as Yup from 'yup';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import { useInviteToTrip } from '../hooks/trips';

export default function Invite({ trip }: { trip: Trip }): JSX.Element {
  const [inviteToTrip] = useInviteToTrip(trip._id as string);

  return (
    <div>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={async (
          { email }: EmailInput,
          { setSubmitting }: FormikHelpers<EmailInput>
        ): Promise<void> => {
          await inviteToTrip({ email });
        }}
      >
        <Form className="mb-6">
          <div className="mb-2">
            <label htmlFor="email" className="mr-2">
              Invite someone else:
            </label>
          </div>
          <div className="flex space-x-2">
            <Field
              name="email"
              id="email"
              type="email"
              placeholder="name@example.com"
              className="p-1 border border-gray-500 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-gray-900 uppercase bg-yellow-500 rounded outline-none active:bg-yellow-600 hover:shadow-md focus:outline-none"
            >
              Send invite
            </button>
          </div>
        </Form>
      </Formik>
      <PendingInvites trip={trip} />
    </div>
  );
}

type EmailInput = {
  email: string;
};

const validationSchema = Yup.object({
  email: Yup.string().email('Please enter a valid email').required('Required'),
});

const PendingInvites: React.FC<{ trip: Trip }> = ({ trip }) => {
  if (!trip.invitedEmails || !trip.invitedEmails.length) return null;

  return (
    <div>
      <h3 className="mb-2 text-xl">Hasn't responded yet</h3>
      <ul className="space-y-2">
        {trip.invitedEmails &&
          trip.invitedEmails.map((email) => <li key={email}>{email}</li>)}
      </ul>
    </div>
  );
};
