import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { fetchDrinks, fetchMeals } from '../services/fetch';
import context from '../context/context';
import Card from '../components/Card';

function Recipes() {
  const { recipes, setRecipes } = useContext(context);
  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    const meals = async () => {
      const list = await fetchMeals();
      setRecipes((prevRecipes) => ({ ...prevRecipes, meals: list.meals }));
    };
    meals();
    const drinks = async () => {
      const list = await fetchDrinks();
      setRecipes((prevRecipes) => ({ ...prevRecipes, drinks: list.drinks }));
    };
    drinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CARD_LENGTH = 12;

  return (
    <div>
      <Header />
      {pathname === '/drinks'
      && recipes.drinks.slice(0, CARD_LENGTH).map((drink, index) => (<Card
        key={ drink.idDrink }
        index={ index }
        name={ drink.strDrink }
        id={ drink.idDrink }
        meal
        thumbnail={ drink.strDrinkThumb }
      />))}
      {pathname === '/meals'
      && recipes.meals.slice(0, CARD_LENGTH).map((meal, index) => (<Card
        key={ meal.idMeal }
        index={ index }
        name={ meal.strMeal }
        id={ meal.idMeal }
        meal
        thumbnail={ meal.strMealThumb }
      />))}
    </div>
  );
}

export default Recipes;
