import React from 'react';
import { InteractiveBodyMap } from '../components/bodymap/InteractiveBodyMap';
import { ClinicalCaseCard } from '../components/casebook/ClinicalCaseCard';
import { VerifiedBadge } from '../components/common/VerifiedBadge';
import { useAppStore } from '../store/useStore';
import { 
  Activity, 
  Stethoscope, 
  UserCheck, 
  Award, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone, 
  Sparkles,
  TrendingUp,
  FileCheck2,
  CalendarCheck
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { 
    state, 
    setActiveTab, 
    setUserRole, 
    viewTherapistDetail, 
    viewCaseDetail 
  } = useAppStore();

  const featuredCases = state.clinicalCases.slice(0, 3);
  const featuredTherapists = state.therapists.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
        
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-100/40 via-teal-100/30 to-blue-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-6 shadow-xs animate-in fade-in duration-500">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>대한민국 물리치료사를 위한 No.1 임상 브랜딩 & 홈케어 처방 플랫폼</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              치료사의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">진짜 임상 실력</span>을<br className="hidden sm:inline" />
              데이터로 입증합니다.
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              인스타그램 사진만으로는 증명하기 어려웠던 <strong>관절 가동범위(ROM)</strong>와 <strong>통증 변화(VAS)</strong> 데이터를 시각화하고, 퇴원 후 환자의 <strong>홈케어 운동</strong>까지 스마트하게 처방하세요.
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setActiveTab('therapists')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all group"
              >
                <Stethoscope className="w-5 h-5" />
                내 증상에 맞는 전문 치료사 찾기
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setUserRole('therapist');
                  setActiveTab('therapist-dashboard');
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Sparkles className="w-5 h-5 text-emerald-400" />
                치료사로 임상 포트폴리오 시작하기
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-8 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">100%</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">보건복지부 면허 검증</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-emerald-600">+1,420건</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">검증된 임상 케이스북</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-teal-600">89.4%</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">홈케어 운동 순응도</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">4.96 / 5.0</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">환자 재활 만족도</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Feature 1: Interactive Body Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            Symptom Finder
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            증상별 1:1 맞춤 치료사 탐색
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            인체 부위를 선택하여 나와 유사한 수술·손상 사례를 가장 많이 치료한 물리치료사를 확인하세요.
          </p>
        </div>

        <InteractiveBodyMap />
      </section>

      {/* Core Feature 2: Clinical Casebook Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Evidence Based Practice
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              실제 임상 케이스북 (ROM & VAS Before / After)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              관절 각도 회복 및 통증 지수 감소 데이터가 투명하게 공개된 검증 사례들입니다.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('cases')}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
          >
            임상 케이스 전체 보기 ({state.clinicalCases.length}건)
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCases.map((caseItem) => (
            <ClinicalCaseCard key={caseItem.id} caseData={caseItem} />
          ))}
        </div>
      </section>

      {/* Value Proposition for Therapists & Patients */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 rounded-3xl mx-4 sm:mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Why Re:Move?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-2">
              물리치료사와 환자 모두를 위한 스마트 재활 생태계
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* For Therapists */}
            <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  물리치료사 : 임상 실력의 객관적 브랜딩
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  SNS의 1회성 피드가 아닌 학회 이수증, 면허 검증 배지, ROM/VAS 개선 차트로 나만의 전문성을 환자에게 신뢰감 있게 전달합니다.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>비포/애프터 관절 가동범위(ROM) 각도계 시각화</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>클릭 몇 번으로 완성되는 맞춤 모바일 운동 처방전</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>퇴원 후 환자의 통증 일지와 순응도 실시간 모니터링</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setUserRole('therapist');
                  setActiveTab('therapist-dashboard');
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
              >
                치료사 포트폴리오 관리하기
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* For Patients */}
            <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-6">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  환자 : 내 증상에 딱 맞는 치료사와 스마트 홈케어
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  어디가 어떻게 좋아졌는지 모호했던 치료는 이제 그만. 내 수술 부위를 전문으로 하는 검증된 치료사를 찾고 집에서도 올바른 자세로 재활하세요.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>인체 부위별 질환 특화 전문 치료사 1:1 매칭</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>스마트 타이머와 단계별 가이드로 잊지 않는 홈케어</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>매일 기록하는 통증 일지 & 자동 경과 리포트 그래프</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setUserRole('patient');
                  setActiveTab('patient-care');
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
              >
                내 홈케어 처방전 & 재활 시작하기
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Featured Therapists Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Verified Professionals
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              면허 및 학회 인증 물리치료사
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              공인된 임상 경력과 정형도수물리치료 학회 이수증을 보유한 전문 치료사들입니다.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('therapists')}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
          >
            전체 치료사 보기 ({state.therapists.length}명)
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTherapists.map((t) => (
            <div
              key={t.id}
              onClick={() => viewTherapistDetail(t.id)}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card hover:shadow-xl hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Avatar & Badges */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700">
                        {t.name}
                      </h3>
                      <span className="text-xs text-slate-500">치료사</span>
                    </div>
                    <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                      경력 {t.experienceYears}년차 · {t.locationArea}
                    </p>
                    <VerifiedBadge size="sm" type="license" className="mt-1" />
                  </div>
                </div>

                <p className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">
                  {t.title}
                </p>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {t.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {t.specializations.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-600 font-medium">
                  <span className="text-amber-500 font-bold">★ {t.rating}</span>
                  <span>케이스 {t.caseCount}건</span>
                </div>
                <span className="text-emerald-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  프로필 및 예약 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
