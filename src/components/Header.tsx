import React from 'react';
import { RefreshCw, Monitor, Sparkles, Key, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { HahaHohoLogo } from './HahaHohoLogo';

interface HeaderProps {
  currentStep: 'upload' | 'theme' | 'gender_age' | 'processing' | 'result';
  todayCount: number;
  displayMode: 'kiosk' | 'customer';
  onSelectDisplayMode: (mode: 'kiosk' | 'customer') => void;
  onOpenOperatorModal: () => void;
  onResetToStart: () => void;
  apiKeyConfigured?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  todayCount,
  displayMode,
  onSelectDisplayMode,
  onOpenOperatorModal,
  onResetToStart,
  apiKeyConfigured = true,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0A192F]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Festival Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onResetToStart}>
            <HahaHohoLogo size="md" variant="light" showSubtitle={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  2026 페스타 공식
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  부산 북항 바이킹 비어밤
                </span>
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight">
                바이킹 비어밤 & 하하호호 스튜디오 AI 팀
              </h1>
            </div>
          </div>

          {/* Mobile Operator Button */}
          <button
            onClick={onOpenOperatorModal}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            title="운영 관리"
          >
            <Key className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Step Indicator on Kiosk */}
        {displayMode === 'kiosk' && (
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold">
            <span className={`px-2.5 py-1 rounded-full ${currentStep === 'upload' ? 'bg-amber-500 text-slate-900 font-bold shadow-md shadow-amber-500/30' : 'bg-white/5 text-slate-400'}`}>
              1. 사진 등록
            </span>
            <span className="text-slate-600">→</span>
            <span className={`px-2.5 py-1 rounded-full ${currentStep === 'theme' ? 'bg-amber-500 text-slate-900 font-bold shadow-md shadow-amber-500/30' : 'bg-white/5 text-slate-400'}`}>
              2. 테마 선택
            </span>
            <span className="text-slate-600">→</span>
            <span className={`px-2.5 py-1 rounded-full ${currentStep === 'gender_age' ? 'bg-amber-500 text-slate-900 font-bold shadow-md shadow-amber-500/30' : 'bg-white/5 text-slate-400'}`}>
              3. 성별 & 연령
            </span>
            <span className="text-slate-600">→</span>
            <span className={`px-2.5 py-1 rounded-full ${currentStep === 'result' ? 'bg-emerald-500 text-slate-900 font-bold shadow-md shadow-emerald-500/30' : 'bg-white/5 text-slate-400'}`}>
              4. 화보 완성
            </span>
          </div>
        )}

        {/* Actions & Mode Toggles */}
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
          {/* Dual Screen View Mode Switch */}
          <div className="inline-flex rounded-xl bg-black/40 p-1 border border-white/10">
            <button
              onClick={() => onSelectDisplayMode('kiosk')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                displayMode === 'kiosk'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>키오스크</span>
            </button>
            <button
              onClick={() => onSelectDisplayMode('customer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                displayMode === 'customer'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>고객 대화면</span>
            </button>
          </div>

          {/* Operator Modal Button with API Key Status */}
          <button
            onClick={onOpenOperatorModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all hover:border-amber-500/40"
          >
            {apiKeyConfigured ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>API 연결됨</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>API 설정</span>
              </span>
            )}
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">오늘 {todayCount}명</span>
          </button>

          {/* Reset to Start */}
          <button
            onClick={onResetToStart}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-rose-200 transition-all flex items-center gap-1.5"
            title="처음으로 리셋"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">처음으로</span>
          </button>
        </div>
      </div>
    </header>
  );
};
