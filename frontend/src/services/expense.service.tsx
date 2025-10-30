// src/services/expense.service.ts
import authService from "./auth.service";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/expenses";

const createExpense = async (budget_id: number, amount: number, description: string, date: string) => {
  const token = authService.getToken();
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ budget_id, amount, description, date }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur lors de la création de la dépense");
  return data;
};

const getExpenses = async () => {
  const token = authService.getToken();
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur de récupération des dépenses");
  return data;
};

export default { createExpense, getExpenses };
