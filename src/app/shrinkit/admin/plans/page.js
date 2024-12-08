'use client'
import React from 'react';
import Link from 'next/link'; // Import Link from Next.js

const Plans = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      {/* Container for content */}
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-xl mt-20"> {/* Add mt-20 for spacing from navbar */}
        <h2 className="text-4xl font-semibold text-center text-teal-600 mb-8">
          Manage Plans
        </h2>

        {/* Buttons to navigate to Create, View, and Update Plan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="w-full">
            <Link href="/shrinkit/admin/plans/create">
              <button className="w-full h-32 px-6 py-4 bg-teal-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-teal-700 transition duration-300">
                Create Plan
              </button>
            </Link>
          </div>

          <div className="w-full">
            <Link href="/shrinkit/admin/plans/view">
              <button className="w-full h-32 px-6 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                View Plans
              </button>
            </Link>
          </div>

          <div className="w-full">
            <Link href="/shrinkit/admin/plans/update">
              <button className="w-full h-32 px-6 py-4 bg-yellow-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300">
                Update Plan
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
