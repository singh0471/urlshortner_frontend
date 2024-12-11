'use client'

import React, { useState, useEffect } from 'react';
import getMyUrlsService from '@/lib/getMyUrlService';  
import Table from '@/components/Table/Table';   
import Pagination from "@/components/Pagination/Pagination";  
import PageSize from "@/components/Pagesize/Pagesize";   
import Filter from '@/components/filter/filter';  
import DownloadCsv from '@/components/DownloadComponents/DownloadComponents';

const MyUrlsPage = () => {
  const [urlsData, setUrlsData] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);   
  const [pageSize, setPageSize] = useState(4);  
  const [totalCount, setTotalCount] = useState(0);  
  const [allData, setAllData] = useState(null);  

  
  const [filters, setFilters] = useState({
    shortUrl: '',
    actualUrl: '',
    fromClicksLeft: null,
    toClicksLeft: null,
    fromTotalClicks: null,
    toTotalClicks: null,
    isCustom: null,  
  });

  const [applyFilters, setApplyFilters] = useState(false);  
  const [loading, setLoading] = useState(false);   

  const fetchUrls = async (filters = {}) => {
    setLoading(true);
    try {
      const { data, totalCount } = await getMyUrlsService(currentPage, pageSize, filters); 
      const getAllData = await getMyUrlsService(1, 1000, {}); 
      setAllData(getAllData.data);
      setUrlsData(data);
      setTotalCount(totalCount);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls(filters);
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (applyFilters) {
      fetchUrls(filters);
      setApplyFilters(false);
    }
  }, [applyFilters, filters]);

  const tableHeaders = ['Sr. No.', 'Short URL', 'Actual URL', 'Is Custom', 'Total Clicks', 'Clicks Left'];

  const tableData = urlsData.map((url, index) => ({
    srNo: (currentPage - 1) * pageSize + index + 1,
    shortUrl: url.shortUrl,
    actualUrl: url.actualUrl,
    isCustom: url.isCustom ? 'True' : 'False',
    totalClicks: url.totalClicks,
    clicksLeft: url.clicksLeft,
  }));

  const handleFilterChange = (attribute, value) => {
    setFilters(prev => ({
      ...prev,
      [attribute]: value
    }));
  };

  const handleApplyFilters = () => {
    setApplyFilters(true);  
  };

  const handleRemoveFilters = () => {
    setFilters({
      shortUrl: '',
      actualUrl: '',
      fromClicksLeft: null,
      toClicksLeft: null,
      fromTotalClicks: null,
      toTotalClicks: null,
      isCustom: null,
    });
    setApplyFilters(false);
    fetchUrls();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

 
  const clicksLeftOptions = [
    { label: '1-10', value: '1-10' },
    { label: '10-100', value: '10-100' },
    { label: '100-1000', value: '100-1000' },
    { label: '>1000', value: '>1000' }
  ];

  const totalClicksOptions = [
    { label: '1-10', value: '1-10' },
    { label: '10-100', value: '10-100' },
    { label: '100-1000', value: '100-1000' },
    { label: '>1000', value: '>1000' }
  ];

  const handleRangeFilterChange = (type, range) => {
    let from = null, to = null;

    switch(range) {
      case '1-10':
        from = 1; to = 10;
        break;
      case '10-100':
        from = 10; to = 100;
        break;
      case '100-1000':
        from = 100; to = 1000;
        break;
      case '>1000':
        from = 1000; to = null;
        break;
      default:
        break;
    }

    if (type === 'clicksLeft') {
      setFilters(prev => ({
        ...prev,
        fromClicksLeft: from,
        toClicksLeft: to
      }));
    } else if (type === 'totalClicks') {
      setFilters(prev => ({
        ...prev,
        fromTotalClicks: from,
        toTotalClicks: to
      }));
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="admin-urls-container min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">My URLs</h1>

      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg mb-8">
        
        <div className="flex flex-wrap justify-start gap-4 items-center mb-6">
          <Filter 
            label="Short URL" 
            attribute="shortUrl" 
            value={filters.shortUrl} 
            onFilterChange={handleFilterChange} 
          />
          <Filter 
            label="Actual URL" 
            attribute="actualUrl" 
            value={filters.actualUrl} 
            onFilterChange={handleFilterChange} 
          />
          
          
          <div className="flex flex-col items-start gap-1 text-xs">
            <label htmlFor="clicksLeft" className="font-medium text-gray-600 text-[10px]">Clicks Left:</label>
            <select
              id="clicksLeft"
              value={filters.fromClicksLeft && filters.toClicksLeft ? `${filters.fromClicksLeft}-${filters.toClicksLeft}` : ''}
              onChange={(e) => handleRangeFilterChange('clicksLeft', e.target.value)}
              className="w-32 p-1 text-[10px] text-black border border-gray-300 rounded bg-gray-50 focus:border-teal-500 focus:outline-none"
            >
              <option value="">Select Range</option>
              {clicksLeftOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          
          <div className="flex flex-col items-start gap-1 text-xs">
            <label htmlFor="totalClicks" className="font-medium text-gray-600 text-[10px]">Total Clicks:</label>
            <select
              id="totalClicks"
              value={filters.fromTotalClicks && filters.toTotalClicks ? `${filters.fromTotalClicks}-${filters.toTotalClicks}` : ''}
              onChange={(e) => handleRangeFilterChange('totalClicks', e.target.value)}
              className="w-32 p-1 text-[10px] text-black border border-gray-300 rounded bg-gray-50 focus:border-teal-500 focus:outline-none"
            >
              <option value="">Select Range</option>
              {totalClicksOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

         
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="isCustom" 
              checked={filters.isCustom || false} 
              onChange={(e) => handleFilterChange('isCustom', e.target.checked ? true : null)} 
              className="text-teal-500 focus:ring-teal-500"
            />
            <label htmlFor="isCustom" className="text-xs font-medium text-gray-600">Is Custom</label>
          </div>
        </div>

         
        <div className="flex mb-6">
          <button 
            onClick={handleApplyFilters}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 text-xs"
          >
            Apply Filters
          </button>
          <button 
            onClick={handleRemoveFilters} 
            className="bg-red-500 text-white px-4 py-2 text-xs rounded-md ml-2"
          >
            Remove Filters
          </button>
        </div>

        
        {loading ? (
          <div className="text-center text-lg text-black italic mt-4">Loading...</div>
        ) : (
          <>
            {urlsData && urlsData.length === 0 ? (
              <div className="text-center text-lg text-black italic mt-4">No URLs found</div>
            ) : (
              <>
                <div className="flex items-center gap-4 ml-auto">
                  <DownloadCsv
                    data={allData}   
                    headers={['shortUrl', 'actualUrl','isCustom','totalClicks','clicksLeft']}  
                    fileName="my_urls.csv"
                  />
                </div>
                <Table headers={tableHeaders} tableData={tableData} />

                 
                <div className="flex justify-between items-center mt-6">
                  <div className="flex justify-start w-1/2">
                    <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
                  </div>
                  <div className="flex justify-center w-1/2">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(totalCount / pageSize)}  
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyUrlsPage;
