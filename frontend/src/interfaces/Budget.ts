export interface Budget {
  id: number;
  user_id: number;
  category_id: number;
  amount: number; // may come as string from API; coerce when computing
  created_at: string;
  updated_at: string;
}
