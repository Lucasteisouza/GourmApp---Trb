import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { fetchDrinksById, fetchMealsById } from '../services/fetch';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/RecipeInProgress.css';

function RecipeInProgress({ match, history }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredientList, setIngredientList] = useState(null);
  const [ingredientCheck, setIngredientCheck] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [shared, setShared] = useState(false);
  const favoriteLocal = (JSON.parse(localStorage.getItem('favoriteRecipes'))) || [];
  const [favorites, setFavorites] = useState(favoriteLocal);
  const recipeId = match.params.id;
  const { pathname } = history.location;
  const mealOrDrink = pathname.includes('meal') ? 'meals' : 'drinks';
  const checkerLocalStorage = JSON.parse(localStorage.getItem('checkerList'));

  const isFavorited = favorites.find((e) => e.id === recipeId);

  const fetcher = async () => {
    const currentMealOrDrinkResponse = mealOrDrink === 'meals'
      ? await fetchMealsById(recipeId)
      : await fetchDrinksById(recipeId);
    const currentMealOrDrink = currentMealOrDrinkResponse[mealOrDrink][0];
    setCurrentRecipe(currentMealOrDrink);
    const currentIngredientEntries = Object.entries(currentMealOrDrink);
    const currentIngredientList = currentIngredientEntries
      .filter((e) => e[0].includes('Ingredient') && e[1])
      .map((e) => e[1]);
    setIngredientList(currentIngredientList);
    if (!checkerLocalStorage) {
      const checkerArr = new Array(currentIngredientList.length).fill('not-done');
      setIngredientCheck(checkerArr);
      const firstAcessChecker = { meals: {}, drinks: {} };
      localStorage.setItem('checkerList', JSON.stringify(firstAcessChecker));
    } else if (checkerLocalStorage[mealOrDrink][recipeId] === undefined) {
      const checkerArr = new Array(currentIngredientList.length).fill('not-done');
      const newLocal = { ...checkerLocalStorage,
        [mealOrDrink]: { ...checkerLocalStorage.meals, [recipeId]: checkerArr } };
      localStorage.setItem('checkerList', JSON.stringify(newLocal));
      setIngredientCheck(checkerArr);
    } else {
      setIngredientCheck(checkerLocalStorage[mealOrDrink][recipeId]);
    }

    const details = pathname.includes('meals')
      ? (
        <div>
          <h3 data-testid="recipe-title">
            { currentMealOrDrink.strMeal }
          </h3>
          <p data-testid="recipe-category">
            { currentMealOrDrink.strCategory }
          </p>
          <img
            src={ currentMealOrDrink.strMealThumb }
            alt={ currentMealOrDrink.strMeal }
            data-testid="recipe-photo"
          />
          <p data-testid="instructions">
            { currentMealOrDrink.strInstructions }
          </p>
        </div>)
      : (
        <div>
          <h3 data-testid="recipe-title">
            { currentMealOrDrink.strDrink }
          </h3>
          <p data-testid="recipe-category">
            { currentMealOrDrink.strAlcoholic }
          </p>
          <img
            src={ currentMealOrDrink.strDrinkThumb }
            alt={ currentMealOrDrink.strDrink }
            data-testid="recipe-photo"
          />
          <p data-testid="instructions">
            { currentMealOrDrink.strInstructions }
          </p>
        </div>);
    setRecipeDetails(details);
  };

  useEffect(() => {
    fetcher();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFinishRecipe = () => {
    const localFinished = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const infoForFinished = {
      id: recipeId,
      type: mealOrDrink === 'meals' ? 'meal' : 'drink',
      nationality: currentRecipe.strArea === undefined ? '' : currentRecipe.strArea,
      category: currentRecipe.strCategory,
      alcoholicOrNot: mealOrDrink === 'drinks' ? currentRecipe.strAlcoholic : '',
      name: mealOrDrink === 'meals' ? currentRecipe.strMeal : currentRecipe.strDrink,
      image: mealOrDrink === 'meals'
        ? currentRecipe.strMealThumb : currentRecipe.strDrinkThumb,
      doneDate: new Date().toISOString(),
      tags: typeof currentRecipe.strTags === 'string'
        ? currentRecipe.strTags.split(',') : [],
    };
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...localFinished, infoForFinished]),
    );

    history.push('/done-recipes');
  };

  const handleCheckedItem = (index) => {
    const newChecker = ingredientCheck.slice();
    if (newChecker[index] === 'not-done') {
      newChecker.splice(index, 1, 'done');
    } else {
      newChecker.splice(index, 1, 'not-done');
    }
    const newLocal = { ...checkerLocalStorage,
      [mealOrDrink]: { ...checkerLocalStorage.meals, [recipeId]: newChecker } };
    localStorage.setItem('checkerList', JSON.stringify(newLocal));
    setIngredientCheck(newChecker);
  };

  const handleShare = () => {
    copy(`http://localhost:3000/${mealOrDrink}/${recipeId}`);
    setShared(true);
  };

  const handleFavorite = () => {
    if (isFavorited) {
      const removedCurrent = favorites.filter((e) => e.id !== recipeId);
      setFavorites(removedCurrent);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removedCurrent));
    } else {
      const infoForFavorite = {
        id: recipeId,
        type: mealOrDrink === 'meals' ? 'meal' : 'drink',
        nationality: currentRecipe.strArea === undefined ? '' : currentRecipe.strArea,
        category: currentRecipe.strCategory,
        alcoholicOrNot: mealOrDrink === 'drinks' ? currentRecipe.strAlcoholic : '',
        name: mealOrDrink === 'meals' ? currentRecipe.strMeal : currentRecipe.strDrink,
        image: mealOrDrink === 'meals'
          ? currentRecipe.strMealThumb : currentRecipe.strDrinkThumb,
      };
      setFavorites([...favorites, infoForFavorite]);
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favorites, infoForFavorite]),
      );
    }
  };

  return (
    <div>
      <h1>RecipeInProgress</h1>
      { recipeDetails }
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        Compartilhar
      </button>
      { shared && <p>Link copied!</p>}
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavorite }
        src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
      >
        <img src={ isFavorited ? blackHeartIcon : whiteHeartIcon } alt="favIcon" />
      </button>
      { ingredientList
      && (
        <ul>
          { ingredientList.map((e, index) => (
            <li key={ index }>
              <label
                htmlFor={ `input${index}` }
                data-testid={ `${index}-ingredient-step` }
                className={ ingredientCheck[index] }
              >
                <span>{ e }</span>
                <input
                  type="checkbox"
                  name={ `input${index}` }
                  id={ `input${index}` }
                  onChange={ () => handleCheckedItem(index) }
                  checked={ ingredientCheck[index] === 'done' }
                />
              </label>
            </li>)) }
        </ul>)}
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleFinishRecipe }
        disabled={ !ingredientCheck.every((e) => e === 'done') }
      >
        Finalizar receita
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
