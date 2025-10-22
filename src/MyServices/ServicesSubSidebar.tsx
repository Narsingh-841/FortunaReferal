import { useNavigate, useLocation } from "react-router-dom";

interface SubMenuItem {
  name: string;
  path: string;
}

interface ServicesSubSidebarProps {
  isMainSidebarCollapsed: boolean;
}

const ServicesSubSidebar = ({ isMainSidebarCollapsed }: ServicesSubSidebarProps) => {
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

  return (
    <div
      className={`
        fixed top-14 bg-white border-r border-gray-200 h-[calc(100vh-3.5rem)]
        transition-all duration-300 ease-in-out z-20
        ${isMainSidebarCollapsed ? 'left-16' : 'left-56'}
        w-56
      `}
    >
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">My Services</h2>
      </div>

      {/* Service Items */}
      <ul className="mt-2 px-2">
        {serviceItems.map((item) => {
          const active = isActive(item.path);
          return (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
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
  );
};

export default ServicesSubSidebar;