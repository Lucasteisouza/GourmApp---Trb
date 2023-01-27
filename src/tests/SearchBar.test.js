import { act, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { loginSuccess } from './helpers/login';
import renderWithRouter from './helpers/renderWithRouter';
import { searchFor, showSearchBar } from './helpers/search';

import mockFetch from './mocks/mockFetch';

const firstLetterString = 'first-letter';

describe('Testando o SearchBar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    jest.spyOn(global, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Testa se ao pesqisar por ingrediente retorna as comidas certas', async () => {
    renderWithRouter(<App />);
    loginSuccess();

    await showSearchBar();

    searchFor('chicken', 'ingredient');

    const brownStewChicken = await screen.findByTestId('0-recipe-card');
    expect(brownStewChicken).toBeInTheDocument();
  });

  test('Testa se ao pesquisar por nome retorna a comida certa e muda de página', async () => {
    const { history } = renderWithRouter(<App />);
    loginSuccess();

    await showSearchBar();

    searchFor('Brown Stew Chicken', 'name');

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
  });

  test('Testa se ao pesquisar por \'first-letter\' retorna a comida correta.', async () => {
    const { history } = renderWithRouter(<App />);
    loginSuccess();

    await showSearchBar();

    searchFor('n', firstLetterString);

    const allCards = await screen.findAllByTestId(/-recipe-card/);
    const firstCard = await screen.findByTestId('0-card-name');

    expect(allCards.length).toBe(4);
    expect(history.location.pathname).toBe('/meals');
    expect(firstCard).toHaveTextContent('Nutty Chicken Curry');
  });

  test('Testa se o alerta de first letter aparece.', async () => {
    renderWithRouter(<App />);
    act(() => {
      loginSuccess();
    });

    await showSearchBar();

    searchFor('barabam', firstLetterString);

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('Testa se o alerta de empty aparece.', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      loginSuccess();
    });

    history.push('/drinks');

    await showSearchBar();

    searchFor('barabam', 'name');

    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'));
  });

  test('Testa se no caminho drinks a url da api muda.', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      loginSuccess();
    });

    history.push('/drinks');

    await showSearchBar();

    searchFor('y', firstLetterString);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y');

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/17219'));
  });
});
