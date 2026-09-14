import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Activity, Users, Maximize2, X, Smartphone } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

// ============================================================================
// 📌 LIVE QUIZ CONFIGURATION
// ============================================================================
// Easily configure your external quiz URL, join code, or custom QR code image here:
export const MENTIMETER_CONFIG = {
  // 1. External quiz or voting link (e.g., 'https://www.menti.com/al123456' or your custom quiz portal):
  mentiUrl: 'https://www.menti.com/',

  // 2. Quiz Join Code to display on screen (e.g., '1234 5678'):
  mentiCode: '1234 5678',

  // 3. Custom QR Code image URL or local file path (e.g., '/quiz-qr.png' or an online URL).
  //    If set to null, a high-resolution vector QR code will be generated automatically.
  customQrCodeImageUrl: null as string | null,
};
// ============================================================================

export const QuizTimeScene: React.FC = () => {
  const [showLargeQr, setShowLargeQr] = useState(false);

  const toggleModal = () => {
    soundEngine.playNotificationPing();
    setShowLargeQr(!showLargeQr);
  };

  return (
    <section
      id="scene-where-do-you-stand"
      className="h-screen w-full bg-black text-white relative flex flex-col justify-between py-6 px-4 snap-start snap-always shrink-0 overflow-hidden"
    >
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 bg-radial from-red-950/25 via-black to-black opacity-90 pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 max-w-3xl mx-auto w-full text-center space-y-2 pt-2 sm:pt-4">
        <div
          id="quiz-scene-badge"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-red-500 bg-red-950/60 border border-red-500/40 px-3.5 py-1 rounded-full backdrop-blur-md shadow-lg"
        >
          <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>Scene 2 • Assembly Live Quiz</span>
        </div>
        <h2 id="quiz-scene-title" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Where Do You Stand?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-lg mx-auto">
          Scan the QR code with your phone camera or visit <span className="text-cyan-400 font-mono font-bold">menti.com</span> to participate in the live quiz.
        </p>
      </div>

      {/* Main Dedicated QR Code Card */}
      <div id="quiz-main-container" className="relative z-10 max-w-xl w-full mx-auto my-auto">
        <div
          id="quiz-card"
          className="apple-card p-6 sm:p-8 rounded-3xl border border-red-500/30 bg-neutral-950/90 text-center space-y-6 shadow-2xl relative overflow-hidden glow-red"
        >
          {/* Direct Join Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1 rounded-full">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                Join at menti.com • Code:{' '}
                <strong className="text-white font-mono tracking-wider ml-1">{MENTIMETER_CONFIG.mentiCode}</strong>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Scan to Join Live Quiz
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Aim your mobile camera at the QR code below to connect instantly without installing any app.
            </p>
          </div>

          {/* QR Code Container */}
          <div className="relative group max-w-[220px] mx-auto">
            <div
              id="qr-code-interactive"
              onClick={toggleModal}
              className="p-4 sm:p-5 bg-white rounded-2xl shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 border-4 border-neutral-900 group-hover:border-red-500/50"
              title="Click to expand fullscreen"
            >
              {MENTIMETER_CONFIG.customQrCodeImageUrl ? (
                <img
                  src={MENTIMETER_CONFIG.customQrCodeImageUrl}
                  alt="Live Quiz QR Code"
                  className="w-44 h-44 object-contain mx-auto"
                />
              ) : (
                <svg viewBox="0 0 100 100" className="w-44 h-44 fill-black mx-auto">
                  {/* Position detection corners */}
                  <path d="M0,0 h30 v30 h-30 z M5,5 h20 v20 h-20 z M10,10 h10 v10 h-10 z" />
                  <path d="M70,0 h30 v30 h-30 z M75,5 h20 v20 h-20 z M80,10 h10 v10 h-10 z" />
                  <path d="M0,70 h30 v30 h-30 z M5,75 h20 v20 h-20 z M10,80 h10 v10 h-10 z" />
                  {/* Matrix Data */}
                  <rect x="35" y="5" width="8" height="8" />
                  <rect x="48" y="5" width="8" height="8" />
                  <rect x="35" y="18" width="8" height="8" />
                  <rect x="52" y="18" width="8" height="8" />
                  <rect x="5" y="35" width="8" height="8" />
                  <rect x="18" y="35" width="8" height="8" />
                  <rect x="35" y="35" width="10" height="10" fill="#e50914" />
                  <rect x="50" y="35" width="10" height="10" />
                  <rect x="65" y="35" width="8" height="8" />
                  <rect x="80" y="35" width="8" height="8" />
                  <rect x="35" y="52" width="8" height="8" />
                  <rect x="48" y="52" width="8" height="8" />
                  <rect x="70" y="52" width="8" height="8" />
                  <rect x="85" y="52" width="8" height="8" />
                  <rect x="35" y="70" width="8" height="8" />
                  <rect x="50" y="70" width="8" height="8" />
                  <rect x="65" y="70" width="8" height="8" />
                  <rect x="85" y="70" width="8" height="8" />
                  <rect x="40" y="85" width="8" height="8" />
                  <rect x="60" y="85" width="8" height="8" />
                  <rect x="85" y="85" width="8" height="8" />
                </svg>
              )}
              <div className="text-[10px] font-mono text-neutral-900 font-bold tracking-widest mt-2.5 uppercase flex items-center justify-center space-x-1">
                <span>Click to Expand</span>
                <Maximize2 className="w-3 h-3 text-red-600" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              id="open-external-quiz-btn"
              href={MENTIMETER_CONFIG.mentiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-extrabold text-xs tracking-wider uppercase flex items-center space-x-2 transition-all shadow-xl glow-red"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Quiz Link</span>
            </a>

            <button
              id="fullscreen-qr-btn"
              onClick={toggleModal}
              className="px-4 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white text-xs font-mono transition-all flex items-center space-x-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Fullscreen View</span>
            </button>
          </div>

          {/* Subtle instructions note */}
          <div className="flex items-center justify-center space-x-2 text-[11px] font-mono text-neutral-400 pt-1">
            <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
            <span>Opens directly in any mobile web browser</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 text-center text-[11px] font-mono text-neutral-500 pb-1">
        Assembly Reality Check • Live results broadcasted on screen
      </div>

      {/* Fullscreen Big QR Code Modal (Optimized for Auditorium / Projector Display) */}
      <AnimatePresence>
        {showLargeQr && (
          <div
            id="fullscreen-qr-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="apple-card p-6 sm:p-8 rounded-3xl border border-red-500/40 max-w-md w-full bg-neutral-950 text-center space-y-5 shadow-2xl relative"
            >
              <button
                id="close-fullscreen-qr-btn"
                onClick={toggleModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 bg-red-950/60 border border-red-500/30 px-3 py-1 rounded-full">
                  Assembly Live Quiz
                </span>
                <h4 className="text-2xl font-black text-white">Scan to Join Live</h4>
                <p className="text-xs text-neutral-400">
                  Point your phone camera at the QR code or go to <strong className="text-cyan-400">menti.com</strong> with code{' '}
                  <strong className="text-white">{MENTIMETER_CONFIG.mentiCode}</strong>
                </p>
              </div>

              {/* Large QR Display */}
              <div className="p-5 bg-white rounded-3xl max-w-[280px] mx-auto shadow-2xl border-4 border-neutral-900 flex flex-col items-center">
                {MENTIMETER_CONFIG.customQrCodeImageUrl ? (
                  <img
                    src={MENTIMETER_CONFIG.customQrCodeImageUrl}
                    alt="Live Quiz QR Code"
                    className="w-56 h-56 object-contain"
                  />
                ) : (
                  <svg viewBox="0 0 100 100" className="w-56 h-56 fill-black">
                    <path d="M0,0 h30 v30 h-30 z M5,5 h20 v20 h-20 z M10,10 h10 v10 h-10 z" />
                    <path d="M70,0 h30 v30 h-30 z M75,5 h20 v20 h-20 z M80,10 h10 v10 h-10 z" />
                    <path d="M0,70 h30 v30 h-30 z M5,75 h20 v20 h-20 z M10,80 h10 v10 h-10 z" />
                    <rect x="35" y="5" width="8" height="8" />
                    <rect x="48" y="5" width="8" height="8" />
                    <rect x="35" y="18" width="8" height="8" />
                    <rect x="52" y="18" width="8" height="8" />
                    <rect x="5" y="35" width="8" height="8" />
                    <rect x="18" y="35" width="8" height="8" />
                    <rect x="35" y="35" width="10" height="10" fill="#e50914" />
                    <rect x="50" y="35" width="10" height="10" />
                    <rect x="65" y="35" width="8" height="8" />
                    <rect x="80" y="35" width="8" height="8" />
                    <rect x="35" y="52" width="8" height="8" />
                    <rect x="48" y="52" width="8" height="8" />
                    <rect x="70" y="52" width="8" height="8" />
                    <rect x="85" y="52" width="8" height="8" />
                    <rect x="35" y="70" width="8" height="8" />
                    <rect x="50" y="70" width="8" height="8" />
                    <rect x="65" y="70" width="8" height="8" />
                    <rect x="85" y="70" width="8" height="8" />
                    <rect x="40" y="85" width="8" height="8" />
                    <rect x="60" y="85" width="8" height="8" />
                    <rect x="85" y="85" width="8" height="8" />
                  </svg>
                )}
                <span className="text-[10px] font-mono text-neutral-900 font-extrabold tracking-widest mt-2 uppercase">
                  LIVE ASSEMBLY POLL
                </span>
              </div>

              <div className="space-y-2 pt-1">
                <a
                  id="modal-open-quiz-link"
                  href={MENTIMETER_CONFIG.mentiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg glow-red transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Quiz Directly</span>
                </a>

                <button
                  id="modal-close-window-btn"
                  onClick={toggleModal}
                  className="w-full py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-white/10 text-xs font-mono transition-all"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

