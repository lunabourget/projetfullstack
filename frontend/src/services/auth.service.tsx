// src/services/auth.service.ts
// Base URL fournie via variable d'environnement (voir frontend/.env ou docker-compose)
const API_URL = (process.env.REACT_APP_API_URL ?? 'http://51.254.205.63:5000');

export interface LoginResponse {
  token: string;
  pseudo: string;
  id: number;
}

export interface RegisterResponse {
  id: number;
  pseudo: string;
  message?: string;
  token?: string;
}

class AuthService {
  async login(pseudo: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Échec de la connexion");

    if (data.token) localStorage.setItem("token", data.token);
    return data;
  }

  async register(pseudo: string, password: string): Promise<RegisterResponse> {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Échec de l’inscription");

    return data;
  }

  logout() {
    localStorage.removeItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
