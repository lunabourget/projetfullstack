import { Request, Response } from 'express';
import { ExpenseService } from '../services/expense.service';
import { ExpenseFilters } from '../types';

const expenseService = new ExpenseService();

export const createExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const { budget_id, amount, description, date } = req.body;
        const user_id = req.user?.id;

        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const expense = await expenseService.createExpense(user_id, budget_id, amount, description, new Date(date));
        res.status(201).json(expense);
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ message: 'Error creating expense' });
    }
};

export const getExpenses = async (req: Request, res: Response): Promise<void> => {
    try {
        const user_id = req.user?.id;

        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const filters: ExpenseFilters = {
            user_id,
            startDate: req.query.startDate as string,
            endDate: req.query.endDate as string,
            budget_id: req.query.budget_id ? Number(req.query.budget_id) : undefined
        };

        const expenses = await expenseService.getExpenses(filters);
        res.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Error fetching expenses' });
    }
};

export const updateExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user_id = req.user?.id;

        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const expense = await expenseService.updateExpense(Number(id), user_id, {
            ...req.body,
            date: req.body.date ? new Date(req.body.date) : undefined
        });
        
        if (!expense) {
            res.status(404).json({ message: 'Expense not found or unauthorized' });
            return;
        }

        res.json(expense);
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ message: 'Error updating expense' });
    }
};

export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user_id = req.user?.id;

        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const deleted = await expenseService.deleteExpense(Number(id), user_id);
        
        if (!deleted) {
            res.status(404).json({ message: 'Expense not found or unauthorized' });
            return;
        }

        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Error deleting expense' });
    }
};

export const getExpensesByBudget = async (req: Request, res: Response): Promise<void> => {
    try {
        const user_id = req.user?.id;
        const budget_id = Number(req.params.budget_id);

        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        if (isNaN(budget_id)) {
            res.status(400).json({ message: 'Invalid budget ID' });
            return;
        }

        const expenses = await expenseService.getExpenses({ user_id, budget_id });
        res.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses by budget:', error);
        res.status(500).json({ message: 'Error fetching expenses by budget' });
    }
};
