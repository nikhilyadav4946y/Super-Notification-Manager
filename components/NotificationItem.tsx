
import React from 'react';
import { Notification } from '../types';
import { APP_SOURCE_INFO } from '../constants';

interface NotificationItemProps {
  notification: Notification;
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);
  
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onToggleRead, onDelete }) => {
  const { icon, color, bgColor } = APP_SOURCE_INFO[notification.source];

  return (
    <div className={`flex gap-4 p-4 bg-gray-800 border-l-4 rounded-r-lg ${notification.isRead ? 'border-gray-700 opacity-60' : 'border-indigo-500'}`}>
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${bgColor} ${color}`}>
            {icon}
        </div>
        <div className="flex-grow">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-white">{notification.title}</h3>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-4">{formatTimeAgo(notification.timestamp)}</span>
            </div>
            <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
            <div className="flex gap-2 mt-3">
                <button 
                    onClick={() => onToggleRead(notification.id)} 
                    className="px-2 py-1 text-xs font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded"
                >
                    {notification.isRead ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button 
                    onClick={() => onDelete(notification.id)} 
                    className="px-2 py-1 text-xs font-medium text-red-400 bg-gray-700 hover:bg-red-900/50 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
  );
};

export default NotificationItem;
