import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '../store';
import {
  BalanceTrendChart,
  SpendingBreakdownChart,
  InsightsSection,
} from '../components';
import {
  calculateDashboardMetrics,
  getSpendingByCategory,
  getMonthlyBalance,
} from '../utils';

export const Analytics: React.FC = () => {
  const { transactions, darkMode } = useDashboardStore();

  const metrics = useMemo(() => calculateDashboardMetrics(transactions), [transactions]);
  const monthlyData = useMemo(() => getMonthlyBalance(transactions), [transactions]);
  const spendingByCategory = useMemo(() => getSpendingByCategory(transactions), [transactions]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen py-8 transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h2 className={`text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Analytics</h2>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'} mt-1`}>
            Deep dive into your financial data and trends
          </p>
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Balance Trend */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 p-6 shadow-sm`}>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'} mb-4`}>Balance Trend</h3>
            <BalanceTrendChart data={monthlyData} darkMode={darkMode} />
          </div>

          {/* Spending Breakdown */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 p-6 shadow-sm`}>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'} mb-4`}>Spending by Category</h3>
            <SpendingBreakdownChart data={spendingByCategory} darkMode={darkMode} />
          </div>
        </motion.div>

        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'} mb-6`}>Financial Insights</h3>
          <InsightsSection metrics={metrics} />
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 p-4 sm:p-6 shadow-sm`}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} text-xs sm:text-sm font-medium`}>Average Income</p>
            <p className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'} mt-2`}>
              ${Math.round(metrics.totalIncome / Math.max(1, transactions.filter(t => t.type === 'income').length))}
            </p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 p-4 sm:p-6 shadow-sm`}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} text-xs sm:text-sm font-medium`}>Average Expense</p>
            <p className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'} mt-2`}>
              ${Math.round(metrics.totalExpenses / Math.max(1, transactions.filter(t => t.type === 'expense').length))}
            </p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 p-4 sm:p-6 shadow-sm`}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} text-xs sm:text-sm font-medium`}>Saving Rate</p>
            <p className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} mt-2`}>
              {metrics.totalIncome > 0 ? Math.round(((metrics.totalIncome - metrics.totalExpenses) / metrics.totalIncome) * 100) : 0}%
            </p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 p-4 sm:p-6 shadow-sm`}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} text-xs sm:text-sm font-medium`}>Total Transactions</p>
            <p className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'} mt-2`}>
              {transactions.length}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
