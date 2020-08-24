import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { buildTrip } from './../../test/utils/generate';
import TripList from './../TripList';

test('displays a list of trips', async () => {
  const trips = [buildTrip({ name: 'Trip 1' }), buildTrip({ name: 'Trip 2' })];

  render(
    <MemoryRouter>
      <TripList trips={trips} />
    </MemoryRouter>
  );

  trips.forEach((trip) => {
    const searchName = new RegExp(trip.name);
    expect(screen.getByRole('link', { name: searchName })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: searchName })).toHaveAttribute(
      'href',
      `/trips/${trip._id}`
    );
  });
});
