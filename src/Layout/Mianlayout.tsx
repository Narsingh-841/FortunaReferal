// src/components/Layout.tsx
import { Outlet } from "react-router-dom";

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Mainlayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header - fixed at top */}
      <Header />

      <div className="flex flex-1">
        {/* Main content area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

        {/* Sidebar below header (on the right side in horizontal layout) */}
        <Sidebar />
      </div>
    </div>
  );
};

export default Mainlayout;
