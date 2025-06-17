import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { BookListProps, Book, ErrorResponse } from '../utils/types';
import http from '../utils/http';
import BookCard from './BookCard';

const BookList = ({ inFavorites = false }: BookListProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await http.get('/books');
        setBooks(response.data);
        setFilteredBooks(response.data);
        console.log(response.data);
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        setError(axiosError.response?.data?.message || 'Failed to fetch books');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredBooks(books);
    } else {
      const toLowerCase = searchTerm.toLowerCase().trim();
      const searchResult = books.filter(
        (book) =>
          book.title.toLowerCase().includes(toLowerCase) ||
          book.author.toLowerCase().includes(toLowerCase)
      );
      setFilteredBooks(searchResult);
    }
  }, [searchTerm, books]);

  if (isLoading) return <>Loading ...</>;
  if (error) return <>{error}</>;
  if (books.length === 0) return <div>No books available</div>;
  return (
    <section className="px-10 flex flex-col">
      <h1 className="text-center text-3xl mb-4 italic font-bold mt-4">
        Books List
      </h1>
      <input
        type="text"
        className="border my-4 mx-auto px-6 py-2 rounded-3xl w-[50%] text-center "
        value={searchTerm}
        placeholder="Search by title or author"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredBooks.map((book) => (
          <BookCard book={book} inFavorites={inFavorites} key={book._id} />
        ))}
      </div>
    </section>
  );
};

export default BookList;
