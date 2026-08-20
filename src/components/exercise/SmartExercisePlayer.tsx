import React, { useState, useEffect } from 'react';
import { PrescribedExercise } from '../../types';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  Flame,
  Volume2,
  Clock,
  Dumbbell
} from 'lucide-react';

interface SmartExercisePlayerProps {
  prescribedExercises: PrescribedExercise[];
  onFinishAllExercises: (completedIds: string[]) => void;
}

export const SmartExercisePlayer: React.FC<SmartExercisePlayerProps> = ({
  prescribedExercises,
  onFinishAllExercises
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedExerciseIds, setCompletedExerciseIds] = useState<string[]>([]);
  const [currentSet, setCurrentSet] = useState(1);
  
  // Timer State
  const currentItem = prescribedExercises[currentIndex];
  const initialSeconds = currentItem ? currentItem.holdSeconds || 10 : 10;
  
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Reset timer when exercise changes
  useEffect(() => {
    if (currentItem) {
      setTimeLeft(currentItem.holdSeconds || 10);
      setIsActive(false);
    }
  }, [currentIndex, currentItem]);

  // Timer Tick
  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Set completed or rep completed
      setIsActive(false);
      
      // Auto-advance set if applicable
      if (currentSet < currentItem.sets) {
        setCurrentSet(s => s + 1);
        setTimeLeft(currentItem.holdSeconds || 10);
      } else {
        // Mark current exercise as completed
        handleMarkExerciseComplete();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentSet, currentItem]);

  const handleToggleTimer = () => {
    setIsActive(!isActive);
  };

  const handleResetTimer = () => {
    setIsActive(false);
    setTimeLeft(currentItem.holdSeconds || 10);
  };

  const handleMarkExerciseComplete = () => {
    const exId = currentItem.exercise.id;
    if (!completedExerciseIds.includes(exId)) {
      const updated = [...completedExerciseIds, exId];
      setCompletedExerciseIds(updated);

      // Play confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });

      // Next exercise or finish
      if (currentIndex < prescribedExercises.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCurrentSet(1);
      } else {
        setIsFinished(true);
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < prescribedExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentSet(1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentSet(1);
    }
  };

  if (!currentItem) {
    return (
      <div className="p-8 text-center text-slate-500">
        처방된 운동 항목이 없습니다.
      </div>
    );
  }

  const isCurrentCompleted = completedExerciseIds.includes(currentItem.exercise.id);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
      
      {/* Top Header & Step Progress */}
      <div className="bg-slate-900 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5" />
              스마트 홈케어 코치
            </span>
            <span className="text-xs text-slate-400">
              {currentIndex + 1} / {prescribedExercises.length} 단계
            </span>
          </div>

          <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            완료: {completedExerciseIds.length}/{prescribedExercises.length}
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {prescribedExercises.map((pe, idx) => {
            const isDone = completedExerciseIds.includes(pe.exercise.id);
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={pe.exercise.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setCurrentSet(1);
                }}
                className={`p-2 rounded-xl text-left transition-all border ${
                  isCurrent
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                    : isDone
                    ? 'bg-slate-800/80 border-emerald-700/50 text-emerald-300'
                    : 'bg-slate-800/40 border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold">Step {idx + 1}</span>
                  {isDone && <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />}
                </div>
                <p className="text-xs font-semibold truncate mt-0.5">
                  {pe.exercise.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Exercise Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        
        {/* Left: Visual & Interactive Timer (Col 6) */}
        <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
          
          {/* Exercise Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 bg-slate-200 shadow-inner">
            <img
              src={currentItem.exercise.imageUrl}
              alt={currentItem.exercise.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
              타겟: {currentItem.exercise.targetMuscle}
            </div>
            <div className="absolute bottom-3 right-3 bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
              권장: {currentItem.frequency}
            </div>
          </div>

          {/* Big Interactive Timer Counter */}
          <div className="mt-6 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center justify-center">
            
            <div className="flex items-center justify-between w-full mb-3 text-xs text-slate-500 font-bold px-1">
              <span>목표 세트: <span className="text-slate-900">{currentItem.sets} 세트</span></span>
              <span>현재 세트: <span className="text-emerald-600 text-sm font-black">{currentSet} / {currentItem.sets}</span></span>
              <span>1회 유지: <span className="text-slate-900">{currentItem.holdSeconds}초</span></span>
            </div>

            {/* Circular Timer Visual */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className="text-slate-100"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className="text-emerald-500 transition-all duration-300"
                  strokeWidth="8"
                  strokeDasharray={314}
                  strokeDashoffset={314 - (314 * timeLeft) / (currentItem.holdSeconds || 10)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black text-slate-900 tracking-tight">
                  {timeLeft}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  SECONDS
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={handleResetTimer}
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                title="초기화"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              
              <button
                type="button"
                onClick={handleToggleTimer}
                className={`px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-md transition-all ${
                  isActive
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                }`}
              >
                {isActive ? (
                  <>
                    <Pause className="w-5 h-5" />
                    일시정지
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-white" />
                    {timeLeft === 0 ? '다음 세트 시작' : '타이머 시작'}
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

        {/* Right: Step-by-Step Instructions & Notes (Col 6) */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div>
            {/* Title & Purpose */}
            <div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                난이도: {currentItem.exercise.difficulty}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                {currentItem.exercise.name}
              </h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {currentItem.exercise.purpose}
              </p>
            </div>

            {/* Therapist's Custom Prescription Note */}
            {currentItem.therapistNotes && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>담당 치료사의 1:1 맞춤 코칭 메모</span>
                </div>
                <p className="text-xs font-medium text-emerald-950 leading-relaxed">
                  "{currentItem.therapistNotes}"
                </p>
              </div>
            )}

            {/* Step-by-Step Instructions */}
            <div className="mt-5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                올바른 수행 방법 (Step by Step)
              </h4>
              <div className="space-y-2">
                {currentItem.exercise.instructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs font-medium text-slate-700 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cautions */}
            {currentItem.exercise.cautions.length > 0 && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-100">
                <div className="flex items-center gap-1 text-xs font-bold text-rose-700 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>주의사항</span>
                </div>
                <ul className="text-[11px] text-rose-900 space-y-0.5 list-disc list-inside">
                  {currentItem.exercise.cautions.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Bottom Navigation & Complete Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === prescribedExercises.length - 1}
                className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleMarkExerciseComplete}
              className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                isCurrentCompleted
                  ? 'bg-slate-100 text-emerald-700 border border-emerald-300'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              {isCurrentCompleted ? '세트 완료됨 (다음 운동)' : '이 운동 완료 체크'}
            </button>
          </div>

        </div>

      </div>

      {/* Routine All Finished Celebration Banner */}
      {isFinished && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h4 className="text-lg font-black">오늘의 재활 홈케어 루틴 완수! 🎉</h4>
              <p className="text-xs text-emerald-100 mt-0.5">
                오늘의 통증 점수(VAS)와 회복 소감을 기록하여 담당 치료사에게 전달하세요.
              </p>
            </div>
          </div>

          <button
            onClick={() => onFinishAllExercises(completedExerciseIds)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-emerald-900 font-extrabold text-sm hover:bg-emerald-50 transition-colors shadow-lg"
          >
            오늘의 통증 일지 작성하기
          </button>
        </div>
      )}

    </div>
  );
};
