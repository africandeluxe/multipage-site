import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const context = useContext(UserContext);

  if (!context) {
    return null;
  }

  const { loggedIn, userName } = context;

  return (
    <header className="bg-oliveGreen text-lightCream p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Movie Watchlist</h1>
      {loggedIn ? (
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-warmTan">Home</Link></li>
            <li><Link to="/profile" className="hover:text-warmTan">Profile</Link></li>
            <li><Link to="/categories" className="hover:text-warmTan">Categories</Link></li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
};

export default Header;