import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories] = useState<string[]>(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']);
  const [categoryItems, setCategoryItems] = useState<any[]>([]);
  const { setFavoriteCategory } = useContext(UserContext);

  const handleCategoryClick = (category: string) => {
    fetch(`http://www.omdbapi.com/?s=${category}&apikey=aee3b655`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          const movies = data.Search.map((movie: any) => ({
            imdbID: movie.imdbID,
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
          }));
          setCategoryItems(movies);
        }
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
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
      {categoryItems.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-darkOlive">Movies in Category</h3>
          <ul className="flex flex-col items-center">
            {categoryItems.map((item) => (
              <li key={item.imdbID} className="mb-4">
                <Link to={`/item/${item.imdbID}`} className="text-rustyOrange hover:underline">{item.Title} ({item.Year})</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Categories;