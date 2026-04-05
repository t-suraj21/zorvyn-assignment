import React, { useState } from 'react';
import { Moon, Sun, Bell, Search, ChevronDown, Eye, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
  userRole: 'viewer' | 'admin';
  onRoleChange: (role: 'viewer' | 'admin') => void;
  onMenuToggle?: () => void;
  menuOpen?: boolean;
  userName?: string;
  avatar?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onDarkModeToggle,
  userRole,
  onRoleChange,
}) => {
  const [searchFocus, setSearchFocus] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  return (
    <nav
      className={`${
        darkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      } border-b sticky top-0 z-40 backdrop-blur-xl bg-opacity-95 transition-colors duration-300`}
    >
      {/* Mobile Layout - Simple Logo and Controls */}
      <div className="lg:hidden px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo (Left) */}
          <div className="flex items-center gap-2 shrink-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              darkMode ? 'bg-gray-700' : 'bg-purple-100'
            }`}>
              <span className={`text-xs font-bold ${
                darkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>₹</span>
            </div>
            <h1 className={`text-base font-bold whitespace-nowrap ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Zorvyn
            </h1>
          </div>

          {/* Controls (Right) */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </motion.button>

            {/* Currency Selector */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                darkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              INR
              <ChevronDown size={14} />
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDarkModeToggle}
              className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                  : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            {/* Role Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRoleOpen(!roleOpen)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {userRole === 'admin' ? (
                  <Lock size={14} />
                ) : (
                  <Eye size={14} />
                )}
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                <ChevronDown size={14} className={`transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Role Dropdown Menu */}
              {roleOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`absolute right-0 mt-2 w-40 rounded-lg shadow-xl border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => {
                      onRoleChange('viewer');
                      setRoleOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 transition-colors ${
                      userRole === 'viewer'
                        ? darkMode
                          ? 'bg-gray-600 text-white'
                          : 'bg-purple-100 text-purple-700'
                        : darkMode
                        ? 'hover:bg-gray-600 text-gray-300'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Eye size={14} />
                    Viewer
                  </button>
                  <button
                    onClick={() => {
                      onRoleChange('admin');
                      setRoleOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 transition-colors border-t ${
                      userRole === 'admin'
                        ? darkMode
                          ? 'bg-gray-600 text-white border-gray-600'
                          : 'bg-purple-100 text-purple-700 border-gray-200'
                        : darkMode
                        ? 'hover:bg-gray-600 text-gray-300 border-gray-600'
                        : 'hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    <Lock size={14} />
                    Admin
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block px-8 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              darkMode ? 'bg-gray-700' : 'bg-purple-100'
            }`}>
              <span className={`text-xs font-bold ${
                darkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>₹</span>
            </div>
            <h1 className={`text-lg font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Zorvyn
            </h1>
          </div>

          {/* Center: Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex-1 max-w-md flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
              searchFocus
                ? `${darkMode ? 'bg-gray-700' : 'bg-gray-50'} ring-2 ring-purple-500`
                : `${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`
            }`}
          >
            <Search size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
            <input
              type="text"
              placeholder="Search transactions..."
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              className={`flex-1 bg-transparent outline-none text-sm ${
                darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
              }`}
            />
          </motion.div>

          {/* Right: Icons & Controls */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </motion.button>

            {/* Currency Selector */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                darkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              INR
              <ChevronDown size={16} />
            </motion.button>

            {/* Export Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Export
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDarkModeToggle}
              className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                  : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
              }`}
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Role Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRoleOpen(!roleOpen)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {userRole === 'admin' ? (
                  <Lock size={16} />
                ) : (
                  <Eye size={16} />
                )}
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                <ChevronDown size={16} className={`transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Role Dropdown Menu */}
              {roleOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => {
                      onRoleChange('viewer');
                      setRoleOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm flex items-center gap-2 transition-colors ${
                      userRole === 'viewer'
                        ? darkMode
                          ? 'bg-gray-600 text-white'
                          : 'bg-purple-100 text-purple-700'
                        : darkMode
                        ? 'hover:bg-gray-600 text-gray-300'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Eye size={16} />
                    Viewer Mode
                  </button>
                  <button
                    onClick={() => {
                      onRoleChange('admin');
                      setRoleOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm flex items-center gap-2 transition-colors border-t ${
                      userRole === 'admin'
                        ? darkMode
                          ? 'bg-gray-600 text-white border-gray-600'
                          : 'bg-purple-100 text-purple-700 border-gray-200'
                        : darkMode
                        ? 'hover:bg-gray-600 text-gray-300 border-gray-600'
                        : 'hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    <Lock size={16} />
                    Admin Mode
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
