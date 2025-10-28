import { pool } from '../db';
import { QueryResult } from 'pg';
import { Category, BudgetWithCategory, ExpenseWithCategory } from '../types';

export class CategoryService {
    async getCategories(): Promise<Category[]> {
        const result: QueryResult = await pool.query('SELECT * FROM categories ORDER BY name');
        return result.rows;
    }

    async getCategoryContents(categoryId: number, userId: number): Promise<{ category: Category | null; budgets: BudgetWithCategory[]; expenses: ExpenseWithCategory[] }> {
        const catRes: QueryResult = await pool.query('SELECT * FROM categories WHERE id = $1', [categoryId]);
        const category: Category | null = catRes.rows[0] || null;

        const budgetsRes: QueryResult = await pool.query(
            `SELECT b.*, c.name as category_name
             FROM budgets b
             JOIN categories c ON b.category_id = c.id
             WHERE b.category_id = $1 AND b.user_id = $2`,
            [categoryId, userId]
        );

        const budgets: BudgetWithCategory[] = budgetsRes.rows;

        const expensesRes: QueryResult = await pool.query(
            `SELECT e.*, cat.name as category_name
             FROM expenses e
             JOIN budgets b ON e.budget_id = b.id
             JOIN categories cat ON b.category_id = cat.id
             WHERE b.category_id = $1 AND e.user_id = $2
             ORDER BY e.date DESC`,
            [categoryId, userId]
        );

        const expenses: ExpenseWithCategory[] = expensesRes.rows;

        return { category, budgets, expenses };
    }
}
