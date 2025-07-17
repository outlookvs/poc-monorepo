import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret = process.env.JWT_SECRET || 'default_jwt_secret';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
