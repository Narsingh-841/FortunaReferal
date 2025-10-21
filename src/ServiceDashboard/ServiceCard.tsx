import React from "react";
import { ArrowUpRight } from "lucide-react";

type ServiceCardProps = {
  title: string;
  totalReferrals: number;
  inProgress: number;
  converted: number;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, totalReferrals, inProgress, converted }) => {
  return (
    <div className="w-[250px] rounded-xl border border-gray-200 shadow-sm bg-white p-4 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="cursor-move text-gray-500">⋮⋮</div>
        </div>
        <div className="space-y-1 text-sm text-gray-700">
          <p><span className="font-medium">Total Referrals</span><br />{totalReferrals}</p>
          <p><span className="font-medium">In Progress</span><br />{inProgress}</p>
          <p><span className="font-medium">Converted</span><br />{converted}</p>
        </div>
      </div>
      <button className="mt-4 border rounded-full px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition">
        View Details <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ServiceCard;
