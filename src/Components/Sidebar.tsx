// Sidebar.tsx
import { useState } from "react";
import { Home, Users, Upload, MessageSquare, Calendar, Settings, LifeBuoy, Menu } from "lucide-react";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightExpand } from "react-icons/tb";
import { GoSidebarCollapse } from "react-icons/go";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, active: true },
    { name: "My Referrals", icon: <Users size={18} /> },
    { name: "Clients", icon: <Users size={18} /> },
    { name: "Uploads", icon: <Upload size={18} /> },
    { name: "Messages", icon: <MessageSquare size={18} /> },
    { name: "Calendar", icon: <Calendar size={18} /> },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-40 p-4 border-b">
        <div className="flex items-center justify-between">
          <button onClick={toggleMobileSidebar} className="p-2 rounded-md hover:bg-gray-100">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-md flex flex-col justify-between z-30
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-16" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div />
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex lg:items-center lg:gap-2 p-2 rounded hover:bg-gray-100"
            >
              {!isCollapsed && <span className="font-medium text-sm">Collapse</span>}
              {isCollapsed ? <GoSidebarCollapse size={16}/> : <TbLayoutSidebarLeftCollapse size={16} />}
            </button>
          </div>

          {/* Navigation Items */}
          <ul className="mt-4 flex-1">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`
                  flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors
                  hover:bg-green-50 hover:text-green-600
                  ${item.active ? "bg-green-100 text-green-600 border-r-2 border-green-600" : "text-gray-600"}
                  ${isCollapsed ? "justify-center px-3" : ""}
                `}
              >
                {item.icon}
                {!isCollapsed && <span className="font-medium">{item.name}</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="border-t">
          <div
            className={`flex items-center gap-3 px-6 py-3 cursor-pointer text-gray-600 transition-colors hover:bg-green-50 hover:text-green-600 ${
              isCollapsed ? "justify-center px-3" : ""
            }`}
          >
            <LifeBuoy size={18} />
            {!isCollapsed && <span className="font-medium">Support</span>}
          </div>
          <div
            className={`flex items-center gap-3 px-6 py-3 cursor-pointer text-gray-600 transition-colors hover:bg-green-50 hover:text-green-600 ${
              isCollapsed ? "justify-center px-3" : ""
            }`}
          >
            <Settings size={18} />
            {!isCollapsed && <span className="font-medium">Settings</span>}
          </div>
        </div>
      </div>

      {/* Spacer for mobile header */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default Sidebar;