import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAppStore } from '../../store/useStore';
import { ExerciseItem, PrescribedExercise } from '../../types';
import { exercisesData } from '../../data/mockData';
import { FilePlus, Check, Sparkles, Plus, Dumbbell } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NewPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPrescriptionModal: React.FC<NewPrescriptionModalProps> = ({ isOpen, onClose }) => {
  const { state, addPrescription, setActiveTab } = useAppStore();
  const currentTherapist = state.therapists.find(t => t.id === state.currentTherapistId) || state.therapists[0];

  const [patientName, setPatientName] = useState('김민수');
  const [patientPhone, setPatientPhone] = useState('010-9876-5432');
  const [diagnosis, setDiagnosis] = useState('우측 무릎 전방십자인대 재건술 후 6주차 관절구축');
  const [targetGoal, setTargetGoal] = useState('무릎 신전 0도 완전 확보 및 굴곡 125도 점진 증진, 내측광근 활성화');
  const [specialInstructions, setSpecialInstructions] = useState('운동 직후 15분간 냉찜질을 적용하고, 통증 지수(VAS)가 5점을 넘으면 중단 후 기록해 주세요.');

  // Selected exercises selection
  const [selectedExMap, setSelectedExMap] = useState<Record<string, {
    exercise: ExerciseItem;
    sets: number;
    reps: number;
    holdSeconds: number;
    frequency: string;
    therapistNotes: string;
  }>>({
    'ex-knee-qset': {
      exercise: exercisesData[0],
      sets: 3,
      reps: 15,
      holdSeconds: 10,
      frequency: '하루 3회 (아침, 점심, 저녁)',
      therapistNotes: '수건을 누를 때 엉덩이에 과도하게 힘이 들어가지 않도록 허벅지 앞쪽에 집중하세요.'
    },
    'ex-knee-heel-slide': {
      exercise: exercisesData[1],
      sets: 3,
      reps: 12,
      holdSeconds: 5,
      frequency: '하루 2회 (오후, 취침 전)',
      therapistNotes: '발뒤꿈치를 당길 때 무리하게 꺾지 말고 부드럽게 가동 범위를 늘립니다.'
    }
  });

  const toggleExercise = (ex: ExerciseItem) => {
    setSelectedExMap(prev => {
      const copy = { ...prev };
      if (copy[ex.id]) {
        delete copy[ex.id];
      } else {
        copy[ex.id] = {
          exercise: ex,
          sets: 3,
          reps: 12,
          holdSeconds: ex.durationSeconds || 10,
          frequency: '하루 2회',
          therapistNotes: `${ex.name} 시 올바른 자세를 유지하고 호흡을 멈추지 마세요.`
        };
      }
      return copy;
    });
  };

  const handleUpdateItem = (id: string, field: string, val: any) => {
    setSelectedExMap(prev => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          [field]: val
        }
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const exList: PrescribedExercise[] = Object.values(selectedExMap);
    if (exList.length === 0) {
      alert('하나 이상의 홈케어 운동을 선택해주세요.');
      return;
    }

    addPrescription({
      patientName,
      patientPhone,
      therapistId: currentTherapist.id,
      therapistName: `${currentTherapist.name} 물리치료사`,
      clinicName: currentTherapist.clinicName,
      diagnosis,
      targetGoal,
      exercises: exList,
      specialInstructions,
      status: 'active'
    });

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="처방형 스마트 홈케어 운동 처방전 발급"
      subtitle="환자 상태에 최적화된 운동 영상 카드와 세트/주의사항을 지정해 모바일로 전송합니다."
      maxWidth="3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Patient and Clinic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              환자 이름 *
            </label>
            <input
              type="text"
              required
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              환자 연락처 *
            </label>
            <input
              type="tel"
              required
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800"
            />
          </div>
        </div>

        {/* Diagnosis & Target Goal */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              진단명 및 재활 단계 *
            </label>
            <input
              type="text"
              required
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              이번 회차 치료 목표 (Target Goal)
            </label>
            <input
              type="text"
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800"
            />
          </div>
        </div>

        {/* Exercise Selection Library */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-emerald-600" />
              운동 라이브러리에서 선택 ({Object.keys(selectedExMap).length}개 선택됨)
            </label>
            <span className="text-[11px] text-slate-400">클릭하여 추가/제거</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 bg-slate-50 rounded-2xl border border-slate-200">
            {exercisesData.map((ex) => {
              const isSelected = !!selectedExMap[ex.id];
              return (
                <div
                  key={ex.id}
                  onClick={() => toggleExercise(ex)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${isSelected ? 'bg-emerald-600 text-white' : 'border border-slate-300'}`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <span className="truncate">{ex.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                    {ex.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Exercises Detail Settings */}
        {Object.values(selectedExMap).length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase">
              선택된 운동 세부 설정 & 1:1 코칭 메모
            </h4>
            {Object.values(selectedExMap).map((item) => (
              <div key={item.exercise.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{item.exercise.name}</span>
                  <button
                    type="button"
                    onClick={() => toggleExercise(item.exercise)}
                    className="text-[11px] text-rose-500 hover:underline"
                  >
                    제거
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 block">목표 세트</label>
                    <input
                      type="number"
                      value={item.sets}
                      onChange={(e) => handleUpdateItem(item.exercise.id, 'sets', parseInt(e.target.value) || 1)}
                      className="w-full rounded-lg border border-slate-200 p-1.5 text-xs text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block">1회 유지(초)</label>
                    <input
                      type="number"
                      value={item.holdSeconds}
                      onChange={(e) => handleUpdateItem(item.exercise.id, 'holdSeconds', parseInt(e.target.value) || 5)}
                      className="w-full rounded-lg border border-slate-200 p-1.5 text-xs text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block">수행 빈도</label>
                    <input
                      type="text"
                      value={item.frequency}
                      onChange={(e) => handleUpdateItem(item.exercise.id, 'frequency', e.target.value)}
                      className="w-full rounded-lg border border-slate-200 p-1.5 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    value={item.therapistNotes}
                    onChange={(e) => handleUpdateItem(item.exercise.id, 'therapistNotes', e.target.value)}
                    placeholder="환자에게 전달할 주의사항 메모"
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs bg-white text-slate-700"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Special Instructions */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            환자 전체 안내 및 얼음/온찜질 지침
          </label>
          <textarea
            rows={2}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            처방전 모바일 발급 및 전송
          </button>
        </div>

      </form>
    </Modal>
  );
};
