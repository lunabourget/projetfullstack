import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import authService from "../services/auth.service";
import GenericPie from "../components/GenericPie";
import type { ChartDatum } from "../interfaces/chartDatum";
interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [mainData, setMainData] = useState<ChartDatum[]>([]);
  const [middleData, setMiddleData] = useState<ChartDatum[]>([]);
  const [outerData, setOuterData] = useState<ChartDatum[]>([]);

  useEffect(() => {
    const raw = [
      { id: "Alimentation", label: "Alimentation", value: 350, color: "#FF6F61" },
      { id: "Logement", label: "Logement", value: 800, color: "#6B5B95" },
      { id: "Transport", label: "Transport", value: 120, color: "#88B04B" },
      { id: "Loisirs", label: "Loisirs", value: 200, color: "#FFA500" },
    ];

    const total = raw.reduce((acc, d) => acc + d.value, 0);
    const computed: ChartDatum[] = raw.map((d) => ({
      ...d,
      percentage: total > 0 ? (d.value / total) * 100 : 0,
    }));

    setMainData(computed);
    setMiddleData([]);
    setOuterData([]);
  }, []);

  const totalEuros = useMemo(
    () => mainData.reduce((acc, d) => acc + d.value, 0),
    [mainData]
  );

  return (
    <Box sx={{ p: 4, minHeight: '100vh', bgcolor: '#2C2C2C' }}>
      <Typography variant="h4" sx={{ color: '#fff' }}>Bienvenue sur le Dashboard 🎉</Typography>

      <Box sx={{ mt: 3, bgcolor: 'transparent' }}>
        <GenericPie
          title="Dépenses par catégorie"
          centerLabel={`${totalEuros.toFixed(0)} €`}
          mainData={mainData}
          middleData={middleData}
          outerData={outerData}
        />
      </Box>

      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={() => {
          authService.logout();
          onLogout();
        }}
      >
        Se déconnecter
      </Button>
    </Box>
  );
};
export default Dashboard;
