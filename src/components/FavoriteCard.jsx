import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard({ name, thumbnail, index, category,
  nationality, id, type, alcoholicOrNot, setRecipes }) {
  const history = useHistory();
  const [shared, setShared] = useState(false);

  const redirect = () => {
    history.push(`/${type}s/${id}`);
  };

  const removeFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setRecipes(newFavoriteRecipes);
  };

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <button onClick={ redirect }>
        <img
          src={ thumbnail }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          width="50"
        />
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </button>

      <p data-testid={ `${index}-horizontal-top-text` }>
        {type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot}
      </p>

      <button
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
        onClick={ removeFavorite }
      >
        Desfavoritar
      </button>

      <button
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ () => {
          copy(`http://localhost:3000/${type}s/${id}`);
          setShared(true);
        } }
      >
        Share
      </button>
      { shared && <p>Link copied!</p>}

    </div>
  );
}

FavoriteCard.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  setRecipes: PropTypes.func.isRequired,
};

export default FavoriteCard;
