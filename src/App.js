import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Provider from './context/provider';

function App() {
  return (
    <Provider>
      <Switch>

        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id-da-receita" component={ RecipeDetails } />
        <Route exact path="/drinks/:id-da-receita" component={ RecipeDetails } />
        <Route
          exact
          path="/meals/:id-da-receita/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          exact
          path="/drinks/:id-da-receita/in-progress"
          component={ RecipeInProgress }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />

      </Switch>
    </Provider>

  );
}

export default App;
