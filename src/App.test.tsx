import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductView from './app/Pages/Product/ProductView';

test('renders learn react link', () => {
  // render(<ProductView />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
