import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Recipes from '../pages/Recipes';
import renderWithRouter from './helpers/renderWithRouter';

import mockFetch from './mocks/mockFetch';
import Provider from '../context/provider';

const DRINKS_ICON = 'drinks-bottom-btn';
const ALL_FILTER = 'All-category-filter';
const CARD = '0-recipe-card';

describe('testa a página Recipes e suas funcionalidades', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    jest.spyOn(global, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('testa se os drinks são carregados corretamente', async () => {
    const { history } = renderWithRouter(<Provider><Recipes /></Provider>);

    act(() => { history.push('/drinks'); });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
    const drinksIcon = screen.getByTestId(DRINKS_ICON);
    expect(drinksIcon).toBeInTheDocument();

    act(() => { userEvent.click(drinksIcon); });

    const allFilter = screen.getByTestId(ALL_FILTER);
    expect(allFilter).toBeInTheDocument();

    const catFilter = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(catFilter).toBeInTheDocument();

    const drinkCard = screen.getByTestId(CARD);
    expect(drinkCard).toBeInTheDocument();
  });

  test('testa se os filtros de bebida funcionam corretamente', async () => {
    const { history } = renderWithRouter(<Provider><Recipes /></Provider>);
    act(() => { history.push('/drinks'); });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
    const drinksIcon = screen.getByTestId(DRINKS_ICON);
    expect(drinksIcon).toBeInTheDocument();
    act(() => { userEvent.click(drinksIcon); });

    const allFilter = screen.getByTestId(ALL_FILTER);
    expect(allFilter).toBeInTheDocument();

    const catFilter = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(catFilter).toBeInTheDocument();

    act(() => {
      userEvent.click(catFilter);
      userEvent.click(catFilter);
      userEvent.click(allFilter);
    });

    const drinkCard = screen.getByTestId(CARD);
    expect(drinkCard).toBeInTheDocument();
  });

  test('testa se os filtros de comida funcionam corretamente', async () => {
    const { history } = renderWithRouter(<Provider><Recipes /></Provider>);
    act(() => { history.push('/meals'); });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
    const drinksIcon = screen.getByTestId(DRINKS_ICON);
    expect(drinksIcon).toBeInTheDocument();

    const allFilter = screen.getByTestId(ALL_FILTER);
    expect(allFilter).toBeInTheDocument();

    const catFilter = await screen.findByTestId('Beef-category-filter');
    expect(catFilter).toBeInTheDocument();

    const meal1 = screen.getByRole('button', { name: /corba corba/i });
    expect(meal1).toBeInTheDocument();

    act(() => { userEvent.click(catFilter); });

    const meal2 = await screen.findByTestId(CARD);
    expect(meal2).toBeInTheDocument();

    act(() => {
      userEvent.click(catFilter);
      userEvent.click(allFilter);
    });

    const mealCard = screen.getByTestId(CARD);
    expect(mealCard).toBeInTheDocument();
  });
});
