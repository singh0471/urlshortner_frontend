import Link from 'next/link'

export default function About() {
  return (
    <div className="relative bg-gradient-to-r from-teal-500 to-blue-500 text-white min-h-screen flex flex-col justify-center">
      {/* Semi-transparent overlay to enhance text contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="container mx-auto px-6 py-12 text-center relative z-10">
        {/* Main Heading */}
        <h1 className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
          About ShrinkIt
        </h1>

        {/* Description */}
        <p className="text-lg mb-8 text-gray-200 drop-shadow-md">
          ShrinkIt is a powerful and easy-to-use URL shortening service that allows you to shorten, track, and manage your links effectively.
          Whether you want to share links on social media or track the performance of your campaigns, ShrinkIt has everything you need to make your URL management seamless.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {/* Feature 1 */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Shorten Links</h3>
            <p className="text-lg">
              Easily shorten long URLs to make them more manageable and shareable across platforms, emails, and social media.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Track Clicks</h3>
            <p className="text-lg">
              Gain valuable insights into your link performance. Track the number of clicks, user locations, and devices for each link.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Custom URLs</h3>
            <p className="text-lg">
              Create custom branded short URLs that resonate with your audience and align with your brand identity.
            </p>
          </div>
        </div>

        {/* About ShrinkIt Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">Why ShrinkIt?</h2>
          <p className="text-lg text-gray-200 mb-4 drop-shadow-md">
            ShrinkIt is designed to provide businesses, marketers, and everyday users with an intuitive platform to shorten and track URLs. 
            Our goal is to help you make your links more user-friendly and informative. With ShrinkIt, you'll never have to deal with long, unwieldy URLs again.
          </p>
          <p className="text-lg text-gray-200 mb-4 drop-shadow-md">
            Whether you're managing marketing campaigns, sharing product links, or simply simplifying your URLs, ShrinkIt is the go-to tool.
          </p>
        </div>

        {/* Call to Action */}
        <div>
          <Link href="/shrinkit/register">
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-lg py-3 px-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
              Join ShrinkIt Today!
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

