 
'use client'
 
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
       
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-wide leading-tight">
          Welcome to ShrinkIt
        </h1>
        <p className="text-xl max-w-xl mx-auto">
          Shrink your URLs with ease. Get more clicks and track your links seamlessly.
        </p>

         
        <p className="text-2xl font-semibold mt-6">
          Start your journey...
        </p>

         
        <a href="/shrinkit/register">
          <button className="px-8 py-3 bg-white text-blue-600 text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 mt-8">
            Register Now
          </button>
        </a>
      </div>

      
    </div>
  );
}
