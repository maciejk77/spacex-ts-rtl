import { fireEvent, render, screen } from '@testing-library/react';
import Tab from './Tab';

const props = {
  onClick: jest.fn(),
  label: 'Shuttles',
  name: 'shuttles',
  activeTab: null,
};

it('renders without crashing, inactive state', () => {
  render(<Tab {...props} />);
  const tab = screen.getByRole('button', { name: /shuttles$/i });
  expect(tab).toBeInTheDocument();
  expect(tab).toHaveStyle({ backgroundColor: 'white', color: 'black' });
});

it('sets to active tab (changes the background and text color) on click', () => {
  render(<Tab {...props} />);
  const tab = screen.getByRole('button', { name: /shuttles$/i });
  fireEvent.click(tab);
  expect(tab).toHaveStyle({ backgroundColor: 'black', color: 'white' }); // TODO failing test?
});

it('receives a click', () => {
  render(<Tab {...props} />);
  const tab = screen.getByRole('button', { name: /shuttles$/i });
  fireEvent.click(tab);
  expect(props.onClick).toHaveBeenCalled();
});
