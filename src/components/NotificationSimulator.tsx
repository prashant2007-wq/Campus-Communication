import { useState } from 'react';
import { MessageSquare, Mail, Smartphone, Bell, Clock, MapPin, Users, Calendar, ExternalLink } from 'lucide-react';

export function NotificationSimulator() {
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'email' | 'push'>('whatsapp');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-slate-900">Multi-Channel Notification System</h2>
        </div>
        <p className="text-slate-600">Experience how CampusFlow delivers contextual notifications across channels</p>
      </div>

      {/* Channel Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveChannel('whatsapp')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              activeChannel === 'whatsapp'
                ? 'bg-green-100 text-green-700 border-2 border-green-300'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-2 border-slate-200'
            }`}
          >
            <Smartphone className="w-5 h-5" />
            WhatsApp (Urgent)
          </button>
          <button
            onClick={() => setActiveChannel('email')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              activeChannel === 'email'
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-2 border-slate-200'
            }`}
          >
            <Mail className="w-5 h-5" />
            Email Digest
          </button>
          <button
            onClick={() => setActiveChannel('push')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              activeChannel === 'push'
                ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-2 border-slate-200'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Push Notifications
          </button>
        </div>
      </div>

      {/* WhatsApp Simulation */}
      {activeChannel === 'whatsapp' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">WhatsApp: Urgent Only</h3>
            <p className="text-green-100">
              CampusFlow sends WhatsApp messages only for truly urgent moments, respecting your attention
            </p>
          </div>

          {/* Mock WhatsApp Interface */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden max-w-md mx-auto">
            {/* WhatsApp Header */}
            <div className="bg-green-600 text-white px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">CampusFlow</div>
                <div className="text-xs text-green-100">Active now</div>
              </div>
            </div>

            {/* WhatsApp Messages */}
            <div className="bg-[#e5ddd5] p-4 space-y-3 min-h-[400px]">
              <div className="text-center text-xs text-slate-500 mb-4">Today</div>

              {/* Message 1: Last-minute reminder */}
              <div className="ml-auto max-w-[85%]">
                <div className="bg-[#dcf8c6] rounded-lg p-3 shadow-sm">
                  <div className="font-medium text-slate-900 mb-1">⏰ Reminder: Event Starting Soon!</div>
                  <div className="text-sm text-slate-700 mb-2">
                    <strong>AI for Social Good Hackathon</strong> starts in 30 minutes
                  </div>
                  <div className="text-sm text-slate-600 space-y-1 mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span>Engineering Building, Room 301</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">
                    📍 Walking directions: 8 min from your location
                  </div>
                  <div className="bg-white rounded p-2 text-xs text-slate-600 mb-2">
                    <strong>Organizer:</strong> AI Club<br />
                    📞 +1 234-567-8901
                  </div>
                  <div className="text-sm text-green-700 font-medium">
                    👥 Sarah, Marcus, and Emily are attending
                  </div>
                  <div className="text-xs text-slate-500 mt-2 text-right">8:30 AM</div>
                </div>
              </div>

              {/* Message 2: Schedule change */}
              <div className="ml-auto max-w-[85%]">
                <div className="bg-[#dcf8c6] rounded-lg p-3 shadow-sm">
                  <div className="font-medium text-slate-900 mb-1">🚨 Important: Schedule Change</div>
                  <div className="text-sm text-slate-700 mb-2">
                    <strong>React Native Workshop</strong> has been moved to a different location
                  </div>
                  <div className="text-sm text-slate-600 mb-2">
                    <strong>New Location:</strong> Computer Science Building, Lab 305 (previously Lab 205)
                  </div>
                  <div className="text-xs text-slate-500 text-right">2:15 PM</div>
                </div>
              </div>

              {/* Message 3: High match event */}
              <div className="ml-auto max-w-[85%]">
                <div className="bg-[#dcf8c6] rounded-lg p-3 shadow-sm">
                  <div className="font-medium text-slate-900 mb-1">✨ Exceptional Match: 95%</div>
                  <div className="text-sm text-slate-700 mb-2">
                    A new event matches your interests perfectly!
                  </div>
                  <div className="bg-white rounded p-2 mb-2">
                    <div className="font-medium text-slate-900 mb-1">Machine Learning in Healthcare Summit</div>
                    <div className="text-xs text-slate-600">
                      Tomorrow, 2:00 PM • Innovation Hub<br />
                      Limited spots: 12 remaining
                    </div>
                  </div>
                  <div className="text-sm text-blue-700 font-medium">
                    Tap to register before it fills up
                  </div>
                  <div className="text-xs text-slate-500 text-right">5:42 PM</div>
                </div>
              </div>
            </div>

            {/* WhatsApp Input (disabled for demo) */}
            <div className="bg-slate-100 px-4 py-3 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message"
                disabled
                className="flex-1 bg-white rounded-full px-4 py-2 text-sm"
              />
            </div>
          </div>

          {/* WhatsApp Strategy */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h4 className="font-semibold text-slate-900 mb-3">WhatsApp Strategy</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Last-minute reminders for events you've registered for (30 min before)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Urgent schedule changes or location updates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Exceptionally high-match events (95%+) with limited availability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>General event announcements (use email instead)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span>Low-priority updates (save for daily digest)</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Email Simulation */}
      {activeChannel === 'email' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Email: Calm & Structured</h3>
            <p className="text-blue-100">
              Daily digest emails provide a comprehensive overview without overwhelming your inbox
            </p>
          </div>

          {/* Mock Email Interface */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Email Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Your Daily CampusFlow Digest</h3>
                  <p className="text-blue-100">Saturday, January 17, 2026</p>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-8 space-y-8">
              {/* Greeting */}
              <div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">Good morning, Alex! 👋</h4>
                <p className="text-slate-600">
                  You have <strong>3 upcoming events</strong> this week that match your interests
                </p>
              </div>

              {/* Top Matches */}
              <div>
                <h5 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  Your Top Matches This Week
                </h5>
                <div className="space-y-4">
                  {[
                    {
                      title: 'AI for Social Good Hackathon',
                      match: 95,
                      date: 'Monday, Jan 20 • 9:00 AM',
                      location: 'Engineering Building',
                      category: 'AI/ML',
                      friends: 3,
                    },
                    {
                      title: 'Google SWE Internship Info Session',
                      match: 92,
                      date: 'Monday, Jan 20 • 2:00 PM',
                      location: 'Student Center Auditorium',
                      category: 'Career Development',
                      friends: 2,
                    },
                    {
                      title: 'ML Model Deployment with AWS',
                      match: 93,
                      date: 'Saturday, Jan 25 • 4:00 PM',
                      location: 'Engineering Building',
                      category: 'AI/ML',
                      friends: 2,
                    },
                  ].map((event, i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h6 className="font-semibold text-slate-900">{event.title}</h6>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          {event.match}% Match
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 space-y-1 mb-3">
                        <div>{event.date}</div>
                        <div>{event.location} • {event.category}</div>
                        <div className="text-blue-600 font-medium">{event.friends} friends attending</div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all">
                        Register Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule Alert */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⚠️</div>
                  <div>
                    <h6 className="font-semibold text-red-900 mb-1">Schedule Conflict Detected</h6>
                    <p className="text-sm text-red-700 mb-2">
                      Two events on Monday overlap. Use the Smart Conflict Resolver to choose.
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-all">
                      Resolve Conflict
                    </button>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h5 className="font-semibold text-slate-900 mb-4">You Might Also Like</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-lg p-3">
                    <div className="text-xs text-slate-500 mb-1">Wednesday, Jan 22</div>
                    <div className="font-medium text-slate-900 text-sm mb-1">React Native Workshop</div>
                    <div className="text-xs text-slate-600">89% Match • Tech</div>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-3">
                    <div className="text-xs text-slate-500 mb-1">Friday, Jan 24</div>
                    <div className="font-medium text-slate-900 text-sm mb-1">Startup Workshop</div>
                    <div className="text-xs text-slate-600">87% Match • Entrepreneurship</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
                <p>You're receiving this because you opted in to daily digests.</p>
                <p className="mt-1">
                  <a href="#" className="text-blue-600 hover:underline">Update preferences</a> •{' '}
                  <a href="#" className="text-blue-600 hover:underline">Unsubscribe</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Push Notification Simulation */}
      {activeChannel === 'push' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Push: Ambient Awareness</h3>
            <p className="text-purple-100">
              Gentle, non-intrusive notifications that keep you informed without demanding immediate action
            </p>
          </div>

          {/* Mock Browser Notifications */}
          <div className="space-y-4 max-w-md mx-auto">
            {[
              {
                title: 'Event Tomorrow',
                body: 'AI for Social Good Hackathon starts at 9:00 AM',
                time: '1 hour ago',
                icon: '🤖',
              },
              {
                title: 'Your Friends Are Going',
                body: '3 friends registered for React Native Workshop',
                time: '3 hours ago',
                icon: '👥',
              },
              {
                title: 'New High-Match Event',
                body: 'ML Model Deployment with AWS (93% match)',
                time: '5 hours ago',
                icon: '✨',
              },
              {
                title: 'Registration Reminder',
                body: 'Google Info Session filling up fast - 66 spots left',
                time: 'Yesterday',
                icon: '📢',
              },
            ].map((notif, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg border border-slate-300 p-4 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{notif.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-semibold text-slate-900">{notif.title}</div>
                      <div className="text-xs text-slate-500">{notif.time}</div>
                    </div>
                    <div className="text-sm text-slate-600">{notif.body}</div>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Push Strategy */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h4 className="font-semibold text-slate-900 mb-3">Push Notification Strategy</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                <span>Gentle reminders 1 day before registered events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                <span>Friend activity updates (non-urgent)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                <span>New high-match events (without urgency)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                <span>Registration updates for popular events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600">✓</span>
                <span>Respects quiet hours and do-not-disturb settings</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
