'use client';

import Link from 'next/link';

export default function UserHomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      
      {/* Spacer for the Welcome Section */}
      <div className="mt-16 mb-12 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-wide leading-tight mb-4">
          Welcome to the User Dashboard
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Manage your URLs, plans, and queries from here.
        </p>
      </div>

      {/* Container for the Button Grid */}
      <div className="w-full max-w-3xl px-6 py-8 bg-white bg-opacity-80 rounded-lg shadow-xl mx-auto">
        
        {/* Button Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Button 1: Generate Short URL */}
          <div className="flex justify-center">
            <Link href="/shrinkit/user/generate-url">
              <button className="w-48 h-32 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Generate Short URL
              </button>
            </Link>
          </div>

          {/* Button 2: My Plans */}
          <div className="flex justify-center">
            <Link href="/shrinkit/user/my-plans">
              <button className="w-48 h-32 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                My Plans
              </button>
            </Link>
          </div>

          {/* Button 3: My URLs */}
          <div className="flex justify-center">
            <Link href="/shrinkit/user/urls">
              <button className="w-48 h-32 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                My URLs
              </button>
            </Link>
          </div>

          {/* Button 4: Query */}
          <div className="flex justify-center">
            <Link href="/shrinkit/user/query">
              <button className="w-48 h-32 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Query
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
