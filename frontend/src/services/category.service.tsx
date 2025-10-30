// src/services/category.service.ts
import authService from "./auth.service";
import type { Category } from "../interfaces/Category";

const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000") + "/api/categories";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${authService.getToken()}`,
});

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(API_URL, { headers: headers() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur de récupération des catégories");
  return data;
};

const categoryService = { getCategories };
export default categoryService;
