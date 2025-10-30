// src/pages/Dashboard.tsx
import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Bienvenue sur le Dashboard 🎉</Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleLogout}
      >
        Se déconnecter
      </Button>
    </Box>
  );
};

export default Dashboard;
