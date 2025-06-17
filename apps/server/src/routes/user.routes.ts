import { Router } from 'express';
import {
  getUsers,
  getUserById,
  deleteUser,
} from '../controllers/user.controller';
import { checkUser } from '../middleware/auth.middleware';

const router = Router();

router.use(checkUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

export default router;
