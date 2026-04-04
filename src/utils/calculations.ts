import type { Transaction, Category, CategorySpending, DashboardMetrics, MonthlyData } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

export const formatShortDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

export const calculateTotal = (transactions: Transaction[], type: 'income' | 'expense'): number => {
  return transactions
    .filter((t) => t.type === type)
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateBalance = (transactions: Transaction[]): number => {
  const income = calculateTotal(transactions, 'income');
  const expenses = calculateTotal(transactions, 'expense');
  return income - expenses;
};

export const calculateGrowth = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

export const getSpendingByCategory = (transactions: Transaction[]): CategorySpending[] => {
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');
  const categoryMap = new Map<Category, number>();

  expenseTransactions.forEach((t) => {
    categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
  });

  const total = Array.from(categoryMap.values()).reduce((sum, amount) => sum + amount, 0);

  return Array.from(categoryMap.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
};

export const getMonthlyBalance = (transactions: Transaction[]): MonthlyData[] => {
  const monthMap = new Map<string, MonthlyData>();

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(date);

    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, { month: monthLabel, balance: 0 });
    }

    const data = monthMap.get(monthKey)!;
    if (t.type === 'income') {
      data.balance += t.amount;
    } else {
      data.balance -= t.amount;
    }
  });

  return Array.from(monthMap.values()).sort((a, b) => {
    const aDate = new Date(a.month);
    const bDate = new Date(b.month);
    return aDate.getTime() - bDate.getTime();
  });
};

export const calculateDashboardMetrics = (transactions: Transaction[]): DashboardMetrics => {
  const totalIncome = calculateTotal(transactions, 'income');
  const totalExpenses = calculateTotal(transactions, 'expense');
  const totalBalance = calculateBalance(transactions);

  // Calculate previous months for growth
  const now = new Date();
  const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const currentMonthTransactions = transactions.filter((t) => new Date(t.date) >= firstDayCurrentMonth);
  const previousMonthTransactions = transactions.filter(
    (t) => new Date(t.date) >= firstDayPreviousMonth && new Date(t.date) < firstDayCurrentMonth
  );

  const currentMonthIncome = calculateTotal(currentMonthTransactions, 'income');
  const previousMonthIncome = calculateTotal(previousMonthTransactions, 'income');
  const currentMonthExpenses = calculateTotal(currentMonthTransactions, 'expense');
  const previousMonthExpenses = calculateTotal(previousMonthTransactions, 'expense');

  const incomeGrowth = calculateGrowth(currentMonthIncome, previousMonthIncome);
  const expenseGrowth = calculateGrowth(currentMonthExpenses, previousMonthExpenses);

  // Get highest spending category
  const spending = getSpendingByCategory(transactions);
  const highestCategory = spending.length > 0 ? spending[0].category : null;

  // Calculate health score (income - expenses ratio)
  const healthScore = totalIncome > 0 ? Math.round((totalBalance / totalIncome) * 100) : 0;

  return {
    totalBalance,
    totalIncome,
    totalExpenses,
    incomeGrowth,
    expenseGrowth,
    highestCategory,
    healthScore: Math.max(0, Math.min(100, healthScore)),
  };
};

export const filterTransactions = (
  transactions: Transaction[],
  searchTerm: string,
  type: 'income' | 'expense' | 'all',
  category: string | 'all'
): Transaction[] => {
  return transactions.filter((t) => {
    const matchesSearch =
      searchTerm === '' ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = type === 'all' || t.type === type;
    const matchesCategory = category === 'all' || t.category === category;

    return matchesSearch && matchesType && matchesCategory;
  });
};

export const sortTransactions = (
  transactions: Transaction[],
  sortBy: 'date' | 'amount'
): Transaction[] => {
  const sorted = [...transactions];
  if (sortBy === 'date') {
    sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else {
    sorted.sort((a, b) => b.amount - a.amount);
  }
  return sorted;
};

export const exportToCSV = (transactions: Transaction[]): string => {
  const headers = ['Date', 'Category', 'Description', 'Type', 'Amount'];
  const rows = transactions.map((t) => [t.date, t.category, t.description, t.type, t.amount]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  return csvContent;
};

export const downloadCSV = (transactions: Transaction[]): void => {
  const csv = exportToCSV(transactions);
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
  element.setAttribute('download', `transactions-${new Date().toISOString().split('T')[0]}.csv`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const exportToJSON = (transactions: Transaction[]): string => {
  return JSON.stringify(transactions, null, 2);
};

export const downloadJSON = (transactions: Transaction[]): void => {
  const json = exportToJSON(transactions);
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(json)}`);
  element.setAttribute('download', `transactions-${new Date().toISOString().split('T')[0]}.json`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
