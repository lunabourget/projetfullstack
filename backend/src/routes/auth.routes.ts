import express from 'express';
import { register, login, update, remove } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.ts'; // middleware pour JWT si tu en as un

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Routes protégées
router.put('/:id', authenticate, update);
router.delete('/:id', authenticate, remove);

export default router;
