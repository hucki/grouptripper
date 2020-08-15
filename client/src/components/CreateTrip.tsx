import React, { useState } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';

type Trip = {
  name: string;
  country: string;
};

export default function CreateTrip(): JSX.Element {
  const [redirect, setRedirect] = useState(false);

  return (
    <>
      <h2>Start planning your trip</h2>
      <Formik
        initialValues={{
          name: '',
          country: '',
        }}
        onSubmit={(
          values: Trip,
          { setSubmitting }: FormikHelpers<Trip>
        ): void => {
          setTimeout(() => {
            setRedirect(true);
            setSubmitting(false);
          }, 500);
        }}
      >
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
          >
            Create Trip
          </button>
        </Form>
      </Formik>
      {redirect ? <div role="alert">Success</div> : null}
    </>
  );
}
