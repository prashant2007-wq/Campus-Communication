import { useState } from 'react';
import { mockEvents } from '../data/mockData';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-react';

export function CalendarView() {
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month' | 'agenda'>('week');
  const [currentDate, setCurrentDate] = useState(new Date('2026-01-20'));

  // Group events by date
  const eventsByDate = mockEvents.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, typeof mockEvents>);

  const categoryColors: Record<string, string> = {
    'Tech': 'bg-blue-500 border-blue-600',
    'AI/ML': 'bg-purple-500 border-purple-600',
    'Career Development': 'bg-green-500 border-green-600',
    'Entrepreneurship': 'bg-orange-500 border-orange-600',
    'Cultural': 'bg-pink-500 border-pink-600',
    'Sports': 'bg-yellow-500 border-yellow-600',
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Calendar</h2>
            <p className="text-slate-600 mt-1">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateDate('prev')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all"
            >
              Today
            </button>
            <button
              onClick={() => navigateDate('next')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-all"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* View Selector */}
        <div className="flex gap-2">
          {(['day', 'week', 'month', 'agenda'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                currentView === view
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Content */}
      {currentView === 'week' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-7 border-b border-slate-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-4 text-center font-medium text-slate-700 bg-slate-50">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 min-h-[600px]">
            {getWeekDays().map((date, index) => {
              const dateKey = formatDateKey(date);
              const dayEvents = eventsByDate[dateKey] || [];
              const isToday = formatDateKey(new Date()) === dateKey;

              return (
                <div
                  key={index}
                  className={`border-r border-b border-slate-200 p-3 ${isToday ? 'bg-blue-50' : 'bg-white'}`}
                >
                  <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-700' : 'text-slate-700'}`}>
                    {date.getDate()}
                  </div>
                  <div className="space-y-2">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`${categoryColors[event.category]} text-white p-2 rounded-lg text-xs cursor-pointer hover:opacity-90 transition-all border-l-4`}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-white/90 mt-1">{event.time}</div>
                        {event.hasConflict && (
                          <div className="bg-red-500 text-white px-1 py-0.5 rounded text-xs mt-1">
                            Conflict
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {currentView === 'agenda' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
          {Object.keys(eventsByDate).sort().map((dateKey) => {
            const date = new Date(dateKey);
            const events = eventsByDate[dateKey];

            return (
              <div key={dateKey}>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>
                <div className="space-y-3 ml-7">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-900">{event.title}</h4>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${categoryColors[event.category]} text-white`}>
                          {event.category}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time} • {event.duration} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{event.registeredCount} attending</span>
                        </div>
                        {event.attendingFriends.length > 0 && (
                          <div className="text-blue-600 font-medium">
                            {event.attendingFriends.length} friend{event.attendingFriends.length > 1 ? 's' : ''} going
                          </div>
                        )}
                      </div>
                      {event.hasConflict && (
                        <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-2 text-sm text-red-700">
                          ⚠️ Conflicts with another event
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {currentView === 'day' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4 text-lg">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
          <div className="space-y-3">
            {(eventsByDate[formatDateKey(currentDate)] || []).map((event) => (
              <div
                key={event.id}
                className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-slate-900">{event.title}</h4>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${categoryColors[event.category]} text-white`}>
                    {event.category}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{event.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time} • {event.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'month' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-center text-slate-600">Month view coming soon - displaying agenda view for now</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-2">Quick Actions</h3>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium hover:bg-white/30 transition-all">
            Sync to Google Calendar
          </button>
          <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium hover:bg-white/30 transition-all">
            Export Calendar
          </button>
          <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium hover:bg-white/30 transition-all">
            Share Schedule with Friends
          </button>
        </div>
      </div>
    </div>
  );
}
