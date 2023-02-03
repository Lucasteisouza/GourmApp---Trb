import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import RecipeDetails from '../pages/RecipeDetails';
import { loginSuccess } from './helpers/login';
import renderWithRouter from './helpers/renderWithRouter';
import mockFetch from './mocks/mockFetch';

const mealsPath = '/meals/52771';
const loadingStr = 'Loading...';

let store = {
  doneRecipes: JSON.stringify([{ id: 52977, type: 'meals', area: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba' }]),
  favoriteRecipes: JSON.stringify([{ id: 52977, type: 'meals', area: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba' }]),
  inProgressRecipes: JSON.stringify({ meals: { 52771: [] }, drinks: {} }),
};

// console.log(JSON.parse(store.doneRecipes).find((e) => e.id === 52977));

describe('Testa RecipeDetails', () => {
  beforeEach(() => {
    const localStorageMock = (() => ({
      getItem(key) {
        return store[key] || null;
      },

      setItem(key, value) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key) {
        delete store[key];
      },

      getAll() {
        return store;
      },
    }))();

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Testa se ao entrar na página é feita uma requisição e mostra na tela a foto da comida', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      loginSuccess();
      history.push(mealsPath);
    });

    expect(history.location.pathname).toBe(mealsPath);
    await waitFor(async () => {
      const recipePhoto = await screen.findByTestId('recipe-photo');
      expect(recipePhoto).toBeInTheDocument();
      expect(recipePhoto).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    });
  });

  test('Testa se ao entrar na página é feita uma requisição e mostra na tela a foto da bebida', async () => {
    const { history } = renderWithRouter(<RecipeDetails />);
    act(() => {
      // loginSuccess();
      history.push('/drinks/178319');
    });

    expect(history.location.pathname).toBe('/drinks/178319');
  });

  test('Testa se é chamado os ifs', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      loginSuccess();
      history.push(mealsPath);
    });

    expect(history.location.pathname).toBe(mealsPath);
    // debug();
    await waitForElementToBeRemoved(() => screen.getByText(loadingStr));

    const btn = screen.getByTestId('start-recipe-btn');
    await waitFor(() => expect(btn).toBeInTheDocument());
    expect(btn).toHaveTextContent('Continue Recipe');
    // debug();
  });

  test('Testa botão de compartilhar', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    const mocked = jest.spyOn(navigator.clipboard, 'writeText');

    const { history } = renderWithRouter(<App />);
    act(() => {
      loginSuccess();
      history.push(mealsPath);
    });
    expect(history.location.pathname).toBe(mealsPath);
    await waitForElementToBeRemoved(() => screen.getByText(loadingStr));

    const shareBtn = screen.getByTestId('share-btn');
    fireEvent.click(shareBtn);

    expect(mocked).toHaveBeenCalledWith(window.location.href);
  });

  test('Testa se o ícone de favoritos muda ao favoritar', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      loginSuccess();
      history.push(mealsPath);
    });
    expect(history.location.pathname).toBe(mealsPath);
    await waitForElementToBeRemoved(() => screen.getByText(loadingStr));

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn.src).toBe('http://localhost/whiteHeartIcon.svg');
    fireEvent.click(favoriteBtn);
    expect(favoriteBtn.src).toBe('http://localhost/blackHeartIcon.svg');
  });

  test('Testa se caso não tenha nada no localStorage, se o if passa.', async () => {
    delete store.favoriteRecipes;
    const { history } = renderWithRouter(<App />);
    act(() => {
      loginSuccess();
      history.push(mealsPath);
    });
    expect(history.location.pathname).toBe(mealsPath);
    await waitForElementToBeRemoved(() => screen.getByText(loadingStr));

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn.src).toBe('http://localhost/whiteHeartIcon.svg');
    fireEvent.click(favoriteBtn);
    expect(favoriteBtn.src).toBe('http://localhost/blackHeartIcon.svg');
  });

  test('Testa se caso não tenha nada no localStorage, se o if passa.', async () => {
    store = {
      doneRecipes: JSON.stringify([{ id: 52977, type: 'meals', area: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba' }]),
      favoriteRecipes: JSON.stringify([{ id: 52977, type: 'meals', area: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba' }]),
    };
    const { history } = renderWithRouter(<App />);
    act(() => {
      loginSuccess();
      history.push(mealsPath);
    });
    expect(history.location.pathname).toBe(mealsPath);
    await waitForElementToBeRemoved(() => screen.getByText(loadingStr));
  });
});
