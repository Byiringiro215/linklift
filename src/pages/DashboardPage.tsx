import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Briefcase, Users, Plus, ArrowUpRight, Target } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { myVentures, ventures, jobs, applications, addVenture, addJob } = useData();
  const [showVentureForm, setShowVentureForm] = React.useState(false);
  const [showJobForm, setShowJobForm] = React.useState(false);
  const [ventureForm, setVentureForm] = React.useState({ title: '', description: '', category: 'technology' });
  const [jobForm, setJobForm] = React.useState({
    title: '', company: '', location: 'Kigali', type: 'full-time', category: 'technology', salary: '$0/hour', description: ''
  });

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

  const isWorker = user.role === 'worker';
  const isEntrepreneur = user.role === 'entrepreneur';
  const isInvestor = user.role === 'investor';

  const defaultJobsFallbackCount = 6;
  const workerStatsRaw = {
    availableJobs: jobs.length || defaultJobsFallbackCount,
    acceptedJobs: applications.filter(a => a.userId === user.id && a.status === 'accepted').length,
    completedJobs: applications.filter(a => a.userId === user.id && a.status === 'completed').length,
    appliedJobs: applications.filter(a => a.userId === user.id).length,
  };
  const workerStats = {
    availableJobs: workerStatsRaw.availableJobs, // real count
    acceptedJobs: workerStatsRaw.acceptedJobs || 1,
    completedJobs: workerStatsRaw.completedJobs || 1,
    appliedJobs: workerStatsRaw.appliedJobs || 1,
  };

  const entrepreneurStats = {
    totalVentures: myVentures.length,
    funded: myVentures.filter(v => v.status === 'funded').length,
    pending: myVentures.filter(v => v.status === 'pending').length,
    complete: myVentures.filter(v => v.status === 'complete').length,
  };

  const investorPostedJobIds = React.useMemo(() => new Set(jobs.filter(j => j.postedByUserId === user.id).map(j => j.id)), [jobs, user.id]);
  const investorStats = {
    availableVentures: ventures.length,
    fundedVentures: ventures.filter(v => v.status === 'funded').length,
    postedJobs: jobs.filter(j => j.postedByUserId === user.id).length,
    totalApplications: applications.filter(a => investorPostedJobIds.has(a.jobId)).length,
  };

  const handleCreateVenture = () => {
    addVenture({
      title: ventureForm.title,
      description: ventureForm.description,
      category: ventureForm.category,
      status: 'pending',
    } as any);
    setShowVentureForm(false);
    setVentureForm({ title: '', description: '', category: 'technology' });
    navigate('/ventures');
  };

  const handlePostJob = () => {
    addJob({
      title: jobForm.title,
      company: jobForm.company,
      location: jobForm.location,
      type: jobForm.type as any,
      category: jobForm.category,
      salary: jobForm.salary,
      description: jobForm.description,
      remote: false,
      urgent: false,
    } as any);
    setShowJobForm(false);
    setJobForm({ title: '', company: '', location: 'Kigali', type: 'full-time', category: 'technology', salary: '$0/hour', description: '' });
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
              <p className="text-sm text-slate-600">{isWorker ? 'Available Jobs' : isEntrepreneur ? 'Total Ventures' : 'Available Ventures'}</p>
              <p className="text-2xl font-bold text-slate-800">{isWorker ? workerStats.availableJobs : isEntrepreneur ? entrepreneurStats.totalVentures : investorStats.availableVentures}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
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
              <p className="text-sm text-slate-600">{isWorker ? 'Accepted Jobs' : isEntrepreneur ? 'Funded Ventures' : 'Funded Ventures'}</p>
              <p className="text-2xl font-bold text-slate-800">{isWorker ? workerStats.acceptedJobs : isEntrepreneur ? entrepreneurStats.funded : investorStats.fundedVentures}</p>
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
              <p className="text-sm text-slate-600">{isWorker ? 'Completed Jobs' : isEntrepreneur ? 'Pending Ventures' : 'Posted Jobs'}</p>
              <p className="text-2xl font-bold text-slate-800">{isWorker ? workerStats.completedJobs : isEntrepreneur ? entrepreneurStats.pending : investorStats.postedJobs}</p>
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
              <p className="text-sm text-slate-600">{isWorker ? 'Applied Jobs' : isEntrepreneur ? 'Completed Ventures' : 'Total Applications'}</p>
              <p className="text-2xl font-bold text-slate-800">{isWorker ? workerStats.appliedJobs : isEntrepreneur ? entrepreneurStats.complete : investorStats.totalApplications}</p>
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
          {isInvestor && (
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

          {isEntrepreneur && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Your Ventures</h2>
                {/* <button onClick={() => setShowVentureForm(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Start New Venture
                </button> */}
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

          {isWorker && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Jobs</h2>
                <Link
                  to="/jobs"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              {(() => {
                const defaultPreview = [
                  { id: 's1', title: 'Frontend Developer', company: 'Tech Skills Center', location: 'Kigali' },
                  { id: 's2', title: 'Farm Operations Assistant', company: 'Urban Farming Initiative', location: 'Kigali' },
                  { id: 's3', title: 'Sales Associate', company: 'Community Marketplace', location: 'Kigali' },
                ];
                const preview = (jobs.length ? jobs : (defaultPreview as any)).slice(0, 3);
                return (
                  <div className="space-y-4">
                    {preview.map((job: any) => (
                      <div key={job.id} className="p-4 bg-slate-50/50 rounded-lg border border-slate-100">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-slate-800">{job.title}</h3>
                          <span className="text-xs text-slate-600">{job.location}</span>
                        </div>
                        <p className="text-sm text-slate-600">{job.company}</p>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </motion.div>
          )}
        </div>

        {/* Sidebar: role-specific quick actions only */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {isWorker && (
                <button onClick={() => setShowVentureForm(true)} className="w-full flex items-center justify-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-green-700">
                  <Briefcase className="w-5 h-5 mr-3" />
                  Add New Venture
                </button>
              )}
              {isEntrepreneur && (
                <button onClick={() => setShowVentureForm(true)} className="w-full flex items-center justify-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-green-700">
                  <Briefcase className="w-5 h-5 mr-3" />
                  Start New Venture
                </button>
              )}
              {isInvestor && (
                <button onClick={() => setShowJobForm(true)} className="w-full flex items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700">
                  <Users className="w-5 h-5 mr-3" />
                  Post a Job
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Venture Form Modal */}
      {showVentureForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">{isWorker ? 'Add New Venture' : 'Start New Venture'}</h3>
            <div className="space-y-4">
              <input value={ventureForm.title} onChange={(e)=>setVentureForm({...ventureForm, title: e.target.value})} placeholder="Title" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
              <textarea value={ventureForm.description} onChange={(e)=>setVentureForm({...ventureForm, description: e.target.value})} placeholder="Description" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
              <select value={ventureForm.category} onChange={(e)=>setVentureForm({...ventureForm, category: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-lg">
                <option value="technology">Technology</option>
                <option value="agriculture">Agriculture</option>
                <option value="retail">Retail</option>
                <option value="services">Services</option>
              </select>
              <div className="flex justify-end space-x-3">
                <button onClick={()=>setShowVentureForm(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button onClick={handleCreateVenture} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Form Modal (Investor) */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Post a Job</h3>
            <div className="space-y-4">
              <input value={jobForm.title} onChange={(e)=>setJobForm({...jobForm, title: e.target.value})} placeholder="Job title" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
              <input value={jobForm.company} onChange={(e)=>setJobForm({...jobForm, company: e.target.value})} placeholder="Company" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
              <input value={jobForm.location} onChange={(e)=>setJobForm({...jobForm, location: e.target.value})} placeholder="Location" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
              <select value={jobForm.type} onChange={(e)=>setJobForm({...jobForm, type: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-lg">
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
              <input value={jobForm.category} onChange={(e)=>setJobForm({...jobForm, category: e.target.value})} placeholder="Category" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
              <input value={jobForm.salary} onChange={(e)=>setJobForm({...jobForm, salary: e.target.value})} placeholder="Salary" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
              <textarea value={jobForm.description} onChange={(e)=>setJobForm({...jobForm, description: e.target.value})} placeholder="Description" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
              <div className="flex justify-end space-x-3">
                <button onClick={()=>setShowJobForm(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button onClick={handlePostJob} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Post</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;