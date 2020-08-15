import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import CreateTrip from '../CreateTrip';

test('form submission', async () => {
  render(<CreateTrip />);

  const submitButton = screen.getByText(/create trip/i);
  await user.click(submitButton);

  const successMessage = await screen.findByText(/success/i);
  expect(successMessage).toBeInTheDocument();
});
