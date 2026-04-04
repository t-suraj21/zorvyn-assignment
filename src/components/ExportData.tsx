import React from 'react';
import { Download, FileJson } from 'lucide-react';
import type { Transaction } from '../types';
import { downloadCSV, downloadJSON } from '../utils/calculations';

interface ExportDataProps {
  transactions: Transaction[];
}

export const ExportData: React.FC<ExportDataProps> = ({ transactions }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Export Data</h3>
      <div className="flex gap-3">
        <button
          onClick={() => downloadCSV(transactions)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
        >
          <Download size={18} />
          Export CSV
        </button>
        <button
          onClick={() => downloadJSON(transactions)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium"
        >
          <FileJson size={18} />
          Export JSON
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
        Download your transactions data in CSV or JSON format for analysis or backup.
      </p>
    </div>
  );
};
