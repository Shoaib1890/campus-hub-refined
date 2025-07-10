import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Filter, 
  Search,
  Bell,
  Calendar,
  User,
  Building2,
  Utensils,
  GraduationCap,
  BookOpen,
  CreditCard,
  Heart,
  Bus,
  Wifi,
  Coffee
} from 'lucide-react';

const QueueManagement = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [joinedQueues, setJoinedQueues] = useState(new Set());
  const [notifications, setNotifications] = useState(true);

  // Simulated real-time queue data
  const [queues, setQueues] = useState([
    {
      id: 1,
      name: "Registrar Office",
      location: "Administration Building",
      category: "academic",
      currentQueue: 12,
      averageWait: 25,
      maxCapacity: 20,
      status: "busy",
      trend: "up",
      trendValue: 15,
      estimatedTime: "30-40 min",
      services: ["Transcripts", "Enrollment", "Certificates"],
      hours: "9:00 AM - 5:00 PM",
      icon: GraduationCap,
      lastUpdated: "2 min ago"
    },
    {
      id: 2,
      name: "Library Help Desk",
      location: "Central Library - Ground Floor",
      category: "academic",
      currentQueue: 3,
      averageWait: 8,
      maxCapacity: 15,
      status: "normal",
      trend: "down",
      trendValue: 12,
      estimatedTime: "5-10 min",
      services: ["Book Issues", "Research Help", "Computer Access"],
      hours: "8:00 AM - 10:00 PM",
      icon: BookOpen,
      lastUpdated: "1 min ago"
    },
    {
      id: 3,
      name: "Cafeteria - Main Counter",
      location: "Student Center",
      category: "dining",
      currentQueue: 18,
      averageWait: 12,
      maxCapacity: 25,
      status: "busy",
      trend: "up",
      trendValue: 22,
      estimatedTime: "15-20 min",
      services: ["Meals", "Snacks", "Beverages"],
      hours: "7:00 AM - 9:00 PM",
      icon: Utensils,
      lastUpdated: "30 sec ago"
    },
    {
      id: 4,
      name: "Finance Office",
      location: "Administration Building",
      category: "administrative",
      currentQueue: 7,
      averageWait: 18,
      maxCapacity: 12,
      status: "normal",
      trend: "down",
      trendValue: 8,
      estimatedTime: "20-25 min",
      services: ["Fee Payment", "Scholarships", "Financial Aid"],
      hours: "9:00 AM - 4:00 PM",
      icon: CreditCard,
      lastUpdated: "3 min ago"
    },
    {
      id: 5,
      name: "Health Center",
      location: "Medical Building",
      category: "health",
      currentQueue: 5,
      averageWait: 15,
      maxCapacity: 10,
      status: "normal",
      trend: "stable",
      trendValue: 0,
      estimatedTime: "15-20 min",
      services: ["General Consultation", "First Aid", "Vaccinations"],
      hours: "8:00 AM - 6:00 PM",
      icon: Heart,
      lastUpdated: "1 min ago"
    },
    {
      id: 6,
      name: "IT Help Desk",
      location: "Computer Science Building",
      category: "technical",
      currentQueue: 2,
      averageWait: 10,
      maxCapacity: 8,
      status: "available",
      trend: "down",
      trendValue: 5,
      estimatedTime: "5-10 min",
      services: ["WiFi Issues", "Software Support", "Hardware Repair"],
      hours: "9:00 AM - 8:00 PM",
      icon: Wifi,
      lastUpdated: "45 sec ago"
    },
    {
      id: 7,
      name: "Campus Shuttle",
      location: "Main Gate",
      category: "transport",
      currentQueue: 15,
      averageWait: 5,
      maxCapacity: 30,
      status: "normal",
      trend: "up",
      trendValue: 10,
      estimatedTime: "3-5 min",
      services: ["Campus Tour", "City Transport", "Airport Shuttle"],
      hours: "6:00 AM - 10:00 PM",
      icon: Bus,
      lastUpdated: "15 sec ago"
    },
    {
      id: 8,
      name: "Coffee Shop",
      location: "Student Center",
      category: "dining",
      currentQueue: 8,
      averageWait: 4,
      maxCapacity: 15,
      status: "normal",
      trend: "stable",
      trendValue: 0,
      estimatedTime: "3-5 min",
      services: ["Coffee", "Pastries", "Study Space"],
      hours: "6:00 AM - 11:00 PM",
      icon: Coffee,
      lastUpdated: "1 min ago"
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Queues', icon: Building2 },
    { id: 'academic', name: 'Academic', icon: GraduationCap },
    { id: 'dining', name: 'Dining', icon: Utensils },
    { id: 'administrative', name: 'Administrative', icon: User },
    { id: 'health', name: 'Health', icon: Heart },
    { id: 'technical', name: 'Technical', icon: Wifi },
    { id: 'transport', name: 'Transport', icon: Bus }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'from-green-500 to-emerald-400';
      case 'normal': return 'from-blue-500 to-cyan-400';
      case 'busy': return 'from-orange-500 to-red-400';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700 border-green-200';
      case 'normal': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'busy': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const filteredQueues = queues.filter(queue => {
    const matchesCategory = selectedFilter === 'all' || queue.category === selectedFilter;
    const matchesSearch = queue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         queue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         queue.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const joinQueue = (queueId) => {
    setJoinedQueues(prev => new Set(prev).add(queueId));
    if (notifications) {
      // Simulate notification
      setTimeout(() => {
        alert(`You've joined the queue! Position: ${Math.floor(Math.random() * 5) + 1}`);
      }, 500);
    }
  };

  const leaveQueue = (queueId) => {
    setJoinedQueues(prev => {
      const newSet = new Set(prev);
      newSet.delete(queueId);
      return newSet;
    });
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setQueues(prev => prev.map(queue => ({
        ...queue,
        currentQueue: Math.max(0, queue.currentQueue + Math.floor(Math.random() * 3) - 1),
        lastUpdated: 'Just now'
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalInQueue = queues.reduce((sum, queue) => sum + queue.currentQueue, 0);
  const averageWait = Math.round(queues.reduce((sum, queue) => sum + queue.averageWait, 0) / queues.length);
  const busyQueues = queues.filter(q => q.status === 'busy').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-lg mb-6">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Real-time Queue Management</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Campus Queues 📍
          </h1>
          <p className="text-xl text-gray-600 mb-8">Monitor and join queues across campus in real-time</p>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Users className="w-8 h-8 text-blue-500" />
                <span className="text-3xl font-bold text-gray-900">{totalInQueue}</span>
              </div>
              <p className="text-sm text-gray-600">Total People in Queues</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Clock className="w-8 h-8 text-emerald-500" />
                <span className="text-3xl font-bold text-gray-900">{averageWait}m</span>
              </div>
              <p className="text-sm text-gray-600">Average Wait Time</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-2">
                <AlertCircle className="w-8 h-8 text-orange-500" />
                <span className="text-3xl font-bold text-gray-900">{busyQueues}</span>
              </div>
              <p className="text-sm text-gray-600">Busy Locations</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search queues, locations, or services..."
                  className="w-full pl-10 pr-4 py-3 bg-white/70 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                {categories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedFilter(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                        selectedFilter === category.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'bg-white/70 text-gray-700 hover:bg-white/90'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Queue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQueues.map((queue, index) => {
            const Icon = queue.icon;
            const isJoined = joinedQueues.has(queue.id);
            
            return (
              <div
                key={queue.id}
                className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${getStatusColor(queue.status)} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{queue.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {queue.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(queue.trend)}
                    <span className={`text-xs ${
                      queue.trend === 'up' ? 'text-red-500' : 
                      queue.trend === 'down' ? 'text-green-500' : 'text-gray-500'
                    }`}>
                      {queue.trend !== 'stable' && `${queue.trendValue}%`}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-4 ${getStatusBadge(queue.status)}`}>
                  <div className={`w-2 h-2 rounded-full ${
                    queue.status === 'available' ? 'bg-green-500' :
                    queue.status === 'normal' ? 'bg-blue-500' : 'bg-orange-500'
                  } animate-pulse`}></div>
                  {queue.status.charAt(0).toUpperCase() + queue.status.slice(1)}
                </div>

                {/* Queue Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-white/40 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-gray-900">{queue.currentQueue}</div>
                    <div className="text-xs text-gray-600">In Queue</div>
                  </div>
                  <div className="text-center p-3 bg-white/40 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-gray-900">{queue.averageWait}m</div>
                    <div className="text-xs text-gray-600">Avg Wait</div>
                  </div>
                </div>

                {/* Queue Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Queue Capacity</span>
                    <span>{queue.currentQueue}/{queue.maxCapacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getStatusColor(queue.status)} transition-all duration-500`}
                      style={{ width: `${(queue.currentQueue / queue.maxCapacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2">Services Available:</p>
                  <div className="flex flex-wrap gap-1">
                    {queue.services.map(service => (
                      <span key={service} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hours and Last Updated */}
                <div className="text-xs text-gray-500 mb-4 space-y-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Hours: {queue.hours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Updated: {queue.lastUpdated}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {isJoined ? (
                    <button
                      onClick={() => leaveQueue(queue.id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Leave Queue
                    </button>
                  ) : (
                    <button
                      onClick={() => joinQueue(queue.id)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      Join Queue
                    </button>
                  )}
                  <button className="bg-white/70 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-white/90 transition-all duration-300">
                    <Bell className="w-4 h-4" />
                  </button>
                </div>

                {/* Estimated Time */}
                <div className="mt-3 text-center">
                  <span className="text-sm text-gray-600">
                    Estimated wait: <span className="font-semibold text-blue-600">{queue.estimatedTime}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredQueues.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg max-w-md mx-auto">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No queues found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueueManagement;