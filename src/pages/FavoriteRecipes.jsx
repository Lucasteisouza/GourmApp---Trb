import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FavoriteCard from '../components/FavoriteCard';

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [typeFilter, setTypeFilter] = useState('');
  const [recipes, setRecipes] = useState([...favoriteRecipes]);

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
      { recipes && recipes.filter((recipe) => {
        if (!typeFilter) {
          return true;
        }
        return recipe.type === typeFilter;
      }).map((e, index) => (<FavoriteCard
        key={ e.id }
        index={ index }
        name={ e.name }
        id={ e.id }
        thumbnail={ e.image }
        category={ e.category }
        nationality={ e.nationality }
        type={ e.type }
        alcoholicOrNot={ e.alcoholicOrNot }
        setRecipes={ setRecipes }
      />))}
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
