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
          console.log('about to submit', email);
          await inviteToTrip({ email });
        }}
      >
        <Form>
          <label htmlFor="email">Invite:</label>
          <Field
            name="email"
            id="email"
            type="email"
            placeholder="name@example.com"
            className="p-3 border border-gray-500 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
          >
            Send invite
          </button>
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

function PendingInvites({ trip }: { trip: Trip }): JSX.Element {
  return (
    <div>
      <h3>Pending Invitations</h3>
      <ul>
        {trip.invitedEmails &&
          trip.invitedEmails.map((email) => <li key={email}>{email}</li>)}
      </ul>
    </div>
  );
}
