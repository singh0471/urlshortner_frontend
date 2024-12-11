'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ShortUrl() {
  const params = useParams();  
  const router = useRouter();

  useEffect(() => {
    if (params?.shortUrl) {
      
      const backendUrl = `http://localhost:4000/${params.shortUrl}`;

      
      router.push(backendUrl);
    } else {
      console.error("shorturl is undefined or not available.");
    }
  }, [params, router]); 

 
  console.log(params);

  return ;
}
