import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Eye } from 'lucide-react';

export const BlankPauseScene: React.FC = () => {
  return (
    <section
      id="scene-pause-transition"
      className="h-screen w-full bg-black text-white relative flex flex-col justify-between items-center py-8 px-6 snap-start snap-always shrink-0 overflow-hidden select-none"
    >
      {/* Subtle void atmosphere */}
      <div className="absolute inset-0 bg-radial from-neutral-950 via-black to-black opacity-90 pointer-events-none" />

      {/* Top minimal status */}
      <div className="relative z-10 pt-4 opacity-40 hover:opacity-80 transition-opacity duration-500">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500">
          Pause • Reflection
        </span>
      </div>

      {/* Centerpiece Minimalist Pause / Emotional Silence */}
      <div className="relative z-10 max-w-xl mx-auto text-center space-y-8 px-4 my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Subtle pulsating breathing dot */}
          <div className="flex items-center justify-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500/80 animate-ping inline-block" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-neutral-300 font-sans leading-relaxed">
            Take a breath.
          </p>

          <p className="text-xs sm:text-sm font-mono text-neutral-500 tracking-wider max-w-md mx-auto leading-relaxed">
            Before we enter the neural circuitry of addiction, notice what your mind is feeling right now.
          </p>
        </motion.div>
      </div>

      {/* Bottom hint to continue scroll */}
      <div className="relative z-10 pb-4 text-center text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600 flex flex-col items-center gap-2">
        <span className="opacity-60">Scroll to see inside the brain</span>
        <ChevronDown className="w-3.5 h-3.5 text-neutral-600 animate-bounce" />
      </div>
    </section>
  );
};
