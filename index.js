import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import loggerMiddleware from './middleware/logger.middleware.js';
import errorMiddleware from './middleware/error.middleware.js';

const PORT = process.env.PORT || 3000;

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/users', authRoutes);

app.get('/', (req, res) => res.json({ message: 'API is running' }));

// 404 handler
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

// error handler
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
