import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import authService from "../services/auth.service";

interface AuthPageProps {
  onLoginSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.login(pseudo, password);
      onLoginSuccess();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h4" mb={2}>
        Connexion
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Pseudo"
          fullWidth
          margin="normal"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Se connecter
        </Button>
      </form>
    </Box>
  );
};

export default AuthPage;
