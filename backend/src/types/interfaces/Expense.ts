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