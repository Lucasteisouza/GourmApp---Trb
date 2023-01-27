import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinks, fetchMeals, fetchMealCategories,
  fetchDrinkCategories, fetchDrinkByCategory,
  fetchMealByCategory } from '../services/fetch';
import context from '../context/context';
import Card from '../components/Card';

function Recipes() {
  const { recipes, setRecipes } = useContext(context);
  const [categories, setCategories] = useState({
    meals: [],
    drinks: [],
  });
  const [filter, setFilter] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  const meals = async () => {
    const mealList = await fetchMeals();
    setRecipes((prevRecipes) => ({ ...prevRecipes, meals: mealList.meals }));
    const catList = await fetchMealCategories();
    setCategories((prevCategories) => ({ ...prevCategories, meals: catList.meals }));
  };

  const drinks = async () => {
    const list = await fetchDrinks();
    setRecipes((prevRecipes) => ({ ...prevRecipes, drinks: list.drinks }));
    const catList = await fetchDrinkCategories();
    setCategories((prevCategories) => ({ ...prevCategories, drinks: catList.drinks }));
  };

  const toggleDrinkFilter = async ({ target: { name } }) => {
    if (!filter) {
      const list = await fetchDrinkByCategory(name);
      setRecipes((prevRecipes) => ({ ...prevRecipes, drinks: list.drinks }));
      setFilter(true);
    } else {
      drinks();
      setFilter(false);
    }
  };

  const toggleMealFilter = async ({ target: { name } }) => {
    if (!filter) {
      const list = await fetchMealByCategory(name);
      setRecipes((prevRecipes) => ({ ...prevRecipes, meals: list.meals }));
      setFilter(true);
    } else {
      meals();
      setFilter(false);
    }
  };

  const resetFilter = async () => {
    setFilter(false);
    meals();
    drinks();
  };

  useEffect(() => {
    meals();
    drinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CARD_LENGTH = 12;
  const CAT_LENGTH = 5;

  return (
    <div>
      <Header />
      <button data-testid="All-category-filter" onClick={ resetFilter }>All</button>
      {pathname === '/drinks'
      && categories.drinks.slice(0, CAT_LENGTH).map((cat) => (
        <button
          key={ cat.strCategory }
          data-testid={ `${cat.strCategory}-category-filter` }
          name={ cat.strCategory }
          onClick={ toggleDrinkFilter }
        >
          {cat.strCategory}
        </button>))}
      {pathname === '/drinks'
      && recipes.drinks.slice(0, CARD_LENGTH).map((drink, index) => (<Card
        key={ drink.idDrink }
        index={ index }
        name={ drink.strDrink }
        id={ drink.idDrink }
        meal={ false }
        thumbnail={ drink.strDrinkThumb }
      />))}

      {pathname === '/meals'
      && categories.meals.slice(0, CAT_LENGTH).map((cat) => (
        <button
          key={ cat.strCategory }
          data-testid={ `${cat.strCategory}-category-filter` }
          name={ cat.strCategory }
          onClick={ toggleMealFilter }
        >
          {cat.strCategory}
        </button>))}
      {pathname === '/meals'
      && recipes.meals.slice(0, CARD_LENGTH).map((meal, index) => (<Card
        key={ meal.idMeal }
        index={ index }
        name={ meal.strMeal }
        id={ meal.idMeal }
        meal
        thumbnail={ meal.strMealThumb }
      />))}

      <Footer />
    </div>
  );
}

export default Recipes;
