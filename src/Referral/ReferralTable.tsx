import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { LuCalendar } from "react-icons/lu";
import "./CalendarCustom.css";
import { useNavigate,} from "react-router-dom";

interface Row {
    referrerName: string;
    referralName: string;
    email: string;
    date: string;
    phone: string;
    service: string;
    status: string;
    notes: string;
}

const data: Row[] = [
    {
        referrerName: "Deepika",
        referralName: "Rahul",
        email: "rahul@2gmail.com",
        date: "02/10/2025",
        phone: "+6958748596",
        service: "Accounting",
        status: "Onboarding",
        notes: "-",
    },
    {
        referrerName: "Rebecca",
        referralName: "Arvin",
        email: "arvin@2gmail.com",
        date: "10/09/2025",
        phone: "+6958748596",
        service: "Insurance",
        status: "Onboarding",
        notes: "-",
    },
    {
        referrerName: "Deepika",
        referralName: "Rahul",
        email: "rahul@2gmail.com",
        date: "02/10/2025",
        phone: "+6958748596",
        service: "Accounting",
        status: "Onboarding",
        notes: "-",
    },
    {
        referrerName: "Rebecca",
        referralName: "Arvin",
        email: "arvin@2gmail.com",
        date: "10/09/2025",
        phone: "+6958748596",
        service: "Insurance",
        status: "Onboarding",
        notes: "-",
    },
];

const ReferralTable: React.FC = () => {
    const [showDate, setshowDate] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const navigate = useNavigate();

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setshowDate(false);
    };

    const handleCloseCalendar = () => {
        setshowDate(false);
    };
  const handleAddNewClick = () => {
        // Navigate to the add new referral page
        navigate('/my-referrals/new');
    };
    return (
        <div className="w-full p-6 bg-white rounded-lg">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-[#1A1A1A]">
                    List
                </h2>
                <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 w-full sm:w-auto relative">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3 relative">
                            <button
                                onClick={() => setshowDate(!showDate)}
                                className="flex items-center gap-2 border rounded-full px-3 py-1.5 text-sm text-black bg-white hover:bg-gray-50 border-gray-200 cursor-pointer"
                            >
                                <LuCalendar />
                                <span>Date</span>
                            </button>
                            <button 
                             onClick={handleAddNewClick}
                            className="rounded-md px-4 py-1.5 font-medium text-sm border  cursor-pointer hover:bg-gray-50">
                                + Add New
                            </button>
                            
                            {/* Calendar Dropdown */}
                            {showDate && (
                                <>
                                    {/* Background Overlay */}
                                    <div 
                                        className="fixed inset-0 bg-black/20 z-40"
                                        onClick={handleCloseCalendar}
                                    />
                                    
                                    {/* Calendar Container */}
                                    <div className="absolute top-12 left-0 sm:-left-24 bg-white shadow-lg rounded-xl border p-2 z-50">
                                        <Calendar
                                            onChange={(date) =>
                                                handleDateChange(date as Date)
                                            }
                                            value={selectedDate}
                                        />
                                        <div className="flex justify-end mt-2">
                                            <button
                                                onClick={handleCloseCalendar}
                                                className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto border border-gray-200 p-4 rounded-lg">
                <table className="min-w-full border-collapse">
                    <thead className="bg-white">
                        <tr className="text-left text-sm font-semibold border-b border-gray-200 text-black">
                            <th className="px-4 py-3">Referrer Name</th>
                            <th className="px-4 py-3">Referral Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Phone No.</th>
                            <th className="px-4 py-3">Service</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr
                                key={i}
                                className={`text-sm border-none ${
                                    i % 2 === 0 ? "bg-white" : "bg-[#f2f8ec]"
                                } border-t`}
                            >
                                <td className="px-4 py-3">
                                    {row.referrerName}
                                </td>
                                <td className="px-4 py-3">
                                    {row.referralName}
                                </td>
                                <td className="px-4 py-3">{row.email}</td>
                                <td className="px-4 py-3">{row.date}</td>
                                <td className="px-4 py-3">{row.phone}</td>
                                <td className="px-4 py-3">{row.service}</td>
                                <td className="px-4 py-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{row.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tablet View */}
            <div className="hidden md:block lg:hidden overflow-x-auto border rounded-lg">
                <table className="min-w-full border-collapse text-sm">
                    <thead className="bg-white">
                        <tr className="text-left font-semibold text-black">
                            <th className="px-3 py-2">Referrer</th>
                            <th className="px-3 py-2">Referral</th>
                            <th className="px-3 py-2">Email</th>
                            <th className="px-3 py-2">Date</th>
                            <th className="px-3 py-2">Service</th>
                            <th className="px-3 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr
                                key={i}
                                className={`${
                                    i % 2 === 0 ? "bg-white" : "bg-[#f2f8ec]"
                                } border-t`}
                            >
                                <td className="px-3 py-2">
                                    {row.referrerName}
                                </td>
                                <td className="px-3 py-2">
                                    {row.referralName}
                                </td>
                                <td className="px-3 py-2 truncate max-w-[120px]">
                                    {row.email}
                                </td>
                                <td className="px-3 py-2">{row.date}</td>
                                <td className="px-3 py-2">{row.service}</td>
                                <td className="px-3 py-2">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden space-y-3">
                {data.map((row, i) => (
                    <div
                        key={i}
                        className={`border rounded-lg p-4 ${
                            i % 2 === 0 ? "bg-white" : "bg-[#f2f8ec]"
                        }`}
                    >
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <div className="text-xs text-gray-500 font-medium">
                                    Referrer
                                </div>
                                <div className="font-medium">
                                    {row.referrerName}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-medium">
                                    Referral
                                </div>
                                <div className="font-medium">
                                    {row.referralName}
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="text-xs text-gray-500 font-medium">
                                    Email
                                </div>
                                <div className="truncate">{row.email}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-medium">
                                    Date
                                </div>
                                <div>{row.date}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-medium">
                                    Phone
                                </div>
                                <div>{row.phone}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-medium">
                                    Service
                                </div>
                                <div>{row.service}</div>
                            </div>
                            <div className="col-span-2">
                                <div className="text-xs text-gray-500 font-medium">
                                    Status
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {row.status}
                                </span>
                            </div>
                            <div className="col-span-2">
                                <div className="text-xs text-gray-500 font-medium">
                                    Notes
                                </div>
                                <div>{row.notes}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReferralTable;