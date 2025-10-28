import { Request, Response } from 'express';
import { BudgetService } from '../services/budget.service';

const budgetService = new BudgetService();

export const createBudgets = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category_id, amount } = req.body;
        const user_id = req.user?.id;

        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const budget = await budgetService.createBudget(user_id, category_id, amount);
        res.status(201).json(budget);
    } catch (error) {
        console.error('Error creating budget:', error);
        res.status(500).json({ message: 'Error creating budget' });
    }
};

export const getBudgets = async (req: Request, res: Response): Promise<void> => {
    try {
        const user_id = req.user?.id;

        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const budgets = await budgetService.getBudgets(user_id);
        res.json(budgets);
    } catch (error) {
        console.error('Error fetching budgets:', error);
        res.status(500).json({ message: 'Error fetching budgets' });
    }
};

export const updateBudget = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { amount } = req.body;
        const user_id = req.user?.id;

        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const budget = await budgetService.updateBudget(Number.parseInt(id), user_id, amount);
        
        if (!budget) {
            res.status(404).json({ message: 'Budget not found or unauthorized' });
            return;
        }

        res.json(budget);
    } catch (error) {
        console.error('Error updating budget:', error);
        res.status(500).json({ message: 'Error updating budget' });
    }
};

export const deleteBudget = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user_id = req.user?.id;

        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const deleted = await budgetService.deleteBudget(Number.parseInt(id), user_id);
        
        if (!deleted) {
            res.status(404).json({ message: 'Budget not found or unauthorized' });
            return;
        }

        res.json({ message: 'Budget deleted successfully' });
    } catch (error) {
        console.error('Error deleting budget:', error);
        res.status(500).json({ message: 'Error deleting budget' });
    }
};