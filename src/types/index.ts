export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Salary'
  | 'Freelance'
  | 'Food'
  | 'Rent'
  | 'Utilities'
  | 'Entertainment'
  | 'Shopping'
  | 'Healthcare'
  | 'Transport'
  | 'Education'
  | 'Other';

export type UserRole = 'viewer' | 'admin';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

export interface DashboardState {
  transactions: Transaction[];
  userRole: UserRole;
  searchTerm: string;
  filterType: TransactionType | 'all';
  filterCategory: Category | 'all';
  darkMode: boolean;
}

export interface MonthlyData {
  month: string;
  balance: number;
}

export interface CategorySpending {
  category: Category;
  amount: number;
  percentage: number;
}

export interface DashboardMetrics {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  incomeGrowth: number;
  expenseGrowth: number;
  highestCategory: Category | null;
  healthScore: number;
}

export interface InsightCard {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | null;
  trendValue?: string;
}
