
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, Menu, Settings, User, Home, Search, Calendar, MessageCircle, Map, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Lost & Found', href: '/lost-found', icon: Search },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Queues', href: '/queues', icon: Users },
    { name: 'Complaints', href: '/complaints', icon: MessageCircle },
    { name: 'Contacts', href: '/contacts', icon: User },
    { name: 'Map', href: '/map', icon: Map },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header */}
      {!isMobile && (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-bold text-gray-900">CampusConnect</h1>
                </div>
                <nav className="ml-10 flex space-x-8">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? 'text-green-600 bg-green-50'
                            : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors">
                  <Settings className="w-6 h-6" />
                </button>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={isMobile ? 'pb-16' : ''}>
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="grid grid-cols-4 gap-1">
            {navigation.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex flex-col items-center py-2 px-1 text-xs transition-colors ${
                    isActive
                      ? 'text-green-600'
                      : 'text-gray-600'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
