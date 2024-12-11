'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import registerService from '@/lib/registerService';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',  
  });
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { username, firstName, lastName, password } = formData;
    
    const usernameRegex = /^[A-Za-z][A-Za-z0-9]*$/;
    if (!usernameRegex.test(username)) {
      setError("Username cannot start with a number.");
      return false;
    }

    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setError("First name and last name can only contain alphabetic characters.");
      return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long, include at least one uppercase letter, one special character, and one number.");
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataLowercase = {
      username: formData.username.toLowerCase(),
      firstName: formData.firstName.toLowerCase(),
      lastName: formData.lastName.toLowerCase(),
      email: formData.email.toLowerCase(),
      password: formData.password,   
    };

    setLoading(true); 

    try {
      const response = await registerService(formDataLowercase);
      setSuccess(true);
      setError('');
      console.log('Registration response:', response);
    } catch (err) {
      setSuccess(false);
      setError(err.message || 'Registration failed. Please try again later.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
            Registration successful! Please check your email for login details.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-800 font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-800 font-semibold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-800 font-semibold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-800 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              disabled={loading}   
              className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Registering...' : 'Register'} 
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-700">
            Already have an account?{' '}
            <Link
              href="/shrinkit/login"
              className="text-blue-600 hover:text-blue-700"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
