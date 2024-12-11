'use client';

import React, { useState, useEffect } from 'react';
import getMyClicksPlansService from '@/lib/getMyClicksPlanService';
import getMyUrlPlansService from '@/lib/getMyUrlPlansService';
import Table from "@/components/Table/Table";
import PageSize from "@/components/Pagesize/Pagesize";
import Pagination from "@/components/Pagination/Pagination";
import { selectTableAttribute } from '@/utils/helper/selectTableAttribute';
import DownloadCsv from '@/components/DownloadComponents/DownloadComponents';
import camelCaseToTitleCase from '@/utils/helper/camelCaseToTitle';
import Filter from '@/components/filter/filter';

const MyPlansPage = () => {

  const [activeSection, setActiveSection] = useState('url');
  const [plansData, setPlansData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");  
  const [filterText, setFilterText] = useState('');   
  const [urlData,setUrlData] = useState('');
  const [clicksData,setClicksData] = useState('');

  const mapUrlPlans = (data) => {
    const requiredColumns = [
      "planName", 
      "totalUrl", 
      "totalCustomUrl", 
      "totalClicksPerUrl", 
      "urlLeft", 
      "customUrlLeft"
    ];
    const selectedData = selectTableAttribute(data, requiredColumns);

    const headers = [
      "Sr. No", 
      ...requiredColumns.map((key) => camelCaseToTitleCase(key))
    ];
    setHeaders(headers);
    
    return selectedData.map((item, index) => ({
      srNo: (page - 1) * pageSize + index + 1,   
      ...item
    }));
  };

  const mapClicksPlans = (data) => {
    const requiredColumns = [
      "planName", 
      "urlRenewLimit", 
      "urlRenewLeft", 
      "clickPerUrlRenew"
    ];
    const selectedData = selectTableAttribute(data, requiredColumns);

    const headers = [
      "Sr. No", 
      ...requiredColumns.map((key) => camelCaseToTitleCase(key))
    ];
    setHeaders(headers);

    return selectedData.map((item, index) => ({
      srNo: (page - 1) * pageSize + index + 1, 
      ...item
    }));
  };

  const fetchPlans = async () => {
    try {
        let response;
        const filters = { filterText };

        if (activeSection === 'url') {
            response = await getMyUrlPlansService(page, pageSize, filters);
            const dataUrl = await getMyUrlPlansService(1,1000,{});
            setUrlData(dataUrl.data);
            console.log(response);
            
            if (response?.data && Array.isArray(response.data)) {
                setPlansData(mapUrlPlans(response.data));   
                setErrorMessage("");   
            } else {
                setPlansData([]);  
                setErrorMessage("No URL plans exist.");
            }
        } else {
            response = await getMyClicksPlansService(page, pageSize, filters);   
            const dataClicks = await getMyClicksPlansService(1,1000,{});
            setClicksData(dataClicks.data);
            console.log(response);

            if (response?.data && Array.isArray(response.data)) {
                setPlansData(mapClicksPlans(response.data));   
                setErrorMessage("");   
            } else {
                setPlansData([]);  
                setErrorMessage("No Clicks plans exist.");
            }
        }

        if (response?.totalCount) {
            setTotalPages(Math.ceil(Number(response.totalCount) / pageSize));
        } else {
            setTotalPages(0);  
        }
    } catch (error) {
        console.error("Error fetching plans:", error);
        setPlansData([]);
        setErrorMessage("No plans exist.");
    } 
  };

  const handlePageChange = (newPage) => setPage(newPage);
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1);  
  };

  const toggleSection = (section) => {
    setActiveSection(section);
    setPage(1);  
  };

  const handleFilterChange = (attribute, value) => {
    if (attribute === 'planName') {
      setFilterText(value);  
      setPage(1);  
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [page, pageSize, activeSection, filterText]);  

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen py-12">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        
        {/* Title and Section Toggle */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600 mb-6">
            My Plans
          </h1>

          {/* Toggle between URL and Clicks plans */}
          <div className="mb-4 text-center">
            <button
              className={`px-6 py-2 rounded-l-lg ${activeSection === 'url' ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-700'}`}
              onClick={() => toggleSection('url')}
            >
              URL Plans
            </button>
            <button
              className={`px-6 py-2 rounded-r-lg ${activeSection === 'clicks' ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-700'}`}
              onClick={() => toggleSection('clicks')}
            >
              Clicks Plans
            </button>
          </div>
        </div>

        {/* Filter Component */}
        <div className="mb-4">
          <Filter
            label="Plan Name"
            attribute="planName"
            value={filterText}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Display Error Message */}
        {errorMessage && (
          <div className="text-center text-red-500 mb-4">
            <p>{errorMessage}</p>
          </div>
        )}

<div className="flex items-center gap-4 ml-auto">
  {activeSection === 'url' ? (
    <DownloadCsv
      data={urlData}
      headers={['planName', 'totalUrl', 'totalCustomUrl', 'totalClicksPerUrl', 'urlLeft', 'customUrlLeft','amount']}
      fileName="my_url_plans.csv"
    />
  ) : (
    <DownloadCsv
      data={clicksData}
      headers={['planName', 'urlRenewLimit', 'urlRenewLeft', 'clicksPerUrlRenew', 'amount']}
      fileName="my_clicks_plan.csv"
    />
  )}
</div>


        {/* Table for displaying plans */}
        {plansData.length > 0 ? (
          <Table headers={headers} tableData={plansData} />
        ) : (
          !errorMessage && <div className="text-center text-gray-500">Loading...</div>
        )}

        {/* Page Size and Pagination */}
        {!errorMessage && plansData.length > 0 && (
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

export default MyPlansPage;
