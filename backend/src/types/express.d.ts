declare namespace Express {
    interface Request {
        user?: {
            id: number;
            pseudo: string;
        };
    }
}