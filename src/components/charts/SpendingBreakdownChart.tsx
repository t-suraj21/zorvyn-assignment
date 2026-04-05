import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { CategorySpending } from '../../types';
import { formatCurrency } from '../../utils';

interface SpendingBreakdownChartProps {
  data: CategorySpending[];
  darkMode?: boolean;
}

const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e',
  '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6',
  '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
];

export const SpendingBreakdownChart: React.FC<SpendingBreakdownChartProps> = ({ data, darkMode = false }) => {
  if (data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
        No spending data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          dataKey="amount"
          nameKey="category"
          outerRadius={100}
          label={{
            fill: darkMode ? '#f3f4f6' : '#1f2937',
            fontSize: 12,
            formatter: (dataEntry: any) => `${dataEntry.payload.category} ${dataEntry.payload.percentage}%`
          }}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: any) => formatCurrency(value)}
          contentStyle={{
            backgroundColor: darkMode ? '#1f2937' : '#fff',
            border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
            borderRadius: '8px',
            color: darkMode ? '#f3f4f6' : '#1f2937',
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
