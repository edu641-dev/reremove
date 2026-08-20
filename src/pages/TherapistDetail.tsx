import React, { useState } from 'react';
import { useAppStore } from '../store/useStore';
import { VerifiedBadge } from '../components/common/VerifiedBadge';
import { ClinicalCaseCard } from '../components/casebook/ClinicalCaseCard';
import { BookingModal } from '../components/therapist/BookingModal';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  ShieldCheck, 
  Star, 
  Calendar, 
  MessageSquare, 
  FileText, 
  CheckCircle2,
  Sparkles,
  Share2
} from 'lucide-react';

export const TherapistDetail: React.FC = () => {
  const { state, setActiveTab } = useAppStore();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const therapist = state.therapists.find(t => t.id === state.selectedTherapistId) || state.therapists[0];
  const therapistCases = state.clinicalCases.filter(c => c.therapistId === therapist.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Back Button */}
      <div>
        <button
          onClick={() => setActiveTab('therapists')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          치료사 목록으로 돌아가기
        </button>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Avatar & Verification (Col 4) */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="relative">
              <img
                src={therapist.avatarUrl}
                alt={therapist.name}
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover border-2 border-slate-100 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2">
                <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-2 w-full">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>국가공인 면허 인증 완료</span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  {therapist.licenseNumberMasked}
                </p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <span className="text-slate-500">환자 평점</span>
                <span className="font-bold text-amber-500 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {therapist.rating} ({therapist.reviewCount}개 후기)
                </span>
              </div>
            </div>
          </div>

          {/* Details & Bio (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Name & Title */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {therapist.name} <span className="text-base sm:text-lg font-bold text-slate-500">물리치료사</span>
                </h1>
                <VerifiedBadge type="license" size="md" />
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  임상 경력 {therapist.experienceYears}년차
                </span>
              </div>

              <p className="text-base font-bold text-emerald-700">
                {therapist.title}
              </p>
            </div>

            {/* Clinic Info & Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800">{therapist.clinicName}</span>
                  <p className="text-slate-500 mt-0.5">{therapist.clinicAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800">진료 / 상담 시간</span>
                  <p className="text-slate-500 mt-0.5">{therapist.consultationHours}</p>
                </div>
              </div>
            </div>

            {/* Bio text */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                치료 철학 및 임상 소개
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white">
                {therapist.bio}
              </p>
            </div>

            {/* Specialties */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                주력 전문 세부 분야
              </h3>
              <div className="flex flex-wrap gap-2">
                {therapist.specializations.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-100"
                  >
                    #{s}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <Calendar className="w-4 h-4" />
                1:1 재활 및 도수치료 상담 예약
              </button>

              {therapist.openKakaoUrl && (
                <a
                  href={therapist.openKakaoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-6 rounded-2xl bg-amber-300 hover:bg-amber-400 text-amber-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  카카오톡 문의
                </a>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Certifications Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900">
            공인 이수 학회 및 자격 타임라인
          </h3>
        </div>

        <div className="space-y-4">
          {therapist.certifications.map((cert, idx) => (
            <div
              key={cert.id}
              className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0">
                {cert.year}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-sm text-slate-900">{cert.title}</h4>
                  <VerifiedBadge size="sm" type="society" text="이수 인증" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{cert.organization}</p>
                {cert.certificateNo && (
                  <p className="text-[10px] text-slate-400 font-mono mt-1">
                    인증번호: {cert.certificateNo}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Cases by this Therapist */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Clinical Portfolio
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {therapist.name} 치료사의 임상 케이스북 ({therapistCases.length}건)
            </h3>
          </div>
        </div>

        {therapistCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapistCases.map((c) => (
              <ClinicalCaseCard key={c.id} caseData={c} showTherapistLink={false} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-xs text-slate-500">
            등록된 임상 케이스가 없습니다.
          </div>
        )}
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
