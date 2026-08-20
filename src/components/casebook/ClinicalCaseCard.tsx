import React from 'react';
import { ClinicalCase } from '../../types';
import { RomGoniometerViewer } from './RomGoniometerViewer';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { 
  Heart, 
  Calendar, 
  UserCheck, 
  Activity, 
  ChevronRight, 
  Share2, 
  Sparkles,
  Stethoscope
} from 'lucide-react';
import { useAppStore } from '../../store/useStore';

interface ClinicalCaseCardProps {
  caseData: ClinicalCase;
  showTherapistLink?: boolean;
}

export const ClinicalCaseCard: React.FC<ClinicalCaseCardProps> = ({ 
  caseData, 
  showTherapistLink = true 
}) => {
  const { viewCaseDetail, viewTherapistDetail, likeCase, state } = useAppStore();

  const therapist = state.therapists.find(t => t.id === caseData.therapistId);
  const diffAngle = caseData.romData.afterAngle - caseData.romData.beforeAngle;
  const vasDiff = +(caseData.vasData.beforeVas - caseData.vasData.afterVas).toFixed(1);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Header */}
      <div className="p-6 pb-4">
        
        {/* Meta badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/60">
              {caseData.bodyPart === 'knee' ? '무릎' :
               caseData.bodyPart === 'shoulder' ? '어깨' :
               caseData.bodyPart === 'spine' ? '척추·체형' :
               caseData.bodyPart === 'lower_back' ? '허리' :
               caseData.bodyPart === 'neck' ? '목' : '발목'} 재활
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
              {caseData.patientProfile.ageGroup} {caseData.patientProfile.gender}
            </span>
          </div>

          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {caseData.publishedAt}
          </span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => viewCaseDetail(caseData.id)}
          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 cursor-pointer leading-snug"
        >
          {caseData.title}
        </h3>

        {/* Diagnosis & Summary */}
        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
          {caseData.summary}
        </p>

        {/* Before & After Quick Grid */}
        <div className="grid grid-cols-2 gap-2.5 mt-5">
          
          {/* ROM Metric Card */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span className="font-semibold text-slate-700">관절 각도 (ROM)</span>
              <span className="text-emerald-600 font-bold">+{diffAngle}{caseData.romData.unit}</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-amber-600 font-bold line-through">
                {caseData.romData.beforeAngle}{caseData.romData.unit}
              </span>
              <span className="text-xs text-slate-400">➔</span>
              <span className="text-base font-black text-emerald-600">
                {caseData.romData.afterAngle}{caseData.romData.unit}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate mt-0.5">
              {caseData.romData.jointName}
            </p>
          </div>

          {/* VAS Pain Metric Card */}
          <div className="p-3 rounded-2xl bg-rose-50/40 border border-rose-100">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span className="font-semibold text-rose-800">통증 지수 (VAS)</span>
              <span className="text-rose-600 font-bold">-{vasDiff}</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-rose-600 font-bold">
                {caseData.vasData.beforeVas}
              </span>
              <span className="text-xs text-slate-400">➔</span>
              <span className="text-base font-black text-emerald-600">
                {caseData.vasData.afterVas}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate mt-0.5">
              0(무통) ~ 10(극심)
            </p>
          </div>

        </div>

        {/* Applied Intervention Badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {caseData.interventions.slice(0, 2).map((item, idx) => (
            <span 
              key={idx}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/50"
            >
              ✓ {item.split('(')[0]}
            </span>
          ))}
          {caseData.interventions.length > 2 && (
            <span className="text-[11px] text-slate-400 py-1 px-1">
              +{caseData.interventions.length - 2}개 더
            </span>
          )}
        </div>

      </div>

      {/* Card Footer: Therapist Profile & CTA */}
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
        
        {/* Therapist info */}
        {therapist && (
          <div 
            onClick={() => showTherapistLink && viewTherapistDetail(therapist.id)}
            className={`flex items-center gap-2.5 ${showTherapistLink ? 'cursor-pointer hover:opacity-80' : ''}`}
          >
            <img
              src={therapist.avatarUrl}
              alt={therapist.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900">{therapist.name} 치료사</span>
                <VerifiedBadge size="sm" type="license" text="인증" />
              </div>
              <p className="text-[10px] text-slate-500 truncate max-w-[120px]">
                {therapist.clinicName}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => likeCase(caseData.id)}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors flex items-center gap-1 text-xs"
            title="도움이 된 임상 케이스"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span className="font-bold text-slate-700 text-[11px]">{caseData.likesCount}</span>
          </button>

          <button
            onClick={() => viewCaseDetail(caseData.id)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
          >
            <span>상세 분석</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
