import User from '../models/User';
import Favorite from '../models/Favorite';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });
  await Favorite.create({ userId: user._id, bookIds: [] });
  const token = generateToken(String(user._id));

  return res.status(201).json({ token, user: { id: user._id, email, name } });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(String(user._id));

  return res.json({
    token,
    user: { id: user._id, email, name: user.name },
  });
};
