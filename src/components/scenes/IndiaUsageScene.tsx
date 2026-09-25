import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Clock, Users, Zap, ArrowDown, ChevronRight, Activity, Sparkles, Flame, Award, Globe } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';
import { InstagramLogo, YouTubeLogo, FacebookLogo, WhatsAppLogo } from './WorldUsageScene';
import indiaStatesData from './indiaStatesData.json';

export interface MetroHub {
  name: string;
  x: number;
  y: number;
  count: string;
  isPrimary?: boolean;
}

export interface PlatformIndiaStage {
  id: 'whatsapp' | 'facebook' | 'youtube' | 'instagram';
  name: string;
  badge: string;
  logo: React.FC<{ className?: string }>;
  accentColor: string;
  textColor: string;
  borderColor: string;
  glowColor: string;
  mapColor: string;
  totalIndiaUsers: string; // e.g. "550 Million"
  totalIndiaUsersNum: string; // "550,000,000"
  percentageOfIndia: string; // "37.7%"
  ratioDescription: string;
  category: string;
  topCities: string[];
  keyIndiaFact: string;
  metroHubs: MetroHub[];
  impactDetails?: {
    totalAudience: string;
    dailyActive: string;
    monthlyScreenTime: string;
    daysPerYear: string;
    dailyAverage: string;
    reelsEngagement: string;
  };
}

const INDIA_POPULATION_STR = "1.46 Billion";

