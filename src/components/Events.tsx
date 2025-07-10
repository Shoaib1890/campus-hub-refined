import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Filter,
  Search,
  Heart,
  Share2,
  Star,
  Bookmark,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Eye,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const Events = () => {
  const [view, setView] = useState("list");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [bookmarkedEvents, setBookmarkedEvents] = useState(new Set());

  const categories = [
    { id: "all", label: "All Events", icon: "🎯", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { id: "academic", label: "Academic", icon: "📚", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    { id: "social", label: "Social", icon: "🎉", color: "bg-gradient-to-r from-pink-500 to-rose-500" },
    { id: "sports", label: "Sports", icon: "⚽", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
    { id: "cultural", label: "Cultural", icon: "🎨", color: "bg-gradient-to-r from-indigo-500 to-purple-500" },
    { id: "career", label: "Career", icon: "💼", color: "bg-gradient-to-r from-emerald-500 to-teal-500" },
    { id: "workshops", label: "Workshops", icon: "🛠️", color: "bg-gradient-to-r from-orange-500 to-red-500" },
  ];

  const [eventsData, setEventsData] = useState([
    {
      id: 1,
      title: "Tech Talk: Future of AI in Education",
      category: "academic",
      date: "2024-01-15",
      time: "2:00 PM - 4:00 PM",
      location: "Engineering Building - Auditorium A",
      organizer: "Computer Science Club",
      attendees: 45,
      maxAttendees: 100,
      description: "Join industry experts to discuss the impact of AI on education.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      attendanceStatus: null,
      tags: ["AI", "Technology", "Education"],
      featured: true,
      trending: true,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Campus Spring Festival",
      category: "cultural",
      date: "2024-01-20",
      time: "12:00 PM - 8:00 PM",
      location: "Main Quad",
      organizer: "Student Activities Board",
      attendees: 234,
      maxAttendees: 500,
      description: "Live music, food trucks, games, and cultural performances.",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop",
      attendanceStatus: "going",
      tags: ["Festival", "Music", "Food", "Culture"],
      featured: true,
      trending: false,
      rating: 4.9,
    },
    {
      id: 3,
      title: "Career Fair 2024",
      category: "career",
      date: "2024-01-25",
      time: "10:00 AM - 4:00 PM",
      location: "Student Center - Main Hall",
      organizer: "Career Services",
      attendees: 156,
      maxAttendees: 300,
      description: "Meet employers from top industries. Bring your resume.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
      attendanceStatus: "interested",
      tags: ["Career", "Networking", "Jobs"],
      featured: false,
      trending: true,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Hackathon Weekend",
      category: "academic",
      date: "2024-02-03",
      time: "9:00 AM - 6:00 PM",
      location: "Innovation Hub",
      organizer: "Tech Society",
      attendees: 120,
      maxAttendees: 150,
      description: "Build something awesome in 24 hours. Prizes worth ₹50K.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
      attendanceStatus: null,
      tags: ["Hackathon", "Coding", "Tech"],
      featured: true,
      trending: true,
      rating: 4.9,
    },
    {
      id: 5,
      title: "Outdoor Movie Night",
      category: "social",
      date: "2024-02-05",
      time: "7:00 PM - 10:00 PM",
      location: "Open Air Theater",
      organizer: "Drama Club",
      attendees: 200,
      maxAttendees: 300,
      description: "Watch a classic film under the stars. Free popcorn!",
      image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=300&fit=crop",
      attendanceStatus: null,
      tags: ["Movie", "Fun", "Social"],
      featured: false,
      trending: false,
      rating: 4.6,
    },
    {
      id: 6,
      title: "Yoga & Meditation Workshop",
      category: "workshops",
      date: "2024-02-10",
      time: "6:30 AM - 8:00 AM",
      location: "Community Hall",
      organizer: "Wellness Club",
      attendees: 60,
      maxAttendees: 80,
      description: "Start your day with yoga, meditation, and positivity.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      attendanceStatus: null,
      tags: ["Yoga", "Health", "Wellness"],
      featured: false,
      trending: false,
      rating: 4.8,
    },
  ]);

  const filteredEvents = eventsData.filter((event) => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredEvents = eventsData.filter(event => event.featured);
  const trendingEvents = eventsData.filter(event => event.trending);

  const handleRSVP = (eventId, status) => {
    setEventsData(prev => prev.map(event => 
      event.id === eventId ? { ...event, attendanceStatus: status } : event
    ));
  };

  const handleBookmark = (eventId) => {
    setBookmarkedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const getCategoryData = (categoryId) => {
    return categories.find(cat => cat.id === categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 animate-pulse">
              ✨ Campus Events
            </h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Discover amazing events, connect with your community, and make memories that last a lifetime
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>{eventsData.length} Active Events</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>{trendingEvents.length} Trending Now</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                <span>{featuredEvents.length} Featured</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 -mt-16 relative z-10">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-white/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{eventsData.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-white/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Trending</p>
                <p className="text-3xl font-bold text-gray-900">{trendingEvents.length}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-white/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bookmarked</p>
                <p className="text-3xl font-bold text-gray-900">{bookmarkedEvents.size}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Bookmark className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, locations, or organizers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setView("list")}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  view === "list"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                    : "bg-white/80 text-gray-600 hover:bg-white hover:shadow-md"
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setView("calendar")}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  view === "calendar"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                    : "bg-white/80 text-gray-600 hover:bg-white hover:shadow-md"
                }`}
              >
                Calendar View
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg scale-105`
                    : "bg-white/80 text-gray-600 hover:bg-white hover:shadow-md"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && selectedCategory === "all" && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-yellow-500" />
                Featured Events
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={() => handleBookmark(event.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        bookmarkedEvents.has(event.id)
                          ? "bg-yellow-500 text-white"
                          : "bg-white/80 text-gray-600 hover:bg-yellow-500 hover:text-white"
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryData(event.category)?.color} text-white`}>
                          {getCategoryData(event.category)?.icon} {event.category}
                        </span>
                        {event.trending && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {event.attendees}/{event.maxAttendees}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{event.rating}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events List */}
        {view === "list" && (
          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <div className="md:flex">
                  <div className="md:w-1/3 relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {event.featured && (
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium rounded-full">
                          ⭐ Featured
                        </span>
                      )}
                      {event.trending && (
                        <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-medium rounded-full">
                          🔥 Trending
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-8 md:w-2/3 relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryData(event.category)?.color} text-white`}>
                            {getCategoryData(event.category)?.icon} {event.category}
                          </span>
                          {event.attendanceStatus && (
                            <span className={`ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              event.attendanceStatus === "going"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {event.attendanceStatus === "going" ? "✓ Going" : "★ Interested"}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleBookmark(event.id)}
                          className={`p-3 rounded-full transition-all duration-300 ${
                            bookmarkedEvents.has(event.id)
                              ? "bg-yellow-500 text-white shadow-lg"
                              : "bg-gray-100 text-gray-600 hover:bg-yellow-500 hover:text-white"
                          }`}
                        >
                          <Bookmark className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-gray-100 text-gray-600 hover:bg-purple-500 hover:text-white rounded-full transition-all duration-300">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-3 text-purple-500" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-3 text-blue-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-3 text-red-500" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-5 h-5 mr-3 text-green-500" />
                        <span>{event.attendees}/{event.maxAttendees} attending</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-yellow-500 mr-1" />
                          <span className="font-medium">{event.rating}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleRSVP(event.id, "going")}
                          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                            event.attendanceStatus === "going"
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                              : "bg-green-100 text-green-700 hover:bg-green-500 hover:text-white"
                          }`}
                        >
                          I'm Going
                        </button>
                        <button
                          onClick={() => handleRSVP(event.id, "interested")}
                          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                            event.attendanceStatus === "interested"
                              ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-500 hover:text-white"
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

        {/* Calendar View */}
        {view === "calendar" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Calendar</h2>
              <p className="text-gray-600">Click on any date to see events</p>
            </div>
            <div className="grid grid-cols-7 gap-4 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-4 font-semibold text-gray-700 bg-gray-50 rounded-lg">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => (
                <div
                  key={i}
                  className="p-4 h-24 border-2 border-gray-200 rounded-lg hover:border-purple-400 transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    setSelectedDate(new Date());
                    setShowModal(true);
                  }}
                >
                  <div className="text-sm font-medium text-gray-900">{(i % 30) + 1}</div>
                  {i % 7 === 0 && (
                    <div className="mt-1 text-xs bg-purple-100 text-purple-800 rounded-full px-2 py-1">
                      Event
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative transform transition-all duration-300">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Events Today
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">🎤 Guest Lecture</h4>
                  <p className="text-sm text-gray-600 mb-1">3:00 PM – 4:30 PM | Auditorium B</p>
                  <p className="text-xs text-gray-500">Building Scalable Systems</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2">⚽ Football Match</h4>
                  <p className="text-sm text-gray-600 mb-1">6:00 PM – 7:00 PM | Sports Ground</p>
                  <p className="text-xs text-gray-500">Hostel vs Hostel championship</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;