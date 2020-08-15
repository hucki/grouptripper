import React from 'react';
import MapContainer from './MapContainer';

// TODO: move type to central types
type Trip = {
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  stops: string[];
};

export default function Trip(/*trip: Trip*/): JSX.Element {
  // const stopCards = trip.stops.map((stop) => {});
  return (
    <>
      <h2>This is your Trip to xxx</h2>
      <MapContainer /*tripStops={trip.stops}*/ />
    </>
  );
}
