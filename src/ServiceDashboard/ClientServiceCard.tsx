import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  stage: "Onboarding" | "On Hold" | "Active";
  lastContactDate: string;
  contactName: string;
  contactImage?: string;
}

const stageColors: Record<string, string> = {
  Onboarding: "bg-blue-100 text-blue-700",
  "On Hold": "bg-amber-100 text-amber-700",
  Active: "bg-pink-100 text-pink-700",
};

const ClientServiceCard: React.FC<ServiceCardProps> = ({
  title,
  stage,
  lastContactDate,
  contactName,
  contactImage,
}) => {
  return (
    <div className="w-[260px] rounded-xl border border-gray-200 bg-white shadow-sm p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <div className="text-gray-400 text-xl leading-none cursor-move">⋮⋮</div>
        </div>

        {/* Details */}
        <div className="text-sm text-gray-800 space-y-2">
          <p>Activation</p>
          <p>Activation</p>

          <p className="font-medium mt-1">Stage</p>
          <span
            className={`inline-block mt-1 px-3 py-1 rounded-md text-sm font-medium ${stageColors[stage]}`}
          >
            {stage}
          </span>

          <div className="mt-3">
            <p className="font-medium">Last Contact</p>
            <p className="text-gray-700">{lastContactDate}</p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            {contactImage && (
              <img
                src={contactImage}
                alt={contactName}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="text-gray-900 font-medium">{contactName}</span>
          </div>
        </div>
      </div>

      {/* Footer button */}
      <button className="mt-5 border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition">
        View Details <ArrowUpRight className="w-4 h-4 text-[#91e026]" />
      </button>
    </div>
  );
};

export default ClientServiceCard;
