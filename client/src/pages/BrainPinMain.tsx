import React, { useEffect, useState, useCallback } from 'react';
import { instance } from '@/lib/axios';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  username: string;
  email: string;
}

const BrainPinMain = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        setError('Please sign in to view your profile');
        setLoading(false);
        navigate('/signin');
        return;
      }

      const response = await instance.get(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setLoading(false);
    } catch (err: any) {
      if (err.response) {
        // HTTP errors (e.g., 401, 404)
        if (err.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          setError('Session expired. Please sign in again.');
          navigate('/signin');
        } else {
          setError(err.response.data?.message || 'Failed to fetch profile');
        }
      } else {
        // Network or other errors
        setError('Network error. Please try again later.');
      }
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        {user ? (
          <div className="text-lg">
            <p>
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </div>
  );
};

export default BrainPinMain;