import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../../utils/soundEngine';
import {
  Zap,
  Cpu,
  AlertCircle,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Sliders,
  Activity,
  Lock,
  Unlock,
  ArrowRight,
  Brain,
  Heart,
} from 'lucide-react';

interface Props {
  activeDriverIndex: number;
  onSelectDriver: (idx: number) => void;
  onScrollToNext?: () => void;
  onScrollToPrev?: () => void;
}

interface DriverInfo {
  id: number;
  stageName: string;
  title: string;
  tagline: string;
  insight: string;
  statNumber: string;
  statLabel: string;
  brainArea: string;
  glowColor: string;
  borderColor: string;
  textColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DRIVERS: DriverInfo[] = [
  {
    id: 1,
    stageName: 'Reflex',
    title: 'Compulsion to Refresh',
    tagline: 'The Involuntary Loop',
    insight: 'Thumb unlocks and swipes before conscious thought can decide.',
    statNumber: '70%',
    statLabel: 'Subconscious unlocks with zero alerts',
    brainArea: 'Striatum • Motor Loop',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    borderColor: 'border-red-500/70',
    textColor: 'text-red-400',
    icon: Zap,
  },
  {
    id: 2,
    stageName: 'Tolerance',
    title: 'Receptor Burnout',
    tagline: 'Chemical Blunting',
    insight: 'Brain downregulates dopamine; real life feels agonizingly dull.',
    statNumber: '+40%',
    statLabel: 'More screen time needed to feel baseline',
    brainArea: 'Nucleus Accumbens • D2 Receptors',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    borderColor: 'border-purple-500/70',
    textColor: 'text-purple-400',
    icon: Cpu,
  },
  {
    id: 3,
    stageName: 'Phantom',
    title: 'Phantom Vibrations',
    tagline: 'Sensory Illusion',
    insight: 'Brain mistakes harmless fabric friction for social alerts.',
    statNumber: '89%',
    statLabel: 'Feel false vibrations in empty pockets',
    brainArea: 'Sensory Cortex • False Signal',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    borderColor: 'border-cyan-500/70',
    textColor: 'text-cyan-400',
    icon: AlertCircle,
  },
  {
    id: 4,
    stageName: 'Withdrawal',
    title: 'Separation Distress',
    tagline: 'Cortisol Spike',
    insight: 'Disconnection triggers biological distress and chemical panic.',
    statNumber: '15 Min',
    statLabel: 'Until stress hormone cortisol surges',
    brainArea: 'Amygdala • Chemical Panic',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    borderColor: 'border-rose-500/70',
    textColor: 'text-rose-400',
    icon: ShieldAlert,
  },
];

export const DefinitionScene: React.FC<Props> = ({
  activeDriverIndex,
  onSelectDriver,
  onScrollToNext,
  onScrollToPrev,
}) => {
  const [isTransitioningNext, setIsTransitioningNext] = useState<boolean>(false);

  // --- Interactive Lab 1: Pull to Refresh ---
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [refreshNotification, setFeedNotification] = useState<string>('❤️ 14 friends liked your photo');
  const [refreshCount, setRefreshCount] = useState<number>(3);

  // --- Interactive Lab 2: Screen Time Slider ---
  const [screenTime, setScreenTime] = useState<number>(5);

  // --- Interactive Lab 3: Phantom Vibration ---
  const [isVibrating, setIsVibrating] = useState<boolean>(false);
  const [surveyAnswer, setSurveyAnswer] = useState<'yes' | 'no' | null>(null);

  // --- Interactive Lab 4: Quarantine Vault ---
  const [isQuarantined, setIsQuarantined] = useState<boolean>(false);
  const [quarantineSeconds, setQuarantineSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isQuarantined) {
      interval = setInterval(() => {
        setQuarantineSeconds((s) => (s >= 15 ? 15 : s + 1));
      }, 1000);
    } else {
      setQuarantineSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isQuarantined]);

  const handlePrev = () => {
    soundEngine.playClickTone();
    if (activeDriverIndex > 0) {
      onSelectDriver(activeDriverIndex - 1);
    } else {
      onScrollToPrev?.();
    }
  };

  const handleNext = () => {
    soundEngine.playClickTone();
    if (activeDriverIndex < DRIVERS.length - 1) {
      onSelectDriver(activeDriverIndex + 1);
    } else {
      handleTriggerNextScene();
    }
  };

