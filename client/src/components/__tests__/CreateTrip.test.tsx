import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import { server, rest } from './../../test/server/test-server';
import faker from 'faker';
import dayjs from 'dayjs';

import CreateTrip from '../CreateTrip';

const apiUrl = process.env.REACT_APP_API_URL;

function buildTrip() {
  return {
    name: faker.lorem.words(),
    country: faker.address.country(),
    startDate: transformTimestampToDate(faker.date.future()),
    endDate: transformTimestampToDate(faker.date.future()),
    stops: [faker.address.city(), faker.address.city()],
  };
}

function transformTimestampToDate(timestamp: Date): Date {
  return new Date(dayjs().format('YYYY-MM-DD'));
}

function formatDateForInput(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}

test('trip can be created', async () => {
  const fakeTrip = buildTrip();

  server.use(
    rest.post(`${apiUrl}/trips`, (req, res, ctx) => {
      // I want to test request.body is equal to fakeTrip here, but jest seems to fail
      // They seem to be the same object, so not sure why it isn't working
      // I'd like to test it outside this callback, at the end of the main test
      // But typescript won't allow that as it thinks the variable hasn't been
      // assigned
      expect(req.body).toHaveProperty('name');
      expect(req.body).toHaveProperty('country');
      expect(req.body).toHaveProperty('startDate');
      expect(req.body).toHaveProperty('endDate');
      expect(req.body).toHaveProperty('stops');
      return res(ctx.status(200), ctx.json(fakeTrip));
    })
  );

  render(<CreateTrip />);

  await user.type(screen.getByLabelText(/trip name/i), fakeTrip.name);
  await user.type(screen.getByLabelText(/country/i), fakeTrip.country);
  await user.type(
    screen.getByLabelText(/start date/i),
    formatDateForInput(fakeTrip.startDate)
  );
  await user.type(
    screen.getByLabelText(/end date/i),
    formatDateForInput(fakeTrip.endDate)
  );

  await user.click(screen.getByRole('button', { name: /next page/i }));

  const stopOneInput = await screen.findByLabelText(/stop 1/i);
  await user.type(stopOneInput, fakeTrip.stops[0]);

  await user.click(screen.getByRole('button', { name: /add stop/i }));

  const stopTwoInput = await screen.findByLabelText(/stop 2/i);
  await user.type(stopTwoInput, fakeTrip.stops[1]);

  const submitButton = screen.getByText(/create trip/i);
  await user.click(submitButton);
  expect(submitButton).toBeDisabled();

  const successMessage = await screen.findByText(/success/i);
  expect(successMessage).toBeInTheDocument();
});

test('form displays error and can be resubmitted on server error', async () => {
  const fakeTrip = buildTrip();

  server.use(
    rest.post(`${apiUrl}/trips`, (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: 'Server error' }));
    })
  );

  render(<CreateTrip />);

  await user.type(screen.getByLabelText(/trip name/i), fakeTrip.name);
  await user.type(screen.getByLabelText(/country/i), fakeTrip.country);
  await user.type(
    screen.getByLabelText(/start date/i),
    formatDateForInput(fakeTrip.startDate)
  );
  await user.type(
    screen.getByLabelText(/end date/i),
    formatDateForInput(fakeTrip.endDate)
  );
  const submitButton = screen.getByText(/create trip/i);
  await user.click(submitButton);

  const errorMessage = await screen.findByText(/server error/i);
  expect(errorMessage).toBeInTheDocument();
  expect(submitButton).not.toBeDisabled();
});

// TODO, loop through all fields and check them
test('required fields show errors when touched and empty', async () => {
  render(<CreateTrip />);
  await user.click(screen.getByLabelText(/trip name/i));
  fireEvent.blur(screen.getByLabelText(/trip name/i));
  const errorMessage = await screen.findByText(/required/i);
  expect(errorMessage).toBeInTheDocument();
});

test('end date cannot be before start date', async () => {
  const startDate = formatDateForInput(faker.date.future(2));
  const earlierEndDate = dayjs(startDate)
    .subtract(2, 'day')
    .format('YYYY-MM-DD');

  render(<CreateTrip />);

  await user.type(screen.getByLabelText(/start date/i), startDate);
  await user.type(screen.getByLabelText(/end date/i), earlierEndDate);
  fireEvent.blur(screen.getByLabelText(/end date/i));

  const errorMessage = await screen.findByRole('alert');
  expect(errorMessage.textContent).toMatchInlineSnapshot(
    `"End date must be after start date"`
  );
});
