// src/pages/AddExpense.tsx
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import expenseService from "../services/expense.service";
import authService from "../services/auth.service";

const AddExpense: React.FC = () => {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [budgetId, setBudgetId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = authService.getToken();
        const res = await fetch("http://localhost:5000/api/budgets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBudgets(data);
      } catch (err) {
        console.error("Erreur lors du chargement des budgets :", err);
      }
    };
    fetchBudgets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await expenseService.createExpense(Number(budgetId), Number(amount), description, date);
      setMessage("✅ Dépense ajoutée avec succès !");
      setAmount("");
      setDescription("");
      setBudgetId("");
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h4" mb={2}>
        Ajouter une dépense
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Budget"
          fullWidth
          margin="normal"
          value={budgetId}
          onChange={(e) => setBudgetId(e.target.value)}
        >
          {budgets.map((b) => (
            <MenuItem key={b.id} value={b.id}>
              Budget {b.id} — {b.amount} €
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Montant (€)"
          type="number"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
          Ajouter
        </Button>
      </form>

      {message && (
        <Typography sx={{ mt: 2, color: message.startsWith("✅") ? "green" : "red" }}>{message}</Typography>
      )}
    </Box>
  );
};

export default AddExpense;
