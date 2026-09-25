import React from 'react';
import { motion } from 'motion/react';
import { Users, WifiOff } from 'lucide-react';

export const FamilyDinnerScene: React.FC = () => {
  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-center items-center py-8 px-4 snap-start snap-always shrink-0 overflow-hidden">
      <div className="max-w-4xl w-full mx-auto space-y-6 relative z-10 my-auto text-center">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-red-500 bg-red-950/40 border border-red-500/30 px-4 py-1.5 rounded-full">
            Human Connection
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            The Silent Dinner Table
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-sans">
            Sitting together in the same room, yet miles apart in separate algorithmically curated worlds.
          </p>
        </div>

        {/* Visual Graphic Representation */}
        <div className="apple-card p-8 rounded-3xl border border-red-500/40 bg-neutral-950/90 max-w-2xl mx-auto space-y-6 text-center glow-red">
          <div className="flex justify-center items-center space-x-6 sm:space-x-12">
            {['Father', 'Mother', 'Son', 'Daughter'].map((person, idx) => (
              <motion.div
                key={person}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.4 }}
                className="space-y-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-red-500/50 flex items-center justify-center text-red-400 mx-auto shadow-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-white">{person}</div>
                <div className="text-[10px] text-red-400 font-mono">Glued to Screen</div>
              </motion.div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-center space-x-2 text-xs text-red-400 font-mono">
              <WifiOff className="w-4 h-4" />
              <span>Phubbing: Phone snubbing real-life family members</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-md mx-auto font-sans">
              "We trade intimate, heartwarming family conversations for superficial pings from strangers on the internet."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
