import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import GenericPie from "../components/GenericPie";
import type { ChartDatum } from "../interfaces/chartDatum";
import budgetService from "../services/budget.service";
import expenseService from "../services/expense.service";
import { prepareChartData } from "../helpers/prepareChartData";
import categoryService from "../services/category.service";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [mainData, setMainData] = useState<ChartDatum[]>([]);
  const [middleData, setMiddleData] = useState<ChartDatum[]>([]);
  const [outerData, setOuterData] = useState<ChartDatum[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const [categories, budgets, expenses] = await Promise.all([
          categoryService.getCategories(),
          budgetService.getBudgets(),
          expenseService.getExpenses(),
        ]);

        if (!isMounted) return;
        const { mainData, middleData, outerData } = prepareChartData(
          categories,
          budgets,
          expenses
        );
        setMainData(mainData);
        setMiddleData(middleData);
        setOuterData(outerData);
      } catch (e: any) {
        if (!isMounted) return;
        setError(e?.message || "Erreur lors du chargement des données");
        setMainData([]);
        setMiddleData([]);
        setOuterData([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalEuros = useMemo(
    () => mainData.reduce((acc, d) => acc + d.value, 0),
    [mainData]
  );

  return (
    <Box sx={{ p: 4, minHeight: '100vh', bgcolor: '#2C2C2C' }}>
      <Typography variant="h4" sx={{ color: '#fff' }}>Vos Dernières dépenses</Typography>

      <Box sx={{ mt: 3, bgcolor: 'transparent' }}>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <GenericPie
          title={loading ? "Chargement..." : "Dépenses par catégorie"}
          centerLabel={`${totalEuros.toFixed(0)} €`}
          mainData={mainData}
          middleData={middleData}
          outerData={outerData}
        />
        {!loading && mainData.length === 0 && (
          <Typography sx={{ mt: 2, color: '#bbb' }}>
            Aucune donnée pour le moment. Ajoutez des budgets et des dépenses pour voir le graphique.
          </Typography>
        )}
      </Box>

      <Fab
        variant="extended"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 40,
          backgroundColor: '#f54e00ff',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#d94400',
          },
        }}
        onClick={() => navigate('/expenses')}
      >
        <AddIcon sx={{ mr: 1 }} />
        Nouvelle dépense
      </Fab>
    </Box>
  );
};
export default Dashboard;
