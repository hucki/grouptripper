import React from 'react';
import { useParams } from 'react-router-dom';
import { Stop } from '../types/Stop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTrip } from '../hooks/trips';
import { useUpdateAllStops } from '../hooks/stops';
import {
  faGripLines,
  faEdit,
  faSave,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
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

type StopCardPropTypes = {
  stop: Stop;
  setEditStop: (id: string) => void;
  editStop: string;
  tripEdit: boolean;
};

export default function StopCard({
  stop,
  editStop,
  setEditStop,
  tripEdit,
}: StopCardPropTypes): JSX.Element {
  const { id } = useParams();
  const { trip } = useTrip(id);
  const updateStops = useUpdateAllStops(id);

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
        {meta.touched && meta.error ? (
          <div role="alert">{meta.error}</div>
        ) : null}
      </div>
    );
  }

  function transformStop(stopInput: StopInput): Stop[] {
    const newStops = trip?.stopsCollection.features.map((stop: Stop) => {
      if (stop._id === stopInput.currentStop._id) {
        return {
          geometry: {
            type: 'Point' as const,
            coordinates: [
              stopInput.currentStop?.geometry.coordinates[0] || 0,
              stopInput.currentStop?.geometry.coordinates[1] || 0,
            ],
          },
          properties: {
            name: stopInput.name,
            label: stopInput.label,
            description: stopInput.description,
            upvotes: stopInput.currentStop?.properties.upvotes || 0,
            downvotes: stopInput.currentStop?.properties.upvotes || 0,
            tripDay: stopInput.currentStop.properties.tripDay,
          },
          type: 'Feature' as const,
          _id: stopInput.currentStop._id,
        };
      } else {
        return stop;
      }
    });
    return newStops as Stop[];
  }

  return (
    <>
      <div className="z-10 flex flex-row mb-1 border-gray-400">
        <div className="flex items-center flex-1 p-1 transition duration-500 ease-in-out transform bg-gray-100 rounded-md cursor-pointer select-none hover:-translate-y-1 hover:shadow-lg">
          <div className="flex flex-col items-center justify-center w-5 ml-4 mr-4">
            {tripEdit ? (
              <div className="flex flex-col items-center justify-center w-10 h-10 bg-teal-300 rounded-md">
                <span className="text-gray-100">
                  <FontAwesomeIcon icon={faGripLines} />
                </span>
              </div>
            ) : null}
          </div>
          <div className="flex-1 pl-1 mr-8">
            <div className="font-medium">{stop.properties.name}</div>
            <div className="text-sm text-gray-600">
              {' '}
              {stop.properties.label}
              {stop.properties.description}
            </div>
          </div>
          {tripEdit ? (
            <div className="text-xs text-gray-400 hover:text-gray-600">
              <FontAwesomeIcon
                icon={faEdit}
                onClick={(e): void => {
                  setEditStop(`${stop._id}`);
                }}
              />
            </div>
          ) : (
            <span className="text-teal-300">
              <FontAwesomeIcon
                className="text-teal-300 hover:text-teal-500"
                icon={faChevronUp}
              />
              {/* {{stop.properties.upvotes &&
                stop.properties.downvotes &&
                stop.properties.upvotes + stop.properties.downvotes}} */}
              <FontAwesomeIcon
                className="text-teal-300 hover:text-teal-500"
                icon={faChevronDown}
              />
            </span>
          )}
        </div>
      </div>
      {tripEdit && editStop === stop._id ? (
        <div className="z-0 flex flex-row mb-2 -mt-3 border-teal-600">
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
                  const stops = transformStop(values);
                  updateStops({ stops });
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
                    <TextInput label="Name" name="name" id="name" type="text" />
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
        </div>
      ) : null}
    </>
  );
}
