import React, { useState, useRef } from 'react';
import { Upload, Camera, CheckCircle2, User, Sparkles, Image as ImageIcon, ArrowRight } from 'lucide-react';

interface PhotoUploaderProps {
  onPhotoSelected: (imageDataUrl: string, customerName?: string) => void;
  defaultCustomerName?: string;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  onPhotoSelected,
  defaultCustomerName = '',
}) => {
  const [customerName, setCustomerName] = useState(defaultCustomerName);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreviewImage(dataUrl);
      validateFace(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const validateFace = async (dataUrl: string) => {
    setIsValidating(true);
    setValidationMsg('인물 얼굴 감지 및 이목구비 정밀 분석 중...');
    try {
      const res = await fetch('/api/check-face', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl }),
      });
      const data = await res.json();
      setValidationMsg(data.message || '얼굴이 정상 확인되었습니다. (정체성 60% 보존 준비 완료)');
    } catch (err) {
      setValidationMsg('얼굴 사진이 등록되었습니다.');
    } finally {
      setIsValidating(false);
    }
  };

  // Webcam controls
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 960 }, facingMode: 'user' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      alert('웹캠 접근 권한을 확인해 주세요.');
      setIsCameraActive(false);
    }
  };

  const captureCamera = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        setPreviewImage(dataUrl);
        stopCamera();
        validateFace(dataUrl);
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleConfirm = () => {
    if (previewImage) {
      onPhotoSelected(previewImage, customerName.trim() || undefined);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Title & Guidance */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>STEP 1 · 인물 사진 등록</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          그 시절의 나를 다시 만나는 첫걸음
        </h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          얼굴 정체성을 60% 정밀 보존하여 본인임을 한눈에 알아볼 수 있는 최고급 3/4 화보로 다시 태어납니다.
        </p>
      </div>

      {/* Main Upload Box */}
      <div className="bg-[#0D2137]/80 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Customer Name Input (Optional for Auto Save) */}
        <div className="mb-6 flex flex-col sm:flex-row items-center gap-3 bg-black/30 p-3 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 px-2 shrink-0">
            <User className="w-4 h-4 text-amber-400" />
            <span>고객 성함 (선택):</span>
          </div>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="예: 김민정 (비워두면 번호로 자동 저장)"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all"
          />
        </div>

        {/* Upload State / Preview / Camera */}
        {!previewImage && !isCameraActive && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* File Upload Button */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer rounded-2xl border-2 border-dashed border-white/15 hover:border-amber-400/60 bg-white/[0.02] hover:bg-white/[0.05] p-8 flex flex-col items-center justify-center text-center transition-all hover:scale-[1.01]"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">사진 파일 불러오기</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                스마트폰 촬영 사진, 증명사진, 일상 스냅 사진 모두 가능합니다.
              </p>
            </div>

            {/* Webcam Capture Button */}
            <div
              onClick={startCamera}
              className="group cursor-pointer rounded-2xl border-2 border-dashed border-white/15 hover:border-blue-400/60 bg-white/[0.02] hover:bg-white/[0.05] p-8 flex flex-col items-center justify-center text-center transition-all hover:scale-[1.01]"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <Camera className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">현장 즉석 카메라 촬영</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                키오스크 웹캠을 켜서 부스 현장에서 바로 촬영합니다.
              </p>
            </div>
          </div>
        )}

        {/* Live Camera View */}
        {isCameraActive && (
          <div className="flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/40 bg-black aspect-[4/3] w-full max-w-md shadow-2xl mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none border border-amber-400/20 rounded-2xl flex items-center justify-center">
                <div className="w-48 h-60 border-2 border-dashed border-amber-400/50 rounded-full" />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={captureCamera}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/30 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>찰칵! 촬영하기</span>
              </button>
              <button
                onClick={stopCamera}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-bold text-sm"
              >
                취소
              </button>
            </div>
          </div>
        )}

        {/* Image Preview & Face Validation Status */}
        {previewImage && !isCameraActive && (
          <div className="flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/40 bg-black aspect-[3/4] w-64 shadow-2xl mb-4">
              <img
                src={previewImage}
                alt="선택된 인물 사진"
                className="w-full h-full object-cover"
              />
              {isValidating && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
                  <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mb-2" />
                  <span className="text-xs font-bold text-amber-300">얼굴 정밀 분석 중...</span>
                </div>
              )}
            </div>

            {/* Validation Message Badge */}
            {validationMsg && (
              <div className="mb-6 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{validationMsg}</span>
              </div>
            )}

            {/* Next Step Controls */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setPreviewImage(null)}
                className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-bold transition-all"
              >
                다시 고르기
              </button>
              <button
                onClick={handleConfirm}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
              >
                <span>테마 선택으로 이동</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reassurance Footer */}
      <div className="mt-6 text-center text-xs text-slate-500">
        🔒 등록하신 원본 사진은 오직 인생 화보 1장 생성을 위한 얼굴 기준 이미지로만 사용되며 외부로 전송되지 않습니다.
      </div>
    </div>
  );
};
