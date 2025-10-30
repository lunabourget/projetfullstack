import React, { useState } from "react";
import { /* MUI imports */ } from "@mui/material";
import authService from "../services/auth.service";

// 1️⃣ Définition des props
interface AuthPageProps {
  onLoginSuccess: () => void;
}

// 2️⃣ Typage du composant avec React.FC<Props>
const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        await authService.login(pseudo, password);
        setMessage("Connexion réussie !");
        onLoginSuccess(); // ✅ on met à jour l'état parent
      } else {
        await authService.register(pseudo, password);
        setMessage("Compte créé avec succès !");
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ton JSX ici (inchangé)
    <div> {/* ... */} </div>
  );
};

export default AuthPage;
