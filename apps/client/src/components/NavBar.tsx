import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn, authUser, setAuthUser } = useAuth();

  const router = useNavigate();

  const handleLogout = () => {
    setAuthUser(undefined);
    setIsLoggedIn(false);
    localStorage.clear();
    router('/');
  };
  return (
    <div className="flex justify-around p-4 bg-green-300 text-black font-bold">
      <Link to="/">The Book Store</Link>
      {isLoggedIn ? (
        <div className="flex gap-6">
          <Link to="/favourites">{authUser?.name}'s Favourites</Link>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default NavBar;
