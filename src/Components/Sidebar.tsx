// Sidebar.tsx
import { Home, Users, Upload, MessageSquare, Calendar, Settings, LifeBuoy } from "lucide-react";
import { GoSidebarCollapse } from "react-icons/go";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

const Sidebar = ({ isCollapsed, onCollapse, isMobileOpen, onMobileToggle }: SidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/", active: true },
    { name: "My Referrals", icon: <Users size={18} />, path: "/my-referrals" },
    { name: "Clients", icon: <Users size={18} />, path: "/clients" },
    { name: "Uploads", icon: <Upload size={18} />, path: "/uploads" },
    { name: "Messages", icon: <MessageSquare size={18} />, path: "/messages" },
    { name: "Calendar", icon: <Calendar size={18} />, path: "/calendar" },
  ];

  const toggleSidebar = () => {
    onCollapse(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-white border-r border-gray-200 flex flex-col justify-between z-30
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-16" : "w-56"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div />
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex lg:items-center lg:gap-2 p-1.5 rounded hover:bg-gray-100 transition-colors"
            >
              {!isCollapsed && <span className="font-medium text-sm">Collapse</span>}
              {isCollapsed ? <GoSidebarCollapse size={20} /> : <TbLayoutSidebarLeftCollapse size={16} />}
            </button>
          </div>

          {/* Navigation Items */}
          <ul className="mt-4 flex-1">
            {menuItems.map((item) => (
              <li
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`
                  flex items-center gap-3 transition-colors
                  hover:bg-green-50 py-2 px-3 mx-2 my-3
                  ${item.active 
                    ? "bg-gradient-to-r from-[#0479bf] via-[#39988b] to-[#7ec247] text-white rounded-md"
                    : "text-gray-600 cursor-pointer"
                  }
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
        <div>
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
    </>
  );
};

export default Sidebar;
