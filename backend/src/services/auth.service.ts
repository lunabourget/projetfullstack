import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

export interface User {
  id: number;
  pseudo: string;
  password_hash?: string;
}

// Fonction pour enregistrer un utilisateur
export const registerUser = async (pseudo: string, password: string) => {
  // Vérifier si le pseudo existe déjà
  const existing = await pool.query('SELECT id FROM users WHERE pseudo = $1', [pseudo]);
  if (existing.rows.length > 0) {
    throw new Error('PseudoExists');
  }

  // Hasher le mot de passe
  const hashed = await bcrypt.hash(password, 10);

  // Enregistrer l’utilisateur
  const result = await pool.query(
    'INSERT INTO users (pseudo, password_hash) VALUES ($1, $2) RETURNING id, pseudo',
    [pseudo, hashed]
  );

  const user: User = result.rows[0];

  // Générer un token
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return { token, user };
};

// Fonction pour connecter un utilisateur
export const loginUser = async (pseudo: string, password: string) => {
  // Trouver l’utilisateur
  const result = await pool.query('SELECT * FROM users WHERE pseudo = $1', [pseudo]);
  if (result.rows.length === 0) {
    throw new Error('InvalidCredentials');
  }

  const user: User = result.rows[0];

  // Vérifier le mot de passe
  const match = await bcrypt.compare(password, user.password_hash!);
  if (!match) {
    throw new Error('InvalidCredentials');
  }

  // Générer un token
    const token = jwt.sign({ id: user.id, pseudo: user.pseudo }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return { token, user: { id: user.id, pseudo: user.pseudo } };
};

// Modifier un utilisateur
export const updateUser = async (userId: number, pseudo?: string, password?: string) => {
  // Vérifier si pseudo existe déjà (si on veut le modifier)
  if (pseudo) {
    const existing = await pool.query('SELECT id FROM users WHERE pseudo = $1 AND id != $2', [pseudo, userId]);
    if (existing.rows.length > 0) {
      throw new Error('PseudoExists');
    }
  }

  let hashed: string | undefined;
  if (password) {
    hashed = await bcrypt.hash(password, 10);
  }

  const updates: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (pseudo) {
    updates.push(`pseudo = $${idx++}`);
    values.push(pseudo);
  }
  if (hashed) {
    updates.push(`password_hash = $${idx++}`);
    values.push(hashed);
  }

  if (updates.length === 0) {
    throw new Error('NoFieldsToUpdate');
  }

  values.push(userId); // pour WHERE
  const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${idx} RETURNING id, pseudo`;
  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    throw new Error('UserNotFound');
  }

  return result.rows[0];
};

// Supprimer un utilisateur
export const deleteUser = async (userId: number) => {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [userId]);
  if (result.rows.length === 0) {
    throw new Error('UserNotFound');
  }
  return { id: userId };
};

