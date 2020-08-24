import React from 'react';
import { Link } from 'react-router-dom';
import TripCard from './TripCard';
import { Trip } from '../types/Trip';

export default function TripList({ trips }: { trips: Trip[] }): JSX.Element {
  return (
    <div className="grid content-center grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {trips.map((trip) => (
        <div key={trip._id}>
          <Link
            to={`/trips/${trip._id}`}
            className="text-blue-800 no-underline"
          >
            <TripCard key={trip.name} trip={trip} listView={true} />
          </Link>
        </div>
      ))}
    </div>
  );
}
