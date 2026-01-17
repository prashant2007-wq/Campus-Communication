import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Moon, Mail, MessageSquare, Smartphone, Save, Check } from 'lucide-react';

export function Settings() {
  const [settings, setSettings] = useState({
    // Notification Preferences
    emailDigest: true,
    emailFrequency: 'daily',
    pushNotifications: true,
    whatsappUrgent: true,
    whatsappHighMatch: true,
    
    // Quiet Hours
    quietHoursEnabled: true,
    quietStart: '22:00',
    quietEnd: '08:00',
    
    // Interest Preferences
    interests: ['AI/ML', 'Tech', 'Career Development', 'Entrepreneurship'],
    
    // Display Preferences
    showFriendActivity: true,
    showSocialProof: true,
    highlightConflicts: true,
    
    // Privacy
    shareAttendance: true,
    allowRecommendations: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleInterest = (interest: string) => {
    setSettings(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const allCategories = ['Tech', 'AI/ML', 'Career Development', 'Entrepreneurship', 'Cultural', 'Sports'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-slate-900">Settings & Preferences</h2>
        </div>
        <p className="text-slate-600">Customize your CampusFlow experience</p>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Notification Preferences</h3>
        </div>

        <div className="space-y-6">
          {/* Email Settings */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-slate-600" />
                <span className="font-medium text-slate-900">Email Digest</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailDigest}
                  onChange={(e) => updateSetting('emailDigest', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {settings.emailDigest && (
              <div className="ml-7">
                <label className="text-sm text-slate-600 mb-2 block">Frequency</label>
                <select
                  value={settings.emailFrequency}
                  onChange={(e) => updateSetting('emailFrequency', e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="daily">Daily (8:00 AM)</option>
                  <option value="weekly">Weekly (Monday)</option>
                  <option value="realtime">Real-time</option>
                </select>
              </div>
            )}
          </div>

          {/* Push Notifications */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-slate-600" />
                <span className="font-medium text-slate-900">Browser Push Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => updateSetting('pushNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-sm text-slate-500 ml-7">Gentle reminders for upcoming events</p>
          </div>

          {/* WhatsApp Settings */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-5 h-5 text-slate-600" />
              <span className="font-medium text-slate-900">WhatsApp (Urgent Only)</span>
            </div>
            <div className="ml-7 space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.whatsappUrgent}
                  onChange={(e) => updateSetting('whatsappUrgent', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-slate-700">Last-minute reminders for registered events</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.whatsappHighMatch}
                  onChange={(e) => updateSetting('whatsappHighMatch', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-slate-700">Exceptionally high-match opportunities (90%+)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Moon className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Quiet Hours</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Enable Quiet Hours</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.quietHoursEnabled}
                onChange={(e) => updateSetting('quietHoursEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {settings.quietHoursEnabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600 mb-2 block">Start Time</label>
                <input
                  type="time"
                  value={settings.quietStart}
                  onChange={(e) => updateSetting('quietStart', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600 mb-2 block">End Time</label>
                <input
                  type="time"
                  value={settings.quietEnd}
                  onChange={(e) => updateSetting('quietEnd', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          )}

          <p className="text-sm text-slate-500">
            No notifications will be sent during quiet hours except for truly urgent updates
          </p>
        </div>
      </div>

      {/* Interest Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Interests</h3>
        <p className="text-sm text-slate-600 mb-4">Select categories you're interested in for better event matching</p>
        
        <div className="flex flex-wrap gap-3">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => toggleInterest(category)}
              className={`px-4 py-2 rounded-lg font-medium border transition-all ${
                settings.interests.includes(category)
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Display Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Display Preferences</h3>
        
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-slate-700">Show friend activity</span>
            <input
              type="checkbox"
              checked={settings.showFriendActivity}
              onChange={(e) => updateSetting('showFriendActivity', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-slate-700">Show social proof (registration counts)</span>
            <input
              type="checkbox"
              checked={settings.showSocialProof}
              onChange={(e) => updateSetting('showSocialProof', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-slate-700">Highlight schedule conflicts</span>
            <input
              type="checkbox"
              checked={settings.highlightConflicts}
              onChange={(e) => updateSetting('highlightConflicts', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Privacy</h3>
        
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-slate-700">Share my attendance with friends</span>
            <input
              type="checkbox"
              checked={settings.shareAttendance}
              onChange={(e) => updateSetting('shareAttendance', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-slate-700">Allow personalized recommendations</span>
            <input
              type="checkbox"
              checked={settings.allowRecommendations}
              onChange={(e) => updateSetting('allowRecommendations', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            saved
              ? 'bg-green-100 text-green-700'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
          }`}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Preferences
            </>
          )}
        </button>
      </div>
    </div>
  );
}
