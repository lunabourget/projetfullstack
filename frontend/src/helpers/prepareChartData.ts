import { ChartDatum } from "../interfaces/chartDatum";
import { Category } from "../interfaces/Category";
import { Budget } from "../interfaces/Budget";
import { Expense } from "../interfaces/Expense";
import { getCategoryColors } from "../static/categoryColors";

export function prepareChartData(
  categories: Category[],
  budgets: Budget[],
  expenses: Expense[],
  isHalloweenMode: boolean = true
): { mainData: ChartDatum[]; middleData: ChartDatum[]; outerData: ChartDatum[] } {
  const categoryColors = getCategoryColors(isHalloweenMode);
  const mainData: ChartDatum[] = categories.map((cat) => {
    const total = budgets
      .filter((b) => b.category_id === cat.id)
      .reduce((acc, b) => {
        const budgetExpenses = expenses
          .filter((e) => e.budget_id === b.id)
          .reduce((sum, e) => sum + Number(e.amount), 0);
        return acc + budgetExpenses;
      }, 0);

    return {
      id: cat.name,
      label: cat.name,
      value: total,
      percentage: 0,
      color: categoryColors[cat.name] || "#ccc",
    };
  });

  const totalMain = mainData.reduce((acc, d) => acc + d.value, 0);
  for (const d of mainData) {
    d.percentage = totalMain > 0 ? (d.value / totalMain) * 100 : 0;
  }

  const middleData: ChartDatum[] = [];
  for (const cat of categories) {
    const categoryBudgets = budgets
      .filter((b) => b.category_id === cat.id)
      .map((b) => {
        const budgetExpenses = expenses
          .filter((e) => e.budget_id === b.id)
          .reduce((sum, e) => sum + Number(e.amount), 0);

        return {
          id: `budget-${b.id}`,
          label: `${cat.name} Budget`,
          value: budgetExpenses,
          percentage: 0,
          color: categoryColors[cat.name] || "#ccc",
        };
      });
    middleData.push(...categoryBudgets);
  }

  const totalMiddle = middleData.reduce((acc, d) => acc + d.value, 0);
  for (const d of middleData) {
    d.percentage = totalMiddle > 0 ? (d.value / totalMiddle) * 100 : 0;
  }

  const outerData: ChartDatum[] = [];
  for (const cat of categories) {
    const categoryBudgets = budgets.filter((b) => b.category_id === cat.id);
    for (const budget of categoryBudgets) {
      const budgetExpenses = expenses
        .filter((e) => e.budget_id === budget.id)
        .map((e) => ({
          id: `expense-${e.id}`,
          label: e.description || "Dépense",
          value: Number(e.amount),
          percentage: 0,
          color: categoryColors[cat.name] || "#ccc",
        }));
      outerData.push(...budgetExpenses);
    }
  }

  const totalOuter = outerData.reduce((acc, d) => acc + d.value, 0);
  for (const d of outerData) {
    d.percentage = totalOuter > 0 ? (d.value / totalOuter) * 100 : 0;
  }

  return { mainData, middleData, outerData };
}
