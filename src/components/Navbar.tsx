import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, User, Briefcase, Users, Bell } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user } = useUser();

  const role = user?.role ?? null;
  const navItems = (() => {
    if (role === 'worker') {
      return [
        { path: '/dashboard', icon: TrendingUp, label: 'Dashboard' },
        { path: '/jobs', icon: Users, label: 'Jobs' },
        { path: '/ventures', icon: Briefcase, label: 'Ventures' },
      ];
    }
    if (role === 'entrepreneur') {
      return [
        { path: '/dashboard', icon: TrendingUp, label: 'Dashboard' },
        { path: '/ventures', icon: Briefcase, label: 'Ventures' },
      ];
    }
    // investor or unauthenticated default
    return [
      { path: '/dashboard', icon: TrendingUp, label: 'Dashboard' },
      { path: '/jobs', icon: Users, label: 'Jobs' },
      { path: '/ventures', icon: Briefcase, label: 'Ventures' },
    ];
  })();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-800">LinkLift</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 inline-block mr-2" />
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/profile?tab=notifications" className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg">
              <Bell className="w-5 h-5" />
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-2 p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              {user && <span className="text-sm font-medium">{user.name}</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;