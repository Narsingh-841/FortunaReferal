import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Menu } from "lucide-react";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const today = new Date();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const shortDayNames = ["Mo","Tu","We","Th","Fr","Sa","Su"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert Sunday (0) → 6
  };

  const generateCalendarDays = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
    setSelectedDay(null);
  };

  const sidebarMonths = [0, 1, 2].map((offset) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1
    );
    return {
      name: monthNames[date.getMonth()],
      year: date.getFullYear(),
      days: generateCalendarDays(date),
      date,
    };
  });

  const mainWeeks = (() => {
    const days = generateCalendarDays(currentDate);
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  })();

  const handleSidebarDateClick = (day: number, dateObj: Date) => {
    setCurrentDate(new Date(dateObj.getFullYear(), dateObj.getMonth(), 1));
    setSelectedDay(day);
    if (window.innerWidth < 640) setShowSidebar(false); // auto-close in mobile
  };

  const isToday = (day: number | null, month: number, year: number) => {
    return (
      day &&
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar (visible on md+) */}
      <div
        className={`w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto fixed sm:static z-40 h-full sm:h-auto transform transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Calendar</h1>

        {sidebarMonths.map((month, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              {month.name} {month.year}
            </h3>
            <div className="grid grid-cols-7 gap-1">
              {shortDayNames.map((d) => (
                <div
                  key={d}
                  className="text-xs text-center text-gray-500 font-medium py-1"
                >
                  {d}
                </div>
              ))}
              {month.days.map((day, i) => {
                const isCurrentDay = isToday(day, month.date.getMonth(), month.date.getFullYear());
                return (
                  <div
                    key={i}
                    onClick={() => day && handleSidebarDateClick(day, month.date)}
                    className={`text-xs text-center py-1 rounded cursor-pointer ${
                      day
                        ? isCurrentDay
                          ? "bg-blue-600 text-white font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                        : ""
                    }`}
                  >
                    {day || ""}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Main Calendar */}
      <div className="flex-1 flex flex-col sm:ml-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>

            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus size={18} />
            Create New
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 p-4 sm:p-8">
          <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="py-3 text-center text-xs sm:text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7" style={{ gridAutoRows: "1fr" }}>
              {mainWeeks.map((week, weekIdx) =>
                week.map((day, dayIdx) => {
                  const isCurrentDay = isToday(day, currentDate.getMonth(), currentDate.getFullYear());
                  const isSelected =
                    selectedDay === day &&
                    currentDate.getMonth() === today.getMonth() &&
                    currentDate.getFullYear() === today.getFullYear();

                  return (
                    <div
                      key={`${weekIdx}-${dayIdx}`}
                      className={`border-r border-b border-gray-200 last:border-r-0 p-3 min-h-[100px] sm:min-h-[120px] cursor-pointer transition-colors ${
                        isCurrentDay
                          ? "bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => day && setSelectedDay(day)}
                    >
                      {day && (
                        <div
                          className={`text-sm sm:text-base font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                            isCurrentDay
                              ? "bg-blue-600 text-white"
                              : isSelected
                              ? "bg-gray-200"
                              : "text-gray-700"
                          }`}
                        >
                          {day}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Create New Event
            </h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;