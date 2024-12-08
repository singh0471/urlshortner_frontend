'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getAllUrlPlanService from '@/lib/getAllUrlPlansService';
import getAllClicksPlanService from '@/lib/getAllClicksPlanService';
import updatePlanService from '@/lib/updatePlanService';

const UpdatePlan = () => {
  const [type, setType] = useState('');
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
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

  useEffect(() => {
    if (type === 'url') {
      getAllUrlPlans();
    } else if (type === 'clicks') {
      getAllClicksPlans();
    }
  }, [type]);

  const getAllUrlPlans = async () => {
    try {
      const response = await getAllUrlPlanService(1, 100);
      setPlans(response.data);
    } catch (error) {
      toast.error('Error fetching URL plans.');
    }
  };

  const getAllClicksPlans = async () => {
    try {
      const response = await getAllClicksPlanService(1, 100);
      setPlans(response.data);
    } catch (error) {
      toast.error('Error fetching Clicks plans.');
    }
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setSelectedPlan('');
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If the field is `customUrlLimit` and the value exceeds `urlLimit`, show an error toast
    if (name === 'customUrlLimit') {
      if (parseInt(value) > parseInt(formData.urlLimit)) {
        toast.error('Custom URL Limit cannot exceed URL Limit.');
        return; // Do not update the state if validation fails
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleUpdatePlan = async (e) => {
    e.preventDefault();
    try {
      const updatedData = Object.keys(formData).map((key) => ({
        parameter: key,
        value: formData[key],
      }));
      const response = await updatePlanService(selectedPlan, updatedData);
      toast.success('Plan updated successfully!');
      console.log(response);

      // Reset form data and selected plan after successful update
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
      setSelectedPlan('');
      setType('');
    } catch (error) {
      toast.error('plan name already exists.');
    }
  };

  // Fill form data when a plan is selected
  const handlePlanSelect = (planId) => {
    const selected = plans.find((plan) => plan.id === planId);
    if (selected) {
      setSelectedPlan(selected.id);
      setFormData({
        name: selected.name || '',
        description: selected.description || '',
        amount: selected.amount || '',
        urlLimit: selected.urlLimit || '',
        customUrlLimit: selected.customUrlLimit || '',
        clicksPerUrl: selected.clicksPerUrl || '',
        numberOfUrlsRenewed: selected.numberOfUrlsRenewed || '',
        totalClicksPerUrl: selected.totalClicksPerUrl || '',
      });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-teal-500 to-blue-500 text-white">
      <ToastContainer />
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-xl mt-20">
        <h2 className="text-4xl font-semibold text-center text-teal-600 mb-8">Update Plan</h2>

        <form className="space-y-6" onSubmit={handleUpdatePlan}>
          {/* Plan Type Selection */}
          <div>
            <label className="block text-lg font-semibold text-black">Select Plan Type:</label>
            <select
              value={type}
              onChange={handleTypeChange}
              className="w-full p-4 mt-6 border border-gray-300 rounded-lg text-black"
              required
            >
              <option value="">Select Plan Type</option>
              <option value="url">URL Plan</option>
              <option value="clicks">Clicks Plan</option>
            </select>
          </div>

          {/* Only show the plan dropdown if a plan type is selected */}
          {type && (
            <div>
              <label className="block text-lg font-semibold text-black">Select Plan:</label>
              <select
                value={selectedPlan}
                onChange={(e) => handlePlanSelect(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-black"
                required
              >
                <option value="">Select a Plan</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Only show the fields below if a plan is selected */}
          {selectedPlan && (
            <>
              {/* Name */}
              <div>
                <label className="block text-lg font-semibold text-black">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-black"
                  placeholder="Enter Plan Name"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-lg font-semibold text-black">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-black"
                  placeholder="Enter Plan Description"
                  required
                />
              </div>

              {/* Conditional Fields */}
              {type === 'url' && (
                <>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-black">URL Limit:</label>
                      <input
                        type="number"
                        name="urlLimit"
                        value={formData.urlLimit}
                        onChange={handleInputChange}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-black"
                        placeholder="Enter URL Limit"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold text-black">Custom URL Limit:</label>
                      <input
                        type="number"
                        name="customUrlLimit"
                        value={formData.customUrlLimit}
                        onChange={handleInputChange}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-black"
                        placeholder="Enter Custom URL Limit"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-black">Clicks Per URL:</label>
                    <input
                      type="number"
                      name="clicksPerUrl"
                      value={formData.clicksPerUrl}
                      onChange={handleInputChange}
                      className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-black"
                      placeholder="Enter Clicks Per URL"
                      required
                    />
                  </div>
                </>
              )}

              {type === 'clicks' && (
                <>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-black">Number of URLs Renewed:</label>
                      <input
                        type="number"
                        name="numberOfUrlsRenewed"
                        value={formData.numberOfUrlsRenewed}
                        onChange={handleInputChange}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-black"
                        placeholder="Enter Number of URLs Renewed"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold text-black">Total Clicks per URL:</label>
                      <input
                        type="number"
                        name="totalClicksPerUrl"
                        value={formData.totalClicksPerUrl}
                        onChange={handleInputChange}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-black"
                        placeholder="Enter Total Clicks per URL"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Amount */}
              <div>
                <label className="block text-lg font-semibold text-black">Amount:</label>
                <input
                  type="number"
                  step="0.01"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-black"
                  placeholder="Enter Amount"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full p-3 mt-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                >
                  Update Plan
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdatePlan;
