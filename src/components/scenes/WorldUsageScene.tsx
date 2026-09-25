import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Clock, Users, Zap, ArrowDown, ChevronRight, Activity, Sparkles, Award } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';
import worldMapCountries from './worldMapData.json';

export const InstagramLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6.5" fill="url(#world-ig-grad)" />
    <rect x="5" y="5" width="14" height="14" rx="4" stroke="white" strokeWidth="1.8" fill="none" />
    <circle cx="12" cy="12" r="3.5" stroke="white" strokeWidth="1.8" fill="none" />
    <circle cx="15.5" cy="8.5" r="1" fill="white" />
    <defs>
      <linearGradient id="world-ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
  </svg>
);

export const YouTubeLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#FF0000" />
    <path d="M9.8 8.5L15.5 12L9.8 15.5V8.5Z" fill="white" />
  </svg>
);

export const FacebookLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path d="M14 12.5H12.2V18H9.8V12.5H8.5V10.3H9.8V8.8C9.8 7.3 10.6 6 12.8 6C13.7 6 14.4 6.1 14.4 6.1V8.2H13.5C12.7 8.2 12.2 8.6 12.2 9.3V10.3H14.4L14 12.5Z" fill="white" />
  </svg>
);

export const WhatsAppLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#25D366" />
    <path d="M12 4C7.58 4 4 7.58 4 12C4 13.52 4.42 14.94 5.16 16.16L4 20L7.96 18.88C9.14 19.58 10.52 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM15.82 14.88C15.6 15.5 14.54 16.02 14.02 16.08C13.52 16.14 12.88 16.18 10.72 15.28C8.18 14.22 6.54 11.64 6.42 11.48C6.3 11.32 5.4 10.12 5.4 8.88C5.4 7.64 6.04 7.04 6.28 6.78C6.52 6.52 6.8 6.46 7.02 6.46C7.24 6.46 7.42 6.46 7.58 6.48C7.76 6.5 7.92 6.44 8.08 6.84C8.26 7.28 8.7 8.36 8.76 8.48C8.82 8.6 8.86 8.74 8.78 8.9C8.7 9.06 8.64 9.16 8.52 9.3C8.4 9.44 8.26 9.62 8.16 9.72C8.04 9.84 7.92 9.98 8.06 10.22C8.2 10.46 8.68 11.24 9.38 11.86C10.28 12.66 11.02 12.92 11.26 13.04C11.5 13.16 11.64 13.14 11.78 12.98C11.92 12.82 12.38 12.28 12.54 12.06C12.7 11.84 12.86 11.88 13.08 11.96C13.3 12.04 14.48 12.62 14.72 12.74C14.96 12.86 15.12 12.92 15.18 13.02C15.24 13.12 15.24 13.62 15.02 14.24" fill="white" />
  </svg>
);

export interface GlobalHub {
  name: string;
  x: number;
  y: number;
  count: string;
  isPrimary?: boolean;
}

export interface PlatformStage {
  id: 'whatsapp' | 'facebook' | 'youtube' | 'instagram';
  name: string;
  badge: string;
  logo: React.FC<{ className?: string }>;
  accentColor: string;
  textColor: string;
  glowColor: string;
  mapColor: string;
  totalGlobalUsers: string; // e.g. "3.00 Billion"
  totalGlobalUsersNum: string; // "3,000,000,000"
  percentageOfWorld: string; // "36.6%"
  ratioDescription: string;
  category: string;
  highlightedCountryNames: string[];
  hubs: GlobalHub[];
  arcs: { from: [number, number]; to: [number, number]; control: [number, number] }[];
  impactDetails?: {
    totalAudience: string;
    dailyActive: string;
    monthlyScreenTime: string;
  };
}

const GLOBAL_POPULATION_STR = "8.2 Billion";

