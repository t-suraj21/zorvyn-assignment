import React from 'react';
import { Home, CreditCard, BarChart3, Eye, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  userRole: string;
  darkMode: boolean;
  onRoleChange?: (role: 'viewer' | 'admin') => void;
  onDarkModeToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ userRole, darkMode, onRoleChange }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Home, label: 'Home', path: '/', shortLabel: 'Home' },
    { icon: CreditCard, label: 'Transactions', path: '/transactions', shortLabel: 'Txns' },
    { icon: BarChart3, label: 'Bills', path: '/bills', shortLabel: 'Bills' },
    { icon: Eye, label: 'Goals', path: '/goals', shortLabel: 'Goals' },
    { icon: Lock, label: 'Recurring', path: '/recurring', shortLabel: 'Recurring' },
    { icon: CreditCard, label: 'Insights', path: '/analytics', shortLabel: 'Insights' },
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
          } h-screen w-64 shadow-2xl overflow-y-auto transition-colors duration-300`}
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

      {/* Mobile Bottom Navigation - Fixed at bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <nav
          className={`${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          } border-t transition-colors duration-300 backdrop-blur-xl bg-opacity-95`}
        >
          <div className="flex items-center justify-around h-20">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`flex flex-col items-center justify-center h-20 px-4 transition-all ${
                      active
                        ? darkMode
                          ? 'text-purple-400'
                          : 'text-purple-600'
                        : darkMode
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-600 hover:text-gray-700'
                    }`}
                  >
                    <Icon size={24} />
                    <span className="text-xs font-medium mt-1">{item.shortLabel}</span>
                    {active && (
                      <motion.div
                        layoutId="mobileNav"
                        className={`absolute bottom-0 w-12 h-1 rounded-t-lg ${
                          darkMode
                            ? 'bg-purple-400'
                            : 'bg-purple-600'
                        }`}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};
