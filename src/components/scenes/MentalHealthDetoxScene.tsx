import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wind, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export const MentalHealthDetoxScene: React.FC = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathing) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (phase === 'Inhale') {
              setPhase('Hold');
              soundEngine.playNotificationPing();
              return 7;
            } else if (phase === 'Hold') {
              setPhase('Exhale');
              soundEngine.playSubBassImpact();
              return 8;
            } else {
              setPhase('Inhale');
              soundEngine.playNotificationPing();
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setPhase('Inhale');
      setTimer(4);
    }
    return () => clearInterval(interval);
  }, [isBreathing, phase]);

  const toggleBreathing = () => {
    soundEngine.playNotificationPing();
    setIsBreathing(!isBreathing);
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-center items-center py-8 px-4 snap-start snap-always shrink-0 overflow-hidden">
      <div className="max-w-4xl w-full mx-auto space-y-6 relative z-10 text-center my-auto">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-4 py-1.5 rounded-full">
            Digital Detox • Mindful Reset
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Pause, Breathe & Reset
          </h2>
          <p className="text-xs sm:text-sm text-emerald-300 font-sans max-w-xl mx-auto">
            Silence notifications for a minute. Take a slow, intentional breath and reset your neural baseline.
          </p>
        </div>

        {/* Guided 4-7-8 Breathing Circle Visualizer */}
        <div className="relative w-56 h-56 sm:w-72 sm:h-72 mx-auto flex items-center justify-center">
          {/* Animated Glowing Ring */}
          <motion.div
            animate={{
              scale: isBreathing ? (phase === 'Inhale' ? 1.25 : phase === 'Hold' ? 1.25 : 0.85) : 1,
              opacity: isBreathing ? [0.6, 0.9, 0.6] : 0.4,
            }}
            transition={{ duration: phase === 'Inhale' ? 4 : phase === 'Hold' ? 7 : 8, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full border-4 border-emerald-400/60 bg-emerald-500/10 glow-blue"
          />

          {/* Inner Content */}
          <div className="relative z-10 space-y-2 text-center">
            <Wind className="w-8 h-8 text-emerald-400 mx-auto animate-pulse" />
            <div className="text-xl sm:text-2xl font-black font-mono text-white">{isBreathing ? phase : 'Ready'}</div>
            {isBreathing && <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">{timer}s</div>}
            <div className="text-xs text-emerald-300 font-semibold font-sans">
              {phase === 'Inhale' ? 'Breathe in slowly...' : phase === 'Hold' ? 'Hold your breath...' : 'Exhale completely...'}
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={toggleBreathing}
          className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-2xl glow-blue flex items-center space-x-2 mx-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isBreathing ? 'Stop Guided Detox' : 'Start 4-7-8 Mindful Breathing'}</span>
        </button>
      </div>
    </section>
  );
};
