import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Briefcase, Users, Plus, ArrowUpRight, Clock, Target } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Please sign in to continue</h2>
          <Link to="/onboarding" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const role = user.role ?? 'investor';
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'investor': return 'from-blue-500 to-blue-600';
      case 'entrepreneur': return 'from-green-500 to-green-600';
      case 'worker': return 'from-yellow-500 to-yellow-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'investor': return DollarSign;
      case 'entrepreneur': return Briefcase;
      case 'worker': return Users;
      default: return TrendingUp;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-slate-600 mt-2">
              Here's what's happening in your community today
            </p>
          </div>
          <div className={`px-4 py-2 bg-gradient-to-r ${getRoleColor(role)} text-white rounded-full text-sm font-medium flex items-center`}>
            {React.createElement(getRoleIcon(role), { className: 'w-4 h-4 mr-2' })}
            {roleLabel}
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Balance</p>
              <p className="text-2xl font-bold text-slate-800">${user.balance.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Investments</p>
              <p className="text-2xl font-bold text-slate-800">3</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Monthly Returns</p>
              <p className="text-2xl font-bold text-slate-800">$45.50</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Community Rank</p>
              <p className="text-2xl font-bold text-slate-800">#15</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Role-Specific Content */}
        <div className="lg:col-span-2">
          {user.role === 'investor' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Investment Opportunities</h2>
                <Link
                  to="/ventures"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View All
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Urban Farming Initiative',
                    category: 'Agriculture',
                    funding: 75,
                    target: 10000,
                    returns: '12-15%'
                  },
                  {
                    title: 'Tech Skills Training Center',
                    category: 'Education',
                    funding: 45,
                    target: 15000,
                    returns: '10-12%'
                  },
                  {
                    title: 'Community Marketplace',
                    category: 'Retail',
                    funding: 90,
                    target: 8000,
                    returns: '15-18%'
                  }
                ].map((opportunity, index) => (
                  <div key={index} className="p-4 bg-slate-50/50 rounded-lg border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-800">{opportunity.title}</h3>
                      <span className="text-sm text-green-600 font-medium">{opportunity.returns} ROI</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{opportunity.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">Progress</span>
                          <span className="text-slate-600">{opportunity.funding}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                            style={{ width: `${opportunity.funding}%` }}
                          />
                        </div>
                      </div>
                      <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        Invest
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {user.role === 'entrepreneur' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Your Ventures</h2>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Start New Venture
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50/50 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-800">Mobile App Development</h3>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Under Review
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">Seeking $12,000 for mobile app development</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">5 investors</span> interested
                    </div>
                    <div className="text-sm text-slate-600">
                      Submitted <span className="font-medium">3 days ago</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50/50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-800">Organic Food Store</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Funded
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">$8,000 raised • 15 community investors</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-green-600">
                      <span className="font-medium">Launch in 2 weeks</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      ROI: <span className="font-medium text-green-600">14% projected</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {user.role === 'worker' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Recommended Jobs</h2>
                <Link
                  to="/jobs"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View All Jobs
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Frontend Developer',
                    company: 'Tech Skills Center',
                    wage: '$25/hour',
                    type: 'Part-time',
                    location: 'Remote',
                    posted: '2 days ago'
                  },
                  {
                    title: 'Farm Operations Assistant',
                    company: 'Urban Farming Initiative',
                    wage: '$18/hour',
                    type: 'Full-time',
                    location: 'Local',
                    posted: '1 week ago'
                  },
                  {
                    title: 'Sales Associate',
                    company: 'Community Marketplace',
                    wage: '$16/hour + commission',
                    type: 'Part-time',
                    location: 'Local',
                    posted: '3 days ago'
                  }
                ].map((job, index) => (
                  <div key={index} className="p-4 bg-slate-50/50 rounded-lg border border-slate-100">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-800">{job.title}</h3>
                        <p className="text-sm text-slate-600">{job.company}</p>
                      </div>
                      <span className="text-sm font-medium text-green-600">{job.wage}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <span>{job.type}</span>
                        <span>{job.location}</span>
                        <span>{job.posted}</span>
                      </div>
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Community Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">Community Activity</h3>
            <div className="space-y-4">
              {[
                {
                  user: 'Sarah M.',
                  action: 'invested in Urban Farming',
                  amount: '$500',
                  time: '2h ago'
                },
                {
                  user: 'John D.',
                  action: 'launched Food Truck venture',
                  amount: 'seeking $15k',
                  time: '5h ago'
                },
                {
                  user: 'Alice K.',
                  action: 'got hired at Tech Center',
                  amount: '$22/hr',
                  time: '1d ago'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-600 font-medium">{activity.amount}</span>
                      <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/wallet"
                className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <DollarSign className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-slate-800">Add Funds</span>
              </Link>
              <Link
                to="/ventures"
                className="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <Briefcase className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-sm font-medium text-slate-800">Explore Ventures</span>
              </Link>
              <Link
                to="/community"
                className="flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <Users className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-sm font-medium text-slate-800">Join Discussion</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;