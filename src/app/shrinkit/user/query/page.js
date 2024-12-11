// 'use client';

// import React, { useState, useEffect } from 'react';
// import getMyQueryService from '@/lib/getMyQueryService';   
// import addQueryService from '@/lib/addQuery';  
// import Table from '@/components/Table/Table';  
// import Pagination from '@/components/Pagination/Pagination';  
// import PageSize from '@/components/Pagesize/Pagesize';   
// import { selectTableAttribute } from '@/utils/helper/selectTableAttribute';  
// import { toast, ToastContainer } from 'react-toastify';  // Import Toastify
// import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

// const QueryComponent = () => {
//   const [activeTab, setActiveTab] = useState('addQuery');  
//   const [queries, setQueries] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(4);
//   const [newQuery, setNewQuery] = useState('');

//   const tableHeaders = ['Sr. No.', 'Query', 'Admin Response', 'Status'];

//   useEffect(() => {
//     const fetchQueries = async () => {
//       if (activeTab === 'myQueries') {
//         try {
//           const response = await getMyQueryService(currentPage, pageSize);
//           const filteredQueries = selectTableAttribute(response.data, ['query', 'adminResponse', 'status']);
//           setQueries(filteredQueries);   
//           setTotalCount(response.totalCount);   
//         } catch (error) {
//           toast.error('Error fetching queries. Please try again.');  // Replace alert with Toastify
//         }
//       }
//     };

//     fetchQueries();
//   }, [activeTab, currentPage, pageSize]);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setCurrentPage(1);   
//   };

//   const handleAddQuery = async () => {
//     if (!newQuery.trim()) {
//       toast.error('Please enter a query!');  // Replace alert with Toastify
//       return;
//     }

//     try {
//       await addQueryService(newQuery);
//       toast.success('Query submitted successfully!');  // Replace alert with Toastify
//       setNewQuery('');
//       setActiveTab('myQueries');  
//       setCurrentPage(1);  
//     } catch (error) {
//       toast.error('Error adding query. Please try again.');  // Replace alert with Toastify
//     }
//   };

//   const addSerialNumbers = (queriesData) => {
//     return queriesData.map((query, index) => ({
//       srNo: index + 1,   
//       query: query.query,
//       adminResponse: query.adminResponse || '',  
//       status: query.status
//     }));
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-teal-500 text-white py-10">  
      
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-semibold mb-4 text-white">Manage Your Queries</h1> 
//         <p className="text-xl max-w-2xl mx-auto text-white">Submit new queries or view your existing queries from here.</p>  
//       </div>

//       <div className="w-full max-w-3xl mx-auto p-8 bg-white bg-opacity-90 rounded-lg shadow-xl">
        
