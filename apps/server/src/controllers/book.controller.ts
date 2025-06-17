import Book from '../models/Book';
import { Request, Response } from 'express';

// GET all books
export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find();
  return res.json(books);
};

// GET single book
export const getBookById = async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  return res.json(book);
};

// POST create book
export const createBook = async (req: Request, res: Response) => {
  const book = new Book(req.body);
  await book.save();
  return res.status(201).json(book);
};

// PUT update book
export const updateBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  return res.json(book);
};

// DELETE book
export const deleteBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  return res.json({ message: 'Book deleted' });
};
