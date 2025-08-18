import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Shield, Bell, Globe, Camera, Check, Star, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    investmentAlerts: true,
    communityMessages: false,
    monthlyReports: true
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Please sign in to continue</h2>
        </div>
      </div>
    );
  }

  const achievements = [
    {
      id: 1,
      title: 'First Investment',
      description: 'Made your first community investment',
      icon: '🎯',
      completed: true,
      date: '2024-01-05'
    },
    {
      id: 2,
      title: 'Community Helper',
      description: 'Helped 10+ community members',
      icon: '🤝',
      completed: true,
      date: '2024-01-10'
    },
    {
      id: 3,
      title: 'Rising Investor',
      description: 'Invested in 5+ ventures',
      icon: '📈',
      completed: false,
      progress: 60
    },
    {
      id: 4,
      title: 'Mentor',
      description: 'Mentored new entrepreneurs',
      icon: '👨‍🏫',
      completed: false,
      progress: 30
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'investor': return 'from-blue-500 to-blue-600';
      case 'entrepreneur': return 'from-green-500 to-green-600';
      case 'worker': return 'from-yellow-500 to-yellow-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-sm p-8 rounded-xl border border-slate-200/50 shadow-sm mb-8"
      >
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className={`w-24 h-24 bg-gradient-to-br ${getRoleColor(user.role!)} rounded-full flex items-center justify-center`}>
              <User className="w-12 h-12 text-white" />
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
            {user.verified && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{user.name}</h1>
            <p className="text-slate-600 mb-4">{user.email}</p>
            <div className="flex items-center space-x-4">
              <span className={`px-4 py-2 bg-gradient-to-r ${getRoleColor(user.role!)} text-white rounded-full text-sm font-medium capitalize`}>
                {user.role}
              </span>
              {user.verified ? (
                <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  <span>Verified</span>
                </span>
              ) : (
                <button className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium hover:bg-yellow-200 transition-colors">
                  <Shield className="w-4 h-4" />
                  <span>Verify Account</span>
                </button>
              )}
              <div className="flex items-center space-x-1 text-slate-600">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.8 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm text-center"
        >
          <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
          <div className="text-slate-600">Active Investments</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm text-center"
        >
          <div className="text-3xl font-bold text-green-600 mb-2">$2,340</div>
          <div className="text-slate-600">Total Invested</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm text-center"
        >
          <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
          <div className="text-slate-600">Community Rank</div>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/70 backdrop-blur-sm p-1 rounded-xl border border-slate-200/50 shadow-sm mb-8"
      >
        <div className="flex space-x-1">
          {[
            { id: 'profile', name: 'Profile', icon: User },
            { id: 'achievements', name: 'Achievements', icon: Award },
            { id: 'notifications', name: 'Notifications', icon: Bell },
            { id: 'settings', name: 'Settings', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Profile Information</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
              <textarea
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="City, Country"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                <select
                  defaultValue={user.role!}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="investor">Investor</option>
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="worker">Worker</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow">
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Your Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 ${
                  achievement.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      achievement.completed ? 'text-green-800' : 'text-slate-800'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${
                      achievement.completed ? 'text-green-600' : 'text-slate-600'
                    }`}>
                      {achievement.description}
                    </p>
                    {achievement.completed ? (
                      <div className="text-xs text-green-600 mt-2">
                        Completed on {achievement.date}
                      </div>
                    ) : (
                      <div className="mt-2">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          {achievement.progress}% complete
                        </div>
                      </div>
                    )}
                  </div>
                  {achievement.completed && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Notification Preferences</h3>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-slate-800">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {key === 'emailUpdates' && 'Receive updates via email'}
                    {key === 'investmentAlerts' && 'Get notified about investment opportunities'}
                    {key === 'communityMessages' && 'Notifications for community discussions'}
                    {key === 'monthlyReports' && 'Monthly performance and activity reports'}
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange(key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    enabled ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Account Settings</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
              <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="en">English</option>
                <option value="rw">Kinyarwanda</option>
                <option value="fr">French</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
              <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="usd">USD ($)</option>
                <option value="rwf">RWF (Fr)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Time Zone</label>
              <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="eat">East Africa Time (EAT)</option>
                <option value="utc">UTC</option>
              </select>
            </div>
            
            <div className="border-t border-slate-200 pt-6">
              <h4 className="font-medium text-slate-800 mb-4">Security</h4>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Enable Two-Factor Authentication
                </button>
                <button className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Download Account Data
                </button>
              </div>
            </div>
            
            <div className="border-t border-slate-200 pt-6">
              <h4 className="font-medium text-red-600 mb-4">Danger Zone</h4>
              <button className="w-full px-4 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                Delete Account
              </button>
            </div>
            
            <div className="flex justify-end">
              <button className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow">
                Save Settings
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfilePage;