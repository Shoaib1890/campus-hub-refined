import React, { useState } from "react";
import { Search, Upload, Camera, MapPin, Clock, User, Tag, Eye, Heart, Filter, ArrowRight, Sparkles, CheckCircle, AlertCircle } from "lucide-react";

const LostFound = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: "all", name: "All Items", icon: "🔍", color: "from-gray-500 to-gray-600" },
    { id: "electronics", name: "Electronics", icon: "📱", color: "from-blue-500 to-blue-600" },
    { id: "clothing", name: "Clothing", icon: "👕", color: "from-purple-500 to-purple-600" },
    { id: "books", name: "Books", icon: "📚", color: "from-yellow-500 to-yellow-600" },
    { id: "accessories", name: "Accessories", icon: "🎒", color: "from-pink-500 to-pink-600" },
    { id: "documents", name: "Documents", icon: "📄", color: "from-emerald-500 to-emerald-600" },
    { id: "other", name: "Other", icon: "🔮", color: "from-orange-500 to-orange-600" },
  ];

  const categoryColors = {
    electronics: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-200",
    clothing: "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-200",
    books: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-200",
    accessories: "bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 border-pink-200",
    documents: "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-200",
    other: "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-200",
  };

  const [lostItems, setLostItems] = useState([
    {
      id: 1,
      title: "iPhone 14 Pro - Space Gray",
      category: "electronics",
      location: "Library - 2nd Floor",
      timeFound: "2 hours ago",
      reportedBy: "Sarah M.",
      description: "Found near the study desks, has a clear case with university sticker",
      image: "/Lostandfound/iphone.jpg",
      status: "available",
      views: 23,
      priority: "high"
    },
    {
      id: 2,
      title: "Navy Blue Hoodie - Size M",
      category: "clothing",
      location: "Student Center - Cafeteria",
      timeFound: "5 hours ago",
      reportedBy: "Mike K.",
      description: "University logo on front, left in cafeteria booth",
      image: "/Lostandfound/hoodie.jpg",
      status: "available",
      views: 12,
      priority: "medium"
    },
    {
      id: 3,
      title: "Calculus Textbook - 8th Edition",
      category: "books",
      location: "Math Building - Room 201",
      timeFound: "1 day ago",
      reportedBy: "Emma R.",
      description: "Highlighted pages, name written inside cover",
      image: "/Lostandfound/Calculus.jpg",
      status: "claimed",
      views: 45,
      priority: "low"
    },
    {
      id: 4,
      title: "Black Backpack - Lenovo Logo",
      category: "accessories",
      location: "Bus Stop near Gate 3",
      timeFound: "3 hours ago",
      reportedBy: "Aman V.",
      description: "Contains notebooks, a water bottle, and a pencil case",
      image: "/Lostandfound/Bag.jpg",
      status: "available",
      views: 18,
      priority: "high"
    },
    {
      id: 5,
      title: "Student ID Card - Nishant R.",
      category: "documents",
      location: "Outside Admin Block",
      timeFound: "4 hours ago",
      reportedBy: "Anjali S.",
      description: "Blue lanyard, visible name tag",
      image: "/Lostandfound/IDcard.jpg",
      status: "available",
      views: 8,
      priority: "high"
    },
    {
      id: 6,
      title: "Casio FX‑991EX Calculator",
      category: "electronics",
      location: "Exam Hall - Block B",
      timeFound: "30 minutes ago",
      reportedBy: "Deepak T.",
      description: "Black color, has a sticker with name 'Ravi'",
      image: "/Lostandfound/calculator.jpg",
      status: "available",
      views: 5,
      priority: "medium"
    }
  ]);

  const filteredItems = lostItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleClaimItem = (itemId) => {
    setLostItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, status: "claimed" } : item
      )
    );
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const availableItems = lostItems.filter(item => item.status === 'available').length;
  const claimedItems = lostItems.filter(item => item.status === 'claimed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-white mr-2" />
              <span className="text-white font-medium">Smart Lost & Found System</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Reunite with Your
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent block">
                Lost Items
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Advanced AI-powered matching system to help students find their belongings faster than ever
            </p>
            
            {/* Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{availableItems}</div>
                <div className="text-white/80">Available Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{claimedItems}</div>
                <div className="text-white/80">Successfully Claimed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-white/80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg border border-white/20">
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "browse"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
              }`}
            >
              🔍 Browse Items
            </button>
            <button
              onClick={() => setActiveTab("report")}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "report"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
              }`}
            >
              📝 Report Item
            </button>
          </div>
        </div>

        {activeTab === "browse" && (
          <div className="space-y-8">
            {/* Enhanced Search and Filters */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search for items, location, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
                  />
                </div>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-4 rounded-2xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </button>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-3 mt-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                        : "bg-white/60 text-gray-600 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'slideUp 0.6s ease-out forwards'
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Priority Indicator */}
                    <div className={`absolute top-4 left-4 w-3 h-3 rounded-full ${getPriorityColor(item.priority)} shadow-lg`}></div>
                    
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === "available"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}>
                      {item.status === "available" ? "🟢 Available" : "🔴 Claimed"}
                    </div>

                    {/* Views Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{item.views}</span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                        categoryColors[item.category] || "bg-gray-100 text-gray-800"
                      }`}>
                        <Tag className="w-3 h-3 mr-1" />
                        {item.category}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-3 text-indigo-500" />
                        <span className="font-medium">{item.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-3 text-indigo-500" />
                        <span>Found {item.timeFound}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-3 text-indigo-500" />
                        <span>By {item.reportedBy}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleClaimItem(item.id)}
                      disabled={item.status === "claimed"}
                      className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${
                        item.status === "available"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {item.status === "available" ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Claim This Item</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5" />
                          <span>Already Claimed</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "report" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-semibold mb-4">
                <Camera className="w-5 h-5 mr-2" />
                Report Lost/Found Item
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Help Others Find Their Items
              </h2>
              <p className="text-gray-600">
                Every report helps reunite someone with their belongings
              </p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    🔍 Item Type
                  </label>
                  <select className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg">
                    <option value="">Select type</option>
                    <option value="lost">🔍 I lost something</option>
                    <option value="found">🎯 I found something</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    📂 Category
                  </label>
                  <select className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg">
                    <option value="">Select category</option>
                    {categories.slice(1).map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  📝 Item Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., iPhone 14 Pro, Blue Backpack, Physics Textbook"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  📋 Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide detailed description including color, brand, distinctive features..."
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  📍 Location
                </label>
                <input
                  type="text"
                  placeholder="Where was it lost/found? (e.g., Library 2nd floor, Student Center)"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
                />
              </div>

              {/* Enhanced File Upload */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  📷 Upload Photo
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-300 rounded-2xl cursor-pointer bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 text-indigo-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <p className="text-lg font-semibold text-indigo-600 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  ✉️ Contact Information
                </label>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg flex items-center justify-center space-x-3"
              >
                <Sparkles className="w-6 h-6" />
                <span>Submit Report</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
};

export default LostFound;