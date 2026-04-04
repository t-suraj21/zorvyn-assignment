# Finance Dashboard UI

A modern, responsive, and feature-rich finance dashboard built with React.js, Tailwind CSS, and Recharts. This project demonstrates strong frontend skills, clean architecture, and thoughtful UI/UX design.

---

## 🎯 Project Overview

Finance Dashboard is a comprehensive financial management interface that allows users to:

- **View Financial Summaries**: Total balance, income, and expenses with trend analysis
- **Analyze Transactions**: Searchable, filterable, and sortable transaction history
- **Understand Spending Patterns**: Visual breakdowns by category with pie charts
- **Monitor Financial Health**: Smart insights and metrics to guide financial decisions
- **Manage Transactions** (Admin only): Add, edit, and delete transactions
- **Export Data**: Download transactions as CSV or JSON for further analysis

---

## ✨ Features Implemented

### 1. **Dashboard Overview Page**
   - ✅ Summary cards showing Total Balance, Income, and Expenses
   - ✅ Trend indicators with percentage changes
   - ✅ Color-coded cards (green for income, red for expenses, blue for balance)
   - ✅ Visual hierarchy and responsive layout

### 2. **Visualizations**
   - ✅ **Balance Trend Chart**: Monthly balance progression using line chart
   - ✅ **Spending Breakdown Chart**: Category-wise expense visualization using pie chart
   - ✅ Interactive tooltips and legends
   - ✅ Responsive chart rendering

### 3. **Transactions Section**
   - ✅ Comprehensive transaction table with date, amount, category, type, and description
   - ✅ **Search functionality**: Search by description or category
   - ✅ **Filter by Type**: Income/Expense toggle
   - ✅ **Filter by Category**: Dropdown with all categories
   - ✅ **Sorting**: Sort by date, amount, or category (bidirectional)
   - ✅ **Highlighting**: Income (green) and expenses (red) color-coded
   - ✅ Clean, responsive table design

### 4. **Role-Based Access Control**
   - ✅ **Viewer Role**: Read-only access to all data
   - ✅ **Admin Role**: Full CRUD capabilities (Create, Read, Update, Delete)
   - ✅ Role switcher in header for easy testing
   - ✅ Conditional rendering of action buttons based on role

### 5. **Insights Section**
   - ✅ **Top Spending Category**: Identifies highest expense category
   - ✅ **Financial Health Score**: Calculates income-to-balance ratio (0-100%)
   - ✅ **Income Trend**: Month-over-month income growth percentage
   - ✅ **Expense Trend**: Month-over-month expense growth percentage
   - ✅ Visual indicators with trend icons

### 6. **State Management (Zustand)**
   - ✅ Centralized store for transactions, filters, and UI state
   - ✅ Clean separation of logic with selector functions
   - ✅ LocalStorage persistence for data and preferences
   - ✅ Efficient state updates and re-renders

### 7. **Advanced Features**

#### Dark Mode
   - ✅ Toggle between light and dark themes
   - ✅ Smooth transitions and proper contrast
   - ✅ Persisted in localStorage

#### Data Export
   - ✅ Export transactions as CSV (for Excel/Sheets)
   - ✅ Export transactions as JSON (for backup/analysis)
   - ✅ Automatic filename with date stamp

#### Transaction Management
   - ✅ Add new transactions (Admin)
   - ✅ Edit existing transactions (Admin)
   - ✅ Delete transactions (Admin)
   - ✅ Form validation and feedback

#### Animations
   - ✅ Smooth page transitions using Framer Motion
   - ✅ Hover effects on interactive elements
   - ✅ Button animations for better interactivity
   - ✅ Staggered component animations on load

### 8. **UI/UX Design**
   - ✅ **Responsive Design**: Mobile, tablet, and desktop optimized
   - ✅ **Modern Aesthetics**: Clean, spacious layout with proper whitespace
   - ✅ **Consistency**: Unified color scheme and typography
   - ✅ **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation
   - ✅ **Edge Cases**: Handles empty states, filters with no results
   - ✅ **Loading States**: Smooth transitions and feedback

### 9. **Mock Data**
   - ✅ 25 realistic transactions
   - ✅ Multiple categories (Salary, Food, Rent, Entertainment, etc.)
   - ✅ Mix of income and expense transactions
   - ✅ Data spread across multiple months (Jan-Mar 2024)

---

## 📊 Mock Data Overview

The dashboard comes with 25 pre-loaded transactions including:

