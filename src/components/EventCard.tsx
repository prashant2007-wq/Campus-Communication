import { useState } from 'react';
import { Event } from '../data/mockData';
import { Calendar, MapPin, Users, Clock, Sparkles, ExternalLink, Tag, Mail, Phone, UserCheck, AlertCircle } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-slate-400';
  };

  const getMatchLabel = (score: number) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 75) return 'Great Match';
    if (score >= 60) return 'Good Match';
    return 'Potential Interest';
  };

  const categoryColors: Record<string, string> = {
    'Tech': 'bg-blue-100 text-blue-700 border-blue-200',
    'AI/ML': 'bg-purple-100 text-purple-700 border-purple-200',
    'Career Development': 'bg-green-100 text-green-700 border-green-200',
    'Entrepreneurship': 'bg-orange-100 text-orange-700 border-orange-200',
    'Cultural': 'bg-pink-100 text-pink-700 border-pink-200',
    'Sports': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };

  const sourceIcons: Record<string, string> = {
    'email': '📧',
    'slack': '💬',
    'whatsapp': '📱',
    'instagram': '📸',
    'notice-board': '📋',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const capacityPercentage = (event.registeredCount / event.capacity) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
      {/* Match Score Banner */}
      <div className={`${getMatchColor(event.matchScore)} px-4 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">{event.matchScore}% Match • {getMatchLabel(event.matchScore)}</span>
        </div>
        <span className="text-white text-xs">{sourceIcons[event.source]} from {event.source}</span>
      </div>

      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 text-lg mb-2">{event.title}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-1 rounded-md text-xs font-medium border ${categoryColors[event.category]}`}>
                {event.category}
              </span>
              {event.hasConflict && (
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Schedule Conflict
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.date)} at {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-4 h-4" />
            <span>{event.duration} minutes</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-600" />
            <span className="text-sm text-slate-700">
              <span className="font-medium">{event.registeredCount}</span> / {event.capacity} registered
            </span>
          </div>
          <div className="flex-1 mx-3">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${capacityPercentage > 90 ? 'bg-red-500' : capacityPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Friends Attending */}
        {event.attendingFriends.length > 0 && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <div className="flex items-center gap-2 text-blue-700 text-sm">
              <UserCheck className="w-4 h-4" />
              <span className="font-medium">
                {event.attendingFriends.length} friend{event.attendingFriends.length > 1 ? 's' : ''} attending:
              </span>
            </div>
            <p className="text-sm text-blue-600 mt-1">{event.attendingFriends.join(', ')}</p>
          </div>
        )}

        {/* Expanded Details */}
        {isExpanded && (
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <p className="text-sm text-slate-600">{event.description}</p>
            
            <div className="flex flex-wrap gap-1">
              {event.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="bg-slate-50 rounded-lg p-3 space-y-2">
              <div className="text-sm">
                <span className="font-medium text-slate-700">Organizer:</span> {event.organizer}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="w-4 h-4" />
                <span>{event.organizerContact}</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => setIsRegistered(!isRegistered)}
            className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
              isRegistered
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
            }`}
          >
            {isRegistered ? '✓ Registered' : 'Register'}
          </button>
          {isRegistered && (
            <button
              onClick={() => {
                // This would trigger a notification in the real app
                if ('Notification' in window && Notification.permission === 'granted') {
                  new Notification('Reminder Set! 🔔', {
                    body: `You'll receive a WhatsApp reminder 30 min before ${event.title}`,
                  });
                }
              }}
              className="px-4 py-2.5 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-all"
              title="Send me a reminder"
            >
              🔔
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all"
          >
            {isExpanded ? 'Show Less' : 'Details'}
          </button>
        </div>
      </div>
    </div>
  );
}