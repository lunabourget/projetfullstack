"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        const header = req.header('Authorization');
        if (!header)
            return res.status(401).json({ error: 'No token provided' });
        const token = header.replace(/Bearer\s+/i, '');
        const secret = process.env.JWT_SECRET || '';
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (!decoded.id || !decoded.pseudo || typeof decoded.id !== 'number' || typeof decoded.pseudo !== 'string') {
            return res.status(401).json({ error: 'Invalid token payload' });
        }
        req.user = decoded;
        return next();
    }
    catch (err) {
        console.error('Authentication error:', err);
        return res.status(401).json({ error: 'Please authenticate' });
    }
};
exports.auth = auth;
exports.default = exports.auth;
