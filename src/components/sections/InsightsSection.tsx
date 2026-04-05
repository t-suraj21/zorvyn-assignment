import React from 'react';
import type { DashboardMetrics } from '../../types';
import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';

interface InsightsSectionProps {
  metrics: DashboardMetrics;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Highest Spending Category */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-700 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Top Spending Category</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.highestCategory || 'N/A'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Monitor your #1 expense</p>
          </div>
          <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
            <Target size={24} />
          </div>
        </div>
      </div>

      {/* Health Score */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-green-200 dark:border-green-700 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Financial Health Score</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.healthScore}%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {metrics.healthScore >= 70 ? '✓ Excellent' : metrics.healthScore >= 40 ? '◐ Good' : '✗ Needs Attention'}
            </p>
          </div>
          <div className="p-3 rounded-full bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400">
            <Zap size={24} />
          </div>
        </div>
      </div>

      {/* Income Trend */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-700 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Income Trend</p>
            <p
              className={`text-2xl font-bold ${
                metrics.incomeGrowth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {metrics.incomeGrowth > 0 ? '+' : ''}{metrics.incomeGrowth.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">vs. last month</p>
          </div>
          <div className={`p-3 rounded-full ${metrics.incomeGrowth >= 0 ? 'bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-400'}`}>
            {metrics.incomeGrowth >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          </div>
        </div>
      </div>

      {/* Expense Trend */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-orange-200 dark:border-orange-700 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Expense Trend</p>
            <p
              className={`text-2xl font-bold ${
                metrics.expenseGrowth <= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {metrics.expenseGrowth > 0 ? '+' : ''}{metrics.expenseGrowth.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">vs. last month</p>
          </div>
          <div className={`p-3 rounded-full ${metrics.expenseGrowth <= 0 ? 'bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-400'}`}>
            {metrics.expenseGrowth <= 0 ? <TrendingDown size={24} /> : <TrendingUp size={24} />}
          </div>
        </div>
      </div>
    </div>
  );
};
