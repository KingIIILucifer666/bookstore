import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const router = useNavigate();

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
        const userFavt: Book[] = response.data;
        console.log(userFavt);
        userFavt.find((book: Book) => book._id === id) && setIsFavt(true);
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        setError(axiosError.response?.data?.message || 'Failed to fetch books');
      } finally {
        setIsLoading(false);
      }
    }
  };
  fetchFavorites();

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
        console.log(response);
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
    <section className="flex flex-col lg:flex-row justify-center items-center h-[calc(100vh-60px)] gap-6 px-40">
      <div className="image-container">
        <img src={book.image} alt={book.title} height={800} width={800} />
      </div>
      <div className="flex flex-col justify-start items-start gap-2 ">
        <h1 className="text-5xl font-bold mb-6">{book.title}</h1>
        <p>{book.genre}</p>
        <p>{book.author}</p>
        <p className="text-2xl italic mt-6">{book.description}</p>
        {isLoggedIn && (
          <button
            onClick={isFavt ? removeFromFavourite : addToFavourite}
            className="bg-gray-500 p-2 text-white rounded-lg w-[50%] mt-4 hover:bg-blue-500"
          >
            {isFavt ? 'Remove from favourite' : 'Add to Favorite'}
          </button>
        )}
      </div>
    </section>
  );
};

export default BookDetails;
