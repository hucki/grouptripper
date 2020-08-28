import React, { useState, FunctionComponent } from 'react';
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
import * as countries from 'country-list';
import { Trip } from './../types/Trip';
import { Stop } from './../types/Stop';
import AutoComplete from './AutoComplete';
import { useSinglePhoto } from '../hooks/photos';
import { useCreateTrip } from '../hooks/trips';
import { Redirect } from 'react-router-dom';
import HeroImageWithText from './HeroImageWithText';

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
    participants: [],
    stopsCollection: {
      type: 'FeatureCollection',
      features: tripInput.stops.map((stop) => {
        return {
          type: 'Feature' as const,
          properties: {
            name: stop.properties.name,
            label: stop.properties.label,
            description: '',
            upvotes: 0,
            downvotes: 0,
            tripDay: -1,
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
});

export default function CreateTrip(): JSX.Element {
  const [redirect, setRedirect] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [createTrip, { error: savingError }] = useCreateTrip();

  const formPages = [FormFirstPage, FormSecondPage];

  function renderFormPage(formikProps: FormikProps<TripInput>): JSX.Element {
    return formPages[currentPage](formikProps);
  }

  if (redirect && !savingError) return <Redirect to="/user-profile" />;

  return (
    <>
      <HeroImageWithText queryText="scotland" className="flex items-center">
        <h1 className="text-6xl font-semibold">Start planning your trip</h1>
      </HeroImageWithText>
      <div className="container p-4 mx-auto">
        <section className="row-start-1 row-end-4 p-4 bg-white rounded">
          <Formik
            initialValues={{
              name: '',
              country: '',
              countryObj: null,
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
              setRedirect(false);
              const newTrip = transformTrip(values);
              await createTrip({ trip: newTrip });
              setSubmitting(false);
              setRedirect(true);
            }}
          >
            {(formikProps): JSX.Element => (
              <Form>
                {renderFormPage(formikProps)}
                <div>
                  {currentPage > 0 ? (
                    <div className="flex flex-col items-start">
                      <button
                        type="button"
                        onClick={(): void => setCurrentPage((page) => page - 1)}
                        className="px-4 py-2 mt-6 text-xs font-bold text-gray-900 uppercase bg-gray-400 rounded outline-none active:bg-gray-600 hover:shadow-md focus:outline-none"
                      >
                        Previous page
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 mt-6 text-xs font-bold text-gray-900 uppercase bg-yellow-500 rounded outline-none active:bg-yellow-600 hover:shadow-md focus:outline-none"
                        disabled={
                          formikProps.isSubmitting || !formikProps.isValid
                        }
                      >
                        Create Trip
                      </button>
                    </div>
                  ) : null}
                  {currentPage < formPages.length - 1 ? (
                    <button
                      type="button"
                      onClick={(): void => setCurrentPage((page) => page + 1)}
                      className="px-4 py-2 mt-6 text-xs font-bold text-gray-900 uppercase bg-yellow-500 rounded outline-none active:bg-yellow-600 hover:shadow-md focus:outline-none"
                    >
                      Next page
                    </button>
                  ) : null}
                </div>
                {savingError ? (
                  <div>{savingError.message} - Please retry</div>
                ) : null}
              </Form>
            )}
          </Formik>
        </section>
      </div>
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
    <div className="flex flex-col my-3 space-y-2">
      <label htmlFor={props.name} className="text-xl">
        {label}
      </label>
      <Field
        {...field}
        {...props}
        className="p-3 border border-gray-500 rounded"
      />
      {meta.touched && meta.error ? <div role="alert">{meta.error}</div> : null}
    </div>
  );
}

const SelectInput: FunctionComponent<InputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col my-3 space-y-2">
      <label htmlFor={props.name} className="text-xl">
        {label}
      </label>
      <select
        {...field}
        {...props}
        className="p-3 border border-gray-500 rounded"
      >
        {props.children}
      </select>
      {meta.touched && meta.error ? <div role="alert">{meta.error}</div> : null}
    </div>
  );
};

function FormFirstPage(): JSX.Element {
  const countriesData = countries
    .getData()
    .sort((a, b) => (a.name < b.name ? -1 : 1));
  return (
    <>
      <TextInput name="name" id="name" label="Trip Name" />
      {/* <TextInput name="country" id="country" label="Country" /> */}
      <SelectInput name="country" id="country" label="Country">
        <option key="empty" value="">
          {' '}
        </option>
        {countriesData.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </SelectInput>
      <div className="flex flex-row justify-start space-x-4">
        <TextInput
          name="startDate"
          id="startDate"
          label="Start Date"
          type="date"
        />
        <TextInput name="endDate" id="endDate" label="End Date" type="date" />
      </div>
    </>
  );
}

function FormSecondPage({ values }: FormikProps<TripInput>): JSX.Element {
  return (
    <>
      <h2 className="text-2xl">Where would you like to visit?</h2>
      <FieldArray name="stops">
        {({ push }): JSX.Element => (
          <div className="grid grid-cols-2 col-gap-8">
            <AutoComplete
              name="currentStop"
              countryCode={values.country}
              onAddClick={(): void => {
                if (values.currentStop) {
                  push(values.currentStop);
                }
              }}
            />

            <div className="my-3 space-y-2">
              <h3 className="mb-4 text-xl">Your stops</h3>
              <ul className="space-y-3">
                {values.stops.map(
                  (stop, index): JSX.Element => (
                    <StopCard key={`stops.${index}`} stop={stop} />
                  )
                )}
              </ul>
            </div>
          </div>
        )}
      </FieldArray>
    </>
  );
}
type StopCardPropTypes = {
  stop: Stop;
};

function StopCard({ stop }: StopCardPropTypes): JSX.Element {
  const photo = useSinglePhoto({
    queryText: stop.properties.name,
    dimensions: { width: 100, height: 100 },
  });

  return (
    <li className="flex flex-row w-full space-x-4 overflow-hidden border-2 border-gray-100 rounded">
      <div style={{ height: '100px', width: '100px' }} className="bg-gray-500">
        {photo ? <img src={photo.imgUrl} alt={photo.altDescription} /> : null}
      </div>
      <h3 className="m-2 text-xl">{stop.properties.name}</h3>
    </li>
  );
}
