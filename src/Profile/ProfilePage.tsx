import React, { useState } from 'react';
import { Camera, Edit2 } from 'lucide-react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

interface ProfileData {
  name: string;
  email: string;
  phoneNumber: string;
  department: string;
  designation: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'JANE CHARLES',
    email: 'janecharles45@gmail.com',
    phoneNumber: '+61 0225588787',
    department: 'Insurance',
    designation: 'abcd'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = () => {
    if (isEditing) {
      setProfile(editedProfile);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg p-6 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Section - Profile Info */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 w-full text-3xl sm:text-4xl font-bold"
                  />
                ) : (
                  profile.name
                )}
              </h1>
              <button
                onClick={handleEdit}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Edit Profile"
              >
                <Edit2 className="h-5 w-5" />
              </button>
            </div>

            <div className="text-gray-600 text-base sm:text-lg">
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              ) : (
                profile.email
              )}
            </div>

            <hr className="border-gray-300" />

            {/* Form Fields */}
            <div className="space-y-5">
              {/* ✅ International Phone Input */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <label className="text-gray-700 font-medium text-sm sm:text-base">
                  Phone Number
                </label>
                <div className=" col-span-2 w-full rounded-lg border border-gray-300 px-4 py-1.5 focus-within:ring-1 focus-within:ring-gray-400">
                  <PhoneInput
                    defaultCountry="au"
                    value={editedProfile.phoneNumber}
                    onChange={(phone) => handleInputChange('phoneNumber', phone)}
                    disabled={!isEditing}
                    className="[&.react-international-phone-input-container]:bg-white"
                    inputClassName="w-full !border-0 !ring-0 !shadow-none text-gray-800 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <label className="text-gray-700 font-medium text-sm sm:text-base">
                  Department
                </label>
                <input
                  type="text"
                  value={isEditing ? editedProfile.department : profile.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  disabled={!isEditing}
                  className="sm:col-span-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm sm:text-base disabled:bg-white disabled:text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <label className="text-gray-700 font-medium text-sm sm:text-base">
                  Designation
                </label>
                <input
                  type="text"
                  value={isEditing ? editedProfile.designation : profile.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  disabled={!isEditing}
                  className="sm:col-span-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm sm:text-base disabled:bg-white disabled:text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Right Section - Profile Picture */}
          <div className="flex flex-col items-center justify-start lg:justify-center space-y-4 order-1 lg:order-2">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
              <img
                src="/api/placeholder/256/256"
                alt="Profile"
                className="w-full h-full rounded-full object-cover bg-gray-400"
              />
              {isEditing && (
                <button
                  className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                  aria-label="Change profile picture"
                >
                  <Camera className="w-5 h-5 text-gray-700" />
                </button>
              )}
            </div>
            <button
              onClick={handleEdit}
              className="px-8 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