| Category | Type | Count |
|----------|------|-------|
| Salary | Income | 3 |
| Freelance | Income | 4 |
| Rent | Expense | 3 |
| Food | Expense | 3 |
| Entertainment | Expense | 3 |
| Utilities | Expense | 1 |
| Healthcare | Expense | 1 |
| Transport | Expense | 2 |
| Shopping | Expense | 2 |
| Education | Expense | 1 |
| Other | Various | 3 |

---

## 🛠 Tech Stack

- **Frontend Framework**: React 18.x with Hooks
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Charting**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

---

## 📁 Project Structure

```
src/
├── components/                 # Reusable UI components
│   ├── BalanceTrendChart.tsx   # Monthly balance line chart
│   ├── ExportData.tsx          # CSV/JSON export functionality
│   ├── FilterBar.tsx           # Search and filter controls
│   ├── Header.tsx              # App header with role & theme toggle
│   ├── InsightsSection.tsx     # Financial metrics cards
│   ├── SummaryCard.tsx         # Dashboard summary cards
│   ├── SpendingBreakdownChart.tsx # Category pie chart
│   ├── TransactionList.tsx     # Transaction table with sorting
│   ├── TransactionModal.tsx    # Add/edit transaction form
│   └── index.ts                # Component exports
├── pages/
│   └── Dashboard.tsx           # Main dashboard page
├── store/
│   └── dashboardStore.ts       # Zustand store (state management)
├── data/
│   └── mockTransactions.ts     # Sample transaction data
├── types/
│   └── index.ts                # TypeScript type definitions
├── utils/
│   └── calculations.ts         # Utility functions & calculations
├── App.tsx                     # Main app component
├── main.tsx                    # React entry point
└── index.css                   # Tailwind CSS imports
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Steps

1. **Navigate to the project**
   ```bash
   cd zorvyn-Assigment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at: `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 🎮 Usage Guide

### Dashboard Navigation

1. **Switch Roles**: Use the role buttons in the header (👁️ Viewer / 🔐 Admin)
2. **Toggle Dark Mode**: Click the sun/moon icon in the header
3. **Add Transaction** (Admin only): Click "Add Transaction" button
4. **Search Transactions**: Type in the search box
5. **Filter Transactions**: Use the category dropdown or type filter buttons
6. **Sort Transactions**: Click on table column headers
7. **Edit Transaction** (Admin only): Click the edit icon in the transaction row
8. **Delete Transaction** (Admin only): Click the delete icon in the transaction row
9. **Export Data**: Click "Export CSV" or "Export JSON"

### Role-Based Features

**Viewer Role:**
- View all financial data
- Search and filter transactions
- Sort transactions
- View charts and insights
- Export data

**Admin Role:**
- All Viewer features +
- Add new transactions
- Edit existing transactions
- Delete transactions
- Full transaction management

---

## 📊 State Management Architecture

### Zustand Store (`dashboardStore.ts`)

The application uses Zustand for centralized state management:

```typescript
DashboardState {
  transactions: Transaction[]           // All transactions
  userRole: 'viewer' | 'admin'         // Current user role
  searchTerm: string                   // Search filter input
  filterType: 'income' | 'expense' | 'all'  // Type filter
  filterCategory: Category | 'all'     // Category filter
  darkMode: boolean                    // Theme preference
}
```

**Key Features:**
- ✅ LocalStorage persistence
- ✅ Automatic state hydration on app load
- ✅ Pure functions for state updates
- ✅ No unnecessary re-renders

---

## 🎨 Component Architecture

### Component Hierarchy
```
App
├── Header (role switcher, dark mode toggle)
└── Dashboard
    ├── Summary Cards (Balance, Income, Expenses)
    ├── Charts Section
    │   ├── BalanceTrendChart
    │   └── SpendingBreakdownChart
    ├── InsightsSection
    ├── FilterBar
    ├── TransactionList (with sorting)
    ├── ExportData
    └── TransactionModal (add/edit form)
