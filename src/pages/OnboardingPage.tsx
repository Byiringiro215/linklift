import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, DollarSign, Briefcase, Users, CheckCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import type { UserRole } from '../context/UserContext';

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: null as UserRole,
    riskPreference: '',
    contribution: '',
    projectCategory: '',
    skillSet: '',
    jobType: ''
  });
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        role: formData.role!,
        avatar: '',
        verified: false,
        balance: 0
      };
      setUser(user);
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const roles = [
    {
      id: 'investor' as UserRole,
      icon: DollarSign,
      title: 'Stable Investor',
      description: 'Pool resources to fund community ventures and earn returns',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'entrepreneur' as UserRole,
      icon: Briefcase,
      title: 'Entrepreneur',
      description: 'Launch your business idea with community backing',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'worker' as UserRole,
      icon: Users,
      title: 'Skilled Worker',
      description: 'Find meaningful work opportunities in your community',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600">Step {step} of 4</span>
            <span className="text-sm font-medium text-slate-600">{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500"
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-sm"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Welcome to LinkLift!</h2>
              <p className="text-slate-600 mb-8">Let's get you started with some basic information.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-sm"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Choose Your Role</h2>
              <p className="text-slate-600 mb-8">How would you like to participate in the LinkLift community?</p>
              
              <div className="grid gap-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setFormData({...formData, role: role.id})}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      formData.role === role.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <role.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{role.title}</h3>
                        <p className="text-slate-600">{role.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-sm"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Tell Us More</h2>
              
              {formData.role === 'investor' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Risk Preference</label>
                    <select
                      value={formData.riskPreference}
                      onChange={(e) => setFormData({...formData, riskPreference: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your risk preference</option>
                      <option value="conservative">Conservative (Low Risk)</option>
                      <option value="moderate">Moderate (Medium Risk)</option>
                      <option value="aggressive">Aggressive (High Risk)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Expected Monthly Contribution</label>
                    <select
                      value={formData.contribution}
                      onChange={(e) => setFormData({...formData, contribution: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select contribution range</option>
                      <option value="50-100">$50 - $100</option>
                      <option value="100-250">$100 - $250</option>
                      <option value="250-500">$250 - $500</option>
                      <option value="500+">$500+</option>
                    </select>
                  </div>
                </div>
              )}

              {formData.role === 'entrepreneur' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Project Category</label>
                    <select
                      value={formData.projectCategory}
                      onChange={(e) => setFormData({...formData, projectCategory: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select project category</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="technology">Technology</option>
                      <option value="retail">Retail & Commerce</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="services">Services</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                </div>
              )}

              {formData.role === 'worker' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Primary Skill Set</label>
                    <select
                      value={formData.skillSet}
                      onChange={(e) => setFormData({...formData, skillSet: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your skills</option>
                      <option value="construction">Construction & Trades</option>
                      <option value="technology">Technology & IT</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="retail">Retail & Sales</option>
                      <option value="education">Education & Training</option>
                      <option value="healthcare">Healthcare</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Job Type</label>
                    <select
                      value={formData.jobType}
                      onChange={(e) => setFormData({...formData, jobType: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select job type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-sm text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">You're All Set!</h2>
              <p className="text-slate-600 mb-8">
                Welcome to the LinkLift community, {formData.name}! You're now ready to start 
                {formData.role === 'investor' ? ' investing in' : 
                 formData.role === 'entrepreneur' ? ' building' : 
                 ' finding opportunities in'} your community.
              </p>
              
              <div className="bg-slate-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-slate-800 mb-4">What's Next?</h3>
                <ul className="text-left space-y-2 text-slate-600">
                  {formData.role === 'investor' && (
                    <>
                      <li>• Explore available ventures and investment opportunities</li>
                      <li>• Set up your monthly investment pool contribution</li>
                      <li>• Connect with entrepreneurs in your area</li>
                    </>
                  )}
                  {formData.role === 'entrepreneur' && (
                    <>
                      <li>• Submit your first venture proposal</li>
                      <li>• Connect with potential investors</li>
                      <li>• Access business development resources</li>
                    </>
                  )}
                  {formData.role === 'worker' && (
                    <>
                      <li>• Browse available job opportunities</li>
                      <li>• Complete your skills profile</li>
                      <li>• Access professional development resources</li>
                    </>
                  )}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center px-6 py-3 text-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && (!formData.name || !formData.email || !formData.phone)) ||
              (step === 2 && !formData.role) ||
              (step === 3 && formData.role === 'investor' && (!formData.riskPreference || !formData.contribution)) ||
              (step === 3 && formData.role === 'entrepreneur' && !formData.projectCategory) ||
              (step === 3 && formData.role === 'worker' && (!formData.skillSet || !formData.jobType))
            }
            className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {step === 4 ? 'Enter Dashboard' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;