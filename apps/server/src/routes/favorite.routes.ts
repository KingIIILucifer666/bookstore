import { Router } from 'express';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from '../controllers/favorite.controller';
import { checkUser } from '../middleware/auth.middleware';

const router = Router();

router.use(checkUser);

router.get('/', getFavorites);
router.post('/:bookId', addFavorite);
router.delete('/:bookId', removeFavorite);

export default router;
