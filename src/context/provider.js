import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [userName, setUserName] = useState('');
  const [recipes, setRecipes] = useState({
    meals: [],
    drinks: [],
  });
  const userValue = useMemo(() => ({
    userName, setUserName, recipes, setRecipes,
  }), [userName, recipes]);
  return (
    <context.Provider value={ userValue }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
