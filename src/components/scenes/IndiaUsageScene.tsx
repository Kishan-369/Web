import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, ArrowDown, ChevronRight, Award } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';
import { InstagramLogo, YouTubeLogo, FacebookLogo, WhatsAppLogo } from './WorldUsageScene';
import indiaStatesData from './indiaStatesData.json';
import indiaOuterBorder from './indiaOuterBorder.json';

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
  glowColor: string;
  mapColor: string;
  totalIndiaUsers: string; // e.g. "550 Million"
  totalIndiaUsersNum: string; // "550,000,000"
  percentageOfIndia: string; // "37.7%"
  ratioDescription: string;
  category: string;
  highlightedStates: string[];
  metroHubs: MetroHub[];
  impactDetails?: {
    totalAudience: string;
    dailyActive: string;
    monthlyScreenTime: string;
    daysPerYear: string;
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
    glowColor: 'rgba(37, 211, 102, 0.45)',
    mapColor: '#25D366',
    totalIndiaUsers: '550 Million',
    totalIndiaUsersNum: '550,000,000 Active Citizens',
    percentageOfIndia: '37.7%',
    ratioDescription: 'Over 1 in every 3 Indian citizens uses WhatsApp monthly — India is WhatsApp’s #1 market on Earth.',
    category: 'Messaging & Local Ecosystem',
    highlightedStates: [
      'Maharashtra', 'Delhi', 'Uttar Pradesh', 'Karnataka', 'Tamil Nadu', 'Gujarat',
      'West Bengal', 'Kerala', 'Andhra Pradesh', 'Rajasthan', 'Punjab', 'Madhya Pradesh', 'Bihar', 'Haryana'
    ],
    metroHubs: [
      { name: 'DELHI NCR (35M+)', x: 165, y: 181, count: '35M+', isPrimary: true },
      { name: 'MUMBAI (38M+)', x: 98, y: 354, count: '38M+' },
      { name: 'BENGALURU (22M+)', x: 171, y: 465, count: '22M+' },
      { name: 'KOLKATA (16M+)', x: 336, y: 290, count: '16M+' },
      { name: 'HYDERABAD (18M+)', x: 185, y: 385, count: '18M+' },
      { name: 'CHENNAI (15M+)', x: 212, y: 463, count: '15M+' },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    badge: '#1 Community Network in India',
    logo: FacebookLogo,
    accentColor: 'from-blue-600 via-sky-500 to-indigo-600',
    textColor: 'text-blue-400',
    glowColor: 'rgba(24, 119, 242, 0.45)',
    mapColor: '#1877F2',
    totalIndiaUsers: '350 Million',
    totalIndiaUsersNum: '350,000,000 Active Citizens',
    percentageOfIndia: '24.0%',
    ratioDescription: 'Nearly 1 in every 4 Indian citizens uses Facebook across rural heartlands and urban communities.',
    category: 'Social Networking & Groups',
    highlightedStates: [
      'Uttar Pradesh', 'Bihar', 'West Bengal', 'Maharashtra', 'Madhya Pradesh',
      'Rajasthan', 'Assam', 'Orissa', 'Jharkhand', 'Gujarat', 'Delhi', 'Punjab', 'Haryana'
    ],
    metroHubs: [
      { name: 'DELHI NCR (26M+)', x: 165, y: 181, count: '26M+', isPrimary: true },
      { name: 'MUMBAI (24M+)', x: 98, y: 354, count: '24M+' },
      { name: 'KOLKATA (21M+)', x: 336, y: 290, count: '21M+' },
      { name: 'BENGALURU (16M+)', x: 171, y: 465, count: '16M+' },
      { name: 'LUCKNOW (14M+)', x: 235, y: 220, count: '14M+' },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    badge: '#1 Video & Streaming Giant in India',
    logo: YouTubeLogo,
    accentColor: 'from-red-600 via-rose-600 to-amber-600',
    textColor: 'text-red-400',
    glowColor: 'rgba(255, 0, 0, 0.45)',
    mapColor: '#FF0000',
    totalIndiaUsers: '500 Million',
    totalIndiaUsersNum: '500,000,000 Active Citizens',
    percentageOfIndia: '34.2%',
    ratioDescription: 'Over 1 in every 3 Indian citizens watches YouTube daily — India is YouTube’s single largest national audience.',
    category: 'Streaming & Vernacular Shorts',
    highlightedStates: [
      'Uttar Pradesh', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Karnataka', 'West Bengal',
      'Gujarat', 'Kerala', 'Rajasthan', 'Punjab', 'Andhra Pradesh', 'Haryana', 'Bihar', 'Madhya Pradesh'
    ],
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
    badge: '#1 Visual Media & Screen Time in India',
    logo: InstagramLogo,
    accentColor: 'from-pink-500 via-purple-600 to-amber-500',
    textColor: 'text-pink-400',
    glowColor: 'rgba(225, 48, 108, 0.50)',
    mapColor: '#E1306C',
    totalIndiaUsers: '481 Million',
    totalIndiaUsersNum: '481,000,000 Active Citizens',
    percentageOfIndia: '33.0%',
    ratioDescription: '1 in every 3 citizens in India scrolls Instagram — India is Instagram’s #1 market worldwide.',
    category: 'Reels, Visual Posts & DM Network',
    highlightedStates: [
      'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Punjab',
      'West Bengal', 'Kerala', 'Andhra Pradesh', 'Rajasthan', 'Uttar Pradesh'
    ],
    metroHubs: [
      { name: 'DELHI NCR (38M+)', x: 165, y: 181, count: '38M+', isPrimary: true },
      { name: 'MUMBAI (34M+)', x: 98, y: 354, count: '34M+' },
      { name: 'BENGALURU (26M+)', x: 171, y: 465, count: '26M+' },
      { name: 'HYDERABAD (19M+)', x: 185, y: 385, count: '19M+' },
      { name: 'KOLKATA (18M+)', x: 336, y: 290, count: '18M+' },
    ],
    impactDetails: {
      totalAudience: '481 Million',
      dailyActive: '350+ Million Daily',
      monthlyScreenTime: '49 Hours / Month',
      daysPerYear: '24.5 Days / Year',
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
  const [manualInstaStep, setManualInstaStep] = useState<'map' | 'image' | null>(null);

  const displayProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const lastStateRef = useRef<{ index: number; step: 'map' | 'image' }>({ index: 0, step: 'map' });

  // Track sticky scroll progress with smooth damping
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
        const next = current + diff * 0.18;
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

  // Sequential Platform & Instagram Sub-phase Progression:
  // Phase 0: WhatsApp (0.00 -> 0.24) - India Map
  // Phase 1: Facebook (0.24 -> 0.48) - India Map
  // Phase 2: YouTube  (0.48 -> 0.70) - India Map
  // Phase 3a: Instagram Step 1: India Map Distribution (0.70 -> 0.85)
  // Phase 3b: Instagram Step 2: Screen Reality (0.85 -> 1.00) [Uploaded image swoops in and replaces India map]
  let rawActiveIndex = 0;
  let rawLocalProgress = 0;
  let rawInstaStep: 'map' | 'image' = 'map';

  if (manualStageIndex !== null) {
    rawActiveIndex = Math.min(3, manualStageIndex);
    rawLocalProgress = 0.05;
    rawInstaStep = manualInstaStep || 'map';
  } else {
    if (scrollProgress < 0.24) {
      rawActiveIndex = 0;
      rawLocalProgress = scrollProgress / 0.24;
      rawInstaStep = 'map';
    } else if (scrollProgress < 0.48) {
      rawActiveIndex = 1;
      rawLocalProgress = (scrollProgress - 0.24) / 0.24;
      rawInstaStep = 'map';
    } else if (scrollProgress < 0.70) {
      rawActiveIndex = 2;
      rawLocalProgress = (scrollProgress - 0.48) / 0.22;
      rawInstaStep = 'map';
    } else if (scrollProgress < 0.85) {
      rawActiveIndex = 3;
      rawLocalProgress = (scrollProgress - 0.70) / 0.15;
      rawInstaStep = 'map'; // First, the India map distribution is visible!
    } else {
      rawActiveIndex = 3;
      rawLocalProgress = Math.min(1, (scrollProgress - 0.85) / 0.15);
      rawInstaStep = 'image'; // On next scroll, uploaded image replaces India map!
    }
  }

  const activeIndex = rawActiveIndex;
  const stageLocalProgress = rawLocalProgress;
  const currentInstaStep: 'map' | 'image' =
    manualInstaStep && activeIndex === 3 ? manualInstaStep : rawInstaStep;

  // Sound triggers
  useEffect(() => {
    const prev = lastStateRef.current;
    if (prev.index !== activeIndex || prev.step !== currentInstaStep) {
      lastStateRef.current = { index: activeIndex, step: currentInstaStep };
      if (activeIndex === 3 && currentInstaStep === 'image' && prev.step !== 'image') {
        soundEngine.playSubBassImpact();
      } else {
        soundEngine.playClickTone();
      }
    }
  }, [activeIndex, currentInstaStep]);

  // Holding plateau logic
  let stageOpacity = 1;
  let stageScale = 1;

  if (manualStageIndex === null) {
    if (stageLocalProgress < 0.05 && activeIndex > 0) {
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

  const currentStage = INDIA_STAGES[activeIndex];
  const StageLogo = currentStage.logo;

  // Natural Scroll-Driven 3D Extrusion & Color Emergence for ALL 4 APPS:
  // 1. Initial Blank Buffer (stageLocalProgress 0.00 to 0.18):
  //    ALL 4 apps (WhatsApp, Facebook, YouTube, Instagram) start on an identical 100% BLANK map (ZERO color).
  // 2. Extrusion & Emergence (0.18 to 0.52):
  //    As the user scrolls 2-3 times, the platform color illuminates and smoothly extrudes up & out in 3D!
  // 3. Peak Plateau (0.52 to 0.84):
  //    Full 3D extrusion (1.0), glowing perimeter outline, and elevated metro pins.
  // 4. Clean Recede (0.84 to 0.98):
  //    Color recedes back into the base map so the next platform begins on a pristine blank slate.
  let emergenceProgress = 0;
  if (stageLocalProgress <= 0.18) {
    emergenceProgress = 0;
  } else if (stageLocalProgress < 0.52) {
    emergenceProgress = (stageLocalProgress - 0.18) / 0.34;
  } else if (stageLocalProgress <= 0.84) {
    emergenceProgress = 1.0;
  } else if (stageLocalProgress < 0.98 && (activeIndex < 3 || currentInstaStep === 'map')) {
    emergenceProgress = Math.max(0, 1.0 - (stageLocalProgress - 0.84) / 0.14);
  } else {
    emergenceProgress = activeIndex === 3 && currentInstaStep === 'image' ? 1.0 : 0;
  }

  const extrudeFactor = emergenceProgress;
  const colorOpacity = emergenceProgress;
  const maxExtrudePx = 20;
  const currentExtrudePx = maxExtrudePx * extrudeFactor;
  // Extrude vector: upward and to the left in isometric relief projection
  const offsetX = currentExtrudePx * 0.65;
  const offsetY = currentExtrudePx * 0.95;

  const highlightedStatesList = useMemo(() => {
    return indiaStatesData.filter((st) => currentStage.highlightedStates.includes(st.name));
  }, [currentStage.highlightedStates]);

  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const handleMapMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: nx * 5, y: -ny * 5 });
  };
  const handleMapMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  const handleSelectStage = (index: number) => {
    soundEngine.playClickTone();
    setManualStageIndex(index);
    setManualInstaStep('map');

    const stickyWrapper = containerRef.current?.closest('.sticky-scene-container') as HTMLElement;
    if (stickyWrapper) {
      const scrollableDistance = stickyWrapper.offsetHeight - window.innerHeight;
      if (scrollableDistance > 0) {
        // Start within the blank buffer zone of each platform stage (100% blank map!)
        const targetFraction = [0.02, 0.25, 0.49, 0.715][index];
        targetProgressRef.current = targetFraction;
        const targetScrollTop = stickyWrapper.offsetTop + targetFraction * scrollableDistance;
        const scrollContainer = containerRef.current?.closest('.overflow-y-scroll') || window;
        scrollContainer.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
        setTimeout(() => {
          setManualStageIndex(null);
        }, 500);
      }
    }
  };

  const handleSwitchInstaStep = (step: 'map' | 'image') => {
    soundEngine.playClickTone();
    setManualInstaStep(step);
    setManualStageIndex(null);

    const stickyWrapper = containerRef.current?.closest('.sticky-scene-container') as HTMLElement;
    if (stickyWrapper) {
      const scrollableDistance = stickyWrapper.offsetHeight - window.innerHeight;
      if (scrollableDistance > 0) {
        const targetFraction = step === 'map' ? 0.77 : 0.93;
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
    } else if (activeIndex === 3 && currentInstaStep === 'map') {
      // Advance to Instagram step 2 (Uploaded Image replaces India map)
      handleSwitchInstaStep('image');
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
        <div className="absolute inset-0 bg-[#02050f]" />
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle at 65% 50%, ${currentStage.glowColor} 0%, rgba(3, 7, 18, 0.95) 70%, #000000 100%)`,
            opacity: 0.55,
          }}
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* =================================================================== */}
      {/* 2. TOP HEADER & INTERACTIVE STEPPER TABS (4 PLATFORMS) */}
      {/* =================================================================== */}
      <header className="relative z-20 max-w-6xl mx-auto w-full pt-4 sm:pt-6 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-sans drop-shadow-md">
          India’s Digital Screen Reality
        </h2>

        {/* 4 Platform Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-3xl mx-auto mt-4 sm:mt-6">
          {INDIA_STAGES.map((stage, idx) => {
            const isActive = activeIndex === idx;
            const Logo = stage.logo;

            return (
              <button
                key={stage.id}
                onClick={() => handleSelectStage(idx)}
                className={`relative flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl transition-all duration-300 text-left cursor-pointer border-0 shadow-lg ${
                  isActive
                    ? 'bg-neutral-900/95 shadow-2xl scale-105 z-10 filter-none opacity-100 ring-1 ring-white/10'
                    : 'bg-neutral-950/50 hover:bg-neutral-900/60 opacity-40 hover:opacity-80 scale-95'
                }`}
              >
                <Logo className="w-5 h-5 sm:w-5.5 sm:h-5.5 shrink-0" />
                <div className="flex flex-col text-left">
                  <div className="text-[11px] sm:text-xs font-bold text-white font-sans leading-tight flex items-center gap-1">
                    <span>{stage.name}</span>
                    {idx === 3 && activeIndex === 3 && (
                      <span className="text-[8px] font-mono font-black px-1.5 py-0.5 rounded bg-pink-500/30 text-pink-300 uppercase">
                        {currentInstaStep === 'map' ? 'MAP' : 'REALITY'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <span className={`text-[10px] sm:text-[11px] font-mono font-black ${isActive ? stage.textColor : 'text-neutral-400'}`}>
                      {stage.percentageOfIndia}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400">
                      • {stage.totalIndiaUsers}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="india-active-bar"
                    className={`absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r ${stage.accentColor}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Sub-stepper for Instagram section (Step 1: Map vs Step 2: Uploaded Image) */}
        {activeIndex === 3 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 pt-1"
          >
            <button
              onClick={() => handleSwitchInstaStep('map')}
              className={`px-3 py-1 rounded-full text-[10px] font-mono transition-all flex items-center gap-1.5 cursor-pointer border ${
                currentInstaStep === 'map'
                  ? 'bg-pink-600 text-white font-bold shadow-lg shadow-pink-600/30 border-pink-400/50 scale-105'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border-white/5 hover:border-white/20'
              }`}
            >
              <span>1. India Map Distribution</span>
            </button>
            <button
              onClick={() => handleSwitchInstaStep('image')}
              className={`px-3 py-1 rounded-full text-[10px] font-mono transition-all flex items-center gap-1.5 cursor-pointer border ${
                currentInstaStep === 'image'
                  ? 'bg-pink-600 text-white font-bold shadow-lg shadow-pink-600/30 border-pink-400/60 ring-1 ring-pink-400/50 scale-105'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border-white/5 hover:border-white/20'
              }`}
            >
              <Smartphone className="w-3 h-3 text-pink-400" />
              <span>2. Screen Reality (Uploaded Image)</span>
            </button>
          </motion.div>
        )}
      </header>

      {/* =================================================================== */}
      {/* 3. CENTERPIECE: LEFT DATA PANEL + RIGHT (MAP OR UPLOADED IMAGE) */}
      {/* =================================================================== */}
      <div
        className="relative z-20 max-w-6xl mx-auto w-full px-4 my-auto transition-all duration-300 ease-out"
        style={{
          opacity: stageOpacity,
          transform: `scale(${stageScale})`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`screen-india-${currentStage.id}-${activeIndex === 3 ? currentInstaStep : 'default'}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center"
          >
            {/* LEFT COLUMN: Clean, Focused Data Panel */}
            <div className="lg:col-span-5 bg-neutral-950/80 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 text-left border-0">
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center space-x-2.5">
                  <StageLogo className="w-8 h-8 sm:w-9 sm:h-9" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-sans flex items-center gap-2">
                      <span>{currentStage.name}</span>
                      <span className="text-[10px] font-mono text-neutral-400 font-normal px-2 py-0.5 rounded-full bg-neutral-900">
                        {activeIndex === 3 && currentInstaStep === 'image'
                          ? 'The Human Reality'
                          : currentStage.category}
                      </span>
                    </h3>
                    <p className="text-[11px] font-mono text-neutral-400">
                      {activeIndex === 3 && currentInstaStep === 'image'
                        ? 'Every Generation Transfixed Across India'
                        : currentStage.badge}
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full uppercase ${currentStage.textColor} bg-neutral-900/80`}>
                  {activeIndex === 3 && currentInstaStep === 'image' ? 'Lived Reality' : 'India Share'}
                </span>
              </div>

              {/* Big Metric Display */}
              <div className="space-y-1.5 text-left">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                  {activeIndex === 3 && currentInstaStep === 'image'
                    ? 'Total Population Glued To Screens'
                    : 'Share of India’s Population'}
                </span>

                <div className="flex items-baseline space-x-3">
                  <span className={`text-5xl sm:text-6xl lg:text-7xl font-black font-mono tracking-tight ${currentStage.textColor} drop-shadow-lg`}>
                    {activeIndex === 3 && currentInstaStep === 'image' ? '481M' : currentStage.percentageOfIndia}
                  </span>
                  <span className="text-xs sm:text-sm font-sans font-bold text-neutral-300 leading-tight">
                    {activeIndex === 3 && currentInstaStep === 'image' ? (
                      <>CITIZENS GLUED<br />TO PHONES DAILY</>
                    ) : (
                      <>OF ALL CITIZENS<br />ACROSS INDIA</>
                    )}
                  </span>
                </div>

                {/* Progress Bar or Impact Metric Cards */}
                {activeIndex === 3 && currentInstaStep === 'image' ? (
                  <div className="grid grid-cols-3 gap-2 pt-2 pb-1">
                    <div className="p-2 rounded-xl bg-neutral-900/80 border border-white/5 text-center">
                      <div className="text-[10px] font-mono text-neutral-400">Daily Active</div>
                      <div className="text-sm font-mono font-bold text-pink-400">350M+</div>
                    </div>
                    <div className="p-2 rounded-xl bg-neutral-900/80 border border-white/5 text-center">
                      <div className="text-[10px] font-mono text-neutral-400">Screen Time</div>
                      <div className="text-sm font-mono font-bold text-amber-400">49h / mo</div>
                    </div>
                    <div className="p-2 rounded-xl bg-neutral-900/80 border border-white/5 text-center">
                      <div className="text-[10px] font-mono text-neutral-400">Per Year</div>
                      <div className="text-sm font-mono font-bold text-emerald-400">24.5 Days</div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 pb-1">
                    <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: currentStage.percentageOfIndia }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${currentStage.accentColor} rounded-full`}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1.5">
                      <span>0 Citizens</span>
                      <span className="text-white font-bold">{currentStage.totalIndiaUsers} Active</span>
                      <span>1.46B India Total</span>
                    </div>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-neutral-200 font-sans font-semibold pt-1 leading-relaxed">
                  {activeIndex === 3 && currentInstaStep === 'image'
                    ? 'The map is not abstract data. Across every metro and rural district in India, every generation—children, parents, and grandparents—is transfixed by the endless feed.'
                    : currentStage.ratioDescription}
                </p>
              </div>

              {/* Subtitle count banner */}
              <div className="p-3 rounded-2xl bg-neutral-900/80 flex items-center justify-between text-xs font-mono border-0">
                <span className="text-neutral-400">
                  {activeIndex === 3 && currentInstaStep === 'image' ? 'National Reality:' : 'Total Active Citizens:'}
                </span>
                <span className="text-white font-extrabold text-sm">
                  {activeIndex === 3 && currentInstaStep === 'image'
                    ? '481,000,000 Transfixed Users'
                    : currentStage.totalIndiaUsersNum}
                </span>
              </div>

              {/* Scroll Guidance Helper */}
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1">
                <span className="flex items-center gap-1 text-amber-400">
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                  <span>
                    {activeIndex < 3
                      ? `Scroll down for ${INDIA_STAGES[activeIndex + 1].name}`
                      : currentInstaStep === 'map'
                      ? 'Scroll down to replace map with reality image'
                      : 'Scroll down for The Instagram Trap'}
                  </span>
                </span>
                <button
                  onClick={handleNextStage}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs transition-all cursor-pointer border-0"
                >
                  <span>
                    {activeIndex < 3
                      ? 'Next App'
                      : currentInstaStep === 'map'
                      ? 'Reveal Reality'
                      : 'The Trap'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: INDIA MAP (WHATSAPP, FB, YT, INSTAGRAM STEP 1) OR UPLOADED IMAGE (INSTAGRAM STEP 2) */}
            <div className="lg:col-span-7 bg-neutral-950/70 backdrop-blur-2xl rounded-3xl p-3 sm:p-5 shadow-2xl flex flex-col justify-between h-[360px] sm:h-[420px] lg:h-[485px] max-h-[60vh] border-0 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {activeIndex === 3 && currentInstaStep === 'image' ? (
                  /* INSTAGRAM STEP 2: UPLOADED IMAGE SWOOPS IN FROM SOMEWHERE AND REPLACES INDIA MAP */
                  <motion.div
                    key="insta-uploaded-reality-image"
                    initial={{
                      opacity: 0,
                      scale: 0.65,
                      y: 120,
                      x: 60,
                      rotate: 5,
                      filter: 'blur(8px)',
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      x: 0,
                      rotate: 0,
                      filter: 'blur(0px)',
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.65,
                      y: 120,
                      x: 60,
                      rotate: 5,
                      filter: 'blur(8px)',
                      transition: { duration: 0.25 },
                    }}
                    transition={{
                      type: 'spring',
                      damping: 22,
                      stiffness: 130,
                      mass: 0.8,
                    }}
                    className="relative w-full h-full flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between pb-1.5 shrink-0">
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                        <span>Digital Screen Reality • 481M Citizens Glued To Phones</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-pink-300 bg-pink-950/80 px-2.5 py-0.5 rounded-full font-bold border border-pink-500/30">
                          Reality Revealed
                        </span>
                        <button
                          onClick={() => handleSwitchInstaStep('map')}
                          className="text-[9px] font-mono text-neutral-400 hover:text-white px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer border border-white/10"
                          title="Back to India Map"
                        >
                          ← View Map
                        </button>
                      </div>
                    </div>

                    {/* Uploaded Image Container */}
                    <div className="relative w-full flex-1 min-h-0 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-black/60 ring-1 ring-pink-500/25 group">
                      <img
                        src="/image.png"
                        alt="Indian Family Glued to Screens"
                        className="w-full h-full object-cover sm:object-contain rounded-2xl shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/90 drop-shadow-md pointer-events-none">
                        <span className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-pink-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                          <span className="text-pink-300 font-bold">Lived Reality:</span>
                          <span className="text-white">Every Generation Transfixed</span>
                        </span>
                        <span className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-neutral-300 border border-white/10 hidden sm:inline">
                          Replaces India Map
                        </span>
                      </div>
                    </div>

                    <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono text-neutral-400 shrink-0">
                      <span className="text-pink-400 font-bold">National Ground Reality:</span>
                      <span className="text-neutral-300">Every generation transfixed by smartphone screens</span>
                    </div>
                  </motion.div>
                ) : (
                  /* WHATSAPP, FB, YOUTUBE, AND INSTAGRAM STEP 1: INDIA MAP (NO STATE BORDERS, ONLY MAIN BORDER HIGHLIGHTED) */
                  <motion.div
                    key={`map-container-${currentStage.id}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.92,
                      y: -20,
                      filter: 'blur(6px)',
                      transition: { duration: 0.3 },
                    }}
                    transition={{ duration: 0.35 }}
                    className="relative w-full h-full flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between pb-1 shrink-0">
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                        <Award className={`w-3.5 h-3.5 ${currentStage.textColor}`} />
                        <span>India Map • {currentStage.name} Adoption</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span>
                            {emergenceProgress < 0.05
                              ? 'Scroll to Reveal 3D Map'
                              : `3D Extrusion (${Math.round(emergenceProgress * 100)}% Raised)`}
                          </span>
                        </span>
                        {activeIndex === 3 && (
                          <button
                            onClick={() => handleSwitchInstaStep('image')}
                            className="text-[9px] font-mono font-bold text-pink-300 hover:text-white bg-pink-950/70 hover:bg-pink-900 border border-pink-500/30 px-2 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <span>Reveal Reality</span>
                            <ChevronRight className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Vector India Map with 3D Isometric Tilt & Scroll-Driven Extrusion Pop-Out */}
                    <div
                      className="relative w-full flex-1 flex items-center justify-center min-h-0 p-1 select-none"
                      style={{ perspective: '1100px' }}
                      onMouseMove={handleMapMouseMove}
                      onMouseLeave={handleMapMouseLeave}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
                        style={{
                          transform: `rotateX(${11 + extrudeFactor * 8 + mouseTilt.y}deg) rotateY(${-7 - extrudeFactor * 6 + mouseTilt.x}deg) rotateZ(1.2deg)`,
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <svg
                          className="w-full h-full max-h-[400px] object-contain drop-shadow-2xl transition-transform duration-100 ease-out"
                          viewBox="-25 -25 545 615"
                          preserveAspectRatio="xMidYMid meet"
                          fill="none"
                        >
                          <defs>
                            <filter id="state-blur" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="1.5" />
                            </filter>

                            {/* Dynamic 3D Cast Drop Shadow under Elevated Territory */}
                            <filter id="extrude-cast-shadow" x="-60%" y="-60%" width="220%" height="220%">
                              <feDropShadow
                                dx={offsetX * 1.25}
                                dy={offsetY * 1.55}
                                stdDeviation={4 + currentExtrudePx * 0.55}
                                floodColor="#000000"
                                floodOpacity={0.82 + extrudeFactor * 0.16}
                              />
                              <feDropShadow
                                dx={offsetX * 0.4}
                                dy={offsetY * 0.5}
                                stdDeviation={2}
                                floodColor="#000000"
                                floodOpacity={0.65}
                              />
                            </filter>

                            {/* Pure Outer Perimeter Outline Filter (NO internal state borders) */}
                            <filter id="top-face-perimeter-glow" x="-30%" y="-30%" width="160%" height="160%">
                              <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="dilated" />
                              <feComposite in="dilated" in2="SourceAlpha" operator="out" result="perimeterOnly" />
                              <feFlood floodColor="#ffffff" floodOpacity="0.95" result="whiteFlood" />
                              <feComposite in="whiteFlood" in2="perimeterOnly" operator="in" result="whitePerimeter" />
                              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor={currentStage.mapColor} floodOpacity="0.95" result="neonAura" />
                              <feMerge>
                                <feMergeNode in="neonAura" />
                                <feMergeNode in="SourceGraphic" />
                                <feMergeNode in="whitePerimeter" />
                              </feMerge>
                            </filter>

                            {/* Main Outer Border Glow */}
                            <filter id="india-border-glow" x="-20%" y="-20%" width="140%" height="140%">
                              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#ffffff" floodOpacity="0.85" />
                            </filter>

                            {/* Ultra-Bright Top Face Shading Gradient */}
                            <linearGradient id={`top-gradient-${currentStage.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.55} />
                              <stop offset="22%" stopColor="#ffffff" stopOpacity={0.25} />
                              <stop offset="45%" stopColor={currentStage.mapColor} stopOpacity={1} />
                              <stop offset="100%" stopColor={currentStage.mapColor} stopOpacity={0.96} />
                            </linearGradient>
                          </defs>

                          {/* Coordinate Grid */}
                          <g stroke="#f59e0b" strokeOpacity="0.04" strokeWidth="0.8" strokeDasharray="3 4">
                            <line x1="125" y1="0" x2="125" y2="570" />
                            <line x1="250" y1="0" x2="250" y2="570" />
                            <line x1="375" y1="0" x2="375" y2="570" />
                            <line x1="0" y1="285" x2="495" y2="285" />
                          </g>

                          {/* 1. Base dark fill of all states (NO STATE BORDERS) */}
                          <g fill="#081026" stroke="none">
                            {indiaStatesData.map((st, idx) => (
                              <path
                                key={`base-fill-${idx}`}
                                d={st.d}
                                fill="#081026"
                                stroke="none"
                              />
                            ))}
                          </g>

                          {/* 2. Non-selected states (soft blur, dark tone, NO STATE BORDERS) */}
                          <g filter="url(#state-blur)" stroke="none" opacity="0.65">
                            {indiaStatesData
                              .filter((st) => !currentStage.highlightedStates.includes(st.name))
                              .map((st, idx) => (
                                <path
                                  key={`blurred-state-${idx}`}
                                  d={st.d}
                                  fill="#060d1f"
                                  stroke="none"
                                >
                                  <title>{st.name}</title>
                                </path>
                              ))}
                          </g>

                          {/* =================================================================== */}
                          {/* 3. 3D EXTRUDED POP-OUT HIGHLIGHTED TERRITORY (SCROLL-EMERGED)      */}
                          {/* =================================================================== */}

                          {/* A) Dynamic 3D Cast Drop Shadow directly on the base map (stroke="none") */}
                          <g
                            filter="url(#extrude-cast-shadow)"
                            stroke="none"
                            pointerEvents="none"
                            style={{ opacity: colorOpacity }}
                            className="transition-opacity duration-150 ease-out"
                          >
                            {highlightedStatesList.map((st, idx) => (
                              <path
                                key={`shadow-state-${idx}`}
                                d={st.d}
                                fill="#000000"
                                fillOpacity={0.96}
                                stroke="none"
                              />
                            ))}
                          </g>

                          {/* B) 3D Extrusion Side Wall Slices (Physical thickness & depth, NO internal state borders) */}
                          <g
                            style={{ opacity: colorOpacity }}
                            pointerEvents="none"
                            className="transition-opacity duration-150 ease-out"
                          >
                            {Array.from({ length: 8 }).map((_, sliceIdx) => {
                              const t = (sliceIdx + 1) / 9; // from 0.11 to 0.89
                              const sx = -offsetX * t;
                              const sy = -offsetY * t;
                              const brightness = 0.50 + t * 0.45;
                              return (
                                <g
                                  key={`wall-slice-${sliceIdx}`}
                                  transform={`translate(${sx}, ${sy})`}
                                  style={{ filter: `brightness(${brightness})` }}
                                  stroke="none"
                                >
                                  {highlightedStatesList.map((st, idx) => (
                                    <path
                                      key={`wall-slice-${sliceIdx}-${idx}`}
                                      d={st.d}
                                      fill={currentStage.mapColor}
                                      fillOpacity={0.98}
                                      stroke="none"
                                    />
                                  ))}
                                </g>
                              );
                            })}
                          </g>

                          {/* C) Top Elevated 3D Face (Unified solid landmass with pure exterior outline, NO internal state borders) */}
                          <g
                            transform={`translate(${-offsetX}, ${-offsetY})`}
                            filter="url(#top-face-perimeter-glow)"
                            stroke="none"
                            style={{ opacity: colorOpacity }}
                            className="transition-transform duration-75 ease-out transition-opacity duration-150"
                          >
                            {highlightedStatesList.map((st, idx) => (
                              <path
                                key={`top-state-${idx}`}
                                d={st.d}
                                fill={`url(#top-gradient-${currentStage.id})`}
                                fillOpacity={1.0}
                                stroke="none"
                                className="transition-all duration-150 ease-out cursor-pointer hover:fill-opacity-100"
                              >
                                <title>{st.name} (High {currentStage.name} Adoption • 3D Raised)</title>
                              </path>
                            ))}
                          </g>

                          {/* 4. MAIN CONTINUOUS NATIONAL OUTER BORDER (Illuminated Guide) */}
                          <g filter="url(#india-border-glow)" strokeLinejoin="round" strokeLinecap="round" pointerEvents="none">
                            <path
                              d={indiaOuterBorder.d}
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth={2.6}
                              strokeOpacity={0.96}
                              className="transition-all duration-300"
                            />
                          </g>
                          <path
                            d={indiaOuterBorder.d}
                            fill="none"
                            stroke="#f8fafc"
                            strokeWidth={1.5}
                            strokeOpacity={0.9}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            pointerEvents="none"
                          />

                          {/* 5. Metro Hubs Floating in 3D with Vertical Laser Ground Anchors */}
                          <g
                            className="transition-opacity duration-300 ease-out"
                            style={{ opacity: stageOpacity * colorOpacity }}
                          >
                            {currentStage.metroHubs.map((hub, idx) => {
                              const elevatedX = hub.x - offsetX;
                              const elevatedY = hub.y - offsetY;
                              return (
                                <g key={`hub-${currentStage.id}-${idx}`}>
                                  {/* 3D Vertical Laser Anchor Line connecting elevated pin to base ground */}
                                  <line
                                    x1={elevatedX}
                                    y1={elevatedY}
                                    x2={hub.x}
                                    y2={hub.y}
                                    stroke={currentStage.mapColor}
                                    strokeWidth={1.4}
                                    strokeDasharray="2.5 2.5"
                                    strokeOpacity={0.7}
                                  />
                                  {/* Ground Anchor Dot */}
                                  <circle cx={hub.x} cy={hub.y} r={2.5} fill="#000000" fillOpacity={0.7} />

                                  {/* Floating Ripple Pings on Top 3D Face */}
                                  <circle
                                    cx={elevatedX}
                                    cy={elevatedY}
                                    r={hub.isPrimary ? 20 : 13}
                                    stroke={currentStage.mapColor}
                                    strokeWidth={hub.isPrimary ? 2 : 1.2}
                                    fill="none"
                                    className="animate-ping opacity-80"
                                  />
                                  <circle
                                    cx={elevatedX}
                                    cy={elevatedY}
                                    r={hub.isPrimary ? 6.5 : 4.5}
                                    fill={currentStage.mapColor}
                                    stroke="#ffffff"
                                    strokeWidth={1.2}
                                    className="animate-pulse"
                                  />
                                  <text
                                    x={elevatedX}
                                    y={elevatedY - (hub.isPrimary ? 13 : 9)}
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
                              );
                            })}
                          </g>
                        </svg>
                      </div>
                    </div>

                    {/* Bottom Highlight Summary */}
                    <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono text-neutral-300 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className={`${currentStage.textColor} font-bold`}>High Adoption States:</span>
                        <span className="text-cyan-400 bg-cyan-950/50 border border-cyan-500/20 px-2 py-0.5 rounded-full text-[9px] hidden sm:inline-flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                          <span>{emergenceProgress < 0.05 ? 'Blank Base Map • Scroll to Extrude' : `3D Pop-Out: ${Math.round(emergenceProgress * 100)}%`}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5 overflow-x-auto text-[9px]">
                        {currentStage.highlightedStates.slice(0, 5).map((st, i) => (
                          <span key={i} className="bg-neutral-900/90 px-2 py-0.5 rounded-full text-white whitespace-nowrap">
                            {st}
                          </span>
                        ))}
                        <span className="text-neutral-500">+{currentStage.highlightedStates.length - 5} more</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
