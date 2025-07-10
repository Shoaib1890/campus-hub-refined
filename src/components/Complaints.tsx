import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Filter, AlertCircle, CheckCircle, Clock, 
  MessageSquare, User, Calendar, MapPin, Camera, Send,
  Trash2, Edit, Eye, ArrowRight, TrendingUp, Users,
  AlertTriangle, Zap, FileText, Star, X, Phone, Mail,
  ThumbsUp, Share2, Bookmark, MoreVertical, Bell
} from 'lucide-react';

const ComplaintsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    priority: 'medium',
    anonymous: false,
    attachments: []
  });

  const categories = [
    { id: 'maintenance', name: 'Maintenance', icon: '🔧', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
    { id: 'food', name: 'Food & Dining', icon: '🍽️', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50' },
    { id: 'transport', name: 'Transport', icon: '🚌', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50' },
    { id: 'academic', name: 'Academic', icon: '📚', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50' },
    { id: 'security', name: 'Security', icon: '🛡️', color: 'from-red-500 to-red-600', bgColor: 'bg-red-50' },
    { id: 'other', name: 'Other', icon: '📝', color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-50' }
  ];

  const complaints = [
    {
      id: 1,
      title: 'Broken AC in Library',
      description: 'The air conditioning system in the main library has been malfunctioning for the past week, making it difficult to study in the hot weather.',
      category: 'maintenance',
      status: 'in-progress',
      priority: 'high',
      date: '2024-07-08',
      location: 'Main Library',
      reporter: 'Anonymous',
      likes: 12,
      comments: 5,
      image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?w=400&h=300&fit=crop',
      progress: 65,
      assignedTo: 'Facilities Team',
      estimatedResolution: '2024-07-15'
    },
    {
      id: 2,
      title: 'Poor Food Quality in Cafeteria',
      description: 'The food served in the north cafeteria has been consistently poor quality this week with undercooked items and stale ingredients.',
      category: 'food',
      status: 'pending',
      priority: 'medium',
      date: '2024-07-09',
      location: 'North Cafeteria',
      reporter: 'John Doe',
      likes: 8,
      comments: 3,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
      progress: 0,
      assignedTo: 'Food Services',
      estimatedResolution: '2024-07-12'
    },
    {
      id: 3,
      title: 'Shuttle Bus Delays',
      description: 'The campus shuttle has been consistently late, affecting student schedules and causing delays for morning classes.',
      category: 'transport',
      status: 'resolved',
      priority: 'medium',
      date: '2024-07-07',
      location: 'Main Gate',
      reporter: 'Sarah Wilson',
      likes: 15,
      comments: 7,
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop&auto=format',
      progress: 100,
      assignedTo: 'Transport Department',
      resolvedDate: '2024-07-10'
    },
    {
      id: 4,
      title: 'WiFi Connectivity Issues',
      description: 'Intermittent WiFi connectivity in the computer lab affecting online classes and research work.',
      category: 'academic',
      status: 'in-progress',
      priority: 'high',
      date: '2024-07-10',
      location: 'Computer Lab B',
      reporter: 'Mike Chen',
      likes: 23,
      comments: 12,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      progress: 40,
      assignedTo: 'IT Department',
      estimatedResolution: '2024-07-13'
    }
  ];

  const stats = [
    { label: 'Total Complaints', value: '156', trend: '+12%', icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Resolved', value: '124', trend: '+8%', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'In Progress', value: '23', trend: '+5%', icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { label: 'Pending', value: '9', trend: '-2%', icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-50' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'in-progress': return 'bg-gradient-to-r from-orange-500 to-amber-500';
      case 'pending': return 'bg-gradient-to-r from-red-500 to-pink-500';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'medium': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'low': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500';
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || complaint.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    console.log('New complaint:', newComplaint);
    setShowNewComplaint(false);
    setNewComplaint({
      title: '',
      description: '',
      category: '',
      location: '',
      priority: 'medium',
      anonymous: false,
      attachments: []
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Complaints Portal
              </h1>
              <p className="text-gray-600 mt-2">Report issues and track resolution progress</p>
            </div>
            <motion.button
              onClick={() => setShowNewComplaint(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              <span>New Complaint</span>
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 hover:bg-white/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-xs font-semibold ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search complaints..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-white/70 backdrop-blur-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <motion.button
                className="px-6 py-3 bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl font-semibold text-gray-700 hover:bg-white/80 transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </motion.button>
              <motion.button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-4 py-3 bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl font-semibold text-gray-700 hover:bg-white/80 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {viewMode === 'grid' ? '📋' : '🔲'}
              </motion.button>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex space-x-2 bg-white/70 backdrop-blur-md p-2 rounded-2xl border border-white/20">
            {['all', 'pending', 'in-progress', 'resolved'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Complaints Grid/List */}
        <motion.div
          className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence>
            {filteredComplaints.map((complaint, index) => (
              <motion.div
                key={complaint.id}
                className={`bg-white/70 backdrop-blur-md rounded-2xl border border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => setSelectedComplaint(complaint)}
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{categories.find(c => c.id === complaint.category)?.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 line-clamp-1">{complaint.title}</h3>
                          <p className="text-sm text-gray-500">{complaint.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority}
                        </span>
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{complaint.description}</p>
                    
                    {complaint.image && (
                      <div className="mb-4 rounded-xl overflow-hidden">
                        <img src={complaint.image} alt={complaint.title} className="w-full h-32 object-cover" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{complaint.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{complaint.reporter}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1 text-gray-500">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{complaint.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1 text-gray-500">
                          <MessageSquare className="w-4 h-4" />
                          <span>{complaint.comments}</span>
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(complaint.status)}`}>
                        {complaint.status.replace('-', ' ')}
                      </span>
                    </div>
                    
                    {complaint.status === 'in-progress' && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{complaint.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${complaint.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // List View
                  <div className="flex w-full p-6">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{categories.find(c => c.id === complaint.category)?.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
                            <p className="text-sm text-gray-500">{complaint.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getPriorityColor(complaint.priority)}`}>
                            {complaint.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(complaint.status)}`}>
                            {complaint.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{complaint.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{complaint.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{complaint.reporter}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{complaint.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{complaint.comments}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* New Complaint Modal */}
        <AnimatePresence>
          {showNewComplaint && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Submit New Complaint</h2>
                  <button
                    onClick={() => setShowNewComplaint(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmitComplaint} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      value={newComplaint.title}
                      onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      value={newComplaint.description}
                      onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        value={newComplaint.category}
                        onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        value={newComplaint.priority}
                        onChange={(e) => setNewComplaint({...newComplaint, priority: e.target.value})}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      value={newComplaint.location}
                      onChange={(e) => setNewComplaint({...newComplaint, location: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={newComplaint.anonymous}
                      onChange={(e) => setNewComplaint({...newComplaint, anonymous: e.target.checked})}
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-700">Submit anonymously</label>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowNewComplaint(false)}
                      className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Submit Complaint
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Complaint Detail Modal */}
        <AnimatePresence>
          {selectedComplaint && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Complaint Details</h2>
                  <button
                    onClick={() => setSelectedComplaint(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{categories.find(c => c.id === selectedComplaint.category)?.icon}</span>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{selectedComplaint.title}</h3>
                            <p className="text-gray-600">{selectedComplaint.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getPriorityColor(selectedComplaint.priority)}`}>
                            {selectedComplaint.priority}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getStatusColor(selectedComplaint.status)}`}>
                            {selectedComplaint.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{selectedComplaint.description}</p>
                      
                      {selectedComplaint.image && (
                        <div className="rounded-xl overflow-hidden mb-4">
                          <img src={selectedComplaint.image} alt={selectedComplaint.title} className="w-full h-48 object-cover" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Reported on {selectedComplaint.date}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>By {selectedComplaint.reporter}</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{selectedComplaint.likes} likes</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{selectedComplaint.comments} comments</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Section */}
                    {selectedComplaint.status === 'in-progress' && (
                      <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Resolution Progress</h4>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progress</span>
                            <span>{selectedComplaint.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${selectedComplaint.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Assigned to</p>
                            <p className="font-semibold text-gray-900">{selectedComplaint.assignedTo}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Estimated resolution</p>
                            <p className="font-semibold text-gray-900">{selectedComplaint.estimatedResolution}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          <span>Add Comment</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Like</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                          <Bookmark className="w-4 h-4" />
                          <span>Bookmark</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">support@campus.edu</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Support Office, Building A</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ComplaintsPage;