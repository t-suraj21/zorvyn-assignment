import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, RotateCcw, Calendar, DollarSign, TrendingDown } from 'lucide-react';
import { useDashboardStore } from '../store';
import { formatCurrency } from '../utils';

interface RecurringTransaction {
  id: string;
  name: string;
  amount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
  category: string;
  nextDueDate: string;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
}

export const Recurring: React.FC = () => {
  const { darkMode } = useDashboardStore();
  const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransaction[]>([
    {
      id: '1',
      name: 'Netflix Subscription',
      amount: 499,
      frequency: 'monthly',
      category: 'Entertainment',
      nextDueDate: '2026-04-10',
      status: 'active',
      startDate: '2025-01-10',
    },
    {
      id: '2',
      name: 'Gym Membership',
      amount: 1200,
      frequency: 'monthly',
      category: 'Health',
      nextDueDate: '2026-04-15',
      status: 'active',
      startDate: '2025-02-15',
    },
    {
      id: '3',
      name: 'House Rent',
      amount: 25000,
      frequency: 'monthly',
      category: 'Housing',
      nextDueDate: '2026-04-05',
      status: 'active',
      startDate: '2024-01-05',
    },
    {
      id: '4',
      name: 'Road Tax',
      amount: 5000,
      frequency: 'yearly',
      category: 'Transport',
      nextDueDate: '2026-06-30',
      status: 'active',
      startDate: '2025-06-30',
    },
    {
      id: '5',
      name: 'Insurance Premium',
      amount: 8000,
      frequency: 'quarterly',
      category: 'Insurance',
      nextDueDate: '2026-05-15',
      status: 'paused',
      startDate: '2025-02-15',
    },
  ]);

  const stats = useMemo(() => {
    const activeTransactions = recurringTransactions.filter(t => t.status === 'active');
    const monthlyRecurring = activeTransactions
      .filter(t => t.frequency === 'monthly')
      .reduce((sum, t) => sum + t.amount, 0);

    const yearlyRecurring = activeTransactions
      .filter(t => t.frequency === 'yearly')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalRecurring = activeTransactions.reduce((sum, t) => sum + t.amount, 0);

    return { 
      totalRecurring, 
      monthlyRecurring, 
      yearlyRecurring,
      activeCount: activeTransactions.length,
      pausedCount: recurringTransactions.filter(t => t.status === 'paused').length,
    };
  }, [recurringTransactions]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'paused':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'completed':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'weekly':
        return '📅 Every Week';
      case 'biweekly':
        return '📅 Every 2 Weeks';
      case 'monthly':
        return '📅 Every Month';
      case 'quarterly':
        return '📅 Every 3 Months';
      case 'yearly':
        return '📅 Yearly';
      default:
        return frequency;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Page Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Recurring Transactions</h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your recurring expenses and subscriptions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.div
            variants={itemVariants}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Active
                </p>
                <p className="text-2xl font-bold mt-1">
                  {stats.activeCount}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <RotateCcw size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Monthly
                </p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(stats.monthlyRecurring)}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <DollarSign size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Yearly
                </p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(stats.yearlyRecurring)}
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <Calendar size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total
                </p>
                <p className="text-2xl font-bold mt-1 text-red-600">
                  {formatCurrency(stats.totalRecurring)}
                </p>
              </div>
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                <TrendingDown size={24} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Recurring Transactions List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Recurring Transactions</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Recurring
            </motion.button>
          </div>

          {recurringTransactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              variants={itemVariants}
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-2xl shadow-lg p-6 transition-colors`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <RotateCcw size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{transaction.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => 
                    setRecurringTransactions(
                      recurringTransactions.filter(t => t.id !== transaction.id)
                    )
                  }
                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                >
                  <Trash2 size={18} className="text-red-600" />
                </motion.button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 pt-4 border-t border-gray-300 dark:border-gray-700">
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Amount
                  </p>
                  <p className="text-lg font-bold mt-1">{formatCurrency(transaction.amount)}</p>
                </div>

                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Frequency
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {getFrequencyLabel(transaction.frequency)}
                  </p>
                </div>

                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Next Due
                  </p>
                  <p className="text-sm font-semibold mt-1">{transaction.nextDueDate}</p>
                </div>

                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Status
                  </p>
                  <span
                    className={`inline-block text-xs px-3 py-1 rounded-full font-semibold mt-1 ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
