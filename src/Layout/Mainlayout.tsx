import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

import { useState } from "react";
import MainboardHeader from "../Components/MainboardHeader";
import ServicesSubSidebar from "../ServiceDetailsPage/MyServices/ServicesSubSidebar";

const Mainlayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isServicesSubSidebarOpen, setIsServicesSubSidebarOpen] = useState(false);
  const location = useLocation();

  const isServicesRoute = location.pathname.startsWith('/services');

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleServicesSubSidebarToggle = () => {
    setIsServicesSubSidebarOpen(!isServicesSubSidebarOpen);
  };

  const handleServicesSubSidebarClose = () => {
    setIsServicesSubSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMobileToggle={handleMobileToggle} />
      
      <div className="flex flex-1 pt-14">
        {/* Main Sidebar */}
        <div className="hidden lg:block">
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            onCollapse={handleSidebarCollapse}
            isMobileOpen={isMobileOpen}
            onMobileToggle={handleMobileToggle}
          />
        </div>
        
        <div className="lg:hidden">
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            onCollapse={handleSidebarCollapse}
            isMobileOpen={isMobileOpen}
            onMobileToggle={handleMobileToggle}
          />
        </div>

        {/* Services Sub-Sidebar - Only show on services routes */}
        {isServicesRoute && (
          <ServicesSubSidebar 
            isMainSidebarCollapsed={isSidebarCollapsed}
            isMobileOpen={isServicesSubSidebarOpen}
            onMobileClose={handleServicesSubSidebarClose}
          />
        )}
        
        {/* Main content area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed 
            ? (isServicesRoute ? 'lg:ml-[18rem]' : 'lg:ml-16')
            : (isServicesRoute ? 'lg:ml-[28rem]' : 'lg:ml-56')
        }`}>
          <MainboardHeader userName="Olivia" />
          
          {/* Services Menu Toggle Button - Mobile only */}
          {isServicesRoute && (
            <div className="lg:hidden px-4 py-2 bg-white border-b border-gray-200">
              <button
                onClick={handleServicesSubSidebarToggle}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0479bf] via-[#39988b] to-[#7ec247] text-white rounded-md text-sm font-medium"
              >
                <span>My Services Menu</span>
              </button>
            </div>
          )}
          
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Mainlayout;