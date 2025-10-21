import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const AddNewReferralPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    referralSource: "",
    company: "",
    services: {
      accounting: false,
      insurance: false,
      finance: false,
      legal: false,
      it: false,
    },
    assignTo: "",
    comments: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service as keyof typeof prev.services],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    navigate("/my-referrals");
  };

  return (
    <div className="min-h-screen bg-white">
      <div>
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Referrer Details */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Referrer Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-x-12">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
              />

              {/* International Phone Input */}
              <div className="w-full rounded-2xl border border-gray-300 px-2 py-1.5 focus-within:ring-1 focus-within:ring-gray-400">
                <PhoneInput
                  defaultCountry="au"
                  value={formData.phone}
                  onChange={(phone) =>
                    setFormData((prev) => ({ ...prev, phone }))
                  }
                  inputClassName="!border-0 !ring-0 !shadow-none !w-full text-gray-800 placeholder:text-gray-400"
                />
              </div>

              <input
                type="text"
                name="referralSource"
                placeholder="Referral Source"
                value={formData.referralSource}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Service Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Service Information
            </h2>

            <div className="flex flex-wrap gap-6 md:gap-12 mb-6">
              {Object.entries(formData.services).map(([key, checked]) => (
                <label
                  key={key}
                  className="flex items-center gap-2 text-gray-800"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleServiceChange(key)}
                    className="rounded border-gray-400 text-black focus:ring-black"
                  />
                  <span className="capitalize font-bold">{key}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
              <input
                type="text"
                name="assignTo"
                placeholder="Assign To"
                value={formData.assignTo}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 md:col-span-1"
              />
              <input
                type="text"
                name="comments"
                placeholder="Comments"
                value={formData.comments}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 md:col-span-2"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white font-medium rounded-md px-8 py-2 hover:bg-gray-900 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewReferralPage;
