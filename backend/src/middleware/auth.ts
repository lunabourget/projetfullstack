import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const header = req.header('Authorization');
    if (!header) return res.status(401).json({ error: 'No token provided' });

    const token = header.replace('Bearer ', '');
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Please authenticate' });
  }
};

export default auth;
