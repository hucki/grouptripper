import React, { useState } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';

import { client } from './../services/ApiClient';

type Trip = {
  name: string;
  country: string;
};

export default function CreateTrip(): JSX.Element {
  const [redirect, setRedirect] = useState(false);
  const [serverError, setServerError] = useState('');

  if (redirect) return <div>Success</div>;

  return (
    <>
      <h2>Start planning your trip</h2>
      <Formik
        initialValues={{
          name: '',
          country: '',
        }}
        onSubmit={async (
          values: Trip,
          { setSubmitting, setFieldError }: FormikHelpers<Trip>
        ): Promise<void> => {
          setServerError('');
          try {
            await client('trips', { data: values });
            setSubmitting(false);
            setRedirect(true);
          } catch (error) {
            setServerError(error.message);
          }
        }}
      >
        {(formikProps): JSX.Element => (
          <Form>
            <div className="flex flex-row items-center my-3 space-x-2">
              <label htmlFor="name">Trip Name</label>
              <Field
                id="name"
                name="name"
                className="p-3 border border-gray-500"
              />
            </div>
            <div className="flex flex-row items-center my-3 space-x-2">
              <label htmlFor="country">Country</label>
              <Field
                id="country"
                name="country"
                className="p-3 border border-gray-500"
              />
            </div>
            <button
              type="submit"
              className="flex flex-row items-center justify-center p-3 bg-blue-500"
              disabled={formikProps.isSubmitting}
            >
              Create Trip
            </button>
            {serverError ? <div>{serverError} - Please retry</div> : null}
          </Form>
        )}
      </Formik>
    </>
  );
}
