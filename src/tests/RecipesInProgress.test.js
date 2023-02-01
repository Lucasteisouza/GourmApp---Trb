import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import oneMeal from './mocks/oneMeal';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

// const storedDoneRecicepsMock = { alcoholicOrNot: '',
//   category: 'Vegetarian',
//   doneDate: '',
//   id: '52771',
//   image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//   name: 'Spicy Arrabiata Penne',
//   nationality: 'Italian',
//   tags: 'Pasta,Curry',
//   type: 'meals',
// };

const ARRABIATA_URL = '/meals/52771/in-progress';
const doneRecipesRoute = '/done-recipes';

describe('Testa a tela in-progress', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
  });

  it('testa se a receita correta é renderizada na página /52771/in-progress', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(ARRABIATA_URL));
    const arrabiata = await screen.findByRole('heading', { name: /spicy arrabiata penne/i });
    expect(arrabiata).toBeInTheDocument();
  });

  it('testa se o botão de finalizar receita é desbloqueado ao selecionar todos os ingredientes e redireciona para /done-recipes para meal', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(ARRABIATA_URL));
    const finishBtn = await screen.findByRole('button', { name: /finalizar receita/i });
    expect(finishBtn).toBeInTheDocument();
    expect(finishBtn).toHaveProperty('disabled');
    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes.length).toBe(8);
    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    userEvent.click(checkboxes[2]);
    userEvent.click(checkboxes[3]);
    userEvent.click(checkboxes[4]);
    userEvent.click(checkboxes[5]);
    userEvent.click(checkboxes[6]);
    userEvent.click(checkboxes[7]);
    expect(finishBtn).toHaveProperty('disabled', false);
    userEvent.click(checkboxes[0]);
    expect(finishBtn).toHaveProperty('disabled');
    userEvent.click(checkboxes[0]);
    userEvent.click(finishBtn);
    const doneRecipes = await screen.findByRole('heading', { name: /done recipes/i });
    expect(doneRecipes).toBeInTheDocument();
    expect(history.location.pathname).toBe(doneRecipesRoute);
  });

  it('testa se a aplicação funciona com um localStorage sem a receita sendo feita', async () => {
    localStorage.clear();
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals/52772/in-progress'));
    const finishBtn = await screen.findByRole('button', { name: /finalizar receita/i });
    expect(finishBtn).toBeInTheDocument();
    expect(finishBtn).toHaveProperty('disabled');
    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes.length).toBe(8);
    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    userEvent.click(checkboxes[2]);
    userEvent.click(checkboxes[3]);
    userEvent.click(checkboxes[4]);
    userEvent.click(checkboxes[5]);
    userEvent.click(checkboxes[6]);
    userEvent.click(checkboxes[7]);
    expect(finishBtn).toHaveProperty('disabled', false);
    userEvent.click(checkboxes[0]);
    expect(finishBtn).toHaveProperty('disabled');
    userEvent.click(checkboxes[0]);
    userEvent.click(finishBtn);
    const doneRecipes = await screen.findByRole('heading', { name: /done recipes/i });
    expect(doneRecipes).toBeInTheDocument();
    expect(history.location.pathname).toBe(doneRecipesRoute);
  });
});
