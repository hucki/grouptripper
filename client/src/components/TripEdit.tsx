import React, { useState } from 'react';
import MapContainer from './MapContainer';
import { Trip } from '../types/Trip';
import { Stop } from '../types/Stop';
import { useParams, Link } from 'react-router-dom';
import { client } from '../services/ApiClient';
import { useQuery } from 'react-query';
import TripCard from './TripCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field } from 'formik';
import {
  faChevronCircleUp,
  faChevronCircleDown,
  faSave,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { string } from 'yup';

export default function TripEdit(): JSX.Element {
  const [editStop, setEditStop] = useState('');
  const { id } = useParams();
  const { isLoading, error, data } = useQuery('trip', () =>
    client<Trip>(`trips/${id}`)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;

  const trip = data;

  type StopCardPropTypes = {
    stop: Stop;
  };

  const StopListItem = ({ stop }: StopCardPropTypes): JSX.Element => {
    return (
      <>
        <li className="z-10 flex flex-row mb-2 border-gray-400">
          <div className="flex items-center flex-1 p-2 transition duration-500 ease-in-out transform bg-gray-200 rounded-md cursor-pointer select-none hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 bg-gray-300 rounded-md">
              <span className="text-green-300 hover:text-green-500">
                <FontAwesomeIcon icon={faChevronCircleUp} />
                {stop.properties.upvotes}
              </span>
              <span className="text-red-300 hover:text-red-500">
                <FontAwesomeIcon icon={faChevronCircleDown} />
                {stop.properties.downvotes}
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
                {/* <Formik
                  initialValues={{
                    name: stop.properties.name,
                    description: stop.properties.description,
                  }}
                  onSubmit={() => {}}
                /> */}
              </div>
              <div className="text-xs text-teal-600 ">
                <FontAwesomeIcon
                  icon={faSave}
                  onClick={(e): void => {
                    setEditStop('');
                  }}
                />
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
          {trip?.details.features.map((stop: Stop, index) => (
            <StopListItem key={index} stop={stop} />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <TripCard trip={trip} />
      <div className="grid content-center grid-cols-1 grid-rows-2 gap-4 m-4 md:grid-rows-1 md:grid-cols-2">
        <Timeline />
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
