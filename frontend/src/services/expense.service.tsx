// src/services/expense.service.ts
import authService from "./auth.service";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/expenses";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${authService.getToken()}`,
});

const createExpense = async (budget_id: number | null, amount: number, description: string, date: string) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ budget_id, amount, description, date }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur lors de la création de la dépense");
  return data;
};

const getExpenses = async () => {
  const res = await fetch(API_URL, { headers: headers() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur de récupération des dépenses");
  return data;
};

const updateExpense = async (id: number, updates: any) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur de mise à jour");
  return data;
};

const deleteExpense = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur de suppression");
  return data;
};

export default { createExpense, getExpenses, updateExpense, deleteExpense };
