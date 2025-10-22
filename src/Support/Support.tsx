import React, { useState, useRef } from "react";

interface Ticket {
    date: string;
    subject: string;
    action: string;
}

const Support: React.FC = () => {
    const openTickets = 1;
    const resolvedTickets = 10;

    const [ticketLimit, setTicketLimit] = useState(2);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        service: "",
        subject: "",
        message: "",
        file: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [tickets] = useState<Ticket[]>([
        {
            date: "19/08/25",
            subject: "Unable to download Invoices",
            action: "Resolved",
        },
        { date: "10/08/25", subject: "404 Error", action: "Resolved" },
        { date: "10/08/25", subject: "404 Error", action: "Resolved" },
        { date: "10/08/25", subject: "404 Error", action: "Resolved" },
        { date: "10/08/25", subject: "404 Error", action: "Resolved" },
    ]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setFormData((prev) => ({ ...prev, file }));
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    // ✅ Reset form
    const resetForm = () => {
        setFormData({
            fullName: "",
            email: "",
            service: "",
            subject: "",
            message: "",
            file: null,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        resetForm(); // ✅ clear form on submit
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        resetForm(); // ✅ clear form on cancel
        setIsModalOpen(false);
    };

    const handleViewMore = () => {
        if (ticketLimit >= tickets.length) {
            setTicketLimit(2);
        } else {
            setTicketLimit((prev) => Math.min(prev + 5, tickets.length));
        }
    };

    return (
        <div className="w-full bg-white rounded-xl p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold">My Tickets</h2>
                <button
                    className="border border-gray-400 text-sm font-semibold rounded-md px-3 py-1 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    Raise a Ticket
                </button>
            </div>

            {/* Ticket Summary */}
            <div className="flex flex-col md:flex-row w-[60%] gap-6 md:gap-12 mb-6">
                <div className="flex w-full items-center justify-between gap-2 border border-gray-200 rounded-xl px-6 py-3">
                    <span className="text-md font-semibold">Open Tickets</span>
                    <span className="text-md font-semibold">
                        {openTickets.toString().padStart(2, "0")}
                    </span>
                </div>

                <div className="flex w-full items-center justify-between gap-2 border border-gray-200 rounded-xl px-6 py-3">
                    <span className="text-md font-semibold">
                        Resolved Tickets
                    </span>
                    <span className="text-md font-semibold">
                        {resolvedTickets.toString().padStart(2, "0")}
                    </span>
                </div>
            </div>

            {/* Tickets Table */}
            <div className="overflow-x-auto w-full">
                <table className="w-full text-sm border-separate border-spacing-0">
                    <thead>
                        <tr className="text-left border-b border-gray-200">
                            <th className="p-2">Date</th>
                            <th className="p-2">Subject</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.slice(0, ticketLimit).map((ticket, index) => (
                            <tr
                                key={index}
                                className={
                                    index % 2 === 0
                                        ? "bg-white"
                                        : "bg-[#f2f8ec]"
                                }
                            >
                                <td className="p-2">{ticket.date}</td>
                                <td className="p-2">{ticket.subject}</td>
                                <td className="p-2">{ticket.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {tickets.length > 2 && (
                    <p
                        className="text-blue-600 text-sm mt-6 text-end font-semibold cursor-pointer"
                        onClick={handleViewMore}
                    >
                        {ticketLimit >= tickets.length
                            ? "View Less"
                            : "View More"}
                    </p>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-2xl p-8">
                        <h3 className="text-lg font-semibold mb-6">
                            Raise a ticket
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Row 1 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-x-8">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="border border-gray-300 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="border border-gray-300 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                                />
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                                >
                                    <option value="">Select Service</option>
                                    <option value="Accounting">
                                        Accounting
                                    </option>
                                    <option value="Tax">Tax</option>
                                    <option value="Insurance">Insurance</option>
                                </select>
                            </div>

                            {/* Row 3 */}
                            <div className="flex gap-4 items-end">
                                <label
                                    htmlFor="subject"
                                    className="flex-3 text-sm font-semibold w-full"
                                >
                                    Subject
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        id="subject"
                                        className="mt-2 border border-gray-300 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                                    />
                                </label>

                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                <button
                                    type="button"
                                    onClick={handleFileClick}
                                    className="flex-1 w-full bg-[#0479bf] text-white px-4 py-2.5 rounded-lg text-sm font-medium text-center truncate"
                                >
                                    {formData.file
                                        ? formData.file.name
                                        : "+Add File"}
                                </button>
                            </div>

                            {/* Message */}
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message"
                                rows={4}
                                className="border border-gray-300 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
                            ></textarea>

                            {/* Actions */}
                            <div className="flex justify-end gap-6 pt-2">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="text-[#0479bf] text-sm cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="text-[#0479bf] font-medium text-sm cursor-pointer"
                                >
                                    Raise Ticket
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Support;
