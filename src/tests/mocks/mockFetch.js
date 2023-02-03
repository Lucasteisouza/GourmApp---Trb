import oneMeal from '../../../cypress/mocks/oneMeal';
import drinks from '../../../cypress/mocks/drinks';
import drinkCategories from '../../../cypress/mocks/drinkCategories';
import cocktailDrinks from '../../../cypress/mocks/cocktailDrinks';
import mealCategories from '../../../cypress/mocks/mealCategories';
import meals from '../../../cypress/mocks/meals';
import mealsByIngredient from '../../../cypress/mocks/mealsByIngredient';
import beefMeals from '../../../cypress/mocks/beefMeals';
import firstLetterN from './firstLetterN';
import emptyMock from './emptyMock';
import drinkLetterY from './drinkLetterY';
import oneDrink from '../../../cypress/mocks/oneDrink';

const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const mealsFunc = (url) => {
  if (url === `${MEALS_URL}search.php?s=Brown Stew Chicken`) {
    return oneMeal;
  }
  if (url === `${MEALS_URL}search.php?s=`) {
    return meals;
  }
  if (url === `${MEALS_URL}filter.php?i=chicken`) {
    return mealsByIngredient;
  }
  if (url === `${MEALS_URL}search.php?f=n`) {
    return firstLetterN;
  }
  if (url === `${MEALS_URL}list.php?c=list`) {
    return mealCategories;
  }
  if (url === `${MEALS_URL}filter.php?c=Beef`) {
    return beefMeals;
  }
  if (url === `${MEALS_URL}lookup.php?i=52771`) {
    return oneMeal;
  }
};

const drinksFunc = (url) => {
  if (url === `${DRINKS_URL}search.php?s=`) {
    return drinks;
  }
  if (url === `${DRINKS_URL}list.php?c=list`) {
    return drinkCategories;
  }
  if (url === `${DRINKS_URL}filter.php?c=Cocktail`) {
    return cocktailDrinks;
  }

  if (url === `${DRINKS_URL}lookup.php?i=178319`) {
    return oneDrink;
  }
};

const mockFetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === `${DRINKS_URL}search.php?s=barabam`
      || url === `${MEALS_URL}search.php?s=barabam`) {
      return Promise.resolve(emptyMock);
    }

    if (url === `${DRINKS_URL}search.php?f=y`
    || url === `${MEALS_URL}search.php?f=y`) {
      return Promise.resolve(drinkLetterY);
    }

    if (url.includes(MEALS_URL)) {
      return Promise.resolve(mealsFunc(url));
    }

    if (url.includes(DRINKS_URL)) {
      return Promise.resolve(drinksFunc(url));
    }
    // return Promise.resolve(mealsFunc(url) || drinksFunc(url));
  },
});

export default mockFetch;
