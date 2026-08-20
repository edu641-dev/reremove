import React, { useState } from 'react';
import { useAppStore } from '../store/useStore';
import { SmartExercisePlayer } from '../components/exercise/SmartExercisePlayer';
import { PainLogModal } from '../components/exercise/PainLogModal';
import { VasChart } from '../components/casebook/VasChart';
import { 
  ClipboardList, 
  Activity, 
  Flame, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  Clock,
  Dumbbell
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const PatientCare: React.FC = () => {
  const { state, setActiveTab } = useAppStore();
  const [isPainModalOpen, setIsPainModalOpen] = useState(false);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [activeRxTab, setActiveRxTab] = useState<number>(0);

  const currentRx = state.prescriptions[activeRxTab] || state.prescriptions[0];

  const handleFinishAll = (ids: string[]) => {
    setCompletedIds(ids);
    setIsPainModalOpen(true);
  };

  // Convert daily logs to graph data
  const vasDataPoints = state.dailyLogs.map(log => ({
    week: log.date.slice(5),
    vas: log.vasScore,
    note: log.conditionText
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Title & Status Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold mb-3 border border-white/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>담당 물리치료사 인증 발급 처방전</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            내 스마트 홈케어 재활 센터
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed">
            담당 치료사님이 환자분의 수술/통증 경과에 맞춰 발급한 맞춤 운동 루틴을 확인하고, 매일 수행률과 통증을 기록하세요.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
            <div className="bg-black/30 px-3.5 py-2 rounded-xl backdrop-blur-xs">
              환자명: <span className="text-white font-bold">{currentRx.patientName} 님</span>
            </div>
            <div className="bg-black/30 px-3.5 py-2 rounded-xl backdrop-blur-xs">
              담당: <span className="text-emerald-300 font-bold">{currentRx.therapistName}</span> ({currentRx.clinicName})
            </div>
            <div className="bg-black/30 px-3.5 py-2 rounded-xl backdrop-blur-xs">
              발행일: <span className="text-slate-200">{currentRx.issuedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Goal & Instructions Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-black text-slate-900">
              현재 재활 처방전 정보
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            진행 상태: 활성 (Active)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider block">진단명</span>
            <p className="text-sm font-extrabold text-slate-900">{currentRx.diagnosis}</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
            <span className="font-bold text-emerald-700 uppercase tracking-wider block">이번 주차 재활 목표</span>
            <p className="text-sm font-extrabold text-emerald-900">{currentRx.targetGoal}</p>
          </div>
        </div>

        {currentRx.specialInstructions && (
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
            <strong>⚠️ 치료사 특별 지침: </strong>
            {currentRx.specialInstructions}
          </div>
        )}
      </div>

      {/* Interactive Smart Exercise Player */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Daily Workout Routine
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              오늘의 홈케어 운동 수행 ({currentRx.exercises.length}개 동작)
            </h3>
          </div>

          <button
            onClick={() => setIsPainModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            통증 일지 직접 기록
          </button>
        </div>

        <SmartExercisePlayer
          prescribedExercises={currentRx.exercises}
          onFinishAllExercises={handleFinishAll}
        />
      </section>

      {/* Pain Progress & Logs Tracking Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: VAS Recovery Curve (Col 6) */}
        <div className="lg:col-span-6">
          <VasChart
            beforeVas={8.0}
            afterVas={state.dailyLogs[state.dailyLogs.length - 1]?.vasScore || 3.8}
            weeklyProgress={vasDataPoints}
            title="나의 재활 통증(VAS) 호전도 그래프"
            showDetails={false}
          />
        </div>

        {/* Right: Daily Logs History & Feedback (Col 6) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Rehab History
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                최근 작성된 재활 일지 & 치료사 피드백
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              총 {state.dailyLogs.length}회 기록됨
            </span>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {state.dailyLogs.slice().reverse().map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {log.date}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-black border border-rose-200">
                    VAS {log.vasScore.toFixed(1)}
                  </span>
                </div>

                <p className="text-slate-700 leading-relaxed">
                  "{log.conditionText}"
                </p>

                {log.therapistFeedback && (
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-950 font-medium flex items-start gap-2 border border-emerald-100 mt-2">
                    <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-800 block text-[11px]">치료사 코멘트:</span>
                      <p className="text-[11px] leading-relaxed mt-0.5">{log.therapistFeedback}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* Pain Log Modal */}
      <PainLogModal
        isOpen={isPainModalOpen}
        onClose={() => setIsPainModalOpen(false)}
        prescriptionId={currentRx.id}
        completedExerciseIds={completedIds}
      />

    </div>
  );
};
