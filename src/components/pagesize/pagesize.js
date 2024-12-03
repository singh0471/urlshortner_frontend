import React from 'react';

const PageSize = ({ pageSize, onPageSizeChange }) => {
  return (
    <div className="flex items-center gap-2 my-2 text-sm">
      <label htmlFor="page-size" className="font-semibold text-gray-700">
        Rows per page:
      </label>
      <select
        id="page-size"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:border-teal-600 text-gray-700 cursor-pointer"
      >
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="8">8</option>
      </select>
    </div>
  );
};

export default PageSize;
