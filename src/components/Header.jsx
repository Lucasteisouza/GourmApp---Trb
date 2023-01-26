import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const { pathname } = history.location;

  const handleClickProfile = () => {
    history.push('/profile');
  };
  return (
    <header>
      {pathname === '/meals' && (
        <>
          <h3 data-test-id="page-title">Meals</h3>
          <button data-test-id="search-top-btn">
            <img src={ searchIcon } alt="Ícone de busca" />
          </button>
          <button data-test-id="profile-top-btn" onClick={ handleClickProfile }>
            <img src={ profileIcon } alt="Ícone de perfil" />
          </button>
        </>)}
      {pathname === '/drinks' && (
        <>
          <h3 data-test-id="page-title">Drinks</h3>
          <button data-test-id="search-top-btn">
            <img src={ searchIcon } alt="Ícone de busca" />
          </button>
          <button data-test-id="profile-top-btn" onClick={ handleClickProfile }>
            <img src={ profileIcon } alt="Ícone de perfil" />
          </button>
        </>)}
      {pathname === '/profile' && (
        <>
          <h3 data-test-id="page-title">Profile</h3>
          <button data-test-id="profile-top-btn" onClick={ handleClickProfile }>
            <img src={ profileIcon } alt="Ícone de perfil" />
          </button>
        </>)}
      {pathname === '/done-recipes' && (
        <>
          <h3 data-test-id="page-title">Done Recipes</h3>
          <button data-test-id="profile-top-btn" onClick={ handleClickProfile }>
            <img src={ profileIcon } alt="Ícone de perfil" />
          </button>
        </>)}
      {pathname === '/favorite-recipes' && (
        <>
          <h3 data-test-id="page-title">Favorite Recipes</h3>
          <button data-test-id="profile-top-btn" onClick={ handleClickProfile }>
            <img src={ profileIcon } alt="Ícone de perfil" />
          </button>
        </>)}
    </header>
  );
}

export default Header;
