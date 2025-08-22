import React from "react";

function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for a movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mr-2 w-64"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
