'use client'

import React, { useState, useEffect } from 'react';
import getMyUrlsService from '@/lib/getMyUrlService';  
import Table from '@/components/Table/Table';   
import PageSize from "@/components/Pagesize/Pagesize";   
import Pagination from "@/components/Pagination/Pagination";   
import { selectTableAttribute } from '@/utils/helper/selectTableAttribute';   
import camelCaseToTitleCase from '@/utils/helper/camelCaseToTitle';  
import DownloadCsv from '@/components/DownloadComponents/DownloadComponents';
import Filter from '@/components/filter/filter';  // Assuming the Filter component is in the correct path

const MyUrlsPage = () => {
  const [urlsData, setUrlsData] = useState([]);  
  const [headers, setHeaders] = useState([]);   
  const [page, setPage] = useState(1);   
  const [pageSize, setPageSize] = useState(4);   
  const [totalPages, setTotalPages] = useState(0);   
  const [allData, setAllData] = useState(null);
  
  // Filters state
  const [filters, setFilters] = useState({
    shortUrl: '',
    actualUrl: '',
    clicksLeftRange: '',
    totalClicksRange: '',
    isCustom: null
  });

  const [applyFilters, setApplyFilters] = useState(false);  // For applying filters on button click

  const mapUrlsData = (data) => {
    const requiredColumns = [
      "actualUrl",
      "shortUrl",
      "clicksLeft",
      "totalClicks"
    ];

    const selectedData = selectTableAttribute(data, requiredColumns);

    const headers = [
      "Sr. No", 
      ...requiredColumns.map((key) => camelCaseToTitleCase(key))
    ];

    setHeaders(headers);

    return selectedData.map((item, index) => ({
      srNo: (page - 1) * pageSize + index + 1,   
      actualUrl: item.actualUrl,
      shortUrl: item.shortUrl,
      clicksLeft: item.clicksLeft,
      totalClicks: item.totalClicks || 0   
    }));
  };

  const fetchUrlsData = async (filters = {}) => {
    try {
      const response = await getMyUrlsService(page, pageSize, filters);
      const getAllData = await getMyUrlsService(); // Fetch all data for CSV
      setAllData(getAllData.data);

      if (response?.data && Array.isArray(response.data)) {
        const urls = response.data;
        const mappedUrlsData = mapUrlsData(urls);
        setUrlsData(mappedUrlsData);   
      } else {
        setUrlsData([]);  
      }

      if (response?.totalCount) {
        setTotalPages(Math.ceil(Number(response.totalCount) / pageSize));
      } else {
        setTotalPages(0);  
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (newPage) => setPage(newPage);

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1);   
  };

  // Handle filter input changes
  const handleFilterChange = (attribute, value) => {
    setFilters(prev => ({
      ...prev,
      [attribute]: value
    }));
  };

  // Apply filters
  const handleApplyFilters = () => {
    setApplyFilters(true);  
  };

  // Remove filters
  const handleRemoveFilters = () => {
    setFilters({
      shortUrl: '',
      actualUrl: '',
      clicksLeftRange: '',
      totalClicksRange: '',
      isCustom: null
    });
    setApplyFilters(false);  // Reset the applyFilters state
    fetchUrlsData();  // Fetch data without any filters
  };

  useEffect(() => {
    if (applyFilters) {
      fetchUrlsData(filters); // Fetch data when filters are applied
      setApplyFilters(false); // Reset the applyFilters flag
    } else {
      fetchUrlsData();  // Regular data fetch without filters
    }
  }, [page, pageSize, applyFilters, filters]);  // Fetch when page, pageSize, or filters change

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

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen py-12">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600 mb-6">
            My URLs
          </h1>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap justify-start gap-4 items-center mb-6">
          {/* Removed username filter */}
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

          {/* Clicks Left Range Filter */}
          <div className="flex flex-col items-start gap-1 text-xs">
            <label htmlFor="clicksLeft" className="font-medium text-gray-600 text-[10px]">Clicks Left:</label>
            <select
              id="clicksLeft"
              value={filters.clicksLeftRange}
              onChange={(e) => handleFilterChange('clicksLeftRange', e.target.value)}
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

          {/* Total Clicks Range Filter */}
          <div className="flex flex-col items-start gap-1 text-xs">
            <label htmlFor="totalClicks" className="font-medium text-gray-600 text-[10px]">Total Clicks:</label>
            <select
              id="totalClicks"
              value={filters.totalClicksRange}
              onChange={(e) => handleFilterChange('totalClicksRange', e.target.value)}
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

          {/* Checkbox for isCustom */}
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

        {/* Apply/Remove Filters Buttons */}
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

        {/* Download CSV Button */}
        <div className="flex items-center gap-4 ml-auto">
          <DownloadCsv
            data={allData}
            headers={['actualUrl', 'shortUrl', 'clicksLeft', 'totalClicks']}
            fileName="my_urls.csv"
          />
        </div>

        {/* Table */}
        <Table 
          headers={headers} 
          tableData={urlsData}  
        />

        {/* Pagination and Page Size */}
        {urlsData.length > 0 && (
          <>
            <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
            <Pagination
              currentPage={page}
              totalPages={totalPages} 
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MyUrlsPage;
