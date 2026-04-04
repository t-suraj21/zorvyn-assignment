import React from 'react';
import { Moon, Sun, Home, List, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  userRole: 'viewer' | 'admin';
  onRoleChange: (role: 'viewer' | 'admin') => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userRole,
  onRoleChange,
  darkMode,
  onDarkModeToggle,
}) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  return (
    <header className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm sticky top-0 z-50 w-full`}>
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Logo/Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">₹</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">Finance Dashboard</h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage your finances smartly
              </p>
            </div>
          </motion.div>

          {/* Navigation Menu */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all font-medium text-sm ${
                isActive('/')
                  ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                  : `${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              <Home size={16} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <Link
              to="/transactions"
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all font-medium text-sm ${
                isActive('/transactions')
                  ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                  : `${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              <List size={16} />
              <span className="hidden sm:inline">Transactions</span>
            </Link>
            <Link
              to="/analytics"
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all font-medium text-sm ${
                isActive('/analytics')
                  ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                  : `${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              <BarChart3 size={16} />
              <span className="hidden sm:inline">Analytics</span>
            </Link>
          </motion.nav>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            {/* Role Selector */}
            <div className={`flex gap-1 p-0.5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <button
                onClick={() => onRoleChange('viewer')}
                className={`px-3 py-1 rounded-md font-medium text-sm transition-all ${
                  userRole === 'viewer'
                    ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                    : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
                }`}
              >
                👁️ Viewer
              </button>
              <button
                onClick={() => onRoleChange('admin')}
                className={`px-3 py-1 rounded-md font-medium text-sm transition-all ${
                  userRole === 'admin'
                    ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                    : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
                }`}
              >
                🔐 Admin
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDarkModeToggle}
              className={`p-1.5 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
