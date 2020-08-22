import React from 'react';
import { Trip } from '../types/Trip';
import * as Yup from 'yup';
import { Formik, FormikHelpers, Form, Field } from 'formik';

export default function Invite({ trip }: { trip: Trip }): JSX.Element {
  return (
    <div>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={async (
          values: EmailInput,
          { setSubmitting }: FormikHelpers<EmailInput>
        ): Promise<void> => {
          console.log(values);
        }}
      >
        <Form>
          <label htmlFor="email">Invite someone by email</label>
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
    </div>
  );
}

type EmailInput = {
  email: string;
};

const validationSchema = Yup.object({
  email: Yup.string().email('Please enter a valid email').required('Required'),
});
