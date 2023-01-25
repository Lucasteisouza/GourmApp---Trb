import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [userName, setUserName] = useState('');
  const userValue = useMemo(() => ({
    userName, setUserName,
  }), [userName]);
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
