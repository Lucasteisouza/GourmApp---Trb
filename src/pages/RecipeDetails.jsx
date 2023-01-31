import copy from 'clipboard-copy';
import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Loading from '../components/Loading';
import useCreateUrl from '../hooks/useCreateUrl';
import useFetch from '../hooks/useFetch';
import { ReactComponent as ShareIcon } from '../images/shareIcon.svg';
import '../style/RecipeDetails.css';

const SIX_NUMB = 6;

function RecipeDetails() {
  const { params, path, url } = useRouteMatch();
  const [,, fullUrl] = useCreateUrl(`lookup.php?i=${params.id}`);
  const [recUrl,,, setRecUrl] = useCreateUrl('search.php?s=');
  const [data, loading,, fetchData] = useFetch();
  const [recData, recLoading,, fetchRecs] = useFetch();
  const [showStartRecipes, setShowStartRecipes] = useState(true);
  const [startedRecipes, setStartedRecipe] = useState(false);
  const [copied, setCopied] = useState(false);

  useState(() => {
    const makeFetch = async () => {
      const newUrl = {
        ...recUrl,
        baseUrl: path !== '/meals/:id'
          ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/',
      };
      setRecUrl(newUrl);
      await fetchData(fullUrl);
      await fetchRecs(`${newUrl.baseUrl}search.php?s=`);
    };

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const haveStartedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(haveStartedRecipes);

    if (doneRecipes) {
      const recipes = doneRecipes.find((recipe) => recipe.id === params.id);
      console.log(recipes);
      if (recipes) setShowStartRecipes(false);
    }
    if (haveStartedRecipes) {
      const drinkOrMeal = path === '/meals/:id' ? 'meals' : 'drinks';
      const recipes = haveStartedRecipes[drinkOrMeal][params.id];
      if (recipes) setStartedRecipe(true);
    }

    makeFetch();
  }, []);

  const copyLink = () => {
    copy(window.location.href);
    setCopied(true);
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
            src={ details.strMealThumb || details.strDrinkThumb }
            alt={ details.strMeal || details.strDrink }
            data-testid="recipe-photo"
          />
        </section>
        {
          recLoading || !recData ? <Loading /> : (
            <section className="myCarousel">
              {
                (recData.drinks || recData.meals)
                  .slice(0, SIX_NUMB).map((recommendation, index) => (
                    <div
                      className="myCarousel-item"
                      key={ `${index}-recommendation` }
                      data-testid={ `${index}-recommendation-card` }
                    >
                      <img
                        src={ recommendation.strDrinkThumb
                        || recommendation.stMealThumb }
                        alt={ recommendation.strDrink || recommendation.strMeal }
                      />
                      <h4
                        data-testid={ `${index}-recommendation-title` }
                      >
                        {recommendation.strDrink || recommendation.strMeal}
                      </h4>
                    </div>
                  ))
              }
            </section>

          )
        }
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
                src={ `${details.strYoutube.split('.com/').join('.com/embed/')}` }
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
        copied && <h5>Link copiado!</h5>
      }
      <button
        onClick={ copyLink }
        data-testid="share-btn"
      >
        <ShareIcon />
      </button>
      <button data-testid="favorite-btn">favorite</button>
    </div>
  );
}

export default RecipeDetails;
