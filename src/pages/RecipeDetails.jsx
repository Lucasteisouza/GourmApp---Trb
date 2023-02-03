import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Loading from '../components/Loading';
import useCreateUrl from '../hooks/useCreateUrl';
import useFetch from '../hooks/useFetch';
import { ReactComponent as ShareIcon } from '../images/shareIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg';
import '../style/RecipeDetails.css';
import Carousel from '../components/Carousel';

function RecipeDetails() {
  const { params, path, url } = useRouteMatch();
  const [,, fullUrl] = useCreateUrl(`lookup.php?i=${params.id}`);
  const [recUrl,,, setRecUrl] = useCreateUrl('search.php?s=');
  const [data, loading,, fetchData] = useFetch();
  const [recData, recLoading,, fetchRecs] = useFetch();
  const [showStartRecipes, setShowStartRecipes] = useState(true);
  const [startedRecipes, setStartedRecipe] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const drinkOrMeal = path === '/meals/:id' ? 'meals' : 'drinks';
    const makeFetch = async () => {
      const newUrl = {
        ...recUrl,
        baseUrl: drinkOrMeal !== 'meals'
          ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/',
      };
      setRecUrl(newUrl);
      await fetchData(fullUrl);
      await fetchRecs(`${newUrl.baseUrl}search.php?s=`);
    };

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const haveStartedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (doneRecipes) {
      const recipes = doneRecipes.find((recipe) => recipe.id === params.id);
      if (recipes) setShowStartRecipes(false);
    }
    if (haveStartedRecipes) {
      const recipes = haveStartedRecipes[drinkOrMeal][params.id];
      if (recipes) setStartedRecipe(true);
    }
    if (favorites) {
      const recipes = favorites.find((recipe) => recipe.id === params.id);
      if (recipes) setFavorited(true);
    }

    makeFetch();
  }, []);

  const copyLink = () => {
    copy(window.location.href);
    setCopied(true);
  };

  const favoriteRecipe = () => {
    const drinkOrMeal = path === '/meals/:id' ? 'meals' : 'drinks';
    const actualRecipe = data[drinkOrMeal][0];
    const item = {
      id: params.id,
      type: drinkOrMeal.slice(0, drinkOrMeal.length - 1),
      nationality: actualRecipe.strArea || '',
      category: actualRecipe.strCategory,
      alcoholicOrNot: actualRecipe.strAlcoholic || '',
      name: actualRecipe.strMeal || actualRecipe.strDrink,
      image: actualRecipe.strMealThumb || actualRecipe.strDrinkThumb,
    };

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorited(!favorited);
    if (!favorites) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([item]));
      return;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, item]));
  };

  if (loading || !data) return <Loading />;

  const [details] = data.meals || data.drinks;
  const ingredients = Object.entries(details)
    .filter((key) => key[0].includes('strIngredient') && key[1]);
  const measurement = Object.entries(details)
    .filter((key) => key[0].includes('strMeasure') && key[1]);

  return (
    <div>
      <main>
        <section>
          <h3 data-testid="recipe-title">{ details.strMeal || details.strDrink }</h3>
          <p data-testid="recipe-category">
            { `${details.strCategory} - ${details.strAlcoholic || details.strTags}` }
          </p>

          <img
            className="recipe-photo"
            src={ details.strMealThumb || details.strDrinkThumb }
            alt={ details.strMeal || details.strDrink }
            data-testid="recipe-photo"
          />
        </section>
        <Carousel recLoading={ recLoading } recData={ recData } />
        <section>
          {
            ingredients.map((ingredient, index) => (
              <p
                key={ `${index}-ingredient-name-and-measure` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient[1]} - ${measurement[index][1]}`}
              </p>
            ))
          }
          <p data-testid="instructions">{details.strInstructions}</p>
          {
            details.strYoutube && (
              <iframe
                data-testid="video"
                title="video"
                width="420"
                height="315"
                src={ details.strYoutube.replace('watch?v=', 'embed/') }
                allowFullScreen
              />
            )
          }
        </section>
      </main>
      {showStartRecipes && (
        <Link
          className="start-recipes"
          to={ `${url}/in-progress` }
          data-testid="start-recipe-btn"
        >
          { startedRecipes ? 'Continue Recipe' : 'Start Recipe'}
        </Link>
      )}
      {
        copied && <h5>Link copied!</h5>
      }
      <button
        onClick={ copyLink }
        data-testid="share-btn"
      >
        <ShareIcon />
      </button>
      <button onClick={ favoriteRecipe }>
        <img
          data-testid="favorite-btn"
          src={ favorited ? BlackHeart : WhiteHeart }
          alt="favorite"
        />
      </button>
    </div>
  );
}

export default RecipeDetails;
