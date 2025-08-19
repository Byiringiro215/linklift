import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import VenturesPage from './pages/VenturesPage';
import LoansPage from './pages/LoansPage';
import JobsPage from './pages/JobsPage';
import CommunityPage from './pages/CommunityPage';
import WalletPage from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';
import { UserProvider } from './context/UserContext';
import { DataProvider } from './context/DataContext';
import './index.css';

function App() {
  return (
    <UserProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/*" element={
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/ventures" element={<VenturesPage />} />
                    <Route path="/loans" element={<LoansPage />} />
                    <Route path="/jobs" element={<JobsPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </UserProvider>
  );
}

export default App;