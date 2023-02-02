import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import Provider from '../context/provider';

const DRINKS_ICON = 'profile-top-btn';

describe('testa o componente Header e suas funcionalidades', () => {
  test('Testa o botão de profile no componente Header', () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);

    act(() => { history.push('/drinks'); });
    const searchIcon = screen.getByTestId('search-top-btn');
    const profileIcon = screen.getByTestId(DRINKS_ICON);
    expect(searchIcon).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();

    act(() => { userEvent.click(profileIcon); });

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  test('Testa o botão de pesquisa no componente Header', () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);

    act(() => { history.push('/drinks'); });
    const searchIcon = screen.getByTestId('search-top-btn');
    const profileIcon = screen.getByTestId(DRINKS_ICON);
    expect(searchIcon).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();

    act(() => { userEvent.click(searchIcon); });
  });

  test('Testa o componente Header na página DoneRecipes', () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);

    act(() => { history.push('/done-recipes'); });
    const profileIcon = screen.getByTestId(DRINKS_ICON);
    expect(profileIcon).toBeInTheDocument();
  });

  test('Testa o componente Header na página FavoriteRecipes', () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);

    act(() => { history.push('/favorite-recipes'); });
    const profileIcon = screen.getByTestId(DRINKS_ICON);
    expect(profileIcon).toBeInTheDocument();
  });
});
