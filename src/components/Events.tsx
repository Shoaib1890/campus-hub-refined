
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Filter, Search, Heart, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Events = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const categories = ['all', 'academic', 'social', 'sports', 'cultural', 'career', 'workshops'];

  const events = [
    {
      id: 1,
      title: 'Tech Talk: Future of AI in Education',
      category: 'academic',
      date: '2024-01-15',
      time: '2:00 PM - 4:00 PM',
      location: 'Engineering Building - Auditorium A',
      organizer: 'Computer Science Club',
      attendees: 45,
      maxAttendees: 100,
      description: 'Join industry experts as they discuss the transformative impact of artificial intelligence on modern education.',
      image: 'photo-1461749280684-dccba630e2f6',
      rsvpStatus: null,
      tags: ['AI', 'Technology', 'Education']
    },
    {
      id: 2,
      title: 'Campus Spring Festival',
      category: 'cultural',
      date: '2024-01-20',
      time: '12:00 PM - 8:00 PM',
      location: 'Main Quad',
      organizer: 'Student Activities Board',
      attendees: 234,
      maxAttendees: 500,
      description: 'Annual spring celebration with live music, food trucks, games, and cultural performances.',
      image: 'photo-1519389950473-47ba0277781c',
      rsvpStatus: 'going',
      tags: ['Festival', 'Music', 'Food', 'Culture']
    },
    {
      id: 3,
      title: 'Career Fair 2024',
      category: 'career',
      date: '2024-01-25',
      time: '10:00 AM - 4:00 PM',
      location: 'Student Center - Main Hall',
      organizer: 'Career Services',
      attendees: 156,
      maxAttendees: 300,
      description: 'Meet with 50+ employers from various industries. Bring your resume and dress professionally.',
      image: 'photo-1486312338219-ce68d2c6f44d',
      rsvpStatus: 'interested',
      tags: ['Career', 'Networking', 'Jobs', 'Professional']
    }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const handleRSVP = (eventId: number, status: 'going' | 'interested' | 'not-going') => {
    toast({
      title: `RSVP Updated`,
      description: `You're now marked as "${status}" for this event.`,
    });
  };

  const handleShare = (event: any) => {
    toast({
      title: "Event Shared",
      description: "Event link copied to clipboard!",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Events</h1>
          <p className="text-gray-600">Discover and join exciting events on campus</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'list'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              view === 'calendar'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Calendar View
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {view === 'list' && (
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={`https://images.unsplash.com/${event.image}?w=400&h=300&fit=crop`}
                    alt={event.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.category === 'academic' ? 'bg-blue-100 text-blue-800' :
                          event.category === 'social' ? 'bg-purple-100 text-purple-800' :
                          event.category === 'cultural' ? 'bg-pink-100 text-pink-800' :
                          event.category === 'career' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {event.category}
                        </span>
                        {event.rsvpStatus && (
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            event.rsvpStatus === 'going' ? 'bg-green-100 text-green-800' :
                            event.rsvpStatus === 'interested' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {event.rsvpStatus}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                    </div>
                    <button
                      onClick={() => handleShare(event)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.attendees}/{event.maxAttendees} attending</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRSVP(event.id, 'going')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          event.rsvpStatus === 'going'
                            ? 'bg-green-500 text-white'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        Going
                      </button>
                      <button
                        onClick={() => handleRSVP(event.id, 'interested')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          event.rsvpStatus === 'interested'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        Interested
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'calendar' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View</h3>
            <p className="text-gray-600">Calendar integration coming soon! For now, use the list view to browse events.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
