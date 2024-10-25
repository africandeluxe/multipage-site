import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import MovieDetails from '../pages/MovieDetails';
import Categories from '../pages/Categories';
import ItemPage from '../pages/ItemPage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext } from '../context/UserContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

const AppRoutes = () => {
  const { loggedIn } = useContext(UserContext);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate to="/" />} />
          <Route path="/categories" element={loggedIn ? <Categories /> : <Navigate to="/" />} />
          <Route path="/item/:id" element={loggedIn ? <ItemPage /> : <Navigate to="/" />} />
          <Route path="/movie/:id" element={loggedIn ? <MovieDetails /> : <Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;