'use client';  

import { useState, useEffect } from 'react';

export const useUser = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []); 
  return role;
};
