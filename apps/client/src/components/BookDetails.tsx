import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book, ErrorResponse } from '../utils/types';
import http from '../utils/http';
import { AxiosError } from 'axios';
import { useAuth } from '../context/authContext';

const BookDetails = () => {
  const [book, setBook] = useState<Book>();
  const [isFavt, setIsFavt] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { id } = useParams();
  const { isLoggedIn, authUser } = useAuth();
  const fetchFavorites = async () => {
    try {
      const response = await http.get('/favorites', {
        headers: {
          Authorization: `Bearer ${authUser?.token}`,
        },
      });
      const userFavt: Book[] = response.data;
      console.log(userFavt);
      userFavt.find((book: Book) => book._id === id) && setIsFavt(true);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setError(axiosError.response?.data?.message || 'Failed to fetch books');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromFavourite = async () => {
    if (!authUser || !authUser.token) return;
    try {
      const response = await http.delete(`/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      });
      alert(`Book removed from favourites! : ${response.status} `);
    } catch (error) {
      console.error(error);
    }
  };
  const addToFavourite = async () => {
    if (!authUser || !authUser.token) return;
    try {
      const response = await http.post(
        `/favorites/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      alert(`Book added: ${response.status}`);
      console.log(response.status, response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchBookById = async () => {
      try {
        const response = await http.get(`/books/${id}`);
        setBook(response.data);
        if (authUser) {
          fetchFavorites();
        }
      } catch (error) {
        const err = error as AxiosError;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookById();
  }, [id]);

  if (isLoading) return <div className="text-center">Loading ...</div>;
  if (error) return <div className="text-center">{error}</div>;
  if (!book) return <div className="text-center">No Book Found :(</div>;

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center min-h-[calc(100vh-60px)] gap-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-10">
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={book.image}
          alt={book.title}
          className="w-full max-w-md lg:max-w-xl object-contain rounded-lg shadow-md"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-start items-start gap-2">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {book.title}
        </h1>
        <p className="text-gray-600">{book.genre}</p>
        <p className="text-gray-700">{book.author}</p>
        <p className="text-lg sm:text-xl lg:text-2xl italic mt-4">
          {book.description}
        </p>
        {isLoggedIn && (
          <button
            onClick={isFavt ? removeFromFavourite : addToFavourite}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg mt-6 hover:bg-blue-500 transition w-full sm:w-1/2"
          >
            {isFavt ? 'Remove from Favourite' : 'Add to Favourite'}
          </button>
        )}
      </div>
    </section>
  );
};

export default BookDetails;
