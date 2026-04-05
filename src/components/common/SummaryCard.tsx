import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  icon: LucideIcon;
  title: string;
  amount: string;
  trend?: number;
  trendLabel?: string;
  color: 'green' | 'red' | 'blue' | 'purple';
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  icon: Icon,
  title,
  amount,
  trend,
  trendLabel,
  color,
}) => {
  const colorClasses = {
    green: 'bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400',
    red: 'bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-400',
    blue: 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    purple: 'bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
  };

  const borderClasses = {
    green: 'border-green-200 dark:border-green-700',
    red: 'border-red-200 dark:border-red-700',
    blue: 'border-blue-200 dark:border-blue-700',
    purple: 'border-purple-200 dark:border-purple-700',
  };

  const trendColor = trend !== undefined && trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';

  return (
    <div className={`p-6 rounded-lg border-2 ${borderClasses[color]} bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{amount}</p>
          {trend !== undefined && (
            <p className={`text-sm mt-3 ${trendColor}`}>
              {trend > 0 ? '+' : ''}{trend.toFixed(1)}% {trendLabel || 'from last month'}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};
