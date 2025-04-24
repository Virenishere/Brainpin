import React, { useEffect, useState, useCallback } from 'react';
import { instance } from '@/lib/axios';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  username: string;
  email: string;
}

const BrainPinMain = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchAllUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('Please sign in to view users');
        setLoading(false);
        navigate('/signin');
        return;
      }

      const response = await instance.get('/api/users/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
      setLoading(false);
    } catch (err: any) {
      if (err.response) {
        // HTTP errors (e.g., 401, 500)
        if (err.response.status === 401) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');
          setError('Session expired. Please sign in again.');
          navigate('/signin');
        } else {
          setError(err.response.data?.message || 'Failed to fetch users');
        }
      } else {
        // Network or other errors
        setError('Network error. Please try again later.');
      }
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default BrainPinMain;