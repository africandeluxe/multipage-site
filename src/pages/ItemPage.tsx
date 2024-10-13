import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState<Movie | null>(null);
  const { addToWatchlist } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=aee3b655`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const movie = {
            imdbID: data.imdbID,
            Title: data.Title,
            Year: data.Year,
            Poster: data.Poster,
          };
          setItem(movie);
        }
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-lightCream p-8 flex flex-col items-center justify-center">
      <div className="bg-warmTan p-8 rounded-md shadow-md w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-darkOlive">{item.Title}</h2>
        <img src={item.Poster} alt={item.Title} className="mb-4 mx-auto" />
        <p className="mb-4">Year: {item.Year}</p>
        <button onClick={() => {
            addToWatchlist(item);
            alert('Movie added to watchlist!');
          }}
          className="bg-darkOlive text-lightCream p-2 rounded-md hover:bg-rustyOrange">Save to Watchlist</button>
        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-darkOlive text-lightCream p-2 rounded-md hover:bg-rustyOrange">Go Back</button>
      </div>
    </div>
  );
};

export default ItemPage;