import { MessageSquare, Upload, User, ChevronRight } from "lucide-react";

const AccountingPage = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-full">
      {/* Service Details Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
        {/* Mobile: Stack everything vertically, Desktop: Grid layout */}
        <div className="space-y-4 md:space-y-6">
          
          {/* Row 1: Activation + Contact Button */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-6">
            <div>
              <label className="text-xs md:text-sm font-medium text-gray-600">Activation</label>
              <p className="text-sm md:text-base text-gray-900 mt-1">19/08/25</p>
            </div>
            <div className="flex md:justify-end">
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors w-full md:w-auto">
                <MessageSquare size={18} />
                <span className="text-sm font-medium">Contact Elissa</span>
              </button>
            </div>
          </div>

          {/* Row 2: Stage + Support Button */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-6">
            <div>
              <label className="text-xs md:text-sm font-medium text-gray-600">Stage</label>
              <div className="mt-1">
                <span className="text-sm md:text-base bg-blue-50 text-blue-700 inline-block px-3 py-1 rounded-md">
                  Onboarding
                </span>
              </div>
            </div>
            <div className="flex md:justify-end">
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors w-full md:w-auto">
                <User size={18} />
                <span className="text-sm font-medium">Support</span>
              </button>
            </div>
          </div>

          {/* Row 3: Last Contact + Upload Button */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-6">
            <div>
              <label className="text-xs md:text-sm font-medium text-gray-600">Last Contact</label>
              <p className="text-sm md:text-base text-gray-900 mt-1">21/08/25</p>
            </div>
            <div className="flex md:justify-end">
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors w-full md:w-auto">
                <Upload size={18} />
                <span className="text-sm font-medium">Uploads</span>
              </button>
            </div>
          </div>

          {/* Assignee */}
          <div className="pt-4 border-t border-gray-200">
            <label className="text-xs md:text-sm font-medium text-gray-600">Assignee</label>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white text-sm font-medium">
                E
              </div>
              <span className="text-sm md:text-base text-gray-900">Elissa</span>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">What's included?</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto">
            Find Out More
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {[
            { title: "Sub Service #1", description: "Our tailored strategies empower your business to thrive." },
            { title: "Sub Service #2", description: "Our tailored strategies empower your business to thrive." },
            { title: "Sub Service #3", description: "Our tailored strategies empower your business to thrive." },
            { title: "Sub Service #4", description: "Our tailored strategies empower your business to thrive." },
            { title: "Sub Service #5", description: "Our tailored strategies empower your business to thrive." },
            { title: "Sub Service #6", description: "Our tailored strategies empower your business to thrive." },
            { title: "Sub Service #7", description: "Our tailored strategies empower your business to thrive." },
            { title: "Sub Service #8", description: "Our tailored strategies empower your business to thrive." },
            { title: "Sub Service #9", description: "Our tailored strategies empower." },
          ].map((service, index) => (
            <div
              key={index}
              className="p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">{service.title}</h3>
              <p className="text-xs md:text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Activity</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto">
            View All Activity
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Mobile: Card View */}
        <div className="md:hidden space-y-3">
          {[
            { service: "Accounting", activity: "Tax", date: "19/08/25", time: "1:00 PM" },
            { service: "Accounting", activity: "Tax", date: "19/08/25", time: "1:00 PM" },
            { service: "Accounting", activity: "Tax", date: "19/08/25", time: "1:00 PM" },
          ].map((activity, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border border-gray-200 ${
                index % 2 === 1 ? "bg-green-50" : "bg-white"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{activity.service}</p>
                  <p className="text-xs text-gray-600 mt-1">{activity.activity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-medium">
                    E
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{activity.date}</span>
                <span>{activity.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Service</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Activity</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Assignee</th>
              </tr>
            </thead>
            <tbody>
              {[
                { service: "Accounting", activity: "Tax", date: "19/08/25", time: "1:00 PM" },
                { service: "Accounting", activity: "Tax", date: "19/08/25", time: "1:00 PM" },
                { service: "Accounting", activity: "Tax", date: "19/08/25", time: "1:00 PM" },
              ].map((activity, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    index % 2 === 1 ? "bg-green-50" : ""
                  }`}
                >
                  <td className="py-3 px-4 text-sm text-gray-900">{activity.service}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{activity.activity}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{activity.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{activity.time}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-medium">
                        E
                      </div>
                      <span className="text-sm text-gray-900">Elissa</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountingPage;