import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from './Container';
import { rocketsDataMock, dragonsDataMock } from '../../mocks/index';

test('renders a list of rockets', async () => {
  render(<Container data={rocketsDataMock} />);

  const rocketsHeaders = await screen.findAllByRole('heading', { level: 2 });
  expect(rocketsHeaders).toHaveLength(3);

  const rocketsImages = await screen.findAllByRole('img', {});
  expect(rocketsImages).toHaveLength(3);
});

test('renders a list of dragons', async () => {
  render(<Container data={dragonsDataMock} />);

  const dragonsHeaders = await screen.findAllByRole('heading', { level: 2 });
  expect(dragonsHeaders).toHaveLength(2);

  const dragonsImages = await screen.findAllByRole('img');
  expect(dragonsImages).toHaveLength(2);
});
