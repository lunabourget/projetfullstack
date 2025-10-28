"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const db_1 = require("../db");
class ExpenseService {
    async createExpense(userId, categoryId, amount, description, date) {
        const result = await db_1.pool.query('INSERT INTO expenses (user_id, category_id, amount, description, date) VALUES ($1, $2, $3, $4, $5) RETURNING *', [userId, categoryId, amount, description, date]);
        return result.rows[0];
    }
    async getExpenses(filters) {
        const queryParams = [filters.user_id];
        let query = `
            SELECT e.*, c.name as category_name 
            FROM expenses e 
            JOIN categories c ON e.category_id = c.id 
            WHERE e.user_id = $1
        `;
        if (filters.startDate && filters.endDate) {
            query += ' AND e.date BETWEEN $2 AND $3';
            queryParams.push(filters.startDate, filters.endDate);
        }
        if (filters.category_id) {
            query += ` AND e.category_id = $${queryParams.length + 1}`;
            queryParams.push(filters.category_id);
        }
        query += ' ORDER BY e.date DESC';
        const result = await db_1.pool.query(query, queryParams);
        return result.rows;
    }
    async updateExpense(expenseId, userId, updates) {
        const { amount, description, category_id, date } = updates;
        const result = await db_1.pool.query(`UPDATE expenses 
             SET amount = COALESCE($1, amount),
                 description = COALESCE($2, description),
                 category_id = COALESCE($3, category_id),
                 date = COALESCE($4, date),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $5 AND user_id = $6 
             RETURNING *`, [amount, description, category_id, date, expenseId, userId]);
        return result.rows[0] || null;
    }
    async deleteExpense(expenseId, userId) {
        const result = await db_1.pool.query('DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *', [expenseId, userId]);
        return result.rows.length > 0;
    }
    async validateUserExpense(expenseId, userId) {
        const result = await db_1.pool.query('SELECT id FROM expenses WHERE id = $1 AND user_id = $2', [expenseId, userId]);
        return result.rows.length > 0;
    }
}
exports.ExpenseService = ExpenseService;
