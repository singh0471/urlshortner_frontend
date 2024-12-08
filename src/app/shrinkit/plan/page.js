
'use client';

import { useState, useEffect } from 'react';
import getPlanService from "@/lib/getPlansService";  
import camelCaseToTitleCase from '@/utils/helper/camelCaseToTitle';
import Link from 'next/link';

export default function ManagePlans() {
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);   

  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPlanService(); 
        setPlans(response.data);   
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plans:', error);
        setError(error.message);   
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);   

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

 
  const handleNext = () => {
    if (currentPage < plans.length - 1) {
      setCurrentPage(currentPage + 1);  
    } else {
      setCurrentPage(0);   
    }
  };

  
  const renderCard = (plan) => (
    <div className="w-full max-w-lg p-6 border border-gray-200 rounded-lg shadow-md bg-white text-gray-800">
      <h2 className="text-2xl font-semibold text-center mb-4">{plan.name}</h2>
      <p className="text-gray-600 text-center mb-6">{plan.description}</p>
  
      <div className="mb-4">
        <strong className="text-gray-700">Type: </strong>
        <span className="font-medium text-gray-900">{plan.type}</span>
      </div>
  
      <div className="mb-4">
        <strong className="text-gray-700">URL Limit: </strong>
        <span className="font-medium text-gray-900">{plan.urlLimit}</span>
      </div>
  
      <div className="mb-4">
        <strong className="text-gray-700">Custom URL Limit: </strong>
        <span className="font-medium text-gray-900">{plan.customUrlLimit}</span>
      </div>
  
      <div className="mb-4">
        <strong className="text-gray-700">Clicks Per URL: </strong>
        <span className="font-medium text-gray-900">{plan.clicksPerUrl}</span>
      </div>
  
      <div className="mb-4">
        <strong className="text-gray-700">Amount: </strong>
        <span className="font-medium text-gray-900">${plan.amount}</span>
      </div>
  
      
    </div>
  );
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl font-bold mb-6">Plans</h1>

        
        {plans && plans.length > 0 ? (
          <div className="flex justify-center mb-4">
            {renderCard(plans[currentPage])} 
          </div>
        ) : (
          <p className="text-center">No plans available</p>
        )}

       
        <div className="flex justify-center items-center mt-6">
          <button
            className="px-6 py-2 text-white bg-teal-600 border border-teal-600 rounded-lg hover:bg-teal-700"
            onClick={handleNext}
          >
            Next
          </button>
        </div>

       
        <div className="flex justify-center mt-12">
          <Link
            href="/shrinkit/register"  
            className="px-6 py-2 bg-white text-blue-600 text-md font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
          >
            Start Shrinking Now
          </Link>
        </div>
      </div>
    </div>
  );
}
