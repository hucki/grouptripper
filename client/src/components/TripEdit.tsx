import React from 'react';
import MapContainer from './MapContainer';
import { Trip } from '../types/Trip';
import { useParams } from 'react-router-dom';
import { client } from '../services/ApiClient';
import { useQuery } from 'react-query';
import TripCard from './TripCard';

export default function TripEdit(): JSX.Element {
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
      <TripCard trip={trip} />
      Edit Me!
      <div className="grid content-center grid-cols-1 grid-rows-2 gap-4 m-4 md:grid-rows-1 md:grid-cols-2">
        <Timeline />
        <MapContainer trip={trip} />
      </div>
    </>
  );
}
