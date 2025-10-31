import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import GenericPie from "../components/GenericPie";
import BudgetBarChart from "../components/BudgetBarChart";
import type { ChartDatum } from "../interfaces/chartDatum";
import budgetService from "../services/budget.service";
import expenseService from "../services/expense.service";
import { prepareChartData } from "../helpers/prepareChartData";
import categoryService from "../services/category.service";
import { useHalloween } from "../contexts/HalloweenContext";


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isHalloweenMode } = useHalloween();
  const [mainData, setMainData] = useState<ChartDatum[]>([]);
  const [middleData, setMiddleData] = useState<ChartDatum[]>([]);
  const [outerData, setOuterData] = useState<ChartDatum[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const [categoriesRes, budgetsRes, expensesRes] = await Promise.all([
          categoryService.getCategories(),
          budgetService.getBudgets(),
          expenseService.getExpenses(),
        ]);

        if (!isMounted) return;
        setCategories(categoriesRes);
        setBudgets(budgetsRes);
        setExpenses(expensesRes);
        const { mainData, middleData, outerData } = prepareChartData(
          categoriesRes,
          budgetsRes,
          expensesRes,
          isHalloweenMode
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
        setBudgets([]);
        setCategories([]);
        setExpenses([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [isHalloweenMode]);

  const totalEuros = useMemo(
    () => mainData.reduce((acc, d) => acc + d.value, 0),
    [mainData]
  );

  return (
    <Box sx={{ p: 4, bgcolor: '#2C2C2C' }}>
      <Typography variant="h4" sx={{ color: '#fff' }}>Vos dépenses</Typography>

      <Box sx={{ mt: 3, bgcolor: 'transparent', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'stretch', justifyContent: 'flex-start' }}>
        <Box sx={{ flex: '0 0 auto', minWidth: 0 }}>
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
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <BudgetBarChart budgets={budgets} categories={categories} expenses={expenses} />
        </Box>
      </Box>

      <Fab
        variant="extended"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 40,
          backgroundColor: isHalloweenMode ? '#d000faff' : '#9c27b0',
          color: '#fff',
          '&:hover': {
            backgroundColor: isHalloweenMode ? '#9a00b9ff' : '#7b1fa2',
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
