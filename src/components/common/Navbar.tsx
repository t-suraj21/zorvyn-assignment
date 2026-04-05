import React, { useState } from 'react';
import { Moon, Sun, Menu, X, Bell, Settings, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
  onMenuToggle: () => void;
  menuOpen: boolean;
  userName?: string;
  avatar?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onDarkModeToggle,
  onMenuToggle,
  menuOpen,
}) => {
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <nav
      className={`${
        darkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      } border-b sticky top-0 z-40 backdrop-blur-xl bg-opacity-80`}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Menu Toggle (mobile only) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuToggle}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              darkMode
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>

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

          {/* Right: Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications - Desktop only */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden lg:flex relative p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </motion.button>

            {/* Settings - Desktop only */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden lg:flex p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Settings size={20} />
            </motion.button>

            {/* Dark Mode Toggle - Desktop only */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDarkModeToggle}
              className={`hidden lg:flex p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* User Avatar - Visible on all screens */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center cursor-pointer text-white font-bold shadow-lg`}
            >
              SU
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
};
