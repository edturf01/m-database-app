import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center my-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full max-w-lg p-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-lg font-semibold transition-colors duration-200"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;