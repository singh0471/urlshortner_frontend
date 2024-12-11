'use client';

import { useState, useEffect } from 'react';
import getAllClicksPlanService from '@/lib/getAllClicksPlanService';
import getAllUrlPlanService from '@/lib/getAllUrlPlansService';
import buyPlanService from '@/lib/buyPlansService';  
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BuyUrl() {
  const [currentSection, setCurrentSection] = useState('url');
  const [urlPlans, setUrlPlans] = useState([]);
  const [clickPlans, setClickPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUrlPlans, setSelectedUrlPlans] = useState([]);
  const [selectedClickPlans, setSelectedClickPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalCount, setTotalCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);  

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const router = useRouter();

  const totalAmount = [
    ...selectedUrlPlans,
    ...selectedClickPlans,
  ].reduce((sum, plan) => sum + plan.amount, 0);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        let response;
        if (currentSection === 'url') {
          response = await getAllUrlPlanService(currentPage, pageSize);
          setUrlPlans(response.data);
        } else if (currentSection === 'clicks') {
          response = await getAllClicksPlanService(currentPage, pageSize);
          setClickPlans(response.data);
        }
        setTotalCount(response.totalCount);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plans:', error);
        setLoading(false);
      }
    };
    fetchPlans();
  }, [currentSection, currentPage, pageSize]);

  const togglePlanSelection = (plan, type) => {
    const selectedPlans = type === 'url' ? [...selectedUrlPlans] : [...selectedClickPlans];
    const index = selectedPlans.findIndex((selectedPlan) => selectedPlan.id === plan.id);

    if (index === -1) {
      selectedPlans.push(plan);
    } else {
      selectedPlans.splice(index, 1);
    }

    if (type === 'url') {
      setSelectedUrlPlans(selectedPlans);
    } else {
      setSelectedClickPlans(selectedPlans);
    }
  };

  const renderPlanCard = (plan, type) => {
    const isSelected = (type === 'url' ? selectedUrlPlans : selectedClickPlans).some(
      (selectedPlan) => selectedPlan.id === plan.id
    );

    return (
      <div key={plan.id} className="w-full max-w-xs p-5 border rounded-lg shadow-md bg-white text-gray-800">
        <h3 className="text-xl font-semibold text-teal-600">{plan.name}</h3>
        <p className="text-gray-600 mb-3">{plan.description}</p>
        <div className="mb-2">
          <strong>Type:</strong> {plan.type}
        </div>
        <div className="mb-2">
          <strong>URL Limit:</strong> {plan.urlLimit}
        </div>
        <div className="mb-2">
          <strong>Clicks Per URL:</strong> {plan.clicksPerUrl}
        </div>
        <div className="mb-2">
          <strong>Custom Url :</strong> {plan.customUrlLimit}
        </div>
        <div className="mb-2">
          <strong>Amount:</strong> ${plan.amount.toFixed(2)}
        </div>

        <div className="flex justify-between items-center mt-3">
          <button
            className={`px-4 py-2 ${isSelected ? 'bg-red-600' : 'bg-teal-600'} text-white rounded-lg`}
            onClick={() => togglePlanSelection(plan, type)}
          >
            {isSelected ? 'Remove' : 'Select'}
          </button>
        </div>
      </div>
    );
  };

  const handleNextClick = () => {
    const totalPages = Math.ceil(totalCount / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleBuyClick = () => {
    const transactionData = {
      plans: [...selectedUrlPlans, ...selectedClickPlans],
      totalAmount: totalAmount,
    };

    if (transactionData.plans.length === 0) {
      alert("No plans selected");
    } else {
      setShowPaymentForm(true);  
    }
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePaymentDetails = () => {
    const { cardNumber, expiryDate, cvv } = cardDetails;

    const cardNumberPattern = /^\d{16}$/;
    if (!cardNumberPattern.test(cardNumber)) {
      setPaymentMessage('Invalid card number. Please enter a 16-digit number.');
      return false;
    }

    const expiryPattern = /^(0[1-9]|1[0-2])\/(2[3-9]|[3-9][0-9])$/;
    if (!expiryPattern.test(expiryDate)) {
      setPaymentMessage('Invalid expiry date. Please enter in MM/YY format.');
      return false;
    }

    const cvvPattern = /^\d{3}$/;
    if (!cvvPattern.test(cvv)) {
      setPaymentMessage('Invalid CVV. Please enter a 3-digit CVV.');
      return false;
    }

    const [month, year] = expiryDate.split('/');
    const expiry = new Date(`20${year}`, month - 1);
    const currentDate = new Date();
    if (expiry < currentDate) {
      setPaymentMessage('Your card has expired.');
      return false;
    }

    setPaymentMessage('');
    return true;
  };

  const handlePaymentSubmit = async () => {
    if (validatePaymentDetails()) {
      setIsPaymentLoading(true); 
      try {
        const transactionData = {
          plans: [...selectedUrlPlans, ...selectedClickPlans],
          totalAmount: totalAmount,
        };

        const response = await buyPlanService(transactionData);

        if (response === 201) {
          setPaymentMessage('Payment Successful!');
          setTimeout(() => {
            router.push('/shrinkit/user');   
          }, 2000); 
        } else {
          setPaymentMessage('Payment failed. Please try again.');
        }
      } catch (error) {
        setPaymentMessage('An error occurred. Please try again.');
        console.error('Payment service error:', error);
      } finally {
        setIsPaymentLoading(false);  
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl font-bold mb-6">Buy URL Plans</h1>

        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 ${currentSection === 'url' ? 'bg-teal-600' : 'bg-gray-400'} text-white rounded-lg`}
            onClick={() => setCurrentSection('url')}
          >
            URL Plans
          </button>
          <button
            className={`px-6 py-2 ${currentSection === 'clicks' ? 'bg-teal-600' : 'bg-gray-400'} text-white rounded-lg ml-4`}
            onClick={() => setCurrentSection('clicks')}
          >
            Clicks Plans
          </button>
        </div>

        <div className="flex justify-center mb-6">
          {loading ? (
            <div>Loading plans...</div>
          ) : (
            (currentSection === 'url' ? urlPlans : clickPlans).map((plan) =>
              renderPlanCard(plan, currentSection)
            )
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>

        <div className="flex justify-center mt-8 text-xl font-bold">
          Total Amount: <span className="ml-2 text-yellow-300">${totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleModalToggle}
            className="px-6 py-2 bg-white text-blue-600 text-md font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
          >
            Proceed to Checkout
          </button>
        </div>

        {showModal && !showPaymentForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
              <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">Checkout</h2>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-black mb-3">Selected Plans:</h3>
                <ul className="space-y-4">
                  {[...selectedUrlPlans, ...selectedClickPlans].map((plan) => (
                    <li key={plan.id} className="flex justify-between items-center">
                      <span className="text-black font-medium">{plan.name}</span>
                      <span className="text-teal-600 font-bold">${plan.amount.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 text-lg font-bold flex justify-between items-center">
                <span className="text-black">Total Amount:</span>
                <span className="text-yellow-500">${totalAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-center mb-4">
                <button
                  onClick={handleBuyClick}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                >
                  Buy
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
                  onClick={handleModalToggle}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showPaymentForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
              <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">Payment Details</h2>

              <div className="mb-4">
                <label className="block mb-2 text-lg">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardInputChange}
                  maxLength={16}
                  className="w-full p-2 border rounded-lg text-black"
                  placeholder="Enter 16-digit card number"
                />
              </div>

              <div className="flex justify-between mb-4">
                <div className="w-1/2 pr-2">
                  <label className="block mb-2 text-lg">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardInputChange}
                    maxLength={5}
                    className="w-full p-2 border rounded-lg text-black"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block mb-2 text-lg">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardInputChange}
                    maxLength={3}
                    className="w-full p-2 border rounded-lg text-black"
                    placeholder="CVV"
                  />
                </div>
              </div>

              {paymentMessage && (
                <div className="mb-4 text-center text-red-500">{paymentMessage}</div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={handlePaymentSubmit}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                >
                  {isPaymentLoading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
                </button>
              </div>

              {paymentMessage === 'Payment Successful!' && (
                <div className="text-center mt-4 text-teal-600">
                  <h3 className="text-xl font-bold">Payment Successful!</h3>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
