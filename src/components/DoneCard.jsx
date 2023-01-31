import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneCard({ name, thumbnail, index, category,
  doneDate, tags, nationality, id, type, alcoholicOrNot }) {
  const history = useHistory();
  const [shared, setShared] = useState(false);

  const redirect = () => {
    history.push(`/${type}s/${id}`);
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
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

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

      <p data-testid={ `${index}-${tags[0]}-horizontal-tag` }>
        {tags[0]}
      </p>
      <p data-testid={ `${index}-${tags[1]}-horizontal-tag` }>
        {tags[1]}
      </p>
    </div>
  );
}

DoneCard.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  thumbnail: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
};

export default DoneCard;
