import { Request } from 'express';
import { JwtPayload } from './JWTPayload';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { id: number; pseudo: string };
}