import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025
  const [showCreateModal, setShowCreateModal] = useState(false);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const shortDayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert Sunday (0) to 6, and shift others
  };

  const generateCalendarDays = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const generateSidebarMonth = (monthOffset: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);
    const days = generateCalendarDays(date);
    
    return {
      name: monthNames[date.getMonth()],
      year: date.getFullYear(),
      days
    };
  };

  const generateMainCalendarWeeks = () => {
    const days = generateCalendarDays(currentDate);
    const weeks = [];
    
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    
    return weeks;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const sidebarMonths = [0, 1, 2].map(offset => generateSidebarMonth(offset));
  const mainWeeks = generateMainCalendarWeeks();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Calendar</h1>

        {sidebarMonths.map((month, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              {month.name} {month.year}
            </h3>
            <div className="grid grid-cols-7 gap-1">
              {shortDayNames.map(day => (
                <div key={day} className="text-xs text-center text-gray-500 font-medium py-1">
                  {day}
                </div>
              ))}
              {month.days.map((day, i) => (
                <div
                  key={i}
                  className={`text-xs text-center py-1 rounded ${
                    day ? 'text-gray-700 hover:bg-gray-100 cursor-pointer' : ''
                  }`}
                >
                  {day || ''}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main Calendar */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between ">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <h2 className="text-2xl font-semibold text-gray-900">
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
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus size={18} />
            Create New
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 p-8">
          <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden" >
            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {dayNames.map(day => (
                <div
                  key={day}
                  className="py-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7" style={{ gridAutoRows: '1fr' }}>
              {mainWeeks.map((week, weekIdx) => (
                week.map((day, dayIdx) => (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    className="border-r border-b border-gray-200 last:border-r-0 p-3 min-h-[120px] hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    {day && (
                      <div className="text-sm font-medium text-gray-700">{day}</div>
                    )}
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Create New Event</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
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