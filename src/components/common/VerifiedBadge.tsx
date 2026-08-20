import React from 'react';
import { CheckCircle, Award, ShieldCheck, FileCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  type?: 'license' | 'society' | 'expert';
  text?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ 
  type = 'license', 
  text, 
  className = '',
  size = 'md'
}) => {
  const getBadgeConfig = () => {
    switch (type) {
      case 'license':
        return {
          icon: <ShieldCheck className={size === 'sm' ? "w-3.5 h-3.5" : "w-4 h-4"} />,
          defaultText: '보건복지부 면허 인증',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'society':
        return {
          icon: <Award className={size === 'sm' ? "w-3.5 h-3.5" : "w-4 h-4"} />,
          defaultText: '정회원·학회 이수 완료',
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500'
        };
      case 'expert':
        return {
          icon: <CheckCircle className={size === 'sm' ? "w-3.5 h-3.5" : "w-4 h-4"} />,
          defaultText: '임상 케이스 검증 치료사',
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dot: 'bg-indigo-500'
        };
    }
  };

  const config = getBadgeConfig();
  const label = text || config.defaultText;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2'
  }[size];

  return (
    <span 
      className={`inline-flex items-center font-medium rounded-full border shadow-xs transition-all ${config.bg} ${sizeClasses} ${className}`}
      title="리무브 면허증 및 수료증 원본 대조 검증 완료"
    >
      <span className="shrink-0">{config.icon}</span>
      <span className="truncate">{label}</span>
    </span>
  );
};
