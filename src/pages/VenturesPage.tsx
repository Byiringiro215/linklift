import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Clock, DollarSign, Users, MapPin, Star } from 'lucide-react';

const VenturesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'technology', name: 'Technology' },
    { id: 'retail', name: 'Retail' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'services', name: 'Services' },
    { id: 'education', name: 'Education' }
  ];

  const ventures = [
    {
      id: 1,
      title: 'Urban Farming Initiative',
      description: 'Sustainable vertical farming system bringing fresh produce to urban communities',
      category: 'agriculture',
      entrepreneur: 'Grace Uwimana',
      rating: 4.8,
      fundingGoal: 10000,
      currentFunding: 7500,
      minInvestment: 100,
      expectedReturn: '12-15%',
      timeline: '18 months',
      location: 'Kigali',
      investors: 23,
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Sustainable', 'Community Impact', 'Food Security'],
      verified: true
    },
    {
      id: 2,
      title: 'Tech Skills Training Center',
      description: 'Comprehensive technology training programs for youth employment',
      category: 'education',
      entrepreneur: 'Jean-Claude Habimana',
      rating: 4.9,
      fundingGoal: 15000,
      currentFunding: 6750,
      minInvestment: 200,
      expectedReturn: '10-12%',
      timeline: '24 months',
      location: 'Kigali',
      investors: 18,
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Education', 'Technology', 'Youth Development'],
      verified: true
    },
    {
      id: 3,
      title: 'Community Marketplace',
      description: 'Digital platform connecting local artisans with global customers',
      category: 'technology',
      entrepreneur: 'Marie Mukamana',
      rating: 4.7,
      fundingGoal: 8000,
      currentFunding: 7200,
      minInvestment: 150,
      expectedReturn: '15-18%',
      timeline: '12 months',
      location: 'Kigali',
      investors: 31,
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Digital', 'Artisans', 'Export'],
      verified: true
    },
    {
      id: 4,
      title: 'Solar Panel Manufacturing',
      description: 'Local production of affordable solar panels for rural communities',
      category: 'manufacturing',
      entrepreneur: 'Paul Niyonshuti',
      rating: 4.6,
      fundingGoal: 25000,
      currentFunding: 12500,
      minInvestment: 500,
      expectedReturn: '16-20%',
      timeline: '36 months',
      location: 'Huye',
      investors: 15,
      image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Clean Energy', 'Manufacturing', 'Rural Development'],
      verified: true
    },
    {
      id: 5,
      title: 'Mobile Clinic Service',
      description: 'Healthcare delivery service for underserved rural communities',
      category: 'services',
      entrepreneur: 'Dr. Immaculée Nyirahabimana',
      rating: 4.9,
      fundingGoal: 18000,
      currentFunding: 5400,
      minInvestment: 300,
      expectedReturn: '8-10%',
      timeline: '24 months',
      location: 'Musanze',
      investors: 12,
      image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Healthcare', 'Rural', 'Social Impact'],
      verified: false
    },
    {
      id: 6,
      title: 'Organic Coffee Cooperative',
      description: 'Premium organic coffee processing and direct-to-consumer sales',
      category: 'agriculture',
      entrepreneur: 'Emmanuel Nsabimana',
      rating: 4.8,
      fundingGoal: 12000,
      currentFunding: 9600,
      minInvestment: 250,
      expectedReturn: '14-17%',
      timeline: '18 months',
      location: 'Nyamasheke',
      investors: 27,
      image: 'https://images.pexels.com/photos/4350049/pexels-photo-4350049.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Organic', 'Export', 'Cooperative'],
      verified: true
    }
  ];

  const filteredVentures = ventures.filter(venture => {
    const matchesSearch = venture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venture.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || venture.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFundingProgress = (current: number, goal: number) => {
    return Math.round((current / goal) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Investment Ventures</h1>
        <p className="text-slate-600">Discover and invest in community-driven business opportunities</p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search ventures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="text-slate-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Ventures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVentures.map((venture, index) => (
          <motion.div
            key={venture.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 2) }}
            className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Venture Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={venture.image}
                alt={venture.title}
                className="w-full h-full object-cover"
              />
              {venture.verified && (
                <div className="absolute top-3 right-3">
                  <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-1" />
                    Verified
                  </div>
                </div>
              )}
              <div className="absolute top-3 left-3">
                <span className="bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
                  {venture.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* Title and Rating */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-slate-800 line-clamp-2">{venture.title}</h3>
                <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-slate-600">{venture.rating}</span>
                </div>
              </div>

              {/* Entrepreneur */}
              <p className="text-sm text-slate-600 mb-3">by {venture.entrepreneur}</p>

              {/* Description */}
              <p className="text-sm text-slate-600 mb-4 line-clamp-3">{venture.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {venture.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Funding Progress</span>
                  <span className="text-slate-600">
                    {getFundingProgress(venture.currentFunding, venture.fundingGoal)}%
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                    style={{ width: `${getFundingProgress(venture.currentFunding, venture.fundingGoal)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>${venture.currentFunding.toLocaleString()} raised</span>
                  <span>${venture.fundingGoal.toLocaleString()} goal</span>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-slate-600">{venture.expectedReturn}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-slate-600">{venture.timeline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-yellow-500" />
                  <span className="text-slate-600">Min ${venture.minInvestment}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="text-slate-600">{venture.investors} investors</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">{venture.location}</span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-shadow">
                  Invest Now
                </button>
                <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                  Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredVentures.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No ventures found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
};

export default VenturesPage;