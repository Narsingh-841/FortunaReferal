import { useState } from "react";
import { Home, Users, Upload, MessageSquare, Calendar, Settings, LifeBuoy, ChevronLeft, Menu } from "lucide-react";

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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-40 p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={toggleMobileSidebar}
            className="p-2 rounded-md hover:bg-gray-100"
          >
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
      <div className={`
        fixed lg:static top-0 left-0 h-screen bg-white shadow-md flex flex-col justify-between z-40
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div>
          <div className="flex items-center justify-between p-4">
            
            {isCollapsed && (
              <img src="/logo192.png" alt="Logo" className="w-8 h-8 mx-auto" />
            )}
            <button 
              onClick={toggleSidebar}
              className="hidden lg:block p-1 rounded hover:bg-gray-100"
            >
              <ChevronLeft 
                size={16} 
                className={`transition-transform duration-300 ${
                  isCollapsed ? 'rotate-180' : ''
                }`} 
              />
            </button>
          </div>

          {/* Navigation Items */}
          <ul className="mt-4">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`
                  flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-green-50
                  ${item.active ? "bg-green-100 text-green-600" : ""}
                  ${isCollapsed ? "justify-center px-3" : ""}
                `}
              >
                {item.icon}
                {!isCollapsed && <span>{item.name}</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Items */}
        <div className="mb-6">
          <div className={`
            flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-green-50
            ${isCollapsed ? "justify-center px-3" : ""}
          `}>
            <LifeBuoy size={18} />
            {!isCollapsed && <span>Support</span>}
          </div>
          <div className={`
            flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-green-50
            ${isCollapsed ? "justify-center px-3" : ""}
          `}>
            <Settings size={18} />
            {!isCollapsed && <span>Settings</span>}
          </div>
        </div>
      </div>

      {/* Main Content Spacer for Mobile */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default Sidebar;