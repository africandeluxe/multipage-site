import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const Home = () => {
  const { loggedIn, userName } = useContext(UserContext);
  const [randomMovies, setRandomMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchRandomMovies = async () => {
      try {
        const response = await fetch('https://www.omdbapi.com/?apikey=aee3b655&s=movie');
        const data = await response.json();
        if (data.Search) {
          setRandomMovies(data.Search.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch random movies:', error);
      }
    };

    if (loggedIn) {
      fetchRandomMovies();
    }
  }, [loggedIn]);

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
          <h2 className="text-2xl font-bold mt-10 text-darkOlive">Recommended Movies</h2>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {randomMovies.map((movie) => (
              <li key={movie.imdbID} className="bg-white p-4 rounded-md shadow-md">
                <img src={movie.Poster} alt={movie.Title} className="w-full h-auto mb-2 rounded-md" />
                <h3 className="text-lg font-semibold">{movie.Title}</h3>
                <p className="text-sm text-gray-600">{movie.Year}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Home;