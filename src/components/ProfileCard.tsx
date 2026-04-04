import React from 'react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  darkMode: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ darkMode }) => {
  const stats = [
    { label: 'Budget Used', value: 68, total: 100, color: 'from-purple-500 to-purple-600' },
    { label: 'Savings Rate', value: 32, total: 100, color: 'from-green-500 to-green-600' },
    { label: 'Expense Ratio', value: 45, total: 100, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className={`${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-2xl p-8 shadow-lg`}
    >
      <div className="text-center">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg"
        >
          SU
        </motion.div>

        {/* Name & Role */}
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Suraj Kumar
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
          Financial Manager
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              {/* Circular Progress */}
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={darkMode ? '#374151' : '#e5e7eb'}
                    strokeWidth="3"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    strokeWidth="3"
                    stroke={`url(#gradient-${index})`}
                    strokeDasharray={`${(stat.value / stat.total) * 282.7} ${282.7}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={stat.color.split(' ')[1]} />
                      <stop offset="100%" stopColor={stat.color.split(' ')[3]} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}%
                </div>
              </div>
              <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
