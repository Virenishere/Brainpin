import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

const AppSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-bold">BrainPin</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <a href="/dashboard" className="block p-2 hover:bg-gray-200">
            Dashboard
          </a>
          <a href="/profile" className="block p-2 hover:bg-gray-200">
            Profile
          </a>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <button
          onClick={handleLogout}
          className="w-full text-left p-2 text-red-500 hover:bg-gray-200"
        >
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