  const handleTriggerNextScene = () => {
    soundEngine.playSubBassImpact();
    setIsTransitioningNext(true);
    setTimeout(() => {
      onScrollToNext?.();
      setTimeout(() => {
        setIsTransitioningNext(false);
      }, 400);
    }, 600);
  };

  const handlePullFeed = () => {
    if (isRefreshing) return;
    soundEngine.playNotificationPing();
    setIsRefreshing(true);
    setRefreshCount((c) => c + 1);

    const rewards = [
      '❤️ +24 new likes on your Reel',
      '💬 New Direct Message received',
      '🔥 Someone mentioned you in a comment',
      '📸 3 friends shared new updates',
    ];

    setTimeout(() => {
      setFeedNotification(rewards[Math.floor(Math.random() * rewards.length)]);
      setIsRefreshing(false);
    }, 600);
  };

  const handleTriggerVibrate = () => {
    if (isVibrating) return;
    soundEngine.playNotificationPing();
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 1000);
  };

  const current = DRIVERS[activeDriverIndex] || DRIVERS[0];
  const CurrentIcon = current.icon;

  const sensitivityPct = Math.max(15, Math.round(100 - screenTime * 8.5));
  const cortisolLevel = Math.min(50, Math.round(12 + quarantineSeconds * 2.5));

  return (
    <section className="h-screen w-full text-white relative flex flex-col justify-between py-3 px-4 sm:px-8 select-none bg-neutral-950 overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${current.glowColor} 0%, rgba(6, 3, 5, 0.98) 70%)`,
          opacity: 0.95,
        }}
      />

      {/* =================================================================== */}
      {/* 1. TOP HEADER & DRIVER STEPS (INACTIVE ARE SOFTLY BLURRED)           */}
      {/* =================================================================== */}
      <header className="relative z-20 max-w-5xl mx-auto w-full flex flex-col space-y-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 font-bold uppercase">SCENE 8</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-300 font-bold tracking-wider">
              WHAT IS SOCIAL MEDIA ADDICTION?
            </span>
          </div>

          <div className="text-xs font-mono text-neutral-400">
            Driver {activeDriverIndex + 1} of {DRIVERS.length}
          </div>
        </div>

        {/* DRIVER STEPS BAR: Inactive drivers are blurred, active is highlighted */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          <button
            onClick={handlePrev}
            disabled={activeDriverIndex === 0 && !onScrollToPrev}
            className="p-1.5 rounded-xl bg-neutral-900 border border-white/10 text-white disabled:opacity-20 disabled:pointer-events-none hover:bg-neutral-800 transition-all cursor-pointer shrink-0"
            title="Previous Driver"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DRIVERS.map((d, idx) => {
              const isSelected = activeDriverIndex === idx;
              const Icon = d.icon;

              return (
                <button
                  key={d.id}
                  onClick={() => {
                    soundEngine.playClickTone();
                    onSelectDriver(idx);
                  }}
                  className={`p-2 sm:p-2.5 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative ${
                    isSelected
                      ? `bg-neutral-900/95 ${d.borderColor} shadow-[0_0_25px_${d.glowColor}] ring-2 ring-red-500/70 scale-105 opacity-100 blur-none z-10 font-bold`
                      : 'bg-neutral-950/60 border-white/10 opacity-25 blur-[2.5px] scale-95 grayscale hover:grayscale-0 hover:blur-none hover:opacity-85 hover:scale-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className={isSelected ? d.textColor : 'text-neutral-400'}>
                      0{d.id} {d.stageName}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? d.textColor : 'text-neutral-500'}`} />
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white truncate pt-0.5">
                    {d.title}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="p-1.5 rounded-xl bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800 transition-all cursor-pointer shrink-0"
            title="Next Driver"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* =================================================================== */}
      {/* 2. CENTER STAGE: ULTRA-MINIMAL TEXT & HIGH-IMPACT LAB               */}
      {/* =================================================================== */}
      <main className="relative z-10 max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
          >
            {/* LEFT (5 cols): ULTRA-MINIMAL ONE-LINERS & HUGE STAT */}
            <div className="md:col-span-5 space-y-4 text-left">
              <div className="space-y-1">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">
                  DRIVER 0{current.id} • {current.tagline.toUpperCase()}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {current.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed pt-1">
                  {current.insight}
                </p>
              </div>

              {/* Big Stat Hero */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-md">
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-amber-400 font-mono tracking-tight">
                  {current.statNumber}
                </div>
                <div className="text-xs text-neutral-400 font-mono pt-1">
                  {current.statLabel}
                </div>
              </div>

              {/* Minimal Brain Tag */}
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300">
                <Brain className="w-4 h-4 text-red-400 shrink-0" />
                <span className="truncate">{current.brainArea}</span>
              </div>
            </div>

            {/* RIGHT (7 cols): ROOMY & CRISP INTERACTIVE LAB */}
            <div className="md:col-span-7 bg-neutral-900/90 rounded-3xl border border-white/15 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
              {/* LAB 1: COMPULSION TO REFRESH */}
              {activeDriverIndex === 0 && (
                <div className="space-y-4 text-center">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-2">
                    <span className="text-amber-400 font-bold flex items-center space-x-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>THE SLOT REFRESH FEEDER</span>
                    </span>
                    <span className="text-neutral-400">Pulls today: {refreshCount * 28}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-950 border border-white/10 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
                      <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </div>

                    <div className="text-sm font-mono text-white font-semibold min-h-[22px]">
                      {isRefreshing ? (
                        <span className="text-red-400 animate-pulse">Checking feed...</span>
                      ) : (
                        refreshNotification
                      )}
                    </div>

                    <div className="text-[11px] font-mono text-neutral-400">
                      Motor reflex: <span className="text-white font-bold">140ms</span> • Variable dopamine burst
                    </div>
                  </div>

                  <button
                    onClick={handlePullFeed}
                    disabled={isRefreshing}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs font-mono uppercase tracking-wider shadow-lg hover:scale-102 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Pull Down to Refresh Feed</span>
                  </button>
                </div>
              )}

              {/* LAB 2: TOLERANCE SLIDER */}
              {activeDriverIndex === 1 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-2">
                    <span className="text-purple-400 font-bold flex items-center space-x-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>DOPAMINE RECEPTOR SENSITIVITY</span>
                    </span>
                    <span className="text-white font-bold">{screenTime} Hours / Day</span>
                  </div>

                  {/* Slider */}
                  <div className="space-y-1 bg-neutral-950 p-3 rounded-2xl border border-white/10">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={screenTime}
                      onChange={(e) => {
                        soundEngine.playClickTone();
                        setScreenTime(Number(e.target.value));
                      }}
                      className="w-full accent-purple-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-1">
                      <span>1h (Sharp mind)</span>
                      <span>5h (Average)</span>
                      <span>10h (Anhedonia)</span>
                    </div>
                  </div>

                  {/* Visual 24 Dots */}
                  <div className="p-3 bg-neutral-950 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-neutral-400">Active D2 Receptors:</span>
                      <span
                        className={`font-black ${
                          sensitivityPct > 55
                            ? 'text-emerald-400'
                            : sensitivityPct > 35
                            ? 'text-amber-400'
                            : 'text-rose-500'
                        }`}
                      >
                        {sensitivityPct}%
                      </span>
                    </div>

                    <div className="grid grid-cols-8 gap-1.5 p-2 bg-black/60 rounded-xl">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const threshold = (i / 24) * 100;
                        const isAlive = sensitivityPct > threshold;
                        return (
                          <div
                            key={i}
                            className={`h-3.5 rounded-sm transition-all duration-300 ${
                              isAlive
                                ? 'bg-gradient-to-t from-purple-600 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.7)]'
                                : 'bg-neutral-800/40 opacity-20'
                            }`}
                          />
                        );
                      })}
                    </div>

                    <div className="text-[11px] font-mono text-neutral-400 text-center">
                      {screenTime <= 3
                        ? '🟢 Normal tasks & books feel rewarding.'
                        : screenTime <= 6
                        ? '🟡 Mild numbness. Real life feels slow.'
                        : '🔴 Severe burnout. Only short reels stimulate.'}
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: PHANTOM VIBRATION */}
              {activeDriverIndex === 2 && (
                <div className="space-y-4 text-center">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-2">
                    <span className="text-cyan-400 font-bold flex items-center space-x-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span>TACTILE RADAR TEST</span>
                    </span>
                    <span className="text-neutral-400">89% experience this</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      isVibrating
                        ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_25px_rgba(6,182,212,0.5)] scale-102'
                        : 'border-white/10 bg-neutral-950'
                    }`}
                  >
                    <motion.div
                      animate={isVibrating ? { x: [-4, 4, -3, 3, 0] } : {}}
                      transition={{ duration: 0.3, repeat: 3 }}
                      className="py-2 space-y-1.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mx-auto text-cyan-300">
                        <Activity className={`w-5 h-5 ${isVibrating ? 'animate-bounce' : ''}`} />
                      </div>
                      <div className="text-xs font-mono font-bold text-white">
                        {isVibrating ? '⚡ [PHANTOM BUZZ FIRED]' : 'Pocket Sensor Idle'}
                      </div>
                    </motion.div>

                    <button
                      onClick={handleTriggerVibrate}
                      disabled={isVibrating}
                      className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Trigger Pocket Vibration
                    </button>
                  </div>

                  {/* 2-Option Poll */}
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-white/10 flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-neutral-300 text-[11px] truncate">Felt ghost vibration?</span>
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          soundEngine.playNotificationPing();
                          setSurveyAnswer('yes');
                        }}
                        className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                          surveyAnswer === 'yes'
                            ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold'
                            : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        Yes (89%)
                      </button>
                      <button
                        onClick={() => {
                          soundEngine.playClickTone();
                          setSurveyAnswer('no');
                        }}
                        className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                          surveyAnswer === 'no'
                            ? 'bg-neutral-800 border-white/30 text-white font-bold'
                            : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        No (11%)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4: QUARANTINE VAULT */}
              {activeDriverIndex === 3 && (
                <div className="space-y-4 text-center">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-2">
                    <span className="text-rose-400 font-bold flex items-center space-x-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>PHONE QUARANTINE SIMULATOR</span>
                    </span>
                    <span className="text-neutral-400">
                      {isQuarantined ? `T+ ${quarantineSeconds}m` : 'Unlocked'}
                    </span>
                  </div>

                  <div className="p-4 bg-neutral-950 rounded-2xl border border-white/10 space-y-3 text-left">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-neutral-400">Cortisol Level:</span>
                      <span
                        className={`font-black ${
                          cortisolLevel > 35 ? 'text-red-500 animate-pulse' : 'text-amber-400'
                        }`}
                      >
                        {cortisolLevel} ng/mL
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 transition-all duration-300"
                        style={{ width: `${(cortisolLevel / 50) * 100}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono pt-1 text-neutral-300">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                        <span>{68 + Math.round(quarantineSeconds * 1.5)} BPM</span>
                      </span>
                      <span className="text-rose-400 font-bold">
                        {quarantineSeconds < 5
                          ? 'Mild FOMO'
                          : quarantineSeconds < 10
                          ? 'Restless Twitch'
                          : 'Nomophobic Panic'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        soundEngine.playNotificationPing();
                        setIsQuarantined(!isQuarantined);
                      }}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                        isQuarantined
                          ? 'bg-rose-950 border border-rose-500 text-rose-300'
                          : 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white hover:scale-102 active:scale-95'
                      }`}
                    >
                      {isQuarantined ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      <span>
                        {isQuarantined ? 'Release Phone from Vault' : 'Lock Phone for 15 Min'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* =================================================================== */}
      {/* 3. BOTTOM FOOTER CONTROLS                                           */}
      {/* =================================================================== */}
      <footer className="relative z-20 max-w-5xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-2 text-xs font-mono">
        <button
          onClick={handlePrev}
          disabled={activeDriverIndex === 0 && !onScrollToPrev}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{activeDriverIndex === 0 ? 'Instagram Evolution' : 'Previous Driver'}</span>
        </button>

        <div className="flex items-center space-x-2">
          {DRIVERS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                soundEngine.playClickTone();
                onSelectDriver(i);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activeDriverIndex === i
                  ? 'bg-red-500 scale-125 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                  : 'bg-neutral-700 hover:bg-neutral-500'
              }`}
              title={`Jump to Driver ${i + 1}`}
            />
          ))}
        </div>

        {activeDriverIndex < DRIVERS.length - 1 ? (
          <button
            onClick={handleNext}
            className="flex items-center space-x-1 px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold transition-all cursor-pointer"
          >
            <span>Next: Driver 0{activeDriverIndex + 2}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleTriggerNextScene}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white font-bold shadow-lg animate-pulse hover:scale-105 transition-all cursor-pointer"
          >
            <span>Advance to Scene 9</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </footer>

      {/* =================================================================== */}
      {/* 4. SILKY SMOOTH TRANSITION OVERLAY                                  */}
      {/* =================================================================== */}
      <AnimatePresence>
        {isTransitioningNext && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-cyan-600 flex items-center justify-center shadow-lg mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              SCENE 9
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Healthy Balance vs. Digital Chaos
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
