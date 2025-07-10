import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Filter, MessageSquare, User, Phone, Mail,
  MapPin, Building, Briefcase, Users, ArrowRight, X, UserPlus,
  Star, MoreVertical, Video, Calendar, Clock, Globe, Linkedin,
  Twitter, Instagram, Facebook, Heart, Edit, Trash2, Copy,
  Share2, Bookmark, Bell, Zap, Crown, Shield, Award
} from 'lucide-react';

const ContactsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showNewContact, setShowNewContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [newContact, setNewContact] = useState({
    name: '',
    title: '',
    organization: '',
    phone: '',
    email: '',
    location: '',
    type: 'personal',
    isFavorite: false,
    social: {
      linkedin: '',
      twitter: '',
      instagram: ''
    }
  });

  const contacts = [
    {
      id: 1,
      name: 'Alice Johnson',
      title: 'Head of Maintenance',
      organization: 'Campus Facilities',
      phone: '+91 98765 43210',
      email: 'alice.johnson@example.com',
      location: 'Facilities Office, Block A',
      type: 'team',
      isFavorite: true,
      avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=AJ&backgroundColor=3b82f6',
      status: 'online',
      lastContact: '2 hours ago',
      social: {
        linkedin: 'alice-johnson',
        twitter: '@alicej',
        instagram: '@alice.j'
      },
      tags: ['Emergency', '24/7 Support'],
      availability: 'Mon-Fri, 9AM-6PM'
    },
    {
      id: 2,
      name: 'Bob Williams',
      title: 'Cafeteria Manager',
      organization: 'Food Services Inc.',
      phone: '+91 87654 32109',
      email: 'bob.williams@example.com',
      location: 'North Cafeteria Kitchen',
      type: 'vendor',
      isFavorite: false,
      avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=BW&backgroundColor=f59e0b',
      status: 'offline',
      lastContact: '1 day ago',
      social: {
        linkedin: 'bob-williams',
        twitter: '@bobw',
        instagram: '@bob.w'
      },
      tags: ['Food Quality', 'Menu Planning'],
      availability: 'Mon-Sat, 7AM-8PM'
    },
    {
      id: 3,
      name: 'Charlie Brown',
      title: 'Transport Coordinator',
      organization: 'Campus Transport',
      phone: '+91 76543 21098',
      email: 'charlie.brown@example.com',
      location: 'Transport Department',
      type: 'team',
      isFavorite: true,
      avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=CB&backgroundColor=8b5cf6',
      status: 'online',
      lastContact: '30 minutes ago',
      social: {
        linkedin: 'charlie-brown',
        twitter: '@charlieb',
        instagram: '@charlie.b'
      },
      tags: ['Shuttle Service', 'Route Planning'],
      availability: 'Mon-Fri, 6AM-10PM'
    },
    {
      id: 4,
      name: 'Diana Prince',
      title: 'Security Head',
      organization: 'Campus Security',
      phone: '+91 65432 10987',
      email: 'diana.p@example.com',
      location: 'Main Security Office',
      type: 'team',
      isFavorite: false,
      avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=DP&backgroundColor=ef4444',
      status: 'busy',
      lastContact: '3 hours ago',
      social: {
        linkedin: 'diana-prince',
        twitter: '@dianap',
        instagram: '@diana.p'
      },
      tags: ['Emergency Response', 'Safety'],
      availability: '24/7'
    },
    {
      id: 5,
      name: 'Eve Adams',
      title: 'Librarian',
      organization: 'Central Library',
      phone: '+91 54321 09876',
      email: 'eve.adams@example.com',
      location: 'Central Library Front Desk',
      type: 'team',
      isFavorite: false,
      avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=EA&backgroundColor=10b981',
      status: 'online',
      lastContact: '1 hour ago',
      social: {
        linkedin: 'eve-adams',
        twitter: '@evea',
        instagram: '@eve.a'
      },
      tags: ['Research Support', 'Book Management'],
      availability: 'Mon-Sun, 8AM-10PM'
    },
    {
      id: 6,
      name: 'Frank Miller',
      title: 'IT Support Specialist',
      organization: 'Campus IT',
      phone: '+91 43210 98765',
      email: 'frank.miller@example.com',
      location: 'IT Support Center',
      type: 'team',
      isFavorite: true,
      avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=FM&backgroundColor=06b6d4',
      status: 'online',
      lastContact: '15 minutes ago',
      social: {
        linkedin: 'frank-miller',
        twitter: '@frankm',
        instagram: '@frank.m'
      },
      tags: ['Technical Support', 'WiFi Issues'],
      availability: 'Mon-Fri, 8AM-6PM'
    }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'favorite' && contact.isFavorite) ||
      contact.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleAddContact = (e) => {
    e.preventDefault();
    console.log('New contact:', newContact);
    setShowNewContact(false);
    setNewContact({
      name: '',
      title: '',
      organization: '',
      phone: '',
      email: '',
      location: '',
      type: 'personal',
      isFavorite: false,
      social: {
        linkedin: '',
        twitter: '',
        instagram: ''
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'team': return 'from-blue-500 to-blue-600';
      case 'vendor': return 'from-orange-500 to-orange-600';
      case 'personal': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const stats = [
    { label: 'Total Contacts', value: '156', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Team Members', value: '89', icon: Shield, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Vendors', value: '45', icon: Building, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { label: 'Favorites', value: '22', icon: Heart, color: 'text-red-600', bgColor: 'bg-red-50' }
  ];

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
                Contacts Directory
              </h1>
              <p className="text-gray-600 mt-2">Quick access to important contacts and team members</p>
            </div>
            <motion.button
              onClick={() => setShowNewContact(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserPlus className="w-5 h-5" />
              <span>Add Contact</span>
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
                placeholder="Search contacts by name, organization, or title..."
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

          {/* Type Filters */}
          <div className="flex space-x-2 bg-white/70 backdrop-blur-md p-2 rounded-2xl border border-white/20">
            {['all', 'team', 'vendor', 'favorite'].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Contacts Grid/List */}
        <motion.div
          className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence>
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                className={`bg-white/70 backdrop-blur-md rounded-2xl border border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => setSelectedContact(contact)}
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}></div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          <p className="text-sm text-gray-500">{contact.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {contact.isFavorite && (
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getTypeColor(contact.type)}`}>
                          {contact.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Building className="w-4 h-4" />
                        <span className="truncate">{contact.organization}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{contact.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{contact.lastContact}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(contact.status)}`}></span>
                        <span className="capitalize">{contact.status}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                          <Video className="w-4 h-4" />
                        </button>
                      </div>
                      <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {contact.tags && contact.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {contact.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // List View
                  <div className="flex w-full p-6">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="relative">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          {contact.isFavorite && (
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getTypeColor(contact.type)}`}>
                            {contact.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{contact.title} at {contact.organization}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{contact.location}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{contact.lastContact}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span className={`w-2 h-2 rounded-full ${getStatusColor(contact.status)}`}></span>
                            <span className="capitalize">{contact.status}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* New Contact Modal */}
        <AnimatePresence>
          {showNewContact && (
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
                  <h2 className="text-2xl font-bold text-gray-900">Add New Contact</h2>
                  <button
                    onClick={() => setShowNewContact(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleAddContact} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        value={newContact.name}
                        onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        value={newContact.title}
                        onChange={(e) => setNewContact({...newContact, title: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      value={newContact.organization}
                      onChange={(e) => setNewContact({...newContact, organization: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        value={newContact.email}
                        onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      value={newContact.location}
                      onChange={(e) => setNewContact({...newContact, location: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Type</label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      value={newContact.type}
                      onChange={(e) => setNewContact({...newContact, type: e.target.value})}
                    >
                      <option value="personal">Personal</option>
                      <option value="team">Team Member</option>
                      <option value="vendor">Vendor</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="favorite"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={newContact.isFavorite}
                      onChange={(e) => setNewContact({...newContact, isFavorite: e.target.checked})}
                    />
                    <label htmlFor="favorite" className="text-sm text-gray-700">Add to favorites</label>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowNewContact(false)}
                      className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Add Contact
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Detail Modal */}
        <AnimatePresence>
          {selectedContact && (
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
                  <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="relative">
                          <img
                            src={selectedContact.avatar}
                            alt={selectedContact.name}
                            className="w-20 h-20 rounded-2xl object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-3 border-white ${getStatusColor(selectedContact.status)}`}></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900">{selectedContact.name}</h3>
                            {selectedContact.isFavorite && (
                              <Heart className="w-6 h-6 text-red-500 fill-current" />
                            )}
                          </div>
                          <p className="text-lg text-gray-600 mb-1">{selectedContact.title}</p>
                          <p className="text-gray-500 mb-2">{selectedContact.organization}</p>
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getTypeColor(selectedContact.type)}`}>
                              {selectedContact.type}
                            </span>
                            <span className="flex items-center space-x-1 text-sm text-gray-600">
                              <span className={`w-2 h-2 rounded-full ${getStatusColor(selectedContact.status)}`}></span>
                              <span className="capitalize">{selectedContact.status}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">Phone</p>
                              <p className="font-semibold text-gray-900">{selectedContact.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">Email</p>
                              <p className="font-semibold text-gray-900">{selectedContact.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">Location</p>
                              <p className="font-semibold text-gray-900">{selectedContact.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">Last Contact</p>
                              <p className="font-semibold text-gray-900">{selectedContact.lastContact}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {selectedContact.tags && selectedContact.tags.length > 0 && (
                        <div className="mt-6">
                          <p className="text-sm text-gray-600 mb-2">Tags</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedContact.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedContact.availability && (
                        <div className="mt-6">
                          <p className="text-sm text-gray-600 mb-2">Availability</p>
                          <p className="font-semibold text-gray-900">{selectedContact.availability}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                          <Phone className="w-4 h-4" />
                          <span>Call</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          <span>Message</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors">
                          <Video className="w-4 h-4" />
                          <span>Video Call</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Social Media</h4>
                      <div className="space-y-3">
                        {selectedContact.social.linkedin && (
                          <a href={`https://linkedin.com/in/${selectedContact.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors">
                            <Linkedin className="w-4 h-4" />
                            <span>LinkedIn</span>
                          </a>
                        )}
                        {selectedContact.social.twitter && (
                          <a href={`https://twitter.com/${selectedContact.social.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-3 bg-sky-50 text-sky-700 rounded-xl hover:bg-sky-100 transition-colors">
                            <Twitter className="w-4 h-4" />
                            <span>Twitter</span>
                          </a>
                        )}
                        {selectedContact.social.instagram && (
                          <a href={`https://instagram.com/${selectedContact.social.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 p-3 bg-pink-50 text-pink-700 rounded-xl hover:bg-pink-100 transition-colors">
                            <Instagram className="w-4 h-4" />
                            <span>Instagram</span>
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">More Actions</h4>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                          <Edit className="w-4 h-4" />
                          <span>Edit Contact</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                          <Copy className="w-4 h-4" />
                          <span>Copy Details</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span>Share Contact</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors">
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Contact</span>
                        </button>
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

export default ContactsPage;