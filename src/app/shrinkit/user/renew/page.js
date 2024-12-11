'use client';
import React, { useState, useEffect } from 'react';
import getMyClicksPlanService from '@/lib/getMyClicksPlanService';   
import getMyUrlService from '@/lib/getMyUrlService';   
import renewShortUrlService from '@/lib/renewUrlService';  
import Toast from '@/components/Toast/Toast';

const RenewUrlComponent = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [urls, setUrls] = useState([]);
  const [selectedUrls, setSelectedUrls] = useState([]);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getMyClicksPlanService();
        setPlans(response.data);
      } catch (error) {
        showToast('You have no plans to renew URLs');
      }
    };

    const fetchUrls = async () => {
      try {
        const response = await getMyUrlService();
        setUrls(response.data);   
      } catch (error) {
        showToast('Error fetching URLs. Please try again.', 'error');
      }
    };

    fetchPlans();
    fetchUrls();
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast({ message: '', type: '', visible: false });
    }, 3000);
  };

  const handlePlanChange = (e) => {
    const selected = plans.find((plan) => plan.id === e.target.value);
    setSelectedPlan(selected);
    setSelectedUrls([]);  
  };

  const handleUrlChange = (e) => {
    const { value } = e.target;
    const newSelectedUrls = [...selectedUrls];

    if (newSelectedUrls.includes(value)) {
      newSelectedUrls.splice(newSelectedUrls.indexOf(value), 1);   
    } else {
      if (newSelectedUrls.length < selectedPlan.urlRenewLeft) {
        newSelectedUrls.push(value);   
      } else {
        showToast('You cannot select more than the allowed renewal limit.', 'error');
      }
    }

    setSelectedUrls(newSelectedUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlan || selectedUrls.length === 0) {
      showToast('Please select both a plan and at least one URL to renew.', 'error');
      return;
    }

    try {
      const requestData = {
        shortUrls: selectedUrls  
      };

      const response = await renewShortUrlService(selectedPlan.id, requestData);
      showToast('URLs renewed successfully!', 'success');
      setSelectedUrls([]);  
    } catch (error) {
      showToast('Error renewing URLs. Please try again.', 'error');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <div className="mt-16 mb-12 px-4 text-center">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Renew Short URLs</h2>
      </div>

      <div className="w-full max-w-3xl px-6 py-8 bg-white bg-opacity-80 rounded-lg shadow-xl mx-auto">
      
        {plans.length === 0 ? (
          <div className="text-center text-lg text-red-500 font-semibold">
            You have no plans to renew URLs.
          </div>
        ) : (
          <>
            
            {urls.length === 0 ? (
              <div className="text-center text-lg text-red-500 font-semibold">
                You have no URLs to renew.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                        {`${plan.planName} - ${plan.urlRenewLeft} URLs Left, ${plan.clickPerUrlRenew} Clicks/URL`}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedPlan && (
                  <div className="mb-6">
                    <label htmlFor="urls" className="block text-xl font-medium text-gray-700">Select URLs to Renew:</label>
                    <div 
                      className="mt-2 space-y-4 overflow-y-auto max-h-72"   
                      style={{ maxHeight: '200px', overflowY: 'scroll' }} 
                    >
                      {urls.map((url) => (
                        <div key={url.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={url.shortUrl}
                            value={url.shortUrl}
                            onChange={handleUrlChange}
                            disabled={selectedUrls.length >= selectedPlan.urlRenewLeft && !selectedUrls.includes(url.shortUrl)}
                          />
                          <label htmlFor={url.shortUrl} className="ml-2 text-black">{url.shortUrl}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 mb-6">
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-4 px-8 rounded-md text-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Renew URLs
                  </button>
                </div>
              </form>
            )}
          </>
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

export default RenewUrlComponent;
