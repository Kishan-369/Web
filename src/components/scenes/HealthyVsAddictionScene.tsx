import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundEngine } from '../../utils/soundEngine';
import { Sun, ShieldAlert, AlertTriangle } from 'lucide-react';

export const HealthyVsAddictionScene: React.FC = () => {
  const [chaosLevel, setChaosLevel] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setChaosLevel(val);
    if (val > 70) {
      soundEngine.playGlitchSound();
    }
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-center items-center py-6 px-4 overflow-hidden snap-start snap-always shrink-0">
      <div className="max-w-5xl w-full mx-auto space-y-6 relative z-10 my-auto">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-4 py-1 rounded-full">
            The Contrast
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Healthy Balance vs. Digital Chaos
          </h2>
        </div>

        {/* Interactive Chaos Leak Slider Control */}
        <div className="max-w-md mx-auto bg-neutral-900 border border-white/10 p-3.5 rounded-2xl space-y-2 shadow-xl">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-emerald-400 flex items-center gap-1">
              <Sun className="w-4 h-4" /> Inner Peace
            </span>
            <span className="text-neutral-400 font-mono text-xs">Chaos Level: {chaosLevel}%</span>
            <span className="text-red-500 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" /> Digital Chaos
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={chaosLevel}
            onChange={handleSliderChange}
            className="w-full accent-red-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
          />
        </div>

        {/* Split Screen Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Side: Healthy Peace */}
          <motion.div
            style={{ opacity: Math.max(0.2, (100 - chaosLevel) / 100) }}
            className="apple-card p-6 rounded-3xl border border-emerald-500/30 bg-emerald-950/10 space-y-4 transition-all"
          >
            <div className="flex items-center space-x-2 text-emerald-400">
              <Sun className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Mindful Living</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>8 hours of restorative deep sleep</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Present in family & real conversations</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Unbroken study focus and peak clarity</span>
              </li>
            </ul>
          </motion.div>

          {/* Right Side: Digital Chaos */}
          <motion.div
            style={{ opacity: Math.max(0.2, chaosLevel / 100) }}
            className="apple-card p-6 rounded-3xl border border-red-500/40 bg-red-950/20 space-y-4 transition-all glow-red"
          >
            <div className="flex items-center space-x-2 text-red-500">
              <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
              <h3 className="text-lg font-bold text-white">Compulsive Addiction</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>Late-night doomscrolling until 2:00 AM</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Constant phantom vibration anxiety</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Fragmented attention span (under 8 seconds)</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
