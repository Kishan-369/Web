import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

// ============================================================================
// 📌 LIVE QUIZ CONFIGURATION
// ============================================================================
export const MENTIMETER_CONFIG = {
  // External quiz or voting link:
  mentiUrl: 'https://www.menti.com/',

  // Quiz Join Code:
  mentiCode: '1234 5678',

  // Custom QR Code image URL or local file path (optional):
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
      className="h-screen w-full bg-black text-white relative flex flex-col justify-center items-center py-8 px-4 snap-start snap-always shrink-0 overflow-hidden select-none"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-radial from-neutral-900/30 via-black to-black opacity-95 pointer-events-none" />

      {/* Subtle Ambient Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-20">
        <div className="w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] border border-white/10 rounded-full" />
        <div className="w-[650px] h-[650px] sm:w-[850px] sm:h-[850px] border border-white/[0.04] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl xl:max-w-5xl w-full text-center">
        {/* Text 1: Where Do You Stand? — Strictly ONE Single Line */}
        <motion.h2
          id="quiz-scene-title"
          initial={{ opacity: 0, y: -35, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] leading-none select-none px-2"
        >
          Where Do You Stand?
        </motion.h2>

        {/* Text 2: Scan to Join Live Quiz */}
        <motion.h3
          initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-widest text-red-500 uppercase mt-5 sm:mt-6 select-none transition-all flex items-center justify-center gap-2 drop-shadow-[0_0_25px_rgba(239,68,68,0.8)]"
        >
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span>Scan to Join Live Quiz</span>
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
        </motion.h3>

        {/* Big High-Visibility High-Tech QR Code Card */}
        <motion.div
          id="quiz-main-container"
          initial={{ opacity: 0, scale: 0.65, y: 50, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.95, delay: 0.3, type: 'spring', damping: 20, stiffness: 90 }}
          className="relative mt-6 sm:mt-8 group cursor-pointer"
          onClick={toggleModal}
          title="Click to view full screen"
        >
          {/* Very Subtle Ambient Depth Aura */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-red-600/[0.06] blur-2xl pointer-events-none transition-all duration-700" />

          {/* High-Resolution Clean QR Card with Neutral Shadows */}
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative p-6 sm:p-8 md:p-9 bg-white rounded-3xl sm:rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_15px_rgba(255,255,255,0.05)] border-2 sm:border-4 border-neutral-800 transition-colors duration-300 overflow-hidden"
          >
            {/* Subtle Laser Scanning Line */}
            <motion.div
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/60 to-transparent shadow-[0_0_6px_rgba(239,68,68,0.3)] z-20 pointer-events-none"
              animate={{ top: ['4%', '94%', '4%'] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Subtle Minimal Corner Accents */}
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-4 h-4 border-t-2 border-l-2 border-neutral-400 z-10 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-4 h-4 border-t-2 border-r-2 border-neutral-400 z-10 pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-4 h-4 border-b-2 border-l-2 border-neutral-400 z-10 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-4 h-4 border-b-2 border-r-2 border-neutral-400 z-10 pointer-events-none" />

            {/* Vector or Custom QR Code */}
            {MENTIMETER_CONFIG.customQrCodeImageUrl ? (
              <img
                src={MENTIMETER_CONFIG.customQrCodeImageUrl}
                alt="Live Quiz QR Code"
                className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[320px] lg:h-[320px] object-contain mx-auto relative z-0"
              />
            ) : (
              <svg viewBox="0 0 100 100" className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[320px] lg:h-[320px] fill-black mx-auto relative z-0">
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
                <rect x="35" y="35" width="10" height="10" />
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
          </motion.div>
        </motion.div>
      </div>

      {/* Fullscreen Big QR Code Modal (Available when clicking the QR code) */}
      <AnimatePresence>
        {showLargeQr && (
          <div
            id="fullscreen-qr-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
            onClick={toggleModal}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="apple-card p-6 sm:p-8 rounded-3xl border border-red-500/40 max-w-md w-full bg-neutral-950 text-center space-y-6 shadow-2xl relative"
            >
              <button
                id="close-fullscreen-qr-btn"
                onClick={toggleModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pt-2">
                <h4 className="text-2xl sm:text-3xl font-black text-white">Where Do You Stand?</h4>
                <p className="text-sm font-bold text-red-500 uppercase tracking-wider">Scan to Join Live Quiz</p>
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
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

