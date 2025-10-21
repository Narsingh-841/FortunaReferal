import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clients } from "../DummyData/clients";

const ClientDetails: React.FC = () => {
    const { clientName } = useParams<{ clientName: string }>();
    const navigate = useNavigate();
    const [docLimit, setDocLimit] = useState(2);
    const [contactLimit, setContactLimit] = useState(2);

    // Find matching client (case-insensitive)
    const client = clients.find(
        (c) => c.name.toLowerCase() === clientName?.toLowerCase()
    );

    if (!client) {
        return (
            <div className="p-6 text-center text-gray-600">
                Client not found.
                <button
                    onClick={() => navigate(-1)}
                    className="ml-2 text-blue-600 underline"
                >
                    Go back
                </button>
            </div>
        );
    }

    // Handle view more / less for documents
  const handleDocViewMore = () => {
    if (docLimit >= client.documents.length) {
      setDocLimit(2);
    } else {
      setDocLimit((prev) => Math.min(prev + 5, client.documents.length));
    }
  };

  // Handle view more / less for contact history
  const handleContactViewMore = () => {
    if (contactLimit >= client.contacts.length) {
      setContactLimit(2);
    } else {
      setContactLimit((prev) => Math.min(prev + 5, client.contacts.length));
    }
  };

    return (
        <div className="bg-white p-6 flex flex-col items-center gap-8">
            {/* Header */}
            <div className="w-[97%] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-gray-200 rounded-xl p-5">
                <div className="space-y-2 text-sm">
                    <p>
                        <strong>Client Name</strong> : {client.name}
                    </p>
                    <p>
                        <strong>Email</strong> : {client.email}
                    </p>
                    <p>
                        <strong>Phone No.</strong> : {client.phone}
                    </p>
                    <p>
                        <strong>Joined On</strong> : {client.joinedOn}
                    </p>
                    <p>
                        <strong>Referral source</strong> :{" "}
                        {client.referralSource}
                    </p>
                    <p>
                        <strong>Assigned Manager</strong> : {client.manager}
                    </p>
                </div>
                <div className="w-32 h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                    Image
                </div>
            </div>

            {/* Service Overview */}
            <div className="w-full">
                <h2 className="font-semibold text-lg mb-2">Service Overview</h2>
                <table className="w-full border-collapse text-sm">
                    <thead className="border-b border-gray-200">
                        <tr className="text-left">
                            <th className="p-2">
                                Service
                            </th>
                            <th className="p-2">
                                Status
                            </th>
                            <th className="p-2">
                                Last Updated
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {client.services.map((s, i) => (
                            <tr
                                key={i}
                                className={
                                    i % 2 === 0 ? "bg-white" : "bg-[#f2f8ec]"
                                }
                            >
                                <td className="p-2">{s.service}</td>
                                <td className="p-2">{s.status}</td>
                                <td className="p-2">{s.lastUpdated}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Documents */}
            <div className="w-full">
                <h2 className="font-semibold text-lg mb-2">Documents</h2>
                <table className="w-full border-collapse text-sm">
                    <thead className="border-b border-gray-200">
                        <tr className="text-left">
                            <th className="p-2">File Name</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Uploaded on</th>
                            <th className="p-2">Uploaded by</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {client.documents.slice(0, docLimit).map((doc, i) => (
                            <tr
                                key={i}
                                className={
                                    i % 2 === 0 ? "bg-white" : "bg-[#f2f8ec]"
                                }
                            >
                                <td className="p-2">{doc.fileName}</td>
                                <td className="p-2">{doc.type}</td>
                                <td className="p-2">{doc.uploadedOn}</td>
                                <td className="p-2">{doc.uploadedBy}</td>
                                <td className="p-2 cursor-pointer">
                                    {doc.action}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {client.documents.length > 2 && (
                    <p
                        className="text-blue-600 text-sm mt-6 text-end font-semibold cursor-pointer"
                        onClick={handleDocViewMore}
                    >
                        {docLimit >= client.documents.length
                            ? "View Less"
                            : "View More"}
                    </p>
                )}
            </div>

            {/* Contact History */}
            <div className="w-full">
                <h2 className="font-semibold text-lg mb-2">Contact History</h2>
                <table className="w-full border-collapse text-sm">
                    <thead className="border-b border-gray-200">
                        <tr className="text-left">
                            <th className="p-2">Date</th>
                            <th className="p-2">Time</th>
                            <th className="p-2">Contacted by</th>
                            <th className="p-2">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {client.contacts.slice(0, contactLimit).map((c, i) => (
                            <tr
                                key={i}
                                className={
                                    i % 2 === 0 ? "bg-white" : "bg-[#f2f8ec]"
                                }
                            >
                                <td className="p-2">{c.date}</td>
                                <td className="p-2">{c.time}</td>
                                <td className="p-2">{c.contactedBy}</td>
                                <td className="p-2">{c.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {client.contacts.length > 2 && (
                    <p
                        className="text-blue-600 text-sm mt-6 font-semibold cursor-pointer text-end"
                        onClick={handleContactViewMore}
                    >
                        {contactLimit >= client.contacts.length
                            ? "View Less"
                            : "View More"}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ClientDetails;
