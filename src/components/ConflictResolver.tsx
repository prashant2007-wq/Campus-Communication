import { useState } from 'react';
import { mockEvents } from '../data/mockData';
import { X, Sparkles, Calendar, MapPin, Users, Clock, TrendingUp, AlertCircle } from 'lucide-react';

export function ConflictResolver() {
  const [isOpen, setIsOpen] = useState(false);

  // Find conflicting events
  const conflictingEvents = mockEvents.filter(event => event.hasConflict);
  
  if (conflictingEvents.length === 0) return null;

  const event1 = mockEvents.find(e => e.id === '2'); // Google Info Session
  const event2 = mockEvents.find(e => e.id === '3'); // Startup Pitch

  if (!event1 || !event2) return null;

  const aiRecommendation = {
    recommended: event1,
    reason: 'Based on your career goals (Software Engineering) and high interest in Career Development events (8 attended), the Google SWE Info Session aligns better with your immediate goals. However, the Startup Pitch Competition could provide valuable entrepreneurship exposure.',
    alternativeAction: 'Consider attending the first half of Google session, then joining the pitch competition.',
  };

  return (
    <>
      {/* Floating Badge */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
      >
        <AlertCircle className="w-5 h-5" />
        <span>1 Schedule Conflict</span>
        <span className="ml-1 bg-white/30 rounded-full w-6 h-6 flex items-center justify-center text-sm">
          2
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6" />
                <div>
                  <h2 className="text-xl font-semibold">Smart Conflict Resolver</h2>
                  <p className="text-sm text-red-100">2 events overlap on Jan 20, 2026</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Recommendation Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-6 py-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">AI Recommendation</h3>
                  <p className="text-sm text-blue-800 mb-2">{aiRecommendation.reason}</p>
                  <p className="text-sm text-blue-700 italic">💡 {aiRecommendation.alternativeAction}</p>
                </div>
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event 1 */}
                <EventComparisonCard 
                  event={event1} 
                  isRecommended={aiRecommendation.recommended.id === event1.id}
                />

                {/* Event 2 */}
                <EventComparisonCard 
                  event={event2} 
                  isRecommended={aiRecommendation.recommended.id === event2.id}
                />
              </div>

              {/* Quick Decision Buttons */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Quick Actions</h3>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all">
                    Choose Google Info Session
                  </button>
                  <button className="flex-1 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all">
                    Choose Startup Pitch
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all"
                  >
                    Decide Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function EventComparisonCard({ event, isRecommended }: { event: any; isRecommended: boolean }) {
  const categoryColors: Record<string, string> = {
    'Career Development': 'bg-green-100 text-green-700 border-green-200',
    'Entrepreneurship': 'bg-orange-100 text-orange-700 border-orange-200',
  };

  return (
    <div className={`border-2 rounded-xl p-5 ${isRecommended ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-white'}`}>
      {isRecommended && (
        <div className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4" />
          AI Recommended
        </div>
      )}

      <h3 className="font-semibold text-slate-900 text-lg mb-3">{event.title}</h3>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${categoryColors[event.category]}`}>
            {event.category}
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">
            {event.matchScore}% Match
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4" />
          <span>{event.time} • {event.duration} min</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Users className="w-4 h-4" />
          <span>{event.registeredCount} registered • {event.attendingFriends.length} friends attending</span>
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-4">{event.description}</p>

      {/* Pros */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
        <h4 className="font-medium text-green-900 text-sm mb-2">Why attend?</h4>
        <ul className="text-sm text-green-800 space-y-1">
          {event.id === '2' ? (
            <>
              <li>• Direct connection to top tech companies</li>
              <li>• Aligns with SWE career goals</li>
              <li>• High match score (92%)</li>
            </>
          ) : (
            <>
              <li>• Network with VCs and investors</li>
              <li>• Learn from student founders</li>
              <li>• Strong entrepreneurship exposure</li>
            </>
          )}
        </ul>
      </div>

      {/* Opportunity Cost */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
        <h4 className="font-medium text-slate-900 text-sm mb-2">Opportunity cost</h4>
        <p className="text-sm text-slate-600">
          {event.id === '2' 
            ? 'Miss startup ecosystem exposure and VC networking'
            : 'Miss direct Google recruiter interaction and internship insights'
          }
        </p>
      </div>
    </div>
  );
}
