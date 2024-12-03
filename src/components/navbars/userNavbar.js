'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const UserNavbar = () => {
  const router = useRouter();

 
  const handleLogout = () => {
     
    localStorage.removeItem('token');  

    
    router.push('/');  
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/shrinkit/user" className="text-white text-2xl font-semibold">ShrinkIt</a>
        <div>
          <ul className="flex space-x-4">
            <li><Link href="/shrinkit/user" className="text-white hover:text-gray-200">Home</Link></li>
            <li><Link href="/shrinkit/user/buy" className="text-white hover:text-gray-200">Buy Plan</Link></li>
            <li><Link href="/shrinkit/user/urls" className="text-white hover:text-gray-200">My URLs</Link></li>
          </ul>
        </div>
        <div>
          
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

export default UserNavbar;
