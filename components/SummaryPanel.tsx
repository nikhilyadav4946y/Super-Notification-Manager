
import React from 'react';

interface SummaryPanelProps {
  onSummarize: () => void;
  summary: string;
  isLoading: boolean;
  unreadCount: number;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({ onSummarize, summary, isLoading, unreadCount }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h2 className="text-lg font-semibold text-white">AI Summary</h2>
            <p className="text-sm text-gray-400">Get a quick overview of your unread notifications.</p>
        </div>
        <button
          onClick={onSummarize}
          disabled={isLoading || unreadCount === 0}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
             <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
             </>
          ) : `Summarize ${unreadCount} Unread`}
        </button>
      </div>
      {summary && (
        <div className="mt-4 p-4 bg-gray-900/70 rounded-md border border-gray-700">
          <p className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryPanel;
