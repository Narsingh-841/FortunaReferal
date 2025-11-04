import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import UploadModal from "../UploadModal/UploadModal";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { CgAttachment, CgSupport } from "react-icons/cg";
import { MdOutlineFilterList } from "react-icons/md";

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
        <div className="p-6 min-h-screen">
            {/* Service Info Section */}
            <div className="mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
                    {/* Left: Service Details */}
                    <div className="space-y-5 border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between pb-2">
                            <span className="font-medium text-gray-700">
                                Activation
                            </span>
                            <span className="text-gray-900">
                                {activationDate}
                            </span>
                        </div>

                        <div className="flex items-center justify-between pb-2">
                            <span className="font-medium text-gray-700">
                                Stage
                            </span>
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-1.5 rounded-md">
                                {stage}
                            </span>
                        </div>

                        <div className="flex items-center justify-between pb-2">
                            <span className="font-medium text-gray-700">
                                Last Contact
                            </span>
                            <span className="text-gray-900">{lastContact}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-700">
                                Assignee
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-sm font-semibold">
                                    {assignee.initial}
                                </div>
                                <span className="font-medium text-gray-900">
                                    {assignee.name}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-col gap-3 w-full">
                        <button className="flex items-center justify-between px-5 py-1 gap-36 border border-gray-300 rounded-full hover:bg-gray-50 transition">
                            <div className="flex items-center gap-2">
                                <BiMessageRoundedDetail
                                    size={20}
                                    className="text-gray-600"
                                />
                                <span className="font-medium text-gray-900">
                                    Contact {assignee.name}
                                </span>
                            </div>
                            <ArrowUpRight
                                size={18}
                                className="text-green-500"
                            />
                        </button>

                        <button className="flex items-center justify-between px-5 py-1 gap-36 border border-gray-300 rounded-full hover:bg-gray-50 transition">
                            <div className="flex items-center gap-2">
                                <CgSupport
                                    size={18}
                                    className="text-gray-600"
                                />
                                <span className="font-medium text-gray-900">
                                    Support
                                </span>
                            </div>
                            <ArrowUpRight
                                size={18}
                                className="text-green-500"
                            />
                        </button>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-between px-5 py-1 gap-36 border border-gray-300 rounded-full hover:bg-gray-50 transition"
                        >
                            <div className="flex items-center gap-2">
                                <CgAttachment
                                    size={18}
                                    className="text-gray-600"
                                />
                                <span className="font-medium text-gray-900">
                                    Uploads
                                </span>
                            </div>
                            <ArrowUpRight
                                size={18}
                                className="text-green-500"
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* What's Included */}
            <div className="bg-white mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        What’s included?
                    </h2>
                    <button className="flex items-center gap-1 border border-gray-200 px-5 py-1 rounded-full text-sm font-medium">
                        Find Out More
                        <ArrowUpRight size={16} className="text-green-600" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {includedServices.map((service, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition bg-white"
                        >
                            <h3 className="text-base font-semibold text-gray-900 mb-1">
                                {service.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Recent Activity</h2>
                    <button className="flex items-center gap-1 border border-gray-200 px-5 py-1 rounded-full text-sm font-medium">
                        View All Activity
                        <ArrowUpRight size={16} className="text-green-600" />
                    </button>
                </div>

                {/* Desktop Table */}
                <div className="hidden sm:block w-full overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full table-auto">
                        <thead className="bg-white">
                            <tr className="text-left text-sm font-semibold border-b border-gray-200 text-black">
                                <th className="py-3 px-4">
                                    <div className="flex items-center gap-1 justify-start">
                                        <span>Service</span>
                                        <MdOutlineFilterList
                                            size={18}
                                            className="text-gray-600"
                                        />
                                    </div>
                                </th>
                                <th className="py-3 px-4">
                                    <div className="flex items-center gap-1 justify-start">
                                        <span>Activity</span>
                                        <MdOutlineFilterList
                                            size={18}
                                            className="text-gray-600"
                                        />
                                    </div>
                                </th>
                                <th className="py-3 px-4">
                                    <div className="flex items-center gap-1 justify-start">
                                        <span>Date</span>
                                        <MdOutlineFilterList
                                            size={18}
                                            className="text-gray-600"
                                        />
                                    </div>
                                </th>
                                <th className="py-3 px-4">
                                    <div className="flex items-center gap-1 justify-start">
                                        <span>Time</span>
                                        <MdOutlineFilterList
                                            size={18}
                                            className="text-gray-600"
                                        />
                                    </div>
                                </th>
                                <th className="py-3 px-4">
                                    <div className="flex items-center gap-1 justify-start">
                                        <span>Assignee</span>
                                        <MdOutlineFilterList
                                            size={18}
                                            className="text-gray-600"
                                        />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivities.map((activity, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 1
                                            ? "bg-[#f2f8ec]"
                                            : "bg-white"
                                    } text-sm`}
                                >
                                    <td className="py-3 px-4">
                                        {activity.service}
                                    </td>
                                    <td className="py-3 px-4">
                                        {activity.activity}
                                    </td>
                                    <td className="py-3 px-4">
                                        {activity.date}
                                    </td>
                                    <td className="py-3 px-4">
                                        {activity.time}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-semibold">
                                                {activity.assignee.charAt(0)}
                                            </div>
                                            <span>{activity.assignee}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card Layout */}
                <div className="block sm:hidden space-y-4">
                    {recentActivities.map((activity, index) => (
                        <div
                            key={index}
                            className={`border border-gray-200 rounded-lg p-4 ${
                                index % 2 === 1 ? "bg-[#f2f8ec]" : "bg-white"
                            }`}
                        >
                            <div className="grid grid-cols-[auto_1fr] gap-2 items-center mb-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-semibold">
                                    {activity.assignee.charAt(0)}
                                </div>
                                <span className="text-sm font-medium">
                                    {activity.assignee}
                                </span>
                            </div>
                            <div className="text-sm">
                                <p>
                                    <span className="font-medium">
                                        Service:{" "}
                                    </span>
                                    {activity.service}
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Activity:{" "}
                                    </span>
                                    {activity.activity}
                                </p>
                                <p>
                                    <span className="font-medium">Date: </span>
                                    {activity.date}
                                </p>
                                <p>
                                    <span className="font-medium">Time: </span>
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
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
