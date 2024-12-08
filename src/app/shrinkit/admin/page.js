'use client'

import Link from 'next/link';

export default function AdminHomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      
      
      <div className="mt-16 mb-12 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-wide leading-tight mb-4">
          Welcome to the Admin Dashboard
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Manage users, queries, transactions, plans, and more from here.
        </p>
      </div>

      
      <div className="w-full max-w-screen-xl px-6 py-8 bg-white bg-opacity-80 rounded-lg shadow-xl mx-auto">
        
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
        
          <div className="w-full">
            <Link href="/shrinkit/admin/blacklist">
              <button className="w-full h-32 px-6 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Blacklist User
              </button>
            </Link>
          </div>

         
          <div className="w-full">
            <Link href="/shrinkit/admin/plans">
              <button className="w-full h-32 px-6 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Manage Plans
              </button>
            </Link>
          </div>

         
          <div className="w-full">
            <Link href="/shrinkit/admin/queries">
              <button className="w-full h-32 px-6 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Manage Queries
              </button>
            </Link>
          </div>

   
          <div className="w-full">
            <Link href="/shrinkit/admin/transactions">
              <button className="w-full h-32 px-6 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Transactions
              </button>
            </Link>
          </div>

         
          <div className="w-full">
            <Link href="/shrinkit/admin/urls">
              <button className="w-full h-32 px-6 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Manage URLs
              </button>
            </Link>
          </div>

     
          <div className="w-full">
            <Link href="/shrinkit/admin/users">
              <button className="w-full h-32 px-6 py-4 bg-blue-600 text-white text-base font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Manage Users
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
} 