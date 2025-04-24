import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import {
  NotebookPen,
  Twitter,
  Youtube,
  FileText,
  Link2,
  Hash,
} from "lucide-react";

const AppSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          to="/"
          className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <NotebookPen className="text-purple-500 transition-colors duration-300" />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            BrainPin
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <Link to="#" className="block p-2 hover:bg-purple-100 rounded hover:text-black font-medium">
            <div className="flex items-center gap-2">
              <Twitter /> <span>Tweets</span>
            </div>
          </Link>
          <Link to="#" className="block p-2 hover:bg-purple-100 rounded hover:text-black font-medium">
            <div className="flex items-center gap-2">
              <Youtube /> <span>Videos</span>
            </div>
          </Link>
          <Link to="#" className="block p-2 hover:bg-purple-100 rounded hover:text-black font-medium">
            <div className="flex items-center gap-2">
              <FileText /> <span>Documents</span>
            </div>
          </Link>
          <Link to="#" className="block p-2 hover:bg-purple-100 rounded hover:text-black font-medium">
            <div className="flex items-center gap-2">
              <Link2 /> <span>Links</span>
            </div>
          </Link>
          <Link to="#" className="block p-2 hover:bg-purple-100 rounded hover:text-black font-medium">
            <div className="flex items-center gap-2">
              <Hash /> <span>Tags</span>
            </div>
          </Link>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <button
          onClick={handleLogout}
          className="w-full text-left p-2 text-red-500 hover:bg-red-100  font-medium rounded"
        >
          Logout
          
        </button>
      </SidebarFooter>
      
    </Sidebar>
  );
};

export default AppSidebar;
