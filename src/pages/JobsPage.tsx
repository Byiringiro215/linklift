import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Clock, Building, User, Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useUser } from '../context/UserContext';
import * as yup from 'yup';

const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const { jobs: userJobs, addApplication } = useData();
  const { user } = useUser();
  const role = user?.role ?? 'investor';

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'technology', name: 'Technology' },
    { id: 'agriculture', name: 'Agriculture' },
    { id: 'retail', name: 'Retail' },
    { id: 'construction', name: 'Construction' },
    { id: 'education', name: 'Education' },
    { id: 'healthcare', name: 'Healthcare' }
  ];

  const jobTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'full-time', name: 'Full-time' },
    { id: 'part-time', name: 'Part-time' },
    { id: 'contract', name: 'Contract' },
    { id: 'freelance', name: 'Freelance' }
  ];

  const staticJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Skills Training Center',
      location: 'Kigali',
      type: 'part-time',
      category: 'technology',
      salary: '$25/hour',
      description: 'Build responsive web applications using React and modern web technologies. Perfect for someone looking to gain experience in a supportive environment.',
      requirements: ['React experience', 'HTML/CSS proficiency', 'Basic JavaScript knowledge'],
      benefits: ['Flexible hours', 'Skill development', 'Mentorship'],
      postedDate: '2024-01-12',
      applicants: 8,
      remote: true,
      urgent: false
    },
    {
      id: 2,
      title: 'Farm Operations Assistant',
      company: 'Urban Farming Initiative',
      location: 'Kigali',
      type: 'full-time',
      category: 'agriculture',
      salary: '$18/hour',
      description: 'Support daily operations of vertical farming facility including planting, harvesting, and system maintenance.',
      requirements: ['Physical fitness', 'Attention to detail', 'Willingness to learn'],
      benefits: ['Health insurance', 'Training provided', 'Career growth'],
      postedDate: '2024-01-10',
      applicants: 15,
      remote: false,
      urgent: true
    },
    {
      id: 3,
      title: 'Sales Associate',
      company: 'Community Marketplace',
      location: 'Kigali',
      type: 'part-time',
      category: 'retail',
      salary: '$16/hour + commission',
      description: 'Help customers discover local artisan products and provide excellent customer service in our community marketplace.',
      requirements: ['Customer service skills', 'Local language fluency', 'Sales experience preferred'],
      benefits: ['Commission bonuses', 'Product discounts', 'Flexible schedule'],
      postedDate: '2024-01-08',
      applicants: 22,
      remote: false,
      urgent: false
    },
    {
      id: 4,
      title: 'Solar Panel Installer',
      company: 'Solar Manufacturing Co.',
      location: 'Huye',
      type: 'full-time',
      category: 'construction',
      salary: '$22/hour',
      description: 'Install solar panel systems for residential and commercial properties. Training provided for the right candidate.',
      requirements: ['Physical fitness', 'Basic electrical knowledge', 'Valid drivers license'],
      benefits: ['Health insurance', 'Training certification', 'Travel allowance'],
      postedDate: '2024-01-05',
      applicants: 12,
      remote: false,
      urgent: true
    },
    {
      id: 5,
      title: 'Community Health Worker',
      company: 'Mobile Clinic Service',
      location: 'Musanze',
      type: 'contract',
      category: 'healthcare',
      salary: '$20/hour',
      description: 'Provide basic healthcare services and health education to rural communities through our mobile clinic program.',
      requirements: ['Healthcare background', 'Community engagement experience', 'Multilingual preferred'],
      benefits: ['Meaningful impact', 'Professional development', 'Travel opportunities'],
      postedDate: '2024-01-03',
      applicants: 6,
      remote: false,
      urgent: false
    },
    {
      id: 6,
      title: 'Digital Marketing Specialist',
      company: 'Organic Coffee Cooperative',
      location: 'Remote',
      type: 'freelance',
      category: 'technology',
      salary: '$30/hour',
      description: 'Develop and execute digital marketing strategies to promote our organic coffee brand internationally.',
      requirements: ['Digital marketing experience', 'Social media expertise', 'Content creation skills'],
      benefits: ['Remote work', 'International exposure', 'Performance bonuses'],
      postedDate: '2024-01-01',
      applicants: 18,
      remote: true,
      urgent: false
    }
  ];

  const sourceJobs = useMemo(() => {
    // Everyone sees all available jobs (user-posted + static fallback)
    return userJobs.length ? userJobs : staticJobs;
  }, [userJobs]);

  const filteredJobs = sourceJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      case 'freelance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [activeJobId, setActiveJobId] = useState<string | number | null>(null);
  const [applyForm, setApplyForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    yearsExperience: '',
    expectedSalary: '',
    availabilityDate: '',
    linkedin: '',
    github: '',
    portfolio: '',
    resumeFileName: '',
    resumeDataUrl: '',
    message: '',
  });
  const [applyErrors, setApplyErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  const openApply = (jobId: string | number) => {
    setActiveJobId(jobId);
    setShowApplyModal(true);
  };

  const submitApplication = () => {
    if (!activeJobId) return;
    addApplication(String(activeJobId), {
      name: applyForm.name,
      email: applyForm.email,
      phone: applyForm.phone,
      location: applyForm.location,
      yearsExperience: applyForm.yearsExperience ? Number(applyForm.yearsExperience) : undefined,
      expectedSalary: applyForm.expectedSalary ? Number(applyForm.expectedSalary) : undefined,
      availabilityDate: applyForm.availabilityDate,
      linkedin: applyForm.linkedin,
      github: applyForm.github,
      portfolio: applyForm.portfolio,
      resumeFileName: applyForm.resumeFileName,
      resumeDataUrl: applyForm.resumeDataUrl,
      message: applyForm.message,
    });
    setShowApplyModal(false);
    setApplyForm({
      name: '', email: '', phone: '', location: '', yearsExperience: '', expectedSalary: '', availabilityDate: '', linkedin: '', github: '', portfolio: '', resumeFileName: '', resumeDataUrl: '', message: ''
    });
    setToast('Application sent successfully');
    setTimeout(() => setToast(null), 2500);
  };

  const isValidEmail = (email: string) => /.+@.+\..+/.test(email.trim());
  const phoneRegex = /^[0-9]{7,15}$/;
  const isApplyDisabled =
    applyForm.name.trim().length < 6 ||
    !isValidEmail(applyForm.email) ||
    !phoneRegex.test(applyForm.phone.trim()) ||
    applyForm.message.trim().length < 11;

  const applySchema = yup.object({
    name: yup
      .string()
      .trim()
      .min(6, 'Enter at least 6 characters ')
      .required('Full name is required'),
    email: yup
      .string()
      .trim()
      .email('Enter a valid email like name@example.com')
      .required('Email is required'),
    phone: yup
      .string()
      .trim()
      .matches(phoneRegex, 'Enter 7–15 digits (numbers only)')
      .required('Phone number is required'),
    message: yup
      .string()
      .trim()
      .min(11, 'Enter at least 11 characters')
      .required('Cover letter is required'),
    location: yup.string().trim().optional(),
    yearsExperience: yup
      .number()
      .transform((v, o) => (o === '' ? undefined : v))
      .typeError('Enter a number ')
      .integer('Enter a whole number of years')
      .min(0, 'Years must be 0 or more')
      .optional(),
    expectedSalary: yup
      .number()
      .transform((v, o) => (o === '' ? undefined : v))
      .typeError('Enter a number')
      .min(0, 'Salary must be 0 or more')
      .optional(),
    availabilityDate: yup
      .string()
      .trim()
      .transform((v, o) => (o === '' ? undefined : v))
      .optional(),
    linkedin: yup
      .string()
      .trim()
      .transform((v, o) => (o === '' ? undefined : v))
      .url('Invalid URL')
      .optional(),
    github: yup
      .string()
      .trim()
      .transform((v, o) => (o === '' ? undefined : v))
      .url('Invalid URL')
      .optional(),
    portfolio: yup
      .string()
      .trim()
      .transform((v, o) => (o === '' ? undefined : v))
      .url('Invalid URL')
      .optional(),
  });

  const validateAndSubmit = async () => {
    try {
      setApplyErrors({});
      await applySchema.validate(applyForm, { abortEarly: false });
      submitApplication();
    } catch (err: any) {
      const errors: Record<string, string> = {};
      if (err?.inner?.length) {
        for (const e of err.inner) {
          if (e.path && !errors[e.path]) errors[e.path] = e.message;
        }
      } else if (err?.path) {
        errors[err.path] = err.message;
      }
      setApplyErrors(errors);
    }
  };

  const handleChange = (field: keyof typeof applyForm, value: string) => {
    setApplyForm((prev) => ({ ...prev, [field]: value }));
    setApplyErrors((prev) => {
      const { [field]: _omit, ...rest } = prev;
      return rest;
    });
  };

  const validateField = async (field: keyof typeof applyForm) => {
    try {
      const fieldSchema = (applySchema.fields as any)[field] as yup.AnySchema | undefined;
      if (!fieldSchema) return;
      await fieldSchema.validate((applyForm as any)[field]);
      setApplyErrors((prev) => {
        const { [field]: _omit, ...rest } = prev;
        return rest;
      });
    } catch (err: any) {
      setApplyErrors((prev) => ({ ...prev, [field]: err.message }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Job Opportunities</h1>
          <p className="text-slate-600">Find meaningful work in your community</p>
        </div>
        {role === 'investor' && (
          <button className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Post a Job
          </button>
        )}
      </motion.div>

      {/* Search and Filters */}
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
              placeholder="Search jobs, companies, or keywords..."
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
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {jobTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Jobs List */}
      <div className="space-y-6">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 2) }}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-slate-800">{job.title}</h3>
                  {job.urgent && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Urgent
                    </span>
                  )}
                  {job.remote && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Remote
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">{job.description}</p>
              </div>
              <div className="text-right ml-6">
                <div className="text-2xl font-bold text-green-600 mb-2">{job.salary}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}>
                  {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-4">
              <h4 className="font-medium text-slate-800 mb-2">Requirements:</h4>
              <div className="flex flex-wrap gap-2">
                {(job.requirements ?? []).map((req, reqIndex) => (
                  <span
                    key={reqIndex}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <h4 className="font-medium text-slate-800 mb-2">Benefits:</h4>
              <div className="flex flex-wrap gap-2">
                {(job.benefits ?? []).map((benefit, benIndex) => (
                  <span
                    key={benIndex}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <User className="w-4 h-4" />
                <span>{job.applicants} applicants</span>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                  Save Job
                </button>
                <button onClick={() => openApply(job.id)} className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow">
                  Apply Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No jobs found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
          {toast}
        </div>
      )}

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Job Application</h3>
            <div className="space-y-4 max-h-[70vh] overflow-auto pr-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input value={applyForm.name} onChange={(e)=>handleChange('name', e.target.value)} onBlur={()=>validateField('name')} placeholder="Full name" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
                  {applyErrors.name && <div className="text-xs text-red-600 mt-1">{applyErrors.name}</div>}
                </div>
                <div>
                  <input value={applyForm.email} onChange={(e)=>handleChange('email', e.target.value)} onBlur={()=>validateField('email')} placeholder="Email" type="email" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
                  {applyErrors.email && <div className="text-xs text-red-600 mt-1">{applyErrors.email}</div>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input value={applyForm.phone} onChange={(e)=>handleChange('phone', e.target.value)} onBlur={()=>validateField('phone')} placeholder="Phone" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
                  {applyErrors.phone && <div className="text-xs text-red-600 mt-1">{applyErrors.phone}</div>}
                </div>
                <div>
                  <input value={applyForm.location} onChange={(e)=>handleChange('location', e.target.value)} onBlur={()=>validateField('location')} placeholder="Location (City, Country)" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
                  {applyErrors.location && <div className="text-xs text-red-600 mt-1">{applyErrors.location}</div>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input value={applyForm.yearsExperience} onChange={(e)=>handleChange('yearsExperience', e.target.value)} onBlur={()=>validateField('yearsExperience')} placeholder="Years of experience" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
                  {applyErrors.yearsExperience && <div className="text-xs text-red-600 mt-1">{applyErrors.yearsExperience}</div>}
                </div>
                <div>
                  <input value={applyForm.expectedSalary} onChange={(e)=>handleChange('expectedSalary', e.target.value)} onBlur={()=>validateField('expectedSalary')} placeholder="Expected salary (number)" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
                  {applyErrors.expectedSalary && <div className="text-xs text-red-600 mt-1">{applyErrors.expectedSalary}</div>}
                </div>
                <div>
                  <input value={applyForm.availabilityDate} onChange={(e)=>handleChange('availabilityDate', e.target.value)} onBlur={()=>validateField('availabilityDate')} type="date" placeholder="Availability date" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
                  {applyErrors.availabilityDate && <div className="text-xs text-red-600 mt-1">{applyErrors.availabilityDate}</div>}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Optional</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input value={applyForm.linkedin} onChange={(e)=>handleChange('linkedin', e.target.value)} onBlur={()=>validateField('linkedin')} placeholder="https://linkedin.com/in/username" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
                    {applyErrors.linkedin && <div className="text-xs text-red-600 mt-1">{applyErrors.linkedin}</div>}
                  </div>
                  <div>
                    <input value={applyForm.github} onChange={(e)=>handleChange('github', e.target.value)} onBlur={()=>validateField('github')} placeholder="https://github.com/username" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
                    {applyErrors.github && <div className="text-xs text-red-600 mt-1">{applyErrors.github}</div>}
                  </div>
                  <div>
                    <input value={applyForm.portfolio} onChange={(e)=>handleChange('portfolio', e.target.value)} onBlur={()=>validateField('portfolio')} placeholder="https://your-portfolio.com" className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
                    {applyErrors.portfolio && <div className="text-xs text-red-600 mt-1">{applyErrors.portfolio}</div>}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Upload Resume (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      setApplyForm((prev) => ({ ...prev, resumeFileName: file.name, resumeDataUrl: String(reader.result) }));
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="w-full"
                />
                {applyForm.resumeFileName && (
                  <div className="text-xs text-slate-600 mt-1">Attached: {applyForm.resumeFileName}</div>
                )}
              </div>
              <div>
                <textarea value={applyForm.message} onChange={(e)=>handleChange('message', e.target.value)} onBlur={()=>validateField('message')} placeholder="Cover letter / message" rows={4} className="w-full px-4 py-3 border border-slate-200 rounded-lg" />
                {applyErrors.message && <div className="text-xs text-red-600 mt-1">{applyErrors.message}</div>}
              </div>
              <div className="flex justify-end space-x-3">
                <button onClick={()=>setShowApplyModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button disabled={isApplyDisabled} onClick={validateAndSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;