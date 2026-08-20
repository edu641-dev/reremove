import { useState, useEffect } from 'react';
import { 
  Therapist, 
  ClinicalCase, 
  Prescription, 
  DailyLog, 
  BookingRequest, 
  BodyPartId,
  ExerciseItem
} from '../types';
import { 
  therapistsData, 
  clinicalCasesData, 
  initialPrescriptionsData, 
  initialDailyLogsData, 
  initialBookingsData,
  exercisesData
} from '../data/mockData';

const STORAGE_KEY = 'remove_care_platform_state_v1';

export type UserRole = 'patient' | 'therapist';
export type AppTab = 
  | 'landing' 
  | 'therapists' 
  | 'cases' 
  | 'patient-care' 
  | 'therapist-dashboard' 
  | 'therapist-detail' 
  | 'case-detail';

interface AppState {
  userRole: UserRole;
  currentTherapistId: string;
  activeTab: AppTab;
  selectedBodyPart: BodyPartId | 'all';
  selectedSpecialty: string | 'all';
  searchQuery: string;
  selectedTherapistId: string | null;
  selectedCaseId: string | null;
  
  // Data
  therapists: Therapist[];
  clinicalCases: ClinicalCase[];
  prescriptions: Prescription[];
  dailyLogs: DailyLog[];
  bookings: BookingRequest[];
  exercises: ExerciseItem[];
}

export function useAppStore() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse local storage', e);
      }
    }
    return {
      userRole: 'patient',
      currentTherapistId: 'therapist-1',
      activeTab: 'landing',
      selectedBodyPart: 'all',
      selectedSpecialty: 'all',
      searchQuery: '',
      selectedTherapistId: null,
      selectedCaseId: null,
      therapists: therapistsData,
      clinicalCases: clinicalCasesData,
      prescriptions: initialPrescriptionsData,
      dailyLogs: initialDailyLogsData,
      bookings: initialBookingsData,
      exercises: exercisesData,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setUserRole = (role: UserRole) => {
    setState(prev => ({ 
      ...prev, 
      userRole: role,
      activeTab: role === 'therapist' ? 'therapist-dashboard' : (prev.activeTab === 'therapist-dashboard' ? 'landing' : prev.activeTab)
    }));
  };

  const setActiveTab = (tab: AppTab) => {
    setState(prev => ({ ...prev, activeTab: tab }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setSelectedBodyPart = (part: BodyPartId | 'all') => {
    setState(prev => ({ ...prev, selectedBodyPart: part }));
  };

  const setSelectedSpecialty = (specialty: string | 'all') => {
    setState(prev => ({ ...prev, selectedSpecialty: specialty }));
  };

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const viewTherapistDetail = (therapistId: string) => {
    setState(prev => ({ 
      ...prev, 
      selectedTherapistId: therapistId, 
      activeTab: 'therapist-detail' 
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewCaseDetail = (caseId: string) => {
    setState(prev => ({ 
      ...prev, 
      selectedCaseId: caseId, 
      activeTab: 'case-detail' 
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Actions
  const addClinicalCase = (newCase: Omit<ClinicalCase, 'id' | 'likesCount' | 'publishedAt'>) => {
    const created: ClinicalCase = {
      ...newCase,
      id: `case-${Date.now()}`,
      likesCount: 0,
      publishedAt: new Date().toISOString().split('T')[0],
    };
    setState(prev => ({
      ...prev,
      clinicalCases: [created, ...prev.clinicalCases],
      therapists: prev.therapists.map(t => 
        t.id === created.therapistId ? { ...t, caseCount: t.caseCount + 1 } : t
      )
    }));
    return created.id;
  };

  const likeCase = (caseId: string) => {
    setState(prev => ({
      ...prev,
      clinicalCases: prev.clinicalCases.map(c => 
        c.id === caseId ? { ...c, likesCount: c.likesCount + 1 } : c
      )
    }));
  };

  const addPrescription = (newRx: Omit<Prescription, 'id' | 'issuedDate'>) => {
    const created: Prescription = {
      ...newRx,
      id: `rx-${Date.now()}`,
      issuedDate: new Date().toISOString().split('T')[0],
    };
    setState(prev => ({
      ...prev,
      prescriptions: [created, ...prev.prescriptions]
    }));
    return created.id;
  };

  const addDailyLog = (log: Omit<DailyLog, 'id'>) => {
    const created: DailyLog = {
      ...log,
      id: `log-${Date.now()}`,
    };
    setState(prev => ({
      ...prev,
      dailyLogs: [...prev.dailyLogs, created]
    }));
  };

  const addTherapistFeedbackToLog = (logId: string, feedback: string) => {
    setState(prev => ({
      ...prev,
      dailyLogs: prev.dailyLogs.map(l => 
        l.id === logId ? { ...l, therapistFeedback: feedback } : l
      )
    }));
  };

  const addBooking = (booking: Omit<BookingRequest, 'id' | 'status' | 'createdAt'>) => {
    const now = new Date();
    const created: BookingRequest = {
      ...booking,
      id: `book-${Date.now()}`,
      status: 'pending',
      createdAt: `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`,
    };
    setState(prev => ({
      ...prev,
      bookings: [created, ...prev.bookings]
    }));
    return created.id;
  };

  const updateBookingStatus = (bookingId: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    setState(prev => ({
      ...prev,
      bookings: prev.bookings.map(b => 
        b.id === bookingId ? { ...b, status } : b
      )
    }));
  };

  const resetToSampleData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      userRole: 'patient',
      currentTherapistId: 'therapist-1',
      activeTab: 'landing',
      selectedBodyPart: 'all',
      selectedSpecialty: 'all',
      searchQuery: '',
      selectedTherapistId: null,
      selectedCaseId: null,
      therapists: therapistsData,
      clinicalCases: clinicalCasesData,
      prescriptions: initialPrescriptionsData,
      dailyLogs: initialDailyLogsData,
      bookings: initialBookingsData,
      exercises: exercisesData,
    });
  };

  return {
    state,
    setUserRole,
    setActiveTab,
    setSelectedBodyPart,
    setSelectedSpecialty,
    setSearchQuery,
    viewTherapistDetail,
    viewCaseDetail,
    addClinicalCase,
    likeCase,
    addPrescription,
    addDailyLog,
    addTherapistFeedbackToLog,
    addBooking,
    updateBookingStatus,
    resetToSampleData,
  };
}
