import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  AlertTriangle,
  Smartphone,
  Sparkles,
  Zap,
  Calendar,
  HeartPulse,
  PieChart,
  UserCheck,
  ShieldAlert,
  Flame,
  Award,
  ArrowRight,
  TrendingUp,
  Skull
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
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between py-4 px-4 snap-start snap-always shrink-0 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial from-red-950/30 via-pink-950/15 to-black opacity-90 pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-1 pt-1">
        <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-500/40 px-3.5 py-1 rounded-full backdrop-blur-md shadow-lg">
          <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>SHOCKING LIFE EXPECTANCY CALCULATOR • REALITY CHECK</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-sans">
          Where Will Your Remaining 30 Years Go?
        </h2>

        <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-xl mx-auto">
          At age <strong className="text-amber-400 font-mono">{currentAge}</strong> with an average lifespan of <strong className="text-cyan-400 font-mono">{expectedLifespan}</strong>, you have exactly <strong className="text-red-400 font-mono">{yearsRemaining} years ({daysRemaining.toLocaleString()} days)</strong> left on Earth.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="relative z-10 max-w-4xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-3 items-center py-1">
        {/* Left Column: Interactive Input Controls & Shock Metrics */}
        <div className="lg:col-span-5 space-y-2 text-left">
          {/* Controls Card */}
          <div className="apple-card p-3.5 rounded-2xl border border-white/10 bg-neutral-950/90 space-y-2.5 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Adjust Your Daily Profile</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                {yearsRemaining} Yrs Left
              </span>
            </div>

            {/* Slider 1: Current Age */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-300">Your Current Age:</span>
                <span className="font-extrabold text-amber-400">{currentAge} Years</span>
              </div>
              <input
                type="range"
                min="18"
                max="50"
                step="1"
                value={currentAge}
                onChange={handleAgeChange}
                className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2: Daily Instagram Usage */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-300">Instagram Daily Use:</span>
                <span className="font-extrabold text-pink-400">{dailyInstagramHours.toFixed(1)} Hrs / Day</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={dailyInstagramHours}
                onChange={handleInstagramHoursChange}
                className="w-full accent-pink-500 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 3: Other Social Media (YT, WA, FB) */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-300">YouTube + WA + FB:</span>
                <span className="font-extrabold text-cyan-400">{dailyOtherSocialHours.toFixed(1)} Hrs / Day</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.1"
                value={dailyOtherSocialHours}
                onChange={handleOtherSocialHoursChange}
                className="w-full accent-cyan-400 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Total Daily Social Screen Time */}
            <div className="p-2 bg-red-950/60 border border-red-500/40 rounded-xl text-xs font-mono flex items-center justify-between text-red-300">
              <span>Total Social Media Screen:</span>
              <span className="font-black text-sm text-red-400">{totalDailySocialMedia.toFixed(1)} Hrs / Day</span>
            </div>
          </div>

          {/* Shock Callout Box */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-red-950/80 via-pink-950/80 to-purple-950/80 border border-red-500/50 shadow-2xl space-y-1.5 text-left">
            <div className="flex items-center space-x-1.5 text-[10px] font-mono font-black text-red-400 uppercase tracking-wider">
              <Skull className="w-3.5 h-3.5 text-red-400 animate-bounce" />
              <span>THE SHOCKING TRUTH</span>
            </div>
            <div className="text-lg font-black text-white font-sans leading-tight">
              You will spend <strong className="text-red-500 font-mono underline">{totalSocialYears} FULL YEARS</strong> staring at a lit glass screen!
            </div>
            <p className="text-[11px] text-neutral-300 font-sans leading-snug">
              Out of your remaining <strong className="text-amber-300 font-mono">{yearsRemaining} years</strong>, Instagram alone eats <strong className="text-pink-400 font-mono">{instagramYears} years ({instagramHours30Yrs.toLocaleString()} hrs)</strong> of continuous 24/7 scrolling!
            </p>
          </div>
        </div>

        {/* Right Column: Visual Infographic Lifetime Stack Bar & Time Horizon Table */}
        <div className="lg:col-span-7 space-y-2.5">
          {/* Infographic Lifetime Breakdown Stacked Bar */}
          <div className="apple-card p-4 rounded-3xl border border-white/10 bg-neutral-950/95 space-y-3 shadow-2xl backdrop-blur-md text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <PieChart className="w-3.5 h-3.5 text-pink-400" />
                <span>30-Year Remaining Lifetime Breakdown ({yearsRemaining} Yrs = 100%)</span>
              </span>
              <span className="text-[10px] font-mono text-red-400 font-bold bg-red-950/80 border border-red-500/30 px-2 py-0.5 rounded-full">
                {socialMediaPercent}% Lost To Scrolling
              </span>
            </div>

            {/* Visual Stacked Progress Bar */}
            <div className="space-y-1">
              <div className="w-full h-7 rounded-xl bg-neutral-900 border border-white/10 flex overflow-hidden p-0.5 shadow-inner">
                {/* Sleep */}
                <div
                  style={{ width: `${sleepPercent}%` }}
                  className="h-full bg-indigo-600 flex items-center justify-center text-[9px] font-mono font-bold text-white transition-all duration-300"
                  title={`Sleep: ${sleepYears} Yrs (${sleepPercent}%)`}
                >
                  {Number(sleepPercent) > 10 && `Sleep ${sleepYears}y`}
                </div>

                {/* Work/Job */}
                <div
                  style={{ width: `${workPercent}%` }}
                  className="h-full bg-blue-600 flex items-center justify-center text-[9px] font-mono font-bold text-white transition-all duration-300"
                  title={`Work: ${workYears} Yrs (${workPercent}%)`}
                >
                  {Number(workPercent) > 10 && `Work ${workYears}y`}
                </div>

                {/* Essential Chores */}
                <div
                  style={{ width: `${choresPercent}%` }}
                  className="h-full bg-amber-600 flex items-center justify-center text-[9px] font-mono font-bold text-white transition-all duration-300"
                  title={`Chores: ${choresYears} Yrs (${choresPercent}%)`}
                >
                  {Number(choresPercent) > 8 && `Chores ${choresYears}y`}
                </div>

                {/* Social Media (SCROLLING TRAP) */}
                <div
                  style={{ width: `${socialMediaPercent}%` }}
                  className="h-full bg-gradient-to-r from-red-600 via-pink-600 to-amber-500 flex items-center justify-center text-[9px] font-mono font-black text-white animate-pulse transition-all duration-300 shadow-lg"
                  title={`Social Media: ${totalSocialYears} Yrs (${socialMediaPercent}%)`}
                >
                  {Number(socialMediaPercent) > 8 && `SCROLL ${totalSocialYears}y`}
                </div>

                {/* Actual Remaining Conscious Free Life */}
                <div
                  style={{ width: `${freeConsciousPercent}%` }}
                  className="h-full bg-emerald-500 flex items-center justify-center text-[9px] font-mono font-black text-black transition-all duration-300"
                  title={`Real Living: ${freeConsciousYears} Yrs (${freeConsciousPercent}%)`}
                >
                  {Number(freeConsciousPercent) > 5 && `LIFE ${freeConsciousYears}y`}
                </div>
              </div>

              {/* Stacked Bar Color Legend */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 text-[10px] font-mono pt-1 text-neutral-300">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-indigo-600" />
                  <span>Sleep ({sleepYears}y)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-blue-600" />
                  <span>Work ({workYears}y)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-amber-600" />
                  <span>Chores ({choresYears}y)</span>
                </span>
                <span className="flex items-center gap-1 font-bold text-red-400">
                  <span className="w-2.5 h-2.5 rounded bg-pink-600" />
                  <span>Social Media ({totalSocialYears}y)</span>
                </span>
                <span className="flex items-center gap-1 font-bold text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                  <span>Real Conscious Life ({freeConsciousYears}y)</span>
                </span>
              </div>
            </div>

            {/* Time Horizon Progression Table (Day -> Month -> Year -> 30 Years) */}
            <div className="grid grid-cols-4 gap-1.5 text-center pt-1 font-mono">
              <div className="bg-neutral-900/90 p-2 rounded-xl border border-white/5">
                <div className="text-[9px] text-neutral-400 uppercase">1 Day</div>
                <div className="text-xs font-bold text-red-400">{totalDailySocialMedia.toFixed(1)} Hrs</div>
                <div className="text-[8px] text-neutral-400">{(totalDailySocialMedia / 24 * 100).toFixed(0)}% of day</div>
              </div>

              <div className="bg-neutral-900/90 p-2 rounded-xl border border-white/5">
                <div className="text-[9px] text-neutral-400 uppercase">1 Month</div>
                <div className="text-xs font-bold text-red-400">{(totalDailySocialMedia * 30).toFixed(0)} Hrs</div>
                <div className="text-[8px] text-amber-400 font-bold">{((totalDailySocialMedia * 30) / 24).toFixed(1)} Days</div>
              </div>

              <div className="bg-neutral-900/90 p-2 rounded-xl border border-white/5">
                <div className="text-[9px] text-neutral-400 uppercase">1 Year</div>
                <div className="text-xs font-bold text-red-400">{Math.round(totalDailySocialMedia * 365).toLocaleString()} Hrs</div>
                <div className="text-[8px] text-pink-400 font-bold">{((totalDailySocialMedia * 365) / 24).toFixed(0)} Days</div>
              </div>

              <div className="bg-red-950/80 p-2 rounded-xl border border-red-500/40">
                <div className="text-[9px] text-red-300 uppercase font-bold">{yearsRemaining} Years</div>
                <div className="text-xs font-black text-red-400">{totalSocialHours30Yrs.toLocaleString()} Hrs</div>
                <div className="text-[9px] text-red-400 font-black">{totalSocialYears} YEARS</div>
              </div>
            </div>

            {/* Critical Takeaway Comparison Banner */}
            <div className="p-2.5 bg-neutral-900/95 rounded-2xl border border-white/10 text-xs font-sans text-neutral-200 flex justify-between items-center">
              <span>Time Left For Pursuing Dreams & Relationships:</span>
              <span className="font-black font-mono text-emerald-400 text-sm">
                Only {freeConsciousYears} Years ({freeConsciousPercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Warning */}
      <div className="relative z-10 text-center text-[10px] font-mono text-neutral-400 pb-0.5">
        Life Expectancy Reality Check • Every scroll takes time away from your remaining 262,800 hours on Earth.
      </div>
    </section>
  );
};
