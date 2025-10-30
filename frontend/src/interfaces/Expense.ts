export interface Expense {
  id: number;
  user_id: number;
  budget_id: number;
  amount: number; // may come as string from API; coerce when computing
  description: string;
  date: string; // ISO date string
  created_at: string;
  updated_at: string;
}
