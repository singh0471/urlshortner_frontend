'use client';
import React, { useState, useEffect } from 'react';
import createShortUrlService from '@/lib/createShortUrlService'; 
import getMyUrlPlansService from '@/lib/getMyUrlPlansService';
import Toast from '@/components/Toast/Toast';

const GenerateUrlComponent = () => {
  const [longUrl, setLongUrl] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [isCustom, setIsCustom] = useState(false);  
  const [customUrl, setCustomUrl] = useState(''); 
  const [shortUrl, setShortUrl] = useState('');  
  const [toast, setToast] = useState({ message: '', type: '', visible: false });  

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getMyUrlPlansService();
        setPlans(response.data);  
      } catch (error) {
        
      }
    };

    fetchPlans();
  }, []);


  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast({ message: '', type: '', visible: false });
    }, 3000);  
  };

  const handleLongUrlChange = (e) => {
    setLongUrl(e.target.value);
  };

  const handlePlanChange = (e) => {
    const selected = plans.find((plan) => plan.id === e.target.value);
    setSelectedPlan(selected);
    setIsCustom(false);  
    setCustomUrl('');  
  };

  const handleCustomUrlToggle = () => {
    if (selectedPlan.customUrlLeft <= 0) {
      showToast('You cannot create a custom URL with this plan as customUrlLeft is 0.', 'error');
      setIsCustom(false);
    } else {
      setIsCustom(!isCustom);
    }
  };

  const handleCustomUrlChange = (e) => {
    setCustomUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longUrl || !selectedPlan) {
      showToast('Please provide both a URL and select a plan.', 'error');
      return;
    }

    try {
      const requestData = {
        userPlanId: selectedPlan.id,  
        actualUrl: longUrl,  
        isCustom,  
      };

      if (isCustom && customUrl) {
        requestData.customUrl = customUrl;  
      }

      const response = await createShortUrlService(requestData);
      setShortUrl(`localhost:4000/${response.data.shortUrl}`);
      showToast('Short URL created successfully!', 'success');
    } catch (error) {
      if (error.response?.data?.specificMessage) {
        showToast(error.response.data.specificMessage, 'error');
      } else {
        showToast('Error creating short URL. Please try again.', 'error');
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
     
      <div className="mt-16 mb-12 px-4 text-center">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Generate Short URL</h2>
      </div>

      <div className="w-full max-w-3xl px-6 py-8 bg-white bg-opacity-80 rounded-lg shadow-xl mx-auto">
        <form onSubmit={handleSubmit}>
          
          <div className="mb-6">
            <label htmlFor="longUrl" className="block text-xl font-medium text-gray-700">Enter Long URL:</label>
            <input
              type="url"
              id="longUrl"
              value={longUrl}
              onChange={handleLongUrlChange}
              className="mt-2 w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          {/* Display a message if there are no plans */}
          {plans.length === 0 ? (
            <div className="mb-6 text-center text-xl text-red-600">
              You have no active plans to buy URL.
            </div>
          ) : (
            <div className="mb-6">
              <label htmlFor="plan" className="block text-xl font-medium text-gray-700">Select Plan:</label>
              <select 
                id="plan"
                onChange={handlePlanChange}
                value={selectedPlan?.id || ''}
                className="mt-2 w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              >
                <option value="" disabled>Select a Plan</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {`${plan.planName} - ${plan.urlLeft} URLs Left, ${plan.customUrlLeft} Custom URLs Left, ${plan.totalClicksPerUrl} Clicks/URL`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedPlan && selectedPlan.customUrlLeft > 0 && (
            <div className="mb-6 flex items-center">
              <button
                type="button"
                onClick={handleCustomUrlToggle}
                className={`mr-4 px-6 py-3 rounded-md text-lg ${isCustom ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
              >
                {isCustom ? 'Disable Custom URL' : 'Enable Custom URL'}
              </button>
            </div>
          )}

          {isCustom && (
            <div className="mb-6">
              <label htmlFor="customUrl" className="block text-xl font-medium text-gray-700">Enter Custom URL:</label>
              <input
                type="text"
                id="customUrl"
                value={customUrl}
                onChange={handleCustomUrlChange}
                className="mt-2 w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          )}

          <div className="mt-6 mb-6">
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-4 px-8 rounded-md text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Generate Short URL
            </button>
          </div>
        </form>

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold text-green-600">Your Short URL is:</p>
            <p className="text-xl text-blue-600">{shortUrl}</p> 
          </div>
        )}

        {toast.visible && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ message: '', type: '', visible: false })}
          />
        )}
      </div>
    </div>
  );
};

export default GenerateUrlComponent;
