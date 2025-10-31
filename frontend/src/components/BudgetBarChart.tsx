import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Budget } from '../interfaces/Budget';
import type { Category } from '../interfaces/Category';
import type { Expense } from '../interfaces/Expense';
import { getCategoryColors } from '../static/categoryColors';
import { useHalloween } from '../contexts/HalloweenContext';

interface BudgetBarChartProps {
  budgets: Budget[];
  categories: Category[];
  expenses: Expense[];
}

export default function BudgetBarChart({ budgets, categories, expenses }: Readonly<BudgetBarChartProps>) {
  const theme = useTheme();
  const { isHalloweenMode } = useHalloween();
  const categoryColors = getCategoryColors(isHalloweenMode);

  const data = budgets.map((budget) => {
    const cat = categories.find((c) => c.id === budget.category_id);
    const spent = expenses
      .filter((e) => e.budget_id === budget.id)
      .reduce((sum, e) => sum + Number(e.amount), 0);
    const remaining = Number(budget.amount) - spent;
    return {
      id: budget.id,
      label: cat ? cat.name : `Budget ${budget.id}`,
      spent,
      remaining: Math.max(0, remaining),
      color: cat ? categoryColors[cat.name] || '#ccc' : '#ccc',
    };
  });

  const labels = data.map((d) => d.label);
  const maxLabelLength = labels.reduce((m, l) => Math.max(m, l.length), 0);
  const leftMargin = Math.min(600, 60 + maxLabelLength * 0);

  const toRGBA = (hex: string, alpha: number) => {
    const m = hex.replace('#', '');
  const bigint = Number.parseInt(m.length === 3 ? m.split('').map((c) => c + c).join('') : m, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const series = data.flatMap((d, idx) => [
    {
      id: `spent-${idx}`,
      label: '',
      data: labels.map((_, i) => (i === idx ? d.spent : 0)),
      stack: 'total',
      color: d.color,
        valueFormatter: (v: number) => {
          if (!v || v <= 0) return undefined as unknown as string;
        const related = expenses.filter((e) => e.budget_id === data[idx].id);
        if (!related.length) return `${v.toFixed(0)} €`;
        const list = related
          .map((e) => `${e.description || 'Dépense'}: ${Number(e.amount).toFixed(0)} €`)
          .join('\n');
        return list;
      },
    },
    {
      id: `remaining-${idx}`,
      label: '',
      data: labels.map((_, i) => (i === idx ? d.remaining : 0)),
      stack: 'total',
      color: toRGBA(d.color, theme.palette.mode === 'dark' ? 0.35 : 0.45),
        valueFormatter: (v: number) => {
          if (!v || v <= 0) return undefined as unknown as string;
          return `${v.toFixed(0)} € restants`;
        },
    },
  ]);

  return (
    <Box sx={{ textAlign: 'left', marginTop: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#fff', fontWeight: 600, textAlign: 'center' }}>
        Dépenses par budget
      </Typography>
      <BarChart
  yAxis={[{ scaleType: 'band', data: labels, tickLabelStyle: { fill: '#fff', whiteSpace: 'nowrap' } }]}
      xAxis={[{ tickLabelStyle: { fill: '#fff' } }]}
      series={series as any}
      height={labels.length > 0 ? Math.max(200, labels.length * 40) : 240}
      layout="horizontal"
      sx={{
        bgcolor: 'transparent',
        borderRadius: 0,
        '& .MuiChartsAxis-tickLabel': {
          fill: '#fff',
          overflow: 'visible !important',
          textOverflow: 'clip !important',
          whiteSpace: 'nowrap !important',
          maxWidth: 'none !important',
          width: 'auto !important',
        },
        '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
          transform: 'translateX(-8px)',
        },
        '& .MuiBarElement-root': { stroke: '#2C2C2C', strokeWidth: 2 },
        '& .MuiChartsLegend-root': { display: 'none' },
        '& .MuiChartsTooltip-root, & .MuiChartsTooltip-paper': {
          backgroundColor: '#414141',
          color: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          whiteSpace: 'pre-wrap',
          maxWidth: 420,
        },
        '& .MuiChartsTooltip-mark': { display: 'none' },
      }}
  margin={{ top: 50, right: 20, left: leftMargin, bottom: 0 }}
      slotProps={{ tooltip: { trigger: 'item' } } as any}
    />
    </Box>
  );
}
