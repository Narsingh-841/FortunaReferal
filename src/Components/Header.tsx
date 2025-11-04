import { FiSearch, FiBell, FiMessageSquare, FiHelpCircle, FiMenu } from "react-icons/fi";
import fortunalogo from '../assets/FortunaLogo-dark.png';
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  onMobileToggle: () => void;
}

const Header = ({ onMobileToggle }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current page is /new-client
  const isInviteActive = location.pathname === "/new-client";

  return (
    <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3 fixed top-0 left-0 z-50">
      {/* Left section - Logo and Mobile Toggle */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMobileToggle}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <FiMenu size={20} />
        </button>
        <img
          src={fortunalogo}
          alt="Fortuna Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Middle section - Search and Invite */}
      <div className="hidden md:flex items-center space-x-3 flex-1 justify-center">
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
        <button
          onClick={() => navigate("/new-client")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
            isInviteActive
              ? "bg-gradient-to-r from-[#0479bf] via-[#39988b] to-[#7ec247] text-white"
              : "bg-white border-gray-300 text-green-900 hover:bg-gray-50 cursor-pointer"
          }`}
        >
          + Invite
        </button>
      </div>

      {/* Right section - Icons */}
      <div className="flex items-center space-x-4 md:space-x-6">
        {/* Help icon */}
        <div className="hidden sm:block relative">
          <FiHelpCircle className="text-green-900 text-xl cursor-pointer hover:text-green-700" />
        </div>

        {/* Message icon with badge */}
        <div className="relative">
          <FiMessageSquare className="text-green-900 text-xl cursor-pointer hover:text-green-700" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span>
        </div>

        {/* Notification icon with badge */}
        <div className="relative">
          <FiBell className="text-green-900 text-xl cursor-pointer hover:text-green-700" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span>
        </div>

        {/* Profile / Status circle */}
        <div
          onClick={() => navigate("/profile-page")}
          className="h-8 w-8 bg-green-600 text-white flex items-center justify-center rounded-full text-sm font-semibold cursor-pointer hover:bg-green-700"
        >
          0
        </div>
      </div>
    </header>
  );
};

export default Header;
