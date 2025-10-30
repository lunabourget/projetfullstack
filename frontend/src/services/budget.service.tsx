// src/services/budget.service.ts
import authService from "./auth.service";
import type { Budget } from "../interfaces/Budget";

const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000") + "/api/budgets";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${authService.getToken()}`,
});

const getBudgets = async (): Promise<Budget[]> => {
  const res = await fetch(API_URL, { headers: headers() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur de récupération des budgets");
  return data;
};

const createBudget = async (category_id: number | null, amount: number): Promise<Budget> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ category_id, amount }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur lors de la création du budget");
  return data;
};

const updateBudget = async (id: number, updates: Partial<Budget>): Promise<Budget> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur lors de la mise à jour du budget");
  return data;
};

const deleteBudget = async (id: number): Promise<{ message: string } & Partial<Budget>> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur lors de la suppression du budget");
  return data;
};

const budgetService = { getBudgets, createBudget, updateBudget, deleteBudget };
export default budgetService;
