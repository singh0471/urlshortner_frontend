// app/Navbar.js
'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-semibold">ShrinkIt</a>
        <div>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-white hover:text-gray-200">Home</Link></li>
            <li><Link href="/shrinkit/plan" className="text-white hover:text-gray-200">Plans</Link></li>
            <li><Link href="/shrinkit/about" className="text-white hover:text-gray-200">About</Link></li>
          </ul>
        </div>
        <div>
        <Link href="/shrinkit/login" className="text-white bg-blue-800 px-4 py-2 rounded-md hover:bg-blue-700">
    Login
  </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
