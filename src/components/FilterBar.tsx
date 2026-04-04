import React from 'react';
import { Search, X } from 'lucide-react';
import type { Category, TransactionType } from '../types';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterType: TransactionType | 'all';
  onTypeChange: (type: TransactionType | 'all') => void;
  filterCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  onReset: () => void;
}

const categories: (Category | 'all')[] = [
  'all',
  'Salary',
  'Freelance',
  'Food',
  'Rent',
  'Utilities',
  'Entertainment',
  'Shopping',
  'Healthcare',
  'Transport',
  'Education',
  'Other',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  filterType,
  onTypeChange,
  filterCategory,
  onCategoryChange,
  onReset,
}) => {
  const isFiltered = searchTerm !== '' || filterType !== 'all' || filterCategory !== 'all';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      {/* Search Bar */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Search Transactions
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
          <input
            id="search"
            type="text"
            placeholder="Search by description or category..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Type Filter */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Type
        </label>
        <div className="flex gap-2">
          {['all', 'income', 'expense'].map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type as TransactionType | 'all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterType === type
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <select
          value={filterCategory}
          onChange={(e) => onCategoryChange(e.target.value as Category | 'all')}
          className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      {isFiltered && (
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          <X size={18} />
          Clear Filters
        </button>
      )}
    </div>
  );
};
