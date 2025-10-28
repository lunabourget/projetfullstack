import express from 'express';
//import controllers from '../controllers/auth.controller';

const router = express.Router();

// utiliser des validators dans un middleware (pour plus tard)
router.post('/register', registerValidation, controllers.register);
router.post('/login', loginValidation, controllers.login);

export default router;
