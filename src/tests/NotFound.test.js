import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/provider';

describe('testa rota não encontrada', () => {
  test('deve exibir Page Not Found', () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    act(() => { history.push('/xablau'); });
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
