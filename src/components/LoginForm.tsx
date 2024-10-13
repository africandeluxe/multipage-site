import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const LoginForm = () => {
  const { logIn } = useContext(UserContext);
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (name.trim() !== '') {
      logIn(name);
    } else {
      alert('Please enter a username');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-darkOlive mb-6">Welcome to Movie Watchlist</h1>
      <p className="text-lg text-darkOlive mb-8">Please log in to your account to access your personalized movie watchlist and start adding your favorite movies.</p>
      <div className="bg-warmTan p-8 rounded-md shadow-md w-80 text-center">
        <h2 className="text-2xl font-bold mb-4 text-darkOlive">Log In to Your Account</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter username" className="border border-darkOlive p-2 w-full rounded-md mb-4 text-center"/>
        <button onClick={handleLogin} className="bg-darkOlive text-lightCream p-2 w-full rounded-md hover:bg-rustyOrange">Log In</button>
      </div>
    </div>
  );
};

export default LoginForm;