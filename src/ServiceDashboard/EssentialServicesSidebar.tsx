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
    <div className="relative h-full">
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar panel */}
      <div
        className={`fixed lg:relative top-0 right-0 h-full bg-white max-lg:z-50 transition-all duration-500 ease-in-out border-l border-gray-200 overflow-y-auto
          ${isOpen ? "w-80 translate-x-0" : "w-80 translate-x-full lg:translate-x-0 lg:w-0"}`}
      >
        <div
          className={`h-full transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100 p-4 lg:p-6" : "opacity-0 p-0"
          }`}
        >
          <div
            onClick={toggleSidebar}
            className="flex items-center justify-center gap-2 border border-gray-200 py-1.5 rounded-full hover:bg-gray-50 cursor-pointer mb-4"
          >
            <span>Close</span> <X size={18} className="font-bold text-[#91e026]" />
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">Essential Services</h2>          
          </div>

          <p className="text-sm text-gray-600 mb-3">
            Our tailored strategies empower your business to thrive in a
            competitive landscape.
          </p>

          <div className="flex flex-col gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="border border-gray-200 rounded-xl p-2 bg-white hover:shadow-sm transition"
              >
                <div className="flex justify-between items-center mb-1 bg-[#f2f8ec] p-1.5 rounded-sm">
                  <span className="text-sm font-semibold text-gray-800">
                    {service.title}
                  </span>
                </div>
                <p className="flex items-center gap-2 text-sm font-medium mb-1">
                  {service.subService}
                  <ArrowUpRight size={16} className="text-[#91e026]" />
                </p>
                <p className="text-sm text-gray-500">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 border border-gray-200 py-1.5 rounded-full hover:bg-gray-50 cursor-pointer my-4">
            <span>All Services</span> <ArrowUpRight size={16} className="text-[#91e026]" />
          </div>
        </div>
      </div>

      {/* Floating open button (outside hidden area) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute top-10 -left-9 transform -translate-y-1/2 bg-green-600 text-white rounded-l-lg px-3 py-2 shadow-lg hover:bg-green-700 transition z-30"
        >
          &lt;
        </button>
      )}
    </div>
  );
};

export default EssentialServicesSidebar;