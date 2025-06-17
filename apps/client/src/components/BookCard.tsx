import { BookCardProps } from '../utils/types';
import { useAuth } from '../context/authContext';
import http from '../utils/http';
import { Link } from 'react-router-dom';

const BookCard = ({ book, inFavorites }: BookCardProps) => {
  const { authUser, isLoggedIn } = useAuth();

  const removeFromFavourite = async () => {
    if (!authUser || !authUser.token) return;
    try {
      const response = await http.delete(`/favorites/${book._id}`, {
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
        `/favorites/${book._id}`,
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

  return (
    <div
      key={book._id}
      className="flex flex-col justify-between items-center bg-white shadow-md rounded-lg p-4"
    >
      <Link to={`/books/${book._id}`}>
        {book.image && (
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-[300px] object-cover mb-4 rounded-md"
          />
        )}
        <div className="flex flex-col items-center justify-between">
          <h3 className="text-center font-bold text-xl">{book.title}</h3>
          <p className="text-center">{book.author}</p>
          <p className="text-center">{book.genre}</p>
        </div>
      </Link>

      {isLoggedIn && (
        <button
          onClick={inFavorites ? removeFromFavourite : addToFavourite}
          className="bg-gray-500 p-2 text-white rounded-lg w-full mt-4 hover:bg-blue-500"
        >
          {inFavorites ? 'Remove from Favourites' : 'Add to Favourites'}
        </button>
      )}
    </div>
  );
};

export default BookCard;
