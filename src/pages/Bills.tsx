import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Calendar, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useDashboardStore } from '../store';
import { formatCurrency } from '../utils';

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  status: 'paid' | 'pending' | 'overdue';
  frequency: 'monthly' | 'quarterly' | 'yearly';
}

export const Bills: React.FC = () => {
  const { darkMode } = useDashboardStore();
  const [bills, setBills] = useState<Bill[]>([
    {
      id: '1',
      name: 'Electricity Bill',
      amount: 2500,
      dueDate: '2026-04-10',
      category: 'Utilities',
      status: 'pending',
      frequency: 'monthly',
    },
    {
      id: '2',
      name: 'Internet Bill',
      amount: 1500,
      dueDate: '2026-04-05',
      category: 'Utilities',
      status: 'overdue',
      frequency: 'monthly',
    },
    {
      id: '3',
      name: 'Insurance',
      amount: 5000,
      dueDate: '2026-04-20',
      category: 'Insurance',
      status: 'paid',
      frequency: 'monthly',
    },
    {
      id: '4',
      name: 'Gym Membership',
      amount: 1000,
      dueDate: '2026-04-15',
      category: 'Health',
      status: 'pending',
      frequency: 'monthly',
    },
  ]);

  const stats = useMemo(() => {
    const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
    const paidBills = bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0);
    const pendingBills = bills.filter(b => b.status === 'pending').reduce((sum, b) => sum + b.amount, 0);
    const overdueBills = bills.filter(b => b.status === 'overdue').reduce((sum, b) => sum + b.amount, 0);

    return { totalBills, paidBills, pendingBills, overdueBills };
  }, [bills]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-500 bg-green-100 dark:bg-green-900';
      case 'pending':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900';
      case 'overdue':
        return 'text-red-500 bg-red-100 dark:bg-red-900';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle size={16} />;
      case 'overdue':
        return <AlertCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Page Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Bills</h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your bills and payments
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
                  Total Bills
                </p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(stats.totalBills)}
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <DollarSign size={24} className="text-purple-600 dark:text-purple-400" />
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
                  Paid Bills
                </p>
                <p className="text-2xl font-bold mt-1 text-green-600">
                  {formatCurrency(stats.paidBills)}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
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
                  Pending
                </p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">
                  {formatCurrency(stats.pendingBills)}
                </p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                <Clock size={24} className="text-yellow-600 dark:text-yellow-400" />
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
                  Overdue
                </p>
                <p className="text-2xl font-bold mt-1 text-red-600">
                  {formatCurrency(stats.overdueBills)}
                </p>
              </div>
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                <AlertCircle size={24} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bills List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-2xl shadow-lg p-6 transition-colors`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Upcoming Bills</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Bill
            </motion.button>
          </div>

          <div className="space-y-3">
            {bills.map((bill) => (
              <motion.div
                key={bill.id}
                variants={itemVariants}
                className={`flex items-center justify-between p-4 rounded-xl ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                } transition-colors cursor-pointer`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${getStatusColor(bill.status)}`}>
                      {getStatusIcon(bill.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{bill.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {bill.category} • {bill.frequency}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right pr-4">
                  <p className="font-bold text-lg">{formatCurrency(bill.amount)}</p>
                  <p className={`text-sm flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Calendar size={14} />
                    {bill.dueDate}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setBills(bills.filter(b => b.id !== bill.id))}
                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-500' : 'hover:bg-gray-200'} transition-colors`}
                >
                  <Trash2 size={18} className="text-red-600" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
