'use client'

import React, { useState, useEffect } from 'react';
import getAllBlacklistService from '@/lib/getAllBlackListService';
import getBlacklist from '@/lib/getBlacklist';  
import activateUserService from '@/lib/activateUserService';

import Table from '@/components/Table/Table';
import Pagination from '@/components/Pagination/Pagination';
import PageSize from '@/components/Pagesize/Pagesize';
import Filter from '@/components/filter/filter';
import DownloadCsv from '@/components/DownloadComponents/DownloadComponents';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blacklist = () => {
  const [blacklistedUsers, setBlacklistedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalCount, setTotalCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allData, setAllData] = useState([]);
  const [filters, setFilters] = useState({
    username: '',
    firstName: '',
    lastName: ''
  });
  const [applyFilters, setApplyFilters] = useState(false);
  const [blacklistData, setBlacklistData] = useState([]);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false); 

  const fetchBlacklistedUsers = async (filters = {}) => {
    console.log("Filters before making API call:", filters);
    setIsLoading(true); // Start loading

    try {
      const blacklistResponse = await getBlacklist(currentPage, pageSize);
      setBlacklistData(blacklistResponse.data);

      const { data, totalCount } = await getAllBlacklistService(currentPage, pageSize, filters);

      const getAlldata = await getAllBlacklistService(1, 1000, {});
      setAllData(getAlldata.data);
      console.log("All Blacklisted Data: ", getAlldata.data);

      if (Array.isArray(data)) {
        const usersWithDetails = await Promise.all(
          data.map(async (user) => {
            console.log("Mapping user:", user);

            const blacklistEntry = blacklistResponse.data.find(item => item.userId === user.id);
            if (blacklistEntry) {
              console.log("Blacklist entry found for user:", blacklistEntry);
              return {
                ...user,
                reason: blacklistEntry.reason || 'No reason provided',
                adminResponse: blacklistEntry.adminResponse || 'No response',
              };
            } else {
              console.log("No blacklist entry found for user:", user.id);
              return {
                ...user,
                reason: 'No reason provided',
                adminResponse: 'No response'
              };
            }
          })
        );
        setBlacklistedUsers(usersWithDetails);
      } else {
        console.error("Expected 'data' to be an array but got:", data);
      }
      setTotalCount(totalCount);
    } catch (error) {
      console.error('Error fetching blacklisted users:', error);
      toast.error('Error fetching blacklisted users.');
    } finally {
      setIsLoading(false);  
    }
  };

  useEffect(() => {
    fetchBlacklistedUsers(filters);
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (applyFilters) {
      fetchBlacklistedUsers(filters);
      setApplyFilters(false);
    }
  }, [applyFilters, filters]);

  const tableHeaders = ['Sr. No.', 'Username', 'First Name', 'Last Name', 'Reason', 'Activate'];

  const tableData = blacklistedUsers.map((user, index) => ({
    srNo: (currentPage - 1) * pageSize + index + 1,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    reason: user.reason,
    activate: (
      <button
        onClick={() => handleActivateClick(user)}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
      >
        Activate
      </button>
    ),
  }));

  const handleActivateClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleActivateUser = async () => {
    if (selectedUser) {
      try {
        const response = await activateUserService(selectedUser.id, currentPage, pageSize);
        if (response.status === 200) {
          toast.success('User activated successfully!');
          setShowModal(false);
          fetchBlacklistedUsers(filters);
        }
      } catch (error) {
        console.error('Error activating user:', error);
        toast.error('Error activating user.');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

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
      [attribute]: value
    }));
  };

  const handleApplyFilters = () => {
    setApplyFilters(true);
  };

  const handleRemoveFilters = () => {
    setFilters({
      username: '',
      firstName: '',
      lastName: ''
    });
    setApplyFilters(false);
    fetchBlacklistedUsers({ status: 'blacklisted' });
  };

  return (
    <div className="admin-blacklist-container min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white flex flex-col items-center p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6 text-white">View Blacklisted Users</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl mb-8">
        {/* Filters */}
        <div className="flex flex-wrap justify-start gap-4 items-center mb-6">
          <Filter 
            label="Username" 
            attribute="username" 
            value={filters.username} 
            onFilterChange={handleFilterChange} 
          />
          <Filter 
            label="First Name" 
            attribute="firstName" 
            value={filters.firstName} 
            onFilterChange={handleFilterChange} 
          />
          <Filter 
            label="Last Name" 
            attribute="lastName" 
            value={filters.lastName} 
            onFilterChange={handleFilterChange} 
          />
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

        {/* Loading indicator */}
        {isLoading ? (
          <div className="text-center text-lg text-black italic mt-4">Loading...</div>
        ) : blacklistedUsers && blacklistedUsers.length === 0 ? (
          <div className="text-center text-lg text-black italic mt-4">No blacklisted users</div>
        ) : (
          <>
            <div className="flex items-center gap-4 ml-auto">
              <DownloadCsv
                data={allData}   
                headers={['username', 'firstName', 'lastName']}  
                fileName="blacklisted_users.csv"
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
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to activate this user's account?
            </h3>
            <p className="text-gray-600 mb-6">{selectedUser?.username}</p>
            <div className="flex justify-evenly">
              <button
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
                onClick={handleActivateUser}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
                onClick={handleCloseModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blacklist;
