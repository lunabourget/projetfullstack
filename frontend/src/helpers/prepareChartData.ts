import { ChartDatum } from "../interfaces/chartDatum";
import { Category } from '../../../backend/src/types/interfaces/Category';
import { Budget } from '../../../backend/src/types/interfaces/Budget';
import { Expense } from '../../../backend/src/types/interfaces/Expense';
import { categoryColors } from '../static/categoryColors';

export function prepareChartData(
  categories: Category[],
  budgets: Budget[],
  expenses: Expense[],
): { mainData: ChartDatum[]; middleData: ChartDatum[]; outerData: ChartDatum[] } {
  // Cercle 1 : catégories
  const mainData: ChartDatum[] = categories.map(cat => {
    const total = budgets
      .filter(b => b.category_id === cat.id)
      .reduce((acc, b) => {
        const budgetExpenses = expenses
          .filter(e => e.budget_id === b.id)
          .reduce((sum, e) => sum + Number(e.amount), 0);
        return acc + budgetExpenses;
      }, 0);

    return {
      id: cat.name,
      label: cat.name,
      value: total,
      percentage: 0,
      color: categoryColors[cat.name] || '#ccc',
    };
  });

  const totalMain = mainData.reduce((acc, d) => acc + d.value, 0);
  mainData.forEach(d => (d.percentage = totalMain > 0 ? (d.value / totalMain) * 100 : 0));

  // Cercle 2 : budgets
  const middleData: ChartDatum[] = budgets.map(b => {
    const budgetExpenses = expenses
      .filter(e => e.budget_id === b.id)
      .reduce((sum, e) => sum + Number(e.amount), 0);
    const categoryName = categories.find(c => c.id === b.category_id)?.name ?? 'Unknown';

    return {
      id: `budget-${b.id}`,
      label: `${categoryName} Budget`,
      value: budgetExpenses,
      percentage: 0,
      color: categoryColors[categoryName] || '#ccc',
    };
  });

  const totalMiddle = middleData.reduce((acc, d) => acc + d.value, 0);
  middleData.forEach(d => (d.percentage = totalMiddle > 0 ? (d.value / totalMiddle) * 100 : 0));

  // Cercle 3 : dépenses
  const outerData: ChartDatum[] = expenses.map(e => {
    const budget = budgets.find(b => b.id === e.budget_id);
    const categoryName = categories.find(c => c.id === budget?.category_id)?.name ?? 'Unknown';

    return {
      id: `expense-${e.id}`,
      label: e.description || 'Dépense',
      value: Number(e.amount),
      percentage: 0,
      color: categoryColors[categoryName] || '#ccc',
    };
  });

  const totalOuter = outerData.reduce((acc, d) => acc + d.value, 0);
  outerData.forEach(d => (d.percentage = totalOuter > 0 ? (d.value / totalOuter) * 100 : 0));

  return { mainData, middleData, outerData };
}
