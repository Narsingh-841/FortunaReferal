import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { LuCalendar } from "react-icons/lu";

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
  { referrerName: "Deepika", referralName: "Rahul", email: "rahul@2gmail.com", date: "02/10/2025", phone: "+6958748596", service: "Accounting", status: "Onboarding", notes: "-" },
  { referrerName: "Rebecca", referralName: "Arvin", email: "arvin@2gmail.com", date: "10/09/2025", phone: "+6958748596", service: "Insurance", status: "Onboarding", notes: "-" },
  { referrerName: "Deepika", referralName: "Rahul", email: "rahul@2gmail.com", date: "02/10/2025", phone: "+6958748596", service: "Accounting", status: "Onboarding", notes: "-" },
  { referrerName: "Rebecca", referralName: "Arvin", email: "arvin@2gmail.com", date: "10/09/2025", phone: "+6958748596", service: "Insurance", status: "Onboarding", notes: "-" },
  // repeat as needed
];

const ReferralTable: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div className="w-full bg-white rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-[#1A1A1A]">List</h2>
        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white shadow-sm hover:bg-gray-50"
          >
            <LuCalendar />
            <span>Date</span>
          </button>
          <button className="rounded-md px-4 py-1.5 font-medium text-sm border border-gray-200">
            + Add New
          </button>

          {showCalendar && (
            <div className="absolute top-10 right-0 bg-white shadow-lg rounded-xl border z-50">
              <Calendar
                onChange={(date) => handleDateChange(date as Date)}
                value={selectedDate}
              />
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full border-collapse p-4 ">
          <thead className="bg-white">
            <tr className="text-left text-sm font-semibold text-black p-4">
              <th className="px-4 py-2">Referrer Name</th>
              <th className="px-4 py-2">Referral Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Phone No.</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className={`text-sm ${
                  i % 2 === 0 ? "bg-white" : "bg-[#f2f8ec]"
                } border-t`}
              >
                <td className="px-4 py-2">{row.referrerName}</td>
                <td className="px-4 py-2">{row.referralName}</td>
                <td className="px-4 py-2">{row.email}</td>
                <td className="px-4 py-2">{row.date}</td>
                <td className="px-4 py-2">{row.phone}</td>
                <td className="px-4 py-2">{row.service}</td>
                <td className="px-4 py-2">{row.status}</td>
                <td className="px-4 py-2">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralTable;
