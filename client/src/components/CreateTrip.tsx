import React, { useState } from 'react';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { client } from './../services/ApiClient';

type Trip = {
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
};

type TripInput = {
  name: string;
  country: string;
  startDate: string;
  endDate: string;
};

function transformTrip(tripInput: TripInput): Trip {
  return {
    name: tripInput.name,
    country: tripInput.country,
    startDate: new Date(tripInput.startDate),
    endDate: new Date(tripInput.endDate),
  };
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  startDate: Yup.date().required('Required'),
  endDate: Yup.date().required('Required'),
});

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
          startDate: '',
          endDate: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (
          values: TripInput,
          { setSubmitting }: FormikHelpers<TripInput>
        ): Promise<void> => {
          setServerError('');
          const newTrip = transformTrip(values);
          try {
            await client('trips', { data: newTrip });
            setSubmitting(false);
            setRedirect(true);
          } catch (error) {
            setServerError(error.message);
          }
        }}
      >
        {(formikProps): JSX.Element => (
          <Form>
            <InputField name="name" id="name" label="Trip Name" />
            <InputField name="country" id="country" label="Country" />
            <InputField name="startDate" id="startDate" label="Start Date" />
            <InputField name="endDate" id="endDate" label="End Date" />

            <div className="flex flex-row items-center my-3 space-x-2">
              <label htmlFor="country">Country</label>
              <Field
                id="country"
                name="country"
                className="p-3 border border-gray-500"
              />
              <ErrorMessage name="country" />
            </div>
            <button
              type="submit"
              className={`flex flex-row items-center justify-center p-3 bg-blue-500 disabled:bg-gray-400 `}
              disabled={formikProps.isSubmitting || !formikProps.isValid}
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

type InputProps = {
  name: string;
  id: string;
  label: string;
};

function InputField({ name, id, label }: InputProps): JSX.Element {
  return (
    <div className="flex flex-row items-center my-3 space-x-2">
      <label htmlFor={name}>{label}</label>
      <Field id={id} name={name} className="p-3 border border-gray-500" />
      <ErrorMessage name={name} />
    </div>
  );
}
