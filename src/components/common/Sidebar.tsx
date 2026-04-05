import React from 'react';
import { Home, CreditCard, BarChart3, Eye, Lock, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
  darkMode: boolean;
  onRoleChange?: (role: 'viewer' | 'admin') => void;
  onDarkModeToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userRole, darkMode, onRoleChange, onDarkModeToggle }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: CreditCard, label: 'Transactions', path: '/transactions' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  ];

  return (
    <>
      {/* Desktop Sidebar - Fixed Position */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-0">
        <aside
          className={`${
            darkMode
              ? 'bg-gradient-to-b from-gray-800 to-gray-900'
              : 'bg-gradient-to-b from-gray-100 to-gray-200'
          } h-screen w-64 shadow-2xl overflow-y-auto`}
        >
          <div className="p-6">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                darkMode ? 'bg-gray-700' : 'bg-white'
              }`}>
                <span className={`text-xl font-bold ${
                  darkMode
                    ? 'text-purple-400'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'
                }`}>₹</span>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Zorvyn</h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Finance Manager
                </p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2 mb-8">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive(item.path)
                        ? darkMode
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-purple-500 text-white shadow-lg'
                        : darkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Section */}
            <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} pt-4 mt-auto`}>
              <div className={`rounded-xl p-4 ${
                darkMode
                  ? 'bg-gray-700'
                  : 'bg-gray-300'
              }`}>
                <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Switch Role
                </p>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onRoleChange?.('viewer')}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-all ${
                      userRole === 'viewer'
                        ? darkMode
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-blue-500 text-white shadow-lg'
                        : darkMode
                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Eye size={16} />
                    Viewer
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onRoleChange?.('admin')}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-all ${
                      userRole === 'admin'
                        ? darkMode
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-purple-500 text-white shadow-lg'
                        : darkMode
                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Lock size={16} />
                    Admin
                  </motion.button>
                </div>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Current: <span className="font-bold">{userRole === 'admin' ? 'Admin' : 'Viewer'}</span>
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Sidebar - Animated */}
      <div className="lg:hidden">
        {/* Mobile Overlay */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}

        {/* Mobile Sidebar - Fixed with animation */}
        <motion.aside
          initial={{ x: -320 }}
          animate={{ x: isOpen ? 0 : -320 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
          className={`${
            darkMode
              ? 'bg-gradient-to-b from-gray-800 to-gray-900'
              : 'bg-gradient-to-b from-gray-100 to-gray-200'
          } fixed left-0 top-0 h-screen w-64 shadow-2xl z-50 overflow-y-auto`}
        >
          <div className="p-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                darkMode ? 'bg-gray-700' : 'bg-white'
              }`}>
                <span className={`text-xl font-bold ${
                  darkMode
                    ? 'text-purple-400'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'
                }`}>₹</span>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>FinFlow</h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Finance Manager
                </p>
              </div>
            </motion.div>

            {/* Navigation Menu */}
            <nav className="space-y-2 mb-8">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive(item.path)
                        ? darkMode
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-purple-500 text-white shadow-lg'
                        : darkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Section */}
            <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} pt-4 mt-auto`}>
              <div className={`rounded-xl p-4 mb-4 ${
                darkMode
                  ? 'bg-gray-700'
                  : 'bg-gray-300'
              }`}>
                <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Switch Role
                </p>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onRoleChange?.('viewer');
                      onClose();
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-all ${
                      userRole === 'viewer'
                        ? darkMode
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-blue-500 text-white shadow-lg'
                        : darkMode
                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Eye size={16} />
                    Viewer
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onRoleChange?.('admin');
                      onClose();
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-all ${
                      userRole === 'admin'
                        ? darkMode
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-purple-500 text-white shadow-lg'
                        : darkMode
                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Lock size={16} />
                    Admin
                  </motion.button>
                </div>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Current: <span className="font-bold">{userRole === 'admin' ? 'Admin' : 'Viewer'}</span>
                </p>
              </div>

              {/* Dark Mode Toggle - Mobile only */}
              <div className={`lg:hidden rounded-xl p-4 ${
                darkMode
                  ? 'bg-gray-700'
                  : 'bg-gray-300'
              }`}>
                <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Theme
                </p>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => !darkMode && onDarkModeToggle?.()}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-all ${
                      !darkMode
                        ? 'bg-orange-500 text-white shadow-lg'
                        : darkMode
                        ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Sun size={16} />
                    Light
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => darkMode && onDarkModeToggle?.()}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-all ${
                      darkMode
                        ? 'bg-gray-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Moon size={16} />
                    Dark
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </>
  );
};
