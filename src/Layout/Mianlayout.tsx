// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";
import MainboardHeader from "../Components/MainboardHeader";

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
    <div className="flex flex-col min-h-screen">
      {/* Header - Always at the top */}
      <Header onMobileToggle={handleMobileToggle} />
      
      {/* Main content area with sidebar and content */}
      <div className="flex flex-1 pt-14"> {/* Added pt-16 to account for header height */}
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
        
        {/* Main content area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-56'
        }`}>
          {/* MainboardHeader - Below main header but above content */}
          <MainboardHeader userName="Olivia" />
          
          {/* Main content with Outlet */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Mainlayout;