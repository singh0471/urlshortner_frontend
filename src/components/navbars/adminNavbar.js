// app/AdminNavbar.js
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove token from localStorage (or clear other user-related data)
    localStorage.removeItem('token');
    
    // Redirect to the home page
    router.push('/');
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/shrinkit/admin" className="text-white text-2xl font-semibold">ShrinkIt</a>
        <div>
          <ul className="flex space-x-4">
            <li><Link href="/shrinkit/admin" className="text-white hover:text-gray-200">Home</Link></li>
            <li><Link href="/shrinkit/admin/users" className="text-white hover:text-gray-200">Users</Link></li>
            <li><Link href="/shrinkit/admin/plans" className="text-white hover:text-gray-200">Plans</Link></li>
          </ul>
        </div>
        <div>
          {/* Update the button to trigger handleLogout function */}
          <button
            onClick={handleLogout}
            className="text-white bg-blue-800 px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
