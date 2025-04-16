import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login if no token is found
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h2>BrainPin Main Layout</h2>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;