// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";

const Mainlayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header - Always at the top */}
      <Header onMobileToggle={handleMobileToggle} />
      
      {/* Main content area with sidebar and content */}
      <div className="flex flex-1">
        {/* Sidebar - Below header */}
        <div className="hidden lg:block">
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            onCollapse={handleSidebarCollapse}
            isMobileOpen={isMobileOpen}
            onMobileToggle={handleMobileToggle}
          />
        </div>
        
        {/* Mobile sidebar - overlay style */}
        <div className="lg:hidden">
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            onCollapse={handleSidebarCollapse}
            isMobileOpen={isMobileOpen}
            onMobileToggle={handleMobileToggle}
          />
        </div>
        
        {/* Main content */}
        <main className={`flex-1 p-6 overflow-y-auto pt-16 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Mainlayout;