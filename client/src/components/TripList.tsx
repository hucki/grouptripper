import React from 'react';
import { Link } from 'react-router-dom';
import TripCard from './TripCard';
import { useTrips } from '../hooks/trips';

export default function TripList(): JSX.Element {
  const { isLoading, error, trips } = useTrips();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting trips: {error}</div>;
  return (
    <div className="grid content-center grid-flow-row grid-cols-1 gap-4 m-4 sm:grid-cols-2 md:grid-cols-3">
      {trips.map((trip) => (
        <div key={trip._id}>
          <Link
            to={`/trips/${trip._id}`}
            className="text-blue-800 no-underline"
          >
            <TripCard trip={trip} listView={true} />
          </Link>
        </div>
      ))}
    </div>
  );
}
