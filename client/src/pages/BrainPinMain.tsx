import React from "react";

const BrainPinMain = () => {
  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">BrainPin Dashboard</h1>
      <p>Welcome to your dashboard!</p>
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