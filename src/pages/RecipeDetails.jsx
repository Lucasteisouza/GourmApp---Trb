import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Loading from '../components/Loading';
import useCreateUrl from '../hooks/useCreateUrl';
import useFetch from '../hooks/useFetch';

function RecipeDetails() {
  const { params } = useRouteMatch();
  const [,, fullUrl] = useCreateUrl(`lookup.php?i=${params.id}`);
  const { data, loading, fetchData } = useFetch();

  useState(() => {
    const makeFetch = async () => {
      await fetchData(fullUrl);
    };
    makeFetch();
  }, []);

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
            { `${details.strCategory} - ${details.strAlcoholic}` }
          </p>

          <img
            src={ details.strMealThumb || details.strDrinkThumb }
            alt={ details.strMeal || details.strDrink }
            data-testid="recipe-photo"
          />

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
    </div>
  );
}

export default RecipeDetails;
