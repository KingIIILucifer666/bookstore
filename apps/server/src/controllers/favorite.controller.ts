import Favorite from '../models/Favorite';
import { Response } from 'express';

export const getFavorites = async (req: any, res: Response) => {
  try {
    const favorites = await Favorite.findOne({ userId: req.user.id }).populate(
      'bookIds'
    );
    return res.json(favorites?.bookIds || []);
  } catch (error) {
    console.error('Error getting favorites:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const addFavorite = async (req: any, res: Response) => {
  try {
    const { bookId } = req.params;
    let favorite = await Favorite.findOne({ userId: req.user.id });

    if (!favorite) {
      favorite = await Favorite.create({
        userId: req.user.id,
        bookIds: [bookId],
      });
      return res
        .status(201)
        .json({ message: 'Book added to favorites', favorite });
    }

    if (favorite.bookIds.some((id) => id.toString() === bookId)) {
      return res.status(400).json({ message: 'Book is already in favorites' });
    }

    favorite.bookIds.push(bookId);
    await favorite.save();
    return res
      .status(200)
      .json({ message: 'Book added to favorites', favorite });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeFavorite = async (req: any, res: Response) => {
  try {
    const { bookId } = req.params;
    const favorite = await Favorite.findOne({ userId: req.user.id });

    if (!favorite || !favorite.bookIds.some((id) => id.toString() === bookId)) {
      return res.status(404).json({ message: 'Book not found in favorites' });
    }

    favorite.bookIds = favorite.bookIds.filter(
      (id) => id.toString() !== bookId
    );
    await favorite.save();
    return res.json(favorite);
  } catch (error) {
    console.error('Error removing favorite:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
