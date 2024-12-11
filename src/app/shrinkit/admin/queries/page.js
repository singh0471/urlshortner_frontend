'use client'

import React, { useState, useEffect } from 'react';
import getAllQueryService from '@/lib/getAllQueries';  
import addressQueryService from '@/lib/addressQueryService';   
import Table from '@/components/Table/Table';   
import Pagination from '@/components/Pagination/Pagination';  
import PageSize from '@/components/Pagesize/Pagesize';   
import Filter from '@/components/filter/filter';  
import Toast from '@/components/Toast/Toast';  
import DownloadCsv from '@/components/DownloadComponents/DownloadComponents';

const AdminResponse = () => {
  const [queries, setQueries] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);   
  const [pageSize, setPageSize] = useState(4);   
  const [totalCount, setTotalCount] = useState(0);  
  const [responses, setResponses] = useState({}); 
  const [allData, setAllData] = useState(null);  
  const [filters, setFilters] = useState({
    username: '',   
  });
  const [toast, setToast] = useState({ message: '', type: '', isVisible: false });
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    const fetchQueries = async () => {
      setLoading(true);   
      try {
        const { data, totalCount } = await getAllQueryService(currentPage, pageSize, filters);   
        console.log("Fetched Queries:", data);   
        setQueries(data);
        const getAllData = await getAllQueryService(1, 1000);
        setAllData(getAllData.data);
        setTotalCount(Number(totalCount));  
      } catch (error) {
        console.error("Error fetching queries:", error);
      } finally {
        setLoading(false);  
      }
    };
    fetchQueries();
  }, [currentPage, pageSize, filters]);   

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);   
  };

  const handleFilterChange = (attribute, value) => {
    setFilters(prev => ({
      ...prev,
      [attribute]: value,
    }));
  };

  const handleResponseChange = (id, event) => {
    setResponses({
      ...responses,
      [id]: event.target.value,   
    });
  };

  const handleSubmitResponse = async (id, userId) => {
    const adminResponse = responses[id] || '';  

    if (!adminResponse.trim()) {
      showToast('error', 'Please provide a response before submitting');  
      return;
    }

    setLoading(true);   

    try {
      await addressQueryService(id, userId, adminResponse); 
      showToast('success', 'Response submitted successfully!');  
      
      setResponses((prev) => {
        const newResponses = { ...prev };
        delete newResponses[id];  
        return newResponses;
      });
      
      const { data, totalCount } = await getAllQueryService(currentPage, pageSize, filters);
      setQueries(data);
      setTotalCount(Number(totalCount));
    } catch (error) {
      console.error("Error submitting response:", error);
      showToast('error', 'Error submitting response');   
    } finally {
      setLoading(false);  
    }
  };

  const showToast = (type, message) => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prevState) => ({ ...prevState, isVisible: false }));  
    }, 5000);   
  };

  const tableHeaders = ['Sr. No.', 'Username', 'Query', 'Status', 'Response', 'Action'];

  const tableData = queries.map((query, index) => ({
    srNo: (currentPage - 1) * pageSize + index + 1, 
    username: query.username,
    query: query.query,   
    status: query.status,
    response: (
      <textarea
        value={responses[query.id] || ''}
        onChange={(e) => handleResponseChange(query.id, e)}
        className="border border-gray-300 p-2 rounded-md w-full"
        rows="3"
      />
    ),
    action: (
      <button
        onClick={() => handleSubmitResponse(query.id, query.userId)}  
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300"
        disabled={loading}  
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    ),
  }));

  return (
    <div className="admin-response-container min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white flex flex-col justify-start items-center">
      <div className="w-full max-w-screen-xl px-6 py-6 bg-white bg-opacity-80 rounded-lg shadow-xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-teal-600">Admin Query Responses</h1>

        <div className="flex mb-6">
          <Filter 
            label="Username" 
            attribute="username" 
            value={filters.username || ''}
            onFilterChange={handleFilterChange} 
          />
        </div>

        {loading ? (
          <div className="text-center text-lg text-gray-500 italic mt-4">
            Loading queries...
          </div>
        ) : queries.length === 0 ? (
          <div className="text-center text-lg text-gray-500 italic mt-4">
            No queries available
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 ml-auto">
              <DownloadCsv
                data={allData}   
                headers={['username', 'query', 'status']}  
                fileName="user_queries.csv"
              />
            </div>
            <Table headers={tableHeaders} tableData={tableData} />

            <div className="flex justify-between items-center mt-4">
              <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalCount / pageSize)}   
                onPageChange={handlePageChange}  
              />
            </div>
          </>
        )}
      </div>

      {toast.isVisible && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ ...toast, isVisible: false })} 
        />
      )}
    </div>
  );
};

export default AdminResponse;
