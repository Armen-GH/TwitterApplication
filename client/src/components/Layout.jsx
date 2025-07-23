import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  Bookmark, 
  User, 
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useApp();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Explore', href: '/search', icon: Search },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Messages', href: '/messages', icon: Mail },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
    { name: 'Profile', href: `/profile/${user.username}`, icon: User },
    { name: 'More', href: '/more', icon: MoreHorizontal },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto flex">
        {/* Sidebar */}
        <div className="w-64 fixed h-full border-r border-gray-800 p-4">
          {/* Logo */}
          <div className="mb-8">
            <Link to="/" className="text-3xl font-bold text-blue-400 font-serif">
              Twitter
            </Link>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-full text-xl transition-colors ${
                    isActive(item.href)
                      ? 'font-bold'
                      : 'hover:bg-gray-900'
                  }`}
                >
                  <Icon size={26} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Tweet Button */}
          <button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors">
            Tweet
          </button>

          {/* User Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <Link
              to={`/profile/${user.username}`}
              className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-900 transition-colors"
            >
              <img
                src={user.avatar}
                alt={user.displayName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate">{user.displayName}</p>
                <p className="text-gray-500 text-sm truncate">@{user.username}</p>
              </div>
              <MoreHorizontal size={20} className="text-gray-500" />
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <div className="flex">
            {/* Primary Column */}
            <div className="flex-1 max-w-2xl border-r border-gray-800">
              {children}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
