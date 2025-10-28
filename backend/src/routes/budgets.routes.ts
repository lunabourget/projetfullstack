import express from 'express';
//import controllers from '../controllers/budgets.controller';
import { auth } from '../middleware/auth';

const router = express.Router();

router.use(auth);

router.get('/', controllers.getBudgets);
router.get('/tracking', controllers.getBudgetTracking);
router.delete('/:id', controllers.deleteBudget);

export default router;
