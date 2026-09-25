import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Clock, Users, Zap, ArrowDown, ChevronRight, Activity, Sparkles, TrendingUp, Smartphone } from 'lucide-react';
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
  borderColor: string;
  glowColor: string;
  mapColor: string;
  totalGlobalUsers: string; // e.g. "3.00 Billion"
  totalGlobalUsersNum: string; // "3,000,000,000"
  percentageOfWorld: string; // "36.6%"
  ratioDescription: string;
  category: string;
  topCountries: string[];
  highlightedCountryNames: string[];
  keyGlobalFact: string;
  hubs: GlobalHub[];
  arcs: { from: [number, number]; to: [number, number]; control: [number, number] }[];
  impactDetails?: {
    totalAudience: string;
    dailyActive: string;
    monthlyScreenTime: string;
    reelsEngagement: string;
    storiesConsumption: string;
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
    borderColor: 'border-emerald-500/50',
    glowColor: 'rgba(37, 211, 102, 0.45)',
    mapColor: '#25D366',
    totalGlobalUsers: '3.00 Billion',
    totalGlobalUsersNum: '3,000,000,000 Active Users',
    percentageOfWorld: '36.6%',
    ratioDescription: 'More than 1 in every 3 humans alive on Earth uses WhatsApp every month.',
    category: 'Instant Messaging & Calling',
    topCountries: ['India (535M+)', 'Brazil (140M+)', 'Indonesia (112M+)', 'Mexico (77M+)', 'Nigeria (51M+)'],
    highlightedCountryNames: [
      'India', 'Brazil', 'Indonesia', 'Mexico', 'Nigeria', 'Germany', 'United Kingdom',
      'Italy', 'Spain', 'South Africa', 'Argentina', 'Colombia', 'Egypt', 'Pakistan', 'Saudi Arabia'
    ],
    keyGlobalFact: 'Over 140 Billion text, voice, and media messages are delivered worldwide every 24 hours.',
    hubs: [
      { name: '★ #1 INDIA (535M+)', x: 718, y: 235, count: '535M+', isPrimary: true },
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
      { from: [718, 235], to: [515, 235], control: [615, 260] },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    badge: '#1 Largest Social Network in History',
    logo: FacebookLogo,
    accentColor: 'from-blue-600 via-sky-500 to-indigo-600',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/50',
    glowColor: 'rgba(24, 119, 242, 0.45)',
    mapColor: '#1877F2',
    totalGlobalUsers: '3.07 Billion',
    totalGlobalUsersNum: '3,070,000,000 Active Users',
    percentageOfWorld: '37.4%',
    ratioDescription: '3 out of every 8 human beings on Earth actively log into Facebook.',
    category: 'Social Networking & Groups',
    topCountries: ['India (315M+)', 'USA (175M+)', 'Indonesia (120M+)', 'Brazil (110M+)', 'Philippines (85M+)'],
    highlightedCountryNames: [
      'India', 'United States', 'Indonesia', 'Brazil', 'Philippines', 'Mexico', 'Vietnam',
      'Egypt', 'Bangladesh', 'Pakistan', 'United Kingdom', 'Thailand', 'Nigeria', 'Turkey'
    ],
    keyGlobalFact: 'First platform in civilization history to exceed 3 Billion monthly active users.',
    hubs: [
      { name: '★ #1 INDIA (315M+)', x: 718, y: 235, count: '315M+', isPrimary: true },
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
      { from: [718, 235], to: [840, 235], control: [779, 215] },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    badge: '#1 Global Video & Streaming Platform',
    logo: YouTubeLogo,
    accentColor: 'from-red-600 via-rose-600 to-amber-600',
    textColor: 'text-red-400',
    borderColor: 'border-red-500/50',
    glowColor: 'rgba(255, 0, 0, 0.45)',
    mapColor: '#FF0000',
    totalGlobalUsers: '2.70 Billion',
    totalGlobalUsersNum: '2,700,000,000 Active Users',
    percentageOfWorld: '32.9%',
    ratioDescription: 'Nearly 1 in every 3 humans on Earth consumes YouTube streams and Shorts.',
    category: 'Streaming, Long-form & Shorts',
    topCountries: ['India (462M+)', 'USA (245M+)', 'Brazil (142M+)', 'Indonesia (139M+)', 'Japan (71M+)'],
    highlightedCountryNames: [
      'India', 'United States', 'Brazil', 'Indonesia', 'Japan', 'Mexico', 'Germany',
      'United Kingdom', 'South Korea', 'France', 'Turkey', 'Canada', 'Australia', 'Vietnam'
    ],
    keyGlobalFact: 'Over 1 Billion hours of continuous video content are watched worldwide every single day.',
    hubs: [
      { name: '★ #1 INDIA (462M+)', x: 718, y: 235, count: '462M+', isPrimary: true },
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
      { from: [215, 180], to: [340, 335], control: [250, 260] },
      { from: [515, 145], to: [718, 235], control: [616, 150] },
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    badge: '#1 Visual Media & Dopamine Engine',
    logo: InstagramLogo,
    accentColor: 'from-pink-500 via-purple-600 to-amber-500',
    textColor: 'text-pink-400',
    borderColor: 'border-pink-500/50',
    glowColor: 'rgba(225, 48, 108, 0.50)',
    mapColor: '#E1306C',
    totalGlobalUsers: '2.50 Billion',
    totalGlobalUsersNum: '2,500,000,000 Active Users',
    percentageOfWorld: '30.5%',
    ratioDescription: 'Over 3 out of every 10 human beings on planet Earth actively scroll Instagram.',
    category: 'Visual Media, Reels & Stories',
    topCountries: ['India (385M+)', 'USA (160M+)', 'Brazil (135M+)', 'Indonesia (100M+)', 'Turkey (58M+)'],
    highlightedCountryNames: [
      'India', 'United States', 'Brazil', 'Indonesia', 'Turkey', 'Japan', 'Mexico',
      'United Kingdom', 'Germany', 'Italy', 'France', 'Canada', 'Australia', 'Spain', 'Argentina'
    ],
    keyGlobalFact: 'Over 50% of all user time on Instagram is consumed by algorithmic Reels, designed to maximize time-on-app.',
    hubs: [
      { name: '★ #1 INDIA (385M+)', x: 718, y: 235, count: '385M+', isPrimary: true },
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
      { from: [718, 235], to: [825, 295], control: [770, 255] },
      { from: [215, 180], to: [515, 145], control: [365, 120] },
    ],
    impactDetails: {
      totalAudience: '2.5 Billion',
      dailyActive: '1.5 Billion Daily',
      monthlyScreenTime: '33.1 hours',
      reelsEngagement: '50%+ of time spent on platform',
      storiesConsumption: '500 Million daily active consumers',
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

  // Track sticky scroll progress from the parent container with smooth interpolation damping
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

  // Slight delay & false scroll hold gate to prevent scrolling one to the second too fast
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
        stageLocalProgress = 0.5; // Keep firmly in center of holding plateau
      } else {
        // Delay elapsed: transition to new stage and set hold cooldown
        stageCooldownRef.current = { key: stageKey, lockUntil: now + 700 };
        lockedStageRef.current = { activeIndex: rawActiveIndex, isInstagramFullImpact: rawIsInstagramFullImpact, stageLocalProgress: rawLocalProgress };
      }
    } else {
      lockedStageRef.current = { activeIndex: rawActiveIndex, isInstagramFullImpact: rawIsInstagramFullImpact, stageLocalProgress: rawLocalProgress };
    }
  }

  // Play audio on stage transition & impact reveal
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

  const currentStage = WORLD_STAGES[activeIndex];
  const StageLogo = currentStage.logo;

  // Jump to stage directly when user clicks pill tab
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
      {/* 1. EXPANSIVE BACKGROUND WORLD MAP (FROM MULTIPLE SOURCES DATASET) */}
      {/* =================================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Ocean Background & Radial Atmospheric Lighting */}
        <div className="absolute inset-0 bg-[#040814] opacity-95" />
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle at 60% 45%, ${currentStage.glowColor} 0%, rgba(3, 7, 18, 0.95) 70%, #000000 100%)`,
            opacity: 0.65,
          }}
        />

        {/* Global SVG World Map with Political Boundaries & Dynamic Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-full h-full max-w-[1700px] max-h-[920px] object-contain opacity-75 transition-transform duration-700 ease-out"
            viewBox="0 0 1000 500"
            fill="none"
          >
            {/* Subtle Longitude & Latitude Coordinates / Grid Lines */}
            <g stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="0.75" strokeDasharray="3 4">
              <line x1="166" y1="0" x2="166" y2="500" />
              <line x1="333" y1="0" x2="333" y2="500" />
              <line x1="500" y1="0" x2="500" y2="500" />
              <line x1="666" y1="0" x2="666" y2="500" />
              <line x1="833" y1="0" x2="833" y2="500" />
              <line x1="0" y1="125" x2="1000" y2="125" />
              <line x1="0" y1="250" x2="1000" y2="250" strokeOpacity="0.20" strokeWidth="1" /> {/* Equator */}
              <line x1="0" y1="375" x2="1000" y2="375" />
            </g>

            {/* Country Outlines and Highlighted Continents */}
            <g stroke="#090e17" strokeWidth="0.5" strokeLinejoin="round">
              {worldMapCountries.map((country, idx) => {
                const isHighlighted = currentStage.highlightedCountryNames.includes(country.name);
                const fillColor = isHighlighted
                  ? currentStage.mapColor
                  : '#131e33';

                return (
                  <path
                    key={idx}
                    d={country.d}
                    fill={fillColor}
                    fillOpacity={isHighlighted ? 0.88 : 0.40}
                    stroke={isHighlighted ? currentStage.mapColor : '#1e293b'}
                    strokeWidth={isHighlighted ? 1.0 : 0.4}
                    strokeOpacity={isHighlighted ? 0.9 : 0.3}
                    className="transition-all duration-700 ease-out"
                  >
                    <title>{country.name}</title>
                  </path>
                );
              })}
            </g>

            {/* Dynamic Connecting Arcs Radiating Across Continents */}
            <g className="transition-opacity duration-700" style={{ opacity: stageOpacity * 0.75 }}>
              {currentStage.arcs.map((arc, idx) => (
                <path
                  key={`arc-${currentStage.id}-${idx}`}
                  d={`M ${arc.from[0]} ${arc.from[1]} Q ${arc.control[0]} ${arc.control[1]}, ${arc.to[0]} ${arc.to[1]}`}
                  stroke={currentStage.mapColor}
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.8"
                  fill="none"
                  className="animate-pulse"
                />
              ))}
            </g>

            {/* Pulsating Regional Epicenter Hubs with Ripple Rings */}
            <g className="transition-opacity duration-500" style={{ opacity: stageOpacity }}>
              {currentStage.hubs.map((hub, idx) => (
                <g key={`hub-${currentStage.id}-${idx}`}>
                  {/* Ping expanding ripple */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={hub.isPrimary ? 24 : 14}
                    stroke={currentStage.mapColor}
                    strokeWidth={hub.isPrimary ? 2 : 1.2}
                    fill="none"
                    className="animate-ping opacity-75"
                  />
                  {/* Secondary dashed orbit */}
                  {hub.isPrimary && (
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="34"
                      stroke={currentStage.mapColor}
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                      fill="none"
                      className="opacity-60"
                    />
                  )}
                  {/* Center Dot */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={hub.isPrimary ? 7.5 : 4.5}
                    fill={currentStage.mapColor}
                    className="animate-pulse shadow-lg"
                  />
                  {/* Hub Text Label */}
                  <text
                    x={hub.x}
                    y={hub.y - (hub.isPrimary ? 16 : 10)}
                    fill="#ffffff"
                    stroke="#000000"
                    strokeWidth="3.5"
                    paintOrder="stroke"
                    fontSize={hub.isPrimary ? '11' : '8.5'}
                    fontWeight="900"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    letterSpacing="0.05em"
                  >
                    {hub.name}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* Ambient Dark Gradients (Top & Bottom for ultra-clean readability) */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />
      </div>

      {/* =================================================================== */}
      {/* 2. TOP HEADER & INTERACTIVE PLATFORM TABS */}
      {/* =================================================================== */}
      <header className="relative z-20 max-w-6xl mx-auto w-full pt-4 px-4 text-center space-y-2.5">
        {/* Main Title (Required line removed: GLOBAL PERSPECTIVE • 5.3+ BILLION SOCIAL MEDIA USERS is gone!) */}
        <div className="flex flex-col items-center space-y-1">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-500/40 px-3.5 py-0.5 rounded-full backdrop-blur-md shadow-lg">
            <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '14s' }} />
            <span>GLOBAL POPULATION: {GLOBAL_POPULATION_STR} HUMANS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans drop-shadow-md">
            World’s Digital Screen Reality
          </h2>
        </div>

        {/* 4 Platform Stepper Tabs (WhatsApp → Facebook → YouTube → Instagram) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 max-w-4xl mx-auto pt-1">
          {WORLD_STAGES.map((stage, idx) => {
            const isActive = activeIndex === idx;
            const Logo = stage.logo;

            return (
              <button
                key={stage.id}
                onClick={() => handleSelectStage(idx)}
                className={`relative flex items-center space-x-2 px-2.5 sm:px-3.5 py-2 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
                  isActive
                    ? `bg-neutral-900/95 ${stage.borderColor} shadow-2xl ring-2 ring-white/20 scale-105 z-10 filter-none opacity-100`
                    : 'bg-neutral-950/60 border-white/10 hover:border-white/25 hover:bg-neutral-900/60 opacity-30 hover:opacity-80 blur-[2.5px] hover:blur-none scale-95'
                }`}
              >
                <Logo className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <div className="flex flex-col text-left">
                  <div className="text-[11px] sm:text-xs font-bold text-white font-sans leading-tight">{stage.name}</div>
                  <div className="flex items-center space-x-1 sm:space-x-1.5 mt-0.5">
                    <span className={`text-[10px] sm:text-[11px] font-mono font-black ${isActive ? stage.textColor : 'text-neutral-400'}`}>
                      {stage.percentageOfWorld}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 font-semibold">
                      • {stage.totalGlobalUsers}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="world-active-indicator"
                    className={`absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r ${stage.accentColor}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* =================================================================== */}
      {/* 3. CENTERPIECE: STAGE DATA SHOWCASE WITH DYNAMIC SCROLL FADE */}
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
          {/* CASE A: WHATSAPP, FACEBOOK, YOUTUBE & INSTAGRAM GLOBAL % VIEW */}
          {/* ------------------------------------------------------------- */}
          {!isInstagramFullImpact ? (
            <motion.div
              key={`screen-${currentStage.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
            >
              {/* Left Column: Massive Percentage & Global Population Ratio */}
              <div className="lg:col-span-6 apple-card p-5 sm:p-7 rounded-3xl border border-white/15 bg-neutral-950/90 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
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
                    Earth Penetration
                  </span>
                </div>

                {/* The Big % Number Compared to Overall World Population */}
                <div className="space-y-1 my-3 text-left">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                    Global Population Share
                  </span>

                  <div className="flex items-baseline space-x-3">
                    <span className={`text-5xl sm:text-7xl font-black font-mono tracking-tight ${currentStage.textColor} drop-shadow-lg`}>
                      {currentStage.percentageOfWorld}
                    </span>
                    <span className="text-xs sm:text-sm font-sans font-bold text-neutral-300 leading-tight">
                      OF ALL HUMANS<br />ON PLANET EARTH
                    </span>
                  </div>

                  {/* Percentage Progress Bar vs Global Population */}
                  <div className="pt-2 pb-1">
                    <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden border border-white/10 relative">
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

                  <p className="text-xs sm:text-sm text-neutral-200 font-sans font-semibold pt-2 leading-relaxed">
                    {currentStage.ratioDescription}
                  </p>
                </div>

                {/* Subtitle count banner */}
                <div className="mt-4 p-3 rounded-2xl bg-neutral-900/80 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">Total Active Users:</span>
                  <span className="text-white font-extrabold text-sm">{currentStage.totalGlobalUsersNum}</span>
                </div>
              </div>

              {/* Right Column: Key Country Saturation & Global Impact Metric */}
              <div className="lg:col-span-6 space-y-3 text-left">
                {/* Top Countries Saturation Card */}
                <div className="apple-card p-4 sm:p-5 rounded-3xl border border-white/10 bg-neutral-950/85 backdrop-blur-md space-y-2.5 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className={`w-3.5 h-3.5 ${currentStage.textColor}`} />
                      <span>Top Country Markets Highlighted on Map</span>
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                      Live Regional Spread
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {currentStage.topCountries.map((c, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-xl bg-neutral-900/90 border border-white/5 flex flex-col justify-center text-left ${
                          i === 0 ? 'border-amber-500/40 bg-amber-950/20' : ''
                        }`}
                      >
                        <span className="text-[9px] font-mono text-neutral-400 uppercase">
                          {i === 0 ? '★ Primary Epicenter' : `Market #${i + 1}`}
                        </span>
                        <span className="text-xs font-bold text-white font-sans truncate">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Global Scale Fact Card */}
                <div className="apple-card p-4 sm:p-5 rounded-3xl border border-white/10 bg-neutral-950/85 backdrop-blur-md space-y-2 shadow-xl">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Global Impact Reality</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed">
                    {currentStage.keyGlobalFact}
                  </p>
                </div>

                {/* Scroll Guidance Helper */}
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-2">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                    <span>
                      {activeIndex < 3
                        ? `Scroll down to advance to ${WORLD_STAGES[activeIndex + 1].name}`
                        : "Scroll down to reveal Instagram's deep global screen time & addiction metrics"}
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
              </div>
            </motion.div>
          ) : (
            /* ------------------------------------------------------------- */
            /* CASE B: INSTAGRAM FULL IMPACT VIEW (AS EXPLICITLY REQUESTED)  */
            /* Total Global Audience ## Billion, Daily Active Users: ##, etc */
            /* ------------------------------------------------------------- */
            <motion.div
              key="instagram-full-impact"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto w-full apple-card p-6 sm:p-8 rounded-3xl border border-pink-500/50 bg-neutral-950/95 backdrop-blur-2xl shadow-2xl space-y-6 text-left"
            >
              {/* Instagram Banner Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                  <InstagramLogo className="w-10 h-10" />
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans flex items-center gap-2">
                      <span>Instagram</span>
                      <span className="text-xs font-mono text-pink-400 px-2.5 py-0.5 rounded-full bg-pink-950/60 border border-pink-500/30">
                        Global Impact
                      </span>
                    </h3>
                    <p className="text-xs font-mono text-neutral-400">
                      30.5% of World Population ({WORLD_STAGES[3].totalGlobalUsers} out of {GLOBAL_POPULATION_STR} humans)
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono text-neutral-300 bg-neutral-900 border border-white/10 px-3 py-1.5 rounded-2xl">
                  <Globe className="w-4 h-4 text-pink-400" />
                  <span>Worldwide Addiction Index</span>
                </div>
              </div>

              {/* Exact Requested Numbers: Total Global Audience, DAU, Avg Screen Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 1. Total Global Audience */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-white/10 space-y-1.5 text-center flex flex-col justify-between">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold flex items-center justify-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-pink-400" />
                    <span>Total Global Audience</span>
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-pink-400 drop-shadow-md">
                    2.5 Billion
                  </div>
                  <div className="text-[11px] font-mono text-neutral-300">
                    Monthly Active Global Users
                  </div>
                </div>

                {/* 2. Daily Active Users */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-white/10 space-y-1.5 text-center flex flex-col justify-between">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold flex items-center justify-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    <span>Daily Active Users</span>
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-amber-400 drop-shadow-md">
                    1.5 Billion
                  </div>
                  <div className="text-[11px] font-mono text-neutral-300">
                    Active Every Single Day
                  </div>
                </div>

                {/* 3. Avg Monthly Screen Time */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-white/10 space-y-1.5 text-center flex flex-col justify-between">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Avg Monthly Screen Time</span>
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-cyan-400 drop-shadow-md">
                    33.1 hours
                  </div>
                  <div className="text-[11px] font-mono text-neutral-300">
                    ~1.1+ Hours Daily Per Person
                  </div>
                </div>
              </div>

              {/* Deep Behavioral Impact Facts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Algorithmic Reels Addiction</span>
                  </span>
                  <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                    Over <strong className="text-white">50% of total time spent</strong> on Instagram is now absorbed by short-form video Reels, engineered for non-stop micro-dopamine rewards.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    <span>Daily Ephemeral Stories</span>
                  </span>
                  <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                    Over <strong className="text-white">500 Million people</strong> create or consume disappearing Stories daily, driving compulsive check-ins every few hours.
                  </p>
                </div>
              </div>

              {/* Bottom Continue Action */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-white/10">
                <span className="text-[11px] font-mono text-neutral-400">
                  Data Sources: Meta Financial Reports 2026, DataReportal Digital Global Overview
                </span>

                <button
                  onClick={() => {
                    soundEngine.playSubBassImpact();
                    if (onScrollToNext) onScrollToNext();
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs font-mono tracking-wide shadow-xl flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Continue to India Reality</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =================================================================== */}
      {/* 4. FOOTER STATUS BAR & PROGRESS */}
      {/* =================================================================== */}
      <footer className="relative z-20 max-w-6xl mx-auto w-full pb-3 px-4 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-white/10 pt-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {isInstagramFullImpact
              ? 'STAGE 4 OF 4 • INSTAGRAM WORLDWIDE IMPACT NUMBERS'
              : `STAGE ${activeIndex + 1} OF 4 • ${currentStage.name.toUpperCase()} HIGHLIGHT`}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline text-neutral-400">
            Scroll drives platform progression
          </span>
          <div className="flex items-center space-x-1">
            {WORLD_STAGES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 bg-cyan-400' : 'w-2 bg-neutral-700'
                }`}
              />
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
};
