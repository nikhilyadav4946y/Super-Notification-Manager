import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Super Notification Manager
      </h1>
      <p className="text-gray-400 mt-2">Your central hub for all alerts.</p>
    </header>
  );
};

export default Header;