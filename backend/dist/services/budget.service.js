"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetService = void 0;
const db_1 = require("../db");
class BudgetService {
    async createBudget(userId, categoryId, amount) {
        const result = await db_1.pool.query('INSERT INTO budgets (user_id, category_id, amount) VALUES ($1, $2, $3) RETURNING *', [userId, categoryId, amount]);
        return result.rows[0];
    }
    async getBudgets(userId) {
        const result = await db_1.pool.query(`SELECT b.*, c.name as category_name 
             FROM budgets b 
             JOIN categories c ON b.category_id = c.id 
             WHERE b.user_id = $1`, [userId]);
        return result.rows;
    }
    async updateBudget(budgetId, userId, amount) {
        const result = await db_1.pool.query('UPDATE budgets SET amount = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 RETURNING *', [amount, budgetId, userId]);
        return result.rows[0] || null;
    }
    async deleteBudget(budgetId, userId) {
        const result = await db_1.pool.query('DELETE FROM budgets WHERE id = $1 AND user_id = $2 RETURNING *', [budgetId, userId]);
        return result.rows.length > 0;
    }
    async validateUserBudget(budgetId, userId) {
        const result = await db_1.pool.query('SELECT id FROM budgets WHERE id = $1 AND user_id = $2', [budgetId, userId]);
        return result.rows.length > 0;
    }
}
exports.BudgetService = BudgetService;
