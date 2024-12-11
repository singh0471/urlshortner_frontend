'use client';

import React, { useState } from 'react';
import updateUserService from '@/lib/updateUserService';
import deleteUserService from '@/lib/deleteUserService';  
import camelCaseToTitleCase from '@/utils/helper/camelCaseToTitle'; 
import { ToastContainer, toast } from 'react-toastify';   
import 'react-toastify/dist/ReactToastify.css';

const UpdateUser = () => {
  const [updates, setUpdates] = useState([{ parameter: '', value: '' }]);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [isLoading, setIsLoading] = useState(false);   
  const allParameters = ['username', 'firstName', 'lastName', 'email', 'password'];

  const addUpdateOption = () => {
    if (updates.length < 5) {
      setUpdates([...updates, { parameter: '', value: '' }]);
    }
  };

  const removeUpdateOption = (index) => {
    setUpdates(updates.filter((_, i) => i !== index));
  };

  const handleUpdateChange = (index, field, value) => {
    const newUpdates = [...updates];
    newUpdates[index][field] = value;
    setUpdates(newUpdates);
  };

  const validateField = (parameter, value) => {
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (parameter === 'username') {
      const usernameRegex = /^[A-Za-z][A-Za-z0-9]*$/;  
      if (!usernameRegex.test(value)) {
        toast.error('Username must start with a letter and can only contain letters and numbers.');
        return false;
      }
    }

    if ((parameter === 'firstName' || parameter === 'lastName') && !nameRegex.test(value)) {
      toast.error(`${camelCaseToTitleCase(parameter)} must contain only letters and spaces.`);
      return false;
    }

    if (parameter === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        toast.error('Please enter a valid email address.');
        return false;
      }
    }

    if (parameter === 'password') {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(value)) {
        toast.error('Password must be at least 8 characters, include at least 1 number, 1 uppercase letter, and 1 special character.');
        return false;
      }
    }

    return true;
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
  
    setIsLoading(true);  
  
    const updateBody = updates.filter((update) => update.parameter && update.value);
  
    
    for (const update of updateBody) {
      const { parameter, value } = update;
      if (!validateField(parameter, value)) {
        setIsLoading(false);  
        return;
      }
    }
  
    if (updateBody.length === 0) {
      toast.error('Please fill in at least one parameter to update.');
      setIsLoading(false);  
      return;
    }
  
    try {
      await updateUserService(updateBody);
      toast.success('User updated successfully!');
    } catch (error) {
       
      const specificMessage = error?.specificMessage || 'Error updating user. Please try again.';
      toast.error(specificMessage);   
    } finally {
      setIsLoading(false);  
    }
};

  

  // const handleUpdateUser = async (event) => {
  //   event.preventDefault();

  //   setIsLoading(true); // Set loading to true when the update starts

  //   const updateBody = updates.filter((update) => update.parameter && update.value);

  //   // Validate the fields before submitting the update
  //   for (const update of updateBody) {
  //     const { parameter, value } = update;
  //     if (!validateField(parameter, value)) {
  //       setIsLoading(false); // Reset loading if validation fails
  //       return;
  //     }
  //   }

  //   if (updateBody.length === 0) {
  //     toast.error('Please fill in at least one parameter to update.');
  //     setIsLoading(false); // Reset loading if no parameters to update
  //     return;
  //   }

  //   try {
  //     await updateUserService(updateBody);
  //     toast.success('User updated successfully!');
  //   } catch (error) {
  //     // Handle the error and extract the specific message if available
  //     const errorMessage = error?.response?.data?.specificMessage || 'Error updating user. Please try again.';
  //     toast.error(errorMessage); // Show the specific error message
  //   } finally {
  //     setIsLoading(false); // Reset loading after the update process
  //   }
  // };

  const getAvailableParameters = (index) => {
    const selectedParameters = updates.map((update) => update.parameter);
    return allParameters.filter(
      (param) => !selectedParameters.includes(param) || updates[index].parameter === param
    );
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserService();
      toast.success('Your account has been deleted successfully!');
      
      window.location.href = '/';
    } catch (error) {
      toast.error('Error deleting account. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <ToastContainer /> 

      <div className="mt-16 mb-12 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-wide leading-tight mb-4">
          Update Your Profile
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Modify your details, including username, email, password, and more.
        </p>
      </div>

      <div className="w-full max-w-3xl px-6 py-8 bg-white bg-opacity-80 rounded-lg shadow-xl mx-auto">
        <div className="space-y-6">
          {updates.map((update, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4">
              <div className="flex-1">
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                  value={update.parameter}
                  onChange={(e) => handleUpdateChange(index, 'parameter', e.target.value)}
                  required
                >
                  <option value="">Select Parameter</option>
                  {getAvailableParameters(index).map((param) => (
                    <option key={param} value={param}>
                      {camelCaseToTitleCase(param)}  
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <input
                  type={update.parameter === 'password' ? 'password' : 'text'}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                  value={update.value}
                  onChange={(e) => handleUpdateChange(index, 'value', e.target.value)}
                  placeholder={`Enter ${camelCaseToTitleCase(update.parameter) || 'value'}`} 
                  required
                />
              </div>

              {updates.length > 1 && (
                <button
                  type="button"
                  className="px-3 py-2 bg-red-600 text-white rounded-md"
                  onClick={() => removeUpdateOption(index)}
                >
                  -
                </button>
              )}
            </div>
          ))}

          {updates.length < 5 && (
            <button 
              type="button" 
              className="w-full px-3 py-2 bg-blue-600 text-white rounded-md"
              onClick={addUpdateOption}
            >
              + Add Another Field
            </button>
          )}
        </div>

        <div className="mt-6">
          <button 
            type="submit" 
            className="w-full px-6 py-3 bg-green-600 text-white rounded-md"
            onClick={handleUpdateUser}
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? 'Updating...' : 'Update User'}
          </button>
        </div>

        <div className="mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-md"
          >
            Delete My Account
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-lg font-semibold text-center mb-4 text-black">Are you sure you want to delete your account?</h3>

            <div className="flex justify-around">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded-md"
              >
                No
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-2 bg-red-600 text-white rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
