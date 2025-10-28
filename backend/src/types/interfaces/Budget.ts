export interface Budget {
    id: number;
    user_id: number;
    category_id: number;
    amount: number;
    created_at: Date;
    updated_at: Date;
}