import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { server, rest } from '../../test/server/test-server';

import { buildTrip } from './../../test/utils/generate';

import TripList from './../TripList';

const apiUrl = process.env.REACT_APP_API_URL;

test('displays a list of trips', async () => {
  const trips = [buildTrip({ name: 'Trip 1' }), buildTrip({ name: 'Trip 2' })];

  render(
    <MemoryRouter>
      <TripList />
    </MemoryRouter>
  );

  server.use(
    rest.get(`${apiUrl}/trips`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(trips),
        ctx.set('access-control-allow-origin', '*'),
        ctx.set('access-control-allow-credentials', 'true')
      );
    })
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

  trips.forEach((trip) => {
    expect(screen.getByRole('link', { name: trip.name })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: trip.name })).toHaveAttribute(
      'href',
      `/trips/${trip._id}`
    );
  });
});
