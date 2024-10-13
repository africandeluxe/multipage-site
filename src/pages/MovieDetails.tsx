import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface MovieDetailsProps {
  Title: string;
  Year: string;
  Genre: string;
  Plot: string;
  Poster: string;
}

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsProps | null>(null);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=aee3b655`)
      .then((response) => response.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-lightCream p-8">
      <div className="bg-warmTan p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-darkOlive">{movie.Title}</h2>
        <img src={movie.Poster} alt={movie.Title} className="mb-4" />
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p className="mt-4">{movie.Plot}</p>
      </div>
    </div>
  );
};

export default MovieDetailsPage;