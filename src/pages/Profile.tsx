import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { userName, watchlist, favoriteCategory, logOut } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-lightCream p-8 flex flex-col items-center justify-center">
      <div className="bg-warmTan p-8 rounded-md shadow-md w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-darkOlive">Profile: {userName}</h2>
        <h3 className="text-2xl font-semibold mb-4">Favorite Category: {favoriteCategory || 'None'}</h3>
        <h3 className="text-2xl font-semibold mb-4">Watchlist:</h3>
        {watchlist.length === 0 ? (
          <p>No movies in your watchlist.</p>
        ) : (
          <ul className="list-disc ml-6 mb-4 text-left">
            {watchlist.map((movie) => (
              <li key={movie.imdbID}>
                <Link to={`/item/${movie.imdbID}`} className="text-rustyOrange hover:underline">{movie.Title} ({movie.Year})</Link>
              </li>
            ))}
          </ul>
        )}
        <button onClick={logOut} className="bg-rustyOrange text-lightCream p-2 rounded-md hover:bg-darkOlive mt-4">Log Out</button>
      </div>
    </div>
  );
};

export default Profile;