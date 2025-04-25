import React, { useEffect, useState, useCallback } from "react";
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
  Library,
} from "lucide-react";
import { instance } from "@/lib/axios";

interface User {
  _id: string;
  username: string;
  email: string;
}

const AppSidebar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      console.log("authToken:", token); // Debug
      console.log("userId:", userId); // Debug

      if (!token || !userId) {
        console.log("Missing token or userId, skipping user fetch");
        setLoading(false);
        return;
      }

      // Fetch user profile
      const userResponse = await instance.get(`/api/users/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User profile response:", userResponse.data); // Debug

      const currentUser: User = userResponse.data;
      setUser(currentUser);
      setLoading(false);
    } catch (err: any) {
      console.error("Fetch error:", err);
      if (err.response?.status === 401) {
        console.log("Unauthorized, clearing storage and redirecting");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/login");
      }
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    console.log("Mounting AppSidebar, fetching user data");
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
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
        <Link
            to="/dashboard"
            className="block p-2 hover:bg-purple-100 rounded hover:text-black font-medium"
          >
            <div className="flex items-center gap-2">
              <Library /> <span>Dashboard</span>
            </div>
          </Link>

          <Link
            to="/dashboard?type=images,audio"
            className="block p-2 hover:bg-purple-100 rounded hover:text-black font-medium"
          >
            <div className="flex items-center gap-2">
              <Twitter /> <span>Tweets</span>
            </div>
          </Link>
          <Link
            to="/dashboard?type=video"
            className="block p-2 hover:bg-purple-100 rounded hover:text-black font-medium"
          >
            <div className="flex items-center gap-2">
              <Youtube /> <span>Videos</span>
            </div>
          </Link>
          <Link
            to="/dashboard?type=articles"
            className="block p-2 hover:bg-purple-100 rounded hover:text-black font-medium"
          >
            <div className="flex items-center gap-2">
              <FileText /> <span>Documents</span>
            </div>
          </Link>
          <Link
            to="/dashboard"
            className="block p-2 hover:bg-purple-100 rounded hover:text-black font-medium"
          >
            <div className="flex items-center gap-2">
              <Link2 /> <span>Links</span>
            </div>
          </Link>
          <Link
            to="/dashboard/tags"
            className="block p-2 hover:bg-purple-100 rounded hover:text-black font-medium"
          >
            <div className="flex items-center gap-2">
              <Hash /> <span>Tags</span>
            </div>
          </Link>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {!loading && user && (
          <div className="p-2 text-gray-800 dark:text-gray-200 font-medium">
            <p>
              <strong>Welcome!👋</strong> {user.username}
            </p>
            <p>{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full text-left p-2 text-red-500 hover:bg-red-100 font-medium rounded"
        >
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;