import React, { useState } from 'react';
import { useAppStore } from '../store/useStore';
import { RomGoniometerViewer } from '../components/casebook/RomGoniometerViewer';
import { VasChart } from '../components/casebook/VasChart';
import { VerifiedBadge } from '../components/common/VerifiedBadge';
import { BookingModal } from '../components/therapist/BookingModal';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Heart, 
  Share2, 
  CheckCircle2, 
  FileCheck, 
  Sparkles,
  Dumbbell,
  Stethoscope,
  Quote,
  Star
} from 'lucide-react';

export const CaseStudyDetail: React.FC = () => {
  const { 
    state, 
    setActiveTab, 
    viewTherapistDetail, 
    likeCase 
  } = useAppStore();

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const currentCase = state.clinicalCases.find(c => c.id === state.selectedCaseId) || state.clinicalCases[0];
  const therapist = state.therapists.find(t => t.id === currentCase.therapistId) || state.therapists[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Header & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('cases')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          임상 케이스 목록으로
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => likeCase(currentCase.id)}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-rose-600 hover:border-rose-200 flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>도움이 됨 {currentCase.likesCount}</span>
          </button>
        </div>
      </div>

      {/* Main Title & Diagnosis Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-10 space-y-4">
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/60">
            {currentCase.bodyPart === 'knee' ? '무릎' :
             currentCase.bodyPart === 'shoulder' ? '어깨' :
             currentCase.bodyPart === 'spine' ? '척추·체형' :
             currentCase.bodyPart === 'lower_back' ? '허리' : '경추'} 재활 케이스
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
            환자: {currentCase.patientProfile.ageGroup} {currentCase.patientProfile.gender} ({currentCase.patientProfile.occupation})
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
            <Calendar className="w-3.5 h-3.5" />
            치료 기간: {currentCase.treatmentPeriod}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
          {currentCase.title}
        </h1>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900 block mb-1">상세 진단명 및 내원 초기 상태:</strong>
          {currentCase.diagnosis}
        </div>
      </div>

      {/* Key Objective Evidence: ROM & VAS Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: ROM Goniometer Gauge (Col 5) */}
        <div className="lg:col-span-5">
          <RomGoniometerViewer
            jointName={currentCase.romData.jointName}
            beforeAngle={currentCase.romData.beforeAngle}
            afterAngle={currentCase.romData.afterAngle}
            normalRange={currentCase.romData.normalRange}
            unit={currentCase.romData.unit}
          />
        </div>

        {/* Right: VAS Pain Graph (Col 7) */}
        <div className="lg:col-span-7">
          <VasChart
            beforeVas={currentCase.vasData.beforeVas}
            afterVas={currentCase.vasData.afterVas}
            weeklyProgress={currentCase.vasData.weeklyProgress}
          />
        </div>

      </div>

      {/* Applied Interventions & Protocols */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interventions (Col 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Intervention Protocol
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              적용된 도수치료 및 재활 중재 기법
            </h3>
          </div>

          <div className="space-y-3">
            {currentCase.interventions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Assigned Homecare */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-3 flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-emerald-600" />
              처방된 스마트 홈케어 운동 루틴
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentCase.homecareAssigned.map((hc, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200/60"
                >
                  ⚡ {hc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Clinical Impression & Review (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Therapist Impression */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              치료사 임상 소견
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "{currentCase.clinicalImpression}"
            </p>
          </div>

          {/* Patient Review */}
          {currentCase.patientReview && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Quote className="w-3.5 h-3.5 text-emerald-600" />
                  환자 자필 회복 후기
                </span>
                <div className="flex items-center text-amber-500 text-xs font-bold">
                  {[...Array(currentCase.patientReview.satisfaction)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded-2xl border border-slate-100">
                "{currentCase.patientReview.text}"
              </p>
            </div>
          )}

          {/* Therapist Card & Booking CTA */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={therapist.avatarUrl}
                alt={therapist.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-900">{therapist.name} 치료사</h4>
                  <VerifiedBadge size="sm" type="license" text="인증" />
                </div>
                <p className="text-xs text-slate-500">{therapist.clinicName}</p>
              </div>
            </div>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-600/20"
            >
              <Stethoscope className="w-4 h-4" />
              이 치료사에게 동일 증상 상담 신청하기
            </button>
          </div>

        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        therapist={therapist}
      />

    </div>
  );
};
