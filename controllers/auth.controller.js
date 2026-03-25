import createError from 'http-errors';
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';

export async function registerUser(req, res, next) {
  try {
    const { fullName, email, password } = req.body;
    const user = await User.create({ fullName, email, password });

    return res.status(201).json({
      message: 'User registered successfully',
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw createError(401, 'Invalid email or password');

    const isValid = await user.comparePassword(password);
    if (!isValid) throw createError(401, 'Invalid email or password');

    const token = generateToken(user._id);

    return res.json({
      message: 'Login successful',
      data: {
        token,
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function getCurrentUser(req, res, next) {
  try {
    const userId = req.user && req.user.userId;
    if (!userId) throw createError(401, 'Unauthorized');

    const user = await User.findById(userId).select('-password');
    if (!user) throw createError(404, 'User not found');

    return res.json({ message: 'User fetched successfully', data: user });
  } catch (err) {
    next(err);
  }
}
