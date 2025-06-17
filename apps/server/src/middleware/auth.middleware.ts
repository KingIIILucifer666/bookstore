import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import User from '../models/User';

export const checkUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = await User.findById(decoded.id).select('-password');
    return next();
  } catch (error: any) {
    return res.status(401).json({ message: 'Token failed' });
  }
};
