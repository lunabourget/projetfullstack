import React from "react";
import { Box, Typography, Button } from "@mui/material";
import authService from "../services/auth.service";

// 1️⃣ Définir les props attendues
interface DashboardProps {
  onLogout: () => void;
}

// 2️⃣ Typage du composant avec React.FC<Props>
const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Bienvenue sur le Dashboard 🎉</Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={() => {
          authService.logout();
          onLogout(); // update l’état parent
        }}
      >
        Se déconnecter
      </Button>
    </Box>
  );
};

export default Dashboard;
