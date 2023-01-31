import React, { useState } from 'react';
import DoneCard from '../components/DoneCard';
import Header from '../components/Header';

function DoneRecipes() {
  const doneList = JSON.parse(localStorage.getItem('doneRecipes'));
  const [typeFilter, setTypeFilter] = useState('');

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setTypeFilter('') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => setTypeFilter('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => setTypeFilter('drink') }
        >
          Drinks
        </button>
      </div>
      { doneList && doneList.filter((recipe) => {
        if (!typeFilter) {
          return true;
        }
        return recipe.type === typeFilter;
      }).map((e, index) => (<DoneCard
        key={ e.id }
        index={ index }
        name={ e.name }
        id={ e.id }
        thumbnail={ e.image }
        category={ e.category }
        doneDate={ e.doneDate }
        tags={ e.tags }
        nationality={ e.nationality }
        type={ e.type }
        alcoholicOrNot={ e.alcoholicOrNot }
      />))}
    </div>
  );
}

export default DoneRecipes;
