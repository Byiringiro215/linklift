import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, DollarSign, ArrowRight, CheckCircle, Star } from 'lucide-react';

const LandingPage: React.FC = () => {
  const steps = [
    {
      icon: DollarSign,
      title: 'Invest',
      description: 'Pool resources with your community to fund local ventures'
    },
    {
      icon: Briefcase,
      title: 'Fund & Work',
      description: 'Support entrepreneurs and create meaningful job opportunities'
    },
    {
      icon: TrendingUp,
      title: 'Profit & Impact',
      description: 'Earn returns while building a stronger community'
    }
  ];

  const testimonials = [
    {
      name: 'Grace Uwimana',
      role: 'Entrepreneur',
      content: 'LinkLift helped me launch my agricultural business. The community support is incredible!',
      rating: 5
    },
    {
      name: 'Jean-Claude Habimana',
      role: 'Investor',
      content: 'Great returns and positive impact. This is the future of community investment.',
      rating: 5
    },
    {
      name: 'Marie Mukamana',
      role: 'Worker',
      content: 'Found meaningful work through LinkLift. The skills development resources are excellent.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-800">LinkLift</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/onboarding" className="text-slate-600 hover:text-slate-800 font-medium">
                Sign In
              </Link>
              <Link
                to="/onboarding"
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-6">
              Lifting Communities,<br />Building Wealth Together
            </h1>
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
              Connect investors, entrepreneurs, and workers in a transparent ecosystem 
              that creates opportunities and builds lasting prosperity for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/onboarding"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-shadow flex items-center justify-center"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Join as Investor
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/onboarding"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-shadow flex items-center justify-center"
              >
                <Briefcase className="w-5 h-5 mr-2" />
                Join as Entrepreneur
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/onboarding"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-shadow flex items-center justify-center"
              >
                <Users className="w-5 h-5 mr-2" />
                Join as Worker
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">How LinkLift Works</h2>
            <p className="text-xl text-slate-600">Simple steps to community prosperity</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-6">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-slate-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
              <p className="text-xl text-blue-100">Building stronger communities together</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Ventures Funded</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-blue-100">Jobs Created</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">$2M+</div>
                <div className="text-blue-100">Community Investment</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15%</div>
                <div className="text-blue-100">Average ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">What Our Community Says</h2>
            <p className="text-xl text-slate-600">Real stories from real people</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-slate-800">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">Ready to Join the Movement?</h2>
          <p className="text-xl text-slate-600 mb-8">
            Be part of a community that's reshaping how we invest, work, and grow together.
          </p>
          <Link
            to="/onboarding"
            className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-shadow inline-flex items-center"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">LinkLift</span>
              </div>
              <p className="text-slate-400">Lifting communities, building wealth together.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/ventures" className="hover:text-white">Ventures</Link></li>
                <li><Link to="/jobs" className="hover:text-white">Jobs</Link></li>
                <li><Link to="/loans" className="hover:text-white">Loans</Link></li>
                <li><Link to="/community" className="hover:text-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Safety</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 LinkLift. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;