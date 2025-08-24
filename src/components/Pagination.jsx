import React from 'react';

const Pagination = ({ currentPage, totalResults, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / 10);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-gray-700 disabled:opacity-50"
      >
        Previous
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-gray-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;