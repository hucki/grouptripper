import React from 'react';
import { useQuery } from 'react-query';
import { client } from '../services/ApiClient';
import { Trip } from '../types/Trip';

export default function TripList(): JSX.Element {
  const { isLoading, error, data } = useQuery('trips', () =>
    client<Trip[]>('trips')
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  return (
    <ul>
      {data?.map((trip) => (
        <li>{trip.name}</li>
      ))}
    </ul>
  );
}
