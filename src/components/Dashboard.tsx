
import React from 'react';
import { Search, Calendar, Users, MessageCircle, TrendingUp, Clock, MapPin, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { name: 'Lost Items', value: '12', change: '+3 today', icon: Search, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Upcoming Events', value: '8', change: '2 this week', icon: Calendar, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Active Queues', value: '5', change: 'Avg 15min wait', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'New Complaints', value: '3', change: 'Pending review', icon: MessageCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const recentActivity = [
    { type: 'lost-item', title: 'iPhone 14 Pro found near Library', time: '2 hours ago', action: 'View Details' },
    { type: 'event', title: 'Tech Talk: AI in Education', time: '3 hours ago', action: 'RSVP' },
    { type: 'queue', title: 'Registrar Queue - 8 people waiting', time: '5 hours ago', action: 'Join Queue' },
    { type: 'complaint', title: 'WiFi issues in dormitory resolved', time: '1 day ago', action: 'View Update' },
  ];

  const quickActions = [
    { name: 'Report Lost Item', href: '/lost-found', icon: Search, color: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'Browse Events', href: '/events', icon: Calendar, color: 'bg-green-500 hover:bg-green-600' },
    { name: 'Check Queues', href: '/queues', icon: Users, color: 'bg-purple-500 hover:bg-purple-600' },
    { name: 'Submit Complaint', href: '/complaints', icon: MessageCircle, color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex!</h1>
        <p className="text-gray-600">Here's what's happening on campus today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.name}
                    to={action.href}
                    className={`flex items-center w-full p-3 rounded-lg text-white transition-colors ${action.color}`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{action.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                    {activity.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Campus Alerts */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center mb-2">
          <Bell className="w-5 h-5 mr-2" />
          <h3 className="font-semibold">Campus Alert</h3>
        </div>
        <p className="mb-4">Library hours extended until 2 AM during finals week. WiFi maintenance scheduled for this weekend.</p>
        <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
