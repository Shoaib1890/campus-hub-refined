
import React, { useState } from 'react';
import { Search, Upload, Camera, MapPin, Clock, User, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LostFound = () => {
  const [activeTab, setActiveTab] = useState<'report' | 'browse'>('browse');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const categories = ['all', 'electronics', 'clothing', 'books', 'accessories', 'documents', 'other'];

  const lostItems = [
    {
      id: 1,
      title: 'iPhone 14 Pro - Space Gray',
      category: 'electronics',
      location: 'Library - 2nd Floor',
      timeFound: '2 hours ago',
      reportedBy: 'Sarah M.',
      description: 'Found near the study desks, has a clear case with university sticker',
      image: 'photo-1581090464777-f3220bbe1b8b',
      status: 'available'
    },
    {
      id: 2,
      title: 'Navy Blue Hoodie - Size M',
      category: 'clothing',
      location: 'Student Center - Cafeteria',
      timeFound: '5 hours ago',
      reportedBy: 'Mike K.',
      description: 'University logo on front, left in cafeteria booth',
      image: 'photo-1649972904349-6e44c42644a7',
      status: 'available'
    },
    {
      id: 3,
      title: 'Calculus Textbook - 8th Edition',
      category: 'books',
      location: 'Math Building - Room 201',
      timeFound: '1 day ago',
      reportedBy: 'Emma R.',
      description: 'Highlighted pages, name written inside cover',
      image: 'photo-1498050108023-c5249f4df085',
      status: 'claimed'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? lostItems 
    : lostItems.filter(item => item.category === selectedCategory);

  const handleClaimItem = (itemId: number) => {
    toast({
      title: "Claim Request Sent",
      description: "The finder has been notified. Check your email for next steps.",
    });
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Item Reported Successfully",
      description: "Your lost/found item has been added to our database.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lost & Found</h1>
        <p className="text-gray-600">Help reunite students with their belongings</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
        <button
          onClick={() => setActiveTab('browse')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'browse'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Browse Items
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'report'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Report Item
        </button>
      </div>

      {activeTab === 'browse' && (
        <div>
          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for items..."
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
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={`https://images.unsplash.com/${item.image}?w=400&h=200&fit=crop`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Tag className="w-3 h-3 mr-1" />
                      {item.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      {item.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      Found {item.timeFound}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-2" />
                      Reported by {item.reportedBy}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleClaimItem(item.id)}
                    disabled={item.status === 'claimed'}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      item.status === 'available'
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {item.status === 'available' ? 'Claim This Item' : 'Already Claimed'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'report' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Report a Lost or Found Item</h2>
          
          <form onSubmit={handleReportSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Type
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
                  <option value="">Select category</option>
                  <option value="lost">I lost something</option>
                  <option value="found">I found something</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
                  <option value="">Select category</option>
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Title
              </label>
              <input
                type="text"
                placeholder="e.g., iPhone 14 Pro, Blue Backpack, Physics Textbook"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Provide detailed description including color, brand, distinctive features..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="Where was it lost/found? (e.g., Library 2nd floor, Student Center)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photo (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Information
              </label>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Submit Report
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LostFound;
