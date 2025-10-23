import { ArrowUpRight, X } from "lucide-react";

const EssentialServicesSidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const services = [
    {
      id: "1",
      title: "Service",
      subService: "Sub-Service",
      description: "Our tailored strategies empower your business.",
    },
    {
      id: "2",
      title: "Service",
      subService: "Sub-Service",
      description: "Our tailored strategies empower your business.",
    },
    {
      id: "3",
      title: "Service",
      subService: "Sub-Service",
      description: "Our tailored strategies empower your business.",
    },
    {
      id: "4",
      title: "Service",
      subService: "Sub-Service",
      description: "Our tailored strategies empower your business.",
    },
  ];

  return (
    <div
      className={`relative transition-all duration-500 ease-in-out bg-[#f9faf8] border-l border-gray-200 shadow-lg h-full overflow-y-auto
      ${isOpen ? "w-80" : "w-0"} `}
    >
      {/* Sidebar Content */}
      <div
        className={`h-full transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 p-6" : "opacity-0 p-0"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Essential Services
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-700 hover:text-green-600 transition"
          >
            <X size={20} className="font-bold" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Our tailored strategies empower your business to thrive in a
          competitive landscape.
        </p>

        <div className="flex flex-col gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-sm transition"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-gray-800">
                  {service.title}
                </span>
                <ArrowUpRight size={16} className="text-green-600" />
              </div>
              <p className="text-sm font-medium text-green-700 mb-1">
                {service.subService}
              </p>
              <p className="text-xs text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>

        <button className="mt-6 w-full text-green-700 font-medium border border-green-600 rounded-lg py-2 hover:bg-green-50 transition">
          All Services
        </button>
      </div>

      {/* Floating Button (when closed) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute top-1/2 -left-10 transform -translate-y-1/2 bg-green-600 text-white rounded-l-lg px-3 py-2 shadow-lg hover:bg-green-700 transition"
        >
          &lt;
        </button>
      )}
    </div>
  );
};

export default EssentialServicesSidebar;