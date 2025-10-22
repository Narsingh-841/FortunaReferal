import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { LuCalendar, LuChevronDown } from "react-icons/lu";
import "../Referral/CalendarCustom.css";

interface Row {
    date: string;
    time: string;
    service: string;
    activityType: string;
    notes: string;
}

const data: Row[] = [
    {
        date: "02/10/2025",
        time: "10:30 AM",
        service: "Accounting",
        activityType: "Document Upload",
        notes: "-",
    },
    {
        date: "10/09/2025",
        time: "11:30 AM",
        service: "Insurance",
        activityType: "Document Upload",
        notes: "-",
    },
    {
        date: "02/10/2025",
        time: "01:30 PM",
        service: "Accounting",
        activityType: "Staff Assigned",
        notes: "-",
    },
    {
        date: "10/09/2025",
        time: "7:30 PM",
        service: "Insurance",
        activityType: "Document",
        notes: "-",
    },
];

const ActivityLog: React.FC = () => {
    const [showDate, setShowDate] = useState(false);
    const [showService, setShowService] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedService, setSelectedService] = useState<string | null>(null);

    React.useEffect(() => {
        if (showDate || showService) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showDate, showService]);

    const services = [
        "All Services",
        "Accounting",
        "Insurance",
        "Tax",
        "Consulting",
    ];

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setShowDate(false);
    };

    const handleServiceSelect = (service: string) => {
        setSelectedService(service);
        setShowService(false);
    };

    const handleCloseCalendar = () => {
        setShowDate(false);
    };

    const handleCloseService = () => {
        setShowService(false);
    };

    return (
        <div className="w-full p-6 bg-gradient-to-b from-[#f2f8ec] to-white rounded-lg">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h2 className="text-lg sm:text-xl font-bold">
                    Activity Timeline
                </h2>
                <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 w-full sm:w-auto relative">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3 relative">
                            {/* Service Button */}
                            <button
                                onClick={() => {
                                    setShowService(!showService);
                                    setShowDate(false);
                                }}
                                className="flex items-center gap-2 border rounded-full px-3 py-1.5 text-sm text-black bg-white hover:bg-gray-50 border-gray-200 cursor-pointer"
                            >
                                <span>Service</span>
                                <LuChevronDown />
                            </button>
                            {/* Date Button */}
                            <button
                                onClick={() => {
                                    setShowDate(!showDate);
                                    setShowService(false);
                                }}
                                className="flex items-center gap-2 border rounded-full px-3 py-1.5 text-sm text-black bg-white hover:bg-gray-50 border-gray-200 cursor-pointer"
                            >
                                <LuCalendar />
                                <span>Date</span>
                            </button>

                            {/* Calendar Dropdown */}
                            {showDate && (
                                <>
                                    <div
                                        className="fixed inset-0 bg-black/20 z-40"
                                        onClick={handleCloseCalendar}
                                    />
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

                            {/* Service Dropdown */}
                            {showService && (
                                <>
                                    <div
                                        className="fixed inset-0 bg-black/20 z-40"
                                        onClick={handleCloseService}
                                    />
                                    <div className="absolute top-12 left-0 sm:-left-18 bg-white shadow-lg rounded-md border p-2 z-50 min-w-[160px]">
                                        <div className="space-y-1">
                                            {services.map((service) => (
                                                <button
                                                    key={service}
                                                    onClick={() =>
                                                        handleServiceSelect(
                                                            service
                                                        )
                                                    }
                                                    className={`block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                                                        selectedService ===
                                                        service
                                                            ? "bg-blue-50 text-blue-600"
                                                            : "text-gray-700"
                                                    }`}
                                                >
                                                    {service}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex justify-end mt-2 pt-2 border-t">
                                            <button
                                                onClick={handleCloseService}
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
            <div className="hidden lg:block overflow-x-auto border bg-white border-gray-200 p-4 rounded-lg">
                <table className="min-w-full border-collapse">
                    <thead className="bg-white">
                        <tr className="text-left text-sm font-semibold border-b border-gray-200 text-black">
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Time</th>
                            <th className="px-4 py-3">Service</th>
                            <th className="px-4 py-3">Activity Type</th>
                            <th className="px-4 py-3">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr
                                key={i}
                                className={`text-sm border-none ${
                                    i % 2 === 0 ? "bg-white" : "bg-[#f2f8ec]"
                                }`}
                            >
                                <td className="px-4 py-3">
                                    {row.date}
                                </td>
                                <td className="px-4 py-3">
                                    {row.time}
                                </td>
                                <td className="px-4 py-3">{row.service}</td>
                                <td className="px-4 py-3">{row.activityType}</td>
                                <td className="px-4 py-3">{row.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tablet View */}
            <div className="hidden md:block lg:hidden overflow-x-auto bg-white border rounded-lg">
                <table className="min-w-full border-collapse text-sm">
                    <thead className="bg-white">
                        <tr className="text-left font-semibold text-black">
                            <th className="px-3 py-2">Date</th>
                            <th className="px-3 py-2">Time</th>
                            <th className="px-3 py-2">Service</th>
                            <th className="px-3 py-2">Activity Type</th>
                            <th className="px-3 py-2">Notes</th>
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
                                <td className="px-4 py-3">
                                    {row.date}
                                </td>
                                <td className="px-4 py-3">
                                    {row.time}
                                </td>
                                <td className="px-4 py-3">{row.service}</td>
                                <td className="px-4 py-3">{row.activityType}</td>
                                <td className="px-4 py-3">{row.notes}</td>
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
                        className={` border rounded-lg p-4 ${
                            i % 2 === 0 ? "bg-white" : "bg-[#f2f8ec]"
                        }`}
                    >
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <div className="text-xs text-gray-500 font-medium">
                                    Date
                                </div>
                                <div className="font-medium">
                                    {row.date}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-medium">
                                    Time
                                </div>
                                <div className="font-medium">
                                    {row.time}
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="text-xs text-gray-500 font-medium">
                                    Service
                                </div>
                                <div className="truncate">{row.service}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-medium">
                                    Activity Type
                                </div>
                                <div>{row.activityType}</div>
                            </div>
                            <div>
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

export default ActivityLog;
