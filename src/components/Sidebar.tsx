import React from 'react';
import { Home, CreditCard, BarChart3, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
  darkMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userRole, darkMode }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: CreditCard, label: 'Transactions', path: '/transactions' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Desktop Sidebar - Fixed Position */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-0">
        <aside
          className={`${
            darkMode
              ? 'bg-gradient-to-b from-gray-800 to-gray-900'
              : 'bg-gradient-to-b from-purple-600 to-purple-700'
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
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>FinFlow</h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-purple-100'}`}>
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
                          : 'bg-white bg-opacity-20 text-white shadow-lg'
                        : darkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-purple-100 hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Section */}
            <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-purple-500'} pt-4 mt-auto`}>
              <div className={`rounded-xl p-4 mb-4 ${
                darkMode
                  ? 'bg-gray-700'
                  : 'bg-white bg-opacity-10'
              }`}>
                <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-purple-100'}`}>
                  Logged in as
                </p>
                <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-white'}`}>
                  {userRole === 'admin' ? 'Admin' : 'Viewer'}
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-purple-200'}`}>
                  {userRole === 'admin' ? 'Full Access' : 'View Only'}
                </p>
              </div>

              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-purple-100 hover:bg-white hover:bg-opacity-10'
              }`}>
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
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
              : 'bg-gradient-to-b from-purple-600 to-purple-700'
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
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>FinFlow</h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-purple-100'}`}>
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
                          : 'bg-white bg-opacity-20 text-white shadow-lg'
                        : darkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-purple-100 hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Section */}
            <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-purple-500'} pt-4 mt-auto`}>
              <div className={`rounded-xl p-4 mb-4 ${
                darkMode
                  ? 'bg-gray-700'
                  : 'bg-white bg-opacity-10'
              }`}>
                <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-purple-100'}`}>
                  Logged in as
                </p>
                <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-white'}`}>
                  {userRole === 'admin' ? 'Admin' : 'Viewer'}
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-purple-200'}`}>
                  {userRole === 'admin' ? 'Full Access' : 'View Only'}
                </p>
              </div>

              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-purple-100 hover:bg-white hover:bg-opacity-10'
              }`}>
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </motion.aside>
      </div>
    </>
  );
};
