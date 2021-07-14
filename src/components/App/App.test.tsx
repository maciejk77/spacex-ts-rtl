import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  const text = screen.getByText(/spacex/i);
  expect(text).toBeInTheDocument();
});
