'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  
import loginService from '@/lib/loginService';  
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState(null);  
  const [error, setError] = useState(null);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaCorrect, setCaptchaCorrect] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;   
    const num2 = Math.floor(Math.random() * 10) + 1;   
    setCaptchaQuestion(`What is ${num1} + ${num2}?`);
    setCaptchaCorrect(num1 + num2);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCaptchaChange = (e) => {
    setCaptchaAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError(null);
    setMessage(null);  

     
    if (!formData.username || !formData.password) {
      setError('Both fields are required');
      return;
    }

    
    if (parseInt(captchaAnswer) !== captchaCorrect) {
      setError('Incorrect CAPTCHA answer');
      return;
    }

    try {
      const response = await loginService(formData);
      
      
      if (response.success) {
        setMessage(response.message);  
        setError(null);   

        
        router.push(response.isAdmin ? '/shrinkit/admin' : '/shrinkit/user');
        console.log('Logged in successfully');
      }
    } catch (err) {
       
      setError(err.specificMessage || err.message || 'Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login to ShrinkIt
        </h2>

         
        {message && (
          <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
            {error}
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

          
          <div className="mb-6 p-4 border border-blue-300 rounded-lg shadow-lg bg-blue-50">
            <label
              htmlFor="captcha"
              className="block text-gray-800 font-semibold mb-2"
            >
              <span className="text-blue-600">{captchaQuestion}</span>
            </label>
            <input
              type="text"
              id="captcha"
              name="captcha"
              value={captchaAnswer}
              onChange={handleCaptchaChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the result"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-700">
            Don't have an account?{' '}
            <Link href="/shrinkit/register" className="text-blue-600 hover:text-blue-700">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
