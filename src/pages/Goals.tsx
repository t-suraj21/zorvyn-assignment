import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Target, TrendingUp, Calendar, Zap } from 'lucide-react';
import { useDashboardStore } from '../store';
import { formatCurrency } from '../utils';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

export const Goals: React.FC = () => {
  const { darkMode } = useDashboardStore();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 50000,
      currentAmount: 35000,
      dueDate: '2026-12-31',
      category: 'Savings',
      priority: 'high',
    },
    {
      id: '2',
      name: 'Vacation',
      targetAmount: 100000,
      currentAmount: 45000,
      dueDate: '2026-08-31',
      category: 'Travel',
      priority: 'medium',
    },
    {
      id: '3',
      name: 'New Laptop',
      targetAmount: 120000,
      currentAmount: 80000,
      dueDate: '2026-06-30',
      category: 'Technology',
      priority: 'medium',
    },
    {
      id: '4',
      name: 'Home Renovation',
      targetAmount: 500000,
      currentAmount: 150000,
      dueDate: '2027-12-31',
      category: 'Home',
      priority: 'low',
    },
  ]);

  const stats = useMemo(() => {
    const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    const averageProgress = goals.length > 0 ? (totalSaved / totalTarget) * 100 : 0;
    const highPriorityGoals = goals.filter(g => g.priority === 'high').length;

    return { totalTarget, totalSaved, averageProgress, highPriorityGoals };
  }, [goals]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getProgress = (goal: Goal) => (goal.currentAmount / goal.targetAmount) * 100;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Page Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Financial Goals</h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Track and achieve your financial goals
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.div
            variants={itemVariants}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Target
                </p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(stats.totalTarget)}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <Target size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Saved
                </p>
                <p className="text-2xl font-bold mt-1 text-green-600">
                  {formatCurrency(stats.totalSaved)}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <TrendingUp size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Average Progress
                </p>
                <p className="text-2xl font-bold mt-1 text-purple-600">
                  {stats.averageProgress.toFixed(1)}%
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <Zap size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  High Priority
                </p>
                <p className="text-2xl font-bold mt-1 text-orange-600">
                  {stats.highPriorityGoals}
                </p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
                <Target size={24} className="text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Goals List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Goals</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Goal
            </motion.button>
          </div>

          {goals.map((goal) => {
            const progress = getProgress(goal);
            return (
              <motion.div
                key={goal.id}
                variants={itemVariants}
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-2xl shadow-lg p-6 transition-colors`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{goal.name}</h3>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${getPriorityColor(
                          goal.priority
                        )}`}
                      >
                        {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                      </span>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {goal.category}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setGoals(goals.filter(g => g.id !== goal.id))}
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </motion.button>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </span>
                    <span className="text-sm font-bold text-purple-600">{progress.toFixed(1)}%</span>
                  </div>
                  <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="h-full rounded-full bg-linear-to-r from-purple-500 to-blue-500"
                    />
                  </div>
                </div>

                {/* Goal Details */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-300 dark:border-gray-700">
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Due: {goal.dueDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-green-600" />
                      <span className="text-sm font-semibold text-green-600">
                        Remaining: {formatCurrency(goal.targetAmount - goal.currentAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
