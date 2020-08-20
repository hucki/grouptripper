import React from 'react';
import { Link } from 'react-router-dom';
import TripCard from './TripCard';
import { useTrips } from '../hooks/trip';

export default function TripList(): JSX.Element {
  const { isLoading, error, trips } = useTrips();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  return (
    <ul>
      {trips.map((trip) => (
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
