import { useState, useMemo } from 'react';
import { mockEvents, userProfile } from '../data/mockData';
import { EventCard } from './EventCard';
import { Filter, Search, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'match' | 'date' | 'popularity'>('match');

  const categories = ['Tech', 'AI/ML', 'Career Development', 'Entrepreneurship', 'Cultural', 'Sports'];

  const filteredEvents = useMemo(() => {
    let events = [...mockEvents];

    // Filter by categories
    if (selectedCategories.length > 0) {
      events = events.filter(event => selectedCategories.includes(event.category));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      events = events.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort events
    events.sort((a, b) => {
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      if (sortBy === 'date') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'popularity') return b.registeredCount - a.registeredCount;
      return 0;
    });

    return events;
  }, [selectedCategories, searchQuery, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const categoryColors: Record<string, string> = {
    'Tech': 'bg-blue-100 text-blue-700 border-blue-200',
    'AI/ML': 'bg-purple-100 text-purple-700 border-purple-200',
    'Career Development': 'bg-green-100 text-green-700 border-green-200',
    'Entrepreneurship': 'bg-orange-100 text-orange-700 border-orange-200',
    'Cultural': 'bg-pink-100 text-pink-700 border-pink-200',
    'Sports': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-semibold mb-2">Welcome back, {userProfile.name}!</h2>
        <p className="text-blue-100">
          You have {filteredEvents.length} curated events waiting for you
        </p>
        <div className="flex gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-sm text-blue-100">Your Interests</div>
            <div className="font-medium">{userProfile.interests.join(', ')}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-sm text-blue-100">Events Attended</div>
            <div className="font-medium">{Object.values(userProfile.pastAttendance).reduce((a, b) => a + b, 0)} total</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Filter by:</span>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                selectedCategories.includes(category)
                  ? categoryColors[category]
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {category}
            </button>
          ))}
          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Sort by:</span>
          <div className="flex gap-2">
            {[
              { value: 'match', label: 'Best Match' },
              { value: 'date', label: 'Date' },
              { value: 'popularity', label: 'Popularity' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value as any)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  sortBy === option.value
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
