import { Expense } from './Expense';

export interface ExpenseWithCategory extends Expense {
    category_name: string;
}