import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const loginSuccess = () => {
  const passwordInput = screen.getByTestId('password-input');
  const emailInput = screen.getByTestId('email-input');
  const btn = screen.getByRole('button', { name: /entrar/i });
  expect(btn).toHaveProperty('disabled');
  userEvent.type(emailInput, 'email@email.com');
  userEvent.type(passwordInput, '1234567');
  expect(btn).toHaveProperty('disabled', false);
  userEvent.click(btn);
};
