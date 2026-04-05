import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Eye, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboardStore } from './store';
import { Sidebar, Navbar } from './components';
import { Dashboard, Transactions, Analytics, Bills, Goals, Recurring } from './pages';

function App() {
  const { userRole, darkMode, toggleDarkMode, loadFromLocalStorage, setUserRole } = useDashboardStore();

  // Load from localStorage on mount
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // Update HTML class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 transition-colors overflow-hidden">
      {/* Sidebar - Fixed position on desktop, bottom navigation on mobile */}
      <Sidebar
        userRole={userRole}
        darkMode={darkMode}
        onRoleChange={setUserRole}
      />

      {/* Main Content Area - Flex column with margin for fixed sidebar on desktop */}
      <div className="flex flex-col h-screen lg:ml-64 overflow-hidden">
        {/* Navbar - Sticky at Top */}
        <div className="sticky top-0 z-40">
          <Navbar
            darkMode={darkMode}
            onDarkModeToggle={toggleDarkMode}
          />
        </div>

        {/* Mobile Role Switcher - Only visible on mobile below navbar */}
        <div className="lg:hidden border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 transition-colors">
          <div className="flex gap-2 p-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUserRole('viewer')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                userRole === 'viewer'
                  ? `${
                      darkMode
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-blue-500 text-white shadow-lg'
                    }`
                  : `${
                      darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`
              }`}
            >
              <Eye size={18} />
              <span>Viewer</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUserRole('admin')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                userRole === 'admin'
                  ? `${
                      darkMode
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-purple-500 text-white shadow-lg'
                    }`
                  : `${
                      darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`
              }`}
            >
              <Lock size={18} />
              <span>Admin</span>
            </motion.button>
          </div>
        </div>

        {/* Page Content - Scrollable with padding for mobile bottom nav */}
        <main className="flex-1 overflow-y-auto w-full pb-20 lg:pb-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/recurring" element={<Recurring />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
