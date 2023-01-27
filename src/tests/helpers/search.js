import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const radioTestsIds = {
  ingredient: 'ingredient-search-radio',
  name: 'name-search-radio',
  'first-letter': 'first-letter-search-radio',
};

/**
 * @param {string} search
 * @param {radioTestsIds} radio
*/
export const searchFor = (search, radio) => {
  const searchInput = screen.getByTestId('search-input');
  expect(searchInput).toBeInTheDocument();
  userEvent.type(searchInput, search);
  const radioFilter = screen.getByTestId(radioTestsIds[radio]);
  expect(radioFilter).toBeInTheDocument();
  fireEvent.click(radioFilter);
  const searchBtn = screen.getByTestId('exec-search-btn');
  expect(searchBtn).toBeInTheDocument();
  fireEvent.click(searchBtn);
};

export const showSearchBar = async () => {
  const searchTopBtn = await screen.findByTestId('search-top-btn');
  fireEvent.click(searchTopBtn);
};
