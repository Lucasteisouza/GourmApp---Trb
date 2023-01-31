import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from './helpers/renderWithRouter';

import mockFetch from './mocks/mockFetch';
import Provider from '../context/provider';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('testa a página DoneRecipes e suas funcionalidades', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    jest.spyOn(global, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('testa se os elementos são carregados corretamente', () => {
    renderWithRouter(<Provider><DoneRecipes /></Provider>);

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
  });
  test('testa os botões da página', () => {
    renderWithRouter(<DoneRecipes />);

    const filterAllButton = screen.getByTestId('filter-by-all-btn');
    act(() => {
      userEvent.click(filterAllButton);
    });

    const filterMealButton = screen.getByTestId('filter-by-meal-btn');
    act(() => {
      userEvent.click(filterMealButton);
    });

    const filterDrinkButton = screen.getByTestId('filter-by-drink-btn');
    act(() => {
      userEvent.click(filterDrinkButton);
    });
  });
});
