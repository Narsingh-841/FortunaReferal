
import { FiSearch, FiBell, FiMessageSquare, FiHelpCircle } from "react-icons/fi";
import fortunalogo from '../assets/FortunaLogo-dark.png'; // adjust the path as necessary

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm flex items-center justify-between px-6 py-3">
      {/* Left section - Logo */}
      <div className="flex items-center space-x-2">
        <img
          src={fortunalogo} // replace with your actual logo path
          alt="Fortuna Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Middle section - Search and Invite */}
      <div className="flex items-center space-x-3 flex-1 justify-center">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-[300px]">
          <FiSearch className="text-gray-600 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-500"
          />
        </div>

        {/* Invite Button */}
        <button className="bg-white border border-gray-300 text-green-900 text-sm font-medium px-4 py-1.5 rounded-full hover:bg-gray-50">
          + Invite
        </button>
      </div>

      {/* Right section - Icons */}
      <div className="flex items-center space-x-6">
        {/* Help icon */}
        <div className="relative">
          <FiHelpCircle className="text-green-900 text-xl" />
        </div>

        {/* Message icon with badge */}
        <div className="relative">
          <FiMessageSquare className="text-green-900 text-xl" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span>
        </div>

        {/* Notification icon with badge */}
        <div className="relative">
          <FiBell className="text-green-900 text-xl" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span>
        </div>

        {/* Profile / Status circle */}
        <div className="h-8 w-8 bg-green-600 text-white flex items-center justify-center rounded-full text-sm font-semibold">
          0
        </div>
      </div>
    </header>
  );
};

export default Header;
