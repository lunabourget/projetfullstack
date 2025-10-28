import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db';

export const register = async (req: Request, res: Response) => {
  const { pseudo, password } = req.body;

  if (!pseudo || !password) {
    return res.status(400).json({ error: 'Pseudo et mot de passe requis.' });
  }

  try {
    // Vérifier si le pseudo existe déjà
    const existing = await pool.query('SELECT id FROM users WHERE pseudo = $1', [pseudo]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Ce pseudo est déjà utilisé.' });
    }

    // Hasher le mot de passe
    const hashed = await bcrypt.hash(password, 10);

    // Enregistrer l’utilisateur
    const result = await pool.query(
      'INSERT INTO users (pseudo, password_hash) VALUES ($1, $2) RETURNING id, pseudo',
      [pseudo, hashed]
    );

    // Générer un token JWT
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign({ id: result.rows[0].id }, secret, { expiresIn: '7d' });

    res.status(201).json({ token, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur lors de l’inscription.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { pseudo, password } = req.body;

  if (!pseudo || !password) {
    return res.status(400).json({ error: 'Pseudo et mot de passe requis.' });
  }

  try {
    // Trouver l’utilisateur
    const result = await pool.query('SELECT * FROM users WHERE pseudo = $1', [pseudo]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }

    const user = result.rows[0];

    // Vérifier le mot de passe
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }

    // Générer un token
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '7d' });

    res.json({ token, user: { id: user.id, pseudo: user.pseudo } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion.' });
  }
};
