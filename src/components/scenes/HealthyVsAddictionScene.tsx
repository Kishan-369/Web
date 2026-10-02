import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../../utils/soundEngine';
import { BalanceScale3D } from '../3d/BalanceScale3D';
import { ChaosAtmosphereCanvas } from '../3d/ChaosAtmosphereCanvas';
import { RhythmWaveVisualizer } from '../3d/RhythmWaveVisualizer';
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
  Play,
  RotateCcw,
  Heart,
  Eye,
  CheckCircle2,
} from 'lucide-react';

interface PopNotification {
  id: number;
  text: string;
  tag: string;
  top: string;
  right: string;
  color: string;
}

export const HealthyVsAddictionScene: React.FC = () => {
  const [chaosLevel, setChaosLevel] = useState(50);
  const [poppedCount, setPoppedCount] = useState(0);

  // 3D Scale physical impulse trigger
  const [impulseTrigger, setImpulseTrigger] = useState(0);
  const [impulseDirection, setImpulseDirection] = useState<'healthy' | 'chaos'>('healthy');

  // Floating fun reaction particles
  interface ReactionParticle {
    id: number;
    emoji: string;
    x: number;
    y: number;
  }
  const [reactionParticles, setReactionParticles] = useState<ReactionParticle[]>([]);

  // 24-Hour Day Attention Story Simulation
  const [isDaySimActive, setIsDaySimActive] = useState(false);
  const [dayPhaseText, setDayPhaseText] = useState('');
  const daySimTimerRef = useRef<number | null>(null);

  // Active micro-interaction trigger states
  const [activeItemEffect, setActiveItemEffect] = useState<string | null>(null);

  // Mouse parallax 3D card tilt
  const [leftCardTilt, setLeftCardTilt] = useState({ x: 0, y: 0 });
  const [rightCardTilt, setRightCardTilt] = useState({ x: 0, y: 0 });
  const [leftGlarePos, setLeftGlarePos] = useState({ x: 50, y: 50 });
  const [rightGlarePos, setRightGlarePos] = useState({ x: 50, y: 50 });

  // Floating notifications when in chaos
  const [floatingNotifs, setFloatingNotifs] = useState<PopNotification[]>([
    { id: 1, text: '342 Unread Messages', tag: '💬 Group', top: '15%', right: '-8%', color: 'border-red-500/60 bg-red-950/80 text-red-200' },
    { id: 2, text: 'You Won’t Believe This Reel 🔥', tag: '⚡ Viral', top: '55%', right: '-12%', color: 'border-pink-500/60 bg-pink-950/80 text-pink-200' },
    { id: 3, text: 'Did Your Pocket Just Vibrate?', tag: '🔔 Phantom', top: '85%', right: '-6%', color: 'border-amber-500/60 bg-amber-950/80 text-amber-200' },
  ]);

  // Smooth auto-simulation timer ref
  const animIntervalRef = useRef<number | null>(null);

  const stopAutoAnim = () => {
    if (animIntervalRef.current) {
      clearInterval(animIntervalRef.current);
      animIntervalRef.current = null;
    }
    if (daySimTimerRef.current) {
      clearTimeout(daySimTimerRef.current);
      daySimTimerRef.current = null;
      setIsDaySimActive(false);
      setDayPhaseText('');
    }
  };

  // Spawn delightful floating particle emojis on user action
  const spawnReactionParticles = (side: 'healthy' | 'chaos', clientX?: number, clientY?: number) => {
    const zenEmojis = ['🧘', '🌿', '💤', '🧠', '✨', '🍃', '☀️', '🕊️'];
    const chaosEmojis = ['📱', '💥', '🚨', '🔥', '⚡', '🔔', '👀', '💀'];
    const pool = side === 'healthy' ? zenEmojis : chaosEmojis;

    const newItems: ReactionParticle[] = [];
    const count = 5;
    const originX = clientX ?? (side === 'healthy' ? window.innerWidth * 0.25 : window.innerWidth * 0.75);
    const originY = clientY ?? window.innerHeight * 0.55;

    for (let i = 0; i < count; i++) {
      newItems.push({
        id: Date.now() + Math.random() + i,
        emoji: pool[Math.floor(Math.random() * pool.length)],
        x: originX + (Math.random() - 0.5) * 80,
        y: originY + (Math.random() - 0.5) * 40,
      });
    }

    setReactionParticles((prev) => [...prev, ...newItems]);

    setTimeout(() => {
      setReactionParticles((prev) => prev.filter((p) => !newItems.find((ni) => ni.id === p.id)));
    }, 1200);
  };

  // Run 24-Hour Day Attention Story: A fun, guided dynamic presentation
  const startDaySimulation = () => {
    stopAutoAnim();
    setIsDaySimActive(true);

    const phases = [
      { time: '07:00 AM', title: 'Morning Sunlight & Fresh Mind', target: 12, side: 'healthy' as const, note: 'Melatonin balanced • High cognitive clarity', sound: () => soundEngine.playBreathingTone('out') },
      { time: '01:30 PM', title: 'Workday Notification Surge', target: 55, side: 'chaos' as const, note: '40 pings • Attention begins fragmenting', sound: () => soundEngine.playNotificationPing() },
      { time: '07:00 PM', title: 'Algorithmic Reel Rabbit Hole', target: 78, side: 'chaos' as const, note: 'Variable dopamine • 2 hours vanished', sound: () => soundEngine.playDopamineTrigger() },
      { time: '11:45 PM', title: 'Midnight Blue-Light Doomscroll', target: 94, side: 'chaos' as const, note: 'Receptors depleted • Scale slams into critical overload!', sound: () => soundEngine.playGlitchSound() },
      { time: 'Next Day', title: 'Reclaiming Mindful Boundaries', target: 30, side: 'healthy' as const, note: 'Phone outside bedroom • Biology restored!', sound: () => soundEngine.playNotificationPing() },
    ];

    let currentPhaseIdx = 0;
    const runNextPhase = () => {
      if (currentPhaseIdx >= phases.length) {
        setIsDaySimActive(false);
        setDayPhaseText('');
        return;
      }
      const p = phases[currentPhaseIdx];
      setDayPhaseText(`${p.time} • ${p.title} (${p.note})`);
      p.sound();
      animateToLevel(p.target, 1400);
      setImpulseTrigger((prev) => prev + 1);
      setImpulseDirection(p.side);
      spawnReactionParticles(p.side);
      currentPhaseIdx++;
      daySimTimerRef.current = window.setTimeout(runNextPhase, 2700);
    };

    runNextPhase();
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    stopAutoAnim();
    const val = Number(e.target.value);
    setChaosLevel(val);
    if (val > 75) {
      soundEngine.playGlitchSound();
    } else {
      soundEngine.playClickTone();
    }
  };

  const setPreset = (val: number) => {
    stopAutoAnim();
    setChaosLevel(val);
    if (val > 75) {
      soundEngine.playGlitchSound();
    } else if (val < 35) {
      soundEngine.playBreathingTone('out');
    } else {
      soundEngine.playNotificationPing();
    }
  };

  // Smoothly animated transitions between extremes (Fun Demo Feature)
  const animateToLevel = (target: number, durationMs: number = 1800) => {
    stopAutoAnim();
    const startVal = chaosLevel;
    const startTime = performance.now();

    if (target > 70) {
      soundEngine.playGlitchSound();
    } else {
      soundEngine.playBreathingTone('in');
    }

    const step = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      // Smooth cubic easeInOut
      const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const current = Math.round(startVal + (target - startVal) * ease);
      setChaosLevel(current);

      if (progress < 1) {
        animIntervalRef.current = requestAnimationFrame(step) as unknown as number;
      } else {
        animIntervalRef.current = null;
        if (target < 30) soundEngine.playNotificationPing();
      }
    };
    animIntervalRef.current = requestAnimationFrame(step) as unknown as number;
  };

  useEffect(() => {
    return () => stopAutoAnim();
  }, []);

  // Card Parallax Hover Handlers
  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    card: 'left' | 'right'
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normY = (y / rect.height - 0.5) * 2;

    const tiltX = -normY * 6; // Max 6 deg tilt
    const tiltY = normX * 6;

    if (card === 'left') {
      setLeftCardTilt({ x: tiltX, y: tiltY });
      setLeftGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    } else {
      setRightCardTilt({ x: tiltX, y: tiltY });
      setRightGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    }
  };

  const handleCardMouseLeave = (card: 'left' | 'right') => {
    if (card === 'left') {
      setLeftCardTilt({ x: 0, y: 0 });
    } else {
      setRightCardTilt({ x: 0, y: 0 });
    }
  };

  // Fun Point Click Actions
  const triggerPointEffect = (pointKey: string, e?: React.MouseEvent) => {
    setActiveItemEffect(pointKey);
    setTimeout(() => setActiveItemEffect(null), 1400);

    const isHealthy = ['sleep', 'presence', 'focus'].includes(pointKey);
    setImpulseTrigger((prev) => prev + 1);
    setImpulseDirection(isHealthy ? 'healthy' : 'chaos');
    spawnReactionParticles(isHealthy ? 'healthy' : 'chaos', e?.clientX, e?.clientY);

    switch (pointKey) {
      case 'sleep':
        soundEngine.playBreathingTone('out');
        break;
      case 'presence':
        soundEngine.playNotificationPing();
        break;
      case 'focus':
        soundEngine.playClickTone();
        break;
      case 'doomscroll':
        soundEngine.playDopamineTrigger();
        break;
      case 'phantom':
        soundEngine.playGlitchSound();
        break;
      case 'attention':
        soundEngine.playGlitchSound();
        break;
      default:
        soundEngine.playClickTone();
    }
  };

  // Pop floating notification
  const handlePopNotif = (id: number, e?: React.MouseEvent) => {
    soundEngine.playNotificationPing();
    soundEngine.playClickTone();
    setPoppedCount((prev) => prev + 1);
    setFloatingNotifs((prev) => prev.filter((n) => n.id !== id));
    spawnReactionParticles('chaos', e?.clientX, e?.clientY);
    // Popping distraction gives satisfying health bump
    setImpulseTrigger((prev) => prev + 1);
    setImpulseDirection('healthy');

    // Respawn after 3.5 seconds with fresh relatable digital noise
    setTimeout(() => {
      const respawns: PopNotification[] = [
        { id: Date.now(), text: 'New follower requested', tag: '👤 Instagram', top: `${20 + Math.random() * 50}%`, right: '-10%', color: 'border-pink-500/60 bg-pink-950/80 text-pink-200' },
        { id: Date.now() + 1, text: 'Trending: Breaking Drama', tag: '🔥 Alert', top: `${20 + Math.random() * 50}%`, right: '-8%', color: 'border-red-500/60 bg-red-950/80 text-red-200' },
        { id: Date.now() + 2, text: 'Battery 3% • Do Not Sleep', tag: '⚡ 2:00 AM', top: `${20 + Math.random() * 50}%`, right: '-12%', color: 'border-amber-500/60 bg-amber-950/80 text-amber-200' },
      ];
      const pick = respawns[Math.floor(Math.random() * respawns.length)];
      setFloatingNotifs((prev) => [...prev, pick]);
    }, 3200);
  };

  // Normalized weightings for card opacity and scale
  const healthyWeight = Math.max(0.35, (100 - chaosLevel) / 100);
  const chaosWeight = Math.max(0.35, chaosLevel / 100);

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between items-center py-3 sm:py-5 px-3 sm:px-4 snap-start snap-always shrink-0 overflow-y-auto sm:overflow-hidden select-none">
      {/* 1. Live Background Particle Atmospheres (Floating Zen Spores + Chaotic Sparks) */}
      <ChaosAtmosphereCanvas chaosLevel={chaosLevel} />

      {/* Dynamic Ambient Background Aura */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
          opacity: (100 - chaosLevel) / 100,
        }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.35) 0%, transparent 70%)',
          opacity: chaosLevel / 100,
        }}
      />

      {/* 2. Header */}
      <div className="text-center space-y-1 relative z-10 pt-1 sm:pt-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3.5 py-1 rounded-full backdrop-blur-md shadow-sm">
          <Scale className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Interactive 3D Contrast</span>
        </div>
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
          Healthy Balance vs. Digital Chaos
        </h2>
        <p className="text-[11px] sm:text-xs text-neutral-400 font-light max-w-lg mx-auto leading-relaxed hidden sm:block">
          Watch the 3D balance scale tip as compulsive digital habits distort your biological baseline.
        </p>
      </div>

      {/* 3. Centerpiece: 3D Balance Scale + Controller & Split Cards */}
      <div className="w-full max-w-5xl mx-auto my-auto relative z-10 space-y-2.5 sm:space-y-3.5 px-1 sm:px-2">
        {/* Interactive 3D Balance Scale (Physical Spring Fulcrum & Breathing Pendulum) */}
        <div className="relative w-full max-w-2xl mx-auto">
          <BalanceScale3D
            chaosLevel={chaosLevel}
            impulseTrigger={impulseTrigger}
            impulseDirection={impulseDirection}
            onPanClick={(side) => {
              if (side === 'healthy') {
                setPreset(15);
                setImpulseTrigger((prev) => prev + 1);
                setImpulseDirection('healthy');
                spawnReactionParticles('healthy');
              } else {
                setPreset(85);
                setImpulseTrigger((prev) => prev + 1);
                setImpulseDirection('chaos');
                spawnReactionParticles('chaos');
              }
            }}
          />
        </div>

        {/* Dynamic 24-Hour Day Attention Story Banner when active */}
        <AnimatePresence>
          {isDaySimActive && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              className="max-w-xl mx-auto p-2.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-neutral-900/90 to-red-950/90 border border-cyan-400/40 text-center shadow-xl backdrop-blur-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold truncate">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                <span className="truncate">{dayPhaseText}</span>
              </div>
              <button
                onClick={stopAutoAnim}
                className="text-[10px] font-mono uppercase bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-full text-white cursor-pointer ml-2 shrink-0 transition-colors"
              >
                Stop
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Preset Bar & Range Track */}
        <div className="max-w-xl mx-auto bg-neutral-950/85 border border-white/15 p-3 sm:p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold gap-1">
            <button
              onClick={() => {
                setPreset(10);
                setImpulseTrigger((prev) => prev + 1);
                setImpulseDirection('healthy');
                spawnReactionParticles('healthy');
              }}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                chaosLevel < 35
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-sm scale-105'
                  : 'text-neutral-400 hover:text-emerald-400'
              }`}
              title="Set to Calm Zen"
            >
              <Sun className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inner Peace</span>
            </button>

            {/* Fun 24h Day Story Toggle Button */}
            <button
              onClick={startDaySimulation}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                isDaySimActive
                  ? 'bg-cyan-950/90 text-cyan-300 border-cyan-400/60 shadow-md animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border-white/15'
              }`}
              title="Play guided 24h attention cycle story"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isDaySimActive ? '24h Sim Playing...' : '▶ 24h Day Story'}</span>
            </button>

            <button
              onClick={() => {
                setPreset(90);
                setImpulseTrigger((prev) => prev + 1);
                setImpulseDirection('chaos');
                spawnReactionParticles('chaos');
              }}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                chaosLevel > 65
                  ? 'bg-red-950/80 text-red-400 border border-red-500/40 shadow-sm scale-105'
                  : 'text-neutral-400 hover:text-red-400'
              }`}
              title="Trigger Chaos Overload"
            >
              <Flame className="w-3.5 h-3.5 text-red-500 animate-bounce" />
              <span>Digital Chaos</span>
            </button>
          </div>

          {/* Styled Dual-Color Gradient Track with Live Pulsing Thumb Indicator */}
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

          {/* Fun Quick Simulation Toggles (Auto Easing Demo) */}
          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] font-mono text-neutral-400">
            <button
              onClick={() => {
                animateToLevel(12, 1800);
                setImpulseTrigger((prev) => prev + 1);
                setImpulseDirection('healthy');
                spawnReactionParticles('healthy');
              }}
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <Play className="w-2.5 h-2.5 text-emerald-400" />
              <span>Deep Zen Breath</span>
            </button>

            <span className="text-neutral-500 text-[9px]">• Tap pans or items to tip 3D scale •</span>

            <button
              onClick={() => {
                animateToLevel(92, 1600);
                setImpulseTrigger((prev) => prev + 1);
                setImpulseDirection('chaos');
                spawnReactionParticles('chaos');
              }}
              className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer"
            >
              <Zap className="w-2.5 h-2.5 text-red-400" />
              <span>Dopamine Rush</span>
            </button>
          </div>
        </div>

        {/* Dual Split-Stage Cards with Interactive 3D Perspective Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 items-stretch relative">
          {/* ========================================================= */}
          {/* LEFT SIDE: MINDFUL LIVING (ZEN, CALM, HARMONIC)           */}
          {/* ========================================================= */}
          <motion.div
            animate={{
              scale: chaosLevel < 50 ? 1.015 : 0.985,
              opacity: healthyWeight,
            }}
            transition={{ duration: 0.3 }}
            onMouseMove={(e) => handleCardMouseMove(e, 'left')}
            onMouseLeave={() => handleCardMouseLeave('left')}
            onClick={() => setPreset(15)}
            style={{
              transform: `perspective(1000px) rotateX(${leftCardTilt.x}deg) rotateY(${leftCardTilt.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
            className={`apple-card p-4 sm:p-6 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              chaosLevel < 50
                ? 'border-emerald-500/50 bg-neutral-950/90 shadow-[0_0_45px_rgba(16,185,129,0.22)]'
                : 'border-white/10 bg-neutral-950/50 hover:border-emerald-500/30'
            }`}
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500" />

            {/* Specular Spotlight Glare following mouse */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 280px at ${leftGlarePos.x}% ${leftGlarePos.y}%, rgba(52, 211, 153, 0.12), transparent 80%)`,
              }}
            />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm transition-transform ${
                      chaosLevel < 40 ? 'animate-zen-float' : ''
                    }`}
                  >
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-1.5">
                      <span>Mindful Living</span>
                      {chaosLevel < 35 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      )}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-mono text-emerald-400">Biological Baseline Restored</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/50 text-emerald-300">
                  Calibrated
                </span>
              </div>

              {/* Live EEG Waveform Visualization (Smooth Alpha Wave) */}
              <RhythmWaveVisualizer type="zen" intensity={100 - chaosLevel} />

              {/* 3 Preserved Healthy Points with Fun Interactive Clicks */}
              <div className="space-y-2 pt-1">
                {/* Point 1: Sleep */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerPointEffect('sleep', e);
                  }}
                  className={`p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] border transition-all duration-300 flex items-start space-x-3 cursor-pointer group hover:bg-emerald-950/20 ${
                    activeItemEffect === 'sleep'
                      ? 'border-emerald-400 bg-emerald-950/40 scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : 'border-emerald-500/20 hover:border-emerald-500/40'
                  }`}
                  title="Click to activate deep sleep pulse"
                >
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform relative">
                    <Moon className="w-4 h-4" />
                    {activeItemEffect === 'sleep' && (
                      <span className="absolute -top-3 -right-2 text-[10px] font-mono font-bold text-emerald-300 animate-bounce">
                        Zzz...
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-semibold text-white">8 hours of restorative deep sleep</p>
                      <span className="text-[9px] font-mono text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Tap
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-light leading-snug">
                      Natural circadian melatonin cycle & REM brain repair
                    </p>
                  </div>
                </div>

                {/* Point 2: Human Presence */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerPointEffect('presence', e);
                  }}
                  className={`p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] border transition-all duration-300 flex items-start space-x-3 cursor-pointer group hover:bg-emerald-950/20 ${
                    activeItemEffect === 'presence'
                      ? 'border-emerald-400 bg-emerald-950/40 scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : 'border-emerald-500/20 hover:border-emerald-500/40'
                  }`}
                  title="Click to activate connection"
                >
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform relative">
                    <Users className="w-4 h-4" />
                    {activeItemEffect === 'presence' && (
                      <Heart className="w-3.5 h-3.5 text-pink-400 absolute -top-2 -right-2 animate-ping" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-semibold text-white">Present in family & real conversations</p>
                      <span className="text-[9px] font-mono text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Tap
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-light leading-snug">
                      Direct eye-contact, empathy, and genuine human presence
                    </p>
                  </div>
                </div>

                {/* Point 3: Peak Focus */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerPointEffect('focus', e);
                  }}
                  className={`p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] border transition-all duration-300 flex items-start space-x-3 cursor-pointer group hover:bg-emerald-950/20 ${
                    activeItemEffect === 'focus'
                      ? 'border-emerald-400 bg-emerald-950/40 scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : 'border-emerald-500/20 hover:border-emerald-500/40'
                  }`}
                  title="Click to activate laser focus sweep"
                >
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform relative">
                    <Compass className={`w-4 h-4 ${activeItemEffect === 'focus' ? 'animate-spin' : ''}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-semibold text-white">Unbroken study focus and peak clarity</p>
                      <span className="text-[9px] font-mono text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Tap
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-light leading-snug">
                      Sustained deep work without dopamine distraction loops
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Metric */}
            <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 relative z-10">
              <span className="flex items-center space-x-1 text-emerald-400 font-medium">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Mental Energy: Optimal</span>
              </span>
              <span className="font-mono text-[11px] text-neutral-400">Cortisol: Low</span>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: COMPULSIVE ADDICTION (CHAOS, OVERSTIMULATION) */}
          {/* ========================================================= */}
          <motion.div
            animate={{
              scale: chaosLevel > 50 ? 1.015 : 0.985,
              opacity: chaosWeight,
            }}
            transition={{ duration: 0.3 }}
            onMouseMove={(e) => handleCardMouseMove(e, 'right')}
            onMouseLeave={() => handleCardMouseLeave('right')}
            onClick={() => setPreset(85)}
            style={{
              transform: `perspective(1000px) rotateX(${rightCardTilt.x}deg) rotateY(${rightCardTilt.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
            className={`apple-card p-4 sm:p-6 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-visible flex flex-col justify-between ${
              activeItemEffect === 'phantom' ? 'animate-vibrate' : ''
            } ${
              chaosLevel > 50
                ? 'border-red-500/50 bg-neutral-950/90 shadow-[0_0_45px_rgba(239,68,68,0.26)]'
                : 'border-white/10 bg-neutral-950/50 hover:border-red-500/30'
            }`}
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-amber-500" />

            {/* Specular Spotlight Glare following mouse */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl overflow-hidden"
              style={{
                background: `radial-gradient(circle 280px at ${rightGlarePos.x}% ${rightGlarePos.y}%, rgba(239, 68, 68, 0.14), transparent 80%)`,
              }}
            />

            {/* ========================================================= */}
            {/* FUN POP-ABLE FLOATING NOTIFICATIONS (ACTIVE AT HIGH CHAOS) */}
            {/* ========================================================= */}
            <AnimatePresence>
              {chaosLevel >= 60 &&
                floatingNotifs.map((notif) => (
                  <motion.div
                    key={notif.id}
                    initial={{ scale: 0, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 1.5, opacity: 0, filter: 'blur(6px)' }}
                    whileHover={{ scale: 1.08 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePopNotif(notif.id, e);
                    }}
                    style={{ top: notif.top, right: notif.right }}
                    className={`absolute z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-xl backdrop-blur-md text-[10px] font-mono cursor-pointer transition-transform ${notif.color} animate-bounce`}
                    title="Click to POP distraction!"
                  >
                    <span className="font-bold">{notif.tag}:</span>
                    <span className="truncate max-w-[130px]">{notif.text}</span>
                    <span className="text-[8px] bg-white/20 px-1 py-0.2 rounded font-bold">POP</span>
                  </motion.div>
                ))}
            </AnimatePresence>

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-500 shadow-sm ${
                      chaosLevel > 65 ? 'animate-pulse' : ''
                    }`}
                  >
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-1.5">
                      <span>Compulsive Addiction</span>
                      {chaosLevel > 60 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      )}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-mono text-red-400">Neurological Overstimulation</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {poppedCount > 0 && (
                    <span className="text-[9px] font-mono bg-amber-950/80 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full">
                      Popped: {poppedCount} 💥
                    </span>
                  )}
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-red-500/30 bg-red-950/50 text-red-400">
                    Critical
                  </span>
                </div>
              </div>

              {/* Live EEG Waveform Visualization (Jittery Gamma Wave) */}
              <RhythmWaveVisualizer type="chaos" intensity={chaosLevel} />

              {/* 3 Preserved Chaos Points with Fun Interactive Clicks */}
              <div className="space-y-2 pt-1">
                {/* Point 1: Late-night Doomscrolling */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerPointEffect('doomscroll', e);
                  }}
                  className={`p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] border transition-all duration-300 flex items-start space-x-3 cursor-pointer group hover:bg-red-950/20 ${
                    activeItemEffect === 'doomscroll'
                      ? 'border-red-400 bg-red-950/40 scale-[1.02] shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                      : 'border-red-500/20 hover:border-red-500/40'
                  }`}
                  title="Click to spin late-night clock"
                >
                  <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform relative">
                    <Clock className={`w-4 h-4 ${activeItemEffect === 'doomscroll' ? 'animate-spin' : ''}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-semibold text-white">Late-night doomscrolling until 2:00 AM</p>
                      <span className="text-[9px] font-mono text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Tap
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-light leading-snug">
                      Blue light suppresses melatonin; waking up chronically exhausted
                    </p>
                  </div>
                </div>

                {/* Point 2: Phantom Vibration Anxiety */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerPointEffect('phantom', e);
                  }}
                  className={`p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] border transition-all duration-300 flex items-start space-x-3 cursor-pointer group hover:bg-red-950/20 ${
                    activeItemEffect === 'phantom'
                      ? 'border-red-400 bg-red-950/50 scale-[1.03] shadow-[0_0_25px_rgba(239,68,68,0.4)] animate-vibrate'
                      : 'border-red-500/20 hover:border-red-500/40'
                  }`}
                  title="Click to trigger phantom phone vibration buzz"
                >
                  <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform relative">
                    <BellRing className={`w-4 h-4 ${activeItemEffect === 'phantom' ? 'animate-bounce text-red-300' : ''}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                        <span>Constant phantom vibration anxiety</span>
                        {activeItemEffect === 'phantom' && (
                          <span className="text-[9px] text-amber-300 font-mono font-bold animate-pulse">
                            *BUZZ*
                          </span>
                        )}
                      </p>
                      <span className="text-[9px] font-mono text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Tap
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-light leading-snug">
                      Nervous anticipation even when phone is silent or away
                    </p>
                  </div>
                </div>

                {/* Point 3: Fragmented Attention */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerPointEffect('attention', e);
                  }}
                  className={`p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] border transition-all duration-300 flex items-start space-x-3 cursor-pointer group hover:bg-red-950/20 ${
                    activeItemEffect === 'attention'
                      ? 'border-red-400 bg-red-950/40 scale-[1.02] shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                      : 'border-red-500/20 hover:border-red-500/40'
                  }`}
                  title="Click to zap attention span"
                >
                  <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform relative">
                    <Zap className={`w-4 h-4 ${activeItemEffect === 'attention' ? 'animate-ping text-yellow-300' : ''}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-semibold text-white">Fragmented attention span (under 8 seconds)</p>
                      <span className="text-[9px] font-mono text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Tap
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-light leading-snug">
                      Brain conditioned by micro-reels to reject deep intellectual effort
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Metric */}
            <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 relative z-10">
              <span className="flex items-center space-x-1 text-red-400 font-medium">
                <Flame className="w-3.5 h-3.5 animate-pulse" />
                <span>Mental Energy: Depleted</span>
              </span>
              <span className="font-mono text-[11px] text-red-400">Cortisol: Spiked</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Click Reaction Particles Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {reactionParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.6, x: p.x, y: p.y }}
            animate={{
              opacity: 0,
              scale: 1.6,
              x: p.x + (Math.random() - 0.5) * 80,
              y: p.y - 120,
              rotate: (Math.random() - 0.5) * 60,
            }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute text-2xl select-none drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          >
            {p.emoji}
          </motion.div>
        ))}
      </div>

      {/* 4. Footer prompt with fun hint */}
      <div className="text-center text-[10px] sm:text-xs text-neutral-400 font-mono pb-1 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>Tap any card item to trigger its biological reaction • Drag slider or pans to tip the 3D scale</span>
      </div>
    </section>
  );
};
