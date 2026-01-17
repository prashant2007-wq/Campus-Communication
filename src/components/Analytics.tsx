import { userProfile, mockEvents } from '../data/mockData';
import { BarChart3, TrendingUp, Calendar, Users, Award, Target } from 'lucide-react';
export function Analytics() {
  const totalEventsAttended = Object.values(userProfile.pastAttendance).reduce((a, b) => a + b, 0);
  const categoryStats = Object.entries(userProfile.pastAttendance).map(([category, count]) => ({
    category,
    count,
    percentage: (count / totalEventsAttended) * 100,
  })).sort((a, b) => b.count - a.count);

  const categoryColors: Record<string, string> = {
    'Tech': 'bg-blue-500',
    'AI/ML': 'bg-purple-500',
    'Career Development': 'bg-green-500',
    'Entrepreneurship': 'bg-orange-500',
    'Cultural': 'bg-pink-500',
    'Sports': 'bg-yellow-500',
  };

  const upcomingEventsByCategory = mockEvents.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recommendations = [
    {
      title: 'Explore Entrepreneurship More',
      description: 'You\'ve only attended 5 entrepreneurship events. Try the Startup Pitch Competition to expand your horizons.',
      action: 'View Events',
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-700 border-orange-200',
    },
    {
      title: 'Maintain Your Tech Streak',
      description: 'You\'re most engaged with Tech events (18 attended). Keep it up! 3 new tech events match your interests.',
      action: 'Discover',
      icon: Award,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    {
      title: 'Network at Cultural Events',
      description: 'Cultural events have great networking potential. Your friends are attending the Cultural Night on Jan 23.',
      action: 'Learn More',
      icon: Users,
      color: 'bg-pink-100 text-pink-700 border-pink-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-slate-900">Your Campus Analytics</h2>
        </div>
        <p className="text-slate-600">Insights into your campus engagement and personalized recommendations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <Calendar className="w-8 h-8 mb-3 opacity-80" />
          <div className="text-3xl font-bold mb-1">{totalEventsAttended}</div>
          <div className="text-blue-100">Events Attended</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
          <div className="text-3xl font-bold mb-1">{mockEvents.length}</div>
          <div className="text-green-100">Upcoming Events</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <Users className="w-8 h-8 mb-3 opacity-80" />
          <div className="text-3xl font-bold mb-1">
            {mockEvents.reduce((sum, e) => sum + e.attendingFriends.length, 0)}
          </div>
          <div className="text-purple-100">Friend Connections</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <Award className="w-8 h-8 mb-3 opacity-80" />
          <div className="text-3xl font-bold mb-1">{Math.round(mockEvents.reduce((sum, e) => sum + e.matchScore, 0) / mockEvents.length)}%</div>
          <div className="text-orange-100">Avg Match Score</div>
        </div>
      </div>

      {/* Attendance by Category */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Event History</h3>
        <div className="space-y-4">
          {categoryStats.map((stat) => (
            <div key={stat.category}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-700">{stat.category}</span>
                <span className="text-sm text-slate-600">{stat.count} events</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${categoryColors[stat.category]} transition-all`}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Events in Your Interests */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Trending in Your Interest Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userProfile.interests.map((interest) => {
            const count = upcomingEventsByCategory[interest] || 0;
            const topEvent = mockEvents
              .filter(e => e.category === interest)
              .sort((a, b) => b.registeredCount - a.registeredCount)[0];

            if (!topEvent) return null;

            return (
              <div key={interest} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${categoryColors[interest]} text-white`}>
                    {interest}
                  </span>
                  <span className="text-sm text-slate-600">{count} upcoming</span>
                </div>
                <h4 className="font-medium text-slate-900 mb-1">{topEvent.title}</h4>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="w-4 h-4" />
                  <span>{topEvent.registeredCount} registered</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">Personalized Recommendations</h3>
        </div>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className={`border rounded-lg p-4 ${rec.color}`}>
              <div className="flex items-start gap-3">
                <rec.icon className="w-5 h-5 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{rec.title}</h4>
                  <p className="text-sm mb-3 opacity-90">{rec.description}</p>
                  <button className="px-4 py-2 bg-white/50 rounded-lg text-sm font-medium hover:bg-white/70 transition-all">
                    {rec.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Timeline */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Your Campus Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-2xl font-bold mb-1">47</div>
            <div className="text-indigo-100">Total Events</div>
            <div className="text-sm text-indigo-200 mt-1">Since joining CampusFlow</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">18</div>
            <div className="text-indigo-100">Career Events</div>
            <div className="text-sm text-indigo-200 mt-1">Building your future</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-1">89%</div>
            <div className="text-indigo-100">Attendance Rate</div>
            <div className="text-sm text-indigo-200 mt-1">You're highly engaged!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
