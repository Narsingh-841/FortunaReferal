// src/components/DashboardHeader.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { menuItems } from "./menuConfig";

interface DashboardHeaderProps {
  userName: string;
}

interface MenuItem {
  name: string;
  path: string;
  icon?: React.ElementType;
  children?: MenuItem[];
}

const MainboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Helper: recursively find the menu item that matches the current route
  const findCurrentItem = (items: MenuItem[], path: string): MenuItem | null => {
    for (const item of items) {
      if (item.path === path) return item;
      if (item.children) {
        const foundChild = findCurrentItem(item.children, path);
        if (foundChild) return foundChild;
      }
    }
    return null;
  };

  const currentItem = findCurrentItem(menuItems, location.pathname);

  // ✅ If exact match not found, try to match a parent path
  const parentItem = menuItems.find((item) =>
    location.pathname.startsWith(`${item.path}/`)
  );

  // ✅ Determine current title
  const currentTitle = currentItem
    ? currentItem.name
    : parentItem
    ? parentItem.name
    : "Dashboard";

  const isDashboard = location.pathname === "/";

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-4">
        {/* 🔙 Back button for non-dashboard pages */}
        {!isDashboard && (
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded hover:bg-gray-100 transition-colors flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft size={20} strokeWidth={2.2} className="text-gray-700" />
          </button>
        )}

        {/* 🏷 Dynamic title */}
        <h1 className="text-2xl font-semibold text-black">{currentTitle}</h1>

        {/* 👋 Divider and welcome only on Dashboard */}
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
