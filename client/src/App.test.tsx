import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from './App';

xtest('renders app header', async () => {
  const { getByText } = render(<App />);
  expect(getByText(/group tripper/i)).toBeInTheDocument();
});
