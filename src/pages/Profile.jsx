import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || '';
  const history = useHistory();

  const handleClickDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const handleClickFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const handleClickLogin = () => {
    history.push('/');
    localStorage.clear('user');
  };

  return (

    <div>
      <Header />
      Profile
      <p data-testid="profile-email">{ user.email }</p>
      <div>
        <button
          data-testid="profile-done-btn"
          onClick={ handleClickDoneRecipes }
        >
          Done Recipes

        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ handleClickFavoriteRecipes }
        >
          Favorite Recipes

        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ handleClickLogin }
        >
          Logout

        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
