import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAppStore } from '../../store/useStore';
import { Therapist, BodyPartId } from '../../types';
import { bodyPartsData } from '../../data/mockData';
import { Calendar, Clock, MessageSquare, Sparkles, CheckCircle, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  therapist: Therapist;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  therapist
}) => {
  const { addBooking } = useAppStore();

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-08-25');
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [bodyPart, setBodyPart] = useState<BodyPartId>(therapist.targetBodyParts[0] || 'knee');
  const [symptoms, setSymptoms] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      alert('성함과 연락처를 입력해주세요.');
      return;
    }

    addBooking({
      therapistId: therapist.id,
      therapistName: therapist.name,
      patientName,
      patientPhone,
      preferredDate,
      preferredTime,
      bodyPart,
      symptoms: symptoms || `${therapist.name} 물리치료사님께 도수치료 및 재활 상담을 신청합니다.`
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isSuccess ? "상담 예약 접수 완료" : `${therapist.name} 치료사 1:1 상담 예약`}
      subtitle={isSuccess ? "치료사님이 내용을 확인 후 연락드립니다." : `${therapist.clinicName} (${therapist.locationArea})`}
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div>
            <h4 className="text-lg font-black text-slate-900">
              예약 신청이 성공적으로 전달되었습니다!
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
              {therapist.name} 물리치료사 및 센터에서 <strong>{patientPhone}</strong> 번호로 확정 일정을 안내해 드립니다.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs space-y-1.5 max-w-xs mx-auto">
            <div className="flex justify-between">
              <span className="text-slate-500">신청 치료사</span>
              <span className="font-bold text-slate-900">{therapist.name} 치료사</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">희망 일시</span>
              <span className="font-bold text-emerald-600">{preferredDate} {preferredTime}</span>
            </div>
          </div>

          {therapist.openKakaoUrl && (
            <div className="pt-2">
              <a
                href={therapist.openKakaoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-amber-300 hover:bg-amber-400 text-amber-950 font-extrabold text-xs transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                카카오톡 1:1 오픈채팅으로 바로 문의
              </a>
            </div>
          )}

          <button
            onClick={handleClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
          >
            확인 및 닫기
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Therapist Mini Card */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <img
              src={therapist.avatarUrl}
              alt={therapist.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-900">{therapist.name}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                  면허인증
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">{therapist.clinicName}</p>
              <p className="text-[10px] text-slate-400">{therapist.consultationHours}</p>
            </div>
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                성함 *
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="홍길동"
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                휴대폰 번호 *
              </label>
              <input
                type="tel"
                required
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800"
              />
            </div>
          </div>

          {/* Preferred Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                희망 일자
              </label>
              <input
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                희망 시간
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2 text-xs"
              >
                <option value="10:00">오전 10:00</option>
                <option value="11:30">오전 11:30</option>
                <option value="14:00">오후 02:00</option>
                <option value="15:30">오후 03:30</option>
                <option value="17:00">오후 05:00</option>
                <option value="18:30">오후 06:30 (야간)</option>
              </select>
            </div>
          </div>

          {/* Body Part */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              주 통증 부위
            </label>
            <select
              value={bodyPart}
              onChange={(e) => setBodyPart(e.target.value as BodyPartId)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
            >
              {bodyPartsData.map(b => (
                <option key={b.id} value={b.id}>{b.nameKo}</option>
              ))}
            </select>
          </div>

          {/* Symptoms Memo */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              증상 및 수술/병력 메모
            </label>
            <textarea
              rows={3}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="예: 십자인대 수술 후 6주차인데 무릎이 90도 이상 안 굽혀집니다. 일상 복귀 도수치료 상담 원합니다."
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              1:1 예약 신청서 제출
            </button>
          </div>

        </form>
      )}
    </Modal>
  );
};
