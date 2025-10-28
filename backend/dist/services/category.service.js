"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const db_1 = require("../db");
class CategoryService {
    async getCategories() {
        const result = await db_1.pool.query('SELECT * FROM categories ORDER BY name');
        return result.rows;
    }
    async getCategoryContents(categoryId, userId) {
        const catRes = await db_1.pool.query('SELECT * FROM categories WHERE id = $1', [categoryId]);
        const category = catRes.rows[0] || null;
        const budgetsRes = await db_1.pool.query(`SELECT b.*, c.name as category_name
             FROM budgets b
             JOIN categories c ON b.category_id = c.id
             WHERE b.category_id = $1 AND b.user_id = $2`, [categoryId, userId]);
        const budgets = budgetsRes.rows;
        const expensesRes = await db_1.pool.query(`SELECT e.*, cat.name as category_name
             FROM expenses e
             JOIN budgets b ON e.budget_id = b.id
             JOIN categories cat ON b.category_id = cat.id
             WHERE b.category_id = $1 AND e.user_id = $2
             ORDER BY e.date DESC`, [categoryId, userId]);
        const expenses = expensesRes.rows;
        return { category, budgets, expenses };
    }
}
exports.CategoryService = CategoryService;
