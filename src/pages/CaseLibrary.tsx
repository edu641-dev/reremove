import React, { useState } from 'react';
import { useAppStore } from '../store/useStore';
import { ClinicalCaseCard } from '../components/casebook/ClinicalCaseCard';
import { bodyPartsData } from '../data/mockData';
import { BodyPartId } from '../types';
import { NewCaseModal } from '../components/therapist/NewCaseModal';
import { 
  FileText, 
  Search, 
  Plus, 
  Sparkles, 
  Activity, 
  Filter,
  CheckCircle2
} from 'lucide-react';

export const CaseLibrary: React.FC = () => {
  const { 
    state, 
    setSelectedBodyPart, 
    setSearchQuery 
  } = useAppStore();

  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);

  const filteredCases = state.clinicalCases.filter((c) => {
    // Body part filter
    if (state.selectedBodyPart !== 'all' && c.bodyPart !== state.selectedBodyPart) {
      return false;
    }
    // Search query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchDiagnosis = c.diagnosis.toLowerCase().includes(q);
      const matchTherapist = c.therapistName.toLowerCase().includes(q);
      const matchIntervention = c.interventions.some(i => i.toLowerCase().includes(q));
      if (!matchTitle && !matchDiagnosis && !matchTherapist && !matchIntervention) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>객관적 치료 데이터 검증</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            임상 케이스 라이브러리 (Case Study)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            관절 가동범위(ROM 각도계)와 통증 지수(VAS)의 치료 전/후 변화를 투명하게 열람하세요.
          </p>
        </div>

        {/* Search & New Case Button */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={state.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="진단명, 수술명, 치료 기법 검색..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all shadow-xs"
            />
          </div>

          {state.userRole === 'therapist' && (
            <button
              onClick={() => setIsNewCaseOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              케이스 등록
            </button>
          )}
        </div>
      </div>

      {/* Body Part Filter Chips */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => setSelectedBodyPart('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            state.selectedBodyPart === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          전체 부위
        </button>
        {bodyPartsData.map((part) => (
          <button
            key={part.id}
            onClick={() => setSelectedBodyPart(part.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              state.selectedBodyPart === part.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {part.nameKo.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Cases Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>총 <strong className="text-slate-900">{filteredCases.length}건</strong>의 임상 케이스가 등록되어 있습니다.</span>
        </div>

        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((c) => (
              <ClinicalCaseCard key={c.id} caseData={c} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">검색 조건에 맞는 임상 케이스가 없습니다.</h3>
            <p className="text-xs text-slate-500">다른 부위나 키워드로 검색해 보세요.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <NewCaseModal
        isOpen={isNewCaseOpen}
        onClose={() => setIsNewCaseOpen(false)}
      />

    </div>
  );
};
