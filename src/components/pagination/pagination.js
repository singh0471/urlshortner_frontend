import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const pagesToShow = 4;

  // Calculate the start and end page for the current range
  const startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  // Handle Prev button click (go to the previous range or the first page if on the first range)
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);  // Go to the previous page
    }
  };

  // Handle Next button click (go to the next range or the last page if on the last range)
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);  // Go to the next page
    }
  };

  // Handle Page Number click
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);  // Go to the clicked page
  };

  // Generate the page numbers to display
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        disabled={currentPage === 1} // Disable prev button on the first page
      >
        <FaChevronLeft />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
          className={`px-4 py-2 rounded-full ${
            pageNumber === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        >
          {pageNumber}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        disabled={currentPage === totalPages} // Disable next button on the last page
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
