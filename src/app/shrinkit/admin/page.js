'use client'

export default function AdminHomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      
      {/* Spacer for the Welcome Section */}
      <div className="mt-16 mb-12 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-wide leading-tight mb-4">
          Welcome to the Admin Dashboard
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Manage users, queries, transactions, plans, and more from here.
        </p>
      </div>

      {/* Container for the Button Grid */}
      <div className="w-full max-w-screen-xl px-6 py-8 bg-white bg-opacity-80 rounded-lg shadow-xl mx-auto">
        
        {/* Button Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* Button 1: Blacklist User */}
          <div className="w-full">
            <a href="/admin/blacklist">
              <button className="w-full h-32 px-6 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Blacklist User
              </button>
            </a>
          </div>

          {/* Button 2: Manage Plans */}
          <div className="w-full">
            <a href="/admin/plans">
              <button className="w-full h-32 px-6 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Manage Plans
              </button>
            </a>
          </div>

          {/* Button 3: Manage Queries */}
          <div className="w-full">
            <a href="/admin/queries">
              <button className="w-full h-32 px-6 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Manage Queries
              </button>
            </a>
          </div>

          {/* Button 4: Transactions */}
          <div className="w-full">
            <a href="/admin/transactions">
              <button className="w-full h-32 px-6 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Transactions
              </button>
            </a>
          </div>

          {/* Button 5: Manage URLs */}
          <div className="w-full">
            <a href="/admin/urls">
              <button className="w-full h-32 px-6 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Manage URLs
              </button>
            </a>
          </div>

          {/* Button 6: Manage Users */}
          <div className="w-full">
            <a href="/admin/users">
              <button className="w-full h-32 px-6 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Manage Users
              </button>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
