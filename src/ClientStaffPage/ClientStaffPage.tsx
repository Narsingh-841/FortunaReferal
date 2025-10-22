import React, { useState } from 'react';

type UserType = 'client' | 'staff';
type AccessLevel = 'view' | 'edit';

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
  accessType: 'full' | 'custom';
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
  const [activeTab, setActiveTab] = useState<UserType>('client');
  const [clientData, setClientData] = useState<ClientFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    referralSource: '',
    company: '',
    service: '',
    accessType: 'full',
    services: [
      { name: 'Accounting', accessLevel: 'view', notes: '' },
      { name: 'Insurance', accessLevel: 'view', notes: '' },
      { name: 'Finance', accessLevel: 'edit', notes: '' },
      { name: 'Legal', accessLevel: 'view', notes: '' },
      { name: 'IT', accessLevel: 'view', notes: '' },
    ],
  });

  const [staffData, setStaffData] = useState<StaffFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    designation: '',
    department: '',
  });

  const handleClientInputChange = (field: keyof ClientFormData, value: string) => {
    setClientData({ ...clientData, [field]: value });
  };

  const handleStaffInputChange = (field: keyof StaffFormData, value: string) => {
    setStaffData({ ...staffData, [field]: value });
  };

  const handleAccessTypeChange = (type: 'full' | 'custom') => {
    setClientData({ ...clientData, accessType: type });
  };

  const handleServiceAccessChange = (index: number, accessLevel: AccessLevel) => {
    const updatedServices = [...clientData.services];
    updatedServices[index].accessLevel = accessLevel;
    setClientData({ ...clientData, services: updatedServices });
  };

  const handleClientSubmit = () => {
    console.log('Client Data:', clientData);
    alert('Client form submitted! Check console for data.');
  };

  const handleStaffSubmit = () => {
    console.log('Staff Data:', staffData);
    alert('Staff form submitted! Check console for data.');
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg p-4 sm:p-6 lg:p-8">
        {/* Tab Toggle */}
        <div className="flex justify-center sm:justify-end mb-6 sm:mb-8">
          <div className="inline-flex rounded-md w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('client')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 text-sm font-medium rounded-l-md border ${
                activeTab === 'client'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              CLIENT
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                activeTab === 'staff'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              STAFF
            </button>
          </div>
        </div>

        {/* Client Form */}
        {activeTab === 'client' && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Client Details</h1>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <input
                type="text"
                placeholder="Full Name"
                value={clientData.fullName}
                onChange={(e) => handleClientInputChange('fullName', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={clientData.email}
                onChange={(e) => handleClientInputChange('email', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={clientData.phoneNumber}
                onChange={(e) => handleClientInputChange('phoneNumber', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <input
                type="text"
                placeholder="Referral Source"
                value={clientData.referralSource}
                onChange={(e) => handleClientInputChange('referralSource', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Company"
                value={clientData.company}
                onChange={(e) => handleClientInputChange('company', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Service"
                value={clientData.service}
                onChange={(e) => handleClientInputChange('service', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Access Type */}
            <div className="mb-6 sm:mb-8 space-y-3">
              <label className="flex items-start sm:items-center">
                <input
                  type="checkbox"
                  checked={clientData.accessType === 'full'}
                  onChange={() => handleAccessTypeChange('full')}
                  className="w-4 h-4 mt-1 sm:mt-0 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                />
                <span className="ml-2 font-semibold">Full access</span>
                <span className="ml-2 text-sm text-blue-600">(can view all services)</span>
              </label>
              <label className="flex items-start sm:items-center">
                <input
                  type="checkbox"
                  checked={clientData.accessType === 'custom'}
                  onChange={() => handleAccessTypeChange('custom')}
                  className="w-4 h-4 mt-1 sm:mt-0 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                />
                <span className="ml-2 font-semibold">Custom access</span>
                <span className="ml-2 text-sm text-blue-600">(if custom expand below)</span>
              </label>
            </div>

            {/* Custom Access Controls */}
            {clientData.accessType === 'custom' && (
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Custom Access Controls</h2>
                
                {/* Desktop Table View */}
                <div className="hidden md:block border border-gray-200 rounded-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 bg-gray-50 px-6 py-4 font-semibold border-b border-gray-200">
                    <div className="col-span-3">Service</div>
                    <div className="col-span-6">Access Level</div>
                    <div className="col-span-3">Notes</div>
                  </div>

                  {/* Table Rows */}
                  {clientData.services.map((service, index) => (
                    <div
                      key={service.name}
                      className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 last:border-b-0 items-center"
                    >
                      <div className="col-span-3 font-medium">{service.name}</div>
                      <div className="col-span-6 flex gap-2">
                        <button
                          onClick={() => handleServiceAccessChange(index, 'view')}
                          className={`px-6 py-2 rounded text-sm font-medium transition-colors ${
                            service.accessLevel === 'view'
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleServiceAccessChange(index, 'edit')}
                          className={`px-6 py-2 rounded text-sm font-medium transition-colors ${
                            service.accessLevel === 'edit'
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                        >
                          Edit
                        </button>
                      </div>
                      <div className="col-span-3 text-gray-400">---</div>
                    </div>
                  ))}
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {clientData.services.map((service, index) => (
                    <div key={service.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="font-medium text-lg mb-3">{service.name}</div>
                      <div className="flex gap-2 mb-2">
                        <button
                          onClick={() => handleServiceAccessChange(index, 'view')}
                          className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-colors ${
                            service.accessLevel === 'view'
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleServiceAccessChange(index, 'edit')}
                          className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-colors ${
                            service.accessLevel === 'edit'
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleClientSubmit}
                className="w-full sm:w-auto px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Staff Form */}
        {activeTab === 'staff' && (
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Staff Details</h1>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <input
                type="text"
                placeholder="Full Name"
                value={staffData.fullName}
                onChange={(e) => handleStaffInputChange('fullName', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={staffData.email}
                onChange={(e) => handleStaffInputChange('email', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={staffData.phoneNumber}
                onChange={(e) => handleStaffInputChange('phoneNumber', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <input
                type="text"
                placeholder="Designation"
                value={staffData.designation}
                onChange={(e) => handleStaffInputChange('designation', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Department"
                value={staffData.department}
                onChange={(e) => handleStaffInputChange('department', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleStaffSubmit}
                className="w-full sm:w-auto px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
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