import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

type UserType = "client" | "staff";
type AccessLevel = "view" | "edit";

interface Service {
    name: string;
    accessLevel: AccessLevel;
    notes: string;
}

interface ClientFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    referralSource: string;
    company: string;
    service: string;
    accessType: "full" | "custom";
    services: Service[];
}

interface StaffFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    designation: string;
    department: string;
}

const ClientStaffPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<UserType>("client");

    const [clientData, setClientData] = useState<ClientFormData>({
        fullName: "",
        email: "",
        phoneNumber: "",
        referralSource: "",
        company: "",
        service: "",
        accessType: "full",
        services: [
            { name: "Accounting", accessLevel: "view", notes: "" },
            { name: "Insurance", accessLevel: "view", notes: "" },
            { name: "Finance", accessLevel: "edit", notes: "" },
            { name: "Legal", accessLevel: "view", notes: "" },
            { name: "IT", accessLevel: "view", notes: "" },
        ],
    });

    const [staffData, setStaffData] = useState<StaffFormData>({
        fullName: "",
        email: "",
        phoneNumber: "",
        designation: "",
        department: "",
    });

    const handleClientInputChange = (
        field: keyof ClientFormData,
        value: string
    ) => {
        setClientData({ ...clientData, [field]: value });
    };

    const handleStaffInputChange = (
        field: keyof StaffFormData,
        value: string
    ) => {
        setStaffData({ ...staffData, [field]: value });
    };

    const handleAccessTypeChange = (type: "full" | "custom") => {
        setClientData({ ...clientData, accessType: type });
    };

    const handleServiceAccessChange = (
        index: number,
        accessLevel: AccessLevel
    ) => {
        const updatedServices = [...clientData.services];
        updatedServices[index].accessLevel = accessLevel;
        setClientData({ ...clientData, services: updatedServices });
    };

    const handleClientSubmit = () => {
        console.log("Client Data:", clientData);
        alert("Client form submitted! Check console for data.");
    };

    const handleStaffSubmit = () => {
        console.log("Staff Data:", staffData);
        alert("Staff form submitted! Check console for data.");
    };

    return (
        <div className="min-h-screen p-6">
            <div className="bg-white rounded-lg">
                {/* Tab Toggle */}
                <div className="flex justify-center sm:justify-end mb-6">
                    <div className="inline-flex rounded-md gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => setActiveTab("client")}
                            className={`flex-1 sm:flex-none text-xs font-medium px-3 py-1 rounded-md ${
                                activeTab === "client"
                                    ? "bg-black text-white border-black"
                                    : "border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 cursor-pointer"
                            }`}
                        >
                            CLIENT
                        </button>
                        <button
                            onClick={() => setActiveTab("staff")}
                            className={`flex-1 sm:flex-none text-xs font-medium px-3 py-1 rounded-md ${
                                activeTab === "staff"
                                    ? "bg-black text-white border-black"
                                    : "border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 cursor-pointer"
                            }`}
                        >
                            STAFF
                        </button>
                    </div>
                </div>

                {/* CLIENT FORM */}
                {activeTab === "client" && (
                    <div>
                        <h1 className="text-xl font-bold mb-6">
                            Client Details
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-x-12">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={clientData.fullName}
                                onChange={(e) =>
                                    handleClientInputChange(
                                        "fullName",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={clientData.email}
                                onChange={(e) =>
                                    handleClientInputChange(
                                        "email",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />

                            {/* ✅ React International Phone Input */}
                            <div className="w-full rounded-2xl border border-gray-300 px-4 py-1.5 focus-within:ring-1 focus-within:ring-gray-400">
                                <PhoneInput
                                    defaultCountry="au"
                                    value={clientData.phoneNumber}
                                    onChange={(phone) =>
                                        handleClientInputChange(
                                            "phoneNumber",
                                            phone
                                        )
                                    }
                                    inputClassName="!border-0 !ring-0 !shadow-none !w-full text-gray-800 placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-x-12">
                            <input
                                type="text"
                                placeholder="Referral Source"
                                value={clientData.referralSource}
                                onChange={(e) =>
                                    handleClientInputChange(
                                        "referralSource",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Company"
                                value={clientData.company}
                                onChange={(e) =>
                                    handleClientInputChange(
                                        "company",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Service"
                                value={clientData.service}
                                onChange={(e) =>
                                    handleClientInputChange(
                                        "service",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                        </div>

                        {/* Access Type */}
                        <div className="mb-6 sm:mb-8 space-y-3">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={clientData.accessType === "full"}
                                    onChange={() =>
                                        handleAccessTypeChange("full")
                                    }
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 font-semibold">
                                    Full access
                                </span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={clientData.accessType === "custom"}
                                    onChange={() =>
                                        handleAccessTypeChange("custom")
                                    }
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 font-semibold">
                                    Custom access
                                </span>
                            </label>
                        </div>

                        {/* Custom Access Controls */}
                        {clientData.accessType === "custom" && (
                            <div className="mb-6 sm:mb-8">
                                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                                    Custom Access Controls
                                </h2>

                                <div className="hidden md:block border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="grid grid-cols-12 gap-4 bg-gray-50 px-6 py-4 font-semibold border-b border-gray-200">
                                        <div className="col-span-3">
                                            Service
                                        </div>
                                        <div className="col-span-6">
                                            Access Level
                                        </div>
                                        <div className="col-span-3">Notes</div>
                                    </div>

                                    {clientData.services.map(
                                        (service, index) => (
                                            <div
                                                key={service.name}
                                                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200"
                                            >
                                                <div className="col-span-3 font-medium">
                                                    {service.name}
                                                </div>
                                                <div className="col-span-6 flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleServiceAccessChange(
                                                                index,
                                                                "view"
                                                            )
                                                        }
                                                        className={`px-6 py-2 rounded text-sm font-medium ${
                                                            service.accessLevel ===
                                                            "view"
                                                                ? "bg-blue-600 text-white"
                                                                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                                        }`}
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleServiceAccessChange(
                                                                index,
                                                                "edit"
                                                            )
                                                        }
                                                        className={`px-6 py-2 rounded text-sm font-medium ${
                                                            service.accessLevel ===
                                                            "edit"
                                                                ? "bg-blue-600 text-white"
                                                                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                                        }`}
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                                <div className="col-span-3 text-gray-400">
                                                    ---
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <button
                                onClick={handleClientSubmit}
                                className="w-full sm:w-auto px-10 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}

                {/* STAFF FORM */}
                {activeTab === "staff" && (
                    <div>
                        <h1 className="text-xl font-bold mb-6">
                            Staff Details
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-x-12">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={staffData.fullName}
                                onChange={(e) =>
                                    handleStaffInputChange(
                                        "fullName",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={staffData.email}
                                onChange={(e) =>
                                    handleStaffInputChange(
                                        "email",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />

                            {/* ✅ React International Phone Input */}
                            <div className="w-full rounded-2xl border border-gray-300 px-4 py-1.5 focus-within:ring-1 focus-within:ring-gray-400">
                                <PhoneInput
                                    defaultCountry="au"
                                    value={staffData.phoneNumber}
                                    onChange={(phone) =>
                                        handleStaffInputChange(
                                            "phoneNumber",
                                            phone
                                        )
                                    }
                                    inputClassName="!border-0 !ring-0 !shadow-none !w-full text-gray-800 placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 gap-x-12">
                            <input
                                type="text"
                                placeholder="Designation"
                                value={staffData.designation}
                                onChange={(e) =>
                                    handleStaffInputChange(
                                        "designation",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Department"
                                value={staffData.department}
                                onChange={(e) =>
                                    handleStaffInputChange(
                                        "department",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleStaffSubmit}
                                className="w-full sm:w-auto px-10 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientStaffPage;
