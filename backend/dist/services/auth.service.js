"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';
const registerUser = async (pseudo, password) => {
    const existing = await db_1.pool.query('SELECT id FROM users WHERE pseudo = $1', [pseudo]);
    if (existing.rows.length > 0) {
        throw new Error('PseudoExists');
    }
    const hashed = await bcrypt_1.default.hash(password, 10);
    const result = await db_1.pool.query('INSERT INTO users (pseudo, password_hash) VALUES ($1, $2) RETURNING id, pseudo', [pseudo, hashed]);
    const user = result.rows[0];
    const token = jsonwebtoken_1.default.sign({ id: user.id, pseudo: user.pseudo }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return { token, user };
};
exports.registerUser = registerUser;
const loginUser = async (pseudo, password) => {
    const result = await db_1.pool.query('SELECT * FROM users WHERE pseudo = $1', [pseudo]);
    if (result.rows.length === 0) {
        throw new Error('InvalidCredentials');
    }
    const user = result.rows[0];
    const match = await bcrypt_1.default.compare(password, user.password_hash);
    if (!match) {
        throw new Error('InvalidCredentials');
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, pseudo: user.pseudo }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return { token, user: { id: user.id, pseudo: user.pseudo } };
};
exports.loginUser = loginUser;