export const WORLD_STAGES: PlatformStage[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    badge: '#1 Global Messaging App',
    logo: WhatsAppLogo,
    accentColor: 'from-emerald-500 via-green-500 to-teal-500',
    textColor: 'text-emerald-400',
    glowColor: 'rgba(37, 211, 102, 0.45)',
    mapColor: '#25D366',
    totalGlobalUsers: '3.00 Billion',
    totalGlobalUsersNum: '3,000,000,000 Active Users',
    percentageOfWorld: '36.6%',
    ratioDescription: 'More than 1 in every 3 humans alive on Earth uses WhatsApp every month.',
    category: 'Instant Messaging & Calling',
    highlightedCountryNames: [
      'India', 'Brazil', 'Indonesia', 'Mexico', 'Nigeria', 'Germany', 'United Kingdom',
      'Italy', 'Spain', 'South Africa', 'Argentina', 'Colombia', 'Egypt', 'Pakistan', 'Saudi Arabia', 'Kenya', 'Turkey'
    ],
    hubs: [
      { name: 'INDIA (535M+)', x: 718, y: 235, count: '535M+', isPrimary: true },
      { name: 'BRAZIL (140M+)', x: 340, y: 335, count: '140M+' },
      { name: 'INDONESIA (112M+)', x: 825, y: 295, count: '112M+' },
      { name: 'MEXICO (77M+)', x: 215, y: 220, count: '77M+' },
      { name: 'EUROPE (180M+)', x: 515, y: 145, count: '180M+' },
      { name: 'NIGERIA (51M+)', x: 515, y: 235, count: '51M+' },
    ],
    arcs: [
      { from: [718, 235], to: [515, 145], control: [610, 150] },
      { from: [718, 235], to: [340, 335], control: [520, 320] },
      { from: [718, 235], to: [825, 295], control: [770, 255] },
      { from: [718, 235], to: [215, 220], control: [460, 110] },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    badge: '#1 Largest Social Network in History',
    logo: FacebookLogo,
    accentColor: 'from-blue-600 via-sky-500 to-indigo-600',
    textColor: 'text-blue-400',
    glowColor: 'rgba(24, 119, 242, 0.45)',
    mapColor: '#1877F2',
    totalGlobalUsers: '3.07 Billion',
    totalGlobalUsersNum: '3,070,000,000 Active Users',
    percentageOfWorld: '37.4%',
    ratioDescription: '3 out of every 8 human beings on Earth actively log into Facebook.',
    category: 'Social Networking & Groups',
    highlightedCountryNames: [
      'India', 'United States', 'Indonesia', 'Brazil', 'Philippines', 'Mexico', 'Vietnam',
      'Egypt', 'Bangladesh', 'Pakistan', 'United Kingdom', 'Thailand', 'Nigeria', 'Turkey', 'Colombia'
    ],
    hubs: [
      { name: 'INDIA (315M+)', x: 718, y: 235, count: '315M+', isPrimary: true },
      { name: 'USA (175M+)', x: 215, y: 180, count: '175M+' },
      { name: 'INDONESIA (120M+)', x: 825, y: 295, count: '120M+' },
      { name: 'BRAZIL (110M+)', x: 340, y: 335, count: '110M+' },
      { name: 'EUROPE (308M+)', x: 515, y: 145, count: '308M+' },
      { name: 'PHILIPPINES (85M+)', x: 840, y: 235, count: '85M+' },
    ],
    arcs: [
      { from: [215, 180], to: [515, 145], control: [365, 120] },
      { from: [515, 145], to: [718, 235], control: [616, 150] },
      { from: [718, 235], to: [825, 295], control: [770, 255] },
      { from: [215, 180], to: [340, 335], control: [250, 260] },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    badge: '#1 Global Video & Streaming Platform',
    logo: YouTubeLogo,
    accentColor: 'from-red-600 via-rose-600 to-amber-600',
    textColor: 'text-red-400',
    glowColor: 'rgba(255, 0, 0, 0.45)',
    mapColor: '#FF0000',
    totalGlobalUsers: '2.70 Billion',
    totalGlobalUsersNum: '2,700,000,000 Active Users',
    percentageOfWorld: '32.9%',
    ratioDescription: 'Nearly 1 in every 3 humans on Earth consumes YouTube streams and Shorts.',
    category: 'Streaming, Long-form & Shorts',
    highlightedCountryNames: [
      'India', 'United States', 'Brazil', 'Indonesia', 'Japan', 'Mexico', 'Germany',
      'United Kingdom', 'South Korea', 'France', 'Turkey', 'Canada', 'Australia', 'Vietnam', 'Spain'
    ],
    hubs: [
      { name: 'INDIA (462M+)', x: 718, y: 235, count: '462M+', isPrimary: true },
      { name: 'USA (245M+)', x: 215, y: 180, count: '245M+' },
      { name: 'BRAZIL (142M+)', x: 340, y: 335, count: '142M+' },
      { name: 'INDONESIA (139M+)', x: 825, y: 295, count: '139M+' },
      { name: 'JAPAN (71M+)', x: 885, y: 185, count: '71M+' },
      { name: 'EUROPE (410M+)', x: 515, y: 145, count: '410M+' },
    ],
    arcs: [
      { from: [718, 235], to: [215, 180], control: [460, 90] },
      { from: [718, 235], to: [885, 185], control: [801, 175] },
      { from: [718, 235], to: [825, 295], control: [770, 255] },
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    badge: '#1 Visual Media & Dopamine Engine',
    logo: InstagramLogo,
    accentColor: 'from-pink-500 via-purple-600 to-amber-500',
    textColor: 'text-pink-400',
    glowColor: 'rgba(225, 48, 108, 0.50)',
    mapColor: '#E1306C',
    totalGlobalUsers: '2.50 Billion',
    totalGlobalUsersNum: '2,500,000,000 Active Users',
    percentageOfWorld: '30.5%',
    ratioDescription: 'Over 3 out of every 10 human beings on planet Earth actively scroll Instagram.',
    category: 'Visual Media, Reels & Stories',
    highlightedCountryNames: [
      'India', 'United States', 'Brazil', 'Indonesia', 'Turkey', 'Japan', 'Mexico',
      'United Kingdom', 'Germany', 'Italy', 'France', 'Canada', 'Australia', 'Spain', 'Argentina'
    ],
    hubs: [
      { name: 'INDIA (385M+)', x: 718, y: 235, count: '385M+', isPrimary: true },
      { name: 'USA (160M+)', x: 215, y: 180, count: '160M+' },
      { name: 'BRAZIL (135M+)', x: 340, y: 335, count: '135M+' },
      { name: 'INDONESIA (100M+)', x: 825, y: 295, count: '100M+' },
      { name: 'TURKEY (58M+)', x: 605, y: 175, count: '58M+' },
      { name: 'EUROPE (290M+)', x: 515, y: 145, count: '290M+' },
    ],
    arcs: [
      { from: [718, 235], to: [215, 180], control: [460, 90] },
      { from: [718, 235], to: [605, 175], control: [660, 185] },
      { from: [718, 235], to: [340, 335], control: [520, 320] },
    ],
    impactDetails: {
      totalAudience: '2.5 Billion',
      dailyActive: '1.5 Billion Daily',
      monthlyScreenTime: '33.1 hours',
    },
  },
];

interface Props {
  onScrollToNext?: () => void;
}

export const WorldUsageScene: React.FC<Props> = ({ onScrollToNext }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manualStageIndex, setManualStageIndex] = useState<number | null>(null);
  const lastActiveIndexRef = useRef<number>(0);

  const displayProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const stageCooldownRef = useRef<{ key: string; lockUntil: number }>({ key: '0', lockUntil: 0 });
  const lockedStageRef = useRef<{ activeIndex: number; stageLocalProgress: number }>({
    activeIndex: 0,
    stageLocalProgress: 0.5,
  });

  // Track sticky scroll progress with gentle inertia damping
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const stickyWrapper =
        containerRef.current.closest('.sticky-scene-container') ||
        containerRef.current.parentElement;
      const target = stickyWrapper || containerRef.current;
      const rect = target.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = rect.height - windowHeight;

      if (scrollableDistance > 0) {
        const raw = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
        targetProgressRef.current = raw;
      } else {
        targetProgressRef.current = 0;
      }
    };

    const scrollContainer = containerRef.current?.closest('.overflow-y-scroll') || window;
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    let animId: number;
    const animate = () => {
      const current = displayProgressRef.current;
      const target = targetProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        const next = current + diff * 0.05;
        displayProgressRef.current = next;
        setScrollProgress(next);
      } else if (current !== target) {
        displayProgressRef.current = target;
        setScrollProgress(target);
      }

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // 4 Sequential App Scroll Phases:
  // Phase 0: WhatsApp (0.00 -> 0.25)
  // Phase 1: Facebook (0.25 -> 0.50)
  // Phase 2: YouTube  (0.50 -> 0.75)
  // Phase 3: Instagram (0.75 -> 1.00)
  let rawActiveIndex = 0;
  let rawLocalProgress = 0;

  if (manualStageIndex !== null) {
    rawActiveIndex = Math.min(3, Math.max(0, manualStageIndex));
    rawLocalProgress = 0.5;
  } else {
    if (scrollProgress < 0.25) {
      rawActiveIndex = 0;
      rawLocalProgress = scrollProgress / 0.25;
    } else if (scrollProgress < 0.50) {
      rawActiveIndex = 1;
      rawLocalProgress = (scrollProgress - 0.25) / 0.25;
    } else if (scrollProgress < 0.75) {
      rawActiveIndex = 2;
      rawLocalProgress = (scrollProgress - 0.50) / 0.25;
    } else {
      rawActiveIndex = 3;
      rawLocalProgress = Math.min(1, (scrollProgress - 0.75) / 0.25);
    }
  }

  // False-scroll delay hold gate
  let activeIndex = rawActiveIndex;
  let stageLocalProgress = rawLocalProgress;

  if (manualStageIndex === null) {
    const stageKey = `${rawActiveIndex}`;
    const now = Date.now();

    if (stageKey !== stageCooldownRef.current.key) {
      if (now < stageCooldownRef.current.lockUntil) {
        activeIndex = lockedStageRef.current.activeIndex;
        stageLocalProgress = 0.5;
      } else {
        stageCooldownRef.current = { key: stageKey, lockUntil: now + 650 };
        lockedStageRef.current = { activeIndex: rawActiveIndex, stageLocalProgress: rawLocalProgress };
      }
    } else {
      lockedStageRef.current = { activeIndex: rawActiveIndex, stageLocalProgress: rawLocalProgress };
    }
  }

  // Sound triggers
  useEffect(() => {
    if (lastActiveIndexRef.current !== activeIndex) {
      lastActiveIndexRef.current = activeIndex;
      soundEngine.playClickTone();
    }
  }, [activeIndex]);

  // Holding plateau logic
  let stageOpacity = 1;
  let stageScale = 1;

  if (manualStageIndex === null) {
    if (stageLocalProgress < 0.05) {
      stageOpacity = Math.min(1, stageLocalProgress / 0.05);
      stageScale = 0.98 + stageOpacity * 0.02;
    } else if (stageLocalProgress > 0.95 && activeIndex < 3) {
      const fadeOutT = (stageLocalProgress - 0.95) / 0.05;
      stageOpacity = Math.max(0, 1 - fadeOutT);
      stageScale = 1.0 - fadeOutT * 0.02;
    } else {
      stageOpacity = 1;
      stageScale = 1;
    }
  }

  const currentStage = WORLD_STAGES[activeIndex];
  const StageLogo = currentStage.logo;

  const handleSelectStage = (index: number) => {
    soundEngine.playClickTone();
    setManualStageIndex(index);

    const stickyWrapper = containerRef.current?.closest('.sticky-scene-container') as HTMLElement;
    if (stickyWrapper) {
      const scrollableDistance = stickyWrapper.offsetHeight - window.innerHeight;
      if (scrollableDistance > 0) {
        const targetFraction = [0.10, 0.35, 0.60, 0.85][index];
        targetProgressRef.current = targetFraction;
        const targetScrollTop = stickyWrapper.offsetTop + targetFraction * scrollableDistance;
        const scrollContainer = containerRef.current?.closest('.overflow-y-scroll') || window;
        scrollContainer.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
      }
    }
  };

  const handleNextStage = () => {
    if (activeIndex < 3) {
      handleSelectStage(activeIndex + 1);
    } else if (onScrollToNext) {
      soundEngine.playSubBassImpact();
      onScrollToNext();
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-black text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* =================================================================== */}
      {/* 1. SEAMLESS AMBIENT BACKDROP LIGHTING (NO BORDERS) */}
      {/* =================================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#02050e]" />
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle at 65% 50%, ${currentStage.glowColor} 0%, rgba(3, 7, 18, 0.95) 70%, #000000 100%)`,
            opacity: 0.60,
          }}
        />
        {/* Soft edge darkening */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* =================================================================== */}
      {/* 2. TOP HEADER & INTERACTIVE STEPPER TABS (NO BORDERS) */}
      {/* =================================================================== */}
      <header className="relative z-20 max-w-6xl mx-auto w-full pt-3 sm:pt-4 px-4 text-center space-y-2">
        <div className="flex flex-col items-center space-y-0.5">
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3.5 py-0.5 rounded-full backdrop-blur-md shadow-lg">
            <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '14s' }} />
            <span>GLOBAL POPULATION: {GLOBAL_POPULATION_STR} HUMANS</span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-sans drop-shadow-md">
            World’s Digital Screen Reality
          </h2>
        </div>

        {/* 4 App Tabs (No Borders) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-3xl mx-auto pt-0.5">
          {WORLD_STAGES.map((stage, idx) => {
            const isActive = activeIndex === idx;
            const Logo = stage.logo;

            return (
              <button
                key={stage.id}
                onClick={() => handleSelectStage(idx)}
                className={`relative flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl transition-all duration-300 text-left cursor-pointer border-0 shadow-lg ${
                  isActive
                    ? 'bg-neutral-900/95 shadow-2xl scale-105 z-10 filter-none opacity-100'
                    : 'bg-neutral-950/50 hover:bg-neutral-900/60 opacity-30 hover:opacity-80 blur-[2px] hover:blur-none scale-95'
                }`}
              >
                <Logo className="w-5 h-5 sm:w-5.5 sm:h-5.5 shrink-0" />
                <div className="flex flex-col text-left">
                  <div className="text-[11px] sm:text-xs font-bold text-white font-sans leading-tight">{stage.name}</div>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <span className={`text-[10px] sm:text-[11px] font-mono font-black ${isActive ? stage.textColor : 'text-neutral-400'}`}>
                      {stage.percentageOfWorld}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400">
                      • {stage.totalGlobalUsers}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="world-active-bar"
                    className={`absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r ${stage.accentColor}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* =================================================================== */}
      {/* 3. CENTERPIECE: NO BORDERS • CLEAN LEFT DATA + RIGHT HIGHLIGHTED MAP */}
      {/* =================================================================== */}
      <div
        className="relative z-20 max-w-6xl mx-auto w-full px-4 my-auto transition-all duration-300 ease-out"
        style={{
          opacity: stageOpacity,
          transform: `scale(${stageScale})`,
        }}
      >
        <AnimatePresence mode="wait">
          {/* ------------------------------------------------------------- */}
          {/* STANDARD 4-APP VIEW: LEFT CLEAN DATA • RIGHT HIGHLIGHTED MAP   */}
          {/* ------------------------------------------------------------- */}
          <motion.div
              key={`screen-${currentStage.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center"
            >
              {/* LEFT COLUMN: Clean, Focused Data Panel (NO BORDERS) */}
              <div className="lg:col-span-5 bg-neutral-950/80 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 text-left border-0">
                {/* Header */}
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center space-x-2.5">
                    <StageLogo className="w-8 h-8 sm:w-9 sm:h-9" />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white font-sans flex items-center gap-2">
                        <span>{currentStage.name}</span>
                        <span className="text-[10px] font-mono text-neutral-400 font-normal px-2 py-0.5 rounded-full bg-neutral-900">
                          {currentStage.category}
                        </span>
                      </h3>
                      <p className="text-[11px] font-mono text-neutral-400">{currentStage.badge}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full uppercase ${currentStage.textColor} bg-neutral-900/80`}>
                    Global Share
                  </span>
                </div>

                {/* Big Percentage Number */}
                <div className="space-y-1.5 text-left">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                    Share of World Population
                  </span>

                  <div className="flex items-baseline space-x-3">
                    <span className={`text-5xl sm:text-6xl lg:text-7xl font-black font-mono tracking-tight ${currentStage.textColor} drop-shadow-lg`}>
                      {currentStage.percentageOfWorld}
                    </span>
                    <span className="text-xs sm:text-sm font-sans font-bold text-neutral-300 leading-tight">
                      OF ALL HUMANS<br />ON PLANET EARTH
                    </span>
                  </div>

                  {/* Progress Bar vs 8.2B Earth Total */}
                  <div className="pt-2 pb-1">
                    <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: currentStage.percentageOfWorld }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${currentStage.accentColor} rounded-full`}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1.5">
                      <span>0 People</span>
                      <span className="text-white font-bold">{currentStage.totalGlobalUsers} Users</span>
                      <span>8.2B Earth Total</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-200 font-sans font-semibold pt-1 leading-relaxed">
                    {currentStage.ratioDescription}
                  </p>
                </div>

                {/* Subtitle count banner */}
                <div className="p-3 rounded-2xl bg-neutral-900/80 flex items-center justify-between text-xs font-mono border-0">
                  <span className="text-neutral-400">Total Active Users:</span>
                  <span className="text-white font-extrabold text-sm">{currentStage.totalGlobalUsersNum}</span>
                </div>

                {/* Scroll Guidance Helper */}
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                    <span>
                      {activeIndex < 3
                        ? `Scroll down for ${WORLD_STAGES[activeIndex + 1].name}`
                        : "Scroll down for India's Screen Reality"}
                    </span>
                  </span>
                  <button
                    onClick={handleNextStage}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs transition-all cursor-pointer border-0"
                  >
                    <span>{activeIndex < 3 ? 'Next App' : 'India Reality'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: The World Map with Highlighted Countries (NO BORDERS) */}
              <div className="lg:col-span-7 bg-neutral-950/70 backdrop-blur-2xl rounded-3xl p-3 sm:p-5 shadow-2xl flex flex-col justify-between h-[340px] sm:h-[410px] lg:h-[470px] max-h-[58vh] border-0">
                <div className="flex items-center justify-between pb-1 shrink-0">
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                    <Activity className={`w-3.5 h-3.5 ${currentStage.textColor}`} />
                    <span>World Map • {currentStage.name} Highlighted Territories</span>
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full">
                    Active Territories Glowing
                  </span>
                </div>

                {/* The SVG World Map with Highlighted Countries */}
                <div className="relative w-full flex-1 flex items-center justify-center min-h-0 p-1">
                  <svg
                    className="w-full h-full max-h-[390px] object-contain drop-shadow-2xl transition-transform duration-700 ease-out"
                    viewBox="0 0 1000 500"
                    fill="none"
                  >
                    {/* Subtle Coordinate Grid Lines */}
                    <g stroke="#38bdf8" strokeOpacity="0.06" strokeWidth="0.75" strokeDasharray="3 4">
                      <line x1="250" y1="0" x2="250" y2="500" />
                      <line x1="500" y1="0" x2="500" y2="500" />
                      <line x1="750" y1="0" x2="750" y2="500" />
                      <line x1="0" y1="250" x2="1000" y2="250" strokeOpacity="0.12" strokeWidth="1" />
                    </g>

                    {/* Country Outlines & Highlights */}
                    <g strokeLinejoin="round">
                      {worldMapCountries.map((country, idx) => {
                        const isHighlighted = currentStage.highlightedCountryNames.includes(country.name);
                        const fillColor = isHighlighted
                          ? currentStage.mapColor
                          : '#0f172a';

                        return (
                          <path
                            key={idx}
                            d={country.d}
                            fill={fillColor}
                            fillOpacity={isHighlighted ? 0.88 : 0.25}
                            stroke={isHighlighted ? currentStage.mapColor : '#1e293b'}
                            strokeWidth={isHighlighted ? 1.0 : 0.35}
                            strokeOpacity={isHighlighted ? 0.95 : 0.2}
                            className="transition-all duration-700 ease-out cursor-pointer hover:fill-opacity-95"
                          >
                            <title>{country.name} {isHighlighted ? `(High ${currentStage.name} Penetration)` : ''}</title>
                          </path>
                        );
                      })}
                    </g>

                    {/* Intercontinental Pulse Arcs */}
                    <g className="transition-opacity duration-700" style={{ opacity: stageOpacity * 0.8 }}>
                      {currentStage.arcs.map((arc, idx) => (
                        <path
                          key={`arc-${currentStage.id}-${idx}`}
                          d={`M ${arc.from[0]} ${arc.from[1]} Q ${arc.control[0]} ${arc.control[1]}, ${arc.to[0]} ${arc.to[1]}`}
                          stroke={currentStage.mapColor}
                          strokeWidth="1.6"
                          strokeDasharray="4 4"
                          strokeOpacity="0.8"
                          fill="none"
                          className="animate-pulse"
                        />
                      ))}
                    </g>

                    {/* Epicenter Hubs with Ripple Pings */}
                    <g className="transition-opacity duration-500" style={{ opacity: stageOpacity }}>
                      {currentStage.hubs.map((hub, idx) => (
                        <g key={`hub-${currentStage.id}-${idx}`}>
                          <circle
                            cx={hub.x}
                            cy={hub.y}
                            r={hub.isPrimary ? 22 : 13}
                            stroke={currentStage.mapColor}
                            strokeWidth={hub.isPrimary ? 2 : 1.2}
                            fill="none"
                            className="animate-ping opacity-75"
                          />
                          <circle
                            cx={hub.x}
                            cy={hub.y}
                            r={hub.isPrimary ? 7 : 4}
                            fill={currentStage.mapColor}
                            className="animate-pulse"
                          />
                          <text
                            x={hub.x}
                            y={hub.y - (hub.isPrimary ? 13 : 9)}
                            fill="#ffffff"
                            stroke="#000000"
                            strokeWidth="3.2"
                            paintOrder="stroke"
                            fontSize={hub.isPrimary ? '10.5' : '8'}
                            fontWeight="900"
                            textAnchor="middle"
                            fontFamily="sans-serif"
                            letterSpacing="0.04em"
                          >
                            {hub.name}
                          </text>
                        </g>
                      ))}
                    </g>
                  </svg>
                </div>

                {/* Bottom Highlight Summary (No borders) */}
                <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono text-neutral-300 shrink-0">
                  <span className={`${currentStage.textColor} font-bold`}>High Penetration:</span>
                  <div className="flex items-center space-x-1.5 overflow-x-auto text-[9px]">
                    {currentStage.highlightedCountryNames.slice(0, 6).map((c, i) => (
                      <span key={i} className="bg-neutral-900/90 px-2 py-0.5 rounded-full text-white whitespace-nowrap">
                        {c}
                      </span>
                    ))}
                    <span className="text-neutral-500">+{currentStage.highlightedCountryNames.length - 6} more</span>
                  </div>
                </div>
              </div>
            </motion.div>
        </AnimatePresence>
      </div>

      {/* =================================================================== */}
      {/* 4. FOOTER STATUS BAR (NO BORDERS) */}
      {/* =================================================================== */}
      <footer className="relative z-20 max-w-6xl mx-auto w-full pb-3 px-4 flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-0">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            STAGE {activeIndex + 1} OF 4 • {currentStage.name.toUpperCase()} GLOBAL FOOTPRINT
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline text-neutral-400">
            Scroll drives platform progression
          </span>
          <div className="flex items-center space-x-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? 'w-6 bg-cyan-400'
                    : 'w-2 bg-neutral-700'
                }`}
              />
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
};
