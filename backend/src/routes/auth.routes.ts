import express from 'express';
import { register, login, update, remove } from '../controllers/auth.controller';
import { auth } from '../middleware/auth'; // middleware pour JWT si tu en as un

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Routes protégées
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

export default router;
