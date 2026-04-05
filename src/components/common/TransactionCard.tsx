import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit2 } from 'lucide-react';
import type { Transaction } from '../../types';

interface TransactionCardProps {
  transaction: Transaction;
  userRole: string;
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
  darkMode?: boolean;
  index?: number;
}

const categoryIcons: Record<string, string> = {
  'Groceries': '🛒',
  'Housing': '🏠',
  'Transportation': '🚗',
  'Entertainment': '🎬',
  'Utilities': '💡',
  'Healthcare': '🏥',
  'Salary': '💰',
  'Bonus': '🎁',
  'Freelance': '💻',
  'Investment': '📈',
  'Rent': '🏘️',
  'Food': '🍔',
  'Shopping': '🛍️',
};

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  userRole,
  onDelete,
  onEdit,
  darkMode = false,
  index = 0,
}) => {
  const isIncome = transaction.type === 'income';
  const icon = categoryIcons[transaction.category] || '💳';
  const amountColor = isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const amountSign = isIncome ? '+' : '-';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left: Icon & Info */}
        <div className="flex gap-3 flex-1 min-w-0">
          <div className="text-2xl flex-shrink-0">{icon}</div>
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {transaction.category}
            </h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
              {transaction.description}
            </p>
            <div className="flex gap-2 mt-2">
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  isIncome
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                }`}
              >
                {isIncome ? 'Income' : 'Expense'}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                {transaction.date}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Amount & Actions */}
        <div className="flex flex-col items-end gap-2">
          <p className={`text-lg font-bold ${amountColor}`}>
            {amountSign}${transaction.amount.toFixed(2)}
          </p>
          {userRole === 'admin' && (
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(transaction)}
                className={`p-1.5 rounded-lg transition-colors ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-blue-400'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
                }`}
                title="Edit"
              >
                <Edit2 size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(transaction.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-red-600'
                }`}
                title="Delete"
              >
                <Trash2 size={16} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
