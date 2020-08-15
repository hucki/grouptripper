import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { server, rest, MockedRequest } from './../../test/server/test-server';
import CreateTrip from '../CreateTrip';

const apiUrl = process.env.REACT_APP_API_URL;

test('form successfully submits to api', async () => {
  let request: MockedRequest;

  const fakeTrip = { name: 'Test trip', country: 'UK' };

  server.use(
    rest.post(`${apiUrl}/trips`, (req, res, ctx) => {
      request = req;
      expect(request.body).toEqual(fakeTrip); // This check has to be here, not in the main test body, otherwise TS complains
      return res(ctx.status(200), ctx.json(fakeTrip));
    })
  );

  render(<CreateTrip />);

  const submitButton = screen.getByText(/create trip/i);
  await user.type(screen.getByLabelText(/trip name/i), 'Test trip');
  await user.type(screen.getByLabelText(/country/i), 'UK');
  await user.click(submitButton);

  const successMessage = await screen.findByText(/success/i);
  expect(successMessage).toBeInTheDocument();
});
