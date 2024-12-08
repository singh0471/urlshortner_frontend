'use client';

import './globals.css';
import { usePathname } from 'next/navigation';   

import Navbar from '@/components/navbars/Navbar';
import AdminNavbar from '@/components/navbars/AdminNavbar';
import UserNavbar from '@/components/navbars/UserNavbar';

export default function Layout({ children }) {
  const pathname = usePathname();   

  
  const isAdminPage = pathname.startsWith('/shrinkit/admin');
   
  const isUserPage = pathname.startsWith('/shrinkit/user');
   
  const isHomePage = pathname === '/' || pathname.startsWith('/shrinkit/login') || pathname.startsWith('/shrinkit/register') || pathname.startsWith('/shrinkit/about')|| pathname.startsWith('/shrinkit/plan');
   

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ShrinkIt - URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans bg-gray-50 text-gray-900">
         
        {isHomePage && <Navbar />}       
        {isAdminPage && <AdminNavbar />}  
        {isUserPage && <UserNavbar />}    

        <main className="min-h-screen flex flex-col justify-between">
          {children}
        </main>

        
        <footer className="bg-blue-600 text-white text-center py-4">
          <p>&copy; 2024 ShrinkIt. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

