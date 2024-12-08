'use client';

import React, { useState, useEffect } from 'react';
import getAllTransactionService from '@/lib/getAllTransactionService';
import Table from '@/components/Table/Table'; // Your Table component
import Pagination from '@/components/Pagination/Pagination'; // Your Pagination component
import PageSize from '@/components/Pagesize/Pagesize'; // Your PageSize component
import Filter from '@/components/filter/filter'; // Your Filter component
import DownloadCsv from '@/components/DownloadComponents/DownloadComponents'; // Your DownloadCsv component
import Toast from '@/components/Toast/Toast';

const GetAllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalCount, setTotalCount] = useState(0);
  const [allData, setAllData] = useState(null);
  const [filters, setFilters] = useState({
    username: '',
    planName: '',
    fromDate: '',
    toDate: ''
  });

  const [applyFilters, setApplyFilters] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); // Success or Error type

  const fetchTransactions = async (filters = {}) => {
    try {
      const validFilters = {};

      if (filters.username) validFilters.username = filters.username;
      if (filters.planName) validFilters.planName = filters.planName;
      if (filters.fromDate) validFilters.fromDate = filters.fromDate;
      if (filters.toDate) validFilters.toDate = filters.toDate;

      const { data, totalCount } = await getAllTransactionService(currentPage, pageSize, validFilters);

      const getAllData = await getAllTransactionService();
      setAllData(getAllData.data);
      setTransactions(data);
      setTotalCount(totalCount);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions(filters);
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (applyFilters) {
      fetchTransactions(filters);
      setApplyFilters(false); 
    }
  }, [applyFilters, filters]);

  const tableHeaders = ['Sr. No.', 'Username', 'Plan Name', 'Amount', 'Date'];

  const tableData = transactions.map((transaction, index) => ({
    srNo: (currentPage - 1) * pageSize + index + 1,
    username: transaction.username,
    planName: transaction.planName,
    amount: transaction.amount,
    date: new Date(transaction.date).toLocaleDateString(),
  }));

  const handleFilterChange = (attribute, value) => {
    setFilters(prev => ({
      ...prev,
      [attribute]: value,
    }));
  };

  const validateDate = (dateStr) => {
    const today = new Date();
    const selectedDate = new Date(dateStr);

    if (selectedDate > today) {
      return 'Date cannot be in the future.';
    }
    return null;
  };

  const handleApplyFilters = () => {
    // Validate dates for future dates or from > to
    if (filters.fromDate && filters.toDate && new Date(filters.fromDate) > new Date(filters.toDate)) {
      setToastMessage('From Date cannot be greater than To Date.');
      setToastType('error');
      return;
    }

    if (filters.fromDate && validateDate(filters.fromDate)) {
      setToastMessage('From Date cannot be in the future.');
      setToastType('error');
      return;
    }

    if (filters.toDate && validateDate(filters.toDate)) {
      setToastMessage('To Date cannot be in the future.');
      setToastType('error');
      return;
    }

    setApplyFilters(true);
  };

  const handleRemoveFilters = () => {
    setFilters({
      username: '',
      planName: '',
      fromDate: '',
      toDate: ''
    });
    setApplyFilters(false);
    fetchTransactions();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  // Calculate total revenue from filtered transactions
  const calculateTotalRevenue = (data) => {
    return data.reduce((sum, transaction) => sum + transaction.amount, 0).toFixed(2);
  };

  const totalRevenue = calculateTotalRevenue(transactions);  // Calculate total revenue for filtered data
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="admin-transactions-container min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">All Transactions</h1>

      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg mb-8">
        {/* Total Revenue Card */}
        <div className="mb-6 bg-teal-500 p-4 rounded-md text-white">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-xl font-bold">{totalRevenue} USD</p>
        </div>

        <div className="flex flex-wrap justify-start gap-4 items-center mb-6">
          <Filter 
            label="Username" 
            attribute="username" 
            value={filters.username || ''}
            onFilterChange={handleFilterChange} 
          />
          <Filter 
            label="Plan Name" 
            attribute="planName" 
            value={filters.planName || ''}
            onFilterChange={handleFilterChange} 
          />
          
          {/* From Date - Calendar Picker with Title */}
          <div className="flex flex-col">
            <label htmlFor="fromDate" className="mb-1 font-medium text-gray-600 text-[10px]">From Date:</label>
            <input
              type="date"
              id="fromDate"
              value={filters.fromDate || ''}
              onChange={(e) => handleFilterChange('fromDate', e.target.value)}
              className="border p-1 rounded-md text-black text-sm w-28"  // Expanded width
            />
          </div>

          {/* To Date - Calendar Picker with Title */}
          <div className="flex flex-col">
            <label htmlFor="toDate" className="mb-1 font-medium text-gray-600 text-[10px]">To Date:</label>
            <input
              type="date"
              id="toDate"
              value={filters.toDate || ''}
              onChange={(e) => handleFilterChange('toDate', e.target.value)}
              className="border p-1 rounded-md text-black text-sm w-28"  // Expanded width
            />
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

        <div>
          {transactions && transactions.length === 0 ? (
            <div className="text-center text-lg text-black italic mt-4">No Transactions found</div>
          ) : (
            <>
              <DownloadCsv
                data={allData}  // Send all data for CSV download
                headers={['username', 'planName', 'amount']}  // Define which columns to include
                fileName="transaction.csv"
              />
              <Table headers={tableHeaders} tableData={tableData} />

              <div className="flex justify-between items-center mt-6">
                <div className="flex justify-start w-1/2">
                  <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
                </div>

                <div className="flex justify-center w-1/2">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}  
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Display Toast if any message exists */}
      {toastMessage && <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />}
    </div>
  );
};

export default GetAllTransactions;
