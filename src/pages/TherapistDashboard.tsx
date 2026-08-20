import React, { useState } from 'react';
import { useAppStore } from '../store/useStore';
import { VerifiedBadge } from '../components/common/VerifiedBadge';
import { NewCaseModal } from '../components/therapist/NewCaseModal';
import { NewPrescriptionModal } from '../components/therapist/NewPrescriptionModal';
import { RomGoniometerViewer } from '../components/casebook/RomGoniometerViewer';
import { 
  Stethoscope, 
  FilePlus, 
  Plus, 
  Calendar, 
  ClipboardList, 
  Activity, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Award, 
  User, 
  Sparkles, 
  MessageSquare,
  TrendingDown,
  FileText,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';

export const TherapistDashboard: React.FC = () => {
  const { 
    state, 
    viewCaseDetail, 
    addTherapistFeedbackToLog, 
    updateBookingStatus 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'cases' | 'prescriptions' | 'monitoring' | 'bookings'>('cases');
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  
  // Feedback input state for logs
  const [feedbackInputs, setFeedbackInputs] = useState<Record<string, string>>({});

  const currentTherapist = state.therapists.find(t => t.id === state.currentTherapistId) || state.therapists[0];
  const myCases = state.clinicalCases.filter(c => c.therapistId === currentTherapist.id);
  const myPrescriptions = state.prescriptions.filter(p => p.therapistId === currentTherapist.id);
  const myBookings = state.bookings.filter(b => b.therapistId === currentTherapist.id);

  const handleSendFeedback = (logId: string) => {
    const text = feedbackInputs[logId];
    if (text && text.trim()) {
      addTherapistFeedbackToLog(logId, text.trim());
      setFeedbackInputs(prev => ({ ...prev, [logId]: '' }));
    }
  };

  // Patient VAS compliance trend
  const complianceData = [
    { day: '월', compliance: 95, avgVas: 5.8 },
    { day: '화', compliance: 90, avgVas: 5.2 },
    { day: '수', compliance: 100, avgVas: 4.6 },
    { day: '목', compliance: 85, avgVas: 4.1 },
    { day: '금', compliance: 92, avgVas: 3.5 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Profile & Statistics Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: Profile Info */}
          <div className="flex items-start gap-4 sm:gap-6">
            <img
              src={currentTherapist.avatarUrl}
              alt={currentTherapist.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-slate-700 shadow-md shrink-0"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black">
                  {currentTherapist.name} 치료사
                </span>
                <VerifiedBadge type="license" size="md" />
                <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-semibold">
                  임상 경력 {currentTherapist.experienceYears}년차
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-emerald-400">
                {currentTherapist.clinicName} ({currentTherapist.locationArea})
              </p>

              <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">
                {currentTherapist.title}
              </p>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsCaseModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
            >
              <FilePlus className="w-4 h-4" />
              새 임상 케이스(ROM/VAS) 등록
            </button>

            <button
              onClick={() => setIsRxModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition-all"
            >
              <ClipboardList className="w-4 h-4 text-emerald-400" />
              새 홈케어 처방전 발급
            </button>
          </div>

        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-800 text-xs">
          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <span className="text-slate-400 font-medium">발행된 임상 케이스</span>
            <p className="text-xl sm:text-2xl font-black text-white mt-0.5">{myCases.length}건</p>
          </div>
          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <span className="text-slate-400 font-medium">홈케어 처방 관리 환자</span>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">{myPrescriptions.length}명</p>
          </div>
          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <span className="text-slate-400 font-medium">접수된 상담 예약</span>
            <p className="text-xl sm:text-2xl font-black text-teal-400 mt-0.5">{myBookings.length}건</p>
          </div>
          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <span className="text-slate-400 font-medium">환자 평점 / 후기</span>
            <p className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">★ {currentTherapist.rating} ({currentTherapist.reviewCount})</p>
          </div>
        </div>

      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'cases'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          임상 케이스북 관리 ({myCases.length})
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'prescriptions'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          처방전 발급 내역 ({myPrescriptions.length})
        </button>

        <button
          onClick={() => setActiveTab('monitoring')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'monitoring'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          환자 경과 & 통증 일지 모니터링 ({state.dailyLogs.length})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          상담/예약 수신함 ({myBookings.length})
        </button>
      </div>

      {/* Tab 1: Clinical Casebook Management */}
      {activeTab === 'cases' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                발행된 임상 케이스 포트폴리오
              </h3>
              <p className="text-xs text-slate-500">
                치료 전/후 ROM 각도와 VAS 통증 감소 데이터가 검증 카드로 공개됩니다.
              </p>
            </div>

            <button
              onClick={() => setIsCaseModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> 새 케이스 추가
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myCases.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card hover:shadow-lg transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    {c.bodyPart} 재활
                  </span>
                  <span className="text-xs text-slate-400">{c.publishedAt}</span>
                </div>

                <h4 className="text-base font-bold text-slate-900 line-clamp-1">{c.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{c.summary}</p>

                {/* Compact ROM display */}
                <RomGoniometerViewer
                  jointName={c.romData.jointName}
                  beforeAngle={c.romData.beforeAngle}
                  afterAngle={c.romData.afterAngle}
                  normalRange={c.romData.normalRange}
                  unit={c.romData.unit}
                  compact={true}
                />

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-rose-600 font-bold">
                    VAS {c.vasData.beforeVas} ➔ {c.vasData.afterVas}
                  </span>
                  <button
                    onClick={() => viewCaseDetail(c.id)}
                    className="font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-0.5"
                  >
                    상세 보기 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Prescriptions Management */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                발급된 스마트 홈케어 처방전 목록
              </h3>
              <p className="text-xs text-slate-500">
                환자별 맞춤 운동 루틴 구성 및 모바일 전달 상태입니다.
              </p>
            </div>

            <button
              onClick={() => setIsRxModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" /> 새 처방전 발급
            </button>
          </div>

          <div className="space-y-4">
            {myPrescriptions.map((rx) => (
              <div
                key={rx.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-4"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{rx.patientName} 환자</h4>
                      <p className="text-xs text-slate-500">{rx.patientPhone} · 발행일 {rx.issuedDate}</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    처방 운동 {rx.exercises.length}개
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 text-xs space-y-1">
                  <p><strong>진단명:</strong> {rx.diagnosis}</p>
                  <p className="text-emerald-800"><strong>재활 목표:</strong> {rx.targetGoal}</p>
                </div>

                {/* Prescribed exercise pills */}
                <div className="flex flex-wrap gap-2">
                  {rx.exercises.map((pe, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                    >
                      ⚡ {pe.exercise.name} ({pe.sets}세트 / {pe.holdSeconds}초)
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Patient Progress & Pain Log Monitoring */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              환자 홈케어 순응도 & 실시간 통증(VAS) 모니터링
            </h3>
            <p className="text-xs text-slate-500">
              환자가 모바일로 작성한 운동 완료 기록과 통증 일지에 1:1 피드백 코멘트를 전달합니다.
            </p>
          </div>

          {/* Compliance & VAS Overview Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                주간 환자 홈케어 운동 순응도 (%)
              </h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="compliance" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                환자 통증 지수(VAS) 감소 트렌드
              </h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgVas" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Submitted Daily Logs & Therapist Feedback Area */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900">환자 제출 일지 내역</h4>
            {state.dailyLogs.slice().reverse().map((log) => (
              <div
                key={log.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    작성일자: {log.date}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-extrabold border border-rose-200">
                    통증 점수: VAS {log.vasScore.toFixed(1)}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-800 leading-relaxed">
                  <strong>환자 작성 메모:</strong> "{log.conditionText}"
                </div>

                {log.therapistFeedback ? (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-950 text-xs border border-emerald-200">
                    <span className="font-bold text-emerald-800 block mb-0.5">치료사 피드백 전달 완료:</span>
                    <p>{log.therapistFeedback}</p>
                  </div>
                ) : (
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={feedbackInputs[log.id] || ''}
                      onChange={(e) => setFeedbackInputs({ ...feedbackInputs, [log.id]: e.target.value })}
                      placeholder="환자에게 전달할 피드백 및 격려 코멘트를 입력하세요..."
                      className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs"
                    />
                    <button
                      onClick={() => handleSendFeedback(log.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" /> 전송
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Tab 4: Booking & Consultation Requests */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              접수된 1:1 상담 및 진료 예약
            </h3>
            <p className="text-xs text-slate-500">
              환자가 프로필 및 임상 케이스를 보고 신청한 상담 내역입니다.
            </p>
          </div>

          <div className="space-y-3">
            {myBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900">{b.patientName}</h4>
                    <span className="text-xs text-slate-500">({b.patientPhone})</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.status === 'confirmed' ? '예약 확정' : '접수 대기'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    <Clock className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                    희망 일시: <strong>{b.preferredDate} {b.preferredTime}</strong>
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    증상: {b.symptoms}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {b.status === 'pending' && (
                    <button
                      onClick={() => updateBookingStatus(b.id, 'confirmed')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                    >
                      예약 확정
                    </button>
                  )}
                  <a
                    href={`tel:${b.patientPhone}`}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    전화 상담
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <NewCaseModal
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
      />

      <NewPrescriptionModal
        isOpen={isRxModalOpen}
        onClose={() => setIsRxModalOpen(false)}
      />

    </div>
  );
};
