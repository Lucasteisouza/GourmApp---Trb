import PropTypes from 'prop-types';
import React from 'react';
import Loading from './Loading';
import '../style/RecipeDetails.css';

const SIX_NUMB = 6;

function Carousel({ recLoading, recData }) {
  return (
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
                    || recommendation.strMealThumb }
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
  );
}

Carousel.propTypes = {
  recData: PropTypes.shape({
    drinks: PropTypes.shape(),
    meals: PropTypes.shape(),
  }),
  recLoading: PropTypes.bool,
}.isRequired;

export default Carousel;
