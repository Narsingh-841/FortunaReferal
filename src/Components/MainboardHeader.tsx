// src/components/DashboardHeader.tsx
import React from "react";

interface DashboardHeaderProps {
  userName: string;
}

const MainboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  return (
     <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-4">
        {/* Dashboard title */}
        <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
        
        {/* Vertical divider */}
        <div className="h-6 w-px bg-gray-300"></div>
        
        {/* Welcome message */}
        <div className="text-gray-700 text-sm">
          Welcome, <span className="font-medium text-black">{userName}</span>
        </div>
      </div>
    </header>
  );
};

export default MainboardHeader;