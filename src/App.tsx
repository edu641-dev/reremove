import React from 'react';
import { useAppStore } from './store/useStore';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { TherapistDirectory } from './pages/TherapistDirectory';
import { TherapistDetail } from './pages/TherapistDetail';
import { CaseLibrary } from './pages/CaseLibrary';
import { CaseStudyDetail } from './pages/CaseStudyDetail';
import { PatientCare } from './pages/PatientCare';
import { TherapistDashboard } from './pages/TherapistDashboard';

export const App: React.FC = () => {
  const { state } = useAppStore();

  const renderCurrentPage = () => {
    switch (state.activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'therapists':
        return <TherapistDirectory />;
      case 'therapist-detail':
        return <TherapistDetail />;
      case 'cases':
        return <CaseLibrary />;
      case 'case-detail':
        return <CaseStudyDetail />;
      case 'patient-care':
        return <PatientCare />;
      case 'therapist-dashboard':
        return <TherapistDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Sticky Header */}
      <Navbar />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
};

export default App;
