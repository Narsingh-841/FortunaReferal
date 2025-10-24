import React, { useRef } from "react";
import Signature from "@uiw/react-signature";

const PersonalDetailsForm: React.FC = () => {
  // Correct ref type — use HTMLDivElement since the component exposes a DOM node
  const signatureRef = useRef<any>(null);

  const handleClear = () => {
    signatureRef.current?.clear();
  };

  const handleSave = () => {
    const dataURL = signatureRef.current?.toDataURL();
    console.log("Signature Data URL:", dataURL);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
    alert("Form submitted!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Personal Details
      </h2>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-x-12 mb-4 md:mb-6">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-x-12 mb-4 md:mb-6">
        <input
          type="text"
          placeholder="Service Name"
          className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
        />
        <input
          type="text"
          placeholder="Address"
          className="md:col-span-2 w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
        />

      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-x-12">
        <input
          type="text"
          placeholder="Client Manager Name"
          className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
        />
        <input
          type="text"
          placeholder="Comments"
          className="md:col-span-2 w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400"
        />
      </div>
        
        
      

      {/* Signature Section */}
      <div className="mt-6">
        
        <div className="w-[270px] border border-gray-300 rounded-lg bg-white">
          <Signature
            ref={signatureRef}
            style={{
              width: "50%",
              height: "160px",
              borderRadius: "0.5rem",
            }}
          />
        </div>
        <label className="font-medium text-gray-800 mb-2 block">
          Signature
        </label>
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={handleClear}
            className="text-sm px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
