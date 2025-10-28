import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  const { pseudo, password } = req.body;

  if (!pseudo || !password) {
    return res.status(400).json({ error: 'Pseudo et mot de passe requis.' });
  }

  try {
    const result = await registerUser(pseudo, password);
    res.status(201).json(result);
  } catch (err: any) {
    if (err.message === 'PseudoExists') {
      return res.status(409).json({ error: 'Ce pseudo est déjà utilisé.' });
    }
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
    const result = await loginUser(pseudo, password);
    res.json(result);
  } catch (err: any) {
    if (err.message === 'InvalidCredentials') {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion.' });
  }
};
