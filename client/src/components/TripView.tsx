import React from 'react';
import MapContainer from './MapContainer';
import { Trip } from '../types/Trip';
import { useParams } from 'react-router-dom';
import { client } from '../services/ApiClient';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

export default function TripView(): JSX.Element {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery('trip', () =>
    client<Trip>(`trips/${id}`)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;

  const trip = data;

  const TimelineItem = ({ ...stop }): JSX.Element => {
    return (
      <li className="mb-2">
        <div className="flex items-center flex-shrink-0 mb-1">
          <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
          <div className="flex-1 ml-4 font-medium text-teal-800">
            {stop.stop.properties.name}
          </div>
        </div>
        <div className="ml-12">
          <p className="text-base text-teal-800">
            {stop.stop.geometry.coordinates[0].toFixed(4)}
          </p>
          <p className="text-base text-teal-800">
            {stop.stop.geometry.coordinates[1].toFixed(4)}
          </p>
        </div>
      </li>
    );
  };

  const Timeline = (): JSX.Element => {
    return (
      <div className="relative m-8">
        <div
          className="absolute top-0 h-full border-r-2 border-teal-500"
          style={{ left: '15px' }}
        ></div>
        <ul className="p-0 m-0 list-none">
          {trip?.details.features.map((stop, index) => (
            <TimelineItem key={index} stop={stop} />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-wrap m-4">
          <img
            src="https://source.unsplash.com/random/100x100"
            alt="..."
            className="h-auto max-w-full align-middle border-none rounded-full shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div>
            <h3 className="mt-0 mb-2 text-4xl font-normal leading-normal text-teal-800">
              {trip?.name}
            </h3>
          </div>
          <div>
            {dayjs(trip?.startDate).format('DD.MM.YYYY')} -{' '}
            {dayjs(trip?.endDate).format('DD.MM.YYYY')}
          </div>
        </div>
      </div>
      <div className="grid content-center grid-cols-2 gap-4 m-4">
        <Timeline />
        <MapContainer trip={trip} />
      </div>
    </>
  );
}
