export interface JwtPayload {
  id: number;
  pseudo?: string;
  iat?: number;
  exp?: number;
}