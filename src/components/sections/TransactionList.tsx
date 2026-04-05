import React, { useState } from 'react';
import { formatCurrency, formatDate } from '../../utils';
import type { Transaction } from '../../types';
import { Trash2, Edit2 } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  userRole: 'viewer' | 'admin';
  onDelete?: (id: string) => void;
  onEdit?: (transaction: Transaction) => void;
  darkMode: boolean;
}

type SortField = 'date' | 'amount' | 'category';
type SortDirection = 'asc' | 'desc';

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  userRole,
  onDelete,
  onEdit,
  darkMode,
}) => {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (sortField === 'date') {
      aValue = new Date(a.date).getTime();
      bValue = new Date(b.date).getTime();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (transactions.length === 0) {
    return (
      <div className={`text-center py-12 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
        <p className="text-lg">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-b-2`}>
          <tr>
            <th className={`px-6 py-3 text-left text-sm font-semibold cursor-pointer ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={() => handleSort('date')}>
              Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Description
            </th>
            <th className={`px-6 py-3 text-left text-sm font-semibold cursor-pointer ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={() => handleSort('category')}>
              Category {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Type
            </th>
            <th className={`px-6 py-3 text-right text-sm font-semibold cursor-pointer ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
              onClick={() => handleSort('amount')}>
              Amount {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            {userRole === 'admin' && <th className={`px-6 py-3 text-center text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction, index) => (
            <tr
              key={transaction.id}
              className={`border-b transition-colors ${
                darkMode
                  ? `border-gray-600 hover:bg-gray-700 ${
                      index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'
                    }`
                  : `border-gray-200 hover:bg-gray-100 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`
              }`}
            >
              <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {formatDate(transaction.date)}
              </td>
              <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {transaction.description}
              </td>
              <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  {transaction.category}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    transaction.type === 'income'
                      ? darkMode
                        ? 'bg-green-900 text-green-400'
                        : 'bg-green-100 text-green-700'
                      : darkMode
                      ? 'bg-red-900 text-red-400'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {transaction.type === 'income' ? '+ Income' : '- Expense'}
                </span>
              </td>
              <td className={`px-6 py-4 text-sm font-semibold text-right ${
                transaction.type === 'income'
                  ? darkMode
                    ? 'text-green-400'
                    : 'text-green-600'
                  : darkMode
                  ? 'text-red-400'
                  : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </td>
              {userRole === 'admin' && (
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit?.(transaction)}
                      className={`p-2 rounded-lg transition-colors ${
                        darkMode
                          ? 'text-blue-400 hover:bg-blue-900'
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                      title="Edit transaction"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete?.(transaction.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        darkMode
                          ? 'text-red-400 hover:bg-red-900'
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      title="Delete transaction"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
