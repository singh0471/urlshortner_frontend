'use client';

import React, { useState, useEffect } from 'react';
import getMyUrlsService from '@/lib/getMyUrlService';
import deleteUrlService from '@/lib/deleteUrlService';

const DeleteUrlComponent = () => {
  const [urlsData, setUrlsData] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
   
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState('');

  const fetchUrls = async () => {
    setLoading(true);
    try {
      const { data } = await getMyUrlsService(1, 1000, {});
      setUrlsData(data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
      setErrorMessage('Failed to load URLs.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUrl = () => {
    if (!selectedUrl) {
      setErrorMessage('Please select a URL to delete.');
      return;
    }

    setUrlToDelete(selectedUrl);   
    setIsModalOpen(true);          
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await deleteUrlService(urlToDelete);
      if (response.status === 200) {
        setSuccessMessage('URL successfully deleted.');
        setSelectedUrl('');
        fetchUrls();  
      }
    } catch (error) {
      console.error('Error deleting URL:', error);
      setErrorMessage('Failed to delete the URL.');
    } finally {
      setLoading(false);
      setIsModalOpen(false);  
      setUrlToDelete(''); 
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  
    setUrlToDelete('');  
  };

  useEffect(() => {
    fetchUrls(); 
  }, []);

  return (
    <div className="min-h-screen bg-[#efefef] text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-teal-600">Delete URL</h1>

       
      <div className="w-full bg-white p-12 rounded-lg shadow-xl mb-8 max-w-4xl">
        {loading && <div className="text-center text-lg text-black italic mt-4">Loading...</div>}

        <div className="mb-6">
          <label htmlFor="url" className="block text-sm font-medium text-gray-600">Choose URL to Delete</label>
          <select
            id="url"
            value={selectedUrl}
            onChange={(e) => setSelectedUrl(e.target.value)}
            className="w-full p-2 text-black border border-gray-300 rounded bg-gray-50 focus:border-teal-500 focus:outline-none"
          >
            <option value="">Select URL</option>
            {urlsData.map((url) => (
              <option key={url.id} value={url.id}>{url.shortUrl}</option>
            ))}
          </select>
        </div>

        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

        <button
          onClick={handleDeleteUrl}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-xs "
        >
          Delete URL
        </button>
      </div>

       
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold text-center text-black">Are you sure you want to delete this URL?</h2>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleConfirmDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300"
              >
                Yes
              </button>
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition duration-300"
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

export default DeleteUrlComponent;
