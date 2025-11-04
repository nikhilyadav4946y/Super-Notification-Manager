
import React, { useState } from 'react';
import { AppSource, Notification } from '../types';

interface AddNotificationFormProps {
  onAdd: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  onClose: () => void;
}

const AddNotificationForm: React.FC<AddNotificationFormProps> = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [source, setSource] = useState<AppSource>(AppSource.Other);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    onAdd({ title, message, source });
    setTitle('');
    setMessage('');
    setSource(AppSource.Other);
    onClose();
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
       <h2 className="text-lg font-semibold text-white mb-4">Add New Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
            placeholder="e.g., Bill Due"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
            placeholder="e.g., Your electricity bill of $75 is due tomorrow."
            required
          />
        </div>
        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-300">Source</label>
          <select
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value as AppSource)}
            className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
          >
            {Object.values(AppSource).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-3">
            <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-sm hover:bg-gray-500 transition-colors duration-200"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 transition-colors duration-200"
            >
                Add Notification
            </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotificationForm;
