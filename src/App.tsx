import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDashboardStore } from './store/dashboardStore';
import { Sidebar, Navbar } from './components';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Analytics } from './pages/Analytics';

function App() {
  const { userRole, darkMode, toggleDarkMode, loadFromLocalStorage } = useDashboardStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Sidebar - Fixed position on desktop, animated overlay on mobile */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole={userRole}
        darkMode={darkMode}
      />

      {/* Main Content Area - Flex column with margin for fixed sidebar on desktop */}
      <div className="flex flex-col h-screen lg:ml-64">
        {/* Navbar - Sticky at Top */}
        <div className="sticky top-0 z-40">
          <Navbar
            darkMode={darkMode}
            onDarkModeToggle={toggleDarkMode}
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            menuOpen={sidebarOpen}
          />
        </div>

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
