import express from 'express';
import * as controllers from '../controllers/expenses.controller';
import { auth } from '../middleware/auth';

const router = express.Router();

router.use(auth);
router.use(auth);

router.post('/', controllers.createExpense);
router.get('/', controllers.getExpenses);
router.put('/:id', controllers.updateExpense);
router.delete('/:id', controllers.deleteExpense);

export default router;
