import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import authService from "../services/auth.service";

interface AuthPageProps {
  onLoginSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isLogin) {
        await authService.login(pseudo, password);
        setSuccess("Connexion réussie !");
        onLoginSuccess(); // met à jour l'état parent
      } else {
        await authService.register(pseudo, password);
        setSuccess("Compte créé avec succès !");
        setIsLogin(true); // revenir à la page login
      }
    } catch (err: any) {
      // Selon ton backend, on peut récupérer err.response.data.error
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" mb={2} textAlign="center">
        {isLogin ? "Connexion" : "Créer un compte"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Pseudo"
          fullWidth
          margin="normal"
          variant="outlined"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {isLogin ? "Se connecter" : "Créer un compte"}
        </Button>
      </form>

      <Button
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => {
          setIsLogin(!isLogin);
          setError(null);
          setSuccess(null);
        }}
      >
        {isLogin ? "Pas encore de compte ? Créer un compte" : "Déjà un compte ? Se connecter"}
      </Button>
    </Box>
  );
};

export default AuthPage;
