import jwt from 'jsonwebtoken';

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment');
  }
  return secret;
}

export function generateToken(userId) {
  const secret = getJwtSecret();
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
  return jwt.sign({ userId }, secret, { expiresIn });
}
