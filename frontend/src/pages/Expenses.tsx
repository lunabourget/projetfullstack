// src/pages/Expenses.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import expenseService from "../services/expense.service";
import authService from "../services/auth.service";

const Expenses: React.FC = () => {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [budgetId, setBudgetId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadBudgets = async () => {
    const token = authService.getToken();
    const res = await fetch("http://localhost:5000/api/budgets", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setBudgets(data);
  };

  const loadExpenses = async () => {
    const data = await expenseService.getExpenses();
    setExpenses(data);
  };

  useEffect(() => {
    loadBudgets();
    loadExpenses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await expenseService.updateExpense(editingId, {
          budget_id: budgetId ? Number(budgetId) : null,
          amount: Number(amount),
          description,
          date,
        });
      } else {
        await expenseService.createExpense(
          budgetId ? Number(budgetId) : null,
          Number(amount),
          description,
          date
        );
      }
      setEditingId(null);
      setBudgetId("");
      setAmount("");
      setDescription("");
      await loadExpenses();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEdit = (exp: any) => {
    setEditingId(exp.id);
    setBudgetId(exp.budget_id || "");
    setAmount(exp.amount);
    setDescription(exp.description);
    setDate(exp.date.split("T")[0]);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Supprimer cette dépense ?")) {
      await expenseService.deleteExpense(id);
      await loadExpenses();
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 6 }}>
      <Typography variant="h4" mb={2}>
        Dépenses
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Budget (optionnel)"
          fullWidth
          margin="normal"
          value={budgetId}
          onChange={(e) => setBudgetId(e.target.value)}
        >
          <MenuItem value="">Aucun</MenuItem>
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

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          {editingId ? "Mettre à jour" : "Ajouter une dépense"}
        </Button>
      </form>

      <Typography variant="h6" mt={5} mb={1}>
        Liste des dépenses
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Budget</TableCell>
            <TableCell>Montant (€)</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell>{exp.budget_id || "—"}</TableCell>
              <TableCell>{exp.amount}</TableCell>
              <TableCell>{exp.description}</TableCell>
              <TableCell>{new Date(exp.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(exp)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(exp.id)}>
                  <Delete color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Expenses;
