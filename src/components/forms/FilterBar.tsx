import React from 'react';
import { Search, X } from 'lucide-react';
import type { Category, TransactionType } from '../../types';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterType: TransactionType | 'all';
  onTypeChange: (type: TransactionType | 'all') => void;
  filterCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  onReset: () => void;
  darkMode: boolean;
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
  darkMode,
}) => {
  const isFiltered = searchTerm !== '' || filterType !== 'all' || filterCategory !== 'all';

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border-2 p-6 shadow-sm`}>
      {/* Search Bar */}
      <div className="mb-4">
        <label htmlFor="search" className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Search Transactions
        </label>
        <div className="relative">
          <Search className={`absolute left-3 top-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
          <input
            id="search"
            type="text"
            placeholder="Search by description or category..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-200 bg-white text-gray-900 placeholder-gray-500'} rounded-lg focus:border-blue-500 focus:outline-none transition-colors`}
          />
        </div>
      </div>

      {/* Type Filter */}
      <div className="mb-4">
        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
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
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Category
        </label>
        <select
          value={filterCategory}
          onChange={(e) => onCategoryChange(e.target.value as Category | 'all')}
          className={`w-full px-4 py-2 border-2 rounded-lg focus:border-blue-500 focus:outline-none transition-colors ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-white text-gray-900'}`}
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
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
            darkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <X size={18} />
          Clear Filters
        </button>
      )}
    </div>
  );
};
