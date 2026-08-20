import React from 'react';
import { Activity, ShieldCheck, HeartHandshake, FileText, Phone, Award } from 'lucide-react';
import { useAppStore } from '../../store/useStore';

export const Footer: React.FC = () => {
  const { setActiveTab } = useAppStore();

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black">
                <Activity className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">리무브 (Re:Move)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              물리치료사의 정교한 임상 경험을 투명하게 입증하고, 퇴원 후 환자의 재활 홈케어를 지속 가능하게 돕는 스마트 물리치료 플랫폼입니다.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>보건복지부 물리치료사 면허 인증 시스템</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              환자 맞춤 서비스
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('landing')} className="hover:text-emerald-400 transition-colors">
                  인터랙티브 인체 부위별 질환 탐색
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('therapists')} className="hover:text-emerald-400 transition-colors">
                  증상별 전문 물리치료사 매칭
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('cases')} className="hover:text-emerald-400 transition-colors">
                  임상 케이스(비포/애프터 ROM) 열람
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('patient-care')} className="hover:text-emerald-400 transition-colors">
                  내 모바일 홈케어 처방전 & 타이머
                </button>
              </li>
            </ul>
          </div>

          {/* Therapist Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              물리치료사 전용
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('therapist-dashboard')} className="hover:text-emerald-400 transition-colors">
                  치료사 임상 포트폴리오 관리
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('therapist-dashboard')} className="hover:text-emerald-400 transition-colors">
                  ROM & VAS 임상 케이스북 발행
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('therapist-dashboard')} className="hover:text-emerald-400 transition-colors">
                  처방형 홈케어 운동 처방전 발급기
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('therapist-dashboard')} className="hover:text-emerald-400 transition-colors">
                  환자 통증 일지 & 호전도 모니터링
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Society Info */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              인증 및 협력 학회
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                대한정형도수물리치료학회 (KAOMPT)
              </p>
              <p className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                국제 슈로스 척추측만 (ISST Schroth)
              </p>
              <p className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                국제 고유수용성신경근촉진법 (IPNFA)
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500">
                고객센터: 1544-0982 (평일 09:00 - 18:00)<br />
                이메일: support@remove-care.kr
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-800 pt-8 text-xs text-slate-500 leading-relaxed space-y-2">
          <p>
            * 리무브(Re:Move)는 공인된 물리치료사의 합법적 임상 포트폴리오 관리 및 환자 교육용 홈케어 가이드 플랫폼입니다. 본 서비스에서 제공하는 정보 및 운동 가이드는 의사의 진단 및 치료를 대신할 수 없으며, 급성 손상이나 심한 통증 발생 시 전문 의료기관의 진료를 받으셔야 합니다.
          </p>
          <p className="text-slate-600">
            © 2026 Re:Move Inc. All rights reserved. 의료법 및 보건의료기본법 가이드라인 준수.
          </p>
        </div>
      </div>
    </footer>
  );
};
