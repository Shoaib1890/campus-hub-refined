import React from "react";
import { 
  Search, Calendar, Users, MessageCircle, Bell, Sparkles, TrendingUp, Clock, MapPin,
  Zap, Star, Heart, Award, Target, Rocket, Globe, Shield, BookOpen, Coffee, 
  Wifi, Bookmark, Share2, ArrowRight, Activity, Eye, Plus, CheckCircle, AlertCircle, X
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 17) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
    return () => clearTimeout(timeout);
  }, []);

  const stats = [
    {
      name: "Lost Items",
      value: "12",
      change: "+3 today",
      trend: "+15%",
      icon: Search,
      gradient: "from-blue-500 to-cyan-400",
      shadowColor: "shadow-blue-500/25",
      status: "active",
      color: "blue"
    },
    {
      name: "Upcoming Events",
      value: "8",
      change: "2 this week",
      trend: "+8%",
      icon: Calendar,
      gradient: "from-emerald-500 to-teal-400",
      shadowColor: "shadow-emerald-500/25",
      status: "trending",
      color: "emerald"
    },
    {
      name: "Active Queues",
      value: "5",
      change: "Avg 15min wait",
      trend: "-12%",
      icon: Users,
      gradient: "from-purple-500 to-pink-400",
      shadowColor: "shadow-purple-500/25",
      status: "stable",
      color: "purple"
    },
    {
      name: "New Complaints",
      value: "3",
      change: "Pending review",
      trend: "-5%",
      icon: MessageCircle,
      gradient: "from-orange-500 to-red-400",
      shadowColor: "shadow-orange-500/25",
      status: "resolved",
      color: "orange"
    },
  ];

  const recentActivity = [
    {
      type: "lost-item",
      title: "iPhone 14 Pro found near Library",
      time: "2 hours ago",
      location: "Central Library",
      priority: "high",
      action: "View Details",
      icon: Search,
      status: "resolved",
      avatar: "📱"
    },
    {
      type: "event",
      title: "Tech Talk: AI in Education",
      time: "3 hours ago",
      location: "Auditorium A",
      priority: "medium",
      action: "RSVP",
      icon: Calendar,
      status: "upcoming",
      avatar: "🎤"
    },
    {
      type: "queue",
      title: "Registrar Queue - 8 people waiting",
      time: "5 hours ago",
      location: "Admin Building",
      priority: "medium",
      action: "Join Queue",
      icon: Users,
      status: "active",
      avatar: "👥"
    },
    {
      type: "complaint",
      title: "WiFi issues in dormitory resolved",
      time: "1 day ago",
      location: "East Campus",
      priority: "low",
      action: "View Update",
      icon: MessageCircle,
      status: "resolved",
      avatar: "📶"
    },
  ];

  const quickActions = [
    {
      name: "Report Lost Item",
      href: "/lost-found",
      icon: Search,
      gradient: "from-blue-500 to-cyan-400",
      description: "Quick report system",
      badge: "Popular"
    },
    {
      name: "Browse Events",
      href: "/events",
      icon: Calendar,
      gradient: "from-emerald-500 to-teal-400",
      description: "Discover campus events",
      badge: "New"
    },
    {
      name: "Check Queues",
      href: "/queues",
      icon: Users,
      gradient: "from-purple-500 to-pink-400",
      description: "Real-time queue status",
      badge: "Live"
    },
    {
      name: "Submit Complaint",
      href: "/complaints",
      icon: MessageCircle,
      gradient: "from-orange-500 to-red-400",
      description: "Voice your concerns",
      badge: "24/7"
    },
  ];

  const campusHighlights = [
    {
      title: "Library Extended Hours",
      description: "Open until 2 AM during finals",
      icon: BookOpen,
      color: "blue",
      time: "Until Dec 20"
    },
    {
      title: "WiFi Maintenance",
      description: "Scheduled for this weekend",
      icon: Wifi,
      color: "orange",
      time: "Dec 15-16"
    },
    {
      title: "Campus Safety Alert",
      description: "Enhanced security measures",
      icon: Shield,
      color: "green",
      time: "Active"
    }
  ];

  const priorityColors = {
    high: "bg-red-500 animate-pulse",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  const getGreeting = () => {
    const greetings = {
      morning: "Good morning",
      afternoon: "Good afternoon", 
      evening: "Good evening"
    };
    return greetings[timeOfDay];
  };

  const getGreetingEmoji = () => {
    const emojis = {
      morning: "🌅",
      afternoon: "☀️", 
      evening: "🌙"
    };
    return emojis[timeOfDay];
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Section */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full border border-white/20 shadow-lg mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-700">Campus Hub Dashboard</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </motion.div>
          
          <motion.h1 
            className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent py-1 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {getGreeting()}, Alex! {getGreetingEmoji()}
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Here's what's happening on campus today
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center gap-6 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Main Campus</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-green-700">All Systems Online</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Notification Banner */}
        <AnimatePresence>
          {showNotification && (
            <motion.div 
              className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">🎉 Welcome to Campus Hub!</h3>
                    <p className="text-blue-100">Your one-stop solution for all campus needs. Explore the features below!</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowNotification(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Stat Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {loading
            ? Array(4).fill(0).map((_, idx) => (
                <div key={idx} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
                  <LoadingSkeleton />
                </div>
              ))
            : stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.name}
                    className={`group relative overflow-hidden bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] ${stat.shadowColor}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Animated Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        stat.status === 'trending' ? 'bg-orange-100 text-orange-700' :
                        stat.status === 'active' ? 'bg-green-100 text-green-700' :
                        stat.status === 'stable' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {stat.status}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div 
                          className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="flex items-center gap-1 text-xs font-semibold">
                          <TrendingUp className="w-3 h-3 text-green-500" />
                          <span className="text-green-600">{stat.trend}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                        <p className="text-xs text-gray-400">{stat.change}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Enhanced Quick Actions */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Quick Actions
                </h2>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.name}
                      className={`group relative overflow-hidden flex items-center w-full p-4 rounded-xl bg-gradient-to-r ${action.gradient} text-white transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Icon className="w-5 h-5 mr-3 relative z-10" />
                      <div className="text-left relative z-10 flex-1">
                        <div className="font-semibold">{action.name}</div>
                        <div className="text-xs opacity-90">{action.description}</div>
                      </div>
                      {action.badge && (
                        <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-semibold relative z-10">
                          {action.badge}
                        </div>
                      )}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10" />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Recent Activity */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  Recent Activity
                </h2>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm bg-blue-50 px-4 py-2 rounded-full transition-colors hover:bg-blue-100">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {loading
                  ? Array(3).fill(0).map((_, idx) => (
                      <div key={idx} className="p-4 bg-white/40 rounded-xl backdrop-blur-sm">
                        <LoadingSkeleton />
                      </div>
                    ))
                  : recentActivity.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <motion.div
                          key={index}
                          className="group relative p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/60 transition-all duration-300 transform hover:scale-[1.01]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <div className="text-2xl">{activity.avatar}</div>
                              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${priorityColors[activity.priority]}`}></div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span className={`inline-block text-xs font-bold uppercase px-3 py-1 rounded-full border ${
                                  activity.status === 'resolved' ? 'bg-green-100 text-green-700 border-green-200' :
                                  activity.status === 'upcoming' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                  'bg-orange-100 text-orange-700 border-orange-200'
                                }`}>
                                  {activity.type.replace("-", " ")}
                                </span>
                                <motion.button 
                                  className="text-blue-600 hover:text-blue-700 font-medium text-sm bg-blue-50 px-3 py-1 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {activity.action}
                                </motion.button>
                              </div>
                              <p className="font-semibold text-gray-900 mb-1">{activity.title}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{activity.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{activity.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Campus Highlights Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          {campusHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.title}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.0 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-${highlight.color}-100`}>
                    <Icon className={`w-6 h-6 text-${highlight.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{highlight.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{highlight.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold text-${highlight.color}-600 bg-${highlight.color}-50 px-2 py-1 rounded-full`}>
                        {highlight.time}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Campus Alerts */}
        <motion.div 
          className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-8 text-white shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <motion.div 
            className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          <div className="relative">
            <div className="flex items-center mb-4">
              <motion.div 
                className="p-3 bg-white/20 rounded-xl mr-4"
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Bell className="w-6 h-6" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">Campus Updates</h3>
                <p className="text-emerald-100 text-sm">Stay informed with the latest</p>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <p className="text-sm leading-relaxed opacity-90">
                  📚 <strong>Library Extended Hours:</strong> Open until 2 AM during finals week
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <p className="text-sm leading-relaxed opacity-90">
                  🔧 <strong>WiFi Maintenance:</strong> Scheduled for this weekend - prepare for brief interruptions
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <p className="text-sm leading-relaxed opacity-90">
                  🛡️ <strong>Enhanced Security:</strong> New safety measures implemented across campus
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <motion.button 
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
              <motion.button 
                className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Acknowledge
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;