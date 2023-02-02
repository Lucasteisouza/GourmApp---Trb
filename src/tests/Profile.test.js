import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Testa a tela Profile', () => {
  it('testa se ao clicar no botão "Done Recipes" é direcionado para tela de receitas feitas', () => {
    const { history } = renderWithRouter(<Profile />);
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');

    act(() => { userEvent.click(doneRecipesBtn); });

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('testa se ao clicar no botão "Logout" é redirecionado para tela de login', () => {
    const { history } = renderWithRouter(<Profile />);
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    act(() => { userEvent.click(logoutBtn); });

    expect(history.location.pathname).toBe('/');
  });

  it('testa se ao clicar no botão "Favorite Recipes" é redirecionado para tela de receitas favoritas', () => {
    const { history } = renderWithRouter(<Profile />);
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');

    act(() => { userEvent.click(favoriteBtn); });

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});
