import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { MonthlyData } from '../types';
import { formatCurrency } from '../utils/calculations';

interface BalanceTrendChartProps {
  data: MonthlyData[];
  darkMode?: boolean;
}

export const BalanceTrendChart: React.FC<BalanceTrendChartProps> = ({ data, darkMode = false }) => {
  if (data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
        <XAxis
          dataKey="month"
          stroke={darkMode ? '#9ca3af' : '#9ca3af'}
          style={{ fontSize: '12px', color: darkMode ? '#d1d5db' : '#6b7280' }}
        />
        <YAxis
          stroke={darkMode ? '#9ca3af' : '#9ca3af'}
          style={{ fontSize: '12px', color: darkMode ? '#d1d5db' : '#6b7280' }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(value: any) => formatCurrency(value)}
          contentStyle={{
            backgroundColor: darkMode ? '#1f2937' : '#fff',
            border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
            borderRadius: '8px',
            color: darkMode ? '#f3f4f6' : '#1f2937',
          }}
        />
        <Line
          type="monotone"
          dataKey="balance"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ fill: '#3b82f6', r: 5 }}
          activeDot={{ r: 7 }}
          name="Balance"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
