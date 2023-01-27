import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/context';

export default function SearchBar() {
  const [searchRadio, setSearchRadio] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();

  const { fetchData, setRecipes } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { pathname } = history.location;

    const url = {
      baseUrl: pathname === '/meals'
        ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/',
      endPoint: '',
    };

    if (searchRadio === 'ingredient') {
      url.endPoint = `filter.php?i=${searchInput}`;
    } else if (searchRadio === 'name') {
      url.endPoint = `search.php?s=${searchInput}`;
    } else if (searchRadio === 'first-letter') {
      url.endPoint = `search.php?f=${searchInput}`;
    }

    if (searchRadio === 'first-letter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const mealsOrDrink = await fetchData(url.baseUrl + url.endPoint);

    const pageName = pathname.split('/')[1];

    const results = mealsOrDrink[pageName];

    if (!results) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }

    if (results.length === 1) {
      history.push(`${history.location.pathname}/${results[0].idMeal
        || results[0].idDrink}`);
      return;
    }

    setRecipes((prevState) => ({ ...prevState, [pageName]: results }));
    history.push(pathname);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        name="search-input"
        id="search-input"
        data-testid="search-input"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
        required
      />
      <label htmlFor="ingredient-search-radio">
        <input
          name="searchRadio"
          type="radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ ({ target }) => setSearchRadio(target.value) }
          required
        />
        Ingredient
      </label>
      <label htmlFor="name-search-radio">
        <input
          name="searchRadio"
          type="radio"
          id="name-search-radio"
          data-testid="name-search-radio"
          value="name"
          onChange={ ({ target }) => setSearchRadio(target.value) }
          required
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          name="searchRadio"
          type="radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          value="first-letter"
          onChange={ ({ target }) => setSearchRadio(target.value) }
          required
        />
        First letter
      </label>
      <button
        data-testid="exec-search-btn"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
