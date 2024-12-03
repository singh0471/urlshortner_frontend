import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
    if (currentPage === 1) onPageChange(totalPages);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
    if (currentPage === totalPages) onPageChange(1);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={handlePrev}
        className="px-6 py-2 text-white bg-teal-600 border border-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      
      <span className="text-sm font-semibold text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        className="px-6 py-2 text-white bg-teal-600 border border-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
