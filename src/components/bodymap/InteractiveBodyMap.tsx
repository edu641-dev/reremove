import React, { useState } from 'react';
import { BodyPartId, BodyPartInfo } from '../../types';
import { bodyPartsData } from '../../data/mockData';
import { 
  Activity, 
  ChevronRight, 
  Stethoscope, 
  FileText, 
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAppStore } from '../../store/useStore';

interface InteractiveBodyMapProps {
  onSelectBodyPart?: (part: BodyPartId) => void;
}

export const InteractiveBodyMap: React.FC<InteractiveBodyMapProps> = ({ onSelectBodyPart }) => {
  const { 
    state, 
    setSelectedBodyPart, 
    setActiveTab,
    viewTherapistDetail 
  } = useAppStore();

  const [activePartId, setActivePartId] = useState<BodyPartId>(
    state.selectedBodyPart === 'all' ? 'knee' : state.selectedBodyPart
  );

  const currentPartInfo = bodyPartsData.find(b => b.id === activePartId) || bodyPartsData[0];

  // Filter therapists and cases related to this body part
  const matchingTherapists = state.therapists.filter(t => t.targetBodyParts.includes(activePartId));
  const matchingCases = state.clinicalCases.filter(c => c.bodyPart === activePartId);

  const handleSelectPart = (id: BodyPartId) => {
    setActivePartId(id);
    setSelectedBodyPart(id);
    if (onSelectBodyPart) {
      onSelectBodyPart(id);
    }
  };

  const handleGoToTherapists = () => {
    setSelectedBodyPart(activePartId);
    setActiveTab('therapists');
  };

  const handleGoToCases = () => {
    setSelectedBodyPart(activePartId);
    setActiveTab('cases');
  };

  // Body map pin coordinates on SVG (viewBox 0 0 320 540)
  const pins: { id: BodyPartId; x: number; y: number; label: string; side?: 'left' | 'right' }[] = [
    { id: 'neck', x: 160, y: 72, label: '목 (경추)', side: 'right' },
    { id: 'shoulder', x: 110, y: 115, label: '어깨 (견관절)', side: 'left' },
    { id: 'spine', x: 160, y: 155, label: '척추·체형', side: 'right' },
    { id: 'elbow', x: 80, y: 200, label: '팔꿈치', side: 'left' },
    { id: 'lower_back', x: 160, y: 225, label: '허리 (요추)', side: 'right' },
    { id: 'hip', x: 130, y: 275, label: '골반·고관절', side: 'left' },
    { id: 'knee', x: 135, y: 390, label: '무릎 (슬관절)', side: 'left' },
    { id: 'ankle', x: 140, y: 495, label: '발목·발', side: 'right' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
      
      {/* Header bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-6 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            인터랙티브 증상 탐색기
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            현재 어디가 불편하신가요?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            통증이 있는 인체 부위를 클릭하면 검증된 전문 치료사와 실제 임상 회복 케이스를 즉시 매칭합니다.
          </p>
        </div>

        {/* Quick horizontal category buttons for small screens */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {bodyPartsData.map((part) => (
            <button
              key={part.id}
              onClick={() => handleSelectPart(part.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePartId === part.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {part.nameKo.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        
        {/* Left / Center: Interactive SVG Body Map (Col 5) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-emerald-50/30 p-6 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-slate-200">
          <div className="relative w-full max-w-[300px] h-[480px]">
            
            {/* SVG Human Silhouette Graphic */}
            <svg 
              viewBox="0 0 320 540" 
              className="w-full h-full drop-shadow-md select-none"
            >
              <defs>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Head */}
              <circle cx="160" cy="42" r="26" fill="url(#bodyGrad)" />
              {/* Neck */}
              <path d="M150 68 L170 68 L174 88 L146 88 Z" fill="url(#bodyGrad)" />
              {/* Torso */}
              <path 
                d="M146 88 Q110 95 86 120 Q80 135 78 180 Q105 185 110 240 Q110 270 120 290 L200 290 Q210 270 210 240 Q215 185 242 180 Q240 135 234 120 Q210 95 174 88 Z" 
                fill="url(#bodyGrad)" 
                opacity="0.85"
              />
              {/* Arms */}
              <path d="M78 125 L65 190 L52 260 L62 265 L78 200 L90 140 Z" fill="url(#bodyGrad)" opacity="0.75" />
              <path d="M242 125 L255 190 L268 260 L258 265 L242 200 L230 140 Z" fill="url(#bodyGrad)" opacity="0.75" />
              
              {/* Pelvis & Legs */}
              <path 
                d="M120 290 L115 390 L125 490 L145 490 L145 390 L155 310 L165 310 L175 390 L175 490 L195 490 L205 390 L200 290 Z" 
                fill="url(#bodyGrad)" 
                opacity="0.9"
              />

              {/* Connecting pulse lines for active part */}
              {pins.map((pin) => {
                const isActive = activePartId === pin.id;
                return (
                  <g key={pin.id} className="cursor-pointer" onClick={() => handleSelectPart(pin.id)}>
                    {/* Ripple ring when active */}
                    {isActive && (
                      <>
                        <circle 
                          cx={pin.x} 
                          cy={pin.y} 
                          r="20" 
                          fill="rgba(16, 185, 129, 0.25)" 
                          className="animate-ping"
                        />
                        <circle 
                          cx={pin.x} 
                          cy={pin.y} 
                          r="14" 
                          fill="rgba(16, 185, 129, 0.4)" 
                        />
                      </>
                    )}
                    
                    {/* Pin Center */}
                    <circle 
                      cx={pin.x} 
                      cy={pin.y} 
                      r={isActive ? "9" : "6"} 
                      fill={isActive ? "#059669" : "#ffffff"} 
                      stroke={isActive ? "#ffffff" : "#059669"} 
                      strokeWidth={isActive ? "2.5" : "2"}
                      className="transition-all duration-300 hover:scale-125"
                    />
                    
                    {/* Mini pulse inner dot */}
                    <circle 
                      cx={pin.x} 
                      cy={pin.y} 
                      r={isActive ? "3.5" : "2"} 
                      fill={isActive ? "#ffffff" : "#059669"} 
                    />
                  </g>
                );
              })}
            </svg>

            {/* Float badges on SVG */}
            {pins.map((pin) => {
              const isActive = activePartId === pin.id;
              if (!isActive) return null;
              
              return (
                <div 
                  key={pin.id}
                  className="absolute pointer-events-none z-10 animate-bounce"
                  style={{
                    left: `${(pin.x / 320) * 100}%`,
                    top: `${(pin.y / 540) * 100 - 9}%`,
                    transform: 'translate(-50%, -100%)',
                  }}
                >
                  <div className="bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg border border-emerald-400/50 flex items-center gap-1 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {pin.label}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            초록색 핀을 누르면 상세 증상 및 치료사를 확인합니다.
          </p>
        </div>

        {/* Right Details Panel (Col 7) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div>
            {/* Active Body Part Info Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  {currentPartInfo.nameEn}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                  {currentPartInfo.nameKo}
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  {currentPartInfo.description}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-slate-500 font-medium">검증된 전문 치료사</span>
                <p className="text-xl font-extrabold text-emerald-600">
                  {matchingTherapists.length} <span className="text-xs font-normal text-slate-500">명 대기 중</span>
                </p>
              </div>
            </div>

            {/* Common Conditions Tag Grid */}
            <div className="mt-5">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                대표적인 증상 및 재활 질환
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentPartInfo.commonConditions.map((condition, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-semibold transition-colors border border-slate-200/60"
                  >
                    #{condition}
                  </span>
                ))}
              </div>
            </div>

            {/* Matched Therapists Preview */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                  해당 부위 추천 치료사
                </h4>
                <button
                  onClick={handleGoToTherapists}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-0.5"
                >
                  전체 보기 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingTherapists.slice(0, 2).map((therapist) => (
                  <div
                    key={therapist.id}
                    onClick={() => viewTherapistDetail(therapist.id)}
                    className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer bg-white group flex items-center gap-3"
                  >
                    <img
                      src={therapist.avatarUrl}
                      alt={therapist.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 truncate">
                          {therapist.name} 치료사
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                          경력 {therapist.experienceYears}년
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {therapist.clinicName}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600">
                        <span className="text-amber-500 font-bold">★ {therapist.rating}</span>
                        <span className="text-slate-400">·</span>
                        <span>케이스 {therapist.caseCount}건</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Clinical Case Preview */}
            {matchingCases.length > 0 && (
              <div className="mt-5 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-emerald-600" />
                    실제 임상 회복 사례 (Before & After)
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">
                    ROM {matchingCases[0].romData.beforeAngle}° ➔ {matchingCases[0].romData.afterAngle}° 회복
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                  {matchingCases[0].title}
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-600">
                  <span className="text-rose-500 font-bold">
                    통증(VAS): {matchingCases[0].vasData.beforeVas} ➔ {matchingCases[0].vasData.afterVas}
                  </span>
                  <span className="text-slate-400">|</span>
                  <span>{matchingCases[0].treatmentPeriod}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleGoToTherapists}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20 transition-all"
            >
              <Stethoscope className="w-4 h-4" />
              {currentPartInfo.nameKo.split(' ')[0]} 전문 물리치료사 매칭받기
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleGoToCases}
              className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4" />
              임상 케이스북 열람
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