export const INDIA_STAGES: PlatformIndiaStage[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    badge: '#1 Digital Operating System in India',
    logo: WhatsAppLogo,
    accentColor: 'from-emerald-500 via-green-500 to-teal-500',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/50',
    glowColor: 'rgba(37, 211, 102, 0.45)',
    mapColor: '#25D366',
    totalIndiaUsers: '550 Million',
    totalIndiaUsersNum: '550,000,000 Active Citizens',
    percentageOfIndia: '37.7%',
    ratioDescription: 'Over 1 in every 3 Indian citizens uses WhatsApp monthly — India is WhatsApp’s #1 market worldwide.',
    category: 'Messaging, Group Chats & Payments',
    topCities: ['Mumbai (38M+)', 'Delhi NCR (35M+)', 'Bengaluru (22M+)', 'Hyderabad (18M+)', 'Kolkata (16M+)'],
    keyIndiaFact: 'Functions as India’s default digital operating system — used across all 28 states & 8 UTs for family conversations, local merchant orders, and instant UPI payments.',
    metroHubs: [
      { name: 'DELHI NCR (35M+)', x: 165, y: 181, count: '35M+', isPrimary: true },
      { name: 'MUMBAI (38M+)', x: 98, y: 354, count: '38M+' },
      { name: 'BENGALURU (22M+)', x: 171, y: 465, count: '22M+' },
      { name: 'KOLKATA (16M+)', x: 336, y: 290, count: '16M+' },
      { name: 'HYDERABAD (18M+)', x: 185, y: 385, count: '18M+' },
      { name: 'CHENNAI (15M+)', x: 212, y: 463, count: '15M+' },
      { name: 'AHMEDABAD (14M+)', x: 94, y: 282, count: '14M+' },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    badge: '#1 Community Network in India',
    logo: FacebookLogo,
    accentColor: 'from-blue-600 via-sky-500 to-indigo-600',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/50',
    glowColor: 'rgba(24, 119, 242, 0.45)',
    mapColor: '#1877F2',
    totalIndiaUsers: '350 Million',
    totalIndiaUsersNum: '350,000,000 Active Citizens',
    percentageOfIndia: '24.0%',
    ratioDescription: 'Nearly 1 in every 4 Indian citizens uses Facebook for community groups, news, and marketplace commerce.',
    category: 'Social Networking & Marketplace',
    topCities: ['Delhi NCR (26M+)', 'Mumbai (24M+)', 'Kolkata (21M+)', 'Lucknow (14M+)', 'Jaipur (12M+)'],
    keyIndiaFact: 'India has more registered Facebook accounts than any other country, penetrating deeply into Tier-2 and Tier-3 rural districts.',
    metroHubs: [
      { name: 'DELHI NCR (26M+)', x: 165, y: 181, count: '26M+', isPrimary: true },
      { name: 'MUMBAI (24M+)', x: 98, y: 354, count: '24M+' },
      { name: 'KOLKATA (21M+)', x: 336, y: 290, count: '21M+' },
      { name: 'BENGALURU (16M+)', x: 171, y: 465, count: '16M+' },
      { name: 'LUCKNOW (14M+)', x: 235, y: 220, count: '14M+' },
      { name: 'JAIPUR (12M+)', x: 140, y: 225, count: '12M+' },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    badge: '#1 Video & Streaming Giant in India',
    logo: YouTubeLogo,
    accentColor: 'from-red-600 via-rose-600 to-amber-600',
    textColor: 'text-red-400',
    borderColor: 'border-red-500/50',
    glowColor: 'rgba(255, 0, 0, 0.45)',
    mapColor: '#FF0000',
    totalIndiaUsers: '500 Million',
    totalIndiaUsersNum: '500,000,000 Active Citizens',
    percentageOfIndia: '34.2%',
    ratioDescription: 'Over 1 in every 3 Indian citizens watches YouTube daily — India is YouTube’s single largest national audience on Earth.',
    category: 'Streaming, Vernacular Video & Shorts',
    topCities: ['Delhi NCR (42M+)', 'Mumbai (36M+)', 'Bengaluru (25M+)', 'Chennai (24M+)', 'Ahmedabad (18M+)'],
    keyIndiaFact: 'Indian users consume an astounding average of 47 Hours every month. Vernacular regional content and YouTube Shorts generate billions of daily views.',
    metroHubs: [
      { name: 'DELHI NCR (42M+)', x: 165, y: 181, count: '42M+', isPrimary: true },
      { name: 'MUMBAI (36M+)', x: 98, y: 354, count: '36M+' },
      { name: 'BENGALURU (25M+)', x: 171, y: 465, count: '25M+' },
      { name: 'CHENNAI (24M+)', x: 212, y: 463, count: '24M+' },
      { name: 'AHMEDABAD (18M+)', x: 94, y: 282, count: '18M+' },
      { name: 'KOLKATA (20M+)', x: 336, y: 290, count: '20M+' },
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    badge: '#1 Visual Media & Time Consumer in India',
    logo: InstagramLogo,
    accentColor: 'from-pink-500 via-purple-600 to-amber-500',
    textColor: 'text-pink-400',
    borderColor: 'border-pink-500/50',
    glowColor: 'rgba(225, 48, 108, 0.50)',
    mapColor: '#E1306C',
    totalIndiaUsers: '481 Million',
    totalIndiaUsersNum: '481,000,000 Active Citizens',
    percentageOfIndia: '33.0%',
    ratioDescription: '1 in every 3 citizens in India scrolls Instagram — India is Instagram’s #1 market worldwide, accounting for over 16% of total global users.',
    category: 'Reels, Visual Posts & DM Network',
    topCities: ['Mumbai (34M+)', 'Delhi NCR (38M+)', 'Bengaluru (26M+)', 'Hyderabad (19M+)', 'Kolkata (18M+)'],
    keyIndiaFact: 'Short-form Reels drive over 70% of total in-app engagement in India, locking Indian youth into compulsive dopamine loops.',
    metroHubs: [
      { name: 'DELHI NCR (38M+)', x: 165, y: 181, count: '38M+', isPrimary: true },
      { name: 'MUMBAI (34M+)', x: 98, y: 354, count: '34M+' },
      { name: 'BENGALURU (26M+)', x: 171, y: 465, count: '26M+' },
      { name: 'HYDERABAD (19M+)', x: 185, y: 385, count: '19M+' },
      { name: 'KOLKATA (18M+)', x: 336, y: 290, count: '18M+' },
      { name: 'PUNE (15M+)', x: 110, y: 368, count: '15M+' },
    ],
    impactDetails: {
      totalAudience: '481 Million',
      dailyActive: '350+ Million Daily',
      monthlyScreenTime: '49 Hours / Month',
      daysPerYear: '24.5 Days / Year',
      dailyAverage: '1.6+ Hours / Day',
      reelsEngagement: 'Over 70% of total engagement from Reels',
    },
  },
];

interface Props {
  onScrollToNext?: () => void;
}

export const IndiaUsageScene: React.FC<Props> = ({ onScrollToNext }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manualStageIndex, setManualStageIndex] = useState<number | null>(null);
  const [manualShowImpact, setManualShowImpact] = useState<boolean>(false);
  const lastActiveIndexRef = useRef<number>(0);
  const lastImpactRef = useRef<boolean>(false);

  const displayProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const stageCooldownRef = useRef<{ key: string; lockUntil: number }>({ key: '0-false', lockUntil: 0 });
  const lockedStageRef = useRef<{ activeIndex: number; isInstagramFullImpact: boolean; stageLocalProgress: number }>({
    activeIndex: 0,
    isInstagramFullImpact: false,
    stageLocalProgress: 0.5,
  });

  // Track parent sticky scroll progress with smooth interpolation damping
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

    // Smooth Damped Animation Loop (Prevents rapid scroll skipping, adds gentle weight)
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

  // Map 0.0 -> 1.0 scroll progress to 5 distinct sequential phases:
  // Phase 0: WhatsApp (0.00 -> 0.20)
  // Phase 1: Facebook (0.20 -> 0.40)
  // Phase 2: YouTube  (0.40 -> 0.60)
  // Phase 3: Instagram - Part 1: Standard % & Map (0.60 -> 0.80) [shown like others first!]
  // Phase 4: Instagram - Part 2: Impact Numbers & Figures (0.80 -> 1.00) [shown on further scroll!]
  let rawActiveIndex = 0;
  let rawLocalProgress = 0;
  let rawIsInstagramFullImpact = false;

  if (manualStageIndex !== null) {
    rawActiveIndex = manualStageIndex;
    if (rawActiveIndex === 3) {
      rawIsInstagramFullImpact = manualShowImpact;
      rawLocalProgress = manualShowImpact ? 0.9 : 0.45;
    } else {
      rawIsInstagramFullImpact = false;
      rawLocalProgress = 0.45;
    }
  } else {
    if (scrollProgress < 0.20) {
      rawActiveIndex = 0;
      rawLocalProgress = scrollProgress / 0.20;
      rawIsInstagramFullImpact = false;
    } else if (scrollProgress < 0.40) {
      rawActiveIndex = 1;
      rawLocalProgress = (scrollProgress - 0.20) / 0.20;
      rawIsInstagramFullImpact = false;
    } else if (scrollProgress < 0.60) {
      rawActiveIndex = 2;
      rawLocalProgress = (scrollProgress - 0.40) / 0.20;
      rawIsInstagramFullImpact = false;
    } else if (scrollProgress < 0.80) {
      rawActiveIndex = 3;
      rawLocalProgress = (scrollProgress - 0.60) / 0.20;
      rawIsInstagramFullImpact = false; // Part 1: Standard % view like others!
    } else {
      rawActiveIndex = 3;
      rawLocalProgress = Math.min(1, (scrollProgress - 0.80) / 0.20);
      rawIsInstagramFullImpact = true; // Part 2: Deep impact figures on further scroll!
    }
  }

  // Slight delay & false scroll hold gate to hold on to each layout for certain time
  let activeIndex = rawActiveIndex;
  let stageLocalProgress = rawLocalProgress;
  let isInstagramFullImpact = rawIsInstagramFullImpact;

  if (manualStageIndex === null) {
    const stageKey = `${rawActiveIndex}-${rawIsInstagramFullImpact}`;
    const now = Date.now();

    if (stageKey !== stageCooldownRef.current.key) {
      if (now < stageCooldownRef.current.lockUntil) {
        // Enforce slight delay hold on the current layout
        activeIndex = lockedStageRef.current.activeIndex;
        isInstagramFullImpact = lockedStageRef.current.isInstagramFullImpact;
        stageLocalProgress = 0.5; // Firmly centered on the holding plateau
      } else {
        // Cooldown elapsed: transition to new stage and set hold lock
        stageCooldownRef.current = { key: stageKey, lockUntil: now + 700 };
        lockedStageRef.current = { activeIndex: rawActiveIndex, isInstagramFullImpact: rawIsInstagramFullImpact, stageLocalProgress: rawLocalProgress };
      }
    } else {
      lockedStageRef.current = { activeIndex: rawActiveIndex, isInstagramFullImpact: rawIsInstagramFullImpact, stageLocalProgress: rawLocalProgress };
    }
  }

  // Audio tone on stage change & impact reveal
  useEffect(() => {
    if (lastActiveIndexRef.current !== activeIndex) {
      lastActiveIndexRef.current = activeIndex;
      soundEngine.playClickTone();
    }
    if (isInstagramFullImpact && !lastImpactRef.current) {
      soundEngine.playSubBassImpact();
    }
    lastImpactRef.current = isInstagramFullImpact;
  }, [activeIndex, isInstagramFullImpact]);

  // False Scroll Holding Plateaus (88% of scroll range is held 100% steady with zero jitter)
  let stageOpacity = 1;
  let stageScale = 1;

  if (manualStageIndex === null) {
    if (activeIndex < 3) {
      // 0.00 -> 0.06: Smooth entry fade in
      // 0.06 -> 0.94: MASSIVE FALSE SCROLL HOLDING PLATEAU (88% of scroll holds rock-solid)
      // 0.94 -> 1.00: Gentle exit fade out ("slowly gone")
      if (stageLocalProgress < 0.06) {
        stageOpacity = Math.min(1, stageLocalProgress / 0.06);
        stageScale = 0.98 + stageOpacity * 0.02;
      } else if (stageLocalProgress > 0.94) {
        const fadeOutT = (stageLocalProgress - 0.94) / 0.06;
        stageOpacity = Math.max(0, 1 - fadeOutT);
        stageScale = 1.0 - fadeOutT * 0.02;
      } else {
        stageOpacity = 1;
        stageScale = 1;
      }
    } else {
      // For Instagram:
      if (!isInstagramFullImpact) {
        // Part 1 (Standard % & Map View like others):
        // 0.00 -> 0.06: Entry fade in
        // 0.06 -> 0.94: ROCK-SOLID HOLDING PLATEAU FOR INSTAGRAM % NUMBERS LIKE OTHERS
        // 0.94 -> 1.00: Smooth transition to Part 2 Impact Dashboard
        if (stageLocalProgress < 0.06) {
          stageOpacity = Math.min(1, stageLocalProgress / 0.06);
          stageScale = 0.98 + stageOpacity * 0.02;
        } else if (stageLocalProgress > 0.94) {
          const fadeOutT = (stageLocalProgress - 0.94) / 0.06;
          stageOpacity = Math.max(0, 1 - fadeOutT);
          stageScale = 1.0 - fadeOutT * 0.02;
        } else {
          stageOpacity = 1;
          stageScale = 1;
        }
      } else {
        // Part 2 (Deep Impact Figures View):
        // 0.00 -> 0.06: Fade in
        // 0.06 -> 1.00: ROCK-SOLID HOLDING PLATEAU FOR FULL IMPACT DASHBOARD
        if (stageLocalProgress < 0.06) {
          stageOpacity = Math.min(1, stageLocalProgress / 0.06);
          stageScale = 0.98 + stageOpacity * 0.02;
        } else {
          stageOpacity = 1;
          stageScale = 1;
        }
      }
    }
  }

  const currentStage = INDIA_STAGES[activeIndex];
  const StageLogo = currentStage.logo;

  const handleSelectStage = (index: number) => {
    soundEngine.playClickTone();
    setManualStageIndex(index);

    if (index === 3) {
      if (activeIndex === 3 && !manualShowImpact) {
        setManualShowImpact(true);
      } else {
        setManualShowImpact(false);
      }
    } else {
      setManualShowImpact(false);
    }

    const stickyWrapper = containerRef.current?.closest('.sticky-scene-container') as HTMLElement;
    if (stickyWrapper) {
      const scrollableDistance = stickyWrapper.offsetHeight - window.innerHeight;
      if (scrollableDistance > 0) {
        // Target centers of each holding plateau: [0.08, 0.28, 0.48, 0.68, 0.88]
        let targetFraction = [0.08, 0.28, 0.48, 0.68][index];
        if (index === 3 && activeIndex === 3 && !isInstagramFullImpact) {
          targetFraction = 0.88;
        }
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
    } else if (!isInstagramFullImpact) {
      soundEngine.playSubBassImpact();
      setManualStageIndex(3);
      setManualShowImpact(true);

      const stickyWrapper = containerRef.current?.closest('.sticky-scene-container') as HTMLElement;
      if (stickyWrapper) {
        const scrollableDistance = stickyWrapper.offsetHeight - window.innerHeight;
        if (scrollableDistance > 0) {
          targetProgressRef.current = 0.88;
          const targetScrollTop = stickyWrapper.offsetTop + 0.88 * scrollableDistance;
          const scrollContainer = containerRef.current?.closest('.overflow-y-scroll') || window;
          scrollContainer.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
        }
      }
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
      {/* 1. AMBIENT BACKDROP LIGHTING & PROJECTION */}
      {/* =================================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#030611] opacity-95" />
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle at 65% 50%, ${currentStage.glowColor} 0%, rgba(3, 7, 18, 0.95) 70%, #000000 100%)`,
            opacity: 0.55,
          }}
        />

        {/* Ambient India Background Vector Silhouette Projection */}
        <div className="absolute inset-0 flex items-center justify-center opacity-25">
          <svg
            className="w-full h-full max-w-[950px] max-h-[800px] object-contain transition-transform duration-1000 ease-out"
            viewBox="-25 -10 560 610"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <g stroke={currentStage.mapColor} strokeWidth="0.8" strokeOpacity="0.45" strokeLinejoin="round">
              {indiaStatesData.map((st, idx) => (
                <path key={`bg-st-${idx}`} d={st.d} fill={currentStage.mapColor} fillOpacity="0.08" />
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. TOP HEADER & INTERACTIVE PLATFORM TABS */}
      {/* =================================================================== */}
      <header className="relative z-20 max-w-6xl mx-auto w-full pt-3 sm:pt-4 px-4 text-center space-y-2">
        {/* Main Title (Required removal: NATIONAL FOOTPRINT • 750+ MILLION INDIAN SMARTPHONE USERS is gone!) */}
        <div className="flex flex-col items-center space-y-0.5">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950/70 border border-amber-500/40 px-3.5 py-0.5 rounded-full backdrop-blur-md shadow-lg">
            <Smartphone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>INDIA POPULATION: {INDIA_POPULATION_STR} CITIZENS • #1 GLOBAL MARKET</span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-sans drop-shadow-md">
            India’s Digital Screen Reality
          </h2>
        </div>

        {/* 4 Platform Stepper Tabs (WhatsApp → Facebook → YouTube → Instagram) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 max-w-4xl mx-auto pt-0.5">
          {INDIA_STAGES.map((stage, idx) => {
            const isActive = activeIndex === idx;
            const Logo = stage.logo;

            return (
              <button
                key={stage.id}
                onClick={() => handleSelectStage(idx)}
                className={`relative flex items-center space-x-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
                  isActive
                    ? `bg-neutral-900/95 ${stage.borderColor} shadow-2xl ring-2 ring-amber-400/30 scale-105 z-10 filter-none opacity-100`
                    : 'bg-neutral-950/60 border-white/10 hover:border-white/25 hover:bg-neutral-900/60 opacity-30 hover:opacity-80 blur-[2.5px] hover:blur-none scale-95'
                }`}
              >
                <Logo className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <div className="flex flex-col text-left">
                  <div className="text-[11px] sm:text-xs font-bold text-white font-sans leading-tight">{stage.name}</div>
                  <div className="flex items-center space-x-1 sm:space-x-1.5 mt-0.5">
                    <span className={`text-[10px] sm:text-[11px] font-mono font-black ${isActive ? stage.textColor : 'text-neutral-400'}`}>
                      {stage.percentageOfIndia}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 font-semibold">
                      • {stage.totalIndiaUsers}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="india-active-indicator"
                    className={`absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r ${stage.accentColor}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* =================================================================== */}
      {/* 3. CENTERPIECE: STAGE STATS + 100% UNCLIPPED PRISTINE INDIA MAP */}
      {/* =================================================================== */}
      <div
        className="relative z-20 max-w-6xl mx-auto w-full px-4 my-auto transition-all duration-300 ease-out"
        style={{
          opacity: stageOpacity,
          transform: `scale(${stageScale})`,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
          {/* =============================================================== */}
          {/* LEFT COLUMN: DYNAMIC PLATFORM DATA OR INSTAGRAM IMPACT CARD     */}
          {/* =============================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!isInstagramFullImpact ? (
                /* ----------------------------------------------------------- */
                /* CASE A: WHATSAPP, FACEBOOK, YOUTUBE & INSTAGRAM PART 1     */
                /* Standard Percentage & Population Comparison (Like Others!)  */
                /* ----------------------------------------------------------- */
                <motion.div
                  key={`screen-india-${currentStage.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="apple-card p-4 sm:p-6 rounded-3xl border border-white/15 bg-neutral-950/90 backdrop-blur-xl shadow-2xl space-y-3.5 text-left"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center space-x-2.5">
                      <StageLogo className="w-8 h-8 sm:w-9 sm:h-9" />
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-white font-sans flex items-center gap-2">
                          <span>{currentStage.name}</span>
                          <span className="text-[10px] font-mono text-neutral-400 font-normal px-2 py-0.5 rounded-full bg-neutral-900 border border-white/10">
                            {currentStage.category}
                          </span>
                        </h3>
                        <p className="text-[11px] font-mono text-neutral-400">{currentStage.badge}</p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full uppercase border ${currentStage.borderColor} ${currentStage.textColor} bg-neutral-900`}>
                      National Share
                    </span>
                  </div>

                  {/* Big Percentage Number */}
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                      Share of India’s Population
                    </span>

                    <div className="flex items-baseline space-x-3">
                      <span className={`text-4xl sm:text-6xl font-black font-mono tracking-tight ${currentStage.textColor} drop-shadow-lg`}>
                        {currentStage.percentageOfIndia}
                      </span>
                      <span className="text-xs sm:text-sm font-sans font-bold text-neutral-300 leading-tight">
                        OF ALL CITIZENS<br />ACROSS INDIA
                      </span>
                    </div>

                    {/* Progress Bar vs 1.46B Population */}
                    <div className="pt-1.5 pb-0.5">
                      <div className="w-full bg-neutral-900 h-2 sm:h-2.5 rounded-full overflow-hidden border border-white/10 relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: currentStage.percentageOfIndia }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`h-full bg-gradient-to-r ${currentStage.accentColor} rounded-full`}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
                        <span>0 Citizens</span>
                        <span className="text-white font-bold">{currentStage.totalIndiaUsers} Active</span>
                        <span>1.46B India Total</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-200 font-sans font-semibold pt-1 leading-relaxed">
                      {currentStage.ratioDescription}
                    </p>
                  </div>

                  {/* Fact Card */}
                  <div className="p-3 rounded-2xl bg-neutral-900/90 border border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>Indian Footprint Reality</span>
                    </div>
                    <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                      {currentStage.keyIndiaFact}
                    </p>
                  </div>

                  {/* Scroll Guidance Helper */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1">
                    <span className="flex items-center gap-1 text-amber-400">
                      <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                      <span>
                        {activeIndex < 3
                          ? `Scroll down for ${INDIA_STAGES[activeIndex + 1].name}`
                          : "Scroll down to reveal Instagram India's screen time & Reels metrics"}
                      </span>
                    </span>
                    <button
                      onClick={handleNextStage}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs border border-white/20 transition-all cursor-pointer"
                    >
                      <span>{activeIndex < 3 ? 'Next Platform' : 'View Impact Figures'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ----------------------------------------------------------- */
                /* CASE B: INSTAGRAM FULL IMPACT ON INDIA (REQUESTED STATS)    */
                /* Total Audience, Daily Active Users, Avg Monthly Screen Time */
                /* ----------------------------------------------------------- */
                <motion.div
                  key="instagram-full-impact-india"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="apple-card p-4 sm:p-6 rounded-3xl border border-pink-500/50 bg-neutral-950/95 backdrop-blur-2xl shadow-2xl space-y-4 text-left"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <InstagramLogo className="w-8 h-8 sm:w-9 sm:h-9" />
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-white font-sans flex items-center gap-2">
                          <span>Instagram India</span>
                          <span className="text-[10px] font-mono text-pink-400 px-2 py-0.5 rounded-full bg-pink-950/60 border border-pink-500/30">
                            #1 Market Globally
                          </span>
                        </h3>
                        <p className="text-[11px] font-mono text-neutral-400">
                          33.0% of India’s Total Population ({INDIA_STAGES[3].totalIndiaUsers} citizens)
                        </p>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-neutral-300 bg-neutral-900 border border-white/10 px-2.5 py-1 rounded-xl flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>Highest Time Spent</span>
                    </div>
                  </div>

                  {/* The 3 Core Requested Numbers: Total Audience, DAU, Avg Screen Time */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-neutral-900/90 border border-white/10 text-center flex flex-col justify-between">
                      <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                        Total Audience
                      </div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-pink-400">
                        481M
                      </div>
                      <div className="text-[9px] font-mono text-neutral-300">
                        Active in India
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-2xl bg-neutral-900/90 border border-white/10 text-center flex flex-col justify-between">
                      <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                        Daily Active
                      </div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-amber-400">
                        350M+
                      </div>
                      <div className="text-[9px] font-mono text-neutral-300">
                        Active Daily
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-2xl bg-neutral-900/90 border border-white/10 text-center flex flex-col justify-between">
                      <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                        Monthly Time
                      </div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-cyan-400">
                        49 Hrs
                      </div>
                      <div className="text-[9px] font-mono text-pink-400 font-bold">
                        24.5 Days / Yr!
                      </div>
                    </div>
                  </div>

                  {/* Impact facts */}
                  <div className="space-y-2 pt-0.5">
                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs">
                      <span className="font-bold text-pink-400 font-mono text-[10px] uppercase block mb-0.5">
                        ⚡ 70%+ Reels Engagement
                      </span>
                      <p className="text-neutral-200 text-xs leading-snug">
                        Over 70% of total user engagement in India is consumed by short video Reels (~1.6+ hours daily per user).
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs">
                      <span className="font-bold text-amber-400 font-mono text-[10px] uppercase block mb-0.5">
                        ★ India is #1 Cohort Globally
                      </span>
                      <p className="text-neutral-200 text-xs leading-snug">
                        India accounts for over 16% of total global Instagram users, larger than the USA, Brazil, and Indonesia combined.
                      </p>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <button
                      onClick={() => handleSelectStage(3)}
                      className="text-[10px] font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      ← View % Map
                    </button>

                    <button
                      onClick={() => {
                        soundEngine.playSubBassImpact();
                        if (onScrollToNext) onScrollToNext();
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs font-mono tracking-wide shadow-lg flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <span>Continue to Feature Evolution</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* =============================================================== */}
          {/* RIGHT COLUMN: 100% VISIBLE, UNCLIPPED PRISTINE INDIA MAP CARD    */}
          {/* =============================================================== */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="apple-card p-3 sm:p-4 rounded-3xl border border-white/15 bg-neutral-950/85 backdrop-blur-xl shadow-2xl relative w-full h-[340px] sm:h-[410px] lg:h-[470px] max-h-[58vh] flex flex-col justify-between">
              {/* Map Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1 shrink-0">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Award className={`w-3.5 h-3.5 ${currentStage.textColor}`} />
                  <span>India National Map • {currentStage.name} Footprint</span>
                </span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  #1 Market Globally
                </span>
              </div>

              {/* The Vector Map - With generous padded viewBox (-25 -10 560 610) to completely prevent any edge clipping */}
              <div className="relative w-full flex-1 flex items-center justify-center p-1 sm:p-2 min-h-0">
                <svg
                  className="w-full h-full max-h-[390px] object-contain transition-transform duration-700 ease-out drop-shadow-2xl"
                  viewBox="-25 -10 560 610"
                  preserveAspectRatio="xMidYMid meet"
                  fill="none"
                >
                  {/* Subtle Grid Lines spanning full bounds */}
                  <g stroke="#f59e0b" strokeOpacity="0.08" strokeWidth="0.8" strokeDasharray="3 4">
                    <line x1="125" y1="-10" x2="125" y2="600" />
                    <line x1="250" y1="-10" x2="250" y2="600" />
                    <line x1="375" y1="-10" x2="375" y2="600" />
                    <line x1="-25" y1="145" x2="535" y2="145" />
                    <line x1="-25" y1="290" x2="535" y2="290" />
                    <line x1="-25" y1="435" x2="535" y2="435" />
                  </g>

                  {/* All 28 Indian States & 8 UTs Glowing with Active Platform Theme */}
                  <g stroke="#090e17" strokeWidth="0.8" strokeLinejoin="round" strokeLinecap="round">
                    {indiaStatesData.map((st, idx) => (
                      <path
                        key={idx}
                        d={st.d}
                        fill={currentStage.mapColor}
                        fillOpacity={0.45}
                        stroke={currentStage.mapColor}
                        strokeWidth="1.0"
                        strokeOpacity={0.85}
                        className="transition-all duration-700 ease-out hover:fill-opacity-80 cursor-pointer"
                      >
                        <title>{st.name}</title>
                      </path>
                    ))}
                  </g>

                  {/* State Name Labels */}
                  <g pointerEvents="none" opacity="0.65">
                    {indiaStatesData.map((st, idx) => {
                      if (!st.label || !st.labelPos || st.labelPos[0] <= 0) return null;
                      return (
                        <text
                          key={`label-${idx}`}
                          x={st.labelPos[0]}
                          y={st.labelPos[1]}
                          fill="#ffffff"
                          fontSize="7"
                          fontWeight="700"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                          opacity="0.85"
                        >
                          {st.label}
                        </text>
                      );
                    })}
                  </g>

                  {/* Intercity High-Speed Digital Traffic Stream Lines */}
                  <g className="transition-opacity duration-700" style={{ opacity: stageOpacity * 0.85 }}>
                    <path d="M 165 181 L 98 354" stroke={currentStage.mapColor} strokeWidth="1.8" strokeDasharray="4 4" fill="none" className="animate-pulse" />
                    <path d="M 98 354 L 171 465" stroke={currentStage.mapColor} strokeWidth="1.8" strokeDasharray="4 4" fill="none" className="animate-pulse" />
                    <path d="M 165 181 L 336 290" stroke={currentStage.mapColor} strokeWidth="1.8" strokeDasharray="4 4" fill="none" className="animate-pulse" />
                    <path d="M 171 465 L 185 385" stroke={currentStage.mapColor} strokeWidth="1.8" strokeDasharray="4 4" fill="none" className="animate-pulse" />
                    <path d="M 98 354 L 94 282" stroke={currentStage.mapColor} strokeWidth="1.8" strokeDasharray="4 4" fill="none" className="animate-pulse" />
                    <path d="M 165 181 L 235 220" stroke={currentStage.mapColor} strokeWidth="1.8" strokeDasharray="4 4" fill="none" className="animate-pulse" />
                  </g>

                  {/* Metro Epicenter Hubs with Ripple Pings */}
                  <g className="transition-opacity duration-500" style={{ opacity: stageOpacity }}>
                    {currentStage.metroHubs.map((hub, idx) => (
                      <g key={`hub-${currentStage.id}-${idx}`}>
                        <circle
                          cx={hub.x}
                          cy={hub.y}
                          r={hub.isPrimary ? 20 : 13}
                          stroke={currentStage.mapColor}
                          strokeWidth={hub.isPrimary ? 2 : 1.2}
                          fill="none"
                          className="animate-ping opacity-85"
                        />
                        <circle
                          cx={hub.x}
                          cy={hub.y}
                          r={hub.isPrimary ? 6 : 4}
                          fill={currentStage.mapColor}
                          className="animate-pulse"
                        />
                        <text
                          x={hub.x}
                          y={hub.y - (hub.isPrimary ? 12 : 8)}
                          fill="#ffffff"
                          stroke="#000000"
                          strokeWidth="3.2"
                          paintOrder="stroke"
                          fontSize={hub.isPrimary ? '9.5' : '7.5'}
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

              {/* Bottom Metro Pills */}
              <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-neutral-300 shrink-0">
                <span className="text-amber-400 font-bold">Top Metros:</span>
                <div className="flex items-center space-x-1 overflow-x-auto">
                  {currentStage.topCities.map((city, idx) => (
                    <span key={idx} className="bg-neutral-900 border border-white/10 px-1.5 py-0.5 rounded text-white font-bold whitespace-nowrap">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 4. FOOTER STATUS BAR & PROGRESS */}
      {/* =================================================================== */}
      <footer className="relative z-20 max-w-6xl mx-auto w-full pb-3 px-4 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-white/10 pt-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>
            {isInstagramFullImpact
              ? 'STAGE 4 OF 4 • INSTAGRAM INDIA IMPACT NUMBERS'
              : `STAGE ${activeIndex + 1} OF 4 • ${currentStage.name.toUpperCase()} INDIA FOOTPRINT`}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline text-neutral-400">
            Scroll drives platform progression
          </span>
          <div className="flex items-center space-x-1">
            {INDIA_STAGES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 bg-amber-400' : 'w-2 bg-neutral-700'
                }`}
              />
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
};
