import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React from 'react';

function Card({ name, thumbnail, index, id, meal = true }) {
  const history = useHistory();

  const redirect = () => {
    if (meal) {
      history.push(`/meals/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  return (
    <button onClick={ redirect } data-testid={ `${index}-recipe-card` }>
      <img
        src={ thumbnail }
        alt={ name }
        data-testid={ `${index}-card-img` }
        width="50"
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </button>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  meal: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default Card;
