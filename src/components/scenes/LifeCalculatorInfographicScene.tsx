import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldAlert,
  UserCheck,
  PieChart,
  Skull,
  Clock,
  Sparkles,
  TrendingDown,
  Compass,
  Zap,
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export const LifeCalculatorInfographicScene: React.FC = () => {
  // User Customizable Inputs for the Infographic
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [expectedLifespan, setExpectedLifespan] = useState<number>(60);
  const [dailyInstagramHours, setDailyInstagramHours] = useState<number>(1.6); // India avg
  const [dailyOtherSocialHours, setDailyOtherSocialHours] = useState<number>(2.9); // YT + FB + WA

  const yearsRemaining = Math.max(1, expectedLifespan - currentAge);
  const daysRemaining = yearsRemaining * 365;
  const totalHoursRemaining = daysRemaining * 24;

  // Daily Breakdown
  const totalDailySocialMedia = dailyInstagramHours + dailyOtherSocialHours;
  const dailySleep = 8.0;
  const dailyWorkJob = 8.0;
  const dailyChoresCommute = 3.0; // Bath, food, travel, errands
  const dailyFreeConsciousTime = Math.max(0, 24 - (totalDailySocialMedia + dailySleep + dailyWorkJob + dailyChoresCommute));

  // 30 Years Time Projections (in Hours and Years)
  const instagramHours30Yrs = Math.round(dailyInstagramHours * 365 * yearsRemaining);
  const totalSocialHours30Yrs = Math.round(totalDailySocialMedia * 365 * yearsRemaining);
  const sleepHours30Yrs = Math.round(dailySleep * 365 * yearsRemaining);
  const workHours30Yrs = Math.round(dailyWorkJob * 365 * yearsRemaining);
  const choresHours30Yrs = Math.round(dailyChoresCommute * 365 * yearsRemaining);
  const freeConsciousHours30Yrs = Math.round(dailyFreeConsciousTime * 365 * yearsRemaining);

  // Converted into FULL 24-HOUR YEARS
  const instagramYears = (instagramHours30Yrs / (24 * 365)).toFixed(1);
  const totalSocialYears = (totalSocialHours30Yrs / (24 * 365)).toFixed(1);
  const sleepYears = (sleepHours30Yrs / (24 * 365)).toFixed(1);
  const workYears = (workHours30Yrs / (24 * 365)).toFixed(1);
  const choresYears = (choresHours30Yrs / (24 * 365)).toFixed(1);
  const freeConsciousYears = (freeConsciousHours30Yrs / (24 * 365)).toFixed(1);

  // Percentages of Remaining Life
  const socialMediaPercent = ((totalSocialHours30Yrs / totalHoursRemaining) * 100).toFixed(1);
  const sleepPercent = ((sleepHours30Yrs / totalHoursRemaining) * 100).toFixed(1);
  const workPercent = ((workHours30Yrs / totalHoursRemaining) * 100).toFixed(1);
  const choresPercent = ((choresHours30Yrs / totalHoursRemaining) * 100).toFixed(1);
  const freeConsciousPercent = ((freeConsciousHours30Yrs / totalHoursRemaining) * 100).toFixed(1);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAge(Number(e.target.value));
    soundEngine.playClickTone();
  };

  const handleInstagramHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDailyInstagramHours(Number(e.target.value));
    soundEngine.playClickTone();
  };

  const handleOtherSocialHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDailyOtherSocialHours(Number(e.target.value));
    soundEngine.playClickTone();
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between py-3 sm:py-4 px-3 sm:px-6 md:px-8 snap-start snap-always shrink-0 overflow-hidden select-none">
      {/* Background Radial Atmosphere Glow */}
      <div className="absolute inset-0 bg-radial from-red-950/25 via-pink-950/15 to-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[75vh] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header Banner - Maximized Width */}
      <div className="relative z-10 w-full max-w-7xl mx-auto text-center space-y-1">
        <div className="inline-flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-500/40 px-4 py-0.5 sm:py-1 rounded-full backdrop-blur-md shadow-lg">
          <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>SHOCKING LIFE EXPECTANCY CALCULATOR • REALITY CHECK</span>
        </div>

        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
          Where Will Your Remaining 30 Years Go?
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-sans max-w-3xl mx-auto">
          At age <strong className="text-amber-400 font-mono text-sm sm:text-base">{currentAge}</strong> with an expected lifespan of <strong className="text-cyan-400 font-mono text-sm sm:text-base">{expectedLifespan}</strong>, you have exactly <strong className="text-red-400 font-mono text-sm sm:text-base">{yearsRemaining} years ({daysRemaining.toLocaleString()} days)</strong> left on Earth.
        </p>
      </div>

      {/* Main Interactive Widget - Maximized across full width (max-w-7xl) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch py-1">
        
        {/* Left Column: Interactive Input Controls & Shock Metrics (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-2 sm:space-y-3">
          {/* Controls Card */}
          <div className="apple-card p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-white/10 bg-neutral-950/90 space-y-2.5 sm:space-y-3 backdrop-blur-md shadow-xl flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Adjust Your Daily Profile</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-300 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                {yearsRemaining} Yrs Left
              </span>
            </div>

            {/* Slider 1: Current Age */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs sm:text-sm font-mono">
                <span className="text-neutral-300">Your Current Age:</span>
                <span className="font-extrabold text-amber-400 text-sm sm:text-base">{currentAge} Years</span>
              </div>
              <input
                type="range"
                min="18"
                max="50"
                step="1"
                value={currentAge}
                onChange={handleAgeChange}
                className="w-full accent-amber-400 bg-neutral-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2: Daily Instagram Usage */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs sm:text-sm font-mono">
                <span className="text-neutral-300">Instagram Daily Use:</span>
                <span className="font-extrabold text-pink-400 text-sm sm:text-base">{dailyInstagramHours.toFixed(1)} Hrs / Day</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={dailyInstagramHours}
                onChange={handleInstagramHoursChange}
                className="w-full accent-pink-500 bg-neutral-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 3: Other Social Media (YT, WA, FB) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs sm:text-sm font-mono">
                <span className="text-neutral-300">YouTube + WA + FB:</span>
                <span className="font-extrabold text-cyan-400 text-sm sm:text-base">{dailyOtherSocialHours.toFixed(1)} Hrs / Day</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.1"
                value={dailyOtherSocialHours}
                onChange={handleOtherSocialHoursChange}
                className="w-full accent-cyan-400 bg-neutral-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Total Daily Social Screen Time Summary */}
            <div className="p-2 sm:p-2.5 bg-red-950/60 border border-red-500/40 rounded-xl text-xs sm:text-sm font-mono flex items-center justify-between text-red-200">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-red-400" />
                <span>Total Daily Social Screen:</span>
              </span>
              <span className="font-black text-sm sm:text-base text-red-400">{totalDailySocialMedia.toFixed(1)} Hrs / Day</span>
            </div>
          </div>

          {/* Shock Truth Callout Box */}
          <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-red-950/90 via-pink-950/90 to-purple-950/90 border border-red-500/50 shadow-2xl space-y-1.5 text-left">
            <div className="flex items-center space-x-1.5 text-xs font-mono font-black text-red-400 uppercase tracking-wider">
              <Skull className="w-4 h-4 text-red-400 animate-bounce" />
              <span>THE SHOCKING TRUTH</span>
            </div>
            <div className="text-base sm:text-xl lg:text-2xl font-black text-white font-sans leading-tight">
              You will spend <span className="text-red-400 font-mono underline decoration-red-500 underline-offset-4">{totalSocialYears} FULL YEARS</span> staring at a lit glass screen!
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-snug">
              Out of your remaining <strong className="text-amber-300 font-mono">{yearsRemaining} years</strong>, Instagram alone consumes <strong className="text-pink-400 font-mono">{instagramYears} years ({instagramHours30Yrs.toLocaleString()} hrs)</strong> of continuous 24/7 scrolling!
            </p>
          </div>
        </div>

        {/* Right Column: Visual Lifetime Stack Bar & Time Horizon Table (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-2 sm:space-y-3">
          <div className="apple-card p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/10 bg-neutral-950/95 space-y-3 sm:space-y-4 shadow-2xl backdrop-blur-md text-left flex-1 flex flex-col justify-between">
            
            {/* Header with lost percentage */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-white/10 pb-2">
              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-neutral-200 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-pink-400" />
                <span>30-Year Remaining Lifetime Breakdown ({yearsRemaining} Yrs = 100%)</span>
              </span>
              <span className="self-start sm:self-auto text-xs font-mono text-red-400 font-bold bg-red-950/90 border border-red-500/40 px-3 py-1 rounded-full shadow-md">
                {socialMediaPercent}% Lost To Scrolling
              </span>
            </div>

            {/* Visual Stacked Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-8 sm:h-10 rounded-xl bg-neutral-900 border border-white/10 flex overflow-hidden p-0.5 shadow-inner">
                {/* Sleep */}
                <div
                  style={{ width: `${sleepPercent}%` }}
                  className="h-full bg-indigo-600 flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold text-white transition-all duration-300 relative group cursor-default"
                  title={`Sleep: ${sleepYears} Yrs (${sleepPercent}%)`}
                >
                  {Number(sleepPercent) > 8 && <span>Sleep {sleepYears}y</span>}
                </div>

                {/* Work/Job */}
                <div
                  style={{ width: `${workPercent}%` }}
                  className="h-full bg-blue-600 flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold text-white transition-all duration-300 relative group cursor-default"
                  title={`Work: ${workYears} Yrs (${workPercent}%)`}
                >
                  {Number(workPercent) > 8 && <span>Work {workYears}y</span>}
                </div>

                {/* Essential Chores */}
                <div
                  style={{ width: `${choresPercent}%` }}
                  className="h-full bg-amber-600 flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold text-white transition-all duration-300 relative group cursor-default"
                  title={`Chores: ${choresYears} Yrs (${choresPercent}%)`}
                >
                  {Number(choresPercent) > 7 && <span>Chores {choresYears}y</span>}
                </div>

                {/* Social Media (SCROLLING TRAP) */}
                <div
                  style={{ width: `${socialMediaPercent}%` }}
                  className="h-full bg-gradient-to-r from-red-600 via-pink-600 to-amber-500 flex items-center justify-center text-[10px] sm:text-xs font-mono font-black text-white animate-pulse transition-all duration-300 shadow-lg cursor-default"
                  title={`Social Media: ${totalSocialYears} Yrs (${socialMediaPercent}%)`}
                >
                  {Number(socialMediaPercent) > 7 && <span>SCROLL {totalSocialYears}y</span>}
                </div>

                {/* Actual Remaining Conscious Free Life */}
                <div
                  style={{ width: `${freeConsciousPercent}%` }}
                  className="h-full bg-emerald-500 flex items-center justify-center text-[10px] sm:text-xs font-mono font-black text-black transition-all duration-300 cursor-default"
                  title={`Real Conscious Living: ${freeConsciousYears} Yrs (${freeConsciousPercent}%)`}
                >
                  {Number(freeConsciousPercent) > 5 && <span>LIFE {freeConsciousYears}y</span>}
                </div>
              </div>

              {/* Stacked Bar Color Legend with Expanded Spacing */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs font-mono pt-1 text-neutral-300">
                <div className="flex items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-lg border border-white/5">
                  <span className="w-3 h-3 rounded bg-indigo-600 shrink-0" />
                  <span className="truncate">Sleep ({sleepYears}y)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-lg border border-white/5">
                  <span className="w-3 h-3 rounded bg-blue-600 shrink-0" />
                  <span className="truncate">Work ({workYears}y)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-lg border border-white/5">
                  <span className="w-3 h-3 rounded bg-amber-600 shrink-0" />
                  <span className="truncate">Chores ({choresYears}y)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-red-950/40 border border-red-500/30 p-1.5 rounded-lg font-bold text-red-400">
                  <span className="w-3 h-3 rounded bg-pink-600 shrink-0" />
                  <span className="truncate">Scroll ({totalSocialYears}y)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 p-1.5 rounded-lg font-bold text-emerald-400 col-span-2 sm:col-span-1">
                  <span className="w-3 h-3 rounded bg-emerald-500 shrink-0" />
                  <span className="truncate">Living ({freeConsciousYears}y)</span>
                </div>
              </div>
            </div>

            {/* Time Horizon Progression Grid (Expanded Cards across 4 columns) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 text-center pt-1 font-mono">
              <div className="bg-neutral-900/95 p-2.5 sm:p-3 rounded-2xl border border-white/10 flex flex-col justify-center">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">1 Day</div>
                <div className="text-sm sm:text-base font-bold text-red-400 my-0.5">{totalDailySocialMedia.toFixed(1)} Hrs</div>
                <div className="text-[10px] text-neutral-400">{((totalDailySocialMedia / 24) * 100).toFixed(0)}% of your day</div>
              </div>

              <div className="bg-neutral-900/95 p-2.5 sm:p-3 rounded-2xl border border-white/10 flex flex-col justify-center">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">1 Month</div>
                <div className="text-sm sm:text-base font-bold text-red-400 my-0.5">{(totalDailySocialMedia * 30).toFixed(0)} Hrs</div>
                <div className="text-[10px] text-amber-400 font-bold">{((totalDailySocialMedia * 30) / 24).toFixed(1)} Full Days</div>
              </div>

              <div className="bg-neutral-900/95 p-2.5 sm:p-3 rounded-2xl border border-white/10 flex flex-col justify-center">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">1 Year</div>
                <div className="text-sm sm:text-base font-bold text-red-400 my-0.5">{Math.round(totalDailySocialMedia * 365).toLocaleString()} Hrs</div>
                <div className="text-[10px] text-pink-400 font-bold">{((totalDailySocialMedia * 365) / 24).toFixed(0)} Full Days</div>
              </div>

              <div className="bg-red-950/90 p-2.5 sm:p-3 rounded-2xl border border-red-500/50 flex flex-col justify-center shadow-lg">
                <div className="text-[10px] text-red-300 uppercase font-black tracking-wider">{yearsRemaining} Years Left</div>
                <div className="text-sm sm:text-base font-black text-red-400 my-0.5">{totalSocialHours30Yrs.toLocaleString()} Hrs</div>
                <div className="text-[11px] text-red-300 font-black tracking-wider">{totalSocialYears} FULL YEARS</div>
              </div>
            </div>

            {/* Critical Takeaway Comparison Banner - Expanded */}
            <div className="p-3 sm:p-3.5 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 rounded-2xl border border-white/10 text-xs sm:text-sm font-sans text-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-2">
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Actual Time Left For Pursuing Dreams, Family & Meaningful Life:</span>
              </span>
              <span className="font-black font-mono text-emerald-400 text-sm sm:text-base bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-500/30 whitespace-nowrap">
                Only {freeConsciousYears} Years ({freeConsciousPercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Reality Note */}
      <div className="relative z-10 text-center text-[10px] sm:text-[11px] font-mono text-neutral-400 pb-0.5">
        Life Expectancy Reality Check • Every scroll permanently subtracts conscious time from your remaining {daysRemaining.toLocaleString()} days on Earth.
      </div>
    </section>
  );
};
