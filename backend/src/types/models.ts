export interface Budget {
    id: number;
    user_id: number;
    category_id: number;
    amount: number;
    created_at: Date;
    updated_at: Date;
}

export interface BudgetWithCategory extends Budget {
    category_name: string;
}

export interface Expense {
    id: number;
    user_id: number;
    category_id: number;
    amount: number;
    description: string;
    date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface ExpenseWithCategory extends Expense {
    category_name: string;
}

export interface ExpenseFilters {
    startDate?: string;
    endDate?: string;
    category_id?: number;
    user_id: number;
}