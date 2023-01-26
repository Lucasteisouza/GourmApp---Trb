import React, { useState, useEffect } from 'react';

function Profile() {
  // const userEmail = 'danieltetetetete@gmail.com';
  // const saveEmailLocalStorage = (e) => {
  //   localStorage.setItem('email', JSON.stringify(e));
  // };

  const [email, setEmail] = useState('');

  useEffect(() => {
    // saveEmailLocalStorage(userEmail);
    setEmail(() => {
      const saved = localStorage.getItem('email');
      const initialValue = JSON.parse(saved);
      console.log(initialValue);
      return initialValue || '';
    });
  }, []);

  return (
    <div>
      Profile
      <p data-testid="profile-email">{ email }</p>
      <div>
        <button data-testid="profile-done-btn">Done Recipes</button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
    </div>
  );
}

// {
//   email: email-da-pessoa
// }

export default Profile;
