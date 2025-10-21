// src/components/DashboardHeader.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Back icon
import { menuItems } from "./menuConfig";

interface DashboardHeaderProps {
  userName: string;
}

const MainboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Find the current route's title
  const currentItem = menuItems.find((item) => item.path === location.pathname);
  const currentTitle = currentItem ? currentItem.name : "Dashboard";

  const isDashboard = location.pathname === "/";

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-4">
        {/* Back button for non-dashboard pages */}
      
        {!isDashboard && (
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded hover:bg-gray-100 transition-colors leading-none flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft size={20} strokeWidth={2.2} className="text-gray-700" />
          </button>
        )}
  

        {/* Dynamic title */}
        <h1 className="text-2xl font-semibold text-black">{currentTitle}</h1>

        {/* Divider and Welcome only on Dashboard */}
        {isDashboard && (
          <>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="text-gray-700 text-sm">
              Welcome, <span className="font-medium text-black">{userName}</span>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default MainboardHeader;
