import React from 'react';
import MapContainer from './MapContainer';
import { Trip } from '../types/Trip';
import { useParams } from 'react-router-dom';
import { client } from '../services/ApiClient';
import { useQuery } from 'react-query';

export default function TripView(): JSX.Element {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery('trip', () =>
    client<Trip>(`trips/${id}`)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;

  const trip = data;
  const stopCards = trip?.details.features.map((stop, index) => (
    <StopCard key={index} stop={stop} />
  ));

  return (
    <>
      <h2 className="self-center">This is your Trip</h2>
      <div className="grid content-center grid-cols-3 gap-4 m-4">
        {stopCards}
      </div>
      <MapContainer trip={trip} />
    </>
  );
}

function StopCard({ ...stop }): JSX.Element {
  return (
    <>
      <div className="self-center justify-center overflow-hidden rounded shadow-lg">
        <img
          className="max-w-full"
          src="https://source.unsplash.com/random/500x200"
          alt="Random unsplash"
        />
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">
            {stop.stop.properties.name}
          </div>
          <p className="text-base text-gray-700">
            {stop.stop.geometry.coordinates[0].toFixed(4)}
          </p>
          <p className="text-base text-gray-700">
            {stop.stop.geometry.coordinates[1].toFixed(4)}
          </p>
        </div>
      </div>
    </>
  );
}
