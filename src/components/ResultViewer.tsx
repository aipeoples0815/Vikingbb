import React, { useState, useEffect } from 'react';
import { Printer, Download, Save, RefreshCw, Sparkles, CheckCircle2, Home, Share2, FolderOpen, Heart } from 'lucide-react';
import { RETRO_THEMES, getAgeGroupTitle } from '../constants/themes';
import { AgeGroup, Gender } from '../types';

interface ResultViewerProps {
  imageUrl: string;
  themeId: string;
  styleId?: string;
  gender: Gender;
  ageGroup: AgeGroup;
  todayCount: number;
  customerName?: string;
  onRemake: () => void;
  onResetToStart: () => void;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({
  imageUrl,
  themeId,
  styleId,
  gender,
  ageGroup,
  todayCount,
  customerName = '고객',
  onRemake,
  onResetToStart,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [savedFilePath, setSavedFilePath] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const theme = RETRO_THEMES.find((t) => t.id === themeId) || RETRO_THEMES[0];
  const ageInfo = getAgeGroupTitle(ageGroup);
  const seqNumber = String(todayCount || 1).padStart(3, '0');

  // Netlify cannot write to the event computer. Use the Download button explicitly.
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `${seqNumber}_${customerName}_${theme.name}_5x7_화보.jpg`;
    a.click();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      {/* Top Banner */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>축하합니다! 인생 화보 현상 완료</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          {theme.name}
        </h2>
        <p className="text-slate-400 text-sm">
          {ageInfo.title} · {gender === 'male' ? '남성' : '여성'} 화보 (촬영 순번 #{seqNumber})
        </p>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Left: 5:7 Portrait Frame with Official Festival Border */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative rounded-3xl p-3 bg-gradient-to-b from-[#1C3A63] via-[#0E2038] to-[#081220] border-2 border-amber-400/40 shadow-2xl w-full max-w-md group">
            {/* Top Frame Label */}
            <div className="px-3 py-1.5 flex items-center justify-between text-[11px] font-bold text-amber-300/80 border-b border-white/10 mb-2">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                <span>하하호호 스튜디오 AI 팀</span>
              </span>
              <span>2026 바이킹 비어밤 공식 화보</span>
            </div>

            {/* 5:7 Image Canvas */}
            <div className="relative rounded-2xl overflow-hidden aspect-[5/7] bg-black shadow-inner">
              <img
                src={imageUrl}
                alt="AI 레트로 인생 화보"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              />

              {/* Official Stamp Overlay at bottom-right */}
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-amber-400/40 text-[10px] font-black text-amber-300 flex items-center gap-1.5 shadow-lg">
                <span>HAHADMSW · #</span>
                <span>{seqNumber}</span>
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="mt-2 pt-2 border-t border-white/10 text-center text-[11px] text-slate-400">
              세로형 5:7 고출력 상업 화보 (1500 × 2100 규격 즉석 인화 대응)
            </div>
          </div>
        </div>

        {/* Right: Actions & Storage Info */}
        <div className="lg:col-span-5 space-y-4">
          {/* Storage Alert Box */}
          <div className="p-4 rounded-2xl bg-[#0B1E34]/90 border border-white/10 text-xs space-y-2">
            <div className="flex items-center justify-between text-amber-400 font-bold">
              <span className="flex items-center gap-1.5">
                <FolderOpen className="w-4 h-4" />
                <span>현장 사진 저장 방법</span>
              </span>
              {isSaved ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  저장 완료
                </span>
              ) : isSaving ? (
                <span className="text-amber-400 animate-pulse">저장 중...</span>
              ) : null}
            </div>
            <p className="text-slate-300 break-all bg-black/40 p-2.5 rounded-xl font-mono text-[11px]">
              {'아래 [원본 고화질 다운로드] 버튼으로 저장해 주세요.'}
            </p>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              * 키오스크 실행 시 해당 폴더에 파일명 <span className="text-amber-300 font-semibold">{seqNumber}_{customerName}_{theme.badge}.jpg</span> 로 파일을 저장할 수 있어요.
            </p>
          </div>

          {/* Core Action Buttons */}
          <div className="space-y-3">
            {/* Instant Print Button (P shortcut) */}
            <button
              onClick={handlePrint}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <Printer className="w-5 h-5" />
              <span>🖨️ 5×7 즉석 인화하기 (P)</span>
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>원본 고화질 다운로드</span>
            </button>

            {/* Remake with different theme or style */}
            <button
              onClick={onRemake}
              className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-blue-400" />
              <span>다른 테마로 한 번 더 만들기</span>
            </button>

            {/* Next Customer Button */}
            <button
              onClick={onResetToStart}
              className="w-full py-3 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>새로운 손님 맞이하기 (처음으로)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
