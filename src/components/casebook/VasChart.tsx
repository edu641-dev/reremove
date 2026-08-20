import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart
} from 'recharts';
import { Activity, Flame, ShieldAlert, Sparkles } from 'lucide-react';

interface VasChartProps {
  beforeVas: number;
  afterVas: number;
  weeklyProgress?: { week: string; vas: number; note: string }[];
  title?: string;
  showDetails?: boolean;
}

export const VasChart: React.FC<VasChartProps> = ({
  beforeVas,
  afterVas,
  weeklyProgress,
  title = '주차별 통증 지수 (VAS) 경과 추이',
  showDetails = true,
}) => {
  // If weekly progress is not provided, generate a standard 4-point curve
  const chartData = weeklyProgress && weeklyProgress.length > 0
    ? weeklyProgress
    : [
        { week: '시작 전', vas: beforeVas, note: '초기 통증 극심' },
        { week: '2주차', vas: +(beforeVas * 0.75).toFixed(1), note: '도수 가동술 적용 후 완화' },
        { week: '5주차', vas: +(beforeVas * 0.45).toFixed(1), note: '홈케어 운동 병행' },
        { week: '종결 시', vas: afterVas, note: '일상생활 통증 소실' },
      ];

  const vasReduction = +(beforeVas - afterVas).toFixed(1);
  const reductionPercent = Math.round((vasReduction / beforeVas) * 100);

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
      
      {/* Header with summary stats */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
            <Flame className="w-4 h-4" />
            <span>VAS Pain Scale (0~10 시각통증척도)</span>
          </div>
          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
            {title}
          </h4>
        </div>

        {/* Reduction badge */}
        <div className="flex items-center gap-2 bg-rose-50 border border-rose-200/70 px-3 py-1.5 rounded-xl">
          <span className="text-xs text-rose-700 font-semibold">통증 완화율</span>
          <span className="text-sm font-black text-rose-600">
            -{vasReduction}점 ({reductionPercent}%)
          </span>
        </div>
      </div>

      {/* Comparison Pills */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="bg-rose-50/50 p-2.5 rounded-xl border border-rose-100 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">초기 통증 (Before)</span>
          <span className="text-base font-black text-rose-600">VAS {beforeVas}</span>
        </div>
        <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">현재 통증 (After)</span>
          <span className="text-base font-black text-emerald-600">VAS {afterVas}</span>
        </div>
      </div>

      {/* Recharts Curve */}
      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="vasGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="week" 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              domain={[0, 10]} 
              ticks={[0, 2, 4, 6, 8, 10]}
              tick={{ fontSize: 11, fill: '#64748b' }} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs max-w-xs">
                      <p className="font-bold text-emerald-400">{data.week}</p>
                      <p className="text-sm font-extrabold mt-0.5 text-white">
                        통증 지수: <span className="text-rose-400">{data.vas} / 10</span>
                      </p>
                      {data.note && (
                        <p className="text-slate-300 mt-1 text-[11px] leading-relaxed border-t border-slate-700/60 pt-1">
                          💬 {data.note}
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="vas"
              stroke="#f43f5e"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#vasGrad)"
              dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 6, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {showDetails && weeklyProgress && (
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
          <p className="text-xs font-bold text-slate-500 mb-2">치료 주차별 임상 노트</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {weeklyProgress.map((wp, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-slate-50 text-slate-700 flex items-start gap-2 border border-slate-100">
                <span className="font-bold text-slate-900 shrink-0">{wp.week}:</span>
                <span className="text-slate-600 line-clamp-1">{wp.note}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
