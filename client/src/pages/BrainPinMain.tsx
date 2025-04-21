import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "@/lib/axios";

const BrainPinMain = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        // Replace 'some-user-id' with actual user ID (e.g., from decoded token)
        const response = await instance.get("/api/users/profile/:id");
        setUser(response.data);
      } catch (err: any) {
        console.error("Profile fetch error:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">BrainPin Dashboard</h1>
      <p>Welcome to your dashboard! {user ? `Hello, ${user.username}` : "Loading..."}</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default BrainPinMain;
