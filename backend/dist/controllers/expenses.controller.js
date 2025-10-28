"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.getExpenses = exports.createExpense = void 0;
const expense_service_1 = require("../services/expense.service");
const expenseService = new expense_service_1.ExpenseService();
const createExpense = async (req, res) => {
    try {
        const { category_id, amount, description, date } = req.body;
        const user_id = req.user?.id;
        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const expense = await expenseService.createExpense(user_id, category_id, amount, description, new Date(date));
        res.status(201).json(expense);
    }
    catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ message: 'Error creating expense' });
    }
};
exports.createExpense = createExpense;
const getExpenses = async (req, res) => {
    try {
        const user_id = req.user?.id;
        if (!user_id) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const filters = {
            user_id,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
            category_id: req.query.category_id ? Number(req.query.category_id) : undefined
        };
        const expenses = await expenseService.getExpenses(filters);
        res.json(expenses);
    }
    catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Error fetching expenses' });
    }
};
exports.getExpenses = getExpenses;
const updateExpense = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ message: 'Error updating expense' });
    }
};
exports.updateExpense = updateExpense;
const deleteExpense = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Error deleting expense' });
    }
};
exports.deleteExpense = deleteExpense;
