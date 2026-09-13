import React, { useState, useEffect } from 'react';
import { AppEcosystemCanvas } from '../3d/AppEcosystemCanvas';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../../utils/soundEngine';
import { Radio } from 'lucide-react';

interface AppItem {
  name: string;
  color: string;
  borderColor: string;
  glowClass: string;
  badgeBg: string;
  iconIndex: number;
}

export const AppEcosystemScene: React.FC = () => {
  // step: 0 = Initial (Only header text, phone & app names hidden)
  // step: 1 = Phone + Instagram only
  // step: 2 = Phone + YouTube only
  // step: 3 = Phone + Facebook only
  // step: 4 = Phone + WhatsApp only
  const [step, setStep] = useState<number>(0);

  const apps: AppItem[] = [
    {
      name: 'Instagram',
      color: 'text-pink-400',
      borderColor: 'border-pink-500/60',
      glowClass: 'shadow-[0_0_50px_rgba(236,72,153,0.35)]',
      badgeBg: 'bg-pink-950/70 text-pink-300 border-pink-500/50',
      iconIndex: 0,
    },
    {
      name: 'YouTube',
      color: 'text-red-500',
      borderColor: 'border-red-500/60',
      glowClass: 'shadow-[0_0_50px_rgba(239,68,68,0.35)]',
      badgeBg: 'bg-red-950/70 text-red-300 border-red-500/50',
      iconIndex: 1,
    },
    {
      name: 'Facebook',
      color: 'text-blue-400',
      borderColor: 'border-blue-500/60',
      glowClass: 'shadow-[0_0_50px_rgba(59,130,246,0.35)]',
      badgeBg: 'bg-blue-950/70 text-blue-300 border-blue-500/50',
      iconIndex: 2,
    },
    {
      name: 'WhatsApp',
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/60',
      glowClass: 'shadow-[0_0_50px_rgba(16,185,129,0.35)]',
      badgeBg: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50',
      iconIndex: 3,
    },
  ];

  const handleNext = () => {
    if (step === 0) {
      soundEngine.playSubBassImpact();
      soundEngine.playNotificationPing();
      setStep(1);
    } else {
      soundEngine.playNotificationPing();
      setStep((prev) => (prev < 4 ? prev + 1 : 1));
    }
  };

  const handlePrev = () => {
    soundEngine.playNotificationPing();
    setStep((prev) => {
      if (prev <= 1) return 0;
      return prev - 1;
    });
  };

  // Keyboard navigation support for presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  // Current active app (only when step >= 1 and step <= 4)
  const currentApp = step >= 1 && step <= 4 ? apps[step - 1] : null;

  return (
    <section
      onClick={handleNext}
      className="h-screen w-full bg-black text-white relative flex flex-col justify-between py-6 sm:py-8 px-4 overflow-hidden snap-start snap-always shrink-0 select-none cursor-pointer group"
    >
      {/* 3D Canvas: Phone is hidden when step === 0, visible when step >= 1 */}
      <AppEcosystemCanvas
        exploded={true}
        phoneVisible={step > 0}
        selectedAppIndex={currentApp ? currentApp.iconIndex : null}
      />

      {/* Header - Visible at top */}
      <div className="relative z-20 max-w-4xl mx-auto text-center space-y-2 pt-2 sm:pt-4 pointer-events-none">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3.5 py-1.5 rounded-full backdrop-blur-md">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>The App Ecosystem Explosion</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-snug">
          Designed to capture every second of your attention.
        </h2>
        <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-2xl mx-auto">
          Engineered by world-class behavioral scientists to maximize time-on-screen.
        </p>
      </div>

      {/* Right Side App Name Only - Positioned comfortably to the right without overlapping phone */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex justify-end items-center flex-1 pr-6 sm:pr-14 md:pr-24 pointer-events-none my-auto">
        <AnimatePresence mode="wait">
          {currentApp && (
            <motion.div
              key={currentApp.name}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -25, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto"
            >
              <div
                className={`px-8 py-5 sm:px-10 sm:py-6 rounded-3xl border-2 ${currentApp.borderColor} bg-neutral-950/90 backdrop-blur-2xl shadow-2xl ${currentApp.glowClass} flex items-center justify-center`}
              >
                <span
                  className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-wide ${currentApp.color}`}
                >
                  {currentApp.name}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom spacer for balance */}
      <div className="h-6 pointer-events-none" />
    </section>
  );
};

