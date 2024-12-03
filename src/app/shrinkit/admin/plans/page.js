'use client'

import { useState, useEffect } from 'react';
import getPlanService from "@/lib/getPlansService";

export default function ManagePlans() {
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch plans on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPlanService();
        setPlans(response); // Assuming response is the plans data
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Manage Plans</h1>
      {/* Render plans or handle the absence of data */}
      {plans && plans.length > 0 ? (
        <ul>
          {plans.map((plan) => (
            <li key={plan.id}>{plan.name}</li>
          ))}
        </ul>
      ) : (
        <p>No plans available</p>
      )}
    </div>
  );
}
