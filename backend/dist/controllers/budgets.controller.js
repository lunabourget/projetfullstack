"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBudget = exports.updateBudget = exports.getBudgets = exports.createBudgets = void 0;
const budget_service_1 = require("../services/budget.service");
const budgetService = new budget_service_1.BudgetService();
const createBudgets = async (req, res) => {
    try {
        const { category_id, amount } = req.body;
        const user_id = req.user?.id;
        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const budget = await budgetService.createBudget(user_id, category_id, amount);
        res.status(201).json(budget);
    }
    catch (error) {
        console.error('Error creating budget:', error);
        res.status(500).json({ message: 'Error creating budget' });
    }
};
exports.createBudgets = createBudgets;
const getBudgets = async (req, res) => {
    try {
        const user_id = req.user?.id;
        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const budgets = await budgetService.getBudgets(user_id);
        res.json(budgets);
    }
    catch (error) {
        console.error('Error fetching budgets:', error);
        res.status(500).json({ message: 'Error fetching budgets' });
    }
};
exports.getBudgets = getBudgets;
const updateBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, category_id } = req.body;
        const user_id = req.user?.id;
        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const budget = await budgetService.updateBudget(Number.parseInt(id), user_id, typeof amount !== 'undefined' ? Number(amount) : undefined, typeof category_id !== 'undefined' ? Number(category_id) : undefined);
        if (!budget) {
            res.status(404).json({ message: 'Budget not found or unauthorized' });
            return;
        }
        res.json(budget);
    }
    catch (error) {
        console.error('Error updating budget:', error);
        res.status(500).json({ message: 'Error updating budget' });
    }
};
exports.updateBudget = updateBudget;
const deleteBudget = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error deleting budget:', error);
        res.status(500).json({ message: 'Error deleting budget' });
    }
};
exports.deleteBudget = deleteBudget;
