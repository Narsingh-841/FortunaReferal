// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Mainlayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header - Always at the top */}
      <Header />
      
      {/* Main content area with sidebar and content */}
      <div className="flex flex-1">
        {/* Sidebar - Below header */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        {/* Mobile sidebar - overlay style */}
        <div className="lg:hidden">
          <Sidebar />
        </div>
        
        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto lg:ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Mainlayout;