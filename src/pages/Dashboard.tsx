import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, DollarSign, TrendingUp, CreditCard, PiggyBank } from 'lucide-react';
import { useDashboardStore } from '../store';
import {
  DashboardCard,
  ProfileCard,
  BalanceTrendChart,
  SpendingBreakdownChart,
  InsightsSection,
  TransactionCard,
  TransactionModal,
} from '../components';
import {
  calculateDashboardMetrics,
  getSpendingByCategory,
  getMonthlyBalance,
  formatCurrency,
} from '../utils';
import type { Transaction } from '../types';

export const Dashboard: React.FC = () => {
  const {
    transactions,
    userRole,
    darkMode,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  } = useDashboardStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();

  // Calculate metrics
  const metrics = useMemo(() => calculateDashboardMetrics(transactions), [transactions]);
  const monthlyData = useMemo(() => getMonthlyBalance(transactions), [transactions]);
  const spendingByCategory = useMemo(() => getSpendingByCategory(transactions), [transactions]);
  const recentTransactions = useMemo(() => transactions.slice(-5).reverse(), [transactions]);



  const handleAddTransaction = (data: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data);
      setEditingTransaction(undefined);
    } else {
      const newTransaction: Transaction = {
        ...data,
        id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      addTransaction(newTransaction);
    }
    setModalOpen(false);
  };

  const handleEditClick = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTransaction(undefined);
  };

  return (
    <main className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen transition-colors`}>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-12 flex items-center justify-between"
        >
          <div>
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Dashboard
            </h1>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Welcome back! Here's your financial overview.
            </p>
          </div>
          {userRole === 'admin' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingTransaction(undefined);
                setModalOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg font-medium"
            >
              <Plus size={20} />
              Add Transaction
            </motion.button>
          )}
        </motion.div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardCard
            title="Total Balance"
            value={formatCurrency(metrics.totalBalance)}
            icon={DollarSign}
            gradient="bg-gradient-to-br from-blue-500 to-blue-600"
            trend={5}
            trendLabel="this month"
            index={0}
          />
          <DashboardCard
            title="Total Income"
            value={formatCurrency(metrics.totalIncome)}
            icon={TrendingUp}
            gradient="bg-gradient-to-br from-green-500 to-green-600"
            trend={metrics.incomeGrowth}
            trendLabel="growth"
            index={1}
          />
          <DashboardCard
            title="Total Expenses"
            value={formatCurrency(metrics.totalExpenses)}
            icon={CreditCard}
            gradient="bg-gradient-to-br from-red-500 to-red-600"
            trend={Math.abs(metrics.expenseGrowth)}
            trendLabel="change"
            index={2}
          />
          <DashboardCard
            title="Savings Rate"
            value={metrics.totalIncome > 0 ? 
              `${Math.round(((metrics.totalIncome - metrics.totalExpenses) / metrics.totalIncome) * 100)}%`
              : '0%'
            }
            icon={PiggyBank}
            gradient="bg-gradient-to-br from-purple-500 to-purple-600"
            index={3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard darkMode={darkMode} />
          </div>

          {/* Middle Column: Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Balance Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border rounded-2xl p-6 shadow-lg`}
            >
              <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Balance Trend
              </h3>
              <BalanceTrendChart data={monthlyData} darkMode={darkMode} />
            </motion.div>

            {/* Spending Breakdown Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border rounded-2xl p-6 shadow-lg`}
            >
              <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Spending by Category
              </h3>
              <SpendingBreakdownChart data={spendingByCategory} darkMode={darkMode} />
            </motion.div>
          </div>
        </div>

        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Financial Insights
          </h2>
          <InsightsSection metrics={metrics} />
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Transactions
            </h2>
            {recentTransactions.length > 0 && (
              <a
                href="/transactions"
                className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline"
              >
                View All →
              </a>
            )}
          </div>
          <div className="grid gap-4">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction, index) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  userRole={userRole}
                  onDelete={deleteTransaction}
                  onEdit={handleEditClick}
                  darkMode={darkMode}
                  index={index}
                />
              ))
            ) : (
              <div
                className={`text-center py-12 rounded-xl ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  No transactions yet. {userRole === 'admin' && 'Add one to get started!'}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTransaction}
        transaction={editingTransaction}
        isEdit={!!editingTransaction}
      />
    </main>
  );
};
