import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../../utils/soundEngine';
import { AlertCircle, Zap, ShieldAlert, Cpu, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const DefinitionScene: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);
  const [direction, setDirection] = useState(1);

  const pillars = [
    {
      id: 1,
      tag: 'Reason 01 / 04 • Impulse Loop',
      titleEn: '1. Compulsion to Refresh',
      descEn: 'An uncontrollable urge to check notification feeds every few minutes, even when no message or vibration has arrived.',
      stat: '70% of phone checks happen completely subconsciously without any alert trigger.',
      icon: Zap,
      accentColor: 'from-amber-500 to-red-600',
      glowColor: 'rgba(239, 68, 68, 0.4)',
    },
    {
      id: 2,
      tag: 'Reason 02 / 04 • Chemical Resistance',
      titleEn: '2. Escalation & Tolerance',
      descEn: 'Needing progressively higher screen time and more extreme dopamine hits to achieve the same emotional stimulation or escape boredom.',
      stat: 'Users gradually require up to 40% longer screen sessions each month to feel satisfied.',
      icon: Cpu,
      accentColor: 'from-red-500 to-purple-600',
      glowColor: 'rgba(168, 85, 247, 0.4)',
    },
    {
      id: 3,
      tag: 'Reason 03 / 04 • Sensory Illusion',
      titleEn: '3. Phantom Vibrations',
      descEn: 'Sensing your phone vibrating or ringing in your pocket or bag when it is completely silent, in another room, or turned off.',
      stat: 'Up to 89% of regular smartphone users report experiencing neurological false alerts.',
      icon: AlertCircle,
      accentColor: 'from-cyan-500 to-blue-600',
      glowColor: 'rgba(6, 182, 212, 0.4)',
    },
    {
      id: 4,
      tag: 'Reason 04 / 04 • Chemical Withdrawal',
      titleEn: '4. Separation Anxiety',
      descEn: 'Experiencing noticeable irritability, restlessness, FOMO, and brain fog whenever separated from your smartphone for extended periods.',
      stat: 'Cortisol (stress hormone) spikes within 15 minutes of being without phone access.',
      icon: ShieldAlert,
      accentColor: 'from-rose-500 to-red-700',
      glowColor: 'rgba(244, 63, 94, 0.4)',
    },
  ];

  const goToNext = () => {
    soundEngine.playNotificationPing();
    setDirection(1);
    setActivePillar((prev) => (prev + 1) % pillars.length);
  };

  const goToPrev = () => {
    soundEngine.playNotificationPing();
    setDirection(-1);
    setActivePillar((prev) => (prev - 1 + pillars.length) % pillars.length);
  };

  const handleSelectPillar = (idx: number) => {
    if (idx === activePillar) return;
    soundEngine.playNotificationPing();
    setDirection(idx > activePillar ? 1 : -1);
    setActivePillar(idx);
  };

  // Keyboard navigation support for presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePillar]);

  const current = pillars[activePillar];
  const CurrentIcon = current.icon;

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.94,
      filter: 'blur(6px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.94,
      filter: 'blur(6px)',
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between items-center py-6 px-4 snap-start snap-always shrink-0 overflow-hidden select-none">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle, ${current.glowColor} 0%, transparent 70%)`,
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Top Header */}
      <div className="text-center space-y-2 relative z-10 pt-2 sm:pt-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-red-400 bg-red-950/50 border border-red-500/30 px-4 py-1.5 rounded-full backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-red-400" />
          <span>Behavioral Definition</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-snug">
          What is Social Media Addiction?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed hidden sm:block">
          "A behavioral state where compulsive scrolling overrides sleep, human connection, career focus, and mental clarity."
        </p>
      </div>

      {/* Center Stage Presentation Area */}
      <div className="relative w-full max-w-3xl mx-auto my-auto flex items-center justify-center px-2">
        {/* Previous Button (Left Arrow) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrev();
          }}
          className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center bg-neutral-900/80 border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white transition-all shadow-xl backdrop-blur-md hover:scale-105 active:scale-95"
          aria-label="Previous Reason"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Animated Spotlight Center Card */}
        <div className="w-full relative min-h-[330px] sm:min-h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              onClick={goToNext}
              className="apple-card w-full p-6 sm:p-9 rounded-3xl border border-white/15 bg-neutral-950/80 shadow-2xl relative overflow-hidden cursor-pointer group hover:border-white/30 transition-colors"
            >
              {/* Subtle top light bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${current.accentColor}`}
              />

              <div className="flex flex-col items-center text-center space-y-4">
                {/* Category / Badge */}
                <span className="text-[11px] font-mono tracking-widest uppercase text-red-400 bg-red-950/40 border border-red-500/20 px-3 py-1 rounded-full">
                  {current.tag}
                </span>

                {/* Pulsing Icon Halo */}
                <div className="relative">
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${current.accentColor} flex items-center justify-center text-white shadow-xl glow-red transition-transform duration-300 group-hover:scale-105`}
                  >
                    <CurrentIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white stroke-[2.2]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {current.titleEn}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed max-w-xl">
                  {current.descEn}
                </p>

                {/* Real-World Stat / Insight Box */}
                <div className="w-full max-w-lg bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-neutral-300 flex items-center justify-center space-x-2 backdrop-blur-sm">
                  <span className="text-red-400 font-bold uppercase tracking-wider text-[10px]">Fact:</span>
                  <span className="text-neutral-300 text-[11px] sm:text-xs leading-tight">{current.stat}</span>
                </div>

                {/* Interactive Click Cue */}
                <div className="pt-2 flex items-center space-x-1.5 text-xs text-neutral-400 group-hover:text-red-400 transition-colors font-medium">
                  <span>Click card to proceed ({activePillar + 1} of {pillars.length})</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button (Right Arrow) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center bg-neutral-900/80 border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white transition-all shadow-xl backdrop-blur-md hover:scale-105 active:scale-95"
          aria-label="Next Reason"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom 4 Reason Step Selectors */}
      <div className="w-full max-w-2xl mx-auto pb-4 relative z-10 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase text-neutral-400 px-1">
          <span>Explore All 4 Drivers</span>
          <span className="text-red-400 font-semibold">{activePillar + 1} / {pillars.length}</span>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activePillar === idx;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectPillar(idx)}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 border relative ${
                  isSelected
                    ? 'border-red-500 bg-neutral-900/90 glow-red shadow-lg scale-102'
                    : 'border-white/10 hover:border-white/20 bg-neutral-950/60 hover:bg-neutral-900/50'
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <motion.div
                    layoutId="activeReasonPill"
                    className="absolute -top-1 left-3 right-3 h-0.5 bg-red-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <Icon
                  className={`w-4 h-4 mb-1 transition-colors ${
                    isSelected ? 'text-red-400' : 'text-neutral-500'
                  }`}
                />
                <span
                  className={`text-[10px] sm:text-xs font-semibold leading-tight line-clamp-1 ${
                    isSelected ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  {item.titleEn.split('. ')[1]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
