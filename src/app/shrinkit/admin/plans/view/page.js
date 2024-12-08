'use client';

import React, { useState, useEffect } from 'react';
import getAllUrlPlanService from '@/lib/getAllUrlPlansService';
import getAllClicksPlanService from '@/lib/getAllClicksPlanService';
import deletePlanService from '@/lib/deletePlansService';
import Pagination from '@/components/Pagination/Pagination';
import PageSize from '@/components/Pagesize/Pagesize';
import DownloadCsv from '@/components/DownloadComponents/DownloadComponents';
import Filter from '@/components/filter/filter';

const ViewPlans = () => {
  const [urlPlans, setUrlPlans] = useState([]);
  const [clickPlans, setClickPlans] = useState([]);
  const [currentUrlPage, setCurrentUrlPage] = useState(1);  
  const [currentClickPage, setCurrentClickPage] = useState(1);  
  const [urlPageSize, setUrlPageSize] = useState(4);  
  const [clickPageSize, setClickPageSize] = useState(4);  
  const [urlTotalCount, setUrlTotalCount] = useState(0);  
  const [clickTotalCount, setClickTotalCount] = useState(0);  
  const [urlAllData, setUrlAllData] = useState(null);  
  const [clickAllData, setClickAllData] = useState(null);  
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [selectedPlanId, setSelectedPlanId] = useState(null); 
  const [activeSection, setActiveSection] = useState('url');

 
  const [urlNameFilter, setUrlNameFilter] = useState('');
  const [clickNameFilter, setClickNameFilter] = useState('');

 
  const fetchUrlPlans = async () => {
    try {
      const { data, totalCount } = await getAllUrlPlanService(currentUrlPage, urlPageSize, urlNameFilter);
      const getAllData = await getAllUrlPlanService(1, 1000);
      setUrlPlans(data);
      setUrlTotalCount(totalCount);
      setUrlAllData(getAllData.data);
    } catch (error) {
      console.error('Error fetching URL plans:', error);
    }
  };

 
  const fetchClickPlans = async () => {
    try {
      const { data, totalCount } = await getAllClicksPlanService(currentClickPage, clickPageSize, clickNameFilter);
      const getAllData = await getAllClicksPlanService(1, 1000);
      setClickPlans(data);
      setClickTotalCount(totalCount);
      setClickAllData(getAllData.data);
    } catch (error) {
      console.error('Error fetching Click plans:', error);
    }
  };

  useEffect(() => {
    if (activeSection === 'url') {
      fetchUrlPlans();
    } else {
      fetchClickPlans();
    }
  }, [currentUrlPage, urlPageSize, currentClickPage, clickPageSize, activeSection, urlNameFilter, clickNameFilter]);

  const urlTableHeaders = ['Sr. No.', 'Name', 'Description', 'Clicks per URL', 'URL Limit', 'Custom URL Limit', 'Amount', 'Delete'];
  const clickTableHeaders = ['Sr. No.', 'Name', 'Description', 'Number of URLs Renewed', 'Total Clicks per URL', 'Amount', 'Delete'];

  const urlTableData = urlPlans.map((plan, index) => ({
    srNo: (currentUrlPage - 1) * urlPageSize + index + 1, 
    name: plan.name,
    description: plan.description,
    clicksPerUrl: plan.clicksPerUrl,
    urlLimit: plan.urlLimit,
    customUrlLimit: plan.customUrlLimit,
    amount: plan.amount,
    id: plan.id,   
  }));

  const clickTableData = clickPlans.map((plan, index) => ({
    srNo: (currentClickPage - 1) * clickPageSize + index + 1, 
    name: plan.name,
    description: plan.description,
    numberOfUrlsRenewed: plan.numberOfUrlsRenewed,
    totalClicksPerUrl: plan.totalClicksPerUrl,
    amount: plan.amount,
    id: plan.id,  
  }));

  const totalUrlPages = Math.ceil(urlTotalCount / urlPageSize);
  const totalClickPages = Math.ceil(clickTotalCount / clickPageSize);

  const handleUrlPageChange = (newPage) => setCurrentUrlPage(newPage);
  const handleClickPageChange = (newPage) => setCurrentClickPage(newPage);
  const handleUrlPageSizeChange = (newPageSize) => { setUrlPageSize(newPageSize); setCurrentUrlPage(1); };
  const handleClickPageSizeChange = (newPageSize) => { setClickPageSize(newPageSize); setCurrentClickPage(1); };

  const handleDeleteClick = (planId) => {
    console.log('Plan ID in handleDeleteClick:', planId);  
    setSelectedPlanId(planId);   
    setShowDeleteModal(true);     
  };

  const handleCloseModal = () => setShowDeleteModal(false);

  const handleDeletePlan = async () => {
    console.log('Deleting plan with ID:', selectedPlanId);  
    try {
      if (!selectedPlanId) {
        console.error('No plan ID available to delete');
        return;
      }
      await deletePlanService(selectedPlanId);   
      setShowDeleteModal(false);   
      if (activeSection === 'url') {
        fetchUrlPlans();   
      } else {
        fetchClickPlans(); 
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  return (
    <div className="admin-plans-container min-h-screen bg-gradient-to-r from-teal-500 to-blue-500 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-center mb-6">View All Plans</h1>

      
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveSection('url')}
          className={`px-6 py-2 rounded ${activeSection === 'url' ? 'bg-teal-600' : 'bg-teal-400'} text-white`}
        >
          URL Plans
        </button>
        <button 
          onClick={() => setActiveSection('click')}
          className={`px-6 py-2 rounded ${activeSection === 'click' ? 'bg-teal-600' : 'bg-teal-400'} text-white`}
        >
          Click Plans
        </button>
      </div>

      
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg mb-8">
        {activeSection === 'url' && (
          <>
            <h2 className="text-2xl font-semibold mb-4">URL Plans</h2>
            
            
            <div className="mb-4 flex gap-4">
              <Filter 
                label="Name" 
                attribute="name" 
                value={urlNameFilter} 
                onFilterChange={(attribute, value) => setUrlNameFilter(value)} 
              />
            </div>

            <div className="flex items-center gap-4 ml-auto mb-4">
              <DownloadCsv
                data={urlAllData}   
                headers={['name', 'description', 'clicksPerUrl', 'urlLimit', 'customUrlLimit', 'amount']}  
                fileName="url_plans.csv"
              />
            </div>

           
            <div className="overflow-x-auto w-full mt-4">
              <table className="w-full table-auto bg-teal-50 border-collapse shadow-lg rounded-lg border border-gray-300">
                <thead>
                  <tr>
                    {urlTableHeaders.map((header, index) => (
                      <th key={index} className="px-4 py-2 bg-teal-600 text-white text-left text-sm font-bold capitalize border border-gray-300">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {urlTableData.map((row, rowIndex) => (
                    <tr key={rowIndex} className={`hover:bg-teal-100 ${rowIndex % 2 === 0 ? 'bg-teal-50' : 'bg-teal-200'}`}>
                      {Object.keys(row).map((key, cellIndex) => (
                        key !== 'id' && 
                        <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700 text-center border border-gray-300 overflow-hidden text-ellipsis">
                          {row[key]}
                        </td>
                      ))}
                      <td className="px-4 py-2 text-center border border-gray-300">
                        <button 
                          onClick={() => handleDeleteClick(row.id)} 
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            <div className="flex justify-between items-center mt-6">
              <div className="flex justify-start w-1/2">
                <PageSize pageSize={urlPageSize} onPageSizeChange={handleUrlPageSizeChange} />
              </div>
              <div className="flex justify-center w-1/2">
                <Pagination
                  currentPage={currentUrlPage}
                  totalPages={totalUrlPages}
                  onPageChange={handleUrlPageChange}
                />
              </div>
            </div>
          </>
        )}

        {activeSection === 'click' && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Click Plans</h2>

           
            <div className="mb-4 flex gap-4">
              <Filter 
                label="Name" 
                attribute="name" 
                value={clickNameFilter} 
                onFilterChange={(attribute, value) => setClickNameFilter(value)} 
              />
            </div>

            <div className="flex items-center gap-4 ml-auto mb-4">
              <DownloadCsv
                data={clickAllData}  
                headers={['name', 'description', 'numberOfUrlsRenewed', 'totalClicksPerUrl', 'amount']}  
                fileName="click_plans.csv"
              />
            </div>

            
            <div className="overflow-x-auto w-full mt-4">
              <table className="w-full table-auto bg-teal-50 border-collapse shadow-lg rounded-lg border border-gray-300">
                <thead>
                  <tr>
                    {clickTableHeaders.map((header, index) => (
                      <th key={index} className="px-4 py-2 bg-teal-600 text-white text-left text-sm font-bold capitalize border border-gray-300">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clickTableData.map((row, rowIndex) => (
                    <tr key={rowIndex} className={`hover:bg-teal-100 ${rowIndex % 2 === 0 ? 'bg-teal-50' : 'bg-teal-200'}`}>
                      {Object.keys(row).map((key, cellIndex) => (
                        key !== 'id' && 
                        <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700 text-center border border-gray-300 overflow-hidden text-ellipsis">
                          {row[key]}
                        </td>
                      ))}
                      <td className="px-4 py-2 text-center border border-gray-300">
                        <button 
                          onClick={() => handleDeleteClick(row.id)} 
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

           
            <div className="flex justify-between items-center mt-6">
              <div className="flex justify-start w-1/2">
                <PageSize pageSize={clickPageSize} onPageSizeChange={handleClickPageSizeChange} />
              </div>
              <div className="flex justify-center w-1/2">
                <Pagination
                  currentPage={currentClickPage}
                  totalPages={totalClickPages}
                  onPageChange={handleClickPageChange}
                />
              </div>
            </div>
          </>
        )}
      </div>
 
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-black">Confirm Deletion</h2>
            <p className="text-sm mb-4 text-black">Are you sure you want to delete this plan?</p>
            <div className="flex justify-between">
              <button 
                onClick={handleCloseModal} 
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeletePlan} 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPlans;
