import { useEffect, useState } from 'react';
import http from '../utils/http';
import { Book, ErrorResponse } from '../utils/types';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import BookCard from './BookCard';

const Favourites = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const { authUser, isLoggedIn, authLoading } = useAuth();
  const router = useNavigate();

  useEffect(() => {
    if (authLoading) {
      setIsLoading(true);
      return;
    } else {
      setIsLoading(false);
    }
    const fetchFavorites = async () => {
      if (!isLoggedIn || !authUser) {
        router('/');
        return;
      } else {
        try {
          const response = await http.get('/favorites', {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          });
          console.log(response.data);
          setFavoriteBooks(response.data);
        } catch (error) {
          const axiosError = error as AxiosError<ErrorResponse>;
          setError(
            axiosError.response?.data?.message || 'Failed to fetch books'
          );
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchFavorites();
  }, [authUser, router, authLoading, isLoggedIn]);

  if (!isLoggedIn)
    return (
      <Link className="text-center" to={'/login'}>
        You need to Login...
      </Link>
    );
  if (!isLoading && favoriteBooks.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">No favourites yet.</div>
    );
  }
  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
      {favoriteBooks.map((book) => (
        <BookCard book={book} inFavorites={true} key={book._id} />
      ))}
    </div>
  );
};

export default Favourites;
