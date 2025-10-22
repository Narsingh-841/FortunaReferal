import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";

interface SubMenuItem {
  name: string;
  path: string;
}

interface ServicesSubSidebarProps {
  isMainSidebarCollapsed: boolean;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const ServicesSubSidebar = ({ 
  isMainSidebarCollapsed, 
  isMobileOpen = false,
  onMobileClose 
}: ServicesSubSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const serviceItems: SubMenuItem[] = [
    { name: "Accounting", path: "/services/accounting" },
    { name: "Business Advisory", path: "/services/business-advisory" },
    { name: "Finance", path: "/services/finance" },
    { name: "Insurance", path: "/services/insurance" },
    { name: "IT", path: "/services/it" },
    { name: "Legal", path: "/services/legal" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden inset-0 bg-black bg-opacity-50 z-40"
          onClick={onMobileClose}
        />
      )}

      {/* Sub-Sidebar */}
      <div
        className={`
          fixed top-14 bg-white border-r border-gray-200 h-[calc(100vh-3.5rem)]
          transition-all duration-300 ease-in-out z-40
          
       
          ${isMainSidebarCollapsed ? 'lg:left-16' : 'lg:left-56'}
          
       
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          
          lg:translate-x-0
          w-56
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">My Services</h2>
          
          {/* Close button - only visible on mobile */}
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1.5 rounded hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Service Items */}
        <ul className="mt-2 px-2 overflow-y-auto h-[calc(100%-5rem)]">
          {serviceItems.map((item) => {
            const active = isActive(item.path);
            return (
              <li
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`
                  flex items-center px-4 py-3 my-1 rounded-md
                  transition-colors cursor-pointer
                  hover:bg-green-50
                  ${active
                    ? "bg-gradient-to-r from-[#0479bf] via-[#39988b] to-[#7ec247] text-white"
                    : "text-gray-700"}
                `}
              >
                <span className="font-medium text-sm">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ServicesSubSidebar;