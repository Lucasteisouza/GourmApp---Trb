import oneMeal from '../../../cypress/mocks/oneMeal';
import drinks from '../../../cypress/mocks/drinks';
import meals from '../../../cypress/mocks/meals';
import mealsByIngredient from '../../../cypress/mocks/mealsByIngredient';
import firstLetterN from './firstLetterN';
import emptyMock from './emptyMock';
import drinkLetterY from './drinkLetterY';

const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const mockFetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === `${MEALS_URL}search.php?s=Brown Stew Chicken`) {
      return Promise.resolve(oneMeal);
    }

    if (url === `${DRINKS_URL}search.php?s=`) {
      return Promise.resolve(drinks);
    }

    if (url === `${MEALS_URL}search.php?s=`) {
      return Promise.resolve(meals);
    }

    if (url === `${MEALS_URL}filter.php?i=chicken`) {
      return Promise.resolve(mealsByIngredient);
    }

    if (url === `${MEALS_URL}search.php?f=n`) {
      return Promise.resolve(firstLetterN);
    }

    if (url === `${DRINKS_URL}search.php?s=barabam`
      || url === `${MEALS_URL}search.php?s=barabam`) {
      return Promise.resolve(emptyMock);
    }

    if (url === `${DRINKS_URL}search.php?f=y`
    || url === `${MEALS_URL}search.php?f=y`) {
      return Promise.resolve(drinkLetterY);
    }
  },
});

export default mockFetch;
