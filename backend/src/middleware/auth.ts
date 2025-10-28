import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/interfaces/AuthenticatedRequest';
import { JwtPayload } from '../types/interfaces/JWTPayload';
import jwt from 'jsonwebtoken';


export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const header = req.header('Authorization');
    if (!header) return res.status(401).json({ error: 'No token provided' });

  const token = header.replace(/Bearer\s+/i, '');
    const secret = process.env.JWT_SECRET || '';
    const decoded = jwt.verify(token, secret) as JwtPayload;
    if (!decoded.id || !decoded.pseudo || typeof decoded.id !== 'number' || typeof decoded.pseudo !== 'string') {
      return res.status(401).json({ error: 'Invalid token payload' });
    }
    req.user = decoded as JwtPayload & { id: number; pseudo: string };
    return next();
  } catch (err) {
    console.error('Authentication error:', err);
    return res.status(401).json({ error: 'Please authenticate' });
  }
};

export default auth;
