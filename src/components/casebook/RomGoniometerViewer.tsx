import React from 'react';
import { Activity, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface RomGoniometerViewerProps {
  jointName: string;
  beforeAngle: number;
  afterAngle: number;
  normalRange: number;
  unit?: string;
  compact?: boolean;
}

export const RomGoniometerViewer: React.FC<RomGoniometerViewerProps> = ({
  jointName,
  beforeAngle,
  afterAngle,
  normalRange,
  unit = '°',
  compact = false
}) => {
  const diff = afterAngle - beforeAngle;
  const improvementPercent = Math.round((diff / beforeAngle) * 100);
  const normalPercentage = Math.min(100, Math.round((afterAngle / normalRange) * 100));

  if (compact) {
    return (
      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-bold text-slate-700">{jointName}</span>
          <span className="text-emerald-600 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +{diff}{unit} ({improvementPercent > 0 ? `+${improvementPercent}%` : `${improvementPercent}%`})
          </span>
        </div>
        
        {/* Progress bar visual */}
        <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden flex">
          {/* Before range */}
          <div 
            style={{ width: `${(beforeAngle / normalRange) * 100}%` }} 
            className="bg-amber-500 h-full relative"
            title={`치료 전: ${beforeAngle}${unit}`}
          />
          {/* Gained range */}
          <div 
            style={{ width: `${(diff / normalRange) * 100}%` }} 
            className="bg-emerald-500 h-full relative animate-pulse"
            title={`개선폭: +${diff}${unit}`}
          />
        </div>

        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-medium">
          <span className="text-amber-600 font-bold">치료 전 {beforeAngle}{unit}</span>
          <span className="text-emerald-700 font-bold">치료 후 {afterAngle}{unit}</span>
          <span>정상 {normalRange}{unit}</span>
        </div>
      </div>
    );
  }

  // Full Goniometer Gauge Viewer
  // Using semi-circle SVG meter (0 to 180 degrees)
  const radius = 60;
  const strokeWidth = 12;
  const normalizedNormal = Math.min(180, (normalRange / (unit === '%' ? 100 : 180)) * 180);
  const normalizedBefore = Math.min(180, (beforeAngle / (unit === '%' ? 100 : 180)) * 180);
  const normalizedAfter = Math.min(180, (afterAngle / (unit === '%' ? 100 : 180)) * 180);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl border border-slate-700 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
            Range of Motion (ROM 각도계)
          </span>
          <h4 className="text-base font-extrabold text-white">{jointName}</h4>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          정상 대비 {normalPercentage}% 회복
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        
        {/* Visual Goniometer Dial (SVG) */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-36 h-24 overflow-hidden">
            <svg viewBox="0 0 160 90" className="w-full h-full">
              {/* Background Arc */}
              <path
                d="M 15 85 A 65 65 0 0 1 145 85"
                fill="none"
                stroke="#334155"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Before Arc (Amber) */}
              <path
                d="M 15 85 A 65 65 0 0 1 145 85"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="14"
                strokeDasharray="204"
                strokeDashoffset={204 - (204 * (beforeAngle / (unit === '%' ? 100 : 180)) * (180/180))}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />

              {/* After Arc (Emerald) */}
              <path
                d="M 15 85 A 65 65 0 0 1 145 85"
                fill="none"
                stroke="#10b981"
                strokeWidth="14"
                strokeDasharray="204"
                strokeDashoffset={204 - (204 * (afterAngle / (unit === '%' ? 100 : 180)) * (180/180))}
                strokeLinecap="round"
                opacity="0.85"
                className="transition-all duration-1000"
              />
            </svg>

            {/* Center Angle Display */}
            <div className="absolute bottom-0 inset-x-0 text-center">
              <span className="text-2xl font-black text-white">{afterAngle}{unit}</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400 mt-1">관절 가동성 계측 지표</span>
        </div>

        {/* Comparison Metrics */}
        <div className="sm:col-span-7 space-y-2.5">
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-xs text-slate-300">치료 전 (Before)</span>
            </div>
            <span className="text-sm font-bold text-amber-400">{beforeAngle}{unit}</span>
          </div>

          <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs text-emerald-200 font-semibold">치료 후 (After)</span>
            </div>
            <div className="text-right">
              <span className="text-base font-black text-emerald-400">{afterAngle}{unit}</span>
              <span className="text-[10px] text-emerald-300 font-bold ml-1.5">(+{diff}{unit})</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>정상 기준치 (Standard)</span>
            <span className="font-semibold text-slate-300">{normalRange}{unit}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
