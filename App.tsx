import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { AppSource, Notification } from './types';
import Header from './components/Header';
import NotificationList from './components/NotificationList';
import FilterControls from './components/FilterControls';
import AddNotificationForm from './components/AddNotificationForm';

const MOCK_NOTIFICATIONS: Notification[] = [
    { id: '1', source: AppSource.Banking, title: 'Large Withdrawal', message: 'A withdrawal of $1,200 was made from your account.', timestamp: Date.now() - 3600000, isRead: false },
    { id: '2', source: AppSource.Calendar, title: 'Team Sync-Up', message: 'Meeting with the design team in 15 minutes.', timestamp: Date.now() - 60000 * 5, isRead: false },
    { id: '3', source: AppSource.GitHub, title: 'Pull Request Merged', message: 'Your pull request #123 in `project-phoenix` was merged.', timestamp: Date.now() - 86400000 * 2, isRead: true },
    { id: '4', source: AppSource.Slack, title: 'Message from Sarah', message: 'Hey, can you look over the latest mockups?', timestamp: Date.now() - 60000 * 30, isRead: false },
    { id: '5', source: AppSource.Gmail, title: 'Your flight to SFO', message: 'Your flight check-in is now open.', timestamp: Date.now() - 86400000, isRead: true },
];

const App: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState<AppSource | 'all'>('all');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [lastDeleted, setLastDeleted] = useState<Notification[] | null>(null);
  const undoTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
      }
    };
  }, []);

  const startUndoTimer = (deletedItems: Notification[]) => {
    setLastDeleted(deletedItems);
    if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
    }
    undoTimeoutRef.current = window.setTimeout(() => {
        setLastDeleted(null);
        undoTimeoutRef.current = null;
    }, 5000);
  };

  const handleAddNotification = useCallback((newNotificationData: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...newNotificationData,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      isRead: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const handleToggleRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  }, []);

  const handleDeleteNotification = useCallback((id: string) => {
    const notificationToDelete = notifications.find(n => n.id === id);
    if (notificationToDelete) {
        startUndoTimer([notificationToDelete]);
        setNotifications(prev => prev.filter(n => n.id !== id));
    }
  }, [notifications]);

  const handleDeleteAll = useCallback(() => {
    if (notifications.length > 0) {
        startUndoTimer(notifications);
        setNotifications([]);
    }
  }, [notifications]);

  const handleUndoDelete = useCallback(() => {
    if (lastDeleted) {
        const restoredNotifications = [...notifications, ...lastDeleted].sort((a, b) => b.timestamp - a.timestamp);
        setNotifications(restoredNotifications);
        setLastDeleted(null);
        if (undoTimeoutRef.current) {
            clearTimeout(undoTimeoutRef.current);
            undoTimeoutRef.current = null;
        }
    }
  }, [lastDeleted, notifications]);

  const filteredNotifications = useMemo(() => {
    return notifications
      .filter(n => filterSource === 'all' || n.source === filterSource)
      .filter(n =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [notifications, searchTerm, filterSource]);

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <main className="max-w-4xl mx-auto px-4 pb-12">
        <Header />
        
        <div className="mb-6">
            {!isFormVisible ? (
                <button
                    onClick={() => setIsFormVisible(true)}
                    className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    Add New Notification
                </button>
            ) : (
                <AddNotificationForm onAdd={handleAddNotification} onClose={() => setIsFormVisible(false)} />
            )}
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <FilterControls
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterSource={filterSource}
                onFilterChange={setFilterSource}
                filteredNotificationCount={filteredNotifications.length}
                totalNotificationCount={notifications.length}
                onDeleteAll={handleDeleteAll}
            />
            <NotificationList
                notifications={filteredNotifications}
                onToggleRead={handleToggleRead}
                onDelete={handleDeleteNotification}
            />
        </div>

        {lastDeleted && (
             <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-700 text-white py-2 px-4 rounded-md shadow-lg flex items-center gap-4 animate-fade-in-up">
                <p className="text-sm">
                    {lastDeleted.length > 1 ? `${lastDeleted.length} notifications deleted.` : 'Notification deleted.'}
                </p>
                <button
                    onClick={handleUndoDelete}
                    className="font-bold text-sm text-indigo-400 hover:text-indigo-300"
                >
                    Undo
                </button>
             </div>
        )}

        <style>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translate(-50%, 10px);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
          }
        `}</style>

      </main>
    </div>
  );
};

export default App;
