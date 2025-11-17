// src/services/category.service.ts
import authService from "./auth.service";
import type { Category } from "../interfaces/Category";

const base = process.env.REACT_APP_API_URL ?? 'http://51.254.205.63:5000';
const API_URL = `${base}/api/categories`;

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
