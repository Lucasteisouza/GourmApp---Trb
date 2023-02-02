import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from './helpers/renderWithRouter';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

jest.mock('clipboard-copy', () => jest.fn());
const copy = require('clipboard-copy');

const IMAGE_HORIZONTAL1 = '0-horizontal-image';
const IMAGE_HORIZONTAL2 = '1-horizontal-image';
// const SHARE_BTN1 = '0-horizontal-share-btn';
// const SHARE_BTN2 = '1-horizontal-share-btn';
// const FAVORITE_BTN1 = '0-horizontal-favorite-btn';
// const FAVORITE_BTN2 = '1-horizontal-favorite-btn';
const FILTER_ALL_BTN = 'filter-by-all-btn';
const FILTER_FOOD_BTN = 'filter-by-meal-btn';
const FILTER_DRINK_BTN = 'filter-by-drink-btn';

describe('testa a página DoneRecipes e suas funcionalidades', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  afterEach(() => {
    localStorage.clear();
  });
  test('testa se os elementos são carregados corretamente', () => {
    renderWithRouter(<FavoriteRecipes />);

    expect(screen.getByTestId(FILTER_ALL_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(FILTER_FOOD_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(FILTER_DRINK_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(IMAGE_HORIZONTAL1)).toBeInTheDocument();
    expect(screen.getByTestId(IMAGE_HORIZONTAL2)).toBeInTheDocument();
  });
  test('testa os botões da página', () => {
    renderWithRouter(<FavoriteRecipes />);

    const filterAllButton = screen.getByTestId(FILTER_ALL_BTN);
    act(() => {
      userEvent.click(filterAllButton);
    });
    expect(screen.getByTestId(IMAGE_HORIZONTAL1)).toBeInTheDocument();
    expect(screen.getByTestId(IMAGE_HORIZONTAL2)).toBeInTheDocument();

    const filterFoodButton = screen.getByTestId(FILTER_FOOD_BTN);
    act(() => {
      userEvent.click(filterFoodButton);
    });
    expect(screen.getByTestId(IMAGE_HORIZONTAL1)).toBeInTheDocument();
    expect(screen.queryByTestId(IMAGE_HORIZONTAL2)).not.toBeInTheDocument();

    const filterDrinkButton = screen.getByTestId(FILTER_DRINK_BTN);
    act(() => {
      userEvent.click(filterDrinkButton);
    });
    expect(screen.queryByTestId(IMAGE_HORIZONTAL1)).not.toBeInTheDocument();
    expect(screen.getByTestId(IMAGE_HORIZONTAL2)).toBeInTheDocument();
  });
  test('testa o botão de compartilhar e desfavoritar', () => {
    renderWithRouter(<FavoriteRecipes />);

    const shareButton = screen.getAllByTestId('horizontal-share-btn');
    act(() => {
      userEvent.click(shareButton[0]);
    });
    expect(copy).toBeCalledTimes(1);
    expect(copy).toBeCalledWith('http://localhost:3000/comidas/52771');

    const favoriteButton = screen.getAllByTestId('horizontal-favorite-btn');
    act(() => {
      userEvent.click(favoriteButton[0]);
    });
    expect(screen.queryByTestId(IMAGE_HORIZONTAL1)).not.toBeInTheDocument();
    expect(screen.getByTestId(IMAGE_HORIZONTAL2)).toBeInTheDocument();
  });
  test('testa os botões de filtro', () => {
    renderWithRouter(<FavoriteRecipes />);
    const filterAllButton = screen.getByTestId(FILTER_ALL_BTN);
    const filterFoodButton = screen.getByTestId(FILTER_FOOD_BTN);
    const filterDrinkButton = screen.getByTestId(FILTER_DRINK_BTN);

    act(() => {
      userEvent.click(filterAllButton);
    });
    expect(screen.getByTestId(IMAGE_HORIZONTAL1)).toBeInTheDocument();
    expect(screen.getByTestId(IMAGE_HORIZONTAL2)).toBeInTheDocument();

    act(() => {
      userEvent.click(filterFoodButton);
    });
    expect(screen.getByTestId(IMAGE_HORIZONTAL1)).toBeInTheDocument();
    expect(screen.queryByTestId(IMAGE_HORIZONTAL2)).not.toBeInTheDocument();

    act(() => {
      userEvent.click(filterDrinkButton);
    });
    expect(screen.queryByTestId(IMAGE_HORIZONTAL1)).not.toBeInTheDocument();
    expect(screen.getByTestId(IMAGE_HORIZONTAL2)).toBeInTheDocument();

    act(() => {
      userEvent.click(filterAllButton);
    });
    expect(screen.getByTestId(IMAGE_HORIZONTAL1)).toBeInTheDocument();
    expect(screen.getByTestId(IMAGE_HORIZONTAL2)).toBeInTheDocument();
  });
});
