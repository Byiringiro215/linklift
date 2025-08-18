import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, BookOpen, Trophy, Plus, Heart, Reply, Share } from 'lucide-react';

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discussions');

  const discussions = [
    {
      id: 1,
      title: 'Best practices for urban farming in limited space?',
      author: 'Grace Uwimana',
      category: 'Business Advice',
      replies: 12,
      likes: 24,
      timeAgo: '2 hours ago',
      preview: 'I\'m looking to maximize yield in my small vertical farming setup. Any tips on space optimization and crop rotation?',
      tags: ['Agriculture', 'Space Optimization', 'Yields']
    },
    {
      id: 2,
      title: 'Success Story: From $500 to $5000 monthly revenue!',
      author: 'Jean-Claude Habimana',
      category: 'Success Stories',
      replies: 28,
      likes: 67,
      timeAgo: '6 hours ago',
      preview: 'Want to share how LinkLift community support helped me grow my tech training business beyond my wildest dreams...',
      tags: ['Success Story', 'Technology', 'Growth'],
      featured: true
    },
    {
      id: 3,
      title: 'How to approach investors for the first time?',
      author: 'Marie Mukamana',
      category: 'Funding Tips',
      replies: 15,
      likes: 31,
      timeAgo: '1 day ago',
      preview: 'I have a great business idea for an artisan marketplace but I\'m nervous about pitching to investors. Any advice?',
      tags: ['Funding', 'Pitching', 'First Time']
    },
    {
      id: 4,
      title: 'Legal requirements for registering a cooperative?',
      author: 'Emmanuel Nsabimana',
      category: 'Business Advice',
      replies: 8,
      likes: 19,
      timeAgo: '2 days ago',
      preview: 'Our coffee farming group wants to formalize as a cooperative. What are the legal steps we need to take?',
      tags: ['Legal', 'Cooperative', 'Registration']
    }
  ];

  const resources = [
    {
      id: 1,
      title: 'Financial Literacy Basics',
      type: 'Guide',
      description: 'Understanding budgets, savings, and investment fundamentals',
      readTime: '15 min',
      category: 'Finance',
      downloads: 234,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Business Plan Template',
      type: 'Template',
      description: 'Step-by-step template for creating a compelling business plan',
      readTime: '30 min',
      category: 'Business',
      downloads: 189,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Marketing on a Budget',
      type: 'Video Course',
      description: 'Effective marketing strategies for small businesses with limited budgets',
      readTime: '45 min',
      category: 'Marketing',
      downloads: 156,
      rating: 4.7
    },
    {
      id: 4,
      title: 'Understanding Microfinance',
      type: 'Article',
      description: 'How microloans work and how to use them effectively for growth',
      readTime: '12 min',
      category: 'Finance',
      downloads: 98,
      rating: 4.6
    }
  ];

  const leaderboard = [
    {
      rank: 1,
      name: 'Sarah Mukamana',
      type: 'Top Investor',
      value: '$12,450 invested',
      ventures: 8,
      avatar: '👩‍💼'
    },
    {
      rank: 2,
      name: 'David Niyonshuti',
      type: 'Rising Entrepreneur',
      value: '3 successful ventures',
      ventures: 3,
      avatar: '👨‍💻'
    },
    {
      rank: 3,
      name: 'Alice Uwimana',
      type: 'Best Worker',
      value: '4.9/5 rating',
      ventures: 12,
      avatar: '👩‍🔧'
    },
    {
      rank: 4,
      name: 'Paul Habimana',
      type: 'Community Helper',
      value: '127 helpful answers',
      ventures: 0,
      avatar: '👨‍🏫'
    },
    {
      rank: 5,
      name: 'Grace Nyirahabimana',
      type: 'Top Investor',
      value: '$9,800 invested',
      ventures: 6,
      avatar: '👩‍⚕️'
    }
  ];

  const categories = [
    { name: 'Business Advice', count: 45, color: 'bg-blue-100 text-blue-800' },
    { name: 'Funding Tips', count: 32, color: 'bg-green-100 text-green-800' },
    { name: 'Success Stories', count: 28, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Networking', count: 19, color: 'bg-purple-100 text-purple-800' },
    { name: 'Technical Help', count: 15, color: 'bg-red-100 text-red-800' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Community Hub</h1>
        <p className="text-slate-600">Connect, learn, and grow with your community</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/70 backdrop-blur-sm p-1 rounded-xl border border-slate-200/50 shadow-sm mb-8"
      >
        <div className="flex space-x-1">
          {[
            { id: 'discussions', name: 'Discussions', icon: MessageSquare },
            { id: 'resources', name: 'Resources', icon: BookOpen },
            { id: 'leaderboard', name: 'Leaderboard', icon: Trophy }
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
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Discussions Tab */}
      {activeTab === 'discussions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* New Discussion Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white p-4 rounded-xl font-medium hover:shadow-lg transition-shadow flex items-center justify-center">
                <Plus className="w-5 h-5 mr-2" />
                Start New Discussion
              </button>
            </motion.div>

            {/* Discussion List */}
            <div className="space-y-6">
              {discussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 3) }}
                  className={`bg-white/70 backdrop-blur-sm p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow ${
                    discussion.featured ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-white' : 'border-slate-200/50'
                  }`}
                >
                  {discussion.featured && (
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-yellow-700">Featured Discussion</span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{discussion.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                        <span>by {discussion.author}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          discussion.category === 'Business Advice' ? 'bg-blue-100 text-blue-800' :
                          discussion.category === 'Success Stories' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {discussion.category}
                        </span>
                        <span>{discussion.timeAgo}</span>
                      </div>
                      <p className="text-slate-600 mb-4">{discussion.preview}</p>
                      <div className="flex flex-wrap gap-2">
                        {discussion.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Reply className="w-4 h-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{discussion.likes} likes</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map(category => (
                  <div key={category.name} className="flex items-center justify-between">
                    <span className="text-slate-700">{category.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total Members</span>
                  <span className="font-semibold text-slate-800">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Active Discussions</span>
                  <span className="font-semibold text-slate-800">139</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Questions Answered</span>
                  <span className="font-semibold text-slate-800">2,456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Success Stories</span>
                  <span className="font-semibold text-slate-800">84</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {resources.map((resource, index) => (
            <div
              key={resource.id}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{resource.title}</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {resource.type}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-600">⭐ {resource.rating}</div>
                </div>
              </div>
              
              <p className="text-slate-600 mb-4">{resource.description}</p>
              
              <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                <span>{resource.readTime} read</span>
                <span>{resource.downloads} downloads</span>
              </div>
              
              <button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-shadow">
                Access Resource
              </button>
            </div>
          ))}
        </motion.div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Community Leaders</h3>
          <div className="space-y-4">
            {leaderboard.map((member, index) => (
              <div
                key={member.rank}
                className={`flex items-center space-x-4 p-4 rounded-lg ${
                  member.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200' : 'bg-slate-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                  member.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                  member.rank === 2 ? 'bg-slate-300 text-slate-700' :
                  member.rank === 3 ? 'bg-orange-400 text-orange-900' :
                  'bg-slate-200 text-slate-600'
                }`}>
                  {member.rank <= 3 ? member.rank : member.avatar}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-800">{member.name}</h4>
                      <p className="text-sm text-slate-600">{member.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-slate-800">{member.value}</div>
                      {member.ventures > 0 && (
                        <div className="text-xs text-slate-600">{member.ventures} ventures</div>
                      )}
                    </div>
                  </div>
                </div>
                
                {member.rank <= 3 && (
                  <div className="text-2xl">
                    {member.rank === 1 ? '🥇' : member.rank === 2 ? '🥈' : '🥉'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CommunityPage;