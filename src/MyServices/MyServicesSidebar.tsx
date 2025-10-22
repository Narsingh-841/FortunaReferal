import React, { type JSX } from "react";
import { NavLink } from "react-router-dom";
import { Shield, Briefcase, DollarSign, HeartPulse, Cpu, Scale } from "lucide-react";


interface Service {
  name: string;
  icon: JSX.Element;
  path: string;
}

const services: Service[] = [
  { name: "Accounting", icon: <DollarSign size={18} />, path: "/services/accounting" },
  { name: "Business Advisory", icon: <Briefcase size={18} />, path: "/services/business-advisory" },
  { name: "Finance", icon: <HeartPulse size={18} />, path: "/services/finance" },
  { name: "Insurance", icon: <Shield size={18} />, path: "/services/insurance" },
  { name: "IT", icon: <Cpu size={18} />, path: "/services/it" },
  { name: "Legal", icon: <Scale size={18} />, path: "/services/legal" },
];

const MyServicesSidebar: React.FC = () => {
  return (
    <div className=" fixed top-14 h-[calc(100vh-3.5rem)] bg-white border-r border-gray-200 
          flex flex-col justify-between z-30 transition-all duration-300 ease-in-out">
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">My Services</h2>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {services.map((service) => (
          <NavLink
            key={service.name}
            to={service.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 
               ${
                 isActive
                   ? "bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-sm"
                   : "text-gray-700 hover:bg-gray-100"
               }`
            }
          >
            {service.icon}
            <span>{service.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MyServicesSidebar;
