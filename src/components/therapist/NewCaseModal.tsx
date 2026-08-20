import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAppStore } from '../../store/useStore';
import { BodyPartId, ClinicalCase } from '../../types';
import { bodyPartsData } from '../../data/mockData';
import { Sparkles, Activity, FileCheck, Flame, Plus, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewCaseModal: React.FC<NewCaseModalProps> = ({ isOpen, onClose }) => {
  const { state, addClinicalCase, viewCaseDetail } = useAppStore();

  const currentTherapist = state.therapists.find(t => t.id === state.currentTherapistId) || state.therapists[0];

  const [bodyPart, setBodyPart] = useState<BodyPartId>('knee');
  const [title, setTitle] = useState('');
  const [patientGender, setPatientGender] = useState<'남성' | '여성'>('남성');
  const [patientAgeGroup, setPatientAgeGroup] = useState('30대 초반');
  const [occupation, setOccupation] = useState('직장인');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatmentPeriod, setTreatmentPeriod] = useState('총 12회 세션 (8주간)');
  const [summary, setSummary] = useState('');

  // ROM Data
  const [jointName, setJointName] = useState('슬관절 굴곡 (Knee Flexion)');
  const [normalRange, setNormalRange] = useState<number>(140);
  const [beforeAngle, setBeforeAngle] = useState<number>(80);
  const [afterAngle, setAfterAngle] = useState<number>(135);
  const [unit, setUnit] = useState('°');

  // VAS Data
  const [beforeVas, setBeforeVas] = useState<number>(8.0);
  const [afterVas, setAfterVas] = useState<number>(1.5);

  // Interventions
  const [interventionsText, setInterventionsText] = useState('슬개골 활주 가동술, PNF 대퇴사두근 신경근 재교육, 점진적 폐쇄사슬 스쿼트');
  const [clinicalImpression, setClinicalImpression] = useState('');
  const [homecareText, setHomecareText] = useState('대퇴사두근 등척성 세팅 (Q-Setting), 수건 힐 슬라이드');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !diagnosis.trim()) {
      alert('케이스 제목과 진단명을 입력해주세요.');
      return;
    }

    const interventions = interventionsText.split(',').map(s => s.trim()).filter(Boolean);
    const homecareAssigned = homecareText.split(',').map(s => s.trim()).filter(Boolean);

    const newCaseId = addClinicalCase({
      therapistId: currentTherapist.id,
      therapistName: currentTherapist.name,
      title,
      patientProfile: {
        gender: patientGender,
        ageGroup: patientAgeGroup,
        occupation
      },
      bodyPart,
      diagnosis,
      treatmentPeriod,
      summary: summary || `${diagnosis}에 대한 정형도수치료 및 재활 홈케어 중재를 통해 정상 가동성을 회복한 임상 사례입니다.`,
      romData: {
        jointName,
        normalRange,
        beforeAngle,
        afterAngle,
        unit
      },
      vasData: {
        beforeVas,
        afterVas,
        weeklyProgress: [
          { week: '1주차', vas: beforeVas, note: '초기 통증 및 가동성 제한 극심' },
          { week: '4주차', vas: +((beforeVas + afterVas) / 2).toFixed(1), note: '도수 가동술 및 홈케어 병행으로 관절 가동성 유의미 개선' },
          { week: '종결', vas: afterVas, note: '목표 ROM 도달 및 일상 복귀' }
        ]
      },
      interventions,
      clinicalImpression: clinicalImpression || '환자의 능동적 홈케어 참여와 단계별 도수 중재가 결합되어 최적의 회복 성과를 달성했습니다.',
      homecareAssigned,
      patientReview: {
        text: '전문적인 치료와 집에서 할 수 있는 체계적인 운동 지도 덕분에 통증 없이 일상에 복귀했습니다!',
        satisfaction: 5
      }
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    onClose();
    viewCaseDetail(newCaseId);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="새 임상 케이스 (Case Study) 등록 & 발행"
      subtitle="치료 전/후 관절 가동범위(ROM)와 통증 지수(VAS) 데이터를 시각화하여 전문성을 브랜딩합니다."
      maxWidth="3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              치료 부위
            </label>
            <select
              value={bodyPart}
              onChange={(e) => setBodyPart(e.target.value as BodyPartId)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              {bodyPartsData.map(b => (
                <option key={b.id} value={b.id}>{b.nameKo}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              환자 프로필
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value as any)}
                className="rounded-xl border border-slate-200 p-2 text-xs"
              >
                <option value="남성">남성</option>
                <option value="여성">여성</option>
              </select>
              <input
                type="text"
                value={patientAgeGroup}
                onChange={(e) => setPatientAgeGroup(e.target.value)}
                placeholder="연령대 (30대)"
                className="rounded-xl border border-slate-200 p-2 text-xs"
              />
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="직업/활동"
                className="rounded-xl border border-slate-200 p-2 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Title & Diagnosis */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              케이스 제목 *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 우측 슬관절 전방십자인대 재건술 후 굴곡구축 및 보행 재활"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              상세 진단명 및 초기 상태 *
            </label>
            <input
              type="text"
              required
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="예: ACL 재건술 6주차, 슬관절 굴곡 80도 제한 및 부종"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800"
            />
          </div>
        </div>

        {/* ROM Section */}
        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>관절 가동 범위 (ROM) 전/후 각도 지표</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">측정 관절 동작</label>
              <input
                type="text"
                value={jointName}
                onChange={(e) => setJointName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">치료 전 각도 (Before)</label>
              <input
                type="number"
                value={beforeAngle}
                onChange={(e) => setBeforeAngle(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs font-bold text-amber-600"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">치료 후 각도 (After)</label>
              <input
                type="number"
                value={afterAngle}
                onChange={(e) => setAfterAngle(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs font-bold text-emerald-600"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">정상 기준치 (Normal)</label>
              <input
                type="number"
                value={normalRange}
                onChange={(e) => setNormalRange(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs"
              />
            </div>
          </div>
        </div>

        {/* VAS Section */}
        <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-800">
            <Flame className="w-4 h-4 text-rose-600" />
            <span>통증 지수 (VAS Scale 0~10)</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">치료 전 통증 (Before VAS)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={beforeVas}
                onChange={(e) => setBeforeVas(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs font-bold text-rose-600"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">치료 후 통증 (After VAS)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={afterVas}
                onChange={(e) => setAfterVas(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs font-bold text-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Interventions & Clinical Impression */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              적용된 도수/재활 중재 요법 (쉼표로 구분)
            </label>
            <input
              type="text"
              value={interventionsText}
              onChange={(e) => setInterventionsText(e.target.value)}
              placeholder="예: 슬개골 가동술, PNF 대퇴사두근 활성화, 점진적 폐쇄사슬 훈련"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              치료사 임상 소견 및 프로토콜 분석
            </label>
            <textarea
              rows={2}
              value={clinicalImpression}
              onChange={(e) => setClinicalImpression(e.target.value)}
              placeholder="임상적 의사결정 과정, 회복 속도 요인, 홈케어 처방의 중요성 등을 작성하세요."
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800"
            />
          </div>
        </div>

        {/* Action Buttons */}
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
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            케이스북에 즉시 발행
          </button>
        </div>

      </form>
    </Modal>
  );
};