```

### Component Responsibilities

| Component | Purpose |
|-----------|---------|
| `Header` | Navigation, role switcher, theme toggle |
| `SummaryCard` | Display financial metrics with icons |
| `BalanceTrendChart` | Monthly balance trend visualization |
| `SpendingBreakdownChart` | Category-wise spending breakdown |
| `TransactionList` | Sortable, filterable transaction table |
| `FilterBar` | Search and multi-filter controls |
| `InsightsSection` | Financial health metrics |
| `TransactionModal` | Add/edit transaction form |
| `ExportData` | CSV/JSON export functionality |

---

## 🧮 Utility Functions (`calculations.ts`)

Key calculation utilities:

- **`formatCurrency()`** - Format numbers as currency
- **`calculateBalance()`** - Calculate income minus expenses
- **`calculateTotal()`** - Sum transactions by type
- **`getSpendingByCategory()`** - Aggregate expenses by category
- **`getMonthlyBalance()`** - Calculate monthly balance trends
- **`calculateDashboardMetrics()`** - Compute all dashboard KPIs
- **`filterTransactions()`** - Multi-filter transactions
- **`sortTransactions()`** - Sort by date or amount
- **`downloadCSV()` / `downloadJSON()`** - Export data

---

## 🎯 Key Features Deep Dive

### 1. Smart Filtering System
- Combines search, type filter, and category filter
- Real-time filtering with instant results
- "Clear Filters" button to reset all filters
- Smooth UX with no delays

### 2. Financial Insights
- **Health Score**: Income-to-balance ratio (0-100%)
- **Top Category**: Automatically detect highest spending
- **Growth Metrics**: Month-over-month comparisons
- **Trend Indicators**: Visual up/down arrows

### 3. Data Persistence
- LocalStorage saves all transaction data
- User role preference persisted
- Dark mode preference saved
- Data survives page refreshes

### 4. Responsive Design
- **Mobile (< 768px)**: Single column layout
- **Tablet (768px - 1024px)**: 2-column grid
- **Desktop (> 1024px)**: Full 3-column layout
- Touch-friendly buttons and controls

---

## 📈 Performance Optimizations

1. **Memoization**: `useMemo` for expensive calculations
2. **Lazy Rendering**: Charts only render when needed
3. **Efficient Filtering**: Single-pass filtering functions
4. **CSS Optimization**: Tailwind purging unused styles
5. **Code Splitting**: Components loaded on-demand via Vite

---

## 🔒 Security Considerations

- Client-side validation on all inputs
- No sensitive data in localStorage (only transactions)
- XSS prevention via React's auto-escaping
- CSRF protection (stateless client-side app)

---

## 🎨 Styling Approach

### Tailwind CSS Utility Classes
- Comprehensive color palette
- Consistent spacing scale
- Responsive breakpoints
- Utility-first approach for fast development

### Design System
- **Colors**: Blue (primary), Green (income), Red (expense), Gray (neutral)
- **Spacing**: 4px base unit (8, 16, 24, 32, etc.)
- **Typography**: System font stack with fallbacks
- **Borders**: 2px for emphasis, 1px for subtle dividers
- **Shadows**: Subtle shadows for depth, elevated on hover

---

## 🚀 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 Code Quality

- ✅ TypeScript for type safety
- ✅ Functional components with hooks
- ✅ Clean, readable code with meaningful names
- ✅ DRY principle (reusable components & utilities)
- ✅ Proper error handling
- ✅ Comments for complex logic
- ✅ No hardcoded values (constants in separate files)

---

## 🎓 Learning Outcomes

This project demonstrates:

1. **React Fundamentals**
   - Functional components with hooks
   - Props drilling reduction with Context
   - Component composition
   - Custom hooks patterns

2. **State Management**
   - Zustand for centralized state
   - LocalStorage integration
   - Derived state calculations
   - Efficient re-renders

3. **Styling**
   - Tailwind CSS utility-first approach
   - Responsive design
   - Dark mode implementation
   - Animation integration

4. **Data Visualization**
   - Recharts for interactive charts
   - Real-time data updates
   - Chart responsiveness

5. **UX/UI Best Practices**
   - Clean, intuitive interfaces
   - Proper visual hierarchy
   - Accessibility considerations
   - Error handling and edge cases

6. **Performance**
   - Memoization strategies
   - Efficient filtering and sorting
   - Component optimization

---

## 🔄 Future Enhancement Ideas

- Advanced date range filtering
- Budget setting and alerts
- Recurring transaction templates
- Multi-currency support
- Cloud sync with backend API
- Mobile app version
- Advanced analytics and reports
- Bill splitting calculator
- Investment tracking

---

## 📄 License

This project is open source and available for educational purposes.

---

## ✅ Checklist of Requirements

- ✅ React.js with functional components and hooks
- ✅ State management with Zustand
- ✅ Tailwind CSS for styling
- ✅ Recharts for visualizations
- ✅ Dashboard overview with summary cards
- ✅ Balance trend and spending breakdown charts
- ✅ Transactions section with search, filter, sort
- ✅ Role-based UI (Viewer/Admin)
- ✅ Insights section with metrics
- ✅ Proper folder structure
- ✅ Mock data (25+ transactions)
- ✅ Dark mode toggle
- ✅ Data export (CSV/JSON)
- ✅ LocalStorage persistence
- ✅ Framer Motion animations
- ✅ Responsive design
- ✅ Clean, modern UI
- ✅ Comprehensive README

---

**🎉 All requirements completed!**

This project is production-ready and demonstrates professional-level frontend development skills.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
