import { ArrowUpRight, MessageSquare, Upload, User } from "lucide-react";
import { useState } from "react";
import UploadModal from "../UploadModal/UploadModal";

interface UploadItem {
  id: string;
  name: string;
  date: string;
  uploadedBy: string;
}

interface IncludedService {
  title: string;
  description: string;
}

interface Activity {
  service: string;
  activity: string;
  date: string;
  time: string;
  assignee: string;
}

interface Assignee {
  name: string;
  initial: string;
}

interface ServiceDetailsPageProps {
  serviceName: string;
  activationDate: string;
  stage: string;
  lastContact: string;
  assignee: Assignee;
  includedServices: IncludedService[];
  recentActivities: Activity[];
  uploadItems: UploadItem[];
  onUpload: (file: File) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}

const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = ({
  serviceName,
  activationDate,
  stage,
  lastContact,
  assignee,
  includedServices,
  recentActivities,
  uploadItems,
  onUpload,
  onDownload,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Service Details Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
          {/* Left Info */}
          <div className="space-y-6">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <label className="text-base font-semibold text-gray-800">Activation</label>
              <p className="text-base text-gray-900">{activationDate}</p>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <label className="text-base font-semibold text-gray-800">Stage</label>
              <span className="text-sm bg-blue-50 text-blue-700 px-4 py-1.5 rounded-md font-medium">
                {stage}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <label className="text-base font-semibold text-gray-800">Last Contact</label>
              <p className="text-base text-gray-900">{lastContact}</p>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="text-base font-semibold text-gray-800">Assignee</label>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white text-sm font-medium">
                  {assignee.initial}
                </div>
                <span className="text-base text-gray-900 font-medium">{assignee.name}</span>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex flex-col gap-4 lg:min-w-[240px]">
            <button className="flex items-center justify-between gap-3 px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full">
              <div className="flex items-center gap-3">
                <MessageSquare size={20} className="text-gray-600" />
                <span className="text-base font-medium text-gray-900">Contact {assignee.name}</span>
              </div>
              <ArrowUpRight size={20} className="text-green-500" />
            </button>

            <button className="flex items-center justify-between gap-3 px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full">
              <div className="flex items-center gap-3">
                <User size={20} className="text-gray-600" />
                <span className="text-base font-medium text-gray-900">Support</span>
              </div>
              <ArrowUpRight size={20} className="text-green-500" />
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-between gap-3 px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full"
            >
              <div className="flex items-center gap-3">
                <Upload size={20} className="text-gray-600" />
                <span className="text-base font-medium text-gray-900">Uploads</span>
              </div>
              <ArrowUpRight size={20} className="text-green-500" />
            </button>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">What's included?</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Find Out More
            <ArrowUpRight size={20} className="text-green-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {includedServices.map((service, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-base">{service.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View All Activity
            <ArrowUpRight size={20} className="text-green-500" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Service</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Activity</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Assignee</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 ${
                    index % 2 === 1 ? "bg-green-50" : "bg-white"
                  }`}
                >
                  <td className="py-3.5 px-4 text-sm text-gray-900">{activity.service}</td>
                  <td className="py-3.5 px-4 text-sm text-gray-900">{activity.activity}</td>
                  <td className="py-3.5 px-4 text-sm text-gray-900">{activity.date}</td>
                  <td className="py-3.5 px-4 text-sm text-gray-900">{activity.time}</td>
                  <td className="py-3.5 px-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-medium">
                      {activity.assignee.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-900">{activity.assignee}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${serviceName} Uploads`}
        items={uploadItems}
        onUpload={onUpload}
        onDownload={onDownload}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ServiceDetailsPage;
