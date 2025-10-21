import { Settings, LifeBuoy } from "lucide-react";
import { GoSidebarCollapse } from "react-icons/go";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "./menuConfig";

interface SidebarProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

const Sidebar = ({ isCollapsed, onCollapse, isMobileOpen, onMobileToggle }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => onCollapse(!isCollapsed);

  const isRouteActive = (path: string) => {
    const current = location.pathname;
  
    // ✅ Exact match or subpath
    if (current === path || current.startsWith(`${path}/`)) return true;
  
    // ✅ Handle dynamic path like /client/:clientName
    if (path.includes(":")) {
      const base = path.split("/:")[0];
      return current.startsWith(base);
    }
  
    // ✅ Handle singular/plural case (e.g., /clients → /client/:id)
    if (path === "/clients" && current.startsWith("/client/")) return true;
  
    return false;
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
          fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-white border-r border-gray-200 
          flex flex-col justify-between z-30 transition-all duration-300 ease-in-out
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
            {menuItems.map((item) => {
              const active = isRouteActive(item.path);
              const Icon = item.icon;
              return (
                <li
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`
                    flex items-center gap-3 transition-colors
                    hover:bg-green-50 py-2 px-3 mx-2 my-3 rounded-md
                    ${active
                      ? "bg-gradient-to-r from-[#0479bf] via-[#39988b] to-[#7ec247] text-white"
                      : "text-gray-600 cursor-pointer"}
                    ${isCollapsed ? "justify-center px-3" : ""}
                  `}
                >
                  <Icon size={18} />
                  {!isCollapsed && <span className="font-medium">{item.name}</span>}
                </li>
              );
            })}
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
