import React from 'react';
import { screen } from '@testing-library/react';
import Footer from '../components/Footer';
import renderWithRouter from './helpers/renderWithRouter';

test('Testa se os ícones estão presentes no componente Footer', () => {
  renderWithRouter(<Footer />);
  const drinksIcon = screen.getByTestId('drinks-bottom-btn');
  const mealsIcon = screen.getByTestId('meals-bottom-btn');
  expect(drinksIcon).toBeInTheDocument();
  expect(mealsIcon).toBeInTheDocument();
});
