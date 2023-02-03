import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const PASSWORD = 'password-input';
const EMAIL = 'email-input';

describe('testa a página de login e suas funcionalidades', () => {
  test('testa a presença dos campos e do botão', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId(PASSWORD);
    const emailInput = screen.getByTestId(EMAIL);
    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  test('testa se o botao é habilitado ao preencher os campos corretamente e redireciona para /meals', () => {
    const { history } = renderWithRouter(<App />);
    const passwordInput = screen.getByTestId(PASSWORD);
    const emailInput = screen.getByTestId(EMAIL);
    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(btn).toHaveProperty('disabled');
    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '1234567');
    expect(btn).toHaveProperty('disabled', false);
    userEvent.click(btn);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
