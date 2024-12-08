import React from 'react';
import camelCaseToTitleCase from '../../utils/helper/camelCaseToTitle';

const Table = ({ headers, tableData }) => {
  if (!tableData || tableData.length === 0) {
    return <div className="text-center text-lg text-gray-500 italic mt-4">No data available</div>;
  }

  

  const updatedHeaders = headers.map(header => camelCaseToTitleCase(header));

  return (
    <div className="overflow-x-auto w-full mt-4">
      <table className="w-full table-auto bg-teal-50 border-collapse shadow-lg rounded-lg border border-gray-300">
        <thead>
          <tr>
            {updatedHeaders.map((header, index) => (
              <th key={index} className="px-4 py-2 bg-teal-600 text-white text-left text-sm font-bold capitalize border border-gray-300">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex} className={`hover:bg-teal-100 ${rowIndex % 2 === 0 ? 'bg-teal-50' : 'bg-teal-200'}`}>
              {Object.keys(row).map((key, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700 text-center border border-gray-300 overflow-hidden text-ellipsis">
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
