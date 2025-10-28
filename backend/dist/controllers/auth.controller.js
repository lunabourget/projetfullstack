"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.login = exports.register = void 0;
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
const update = async (req, res) => {
    const userId = Number(req.params.id);
    const { pseudo, password } = req.body;
    try {
        const user = await (0, auth_service_1.updateUser)(userId, pseudo, password);
        res.json(user);
    }
    catch (err) {
        if (err.message === 'PseudoExists')
            return res.status(409).json({ error: 'Ce pseudo est déjà utilisé.' });
        if (err.message === 'NoFieldsToUpdate')
            return res.status(400).json({ error: 'Aucun champ à mettre à jour.' });
        if (err.message === 'UserNotFound')
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour.' });
    }
};
exports.update = update;
const remove = async (req, res) => {
    const userId = Number(req.params.id);
    try {
        const result = await (0, auth_service_1.deleteUser)(userId);
        res.json({ message: `Utilisateur ${result.id} supprimé.` });
    }
    catch (err) {
        if (err.message === 'UserNotFound')
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression.' });
    }
};
exports.remove = remove;
