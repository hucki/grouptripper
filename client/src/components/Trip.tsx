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

export default function Trip({ ...props }): JSX.Element {
  const { trip } = props;
  const stopCards = trip.stops.map((stop: string, index: number) => (
    <div
      key={stop}
      className="self-center justify-center overflow-hidden rounded shadow-lg"
    >
      <img
        className="max-w-full"
        src="https://source.unsplash.com/random/500x200"
        alt="Random unsplash"
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">
          Day {index + 1}: {stop}
        </div>
        <p className="text-base text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
    </div>
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
