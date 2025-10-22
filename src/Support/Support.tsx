import React, { useState } from "react";

interface Ticket {
  date: string;
  subject: string;
  action: string;
}

const Support: React.FC = () => {
  // ✅ Dummy data using variables (not static)
  const openTickets = 1;
  const resolvedTickets = 10;

  const [tickets] = useState<Ticket[]>([
    { date: "19/08/25", subject: "Unable to download Invoices", action: "Resolved" },
    { date: "10/08/25", subject: "404 Error", action: "Resolved" },
  ]);

  return (
    <div className="w-full bg-white rounded-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-gray-900">My Tickets</h2>
        <button className="border border-gray-400 text-sm rounded-md px-3 py-1 hover:bg-gray-50">
          Raise a Ticket
        </button>
      </div>

      {/* Ticket Summary */}
      <div className="flex flex-row w-[70%] gap-6 mb-6">
        <div className="flex w-full items-center justify-between gap-2 border border-gray-200 rounded-xl px-6 py-3">
            <span className="text-md font-semibold">Open Tickets</span>
            <span className="text-md font-semibold">{openTickets.toString().padStart(2, "0")}</span>
          </div>

        <div className="flex w-full items-center justify-between gap-2 border border-gray-200 rounded-xl px-6 py-3">
            <span className="text-md font-semibold">Resolved Tickets</span>
            <span className="text-md font-semibold">{resolvedTickets.toString().padStart(2, "0")}</span>
          </div>
      </div>

      {/* Tickets Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-gray-700 border-b border-gray-200">
              <th className="py-2">Date</th>
              <th className="py-2">Subject</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-[#f2f8ec]"
                }
              >
                <td className="py-2">{ticket.date}</td>
                <td className="py-2">{ticket.subject}</td>
                <td className="py-2 text-gray-800">{ticket.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View More */}
      <div className="text-right mt-4">
        <p className="text-blue-600 font-medium text-sm cursor-pointer hover:underline">
          View More
        </p>
      </div>
    </div>
  );
};

export default Support;
