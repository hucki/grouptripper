import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { server, rest, MockedRequest } from './../../test/server/test-server';
import CreateTrip from '../CreateTrip';

const apiUrl = process.env.REACT_APP_API_URL;

test('trip can be created', async () => {
  let request: MockedRequest | null = null;

  const fakeTrip = { name: 'Test trip', country: 'UK' };

  server.use(
    rest.post(`${apiUrl}/trips`, (req, res, ctx) => {
      request = req;
      expect(request.body).toEqual(fakeTrip); // This check has to be here, not in the main test body, otherwise TS complains
      return res(ctx.status(200), ctx.json(fakeTrip));
    })
  );

  render(<CreateTrip />);

  await user.type(screen.getByLabelText(/trip name/i), fakeTrip.name);
  await user.type(screen.getByLabelText(/country/i), fakeTrip.country);
  const submitButton = screen.getByText(/create trip/i);
  await user.click(submitButton);
  expect(submitButton).toBeDisabled();

  const successMessage = await screen.findByText(/success/i);
  expect(successMessage).toBeInTheDocument();
});

test('form displays error and can be resubmitted on server error', async () => {
  const fakeTrip = { name: 'Test trip', country: 'UK' };

  server.use(
    rest.post(`${apiUrl}/trips`, (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: 'Server error' }));
    })
  );

  render(<CreateTrip />);

  await user.type(screen.getByLabelText(/trip name/i), fakeTrip.name);
  await user.type(screen.getByLabelText(/country/i), fakeTrip.country);
  const submitButton = screen.getByText(/create trip/i);
  await user.click(submitButton);

  const errorMessage = await screen.findByText(/server error/i);
  expect(errorMessage).toBeInTheDocument();
  expect(submitButton).not.toBeDisabled();
});