//         <div className="flex space-x-4 mb-6">
//           <button
//             className={`px-4 py-2 rounded-lg ${activeTab === 'addQuery' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             onClick={() => handleTabChange('addQuery')}
//           >
//             Add Query
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg ${activeTab === 'myQueries' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             onClick={() => handleTabChange('myQueries')}
//           >
//             My Queries
//           </button>
//         </div>

//         {activeTab === 'addQuery' && (
//           <div className="p-6 bg-gray-100 rounded-lg shadow-md">
//             <h3 className="text-2xl font-semibold mb-4 text-gray-800">Add New Query</h3> 
//             <textarea
//               className="w-full p-4 border border-gray-300 rounded-md text-gray-800"  
//               rows={4}
//               value={newQuery}
//               onChange={(e) => setNewQuery(e.target.value)}
//               placeholder="Enter your query here"
//             />
//             <button
//               className="mt-4 w-full px-6 py-3 bg-green-600 text-white rounded-md"
//               onClick={handleAddQuery}
//             >
//               Submit Query
//             </button>
//           </div>
//         )}

//         {activeTab === 'myQueries' && queries.length > 0 && (
//           <>
//             <Table
//               headers={tableHeaders}   
//               tableData={addSerialNumbers(queries)}  
//             />
            
//             <Pagination
//               currentPage={currentPage}
//               totalPages={Math.ceil(totalCount / pageSize)} 
//               onPageChange={setCurrentPage}
//             />
//             <PageSize 
//               pageSize={pageSize} 
//               onPageSizeChange={setPageSize}
//             />
//           </>
//         )}

//         {activeTab === 'myQueries' && queries.length === 0 && (
//           <div className="text-center text-gray-500 mt-6">No queries found.</div>
//         )}
//       </div>

//       {/* Toast Container to render the toasts globally */}
//       <ToastContainer />  
//     </div>
//   );
// };

// export default QueryComponent;


'use client';

import React, { useState, useEffect } from 'react';
import getMyQueryService from '@/lib/getMyQueryService';   
import addQueryService from '@/lib/addQuery';  
import Table from '@/components/Table/Table';  
import Pagination from '@/components/Pagination/Pagination';  
import PageSize from '@/components/Pagesize/Pagesize';   
import { selectTableAttribute } from '@/utils/helper/selectTableAttribute';  
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

const QueryComponent = () => {
  const [activeTab, setActiveTab] = useState('addQuery');  
  const [queries, setQueries] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [newQuery, setNewQuery] = useState('');
  const [loading, setLoading] = useState(false);  // Add loading state

  const tableHeaders = ['Sr. No.', 'Query', 'Admin Response', 'Status'];

  useEffect(() => {
    const fetchQueries = async () => {
      if (activeTab === 'myQueries') {
        try {
          const response = await getMyQueryService(currentPage, pageSize);
          const filteredQueries = selectTableAttribute(response.data, ['query', 'adminResponse', 'status']);
          setQueries(filteredQueries);   
          setTotalCount(response.totalCount);   
        } catch (error) {
          toast.error('Error fetching queries. Please try again.');  // Replace alert with Toastify
        }
      }
    };

    fetchQueries();
  }, [activeTab, currentPage, pageSize]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);   
  };

  const handleAddQuery = async () => {
    if (!newQuery.trim()) {
      toast.error('Please enter a query!');  // Replace alert with Toastify
      return;
    }

    setLoading(true);  // Set loading to true when submitting the query

    try {
      await addQueryService(newQuery);
      toast.success('Query submitted successfully!');  // Replace alert with Toastify
      setNewQuery('');
      setActiveTab('myQueries');  
      setCurrentPage(1);  
    } catch (error) {
      toast.error('Error adding query. Please try again.');  // Replace alert with Toastify
    } finally {
      setLoading(false);  // Set loading to false once the request is complete
    }
  };

  const addSerialNumbers = (queriesData) => {
    return queriesData.map((query, index) => ({
      srNo: index + 1,   
      query: query.query,
      adminResponse: query.adminResponse || '',  
      status: query.status
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-teal-500 text-white py-10">  
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold mb-4 text-white">Manage Your Queries</h1> 
        <p className="text-xl max-w-2xl mx-auto text-white">Submit new queries or view your existing queries from here.</p>  
      </div>

      <div className="w-full max-w-3xl mx-auto p-8 bg-white bg-opacity-90 rounded-lg shadow-xl">
        
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'addQuery' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabChange('addQuery')}
          >
            Add Query
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'myQueries' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTabChange('myQueries')}
          >
            My Queries
          </button>
        </div>

        {activeTab === 'addQuery' && (
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Add New Query</h3> 
            <textarea
              className="w-full p-4 border border-gray-300 rounded-md text-gray-800"  
              rows={4}
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              placeholder="Enter your query here"
            />
            <button
              className="mt-4 w-full px-6 py-3 bg-green-600 text-white rounded-md"
              onClick={handleAddQuery}
            >
              {loading ? 'Submitting...' : 'Submit Query'}  {/* Show 'Submitting...' while loading */}
            </button>
          </div>
        )}

        {activeTab === 'myQueries' && queries.length > 0 && (
          <>
            <Table
              headers={tableHeaders}   
              tableData={addSerialNumbers(queries)}  
            />
            
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalCount / pageSize)} 
              onPageChange={setCurrentPage}
            />
            <PageSize 
              pageSize={pageSize} 
              onPageSizeChange={setPageSize}
            />
          </>
        )}

        {activeTab === 'myQueries' && queries.length === 0 && (
          <div className="text-center text-gray-500 mt-6">No queries found.</div>
        )}
      </div>

      {/* Toast Container to render the toasts globally */}
      <ToastContainer />  
    </div>
  );
};

export default QueryComponent;
