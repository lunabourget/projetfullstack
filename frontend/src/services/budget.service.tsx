// src/services/budget.service.ts
import authService from "./auth.service";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/budgets";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${authService.getToken()}`,
});

const getBudgets = async () => {
  const res = await fetch(API_URL, { headers: headers() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur de récupération des budgets");
  return data;
};

const createBudget = async (category_id: number | null, amount: number) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ category_id, amount }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur lors de la création du budget");
  return data;
};

const updateBudget = async (id: number, updates: any) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur lors de la mise à jour du budget");
  return data;
};

const deleteBudget = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur lors de la suppression du budget");
  return data;
};

export default { getBudgets, createBudget, updateBudget, deleteBudget };
