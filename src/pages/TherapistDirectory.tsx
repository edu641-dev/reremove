import React from 'react';
import { useAppStore } from '../store/useStore';
import { bodyPartsData } from '../data/mockData';
import { Specialization, BodyPartId } from '../types';
import { VerifiedBadge } from '../components/common/VerifiedBadge';
import { 
  Search, 
  Filter, 
  MapPin, 
  Stethoscope, 
  Award, 
  FileText, 
  ChevronRight, 
  Calendar, 
  Star,
  Sparkles
} from 'lucide-react';

const specialtiesList: (Specialization | 'all')[] = [
  'all',
  '도수치료',
  '스포츠 재활',
  '수술 후 재활',
  '척추측만·체형교정',
  '신경계 재활',
  '만성 통증 관리'
];

export const TherapistDirectory: React.FC = () => {
  const { 
    state, 
    setSelectedBodyPart, 
    setSelectedSpecialty, 
    setSearchQuery, 
    viewTherapistDetail 
  } = useAppStore();

  const filteredTherapists = state.therapists.filter((t) => {
    // Body part filter
    if (state.selectedBodyPart !== 'all' && !t.targetBodyParts.includes(state.selectedBodyPart)) {
      return false;
    }
    // Specialty filter
    if (state.selectedSpecialty !== 'all' && !t.specializations.includes(state.selectedSpecialty as Specialization)) {
      return false;
    }
    // Search query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      const matchName = t.name.toLowerCase().includes(q);
      const matchClinic = t.clinicName.toLowerCase().includes(q);
      const matchBio = t.bio.toLowerCase().includes(q);
      const matchSpecialty = t.specializations.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchClinic && !matchBio && !matchSpecialty) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Title & Search Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>검증된 물리치료사 매칭</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            전문 물리치료사 찾기
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            보건복지부 면허와 정형도수물리치료 학회 이수가 검증된 물리치료사를 직접 비교하고 선택하세요.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={state.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="치료사 이름, 병원명, 질환 검색..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="space-y-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        
        {/* Body Part Filter */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            부위별 필터
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedBodyPart('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  state.selectedBodyPart === part.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {part.nameKo.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Specialty Filter */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            주력 전문 분야
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {specialtiesList.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  state.selectedSpecialty === spec
                    ? 'bg-teal-600 text-white font-bold shadow-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {spec === 'all' ? '전체 분야' : spec}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>총 <strong className="text-slate-900">{filteredTherapists.length}명</strong>의 전문 물리치료사가 검색되었습니다.</span>
      </div>

      {/* Therapists Grid */}
      {filteredTherapists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTherapists.map((therapist) => (
            <div
              key={therapist.id}
              onClick={() => viewTherapistDetail(therapist.id)}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-card hover:shadow-xl hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                
                {/* Header: Avatar, Name, Verification, Experience */}
                <div className="flex items-start gap-4">
                  <img
                    src={therapist.avatarUrl}
                    alt={therapist.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-200 group-hover:scale-105 transition-transform shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700">
                          {therapist.name}
                        </h3>
                        <span className="text-xs text-slate-500 font-medium">물리치료사</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                        경력 {therapist.experienceYears}년
                      </span>
                    </div>

                    <p className="text-xs font-medium text-slate-600 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {therapist.clinicName} ({therapist.locationArea})
                    </p>

                    <div className="mt-2">
                      <VerifiedBadge type="license" text="보건복지부 면허 인증" size="sm" />
                    </div>
                  </div>
                </div>

                {/* Title & Bio */}
                <div className="mt-5">
                  <h4 className="text-sm font-bold text-slate-800">
                    {therapist.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {therapist.bio}
                  </p>
                </div>

                {/* Key Certifications Timeline / Highlights */}
                <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    공인 학회 및 이수 이력
                  </span>
                  {therapist.certifications.slice(0, 2).map((cert) => (
                    <div key={cert.id} className="flex items-center gap-2 text-xs text-slate-700">
                      <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800 truncate">{cert.title}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">({cert.year})</span>
                    </div>
                  ))}
                </div>

                {/* Specialization Badges */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {therapist.specializations.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-100"
                    >
                      #{spec}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Meta & Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {therapist.rating}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="font-semibold text-slate-700">
                    케이스 {therapist.caseCount}건
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    프로필 및 1:1 상담 예약
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <Stethoscope className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">검색 조건에 맞는 치료사가 없습니다.</h3>
          <p className="text-xs text-slate-500">부위 또는 전문 분야 필터를 변경해 보세요.</p>
        </div>
      )}

    </div>
  );
};
