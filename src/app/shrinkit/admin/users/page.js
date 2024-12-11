'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import getAllUsersService from '@/lib/getAllUsersService';
import addToBlacklistService from '@/lib/addToBlacklistService';
import Pagination from '@/components/Pagination/Pagination';
import PageSize from '@/components/Pagesize/Pagesize';
import Filter from '@/components/filter/filter'; 
import DownloadCsv from '@/components/DownloadComponents/DownloadComponents';
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [showUrlsModal, setShowUrlsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalData, setModalData] = useState([]);
  const [allData,setAllData] = useState(null);

  
  const [deactivationReason, setDeactivationReason] = useState('');
  const [deactivatingUserId, setDeactivatingUserId] = useState(null);

  
  const [filters, setFilters] = useState({
    username: '',
    firstName: '',
    lastName: '',
  });

  const [applyFilters, setApplyFilters] = useState(false);   

   
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, totalCount } = await getAllUsersService(currentPage, pageSize, filters);
      setUsers(data);

      const getAllData = await getAllUsersService(1,1000,{});
      setAllData(getAllData.data);
      setTotalCount(totalCount);
    } catch (error) {
      toast.error('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  
  const deactivateUser = (user) => {
    setDeactivatingUserId(user.id || user.userId);
    setDeactivationReason('');
  };

  const handleDeactivateConfirm = async () => {
    if (!deactivationReason.trim()) {
      toast.error('Please provide a reason for deactivation');
      return;
    }

    try {
      await addToBlacklistService(deactivatingUserId, deactivationReason);
      toast.success('User successfully deactivated');
      fetchUsers();  
      closeModal(); 
    } catch (error) {
      toast.error('Error deactivating user');
    }
  };

  // Handle fetching plans for the modal
  // const handleShowPlans = (user) => {
  //   if (!user || !Array.isArray(user.plans) || user.plans.length === 0) {
  //     toast.info("No plans available for this user.");
  //     setShowPlansModal(false);
  //     return;
  //   }

  //   const planNames = user.plans.map(plan => plan.planName);
  //   setSelectedUser(user);
  //   setModalData(planNames);
  //   setShowPlansModal(true);
  // };

  // Handle fetching plans for the modal
const handleShowPlans = (user) => {
  if (!user || !Array.isArray(user.plans) || user.plans.length === 0) {
    setModalData([]); // Ensure modal data is cleared
    setShowPlansModal(true); // Open the modal even when no plans
    return; // Exit early if no plans are found
  }

  const planNames = user.plans.map(plan => plan.planName);
  setSelectedUser(user);
  setModalData(planNames);
  setShowPlansModal(true);
};


  // Handle fetching URLs for the modal
  const handleShowUrls = (user) => {
    setSelectedUser(user);
    setModalData(user.urls || []);
    setShowUrlsModal(true);
  };

  const closeModal = () => {
    setShowPlansModal(false);
    setShowUrlsModal(false);
    setDeactivatingUserId(null);
    setDeactivationReason('');
    setSelectedUser(null);
    setModalData([]);
  };

   
  useEffect(() => {
    fetchUsers();  
  }, [currentPage, pageSize]);  

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
    fetchUsers();  
  };

  const handleRemoveFilters = () => {
    setFilters({
      username: '',
      firstName: '',
      lastName: ''
    });
    fetchUsers();  
  };

  const tableData = () => {
    return users.map((user, index) => ({
      srNo: (currentPage - 1) * pageSize + index + 1,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      totalRevenue: user.totalRevenue,
      userId: user.id,
      urls: user.urls,
      plans: user.usersPlans
    }));
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="admin-users-container min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">All Users</h1>

      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg mb-8">

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

        <div className="flex items-center gap-4 ml-auto">
              <DownloadCsv
                data={allData}  // This will only contain blacklisted users now
                headers={['username', 'firstName', 'lastName','totalRevenue']}  // Define which columns to include
                fileName="all_users.csv"
              />
            </div>

        {/* Table */}
        <div className="overflow-x-auto w-full mt-4">
          {loading ? (
            <div className="text-center text-lg text-gray-500 italic mt-4">Loading...</div>
          ) : (
            <table className="w-full table-auto bg-teal-50 border-collapse shadow-lg rounded-lg border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-teal-600 text-white text-left text-sm font-bold capitalize border border-gray-300">Sr No.</th>
                  <th className="px-4 py-2 bg-teal-600 text-white text-left text-sm font-bold capitalize border border-gray-300">Username</th>
                  <th className="px-4 py-2 bg-teal-600 text-white text-left text-sm font-bold capitalize border border-gray-300">First Name</th>
                  <th className="px-4 py-2 bg-teal-600 text-white text-left text-sm font-bold capitalize border border-gray-300">Last Name</th>
                  <th className="px-4 py-2 bg-teal-600 text-white text-left text-sm font-bold capitalize border border-gray-300">Total Revenue</th>
                  <th className="px-4 py-2 bg-teal-600 text-white text-left text-sm font-bold capitalize border border-gray-300">Plans</th>
                  <th className="px-4 py-2 bg-teal-600 text-white text-left text-sm font-bold capitalize border border-gray-300">URLs</th>
                  <th className="px-4 py-2 bg-teal-600 text-white text-left text-sm font-bold capitalize border border-gray-300">Deactivate</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-lg text-gray-500 italic mt-4">No users found</td>
                  </tr>
                ) : (
                  <>
                    {tableData().map((user, index) => (
                      <tr key={index} className={`hover:bg-teal-100 ${index % 2 === 0 ? 'bg-teal-50' : 'bg-teal-200'}`}>
                        <td className="px-4 py-2 text-sm text-gray-700 text-center border border-gray-300">{user.srNo}</td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-center border border-gray-300">{user.username}</td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-center border border-gray-300">{user.firstName}</td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-center border border-gray-300">{user.lastName}</td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-center border border-gray-300">{user.totalRevenue}</td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-center border border-gray-300">
                          <button
                            onClick={() => handleShowPlans(user)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >
                            View Plans
                          </button>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-center border border-gray-300">
                          <button
                            onClick={() => handleShowUrls(user)}
                            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                          >
                            View URLs
                          </button>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-center border border-gray-300">
                          <button
                            onClick={() => deactivateUser(user)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          >
                            Deactivate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination and Page Size */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex justify-start w-1/2">
            <PageSize pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
          </div>

          <div className="flex justify-center w-1/2">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>

      {/* Modal for Plans */}
      {showPlansModal && (
        <div className="modal fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold text-teal-700 mb-4">Plans</h2>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-teal-600 text-left px-4 py-2">Plan Name</th>
                </tr>
              </thead>
              <tbody>
                {modalData.length > 0 ? (
                  modalData.map((plan, index) => (
                    <tr key={index} className="hover:bg-teal-100">
                      <td className="text-sm text-gray-700 px-4 py-2">{plan}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="1" className="text-center text-gray-500 text-sm py-2">No plans available</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}

      {/* Modal for URLs */}
      {showUrlsModal && (
        <div className="modal fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold text-teal-700 mb-4">URLs</h2>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-teal-600 text-left px-4 py-2">Short URL</th>
                </tr>
              </thead>
              <tbody>
                {modalData.length > 0 ? (
                  modalData.map((url, index) => (
                    <tr key={index} className="hover:bg-teal-100">
                      <td className="text-sm text-gray-700 px-4 py-2">{url.shortUrl}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="1" className="text-center text-gray-500 text-sm py-2">No URLs available</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}

      {/* Modal for Deactivation */}
      {deactivatingUserId && (
        <div className="modal fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold text-teal-700 mb-4">Deactivate User</h2>
            <textarea
              value={deactivationReason}
              onChange={(e) => setDeactivationReason(e.target.value)}
              className="w-full h-32 border border-gray-300 p-2 rounded-lg text-black"
              placeholder="Enter reason for deactivation"
            ></textarea>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeactivateConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                disabled={!deactivationReason.trim()}
              >
                Deactivate
              </button>
            </div>

            <button
              onClick={closeModal}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
