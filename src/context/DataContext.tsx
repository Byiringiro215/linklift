import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useUser } from './UserContext';

export type VentureStatus = 'pending' | 'funded' | 'complete';

export interface UserVenture {
  id: string;
  title: string;
  description: string;
  category: string;
  ownerId: string;
  status: VentureStatus;
  rating?: number;
  fundingGoal?: number;
  currentFunding?: number;
  minInvestment?: number;
  expectedReturn?: string;
  timeline?: string;
  location?: string;
  investors?: number;
  image?: string;
  verified?: boolean;
}

export interface UserJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  category: string;
  salary: string;
  description: string;
  postedDate: string;
  applicants: number;
  remote: boolean;
  urgent: boolean;
  postedByUserId: string;
  requirements?: string[];
  benefits?: string[];
}

export type ApplicationStatus = 'applied' | 'accepted' | 'rejected' | 'completed';
export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  message?: string;
  applicantName?: string;
  applicantEmail?: string;
  applicantPhone?: string;
  submittedAt?: string;
  applicantLocation?: string;
  yearsExperience?: number;
  expectedSalary?: number;
  availabilityDate?: string; // ISO date
  linkedin?: string;
  github?: string;
  portfolio?: string;
  resumeFileName?: string;
  resumeDataUrl?: string; // base64 data URL (MVP only)
}

interface DataContextType {
  ventures: UserVenture[];
  jobs: UserJob[];
  addVenture: (venture: Omit<UserVenture, 'id' | 'ownerId'>) => void;
  addJob: (job: Omit<UserJob, 'id' | 'postedByUserId' | 'postedDate' | 'applicants'>) => void;
  myVentures: UserVenture[];
  myJobs: UserJob[];
  applications: JobApplication[];
  addApplication: (
    jobId: string,
    data?: {
      message?: string;
      name?: string;
      email?: string;
      phone?: string;
      location?: string;
      yearsExperience?: number;
      expectedSalary?: number;
      availabilityDate?: string;
      linkedin?: string;
      github?: string;
      portfolio?: string;
      resumeFileName?: string;
      resumeDataUrl?: string;
    }
  ) => void;
}

