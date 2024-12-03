'use client'

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
      <div className="w-full max-w-screen-xl px-6 py-8 bg-white bg-opacity-80 rounded-lg shadow-xl mx-auto">
        
        {/* Button Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          
          {/* Button 1: Generate Short URL */}
          <div className="w-full flex justify-center">
            <a href="/user/generate-url">
              <button className="w-full md:w-64 h-32 px-4 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Generate Short URL
              </button>
            </a>
          </div>

          {/* Button 2: My Plans */}
          <div className="w-full flex justify-center">
            <a href="/user/plans">
              <button className="w-full md:w-64 h-32 px-4 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                My Plans
              </button>
            </a>
          </div>

          {/* Button 3: My URLs */}
          <div className="w-full flex justify-center">
            <a href="/user/urls">
              <button className="w-full md:w-64 h-32 px-4 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                My URLs
              </button>
            </a>
          </div>

          {/* Button 4: Query */}
          <div className="w-full flex justify-center">
            <a href="/user/query">
              <button className="w-full md:w-64 h-32 px-4 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Query
              </button>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
