import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


import {
  Search, MapPin, Compass, Info, X, LocateFixed, Globe,
  Navigation, Clock, Phone, Mail, Star, Heart, Share2,
  Bookmark, MoreVertical, Users, Wifi, Coffee, Car,
  Bus, Train, Bike, ArrowRight, Filter, Layers,
  Settings, Download, Calendar, Clock3, Map, 
} from 'lucide-react';

const CampusMapPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [userLocation, setUserLocation] = useState(null);

  // Dummy data for campus locations
  const campusLocations = [
    {
      id: 'library',
      name: 'Central Library',
      description: 'The main academic hub with extensive book collections, quiet study rooms, and modern computer labs.',
      address: 'Building C, Central Campus',
      category: 'Academic',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=300&fit=crop',
      features: ['Wi-Fi', 'Study Zones', 'Printing', 'Book Lending'],
      rating: 4.8,
      reviews: 156,
      distance: '0.2 km',
      openHours: '8:00 AM - 10:00 PM',
      phone: '+1 (555) 123-4567',
      email: 'library@campus.edu',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      popular: true,
      tags: ['24/7 Access', 'Group Study', 'Research']
    },
    {
      id: 'cafeteria',
      name: 'North Campus Cafeteria',
      description: 'Serving a variety of fresh and delicious meals, snacks, and beverages. A popular spot for students to dine and socialize.',
      address: 'Near Student Dorms, North Campus',
      category: 'Food & Dining',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
      features: ['Daily Specials', 'Vegetarian Options', 'Outdoor Seating'],
      rating: 4.2,
      reviews: 89,
      distance: '0.5 km',
      openHours: '7:00 AM - 8:00 PM',
      phone: '+1 (555) 123-4568',
      email: 'cafeteria@campus.edu',
      coordinates: { lat: 40.7130, lng: -74.0062 },
      popular: true,
      tags: ['Budget Friendly', 'Quick Service']
    },
    {
      id: 'admin',
      name: 'Administration Block',
      description: 'Houses the main administrative offices, including admissions, finance, and student affairs.',
      address: 'Building A, Main Entrance',
      category: 'Services',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      features: ['Admissions', 'Registrar', 'Financial Aid'],
      rating: 4.0,
      reviews: 67,
      distance: '0.1 km',
      openHours: '9:00 AM - 5:00 PM',
      phone: '+1 (555) 123-4569',
      email: 'admin@campus.edu',
      coordinates: { lat: 40.7126, lng: -74.0058 },
      popular: false,
      tags: ['Official Business', 'Documentation']
    },
    {
      id: 'sports-complex',
      name: 'Sports Complex',
      description: 'A state-of-the-art facility with a gymnasium, indoor courts for badminton and basketball, and a swimming pool.',
      address: 'South Campus',
      category: 'Recreation',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      features: ['Gym', 'Swimming Pool', 'Indoor Courts', 'Fitness Classes'],
      rating: 4.6,
      reviews: 234,
      distance: '0.8 km',
      openHours: '6:00 AM - 11:00 PM',
      phone: '+1 (555) 123-4570',
      email: 'sports@campus.edu',
      coordinates: { lat: 40.7132, lng: -74.0064 },
      popular: true,
      tags: ['Fitness', 'Sports', 'Recreation']
    },
    {
      id: 'auditorium',
      name: 'University Auditorium',
      description: 'The primary venue for major events, conferences, and cultural performances.',
      address: 'Near Main Gate',
      category: 'Events',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop',
      features: ['Large Seating Capacity', 'Sound System', 'Stage'],
      rating: 4.4,
      reviews: 123,
      distance: '0.3 km',
      openHours: 'By Appointment',
      phone: '+1 (555) 123-4571',
      email: 'auditorium@campus.edu',
      coordinates: { lat: 40.7124, lng: -74.0056 },
      popular: false,
      tags: ['Events', 'Performances', 'Conferences']
    },
    {
      id: 'health-center',
      name: 'Campus Health Center',
      description: 'Provides medical services, first aid, and counseling for students and staff.',
      address: 'Near Sports Complex',
      category: 'Health',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      features: ['Doctor on Call', 'Emergency Services', 'Counseling'],
      rating: 4.7,
      reviews: 98,
      distance: '0.7 km',
      openHours: '8:00 AM - 6:00 PM',
      phone: '+1 (555) 123-4572',
      email: 'health@campus.edu',
      coordinates: { lat: 40.7134, lng: -74.0066 },
      popular: false,
      tags: ['Medical', 'Emergency', 'Wellness']
    },
  ];

  const categories = [
    { id: 'all', name: 'All Places', icon: Map, color: 'from-blue-500 to-blue-600' },
    { id: 'academic', name: 'Academic', icon: Bookmark, color: 'from-green-500 to-green-600' },
    { id: 'food', name: 'Food & Dining', icon: Coffee, color: 'from-orange-500 to-orange-600' },
    { id: 'services', name: 'Services', icon: Settings, color: 'from-purple-500 to-purple-600' },
    { id: 'recreation', name: 'Recreation', icon: Heart, color: 'from-red-500 to-red-600' },
    { id: 'events', name: 'Events', icon: Calendar, color: 'from-pink-500 to-pink-600' },
    { id: 'health', name: 'Health', icon: Star, color: 'from-indigo-500 to-indigo-600' }
  ];

  // Filter locations based on search term and category
  const filteredLocations = campusLocations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeFilter === 'all' || location.category.toLowerCase() === activeFilter;

    return matchesSearch && matchesCategory;
  });

  const handleGetDirections = (location) => {
    setSelectedLocation(location);
    setShowDirectionsModal(true);
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  // Handle escape key to close modals
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowDirectionsModal(false);
        setSelectedLocation(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const transportModes = [
    { id: 'walk', name: 'Walk', icon: Users, time: '5 min', distance: '0.2 km' },
    { id: 'bike', name: 'Bike', icon: Bike, time: '2 min', distance: '0.2 km' },
    { id: 'bus', name: 'Bus', icon: Bus, time: '3 min', distance: '0.2 km' },
    { id: 'car', name: 'Car', icon: Car, time: '1 min', distance: '0.2 km' }
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
                Campus Navigator
              </h1>
              <p className="text-gray-600 mt-2">Find your way around the campus with ease</p>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={handleLocateMe}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LocateFixed className="w-5 h-5" />
                <span>Locate Me</span>
              </motion.button>
              <motion.button
                onClick={() => alert('Feature coming soon: View full interactive map!')}
                className="bg-white/70 backdrop-blur-md border border-white/20 text-gray-700 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-5 h-5" />
                <span>Full Map</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
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
                placeholder="Search for buildings, departments, or facilities..."
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

          {/* Category Filters */}
          <div className="flex space-x-2 bg-white/70 backdrop-blur-md p-2 rounded-2xl border border-white/20 overflow-x-auto">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap flex items-center space-x-2 ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Campus Map Overview */}
        <motion.div
          className="relative bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Campus Overview</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Layers className="w-4 h-4" />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative w-full h-auto max-h-[500px] overflow-hidden rounded-xl border border-gray-300">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=600&fit=crop"
              alt="Campus Map"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                <p className="text-sm text-gray-700 text-center">
                  Interactive campus map with real-time location tracking and navigation
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Popular Locations / Search Results */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchTerm ? 'Search Results' : 'Popular Locations'}
            </h2>
            <p className="text-gray-600">{filteredLocations.length} places found</p>
          </div>
          
          {filteredLocations.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              <AnimatePresence>
                {filteredLocations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    className={`bg-white/70 backdrop-blur-md rounded-2xl border border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    onClick={() => setSelectedLocation(location)}
                  >
                    {viewMode === 'grid' ? (
                      // Grid View
                      <div className="p-6">
                        <div className="relative mb-4">
                          <img
                            src={location.image}
                            alt={location.name}
                            className="w-full h-48 object-cover rounded-xl"
                          />
                          {location.popular && (
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              Popular
                            </div>
                          )}
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-semibold">{location.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg">{location.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${
                              categories.find(c => c.id === location.category.toLowerCase())?.color || 'from-gray-500 to-gray-600'
                            }`}>
                              {location.category}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{location.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{location.distance}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock3 className="w-4 h-4" />
                              <span>{location.openHours}</span>
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                              <Navigation className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                              <Info className="w-4 h-4" />
                            </button>
                          </div>
                          <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {location.tags && location.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {location.tags.map((tag, tagIndex) => (
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
                          <img
                            src={location.image}
                            alt={location.name}
                            className="w-20 h-20 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900 text-lg">{location.name}</h3>
                              {location.popular && (
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                  Popular
                                </div>
                              )}
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${
                                categories.find(c => c.id === location.category.toLowerCase())?.color || 'from-gray-500 to-gray-600'
                              }`}>
                                {location.category}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-1">{location.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{location.address}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock3 className="w-4 h-4" />
                                <span>{location.openHours}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span>{location.rating} ({location.reviews})</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                            <Navigation className="w-4 h-4" />
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
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No locations found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          )}
        </motion.div>

        {/* Location Detail Modal */}
        <AnimatePresence>
          {selectedLocation && (
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
                  <h2 className="text-2xl font-bold text-gray-900">Location Details</h2>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="relative mb-6">
                      <img
                        src={selectedLocation.image}
                        alt={selectedLocation.name}
                        className="w-full h-64 object-cover rounded-2xl"
                      />
                      {selectedLocation.popular && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Popular Destination
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <span className="font-semibold">{selectedLocation.rating}</span>
                          <span className="text-sm text-gray-600">({selectedLocation.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedLocation.name}</h3>
                          <p className="text-gray-600 mb-3">{selectedLocation.description}</p>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${
                              categories.find(c => c.id === selectedLocation.category.toLowerCase())?.color || 'from-gray-500 to-gray-600'
                            }`}>
                              {selectedLocation.category}
                            </span>
                            <span className="text-sm text-gray-500">{selectedLocation.distance} away</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">Address</p>
                              <p className="font-semibold text-gray-900">{selectedLocation.address}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Clock3 className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">Opening Hours</p>
                              <p className="font-semibold text-gray-900">{selectedLocation.openHours}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">Phone</p>
                              <p className="font-semibold text-gray-900">{selectedLocation.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">Email</p>
                              <p className="font-semibold text-gray-900">{selectedLocation.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {selectedLocation.features && selectedLocation.features.length > 0 && (
                      <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Available Features</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {selectedLocation.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 bg-white rounded-lg p-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                      <div className="space-y-3">
                        <button 
                          onClick={() => handleGetDirections(selectedLocation)}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                        >
                          <Navigation className="w-4 h-4" />
                          <span>Get Directions</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors">
                          <Phone className="w-4 h-4" />
                          <span>Call</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors">
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">More Actions</h4>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>Add to Favorites</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span>Share Location</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                          <Bookmark className="w-4 h-4" />
                          <span>Save for Later</span>
                        </button>
                      </div>
                    </div>
                    
                    {selectedLocation.tags && selectedLocation.tags.length > 0 && (
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedLocation.tags.map((tag, index) => (
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
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Directions Modal */}
        <AnimatePresence>
          {showDirectionsModal && selectedLocation && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDirectionsModal(false)}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white pt-2 pb-4 -mt-2 -mx-8 px-8 border-b border-gray-100 mb-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Directions to {selectedLocation.name}</h2>
                    <button
                      onClick={() => setShowDirectionsModal(false)}
                      className="p-3 hover:bg-gray-100 rounded-full transition-colors bg-gray-50"
                    >
                      <X className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Transport Options</h4>
                    <div className="space-y-3">
                      {transportModes.map((mode) => (
                        <div key={mode.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <mode.icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{mode.name}</p>
                              <p className="text-sm text-gray-500">{mode.distance}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{mode.time}</p>
                            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                              Start
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Route Preview</h4>
                    <div className="bg-white rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Your Location</span>
                      </div>
                      <div className="border-l-2 border-blue-300 ml-1.5 h-8"></div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{selectedLocation.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowDirectionsModal(false)}
                      className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                      Open in Maps
                    </button>
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

export default CampusMapPage;