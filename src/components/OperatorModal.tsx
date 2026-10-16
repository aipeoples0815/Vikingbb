import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, Download, RefreshCw, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

interface OperatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  todayCount: number;
}

export const OperatorModal: React.FC<OperatorModalProps> = ({
  isOpen,
  onClose,
  todayCount,
}) => {
  const [keyInput, setKeyInput] = useState('');
  const [operatorPin, setOperatorPin] = useState(sessionStorage.getItem('hahahoho_pin') || '');
  const [status, setStatus] = useState<{ isConfigured: boolean; maskedKey: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen]);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/api-key-status');
      const data = await res.json();
      setStatus(data);
    } catch (e) {
      console.warn('API status fetch error:', e);
    }
  };

  const handleUpdateKey = async () => {
    if (!keyInput.trim() && !sessionStorage.getItem('hahahoho_openai_key') && !status?.isConfigured) {
      setFeedback({ type: 'error', message: 'OpenAI API 키를 입력해 주세요.' }); return;
    }
    setIsLoading(true); setFeedback(null);
    const key = keyInput.trim() || sessionStorage.getItem('hahahoho_openai_key') || '';
    try {
      const res = await fetch('/api/check-key', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Operator-Pin': operatorPin, 'X-OpenAI-Key': key }, body: '{}' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '검증 실패');
      sessionStorage.setItem('hahahoho_openai_key', key);
      sessionStorage.setItem('hahahoho_pin', operatorPin);
      setFeedback({ type: 'success', message: '설정 완료. 이 브라우저 탭에서만 키가 유지돼요.' });
      setKeyInput(''); fetchStatus();
    } catch (err: any) { setFeedback({ type: 'error', message: err.message || '설정 실패' }); }
    finally { setIsLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-[#0A192F] border border-amber-400/30 p-6 sm:p-8 shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">현장 운영자 관리 설정</h2>
            <p className="text-xs text-slate-400">하하호호 스튜디오 & 바이킹 비어밤 AI 팀</p>
          </div>
        </div>

        {/* API Key Status Card */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold">현재 활성 API 키:</span>
            {status?.isConfigured ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                정상 연결됨
              </span>
            ) : (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                설정 필요
              </span>
            )}
          </div>
          <div className="font-mono text-sm text-amber-300 font-bold bg-white/5 p-2 rounded-xl">
            {status?.maskedKey || '조회 중...'}
          </div>
        </div>

        {/* API Key Change Form */}
        <label className="block text-xs font-bold text-slate-300 mb-2">현장 운영자 PIN (Netlify 환경변수 OPERATOR_PIN)</label>
        <input type="password" value={operatorPin} onChange={e => setOperatorPin(e.target.value)} placeholder="운영자 PIN" className="w-full mb-4 bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white" />
        <div className="mb-6 space-y-3">
          <label className="block text-xs font-bold text-slate-300">
            OpenAI API 키 등록 (탭 종료 시 삭제):
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="sk-..."
              className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleUpdateKey}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shrink-0 shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all"
            >
              {isLoading ? '검증 중...' : '적용 및 진단'}
            </button>
          </div>

          {feedback && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold ${
                feedback.type === 'success'
                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
              }`}
            >
              {feedback.message}
            </div>
          )}
        </div>

        {/* Operations Overview */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-slate-400 block mb-1">오늘 누적 화보 촬영</span>
            <span className="text-xl font-black text-white">{todayCount} 명</span>
          </div>

          <a
            href="#" onClick={(e) => { e.preventDefault(); alert('소스 백업은 배포 프로젝트 ZIP에서 진행해 주세요.'); }}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-left transition-all flex flex-col justify-between group"
          >
            <span className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>소스 전체 백업</span>
              <Download className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110" />
            </span>
            <span className="text-xs font-bold text-amber-300">ZIP 파일 다운로드</span>
          </a>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
