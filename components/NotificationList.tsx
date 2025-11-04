
import React from 'react';
import { Notification } from '../types';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, onToggleRead, onDelete }) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-gray-800/50 border border-dashed border-gray-700 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
        <h3 className="mt-2 text-lg font-medium text-white">All Clear!</h3>
        <p className="mt-1 text-sm text-gray-400">No notifications match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onToggleRead={onToggleRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NotificationList;
