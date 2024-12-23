import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}
interface ApiResponse {
  Search?: Movie[];
  Error?: string;
}

const Categories = () => {
  const [categories] = useState<string[]>(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']);
  const [categoryItems, setCategoryItems] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setFavoriteCategory } = useContext(UserContext);

  const handleCategoryClick = async (category: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${category}&apikey=aee3b655`);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data: ApiResponse = await response.json();
      setCategoryItems(data.Search || []);
      if (!data.Search) setError(data.Error || 'No movies found for this category');
    } catch (error) {
      setError('Error fetching movies: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-lightCream p-8 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4 text-darkOlive">Categories</h2>
      <ul className="mb-8 flex flex-col items-center">
        {categories.map((category) => (
          <li key={category} className="mb-4">
            <button onClick={() => handleCategoryClick(category)} className="text-rustyOrange hover:underline">{category}</button>
            <button onClick={() => setFavoriteCategory(category)} className="ml-4 bg-darkOlive text-lightCream p-2 rounded-md hover:bg-rustyOrange">Set as Favorite</button>
          </li>
        ))}
      </ul>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {categoryItems.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-darkOlive">Movies in Category</h3>
          <ul className="flex flex-col items-center">
            {categoryItems.map((item) => (
              <li key={item.imdbID} className="mb-4">
                <Link to={`/item/${item.imdbID}`} className="text-rustyOrange hover:underline">
                  {item.Title} ({item.Year})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Categories;