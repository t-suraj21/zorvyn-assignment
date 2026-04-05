import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Download } from 'lucide-react';
import { useDashboardStore } from '../store';
import {
  TransactionList,
  FilterBar,
  TransactionModal,
} from '../components';
import {
  filterTransactions,
  formatCurrency,
} from '../utils';
import type { Transaction } from '../types';

export const Transactions: React.FC = () => {
  const {
    transactions,
    userRole,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    resetFilters,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    darkMode,
  } = useDashboardStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, searchTerm, filterType, filterCategory),
    [transactions, searchTerm, filterType, filterCategory]
  );

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

  const handleExport = () => {
    const csvContent = [
      ['Date', 'Type', 'Category', 'Amount', 'Description'],
      ...filteredTransactions.map(t => [
        t.date,
        t.type,
        t.category,
        formatCurrency(t.amount),
        t.description,
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

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
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>All Transactions</h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} mt-1`}>
              View and manage all your transactions
            </p>
          </div>
          <div className="flex gap-4">
            {userRole === 'admin' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditingTransaction(undefined);
                  setModalOpen(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
              >
                <Plus size={20} />
                Add Transaction
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
            >
              <Download size={20} />
              Export CSV
            </motion.button>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 p-6 shadow-sm`}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} text-sm font-medium`}>Total Transactions</p>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'} mt-2`}>{filteredTransactions.length}</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 p-6 shadow-sm`}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} text-sm font-medium`}>Total Income</p>
            <p className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'} mt-2`}>
              {formatCurrency(filteredTransactions
                .filter(t => t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0))}
            </p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 p-6 shadow-sm`}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} text-sm font-medium`}>Total Expenses</p>
            <p className={`text-2xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'} mt-2`}>
              {formatCurrency(filteredTransactions
                .filter(t => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0))}
            </p>
          </div>
        </motion.div>

        {/* Filter and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-6"
        >
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterType={filterType}
            onTypeChange={setFilterType}
            filterCategory={filterCategory}
            onCategoryChange={setFilterCategory}
            onReset={resetFilters}
            darkMode={darkMode}
          />
        </motion.div>

        {/* Transaction List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 shadow-sm overflow-hidden`}
        >
          <TransactionList
            transactions={filteredTransactions}
            userRole={userRole}
            onDelete={deleteTransaction}
            onEdit={handleEditClick}
            darkMode={darkMode}
          />
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
    </motion.div>
  );
};
