import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { client } from '../services/ApiClient';
import { useAuth0 } from '@auth0/auth0-react';
import { Trip } from '../types/Trip';
import TripCard from './TripCard';

export default function TripList(): JSX.Element {
  const { getAccessTokenSilently } = useAuth0();

  const { isLoading, error, data } = useQuery('trips', async () =>
    client<Trip[]>('trips')
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  return (
    <ul>
      {data?.map((trip) => (
        <li key={trip._id}>
          <Link
            to={`/trips/${trip._id}`}
            className="text-blue-800 no-underline"
          >
            <TripCard trip={trip} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
