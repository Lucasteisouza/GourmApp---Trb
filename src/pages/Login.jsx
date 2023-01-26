import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Login(props) {
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: '',
  });

  let internalLoginInfo = { email: loginInfo.email,
    password: loginInfo.password };

  const [isDisabled, setIsDisabled] = useState(true);

  const checkIfIsDisabled = () => {
    const VALID_PASSWORD_LENGTH = 6;
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(internalLoginInfo.email)
    && internalLoginInfo.password.length > VALID_PASSWORD_LENGTH) {
      setIsDisabled(false);
    } else { setIsDisabled(true); }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    internalLoginInfo = { ...loginInfo, [name]: value };
    setloginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    checkIfIsDisabled();
  };

  const handleLogin = () => {
    const stringedEmail = JSON.stringify({ email: loginInfo.email });
    localStorage.setItem('user', stringedEmail);
    const { history } = props;
    history.push('/meals');
  };

  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          type="text"
          name="email"
          data-testid="email-input"
          onChange={ handleChange }
          value={ loginInfo.email }
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ handleChange }
          value={ loginInfo.password }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ handleLogin }
      >
        Entrar
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
