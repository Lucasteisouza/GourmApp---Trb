import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../style/Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      Footer
      <Link data-testid="drinks-bottom-btn" src={ drinkIcon } to="/drinks">
        <img src={ drinkIcon } alt="Drinks" width="40" />
      </Link>
      <Link data-testid="meals-bottom-btn" src={ mealIcon } to="/meals">
        <img src={ mealIcon } alt="Meals" width="40" />
      </Link>
    </div>
  );
}

export default Footer;
