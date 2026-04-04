import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  gradient: string;
  trend?: number;
  trendLabel?: string;
  index?: number;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  gradient,
  trend,
  trendLabel,
  index = 0,
}) => {
  const isTrendPositive = trend && trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
      className={`${gradient} rounded-2xl p-6 text-white shadow-lg cursor-pointer overflow-hidden relative group`}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium opacity-80">{title}</p>
            <h3 className="text-3xl font-bold mt-1">{value}</h3>
          </div>
          <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
            <Icon size={24} />
          </div>
        </div>

        {/* Trend */}
        {trend !== undefined && (
          <div className="flex items-center gap-2 text-sm opacity-90">
            {isTrendPositive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span>
              {isTrendPositive ? '+' : ''}{trend}% {trendLabel}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
