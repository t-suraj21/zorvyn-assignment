import { create } from 'zustand';
import type { DashboardState, Transaction, TransactionType, Category } from '../types';
import { mockTransactions } from '../data';

interface DashboardStore extends DashboardState {
  setUserRole: (role: 'viewer' | 'admin') => void;
  setSearchTerm: (term: string) => void;
  setFilterType: (type: TransactionType | 'all') => void;
  setFilterCategory: (category: Category | 'all') => void;
  toggleDarkMode: () => void;
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  loadFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
  resetFilters: () => void;
}

const STORAGE_KEY = 'finance-dashboard-state';

const getInitialState = (): DashboardState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        transactions: parsed.transactions || mockTransactions,
        userRole: parsed.userRole || 'viewer',
        searchTerm: '',
        filterType: 'all',
        filterCategory: 'all',
        darkMode: parsed.darkMode || false,
      };
    } catch {
      return {
        transactions: mockTransactions,
        userRole: 'viewer',
        searchTerm: '',
        filterType: 'all',
        filterCategory: 'all',
        darkMode: false,
      };
    }
  }

  return {
    transactions: mockTransactions,
    userRole: 'viewer',
    searchTerm: '',
    filterType: 'all',
    filterCategory: 'all',
    darkMode: false,
  };
};

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  ...getInitialState(),

  setUserRole: (role) => {
    set({ userRole: role });
    // Save to localStorage after role change
    const state = get();
    const toSave = {
      transactions: state.transactions,
      userRole: role,
      darkMode: state.darkMode,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  },

  setSearchTerm: (term) => set({ searchTerm: term }),

  setFilterType: (type) => set({ filterType: type }),

  setFilterCategory: (category) => set({ filterCategory: category }),

  toggleDarkMode: () => {
    set((state) => {
      const newState = { darkMode: !state.darkMode };
      // Update localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsed, darkMode: newState.darkMode }));
      }
      return newState;
    });
  },

  addTransaction: (transaction) => {
    set((state) => {
      const newTransactions = [...state.transactions, transaction];
      get().saveToLocalStorage();
      return { transactions: newTransactions };
    });
  },

  deleteTransaction: (id) => {
    set((state) => {
      const newTransactions = state.transactions.filter((t) => t.id !== id);
      get().saveToLocalStorage();
      return { transactions: newTransactions };
    });
  },

  updateTransaction: (id, updates) => {
    set((state) => {
      const newTransactions = state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      );
      get().saveToLocalStorage();
      return { transactions: newTransactions };
    });
  },

  loadFromLocalStorage: () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        set({
          transactions: parsed.transactions || mockTransactions,
          userRole: parsed.userRole || 'viewer',
          darkMode: parsed.darkMode || false,
        });
      } catch {
        // If parsing fails, use default
      }
    }
  },

  saveToLocalStorage: () => {
    const state = get();
    const toSave = {
      transactions: state.transactions,
      userRole: state.userRole,
      darkMode: state.darkMode,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  },

  resetFilters: () => {
    set({
      searchTerm: '',
      filterType: 'all',
      filterCategory: 'all',
    });
  },
}));
