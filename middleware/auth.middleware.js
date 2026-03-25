import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../utils/jwt.js';

export default function authMiddleware(req, res, next) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header || !header.startsWith('Bearer ')) return next(createError(401, 'Unauthorized'));

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;
    next();
  } catch (err) {
    next(createError(401, 'Invalid or expired token'));
  }
}
