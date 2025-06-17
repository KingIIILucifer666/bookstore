import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import bookRoutes from './routes/book.routes';
import userRoutes from './routes/user.routes';
import favoriteRoutes from './routes/favorite.routes';
import { logger } from './middleware/requestParse.middleware';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())

app.use(express.json());
app.use(logger);

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/user', userRoutes);
app.use('/api/favorites', favoriteRoutes);

app.listen(PORT, () => (`Server running on port ${PORT}`));
