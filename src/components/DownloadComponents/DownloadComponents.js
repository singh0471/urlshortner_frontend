import React from 'react';
import camelCaseToTitleCase from '@/utils/helper/camelCaseToTitle';

const DownloadCsv = ({ data, headers, fileName = 'download.csv' }) => {

  const handleDownload = () => {
    
    const csvRows = [];

 
    const titleCasedHeaders = headers.map(header => camelCaseToTitleCase(header));
    
  
    csvRows.push(titleCasedHeaders.join(','));

    
    data.forEach((row) => {
      const values = headers.map(header => {
        const value = row[header];
        
        return value === undefined || value === null ? '' : value;
      });
      csvRows.push(values.join(','));
    });

    
    const csvData = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });

   
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvData);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 transition mt-4"
    >
      Download CSV
    </button>
  );
};

export default DownloadCsv;
