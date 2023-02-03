import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const storedDoneRecipesMock = [
  {
    id: '52772',
    type: 'meal',
    nationality: 'Japanese',
    category: 'Chicken',
    alcoholicOrNot: '',
    name: 'Teriyaki Chicken Casserole',
    image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    doneDate: '2023-02-02T00:46:22.658Z',
    tags: [
      'Meat',
      'Casserole',
    ],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '2023-02-02T01:48:14.946Z',
    tags: [],
  },
];

const storedProgress = {
  meals: {
    52771: [
      'done',
      'done',
      'done',
      'not-done',
      'not-done',
      'not-done',
      'not-done',
      'not-done',
    ],
  },
  drinks: {},
};

const ARRABIATA_URL = '/meals/52771/in-progress';
const FAVORITE_BTN = 'favorite-btn';
const doneRecipesRoute = '/done-recipes';

jest.mock('clipboard-copy', () => jest.fn());
const copy = require('clipboard-copy');

const mockFetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === `${MEALS_URL}lookup.php?i=52771`) {
      return Promise.resolve(oneMeal);
    }

    if (url === `${DRINKS_URL}lookup.php?i=178319`) {
      return Promise.resolve(oneDrink);
    }
  },
});

describe('Testa a tela in-progress', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    jest.spyOn(global, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('testa se a receita correta é renderizada na página /52771/in-progress', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(ARRABIATA_URL));
    const arrabiata = await screen.findByRole('heading', { name: /spicy arrabiata penne/i });
    expect(arrabiata).toBeInTheDocument();
  });

  it('testa se a receita correta é renderizada na página /52771/in-progress com o progresso salvo', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('checkerList', JSON.stringify(storedProgress));
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

  it('testa se a aplicação funciona com um localStorage', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify(storedDoneRecipesMock));
    act(() => history.push(ARRABIATA_URL));
    const finishBtn = await screen.findByRole('button', { name: /finalizar receita/i });
    expect(finishBtn).toBeInTheDocument();
    expect(finishBtn).toHaveProperty('disabled');
    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes.length).toBe(8);
    act(() => {
      userEvent.click(checkboxes[0]);
      userEvent.click(checkboxes[1]);
      userEvent.click(checkboxes[2]);
      userEvent.click(checkboxes[3]);
      userEvent.click(checkboxes[4]);
      userEvent.click(checkboxes[5]);
      userEvent.click(checkboxes[6]);
      userEvent.click(checkboxes[7]);
    });
    act(() => userEvent.click(finishBtn));
    const doneRecipes = await screen.findByRole('heading', { name: /done recipes/i });
    expect(doneRecipes).toBeInTheDocument();
    expect(history.location.pathname).toBe(doneRecipesRoute);
  });

  it('testa se a aplicação funciona sem um localStorage', async () => {
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

  it('testa se a aplicação funciona para drinks com um localStorage', async () => {
    localStorage.setItem('checkerList', JSON.stringify(storedProgress));
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks/178319/in-progress'));
    const finishBtn = await screen.findByRole('button', { name: /finalizar receita/i });
    expect(finishBtn).toBeInTheDocument();
    expect(finishBtn).toHaveProperty('disabled');
    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes.length).toBe(3);
    const favBtn = screen.getByTestId(FAVORITE_BTN);
    act(() => userEvent.click(favBtn));
    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    userEvent.click(checkboxes[2]);
    expect(finishBtn).toHaveProperty('disabled', false);
    userEvent.click(checkboxes[0]);
    expect(finishBtn).toHaveProperty('disabled');
    userEvent.click(checkboxes[0]);
    userEvent.click(finishBtn);
    const doneRecipes = await screen.findByRole('heading', { name: /done recipes/i });
    expect(doneRecipes).toBeInTheDocument();
    expect(history.location.pathname).toBe(doneRecipesRoute);
  });

  it('testa os botões de compartilhar e favoritar', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(storedDoneRecipesMock));
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks/178319/in-progress'));
    const shareBtn = screen.getByTestId('share-btn');
    act(() => userEvent.click(shareBtn));
    expect(copy).toHaveBeenCalled();
    const favBtn = screen.getByTestId(FAVORITE_BTN);
    act(() => userEvent.click(favBtn));
  });

  it('testa os botões de compartilhar e favoritar com meal', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(storedDoneRecipesMock));
    const { history } = renderWithRouter(<App />);
    act(() => history.push(ARRABIATA_URL));
    const shareBtn = screen.getByTestId('share-btn');
    act(() => userEvent.click(shareBtn));
    expect(copy).toHaveBeenCalled();
    const favBtn = screen.getByTestId(FAVORITE_BTN);
    act(() => {
      userEvent.click(favBtn);
      userEvent.click(favBtn);
      userEvent.click(favBtn);
    });
  });
});
