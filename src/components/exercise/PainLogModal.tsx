import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAppStore } from '../../store/useStore';
import { Flame, CheckCircle, Smile, Frown, Meh, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PainLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  prescriptionId: string;
  completedExerciseIds: string[];
}

export const PainLogModal: React.FC<PainLogModalProps> = ({
  isOpen,
  onClose,
  prescriptionId,
  completedExerciseIds
}) => {
  const { addDailyLog } = useAppStore();
  const [vasScore, setVasScore] = useState<number>(3.5);
  const [conditionText, setConditionText] = useState('');

  const getVasEmoji = (score: number) => {
    if (score <= 2) return { emoji: '😊', label: '통증 거의 없음 / 편안함', color: 'text-emerald-500' };
    if (score <= 5) return { emoji: '😐', label: '약한 뻐근함 / 견딜만함', color: 'text-amber-500' };
    if (score <= 7) return { emoji: '😣', label: '중등도 통증 / 일상 불편', color: 'text-orange-500' };
    return { emoji: '😭', label: '심한 통증 / 병원 상담 권장', color: 'text-rose-500' };
  };

  const currentFeedback = getVasEmoji(vasScore);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];

    addDailyLog({
      date: today,
      prescriptionId: prescriptionId || 'rx-2024-001',
      vasScore: vasScore,
      conditionText: conditionText || '홈케어 운동 루틴을 성실히 완료하였습니다.',
      completedExerciseIds: completedExerciseIds.length > 0 ? completedExerciseIds : ['ex-knee-qset', 'ex-knee-heel-slide'],
      isAllCompleted: true,
      therapistFeedback: '기록이 접수되었습니다. 다음 치료 시 경과를 확인하겠습니다.'
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="오늘의 재활 통증 일지 기록"
      subtitle="담당 물리치료사가 환자분의 통증 추이를 확인하고 다음 치료 계획에 반영합니다."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* VAS Pain Slider Section */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>현재 통증 지수 (VAS 0 ~ 10)</span>
            </div>
            <div className="text-xl font-black text-slate-900">
              VAS <span className="text-rose-600">{vasScore.toFixed(1)}</span>
            </div>
          </div>

          {/* Emoji State Feedback */}
          <div className="text-center py-3">
            <span className="text-4xl">{currentFeedback.emoji}</span>
            <p className={`text-xs font-bold mt-1.5 ${currentFeedback.color}`}>
              {currentFeedback.label}
            </p>
          </div>

          {/* Slider input */}
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={vasScore}
            onChange={(e) => setVasScore(parseFloat(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-bold mt-2">
            <span>0 (무통)</span>
            <span>5 (중간)</span>
            <span>10 (극심한 통증)</span>
          </div>
        </div>

        {/* Condition Textarea */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            운동 중 관절 느낌 및 특이사항
          </label>
          <textarea
            rows={3}
            value={conditionText}
            onChange={(e) => setConditionText(e.target.value)}
            placeholder="예: 힐슬라이드 할 때 끝부분에서 살짝 찌릿했지만, 수건 누르기는 힘이 잘 들어갔습니다. 붓기는 어제보다 덜합니다."
            className="w-full rounded-2xl border border-slate-200 p-3.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Completed exercises counter */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>오늘 완료한 운동 {completedExerciseIds.length > 0 ? completedExerciseIds.length : 2}개가 함께 기록됩니다.</span>
        </div>

        {/* Submit button */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            일지 저장 및 전송
          </button>
        </div>

      </form>
    </Modal>
  );
};
