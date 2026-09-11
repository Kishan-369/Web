import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundEngine } from '../../utils/soundEngine';
import {
  Sun,
  ShieldAlert,
  Moon,
  Users,
  Compass,
  Clock,
  BellRing,
  Zap,
  Sparkles,
  Flame,
  Scale,
} from 'lucide-react';

export const HealthyVsAddictionScene: React.FC = () => {
  const [chaosLevel, setChaosLevel] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setChaosLevel(val);
    if (val > 75) {
      soundEngine.playGlitchSound();
    } else {
      soundEngine.playClickTone();
    }
  };

  const setPreset = (val: number) => {
    setChaosLevel(val);
    if (val > 75) {
      soundEngine.playGlitchSound();
    } else {
      soundEngine.playNotificationPing();
    }
  };

  // Normalized weightings for card opacity and scale
  const healthyWeight = Math.max(0.35, (100 - chaosLevel) / 100);
  const chaosWeight = Math.max(0.35, chaosLevel / 100);

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between items-center py-6 px-4 snap-start snap-always shrink-0 overflow-hidden select-none">
      {/* Dynamic Ambient Background Aura */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
          opacity: (100 - chaosLevel) / 100,
        }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
          opacity: chaosLevel / 100,
        }}
      />

      {/* Header */}
      <div className="text-center space-y-2 relative z-10 pt-2 sm:pt-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-4 py-1.5 rounded-full backdrop-blur-md">
          <Scale className="w-3.5 h-3.5 text-cyan-400" />
          <span>The Contrast</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-snug">
          Healthy Balance vs. Digital Chaos
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-lg mx-auto leading-relaxed hidden sm:block">
          Slide to experience how compulsive digital habits distort your biological baseline.
        </p>
      </div>

      {/* Centerpiece: Interactive Contrast Controller & Split Cards */}
      <div className="w-full max-w-5xl mx-auto my-auto relative z-10 space-y-5 px-2">
        {/* Interactive Preset Bar & Range Track */}
        <div className="max-w-xl mx-auto bg-neutral-950/80 border border-white/15 p-4 rounded-2xl shadow-2xl backdrop-blur-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <button
              onClick={() => setPreset(10)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg transition-all ${
                chaosLevel < 35
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-emerald-400'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inner Peace</span>
            </button>

            <button
              onClick={() => setPreset(50)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                chaosLevel >= 35 && chaosLevel <= 65
                  ? 'bg-neutral-800 text-white border border-white/20'
                  : 'text-neutral-500 hover:text-white'
              }`}
            >
              Chaos: {chaosLevel}%
            </button>

            <button
              onClick={() => setPreset(90)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg transition-all ${
                chaosLevel > 65
                  ? 'bg-red-950/80 text-red-400 border border-red-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-red-400'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>Digital Chaos</span>
            </button>
          </div>

          {/* Styled Dual-Color Gradient Track */}
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={chaosLevel}
              onChange={handleSliderChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-emerald-500 via-neutral-600 to-red-500 accent-white shadow-inner"
            />
          </div>
        </div>

        {/* Dual Split-Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {/* Left Side: Mindful Living */}
          <motion.div
            animate={{
              scale: chaosLevel < 50 ? 1.02 : 0.98,
              opacity: healthyWeight,
            }}
            transition={{ duration: 0.3 }}
            onClick={() => setPreset(15)}
            className={`apple-card p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              chaosLevel < 50
                ? 'border-emerald-500/50 bg-neutral-950/90 shadow-[0_0_40px_rgba(16,185,129,0.18)]'
                : 'border-white/10 bg-neutral-950/50 hover:border-emerald-500/30'
            }`}
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">Mindful Living</h3>
                    <p className="text-[11px] font-mono text-emerald-400">Biological Baseline Restored</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/50 text-emerald-300">
                  Calibrated
                </span>
              </div>

              {/* 3 Preserved Healthy Points with Creative Visual Polish */}
              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-emerald-500/20 flex items-start space-x-3">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">8 hours of restorative deep sleep</p>
                    <p className="text-xs text-neutral-400 font-light">Natural circadian melatonin cycle & REM brain repair</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-emerald-500/20 flex items-start space-x-3">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Present in family & real conversations</p>
                    <p className="text-xs text-neutral-400 font-light">Direct eye-contact, empathy, and genuine human presence</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-emerald-500/20 flex items-start space-x-3">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Unbroken study focus and peak clarity</p>
                    <p className="text-xs text-neutral-400 font-light">Sustained deep work without dopamine distraction loops</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Metric */}
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center space-x-1 text-emerald-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mental Energy: Optimal</span>
              </span>
              <span className="font-mono text-[11px] text-neutral-400">Cortisol: Low</span>
            </div>
          </motion.div>

          {/* Right Side: Compulsive Addiction */}
          <motion.div
            animate={{
              scale: chaosLevel > 50 ? 1.02 : 0.98,
              opacity: chaosWeight,
            }}
            transition={{ duration: 0.3 }}
            onClick={() => setPreset(85)}
            className={`apple-card p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              chaosLevel > 50
                ? 'border-red-500/50 bg-neutral-950/90 shadow-[0_0_40px_rgba(239,68,68,0.22)]'
                : 'border-white/10 bg-neutral-950/50 hover:border-red-500/30'
            }`}
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-500 shadow-sm">
                    <ShieldAlert className={`w-5 h-5 ${chaosLevel > 60 ? 'animate-pulse' : ''}`} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">Compulsive Addiction</h3>
                    <p className="text-[11px] font-mono text-red-400">Neurological Overstimulation</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-red-500/30 bg-red-950/50 text-red-400">
                  Critical
                </span>
              </div>

              {/* 3 Preserved Chaos Points with Creative Visual Polish */}
              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-red-500/20 flex items-start space-x-3">
                  <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 mt-0.5 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Late-night doomscrolling until 2:00 AM</p>
                    <p className="text-xs text-neutral-400 font-light">Blue light suppresses melatonin; waking up chronically exhausted</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-red-500/20 flex items-start space-x-3">
                  <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 mt-0.5 shrink-0">
                    <BellRing className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Constant phantom vibration anxiety</p>
                    <p className="text-xs text-neutral-400 font-light">Nervous anticipation even when phone is silent or away</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-red-500/20 flex items-start space-x-3">
                  <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 mt-0.5 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Fragmented attention span (under 8 seconds)</p>
                    <p className="text-xs text-neutral-400 font-light">Brain conditioned by micro-reels to reject deep intellectual effort</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Metric */}
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center space-x-1 text-red-400 font-medium">
                <Flame className="w-3.5 h-3.5" />
                <span>Mental Energy: Depleted</span>
              </span>
              <span className="font-mono text-[11px] text-red-400">Cortisol: Spiked</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer prompt */}
      <div className="text-center text-xs text-neutral-400 font-mono pb-2">
        Click either card or drag slider to switch contrast focus
      </div>
    </section>
  );
};
