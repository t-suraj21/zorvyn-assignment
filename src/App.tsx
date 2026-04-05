import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
            userRole={userRole}
            onRoleChange={setUserRole}
          />
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
