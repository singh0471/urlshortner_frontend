'use client'

import React, { useState } from 'react';
import createPlansService from '@/lib/createPlansService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePlan = () => {
  const [type, setType] = useState('');  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    urlLimit: '',
    customUrlLimit: '',
    clicksPerUrl: '',
    numberOfUrlsRenewed: '',
    totalClicksPerUrl: '',
  });
  const [error, setError] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setFormData({ ...formData, amount: '' }); // Reset amount when plan type changes
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (['urlLimit', 'customUrlLimit', 'clicksPerUrl', 'numberOfUrlsRenewed', 'totalClicksPerUrl', 'amount'].includes(name)) {
      if (!/^\d*\.?\d{0,2}$/.test(value)) {
        toast.error('Please enter a valid number with up to 2 decimal places.');
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, amount, urlLimit, customUrlLimit, clicksPerUrl, numberOfUrlsRenewed, totalClicksPerUrl } = formData;

    const namePattern = /^[A-Za-z\s]+$/;
    if (!name || !namePattern.test(name)) {
      toast.error('Name should only contain letters and spaces.');
      return false;
    }

    if (amount && !/^\d+(\.\d{1,2})?$/.test(amount)) {
      toast.error('Amount must have a maximum of 2 decimal places.');
      return false;
    }

    const integerFields = [urlLimit, customUrlLimit, clicksPerUrl, numberOfUrlsRenewed, totalClicksPerUrl];
    for (let field of integerFields) {
      if (field && !Number.isInteger(parseFloat(field))) {
        toast.error('Limits and clicks fields must be integers.');
        return false;
      }
    }

    if (customUrlLimit && parseInt(customUrlLimit) > parseInt(urlLimit)) {
      toast.error('Custom URL Limit cannot exceed URL Limit.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const planData = { ...formData, type };

    try {
      const response = await createPlansService(planData);
      toast.success('Plan created successfully!');
      console.log(response);

      // Reset the form after successful creation
      setFormData({
        name: '',
        description: '',
        amount: '',
        urlLimit: '',
        customUrlLimit: '',
        clicksPerUrl: '',
        numberOfUrlsRenewed: '',
        totalClicksPerUrl: '',
      });
      setType(''); // Reset plan type
    } catch (error) {
      const errorMessage =
        error?.response?.data?.specificMessage || 'Plan with this name already exists';
      toast.error(errorMessage);
      console.error('Error creating plan:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 bg-white bg-opacity-80 rounded-lg shadow-xl">
        <ToastContainer />
        <h2 className="text-3xl font-semibold text-center text-teal-600 mb-6">Create New Plan</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>

          <div>
            <label className="block text-lg font-semibold text-gray-700">Select Plan Type:</label>
            <select
              value={type}
              onChange={handleTypeChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select a Plan Type</option>
              <option value="url">URL Plan</option>
              <option value="clicks">Clicks Plan</option>
            </select>
          </div>

          {type === 'url' && (
            <>
              <div>
                <label className="block text-lg font-semibold text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Plan Name"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Plan Description"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700">URL Limit:</label>
                  <input
                    type="number"
                    name="urlLimit"
                    value={formData.urlLimit}
                    onChange={handleInputChange}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                    placeholder="Enter URL Limit"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-700">Custom URL Limit:</label>
                  <input
                    type="number"
                    name="customUrlLimit"
                    value={formData.customUrlLimit}
                    onChange={handleInputChange}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                    placeholder="Enter Custom URL Limit"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">Clicks Per URL:</label>
                <input
                  type="number"
                  name="clicksPerUrl"
                  value={formData.clicksPerUrl}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Clicks Per URL"
                  required
                />
              </div>
            </>
          )}

          {type === 'clicks' && (
            <>
              <div>
                <label className="block text-lg font-semibold text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Plan Name"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Plan Description"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700">Number of URLs Renewed:</label>
                  <input
                    type="number"
                    name="numberOfUrlsRenewed"
                    value={formData.numberOfUrlsRenewed}
                    onChange={handleInputChange}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                    placeholder="Enter Number of URLs Renewed"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-700">Total Clicks per URL:</label>
                  <input
                    type="number"
                    name="totalClicksPerUrl"
                    value={formData.totalClicksPerUrl}
                    onChange={handleInputChange}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                    placeholder="Enter Total Clicks per URL"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {type && (
            <div>
              <label className="block text-lg font-semibold text-gray-700">Amount:</label>
              <input
                type="number"
                step="0.01"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                placeholder="Enter Amount"
                required
              />
            </div>
          )}

          <div className="text-center">
            <button type="submit" className="px-6 py-3 mt-6 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700">
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlan;
