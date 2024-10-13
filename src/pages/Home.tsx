import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const Home = () => {
  const { loggedIn, userName } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-lightCream p-8 flex flex-col items-center justify-center">
      {loggedIn ? (
        <>
          <h1 className="text-4xl font-bold mb-4 text-darkOlive">Welcome, {userName}!</h1>
          <p className="text-lg text-darkOlive mb-8">Explore your movie watchlist or search for new movies.</p>
          <div className="space-x-4">
            <Link to="/profile" className="bg-darkOlive text-lightCream p-3 rounded-md hover:bg-rustyOrange">Go to Profile</Link>
            <Link to="/categories" className="bg-darkOlive text-lightCream p-3 rounded-md hover:bg-rustyOrange">View Categories</Link>
          </div>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Home;