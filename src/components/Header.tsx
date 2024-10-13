export {};

const Header = () => {
  return (
    <header className="bg-oliveGreen text-lightCream p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Movie Watchlist</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:text-warmTan">Home</a></li>
          <li><a href="/profile" className="hover:text-warmTan">Profile</a></li>
          <li><a href="/categories" className="hover:text-warmTan">Categories</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;