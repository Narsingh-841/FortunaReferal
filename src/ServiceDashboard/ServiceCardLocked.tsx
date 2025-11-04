import React from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

interface ServiceCardLockedProps {
  title: string;
  description: string;
  subServices: string[];
}

const ServiceCardLocked: React.FC<ServiceCardLockedProps> = ({
  title,
  description,
  subServices,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-[260px] rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 bg-gray-100 px-5 py-3">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <CiLock size={22} className="stroke-[1.5]" />
      </div>

      <div className="px-5 py-3 bg-gray-100">
        {/* Description */}
      <p className="text-sm text-gray-700 mb-4">{description}</p>

      {/* View Button */}
      <button 
        className="w-fit bg-black hover:bg-black/80 text-white font-medium rounded-full px-5 py-2 flex items-center gap-2 transition cursor-pointer"
        onClick={() => navigate("/new-service")}  
      >
        Explore More <ArrowUpRight className="w-4 h-4 text-[#91e026]" />
      </button>

      {/* Sub-services */}
      <div className="mt-5 bg-white rounded-xl p-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Unlock access to:</p>
        <ul className="space-y-2">
          {subServices.map((sub, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-800">
              <Check className="w-4 h-4 text-[#91e026]" />
              {sub}
            </li>
          ))}
        </ul>
      </div>
      </div>  
      
    </div>
  );
};

export default ServiceCardLocked;