// Default sample ventures to seed the app when no data exists yet
const defaultSampleVentures: UserVenture[] = [
  {
    id: 'v1',
    title: 'Urban Farming Initiative',
    description: 'Sustainable vertical farming bringing fresh produce to urban communities.',
    category: 'agriculture',
    ownerId: 'sample-owner-1',
    status: 'funded',
    rating: 4.8,
    fundingGoal: 10000,
    currentFunding: 7500,
    minInvestment: 100,
    expectedReturn: '12-15%',
    timeline: '18 months',
    location: 'Kigali',
    investors: 23,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
  },
  {
    id: 'v2',
    title: 'Tech Skills Training Center',
    description: 'Comprehensive technology training programs for youth employment.',
    category: 'education',
    ownerId: 'sample-owner-2',
    status: 'pending',
    rating: 4.9,
    fundingGoal: 15000,
    currentFunding: 6750,
    minInvestment: 200,
    expectedReturn: '10-12%',
    timeline: '24 months',
    location: 'Kigali',
    investors: 18,
    image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
  },
  {
    id: 'v3',
    title: 'Community Marketplace',
    description: 'Digital platform connecting local artisans with global customers.',
    category: 'technology',
    ownerId: 'sample-owner-3',
    status: 'complete',
    rating: 4.7,
    fundingGoal: 8000,
    currentFunding: 8000,
    minInvestment: 150,
    expectedReturn: '15-18%',
    timeline: '12 months',
    location: 'Kigali',
    investors: 31,
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true,
  },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [ventures, setVentures] = useState<UserVenture[]>(() => {
    try {
      const raw = localStorage.getItem('ll_ventures');
      if (raw) {
        const parsed = JSON.parse(raw) as UserVenture[];
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultSampleVentures;
      }
      return defaultSampleVentures;
    } catch {
      return defaultSampleVentures;
    }
  });
  const [jobs, setJobs] = useState<UserJob[]>(() => {
    try {
      const raw = localStorage.getItem('ll_jobs');
      return raw ? (JSON.parse(raw) as UserJob[]) : [];
    } catch {
      return [];
    }
  });
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    try {
      const raw = localStorage.getItem('ll_applications');
      return raw ? (JSON.parse(raw) as JobApplication[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ll_ventures', JSON.stringify(ventures));
    } catch {}
  }, [ventures]);

  useEffect(() => {
    try {
      localStorage.setItem('ll_jobs', JSON.stringify(jobs));
    } catch {}
  }, [jobs]);

  useEffect(() => {
    try {
      localStorage.setItem('ll_applications', JSON.stringify(applications));
    } catch {}
  }, [applications]);

  const addVenture: DataContextType['addVenture'] = (input) => {
    if (!user) return;
    const id = Math.random().toString(36).slice(2);
    const {
      status: inStatus,
      rating: inRating,
      fundingGoal: inFundingGoal,
      currentFunding: inCurrentFunding,
      minInvestment: inMinInvestment,
      expectedReturn: inExpectedReturn,
      timeline: inTimeline,
      location: inLocation,
      investors: inInvestors,
      image: inImage,
      verified: inVerified,
      ...rest
    } = input as any;
    const normalized: UserVenture = {
      id,
      ownerId: user.id,
      status: inStatus ?? 'pending',
      rating: inRating ?? 4.8,
      fundingGoal: inFundingGoal ?? 10000,
      currentFunding: inCurrentFunding ?? 0,
      minInvestment: inMinInvestment ?? 100,
      expectedReturn: inExpectedReturn ?? '10-12%',
      timeline: inTimeline ?? '12 months',
      location: inLocation ?? 'Kigali',
      investors: inInvestors ?? 0,
      image: inImage ?? 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      verified: inVerified ?? false,
      ...rest,
    };
    setVentures((prev) => [normalized, ...prev]);
  };

  const addJob: DataContextType['addJob'] = (input) => {
    if (!user) return;
    const id = Math.random().toString(36).slice(2);
    const {
      remote: inRemote,
      urgent: inUrgent,
      requirements: inRequirements,
      benefits: inBenefits,
      ...rest
    } = input as any;
    const normalized: UserJob = {
      id,
      postedByUserId: user.id,
      postedDate: new Date().toISOString(),
      applicants: 0,
      remote: inRemote ?? false,
      urgent: inUrgent ?? false,
      requirements: inRequirements ?? [],
      benefits: inBenefits ?? [],
      ...rest,
    };
    setJobs((prev) => [normalized, ...prev]);
  };

  const myVentures = useMemo(() => ventures.filter(v => v.ownerId === user?.id), [ventures, user?.id]);
  const myJobs = useMemo(() => jobs.filter(j => j.postedByUserId === user?.id), [jobs, user?.id]);

  const addApplication: DataContextType['addApplication'] = (jobId, data) => {
    if (!user) return;
    const id = Math.random().toString(36).slice(2);
    const record: JobApplication = {
      id,
      jobId,
      userId: user.id,
      status: 'applied',
      message: data?.message,
      applicantName: data?.name,
      applicantEmail: data?.email,
      applicantPhone: data?.phone,
      submittedAt: new Date().toISOString(),
      applicantLocation: data?.location,
      yearsExperience: data?.yearsExperience,
      expectedSalary: data?.expectedSalary,
      availabilityDate: data?.availabilityDate,
      linkedin: data?.linkedin,
      github: data?.github,
      portfolio: data?.portfolio,
      resumeFileName: data?.resumeFileName,
      resumeDataUrl: data?.resumeDataUrl,
    };
    setApplications((prev) => [record, ...prev]);
    // increment job applicants counter
    setJobs((prev) => prev.map(j => j.id === jobId ? { ...j, applicants: (j.applicants || 0) + 1 } : j));
  };

  return (
    <DataContext.Provider value={{ ventures, jobs, addVenture, addJob, myVentures, myJobs, applications, addApplication }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within a DataProvider');
  return ctx;
};


