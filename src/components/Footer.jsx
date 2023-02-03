import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../style/Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        to="/drinks"
        className="footerIcon"
      >
        <img src={ drinkIcon } alt="Drinks" width="40" />
      </Link>
      <Link
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        to="/meals"
        className="footerIcon"
      >
        <img src={ mealIcon } alt="Meals" width="40" />
      </Link>
    </div>
  );
}

export default Footer;
