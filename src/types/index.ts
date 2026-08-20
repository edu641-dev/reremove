export type BodyPartId = 
  | 'neck' 
  | 'shoulder' 
  | 'elbow' 
  | 'wrist' 
  | 'spine' 
  | 'lower_back' 
  | 'hip' 
  | 'knee' 
  | 'ankle';

export interface BodyPartInfo {
  id: BodyPartId;
  nameKo: string;
  nameEn: string;
  commonConditions: string[];
  icon: string;
  description: string;
}

export type Specialization = 
  | '도수치료'
  | '스포츠 재활'
  | '수술 후 재활'
  | '척추측만·체형교정'
  | '신경계 재활'
  | '만성 통증 관리'
  | '근골격계 질환';

export interface Certification {
  id: string;
  year: string;
  title: string;
  organization: string;
  certificateNo?: string;
  isVerified: boolean;
  category: 'license' | 'society' | 'degree' | 'award';
}

export interface ClinicalCase {
  id: string;
  therapistId: string;
  therapistName: string;
  title: string;
  patientProfile: {
    gender: '남성' | '여성';
    ageGroup: string; // e.g., '30대 초반'
    occupation?: string;
  };
  bodyPart: BodyPartId;
  diagnosis: string; // e.g. "우측 무릎 전방십자인대(ACL) 재건술 후 8주차 관절구축"
  treatmentPeriod: string; // e.g. "2024.01 ~ 2024.03 (총 12회차)"
  summary: string;
  
  // Before & After ROM (관절 가동 범위)
  romData: {
    jointName: string; // e.g. "Knee Flexion (굴곡)"
    normalRange: number; // e.g. 140
    beforeAngle: number; // e.g. 85
    afterAngle: number; // e.g. 135
    unit: string; // "°"
  };
  
  // VAS 통증 지수 변화
  vasData: {
    beforeVas: number; // 0-10
    afterVas: number; // 0-10
    weeklyProgress: { week: string; vas: number; note: string }[];
  };

  interventions: string[]; // e.g. ["슬개골 가동술(Patella Mobilization)", "대퇴사두근 신경근 재교육", "점진적 폐쇄성 사슬운동"]
  clinicalImpression: string; // 치료사 소견
  homecareAssigned: string[]; // 처방된 홈케어 운동명
  patientReview?: {
    text: string;
    satisfaction: number;
  };
  publishedAt: string;
  likesCount: number;
}

export interface ExerciseItem {
  id: string;
  name: string;
  category: BodyPartId;
  targetMuscle: string;
  difficulty: '초급' | '중급' | '고급';
  recommendedReps: string; // e.g. "15회 x 3세트"
  durationSeconds: number; // e.g. 30
  purpose: string;
  instructions: string[];
  cautions: string[];
  imageUrl: string;
  videoThumb?: string;
}

export interface PrescribedExercise {
  exercise: ExerciseItem;
  sets: number;
  reps: number;
  holdSeconds: number;
  frequency: string; // e.g. "매일 아침/저녁 2회"
  therapistNotes: string;
}

export interface Prescription {
  id: string;
  patientName: string;
  patientPhone: string;
  therapistId: string;
  therapistName: string;
  clinicName: string;
  issuedDate: string;
  diagnosis: string;
  targetGoal: string;
  exercises: PrescribedExercise[];
  specialInstructions: string;
  status: 'active' | 'completed';
}

export interface DailyLog {
  id: string;
  date: string;
  prescriptionId: string;
  vasScore: number; // 0-10
  conditionText: string;
  completedExerciseIds: string[];
  isAllCompleted: boolean;
  therapistFeedback?: string;
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  clinicName: string;
  clinicAddress: string;
  locationArea: string; // "서울 강남구", "경기 성남시" 등
  experienceYears: number;
  avatarUrl: string;
  bio: string;
  specializations: Specialization[];
  targetBodyParts: BodyPartId[];
  isLicenseVerified: boolean; // 면허 검증 배지
  licenseNumberMasked: string; // "제 12***호"
  certifications: Certification[];
  rating: number;
  reviewCount: number;
  caseCount: number;
  openKakaoUrl?: string;
  contactEmail: string;
  phone: string;
  consultationHours: string;
}

export interface BookingRequest {
  id: string;
  therapistId: string;
  therapistName: string;
  patientName: string;
  patientPhone: string;
  preferredDate: string;
  preferredTime: string;
  bodyPart: BodyPartId;
  symptoms: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}
