import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Bell, Menu, Settings, User, Home, Search, Calendar, MessageCircle, 
  Map, Users, X, ChevronDown, Sparkles, Activity, Shield
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);

  // Enhanced navigation with better UX
  const mainNav = [
    { name: 'Dashboard', href: '/', icon: Home, badge: null, description: 'Your personal hub' },
    { name: 'Lost & Found', href: '/lost-found', icon: Search, badge: '3', description: 'Find your items' },
    { name: 'Events', href: '/events', icon: Calendar, badge: null, description: 'Campus happenings' },
    { name: 'Queues', href: '/queues', icon: Users, badge: 'Live', description: 'Real-time queues' },
  ];

  const moreNav = [
    { name: 'Complaints', href: '/complaints', icon: MessageCircle, badge: null, description: 'Report issues' },
    { name: 'Contacts', href: '/contacts', icon: User, badge: null, description: 'Campus directory' },
    { name: 'Map', href: '/map', icon: Map, badge: null, description: 'Navigate campus' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active tab when location changes
  useEffect(() => {
    setActiveTab(location.pathname);
    setIsMoreMenuOpen(false);
  }, [location.pathname]);

  const NavItem = ({ item, isActive, className = "" }) => {
    const Icon = item.icon;
    return (
      <motion.div
        className={`relative ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          to={item.href}
          className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden ${
            isActive
              ? 'text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25'
              : 'text-gray-600 hover:text-green-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50'
          }`}
        >
          <Icon className="w-4 h-4 mr-2.5 relative z-10" />
          <span className="relative z-10">{item.name}</span>
          {item.badge && (
            <motion.span
              className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${
                isActive
                  ? 'bg-white/20 text-white'
                  : item.badge === 'Live'
                  ? 'bg-red-100 text-red-600 animate-pulse'
                  : 'bg-green-100 text-green-600'
              }`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {item.badge}
            </motion.span>
          )}
          
          {/* Hover effect background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            layoutId={`nav-bg-${item.name}`}
          />
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      {/* Desktop Header */}
      {!isMobile && (
        <motion.header
          className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled 
              ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' 
              : 'bg-white/95 backdrop-blur-sm border-b border-gray-200/30'
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo with enhanced design */}
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="relative">
                  <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
                    CampusConnect
                  </h1>
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-green-400" />
                  </motion.div>
                </div>
                
                <div className="ml-3 px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                  <span className="text-xs font-bold text-green-700 flex items-center">
                    <Activity className="w-3 h-3 mr-1" />
                    LIVE
                  </span>
                </div>
              </motion.div>

              {/* Enhanced Navigation */}
              <nav className="ml-10 flex items-center space-x-2">
                {mainNav.map((item) => {
                  const isActive = activeTab === item.href;
                  return (
                    <NavItem key={item.name} item={item} isActive={isActive} />
                  );
                })}

                {/* Enhanced More Dropdown */}
                <div className="relative">
                  <motion.button
                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                      isMoreMenuOpen
                        ? 'text-green-600 bg-gradient-to-r from-green-50 to-emerald-50'
                        : 'text-gray-600 hover:text-green-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Menu className="w-4 h-4 mr-2" />
                    More
                    <motion.div
                      animate={{ rotate: isMoreMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isMoreMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden"
                      >
                        <div className="p-2">
                          {moreNav.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.href;
                            return (
                              <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center px-4 py-3 text-sm rounded-xl transition-all duration-200 group ${
                                  isActive
                                    ? 'text-green-600 bg-gradient-to-r from-green-50 to-emerald-50'
                                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-600'
                                }`}
                                onClick={() => setIsMoreMenuOpen(false)}
                              >
                                <Icon className="w-4 h-4 mr-3" />
                                <div className="flex-1">
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-xs text-gray-500 group-hover:text-green-500">
                                    {item.description}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              {/* Enhanced Right Section */}
              <div className="flex items-center space-x-3">
                <motion.button
                  className="relative p-2.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="w-5 h-5" />
                  <motion.span
                    className="absolute -top-1 -right-1 flex h-5 w-5"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-r from-red-500 to-red-600 items-center justify-center">
                      <span className="text-[10px] font-bold text-white">3</span>
                    </span>
                  </motion.span>
                </motion.button>

                <motion.button
                  className="p-2.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 transition-all duration-200"
                  whileHover={{ scale: 1.05, rotate: 45 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="w-5 h-5" />
                </motion.button>

                <motion.div
                  className="w-9 h-9 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.header>
      )}

      {/* Enhanced Main Content */}
      <motion.main
        className={`${isMobile ? 'pb-20' : ''} relative`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.main>

      {/* Enhanced Mobile Bottom Navigation */}
      {isMobile && (
        <motion.nav
          className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 z-50 shadow-2xl"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="safe-area-inset-bottom">
            <div className="grid grid-cols-4 gap-1 px-2 py-2">
              {[...mainNav.slice(0, 3), moreNav[0]].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.href;
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.href}
                      className={`flex flex-col items-center py-2 px-2 text-xs rounded-xl transition-all duration-300 relative ${
                        isActive
                          ? 'text-green-600 font-semibold bg-gradient-to-b from-green-50 to-emerald-50'
                          : 'text-gray-600 hover:text-green-600'
                      }`}
                    >
                      <div className="relative">
                        <Icon className="w-6 h-6 mb-1" />
                        {item.badge && (
                          <motion.span
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {item.badge === 'Live' ? '•' : item.badge}
                          </motion.span>
                        )}
                      </div>
                      <span className="truncate text-center">{item.name}</span>
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"
                          layoutId="mobile-active-indicator"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}

      {/* Click outside to close more menu */}
      {isMoreMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;