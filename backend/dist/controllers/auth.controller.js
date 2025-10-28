"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_js_1 = __importDefault(require("../db.js"));
const register = async (req, res) => {
    const { pseudo, password } = req.body;
    if (!pseudo || !password) {
        return res.status(400).json({ error: 'Pseudo et mot de passe requis.' });
    }
    try {
        // Vérifier si le pseudo existe déjà
        const existing = await db_js_1.default.query('SELECT id FROM users WHERE pseudo = $1', [pseudo]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ error: 'Ce pseudo est déjà utilisé.' });
        }
        // Hasher le mot de passe
        const hashed = await bcrypt_1.default.hash(password, 10);
        // Enregistrer l’utilisateur
        const result = await db_js_1.default.query('INSERT INTO users (pseudo, password_hash) VALUES ($1, $2) RETURNING id, pseudo', [pseudo, hashed]);
        // Générer un token JWT
        const secret = process.env.JWT_SECRET || 'your-secret-key';
        const token = jsonwebtoken_1.default.sign({ id: result.rows[0].id }, secret, { expiresIn: '7d' });
        res.status(201).json({ token, user: result.rows[0] });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur lors de l’inscription.' });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { pseudo, password } = req.body;
    if (!pseudo || !password) {
        return res.status(400).json({ error: 'Pseudo et mot de passe requis.' });
    }
    try {
        // Trouver l’utilisateur
        const result = await db_js_1.default.query('SELECT * FROM users WHERE pseudo = $1', [pseudo]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Identifiants invalides.' });
        }
        const user = result.rows[0];
        // Vérifier le mot de passe
        const match = await bcrypt_1.default.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).json({ error: 'Identifiants invalides.' });
        }
        // Générer un token
        const secret = process.env.JWT_SECRET || 'your-secret-key';
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secret, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, pseudo: user.pseudo } });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur lors de la connexion.' });
    }
};
exports.login = login;
