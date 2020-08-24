import React from 'react';
import { Link } from 'react-router-dom';
import TripCard from './TripCard';
import { Trip } from '../types/Trip';

type RenderTripProps = {
  trip: Trip;
};

function DefaultRenderTrip({ trip }: RenderTripProps): JSX.Element {
  return (
    <Link
      to={`/trips/${trip._id}`}
      key={trip._id}
      className="text-blue-800 no-underline"
    >
      <TripCard key={trip.name} trip={trip} listView={true} />
    </Link>
  );
}

type TripListProps = {
  trips: Trip[];
  renderTrip?: (props: RenderTripProps) => JSX.Element;
};

export default function TripList({
  trips,
  renderTrip = DefaultRenderTrip,
}: TripListProps): JSX.Element {
  return (
    <div className="grid content-center grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {trips.map((trip) => renderTrip({ trip }))}
    </div>
  );
}
