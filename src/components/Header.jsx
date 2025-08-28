import React from 'react';

const Header = ({ onBackToHome, onToggleTheme, isDarkMode }) => {
  return (
    <header className="flex justify-between items-center my-8 text-white">
      <div 
        onClick={onBackToHome}
        className="cursor-pointer transition-all duration-200 hover:text-blue-400"
      >
        <h1 className="text-4xl font-bold">M-Database</h1>
      </div>
      <button 
        onClick={onToggleTheme} 
        className="p-2 rounded-full bg-gray-700 text-yellow-300 hover:bg-gray-600 transition-colors duration-200"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </header>
  );
};

export default Header;