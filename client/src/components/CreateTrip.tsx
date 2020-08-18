import React, { useState } from 'react';
import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  useField,
  FieldArray,
  FormikProps,
} from 'formik';
import * as Yup from 'yup';

import { client } from './../services/ApiClient';
import { Trip } from './../types/Trip';
import { Stop } from './../types/Stop';
import AutoComplete from './AutoComplete';

type TripInput = {
  name: string;
  country: string;
  startDate: string;
  endDate: string;
  currentStop: Stop | null;
  stops: Stop[];
};

function transformTrip(tripInput: TripInput): Trip {
  return {
    name: tripInput.name,
    country: tripInput.country,
    startDate: new Date(tripInput.startDate),
    endDate: new Date(tripInput.endDate),
    details: {
      type: 'FeatureCollection',
      features: tripInput.stops.map((stop) => {
        return {
          type: 'Feature' as const,
          properties: {
            name: stop.properties?.name,
            label: stop.properties?.label,
            description: '',
            upvotes: 0,
            downvotes: 0,
          },
          geometry: {
            type: 'Point' as const,
            coordinates: stop.geometry.coordinates,
          },
        };
      }),
    },
  };
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  startDate: Yup.date().required('Required'),
  endDate: Yup.date()
    .required('Required')
    .min(Yup.ref('startDate'), 'End date must be after start date'),
  // stops: Yup.array().of(Yup.string()),
});

export default function CreateTrip(): JSX.Element {
  const [redirect, setRedirect] = useState(false);
  const [serverError, setServerError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const formPages = [FormFirstPage, FormSecondPage];

  function renderFormPage(formikProps: FormikProps<TripInput>): JSX.Element {
    return formPages[currentPage](formikProps);
  }

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
          currentStop: null,
          stops: new Array(0),
        }}
        validationSchema={validationSchema}
        onSubmit={async (
          values: TripInput,
          { setSubmitting }: FormikHelpers<TripInput>
        ): Promise<void> => {
          setServerError('');
          const newTrip = transformTrip(values);
          try {
            // console.log(values);
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
            {renderFormPage(formikProps)}
            {currentPage > 0 ? (
              <button
                type="button"
                onClick={(): void => setCurrentPage((page) => page - 1)}
                className="flex flex-row items-center justify-center p-3 bg-blue-500 disabled:bg-gray-400"
              >
                Previous page
              </button>
            ) : null}
            {currentPage < formPages.length - 1 ? (
              <button
                type="button"
                onClick={(): void => setCurrentPage((page) => page + 1)}
                className="flex flex-row items-center justify-center p-3 bg-blue-500 disabled:bg-gray-400"
              >
                Next page
              </button>
            ) : null}
            <button
              type="submit"
              className="flex flex-row items-center justify-center p-3 bg-blue-500 disabled:bg-gray-400"
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
  type?: string;
};

function TextInput({ label, ...props }: InputProps): JSX.Element {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-row items-center my-3 space-x-2">
      <label htmlFor={props.name}>{label}</label>
      <Field {...field} {...props} className="p-3 border border-gray-500" />
      {meta.touched && meta.error ? <div role="alert">{meta.error}</div> : null}
    </div>
  );
}

function FormFirstPage(): JSX.Element {
  return (
    <>
      <TextInput name="name" id="name" label="Trip Name" />
      <TextInput name="country" id="country" label="Country" />
      <TextInput
        name="startDate"
        id="startDate"
        label="Start Date"
        type="date"
      />
      <TextInput name="endDate" id="endDate" label="End Date" type="date" />
    </>
  );
}

function FormSecondPage({ values }: FormikProps<TripInput>): JSX.Element {
  return (
    <>
      <AutoComplete name="currentStop" />
      <FieldArray name="stops">
        {({ push }): JSX.Element => (
          <>
            {values.stops.map(
              (stop, index): JSX.Element => (
                <div id={`stops.${index}`} key={`stops.${index}`}>
                  {stop?.properties?.label}
                </div>
              )
            )}
            <button
              type="button"
              onClick={(): void => {
                if (values.currentStop) {
                  push(values.currentStop);
                }
              }}
              className="flex flex-row items-center justify-center p-3 bg-blue-500 disabled:bg-gray-400"
            >
              Add stop
            </button>
          </>
        )}
      </FieldArray>
    </>
  );
}
