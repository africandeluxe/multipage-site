import React, { createContext, useState, ReactNode, useEffect } from 'react';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface User {
  loggedIn: boolean;
  userName: string;
  watchlist: Movie[];
  favoriteCategory: string;
}

interface UserContextType extends User {
  logIn: (name: string) => void;
  logOut: () => void;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (imdbID: string) => void;
  setFavoriteCategory: (category: string) => void;
  saveItem: (item: Movie) => void; 
}

const defaultValues: UserContextType = {
  loggedIn: false,
  userName: '',
  watchlist: [],
  favoriteCategory: '',
  logIn: () => {},
  logOut: () => {},
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
  setFavoriteCategory: () => {},
  saveItem: () => {},
};

export const UserContext = createContext<UserContextType>(defaultValues);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    loggedIn: false,
    userName: '',
    watchlist: [],
    favoriteCategory: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  
  const logIn = (name: string) => {
    const newUser = { ...user, loggedIn: true, userName: name };
    setUser(newUser);
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
  };

  const logOut = () => {
    setUser({ loggedIn: false, userName: '', watchlist: [], favoriteCategory: '' });
    localStorage.removeItem('loggedInUser');
    window.location.href = '/';
  };

  const addToWatchlist = (movie: Movie) => {
    const updatedUser = { ...user, watchlist: [...user.watchlist, movie] };
    setUser(updatedUser);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    alert('Movie added to watchlist!');
  };

  const removeFromWatchlist = (imdbID: string) => {
    const updatedWatchlist = user.watchlist.filter((movie) => movie.imdbID !== imdbID);
    const updatedUser = { ...user, watchlist: updatedWatchlist };
    setUser(updatedUser);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
  };

  const setFavoriteCategory = (category: string) => {
    const updatedUser = { ...user, favoriteCategory: category };
    setUser(updatedUser);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
  };

  const saveItem = (item: Movie) => {
    const updatedUser = { ...user, watchlist: [...user.watchlist, item] };
    setUser(updatedUser);
  };

  return (
    <UserContext.Provider value={{ ...user, logIn, logOut, addToWatchlist, removeFromWatchlist, setFavoriteCategory, saveItem }}>
      {children}
    </UserContext.Provider>
  );
};