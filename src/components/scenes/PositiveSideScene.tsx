import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Compass, Lightbulb, Rocket } from 'lucide-react';

export const PositiveSideScene: React.FC = () => {
  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-center items-center py-8 px-4 snap-start snap-always shrink-0 overflow-hidden">
      <div className="max-w-4xl w-full mx-auto space-y-6 relative z-10 my-auto text-center">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-4 py-1.5 rounded-full">
            Reclaiming Control
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Technology: Master or Servant?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-xl mx-auto">
            Smartphones are the most powerful tools in human history when used intentionally for creation, learning, and growth.
          </p>
        </div>

        {/* 3 Pillars of Healthy Tech Usage */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="apple-card p-5 rounded-3xl border border-emerald-500/30 bg-neutral-950/80 space-y-3 text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">1. Intentional Learning</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Use platforms to master AI tools, coding, science, philosophy, and practical life skills rather than endless entertainment.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="apple-card p-5 rounded-3xl border border-emerald-500/30 bg-neutral-950/80 space-y-3 text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">2. Creator Economy</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Shift from being a passive consumer to an active builder—creating projects, writing code, and solving real-world problems.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="apple-card p-5 rounded-3xl border border-emerald-500/30 bg-neutral-950/80 space-y-3 text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">3. Digital Boundaries</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Establish phone-free study zones, turn off non-essential notifications, and protect sacred sleep windows.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
