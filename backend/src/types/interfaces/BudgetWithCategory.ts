import { Budget } from './Budget';

export interface BudgetWithCategory extends Budget {
    category_name: string;
}