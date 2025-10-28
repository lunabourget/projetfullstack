import express from 'express';
import * as controllers from '../controllers/categories.controller';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/', controllers.getCategories);
router.get('/:id', auth, controllers.getCategoryContents);

export default router;