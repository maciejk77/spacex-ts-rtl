import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  const text = screen.getByText(/spacex/i);
  expect(text).toBeInTheDocument();

  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(2);

  const noDataText = screen.getByText(/no data yet, click on tabs above$/i);
  expect(noDataText).toBeInTheDocument();
});

test('replaces default text placeholder with <Container /> on button click', async () => {
  render(<App />);
  const noDataText = screen.getByText(/no data yet, click on tabs above$/i);
  expect(noDataText).toBeInTheDocument();

  const containerBeforeClick = screen.queryByTestId('container'); // not expected to be there, hence query
  expect(containerBeforeClick).not.toBeInTheDocument();

  const firstButton = await screen.findByRole('button', { name: /rockets/i });
  fireEvent.click(firstButton);
  await waitFor(() => expect(noDataText).not.toBeInTheDocument());

  const containerAfterClick = await screen.findByTestId('container');
  expect(containerAfterClick).toBeInTheDocument();
});
