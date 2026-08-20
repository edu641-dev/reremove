import React, { useState } from 'react';
import { 
  Activity, 
  Stethoscope, 
  User, 
  Search, 
  FileText, 
  Calendar, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  ClipboardList,
  RotateCcw
} from 'lucide-react';
import { useAppStore, AppTab, UserRole } from '../../store/useStore';

export const Navbar: React.FC = () => {
  const { 
    state, 
    setUserRole, 
    setActiveTab, 
    setSearchQuery,
    resetToSampleData 
  } = useAppStore();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isPatient = state.userRole === 'patient';

  const handleTabClick = (tab: AppTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleRoleToggle = (role: UserRole) => {
    setUserRole(role);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      {/* Top Notification / Role Status Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> 보건복지부 면허 인증 기반
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300">
            물리치료사 임상 브랜딩과 환자 맞춤 홈케어 처방 플랫폼
          </span>
          
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={resetToSampleData}
              title="초기 샘플 데이터로 복원"
              className="text-slate-400 hover:text-slate-200 flex items-center gap-1 text-[11px] transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> 데이터 초기화
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleTabClick('landing')}
              className="flex items-center gap-2.5 group text-left focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                    리무브
                  </span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 tracking-wider">
                    Re:Move
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                  스마트 재활 & 임상 브랜딩
                </p>
              </div>
            </button>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {isPatient ? (
              <>
                <button
                  onClick={() => handleTabClick('landing')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    state.activeTab === 'landing'
                      ? 'text-emerald-700 bg-emerald-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  홈 / 바디맵
                </button>
                <button
                  onClick={() => handleTabClick('therapists')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    state.activeTab === 'therapists'
                      ? 'text-emerald-700 bg-emerald-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  치료사 찾기
                </button>
                <button
                  onClick={() => handleTabClick('cases')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    state.activeTab === 'cases'
                      ? 'text-emerald-700 bg-emerald-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  임상 케이스북
                </button>
                <button
                  onClick={() => handleTabClick('patient-care')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    state.activeTab === 'patient-care'
                      ? 'text-emerald-700 bg-emerald-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <ClipboardList className="w-4 h-4 text-emerald-600" />
                  내 홈케어 처방전
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleTabClick('therapist-dashboard')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    state.activeTab === 'therapist-dashboard'
                      ? 'text-emerald-700 bg-emerald-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  치료사 워크스페이스
                </button>
                <button
                  onClick={() => handleTabClick('cases')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    state.activeTab === 'cases'
                      ? 'text-emerald-700 bg-emerald-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  임상 케이스 라이브러리
                </button>
                <button
                  onClick={() => handleTabClick('therapists')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    state.activeTab === 'therapists'
                      ? 'text-emerald-700 bg-emerald-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  동료 치료사 프로필
                </button>
              </>
            )}
          </nav>

          {/* Right Action Buttons & Role Switcher */}
          <div className="flex items-center gap-2.5">
            
            {/* Dual Role Switcher */}
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200/80 flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => handleRoleToggle('patient')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isPatient
                    ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-slate-200/50'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                환자 모드
              </button>
              
              <button
                type="button"
                onClick={() => handleRoleToggle('therapist')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  !isPatient
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                물리치료사 모드
              </button>
            </div>

            {/* Quick Action CTA */}
            {isPatient ? (
              <button
                onClick={() => handleTabClick('patient-care')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/20"
              >
                <Activity className="w-4 h-4" />
                오늘의 운동 시작
              </button>
            ) : (
              <button
                onClick={() => handleTabClick('therapist-dashboard')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                새 케이스 등록
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden focus:outline-hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="p-2 bg-slate-50 rounded-xl mb-2">
            <p className="text-xs font-semibold text-slate-500 mb-2 px-1">사용자 모드 선택</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleRoleToggle('patient')}
                className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 ${
                  isPatient ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-700'
                }`}
              >
                <User className="w-4 h-4" /> 환자 모드
              </button>
              <button
                onClick={() => handleRoleToggle('therapist')}
                className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 ${
                  !isPatient ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-700'
                }`}
              >
                <Stethoscope className="w-4 h-4" /> 치료사 모드
              </button>
            </div>
          </div>

          <nav className="space-y-1">
            {isPatient ? (
              <>
                <button
                  onClick={() => handleTabClick('landing')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  홈 / 바디맵 (증상 검색)
                </button>
                <button
                  onClick={() => handleTabClick('therapists')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  전문 물리치료사 매칭
                </button>
                <button
                  onClick={() => handleTabClick('cases')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  임상 케이스북 (ROM / 통증 변화)
                </button>
                <button
                  onClick={() => handleTabClick('patient-care')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold bg-emerald-50 text-emerald-800 flex items-center justify-between"
                >
                  <span>내 홈케어 처방전 & 재활 일지</span>
                  <Activity className="w-4 h-4 text-emerald-600" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleTabClick('therapist-dashboard')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 text-white flex items-center justify-between"
                >
                  <span>치료사 전용 워크스페이스</span>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </button>
                <button
                  onClick={() => handleTabClick('cases')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  임상 케이스 라이브러리
                </button>
                <button
                  onClick={() => handleTabClick('therapists')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  동료 치료사 프로필
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
