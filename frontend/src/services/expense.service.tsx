// src/services/expense.service.ts
import authService from "./auth.service";
import type { Expense } from "../interfaces/Expense";

const base = process.env.REACT_APP_API_URL ?? 'http://51.254.205.63:5000';
const API_URL = `${base}/api/expenses`;

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${authService.getToken()}`,
});

const createExpense = async (
  budget_id: number | null,
  amount: number,
  description: string,
  date: string
): Promise<Expense> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ budget_id, amount, description, date }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur lors de la création de la dépense");
  return data;
};

const getExpenses = async (): Promise<Expense[]> => {
  const res = await fetch(API_URL, { headers: headers() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur de récupération des dépenses");
  return data;
};

const updateExpense = async (id: number, updates: Partial<Expense>): Promise<Expense> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur de mise à jour");
  return data;
};

const deleteExpense = async (id: number): Promise<{ message: string } & Partial<Expense>> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur de suppression");
  return data;
};

const expenseService = { createExpense, getExpenses, updateExpense, deleteExpense };
export default expenseService;
