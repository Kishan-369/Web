import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface Props {
  onRestart?: () => void;
}

export const TheLoopClosingScene: React.FC<Props> = ({ onRestart }) => {
  const handleRestart = () => {
    soundEngine.playNotificationPing();
    soundEngine.playSubBassImpact();
    if (onRestart) {
      onRestart();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-center items-center py-8 px-4 overflow-hidden snap-start snap-always shrink-0 select-none">
      {/* Subtle Atmospheric Radial Warm Glow */}
      <div className="absolute inset-0 bg-radial from-amber-950/20 via-neutral-950/80 to-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[380px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Pure Minimalist Centerpiece */}
      <div className="relative z-10 max-w-2xl w-full mx-auto text-center space-y-10 px-4">
        {/* Minimal Continuation Statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="space-y-3"
        >
          <p className="text-xl sm:text-3xl md:text-4xl font-light text-neutral-200 tracking-tight leading-relaxed">
            See you soon with solutions in <span className="text-amber-400 font-medium">Episode 2</span>.
          </p>
        </motion.div>

        {/* Sacred Tribute: Jay Swaminarayan & Das na Das */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
          className="pt-2 space-y-2.5"
        >
          <div className="inline-flex items-center justify-center space-x-2.5">
            <Sparkles className="w-4 h-4 text-amber-400/80 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 uppercase font-sans">
              Jay Swaminarayan
            </h2>
            <Sparkles className="w-4 h-4 text-amber-400/80 animate-pulse" />
          </div>

          <p className="text-sm sm:text-base font-serif italic text-amber-200/80 tracking-wider lowercase">
            das na das
          </p>
        </motion.div>

        {/* Minimal Replay Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="pt-4"
        >
          <button
            onClick={handleRestart}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-neutral-950/80 border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white text-xs font-mono tracking-wider transition-all hover:scale-105 active:scale-95 backdrop-blur-sm shadow-lg"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Replay</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
