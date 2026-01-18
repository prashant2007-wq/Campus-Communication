import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { ConflictResolver } from './components/ConflictResolver';
import { CalendarView } from './components/CalendarView'; 
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { NotificationSimulator } from './components/NotificationSimulator'; 
import { NotificationSetup } from './components/NotificationSetup'; 
import { NotificationCenter } from './components/NotificationCenter';
import { AutoNotificationTrigger } from './components/AutoNotificationTrigger';
import { WelcomeTour } from './components/WelcomeTour';
import { LayoutGrid, Calendar, BarChart3, Settings as SettingsIcon, Bell } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'calendar' | 'analytics' | 'settings' | 'notifications'>('dashboard');
  const [notificationSetupComplete, setNotificationSetupComplete] = useState(false);
  const [tourComplete, setTourComplete] = useState(false);
  const [userContacts, setUserContacts] = useState({ email: '', phone: '' });

  const handleNotificationSetup = (data: { email: string; phone: string }) => {
    setUserContacts(data);
    setNotificationSetupComplete(true);
  };

  // Show notification setup if not complete
  if (!notificationSetupComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <NotificationSetup onComplete={handleNotificationSetup} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <LayoutGrid className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">CampusFlow</h1>
                <p className="text-xs text-slate-500">Your intelligent campus companion</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeView === 'dashboard'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <LayoutGrid className="w-4 h-4 inline mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveView('calendar')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeView === 'calendar'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Calendar
              </button>
              <button
                onClick={() => setActiveView('analytics')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeView === 'analytics'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Analytics
              </button>
              <button
                onClick={() => setActiveView('notifications')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeView === 'notifications'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Bell className="w-4 h-4 inline mr-2" />
                Notifications
              </button>
              <button
                onClick={() => setActiveView('settings')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeView === 'settings'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <SettingsIcon className="w-4 h-4 inline mr-2" />
                Settings
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'calendar' && <CalendarView />}
        {activeView === 'analytics' && <Analytics />}
        {activeView === 'settings' && <Settings />}
        {activeView === 'notifications' && (
          <NotificationCenter email={userContacts.email} phone={userContacts.phone} />
        )}
      </main>

      {/* Floating Conflict Resolver Badge (shows when there are conflicts) */}
      <ConflictResolver />
      
      {/* Auto Notification Trigger - Simulates real-time notifications */}
      <AutoNotificationTrigger email={userContacts.email} phone={userContacts.phone} />
      
      {/* Welcome Tour */}
      {!tourComplete && <WelcomeTour onComplete={() => setTourComplete(true)} />}
    </div>
  );
}
