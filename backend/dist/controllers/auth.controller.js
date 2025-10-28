"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const register = async (req, res) => {
    const { pseudo, password } = req.body;
    if (!pseudo || !password) {
        return res.status(400).json({ error: 'Pseudo et mot de passe requis.' });
    }
    try {
        const result = await (0, auth_service_1.registerUser)(pseudo, password);
        res.status(201).json(result);
    }
    catch (err) {
        if (err.message === 'PseudoExists') {
            return res.status(409).json({ error: 'Ce pseudo est déjà utilisé.' });
        }
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
        const result = await (0, auth_service_1.loginUser)(pseudo, password);
        res.json(result);
    }
    catch (err) {
        if (err.message === 'InvalidCredentials') {
            return res.status(401).json({ error: 'Identifiants invalides.' });
        }
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur lors de la connexion.' });
    }
};
exports.login = login;
