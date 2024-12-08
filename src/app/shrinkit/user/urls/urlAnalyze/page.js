'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Access query params from URL

const Analyze = () => {
  const router = useRouter();
  const { id } = router.query;  // Access the `id` from the query parameters
  const [urlId, setUrlId] = useState(null);

  useEffect(() => {
    if (id) {
      setUrlId(id);  // Set the `id` when available
    }
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-teal-600 mb-6">Analyze URL</h1>

      {urlId ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">URL ID: {urlId}</h2>
          {/* Add additional details or analysis logic here */}
        </div>
      ) : (
        <p className="text-red-600">No URL ID available. Please select a URL to analyze.</p>
      )}
    </div>
  );
};

export default Analyze;
