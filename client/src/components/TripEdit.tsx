import React, { useState } from 'react';
import MapContainer from './MapContainer';
import { Trip } from '../types/Trip';
import { Stop } from '../types/Stop';
import { useParams, Link } from 'react-router-dom';
import { client } from '../services/ApiClient';
import { useQuery } from 'react-query';
import TripCard from './TripCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Yup from 'yup';
import {
  Formik,
  // FormikHelpers,
  Form,
  Field,
  // FormikProps,
  useField,
  // yupToFormErrors,
} from 'formik';
// import { useAuth0 } from '@auth0/auth0-react';
import {
  faChevronUp,
  faChevronDown,
  faSave,
  faEdit,
  faGripLines,
} from '@fortawesome/free-solid-svg-icons';
// import DraggableNew from './DraggableNew';

type StopInput = {
  name: string;
  label: string;
  description?: string;
  currentStop: Stop;
};

type InputProps = {
  name: string;
  id: string;
  label: string;
  type?: string;
};

function TextInput({ label, ...props }: InputProps): JSX.Element {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={props.name}>{label}</label>
      <Field
        {...field}
        {...props}
        className="p-3 border border-gray-500 rounded"
      />
      {meta.touched && meta.error ? <div role="alert">{meta.error}</div> : null}
    </div>
  );
}

function transformStop(stopInput: StopInput): Stop {
  return {
    type: 'Feature' as const,
    properties: {
      name: stopInput.name,
      label: stopInput.currentStop?.properties.label,
      description: stopInput.currentStop?.properties.description,
      upvotes: stopInput.currentStop?.properties.upvotes || 0,
      downvotes: stopInput.currentStop?.properties.upvotes || 0,
    },
    geometry: {
      type: 'Point' as const,
      coordinates: [
        stopInput.currentStop?.geometry.coordinates[0] || 0,
        stopInput.currentStop?.geometry.coordinates[1] || 0,
      ],
    },
  };
}

export default function TripEdit(): JSX.Element {
  const [editStop, setEditStop] = useState('');
  // const [serverError, setServerError] = useState('');
  // const [redirect, setRedirect] = useState(false);
  // const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const { isLoading, error, data: trip } = useQuery('trip', () =>
    client<Trip>(`trips/${id}`)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  if (!trip) return <div>No trip found</div>;

  type StopCardPropTypes = {
    stop: Stop;
  };

  const StopListItem = ({ stop }: StopCardPropTypes): JSX.Element => {
    return (
      <>
        <li className="z-10 flex flex-row mb-2 border-gray-400">
          <div className="flex items-center flex-1 p-2 transition duration-500 ease-in-out transform bg-gray-100 rounded-md cursor-pointer select-none hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 bg-teal-300 rounded-md">
              <span className="text-gray-100">
                <FontAwesomeIcon icon={faGripLines} />
              </span>
            </div>
            <div className="flex flex-col items-center justify-center w-5 mr-4 ">
              <span className="text-teal-300">
                <FontAwesomeIcon
                  className="text-teal-300 hover:text-teal-500"
                  icon={faChevronUp}
                />
                {stop.properties.upvotes &&
                  stop.properties.downvotes &&
                  stop.properties.upvotes + stop.properties.downvotes}
                <FontAwesomeIcon
                  className="text-teal-300 hover:text-teal-500"
                  icon={faChevronDown}
                />
              </span>
            </div>
            <div className="flex-1 pl-1 mr-16">
              <div className="font-medium">{stop.properties.name}</div>
              <div className="text-sm text-gray-600">
                {' '}
                {stop.properties.label}
                {stop.properties.description}
              </div>
            </div>
            <div className="text-xs text-gray-400 hover:text-gray-600">
              <FontAwesomeIcon
                icon={faEdit}
                onClick={(e): void => {
                  setEditStop(`${stop._id}`);
                }}
              />
            </div>
          </div>
        </li>
        {editStop === stop._id ? (
          <li className="z-0 flex flex-row mb-2 -mt-3 border-teal-600">
            <div className="flex items-center flex-1 p-2 transition duration-500 ease-in-out transform bg-gray-100 rounded-md cursor-pointer select-none">
              <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 bg-gray-100 rounded-md"></div>
              <div className="flex-1 pl-1 mr-16">
                <Formik
                  initialValues={{
                    name: stop.properties.name,
                    label: stop.properties.label,
                    description: stop.properties.description,
                    currentStop: stop,
                  }}
                  onSubmit={(values, { setSubmitting, resetForm }): void => {
                    transformStop(values);
                    setSubmitting(false);
                    setEditStop('');
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string().required(),
                    label: Yup.string().required(),
                    description: Yup.string(),
                  })}
                >
                  {(props): JSX.Element => (
                    <Form>
                      <TextInput
                        label="Name"
                        name="name"
                        id="name"
                        type="text"
                      />
                      <TextInput
                        label="Label"
                        name="label"
                        id="label"
                        type="text"
                      />
                      <TextInput
                        label="Description"
                        name="description"
                        id="description"
                        type="text"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none disabled:bg-gray-600 active:bg-teal-600 hover:shadow-md focus:outline-none"
                      >
                        {props.isSubmitting ? (
                          'Loading ...'
                        ) : (
                          <FontAwesomeIcon icon={faSave} />
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </li>
        ) : null}
      </>
    );
  };

  const Timeline = (): JSX.Element => {
    return (
      <div className="container flex items-center justify-center w-full mx-auto">
        <ul className="flex flex-col w-full p-4">
          {trip?.stopsCollection.features.map((stop: Stop, index) => (
            <StopListItem key={index} stop={stop} />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      {trip && <TripCard trip={trip} />}
      <div className="grid content-center grid-cols-1 grid-rows-2 gap-4 m-4 md:grid-rows-1 md:grid-cols-2">
        <Timeline />
        {/* <DraggableNew /> */}
        <MapContainer trip={trip} />
      </div>
      <Link to={`/trips/${id}`}>
        <div
          className="px-4 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none"
          style={{ transition: 'all .15s ease' }}
        >
          <FontAwesomeIcon icon={faSave} />
          &nbsp; Save &amp; Go Back
        </div>
      </Link>
    </>
  );
}
