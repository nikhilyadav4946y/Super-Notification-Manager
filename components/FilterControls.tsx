import React from 'react';
import { AppSource } from '../types';

interface FilterControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterSource: AppSource | 'all';
  onFilterChange: (source: AppSource | 'all') => void;
  filteredNotificationCount: number;
  totalNotificationCount: number;
  onDeleteAll: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ 
  searchTerm, 
  onSearchChange, 
  filterSource, 
  onFilterChange, 
  filteredNotificationCount,
  totalNotificationCount,
  onDeleteAll
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-between items-center">
      <div className="relative w-full sm:w-auto sm:flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input
          type="text"
          placeholder={`Search ${filteredNotificationCount} notifications...`}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-md leading-5 text-gray-300 placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex w-full sm:w-auto items-center gap-2">
        <select
          value={filterSource}
          onChange={(e) => onFilterChange(e.target.value as AppSource | 'all')}
          className="flex-grow sm:flex-grow-0 sm:w-40 bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
        >
          <option value="all">All Sources</option>
          {Object.values(AppSource).map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button
          onClick={onDeleteAll}
          disabled={totalNotificationCount === 0}
          className="px-3 py-2 bg-red-800/80 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
          aria-label="Delete all notifications"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FilterControls;