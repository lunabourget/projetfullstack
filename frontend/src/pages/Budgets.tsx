// src/pages/Budgets.tsx
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
import budgetService from "../services/budget.service";
import authService from "../services/auth.service";
import { useHalloween } from "../contexts/HalloweenContext";

const Budgets: React.FC = () => {
  const { isHalloweenMode } = useHalloween();
  const [budgets, setBudgets] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadBudgets = async () => {
    const data = await budgetService.getBudgets();
    setBudgets(data);
  };

  const loadCategories = async () => {
    const token = authService.getToken();
    const res = await fetch("http://localhost:5000/api/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    loadBudgets();
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await budgetService.updateBudget(editingId, {
          category_id: categoryId ? Number(categoryId) : null,
          amount: Number(amount),
        });
      } else {
        await budgetService.createBudget(categoryId ? Number(categoryId) : null, Number(amount));
      }
      setEditingId(null);
      setCategoryId("");
      setAmount("");
      await loadBudgets();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEdit = (b: any) => {
    setEditingId(b.id);
    setCategoryId(b.category_id || "");
    setAmount(b.amount);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Supprimer ce budget ?")) {
      await budgetService.deleteBudget(id);
      await loadBudgets();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#2C2C2C', p: 4 }}>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Typography variant="h4" mb={2} sx={{ color: '#fff' }}>
          Budgets
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Catégorie (optionnelle)"
            fullWidth
            margin="normal"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            sx={{
              '& .MuiInputLabel-root': { color: '#bbb' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#555' },
                '&:hover fieldset': { borderColor: '#777' },
                '&.Mui-focused fieldset': { borderColor: isHalloweenMode ? '#d40000ff' : '#f44336' },
              },
            }}
          >
            <MenuItem value="">Aucune</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name || `Catégorie ${c.id}`}
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
            sx={{
              '& .MuiInputLabel-root': { color: '#bbb' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#555' },
                '&:hover fieldset': { borderColor: '#777' },
                '&.Mui-focused fieldset': { borderColor: isHalloweenMode ? '#d40000ff' : '#f44336' },
              },
            }}
          />

          <Button variant="contained" type="submit" fullWidth sx={{ 
              mt: 2,
              backgroundColor: isHalloweenMode ? '#d40000ff' : '#f44336',
              '&:hover': {
                backgroundColor: isHalloweenMode ? '#a70000ff' : '#d32f2f',
              }
            }}>
            {editingId ? "Mettre à jour" : "Ajouter un budget"}
          </Button>
        </form>

        <Typography variant="h6" mt={5} mb={1} sx={{ color: '#fff' }}>
          Liste des budgets
        </Typography>

        <Table sx={{ 
          '& .MuiTableCell-root': { 
            color: '#fff',
            borderBottom: '1px solid #444',
          }
        }}>
          <TableHead>
            <TableRow>
              <TableCell>Catégorie</TableCell>
              <TableCell>Montant (€)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.category_name || "—"}</TableCell>
                <TableCell>{b.amount}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(b)} sx={{ color: isHalloweenMode ? '#d40000ff' : '#f44336' }}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(b.id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Budgets;
