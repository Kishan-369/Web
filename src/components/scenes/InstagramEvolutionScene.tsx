import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Zap,
  Repeat,
  Bell,
  Smartphone,
  Heart,
  MessageCircle,
  Video,
  Play,
  Pause,
  Film,
  Compass,
  DollarSign,
  UserPlus,
  Flame,
  Award,
  Clock,
  ChevronRight,
  ChevronLeft,
  Share2,
  Music,
  Search,
  Tag,
  TrendingUp,
  ShoppingBag,
  Send,
  ChevronDown,
  Brain,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export interface PhaseData {
  year: string;
  badge: string;
  title: string;
  tagline: string;
  isTurningPoint?: boolean;
  statNumber: string;
  statLabel: string;
  features: {
    name: string;
    hook: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  psychologyInsight: string;
}

export const EVOLUTION_PHASES: PhaseData[] = [
  {
    year: '2010',
    badge: 'THE INCEPTION',
    title: '1-Tap Visual Dopamine',
    tagline: 'Pivoted away from complex Burbn check-ins into pure 1-tap square photos with vintage retro film filters.',
    statNumber: '25,000',
    statLabel: 'Users on Day 1 (Server Crashed)',
    features: [
      { name: 'Vintage Retro Filters', hook: 'Amateur phone snaps instantly feel like artistic Polaroid masterworks.', icon: Sparkles },
      { name: 'Instant Likes Scoreboard', hook: 'Public social validation counter that sparks immediate ego gratification.', icon: Heart },
    ],
    psychologyInsight: 'Stripped 80% of unnecessary features. Replaced cognitive friction with instantaneous visual dopamine.',
  },
  {
    year: '2011',
    badge: 'DISCOVERY ENGINE',
    title: 'The Infinite Rabbit Hole',
    tagline: 'Introduced hashtags (#) and the algorithmic Explore tab, converting a friend network into global curiosity.',
    statNumber: '10,000,000+',
    statLabel: 'Photos tagged in first month',
    features: [
      { name: 'Hashtags (#)', hook: 'Hyper-niche rabbit holes categorizing every human obsession without end.', icon: Compass },
      { name: 'Explore Algorithm', hook: 'Replaces chronological limits with infinite personalized visual browsing.', icon: Zap },
    ],
    psychologyInsight: 'Chronological feeds have a finish line. Algorithmic discovery makes the browsing session limitless.',
  },
  {
    year: '2012',
    badge: 'SCALE & HEIST',
    title: "Meta's $1 Billion Takeover",
    tagline: 'Facebook acquired Instagram for $1,000,000,000, paired with an explosive Android release.',
    statNumber: '1,000,000',
    statLabel: 'Android Downloads in first 12 hours',
    features: [
      { name: 'Global Android Launch', hook: 'Expanded beyond iPhone elites to instantly capture every mobile phone on earth.', icon: Smartphone },
      { name: '$1B Meta Infrastructure', hook: 'Zuckerberg backed the platform with server farms and growth optimization.', icon: Award },
    ],
    psychologyInsight: 'Secured a universal monopoly over mobile photography before any competitor could establish roots.',
  },
  {
    year: '2013',
    badge: 'LOCK-IN',
    title: 'The Walled Garden',
    tagline: 'Direct messaging and 15-second video clips moved private social relationships permanently inside the app.',
    statNumber: '2x TIME',
    statLabel: 'Daily session length doubled with video',
    features: [
      { name: 'Instagram Direct (DMs)', hook: 'Private chatting inside the app means leaving Instagram severs social ties.', icon: MessageCircle },
      { name: '15-Sec Video Player', hook: 'Added synchronized motion and sound to double user dwell time per session.', icon: Video },
    ],
    psychologyInsight: 'When friendships and private conversations live inside the application, switching costs become insurmountable.',
  },
  {
    year: '2015',
    badge: 'MONETIZATION',
    title: 'Attention Into Billions',
    tagline: 'Native sponsored ads and 1-click shopping converted user visual inspiration directly into commerce.',
    isTurningPoint: true,
    statNumber: '$20B+',
    statLabel: 'Annual targeted ad revenue unlocked',
    features: [
      { name: 'Behavioral Ad Targeting', hook: 'Sponsored posts indistinguishable from friends, matched to subconscious taste.', icon: DollarSign },
      { name: '1-Click Shop Now', hook: 'Impulse purchasing triggered at the exact peak moment of aesthetic desire.', icon: Flame },
    ],
    psychologyInsight: '⭐ Turning Point: User attention was transformed from an organic community into high-yield commercial real estate.',
  },
  {
    year: '2016',
    badge: 'DEFENSIVE MASTERSTROKE',
    title: 'The 24-Hour FOMO Ritual',
    tagline: 'Cloned Snapchat Stories with top-of-feed glowing rings, making daily morning and evening checks mandatory.',
    isTurningPoint: true,
    statNumber: '500,000,000',
    statLabel: 'Daily Active Story Viewers',
    features: [
      { name: '24h Ephemeral Stories', hook: 'Disappears in 24 hours — weaponizing Fear Of Missing Out to enforce daily logins.', icon: Clock },
      { name: 'Interactive Story Polls', hook: 'Micro-taps that train users into active feedback machines while gathering data.', icon: Sparkles },
    ],
    psychologyInsight: '⭐ Turning Point: Weaponized temporary content to create an involuntary morning-to-night checking habit.',
  },
  {
    year: '2017-18',
    badge: 'CREATOR ECONOMY',
    title: '10x Dwell Time Multiplier',
    tagline: '10-photo swipeable carousels and influencer shopping trapped top creators and followers permanently inside.',
    statNumber: '10x SWIPES',
    statLabel: 'Engagement dwell time multiplier per post',
    features: [
      { name: '10-Photo Carousels', hook: 'Multiplied horizontal thumb swipes per post, skyrocketing session duration.', icon: Repeat },
      { name: 'Creator Monetization', hook: 'Kept internet celebrities inside Instagram so they never defected to YouTube.', icon: UserPlus },
    ],
    psychologyInsight: 'Turned everyday users into creators and followers into shoppers, monopolizing cultural mindshare.',
  },
  {
    year: '2020',
    badge: 'TIKTOK SURVIVAL',
    title: 'Hypnotic Reels Stream',
    tagline: 'Launched full-screen short-form video driven by an AI interest graph to defeat TikTok at its own game.',
    isTurningPoint: true,
    statNumber: '140,000,000,000+',
    statLabel: 'Reels plays per day across Meta apps',
    features: [
      { name: 'Infinite Reels Swipe', hook: 'Hypnotic AI video stream designed to induce a trance-like flow state.', icon: Film },
      { name: 'Audio Remix Engine', hook: 'Viral sound bites turn passive consumers into active viral choreographers.', icon: Play },
    ],
    psychologyInsight: '⭐ Turning Point: Severed the connection to friends; replaced it with an AI interest engine feeding pure dopamine.',
  },
  {
    year: '2022-25',
    badge: 'TOTAL LOCK-IN',
    title: '100% AI Attention Monopoly',
    tagline: 'Unfollowed AI-suggested content fills over 50% of the main feed, supported by broadcast channels and Threads.',
    statNumber: '50%+',
    statLabel: 'Feed filled by unfollowed AI recommendations',
    features: [
      { name: 'Meta Neural Ranker AI', hook: 'Understands millimeter scroll pauses to predict your exact latent cravings.', icon: Zap },
      { name: 'Broadcast Channels & Threads', hook: 'Complete attention dominance across full-screen video, photos, and text.', icon: MessageCircle },
    ],
    psychologyInsight: 'The user is no longer browsing their friends. The AI is browsing the user to maximize commercial dwell time.',
  },
];

export const HOOK_STAGES = [
  {
    stage: 'STAGE 1',
    name: 'Trigger',
    sub: 'The Bait',
    stat: '9:41 AM Alert',
    badge: 'INVOLUNTARY IMPULSE',
    desc: 'Push notifications ("Sarah liked your photo", red badge count) pull you back into the app before your conscious mind can decide.',
    icon: Bell,
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/60',
    textColor: 'text-amber-400',
  },
  {
    stage: 'STAGE 2',
    name: 'Action',
    sub: 'The Scroll',
    stat: '180ms Biometric',
    badge: 'ZERO FRICTION',
    desc: 'One thumb swipe opens the app and pulls down to refresh the feed — biometric unlock eliminates all cognitive hesitation.',
    icon: Smartphone,
    color: 'from-pink-600 to-rose-600',
    borderColor: 'border-pink-500/60',
    textColor: 'text-pink-400',
  },
  {
    stage: 'STAGE 3',
    name: 'Reward',
    sub: 'Variable Dopamine',
    stat: 'Slot Machine Odds',
    badge: 'PSYCHOLOGICAL HOOK',
    desc: 'Unpredictable rewards: Sometimes 30 likes, sometimes an explosive viral Reel. The uncertainty mimics casino gambling mechanics.',
    icon: Heart,
    color: 'from-purple-600 to-indigo-600',
    borderColor: 'border-purple-500/60',
    textColor: 'text-purple-400',
  },
  {
    stage: 'STAGE 4',
    name: 'Investment',
    sub: 'Lock-In Data',
    stat: '10+ Years Archive',
    badge: 'IRREVERSIBLE COST',
    desc: 'Every photo posted, friend followed, and DM exchanged increases switching costs until leaving feels like erasing your social life.',
    icon: Repeat,
    color: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-500/60',
    textColor: 'text-cyan-400',
  },
];

// Rich Era Color Gradients for Dynamic Ambient Atmosphere
export const ERA_THEMES: Record<string, {
  name: string;
  bgGradient: string;
  glow1: string;
  glow2: string;
  cardBorder: string;
  accentColor: string;
}> = {
  '2010': {
    name: 'Vintage Polaroid & Earlybird',
    bgGradient: 'radial-gradient(circle at 60% 35%, rgba(180, 83, 9, 0.28) 0%, rgba(69, 26, 3, 0.22) 40%, rgba(8, 4, 2, 0.98) 100%)',
    glow1: 'rgba(217, 119, 6, 0.25)',
    glow2: 'rgba(120, 53, 15, 0.18)',
    cardBorder: 'border-amber-500/40',
    accentColor: '#f59e0b',
  },
  '2011': {
    name: 'Discovery Net & Hashtags',
    bgGradient: 'radial-gradient(circle at 60% 35%, rgba(14, 116, 144, 0.28) 0%, rgba(4, 47, 46, 0.22) 45%, rgba(2, 9, 20, 0.98) 100%)',
    glow1: 'rgba(6, 182, 212, 0.22)',
    glow2: 'rgba(30, 58, 138, 0.18)',
    cardBorder: 'border-cyan-500/40',
    accentColor: '#06b6d4',
  },
  '2012': {
    name: 'Scale & $1B Acquisition',
    bgGradient: 'radial-gradient(circle at 65% 30%, rgba(30, 58, 138, 0.30) 0%, rgba(6, 78, 59, 0.22) 45%, rgba(3, 8, 22, 0.98) 100%)',
    glow1: 'rgba(37, 99, 235, 0.25)',
    glow2: 'rgba(16, 185, 129, 0.18)',
    cardBorder: 'border-blue-500/40',
    accentColor: '#3b82f6',
  },
  '2013': {
    name: 'Direct DMs & 15s Video',
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(131, 24, 67, 0.28) 0%, rgba(88, 28, 135, 0.25) 45%, rgba(13, 2, 22, 0.98) 100%)',
    glow1: 'rgba(219, 39, 119, 0.25)',
    glow2: 'rgba(147, 51, 234, 0.20)',
    cardBorder: 'border-pink-500/40',
    accentColor: '#ec4899',
  },
  '2015': {
    name: 'Monetise & Sponsored Shopping',
    bgGradient: 'radial-gradient(circle at 60% 35%, rgba(180, 83, 9, 0.28) 0%, rgba(67, 20, 7, 0.24) 45%, rgba(12, 6, 2, 0.98) 100%)',
    glow1: 'rgba(245, 158, 11, 0.25)',
    glow2: 'rgba(234, 88, 12, 0.18)',
    cardBorder: 'border-amber-500/40',
    accentColor: '#f59e0b',
  },
  '2016': {
    name: 'Iconic Stories 24h Sunset',
    bgGradient: 'radial-gradient(circle at 55% 40%, rgba(190, 24, 93, 0.32) 0%, rgba(194, 65, 12, 0.25) 35%, rgba(76, 29, 149, 0.22) 65%, rgba(13, 1, 18, 0.98) 100%)',
    glow1: 'rgba(236, 72, 153, 0.28)',
    glow2: 'rgba(249, 115, 22, 0.22)',
    cardBorder: 'border-pink-500/45',
    accentColor: '#ec4899',
  },
  '2017-18': {
    name: 'Creator Economy & Carousels',
    bgGradient: 'radial-gradient(circle at 60% 35%, rgba(107, 33, 168, 0.30) 0%, rgba(59, 7, 100, 0.26) 45%, rgba(11, 2, 23, 0.98) 100%)',
    glow1: 'rgba(168, 85, 247, 0.25)',
    glow2: 'rgba(99, 102, 241, 0.20)',
    cardBorder: 'border-purple-500/40',
    accentColor: '#a855f7',
  },
  '2020': {
    name: 'Reels Cyberpunk Neon Club',
    bgGradient: 'radial-gradient(circle at 65% 45%, rgba(219, 39, 119, 0.32) 0%, rgba(8, 145, 178, 0.24) 40%, rgba(10, 1, 20, 0.98) 100%)',
    glow1: 'rgba(244, 63, 94, 0.28)',
    glow2: 'rgba(6, 182, 212, 0.22)',
    cardBorder: 'border-rose-500/45',
    accentColor: '#f43f5e',
  },
  '2022-25': {
    name: 'Neural AI Attention Lock-In',
    bgGradient: 'radial-gradient(circle at 60% 35%, rgba(67, 56, 202, 0.30) 0%, rgba(15, 118, 110, 0.24) 45%, rgba(3, 8, 22, 0.98) 100%)',
    glow1: 'rgba(99, 102, 241, 0.25)',
    glow2: 'rgba(20, 184, 166, 0.20)',
    cardBorder: 'border-cyan-500/40',
    accentColor: '#06b6d4',
  },
};

export const HABIT_THEMES = [
  {
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(217, 119, 6, 0.30) 0%, rgba(185, 28, 28, 0.22) 45%, rgba(15, 5, 2, 0.98) 100%)',
    glow1: 'rgba(245, 158, 11, 0.25)',
    glow2: 'rgba(239, 68, 68, 0.18)',
    cardBorder: 'border-amber-500/45',
  },
  {
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(219, 39, 119, 0.30) 0%, rgba(225, 29, 72, 0.22) 45%, rgba(16, 2, 10, 0.98) 100%)',
    glow1: 'rgba(236, 72, 153, 0.25)',
    glow2: 'rgba(244, 63, 94, 0.18)',
    cardBorder: 'border-pink-500/45',
  },
  {
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(147, 51, 234, 0.32) 0%, rgba(225, 29, 72, 0.22) 45%, rgba(15, 2, 25, 0.98) 100%)',
    glow1: 'rgba(168, 85, 247, 0.28)',
    glow2: 'rgba(244, 63, 94, 0.18)',
    cardBorder: 'border-purple-500/45',
  },
  {
    bgGradient: 'radial-gradient(circle at 60% 40%, rgba(8, 145, 178, 0.30) 0%, rgba(37, 99, 235, 0.22) 45%, rgba(2, 11, 23, 0.98) 100%)',
    glow1: 'rgba(6, 182, 212, 0.25)',
    glow2: 'rgba(59, 130, 246, 0.18)',
    cardBorder: 'border-cyan-500/45',
  },
];

export const BURBN_THEME = {
  bgGradient: 'radial-gradient(circle at 25% 45%, rgba(220, 38, 38, 0.25) 0%, transparent 55%), radial-gradient(circle at 75% 45%, rgba(16, 185, 129, 0.25) 0%, transparent 55%), #03060a',
  glow1: 'rgba(239, 68, 68, 0.22)',
  glow2: 'rgba(16, 185, 129, 0.24)',
  cardBorder: 'border-white/15',
};

// Real photographic natural images for testing vintage 2010 filters
const NATURAL_PHOTOS: Record<string, { label: string; url: string; fallback: string }> = {
  dog: {
    label: '🐶 Dog at Cafe',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80',
    fallback: '/image1.jpeg',
  },
  coffee: {
    label: '☕ Latte Art',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80',
    fallback: '/image2.jpeg',
  },
  sunset: {
    label: '🌅 Golden Coast',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    fallback: '/image3.jpeg',
  },
};

type FilterType = 'normal' | 'earlybird' | 'xpro' | 'lofi' | 'valencia' | 'nashville';

interface FilterOption {
  id: FilterType;
  label: string;
  cssFilter: string;
  vignette: string;
}

const VINTAGE_FILTERS: FilterOption[] = [
  {
    id: 'normal',
    label: 'Normal',
    cssFilter: 'none',
    vignette: 'none',
  },
  {
    id: 'earlybird',
    label: 'Earlybird ★',
    cssFilter: 'sepia(0.48) contrast(1.18) brightness(1.06) saturate(1.24)',
    vignette: 'radial-gradient(circle, transparent 55%, rgba(120, 53, 15, 0.45) 100%)',
  },
  {
    id: 'xpro',
    label: 'X-Pro II',
    cssFilter: 'contrast(1.38) saturate(1.42) brightness(1.02) sepia(0.14)',
    vignette: 'radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.65) 100%)',
  },
  {
    id: 'lofi',
    label: 'Lo-Fi',
    cssFilter: 'contrast(1.52) saturate(1.48) brightness(0.95)',
    vignette: 'radial-gradient(circle, transparent 48%, rgba(0, 0, 0, 0.75) 100%)',
  },
  {
    id: 'valencia',
    label: 'Valencia',
    cssFilter: 'sepia(0.28) contrast(1.12) brightness(1.14) saturate(1.18)',
    vignette: 'radial-gradient(circle, transparent 65%, rgba(217, 119, 6, 0.28) 100%)',
  },
  {
    id: 'nashville',
    label: 'Nashville',
    cssFilter: 'sepia(0.32) hue-rotate(-18deg) contrast(1.18) saturate(1.28) brightness(1.05)',
    vignette: 'radial-gradient(circle, transparent 55%, rgba(131, 24, 67, 0.38) 100%)',
  },
];

interface Props {
  onScrollToNext?: () => void;
}

export const InstagramEvolutionScene: React.FC<Props> = ({ onScrollToNext }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manualMode, setManualMode] = useState<boolean>(false);

  // Active navigation items
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(0);
  const [selectedHookStage, setSelectedHookStage] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'timeline' | 'hookLoop' | 'burbnOrigin'>('timeline');

  // Interactive states for mockups
  const [activeFilter, setActiveFilter] = useState<FilterType>('earlybird');
  const [activePhotoKey, setActivePhotoKey] = useState<string>('dog');
  const [likesCount2010, setLikesCount2010] = useState<number>(1420);
  const [hasLiked2010, setHasLiked2010] = useState<boolean>(false);
  const [showHeartBurst, setShowHeartBurst] = useState<boolean>(false);

  const [activeHashtag, setActiveHashtag] = useState<string>('#urbanphotography');
  const [androidDownloadSpeed, setAndroidDownloadSpeed] = useState<number>(1000000);
  const [isPlaying15sVideo, setIsPlaying15sVideo] = useState<boolean>(true);
  const [chatMessageInput, setChatMessageInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<string[]>([
    'Did you see this 15-sec video clip?? 🎬',
    'Private chat locked inside Instagram 🔒',
  ]);
  const [productInspected, setProductInspected] = useState<boolean>(false);
  const [pollVote, setPollVote] = useState<'yes' | 'no' | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [carouselSlide, setCarouselSlide] = useState<number>(1);
  const [reelsLikesCount, setReelsLikesCount] = useState<number>(1420580);
  const [hasLikedReels, setHasLikedReels] = useState<boolean>(false);
  const [aiInterestTag, setAiInterestTag] = useState<string>('Street Photography');

  // Habit loop slot machine
  const [slotSpinning, setSlotSpinning] = useState<boolean>(false);
  const [slotResult, setSlotResult] = useState<string>('❤️ 142 Likes');

  // Next scene transition state & moment
  const [isTransitioningToNext, setIsTransitioningToNext] = useState<boolean>(false);

  const displayProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const lastYearIndexRef = useRef(0);
  const lastHookStageRef = useRef(0);
  const lastViewModeRef = useRef<string>('timeline');

  // Track scroll inside sticky container
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

  // Map scroll progress to modes
  useEffect(() => {
    if (manualMode) return;

    if (scrollProgress < 0.58) {
      if (lastViewModeRef.current !== 'timeline') {
        lastViewModeRef.current = 'timeline';
        setViewMode('timeline');
      }
      const rawYearFraction = scrollProgress / 0.58;
      const yearIdx = Math.min(EVOLUTION_PHASES.length - 1, Math.floor(rawYearFraction * EVOLUTION_PHASES.length));
      if (yearIdx !== lastYearIndexRef.current) {
        lastYearIndexRef.current = yearIdx;
        setSelectedYearIndex(yearIdx);
        soundEngine.playClickTone();
      }
    } else if (scrollProgress < 0.84) {
      if (lastViewModeRef.current !== 'hookLoop') {
        lastViewModeRef.current = 'hookLoop';
        setViewMode('hookLoop');
        soundEngine.playNotificationPing();
      }
      const rawLoopFraction = (scrollProgress - 0.58) / 0.26;
      const stageIdx = Math.min(HOOK_STAGES.length - 1, Math.floor(rawLoopFraction * HOOK_STAGES.length));
      if (stageIdx !== lastHookStageRef.current) {
        lastHookStageRef.current = stageIdx;
        setSelectedHookStage(stageIdx);
        soundEngine.playClickTone();
      }
    } else {
      if (lastViewModeRef.current !== 'burbnOrigin') {
        lastViewModeRef.current = 'burbnOrigin';
        setViewMode('burbnOrigin');
        soundEngine.playSubBassImpact();
      }
    }

    // When scrolling reaches the very end of Scene 7 (> 0.985), trigger cinematic transition to Scene 8
    if (scrollProgress >= 0.985 && !isTransitioningToNext) {
      handleProceedToNextScene();
    }
  }, [scrollProgress, manualMode, isTransitioningToNext]);

  const handleProceedToNextScene = () => {
    if (isTransitioningToNext) return;
    soundEngine.playSubBassImpact();
    setIsTransitioningToNext(true);
    setTimeout(() => {
      onScrollToNext?.();
      setTimeout(() => {
        setIsTransitioningToNext(false);
      }, 500);
    }, 650);
  };

  const scrollToTargetProgress = (targetFrac: number) => {
    setManualMode(true);
    targetProgressRef.current = targetFrac;
    displayProgressRef.current = targetFrac;
    setScrollProgress(targetFrac);

    const stickyWrapper = containerRef.current?.closest('.sticky-scene-container') as HTMLElement;
    if (stickyWrapper) {
      const scrollableDistance = stickyWrapper.offsetHeight - window.innerHeight;
      if (scrollableDistance > 0) {
        const targetScrollTop = stickyWrapper.offsetTop + targetFrac * scrollableDistance;
        const scrollContainer = containerRef.current?.closest('.overflow-y-scroll') || window;
        scrollContainer.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
      }
    }
    setTimeout(() => setManualMode(false), 600);
  };

  const handleYearSelect = (idx: number) => {
    soundEngine.playClickTone();
    setSelectedYearIndex(idx);
    setViewMode('timeline');
    lastYearIndexRef.current = idx;
    lastViewModeRef.current = 'timeline';
    const targetFrac = (idx + 0.5) * (0.58 / EVOLUTION_PHASES.length);
    scrollToTargetProgress(targetFrac);
  };

  const handlePrevYear = () => {
    if (selectedYearIndex > 0) {
      handleYearSelect(selectedYearIndex - 1);
    }
  };

  const handleNextYear = () => {
    if (selectedYearIndex < EVOLUTION_PHASES.length - 1) {
      handleYearSelect(selectedYearIndex + 1);
    }
  };

  const handleHookStageSelect = (idx: number) => {
    soundEngine.playClickTone();
    setSelectedHookStage(idx);
    setViewMode('hookLoop');
    lastHookStageRef.current = idx;
    lastViewModeRef.current = 'hookLoop';
    const targetFrac = 0.58 + (idx + 0.5) * (0.26 / HOOK_STAGES.length);
    scrollToTargetProgress(targetFrac);
  };

  const handlePrevStage = () => {
    if (selectedHookStage > 0) {
      handleHookStageSelect(selectedHookStage - 1);
    }
  };

  const handleNextStage = () => {
    if (selectedHookStage < HOOK_STAGES.length - 1) {
      handleHookStageSelect(selectedHookStage + 1);
    }
  };

  const handleViewModeSelect = (mode: 'timeline' | 'hookLoop' | 'burbnOrigin') => {
    soundEngine.playClickTone();
    setViewMode(mode);
    lastViewModeRef.current = mode;
    if (mode === 'timeline') {
      scrollToTargetProgress(0.05);
    } else if (mode === 'hookLoop') {
      scrollToTargetProgress(0.62);
    } else {
      scrollToTargetProgress(0.92);
    }
  };

  const handleToggleLike2010 = () => {
    soundEngine.playNotificationPing();
    if (!hasLiked2010) {
      setLikesCount2010((prev) => prev + 1);
      setHasLiked2010(true);
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 800);
    } else {
      setLikesCount2010((prev) => prev - 1);
      setHasLiked2010(false);
    }
  };

  const handleSpinSlot = () => {
    if (slotSpinning) return;
    soundEngine.playClickTone();
    setSlotSpinning(true);
    const outcomes = [
      '❤️ +280 Likes',
      '🔥 1 Viral Story Repost',
      '💬 14 Direct Messages',
      '⭐ 50 New Followers',
      '🎰 JACKPOT: 1.2M Reels Views!',
    ];
    let counter = 0;
    const interval = setInterval(() => {
      setSlotResult(outcomes[counter % outcomes.length]);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        const finalPick = outcomes[Math.floor(Math.random() * outcomes.length)];
        setSlotResult(finalPick);
        setSlotSpinning(false);
        soundEngine.playNotificationPing();
      }
    }, 100);
  };

  const activePhase = EVOLUTION_PHASES[selectedYearIndex] || EVOLUTION_PHASES[0];

  const currentTheme =
    viewMode === 'timeline'
      ? ERA_THEMES[activePhase.year] || ERA_THEMES['2010']
      : viewMode === 'hookLoop'
      ? HABIT_THEMES[selectedHookStage] || HABIT_THEMES[0]
      : BURBN_THEME;

  const activeFilterObj = VINTAGE_FILTERS.find((f) => f.id === activeFilter) || VINTAGE_FILTERS[1];
  const activePhoto = NATURAL_PHOTOS[activePhotoKey] || NATURAL_PHOTOS.dog;

  return (
    <section
      ref={containerRef}
      className="h-screen w-full text-white relative flex flex-col justify-between py-2 sm:py-3 px-3 sm:px-6 snap-start snap-always shrink-0 overflow-hidden select-none bg-neutral-950"
    >
      {/* Dynamic Background Atmosphere */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out pointer-events-none"
        style={{
          background: currentTheme.bgGradient,
          opacity: 0.95,
        }}
      />

      <div
        className="absolute top-1/4 -left-28 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none transition-all duration-700 ease-out"
        style={{ background: currentTheme.glow1 }}
      />
      <div
        className="absolute bottom-1/4 -right-28 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none transition-all duration-700 ease-out"
        style={{ background: currentTheme.glow2 }}
      />

      {/* =================================================================== */}
      {/* 1. TOP HEADER & NAVIGATION BAR                                      */}
      {/* =================================================================== */}
      <header className="relative z-20 max-w-6xl mx-auto w-full flex flex-col items-center space-y-2">
        <div className="flex items-center justify-between w-full">
          {/* Scene Tag */}
          <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-pink-300">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="font-bold">SCENE 7</span>
            <span className="text-neutral-500 hidden sm:inline">•</span>
            <span className="text-neutral-300 hidden sm:inline">THE PSYCHOLOGICAL HOOK ARCHITECTURE</span>
          </div>

          {/* 3 Main Mode Selectors */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono">
            <button
              onClick={() => handleViewModeSelect('timeline')}
              className={`px-3 py-1.5 rounded-xl transition-all duration-300 cursor-pointer border ${
                viewMode === 'timeline'
                  ? 'bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-bold border-amber-300 shadow-md scale-102 opacity-100 blur-none z-10'
                  : 'bg-neutral-900/80 text-neutral-400 border-white/10 hover:text-white opacity-40 blur-[1px] hover:blur-none hover:opacity-100'
              }`}
            >
              1. Evolution (2010–2025)
            </button>

            <button
              onClick={() => handleViewModeSelect('hookLoop')}
              className={`px-3 py-1.5 rounded-xl transition-all duration-300 cursor-pointer border ${
                viewMode === 'hookLoop'
                  ? 'bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-bold border-amber-300 shadow-md scale-102 opacity-100 blur-none z-10'
                  : 'bg-neutral-900/80 text-neutral-400 border-white/10 hover:text-white opacity-40 blur-[1px] hover:blur-none hover:opacity-100'
              }`}
            >
              2. The 4-Stage Habit Loop
            </button>

            <button
              onClick={() => handleViewModeSelect('burbnOrigin')}
              className={`px-3 py-1.5 rounded-xl transition-all duration-300 cursor-pointer border ${
                viewMode === 'burbnOrigin'
                  ? 'bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-bold border-amber-300 shadow-md scale-102 opacity-100 blur-none z-10'
                  : 'bg-neutral-900/80 text-neutral-400 border-white/10 hover:text-white opacity-40 blur-[1px] hover:blur-none hover:opacity-100'
              }`}
            >
              3. Burbn vs Instagram Origin
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-neutral-900/90 h-1 rounded-full overflow-hidden relative border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${Math.max(4, scrollProgress * 100)}%` }}
          />
        </div>
      </header>

      {/* =================================================================== */}
      {/* 2. MAIN CONTENT AREA (CLEAN EARLIER LAYOUT WITH PROMINENT PANEL)    */}
      {/* =================================================================== */}
      <main className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center py-2 sm:py-3">
        {/* ================================================================= */}
        {/* VIEW 1: TIMELINE WITH CLEAN HORIZONTAL SELECTOR & BALANCED CARD   */}
        {/* ================================================================= */}
        {viewMode === 'timeline' && (
          <div className="space-y-3 w-full h-full flex flex-col justify-between">
            {/* Clean Horizontal Timeline Bar */}
            <div className="flex items-center justify-between gap-1 sm:gap-2 px-1 py-1">
              <button
                onClick={handlePrevYear}
                disabled={selectedYearIndex === 0}
                className="p-1.5 rounded-xl bg-neutral-900/90 border border-white/15 text-white hover:bg-neutral-800 disabled:opacity-20 disabled:pointer-events-none cursor-pointer transition-all shrink-0"
                title="Previous Year"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto py-0.5">
                {EVOLUTION_PHASES.map((phase, idx) => {
                  const isSelected = selectedYearIndex === idx;
                  return (
                    <button
                      key={phase.year}
                      onClick={() => handleYearSelect(idx)}
                      className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl border text-xs font-mono transition-all duration-300 flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-black border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.65)] ring-2 ring-pink-500/60 scale-110 opacity-100 blur-none z-10'
                          : 'bg-neutral-900/60 border-white/10 text-neutral-400 opacity-25 blur-[2.5px] scale-90 grayscale hover:grayscale-0 hover:blur-none hover:opacity-90 hover:scale-100'
                      }`}
                    >
                      <span className="font-extrabold">{phase.year}</span>
                      {phase.isTurningPoint && (
                        <span className="text-[10px] text-amber-300 font-bold">★</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextYear}
                disabled={selectedYearIndex === EVOLUTION_PHASES.length - 1}
                className="p-1.5 rounded-xl bg-neutral-900/90 border border-white/15 text-white hover:bg-neutral-800 disabled:opacity-20 disabled:pointer-events-none cursor-pointer transition-all shrink-0"
                title="Next Year"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Active Year Card with 2 Columns: Left = Content, Right = Big Mockup Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase.year}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`apple-card p-4 sm:p-5 rounded-3xl border ${currentTheme.cardBorder} bg-neutral-950/90 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center flex-1 min-h-[460px] max-h-[560px]`}
              >
                {/* LEFT COLUMN: Narrative, Headline, Features, Insight */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-3 text-left">
                  {/* Header Info */}
                  <div className="border-b border-white/10 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-black text-amber-400 bg-amber-950/80 border border-amber-500/40 px-3 py-0.5 rounded-full">
                        ERA {activePhase.year}
                      </span>
                      <span className="text-xs font-mono text-neutral-400 bg-neutral-900 border border-white/10 px-2.5 py-0.5 rounded-full">
                        {activePhase.badge}
                      </span>
                      {activePhase.isTurningPoint && (
                        <span className="text-xs font-mono text-pink-400 bg-pink-950/80 border border-pink-500/40 px-2.5 py-0.5 rounded-full animate-pulse font-bold">
                          ⭐ TURNING POINT
                        </span>
                      )}
                      <span className="text-xs font-mono text-neutral-400 ml-auto font-semibold">
                        {selectedYearIndex + 1} / {EVOLUTION_PHASES.length}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight mt-1.5">
                      {activePhase.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1 leading-relaxed font-medium">
                      {activePhase.tagline}
                    </p>
                  </div>

                  {/* Prominent High-Impact Stat Callout */}
                  <div className="p-3 bg-neutral-900/90 rounded-2xl border border-white/10 flex items-center justify-between shadow-md">
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 font-mono tracking-tight">
                        {activePhase.statNumber}
                      </div>
                      <div className="text-xs text-neutral-400 font-mono font-medium">
                        {activePhase.statLabel}
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
                      <TrendingUp className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>

                  {/* Key Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activePhase.features.map((feat, idx) => {
                      const IconComp = feat.icon;
                      return (
                        <div
                          key={`feat-${idx}-${activePhase.year}`}
                          className="p-3 bg-neutral-900/80 rounded-2xl border border-white/10 space-y-1 shadow-sm"
                        >
                          <div className="flex items-center space-x-2 text-xs font-bold text-pink-400 font-mono">
                            <div className="p-1 rounded-lg bg-pink-950/80 border border-pink-500/30 shrink-0">
                              <IconComp className="w-3.5 h-3.5 text-pink-400" />
                            </div>
                            <span className="truncate">{feat.name}</span>
                          </div>
                          <p className="text-xs text-neutral-300 font-sans leading-snug font-medium">
                            {feat.hook}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Psychological Trap Callout */}
                  <div className="p-3 bg-gradient-to-r from-purple-950/70 via-pink-950/60 to-neutral-950 rounded-2xl border border-purple-500/30 space-y-0.5 shadow-sm">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>The Psychological Trap</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-200 font-sans italic font-medium leading-relaxed">
                      "{activePhase.psychologyInsight}"
                    </p>
                  </div>
                </div>

                {/* RIGHT COLUMN: COMFORTABLE & PROMINENT INTERACTIVE MOCKUP PANEL */}
                <div className="lg:col-span-5 flex justify-center items-center h-full">
                  <div className="w-full max-w-[390px] sm:max-w-[420px]">
                    {renderComfortableMockup(activePhase.year, {
                      activeFilter,
                      setActiveFilter,
                      activePhotoKey,
                      setActivePhotoKey,
                      activePhoto,
                      activeFilterObj,
                      likesCount2010,
                      setLikesCount2010,
                      hasLiked2010,
                      handleToggleLike2010,
                      showHeartBurst,
                      setShowHeartBurst,
                      activeHashtag,
                      setActiveHashtag,
                      androidDownloadSpeed,
                      setAndroidDownloadSpeed,
                      isPlaying15sVideo,
                      setIsPlaying15sVideo,
                      chatMessageInput,
                      setChatMessageInput,
                      chatMessages,
                      setChatMessages,
                      productInspected,
                      setProductInspected,
                      pollVote,
                      setPollVote,
                      currentStoryIndex,
                      setCurrentStoryIndex,
                      carouselSlide,
                      setCarouselSlide,
                      reelsLikesCount,
                      setReelsLikesCount,
                      hasLikedReels,
                      setHasLikedReels,
                      aiInterestTag,
                      setAiInterestTag,
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 2: THE 4-STAGE HABIT LOOP                                    */}
        {/* ================================================================= */}
        {viewMode === 'hookLoop' && (
          <div className="space-y-3 w-full h-full flex flex-col justify-between">
            {/* 4 Stage Pills */}
            <div className="flex items-center justify-between gap-1 sm:gap-2 px-1">
              <button
                onClick={handlePrevStage}
                disabled={selectedHookStage === 0}
                className="p-1.5 rounded-xl bg-neutral-900/90 border border-white/15 text-white hover:bg-neutral-800 disabled:opacity-20 disabled:pointer-events-none cursor-pointer transition-all shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HOOK_STAGES.map((stg, idx) => {
                  const isSelected = selectedHookStage === idx;
                  const IconC = stg.icon;
                  return (
                    <button
                      key={stg.stage}
                      onClick={() => handleHookStageSelect(idx)}
                      className={`p-2 sm:p-2.5 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
                        isSelected
                          ? `bg-neutral-900/95 ${stg.borderColor} shadow-[0_0_25px_rgba(236,72,153,0.5)] ring-2 ring-pink-500/60 scale-[1.03] opacity-100 blur-none z-10 font-bold`
                          : 'bg-neutral-950/60 border-white/10 opacity-25 blur-[3px] scale-95 grayscale hover:grayscale-0 hover:blur-none hover:opacity-85 hover:scale-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className={stg.textColor}>{stg.stage}</span>
                        <IconC className={`w-3.5 h-3.5 ${stg.textColor}`} />
                      </div>
                      <div className="text-xs sm:text-sm font-black text-white truncate">{stg.name}</div>
                      <div className="text-[10px] text-neutral-400 font-mono truncate">{stg.sub}</div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextStage}
                disabled={selectedHookStage === HOOK_STAGES.length - 1}
                className="p-1.5 rounded-xl bg-neutral-900/90 border border-white/15 text-white hover:bg-neutral-800 disabled:opacity-20 disabled:pointer-events-none cursor-pointer transition-all shrink-0"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stage Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={HOOK_STAGES[selectedHookStage].stage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`apple-card p-5 sm:p-6 rounded-3xl border ${HOOK_STAGES[selectedHookStage].borderColor} bg-neutral-950/90 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-1 min-h-[440px] max-h-[540px]`}
              >
                {/* Left side: Details */}
                <div className="lg:col-span-7 space-y-3 text-left">
                  <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
                    <span className={`text-xs font-mono font-black ${HOOK_STAGES[selectedHookStage].textColor}`}>
                      {HOOK_STAGES[selectedHookStage].stage} • {HOOK_STAGES[selectedHookStage].name.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-0.5 rounded-full border border-white/10">
                      {HOOK_STAGES[selectedHookStage].badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                    {HOOK_STAGES[selectedHookStage].sub}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed font-medium">
                    {HOOK_STAGES[selectedHookStage].desc}
                  </p>

                  <div className="p-3 bg-neutral-900/90 rounded-2xl border border-white/10 text-xs sm:text-sm font-mono text-neutral-300 flex items-center justify-between shadow-sm">
                    <span>Habit Outcome: <strong className="text-amber-400">Involuntary Reflex</strong></span>
                    <span className="text-neutral-200 font-bold bg-neutral-950 px-3 py-1 rounded-xl border border-white/10">
                      {HOOK_STAGES[selectedHookStage].stat}
                    </span>
                  </div>

                  {/* Dopamine Slot Machine Widget */}
                  <div className="p-3 bg-gradient-to-r from-purple-950/70 to-neutral-950 rounded-2xl border border-purple-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-purple-300 font-bold">
                      <span>🎰 VARIABLE DOPAMINE REWARD ODDS</span>
                      <span className="text-neutral-400 text-[10px]">Tap to test odds</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 py-2 px-3 rounded-xl bg-black/70 border border-white/10 text-center font-mono text-xs sm:text-sm font-black text-amber-300">
                        {slotResult}
                      </div>
                      <button
                        onClick={handleSpinSlot}
                        disabled={slotSpinning}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-mono text-xs font-bold shadow-md hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                      >
                        {slotSpinning ? 'Rolling...' : 'SPIN'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right side: Mockup Panel */}
                <div className="lg:col-span-5 flex justify-center items-center h-full">
                  <div className="w-full max-w-[390px] sm:max-w-[420px]">
                    {renderHabitMockup(selectedHookStage)}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 3: BURBN VS INSTAGRAM ORIGIN                                 */}
        {/* ================================================================= */}
        {viewMode === 'burbnOrigin' && (
          <div className="space-y-3 w-full h-full flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 text-left flex-1">
              {/* Before: Burbn */}
              <div className="apple-card p-5 rounded-3xl border border-red-500/30 bg-neutral-950/90 space-y-3 shadow-xl backdrop-blur-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono font-black text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-500/40">
                      BEFORE • 2010
                    </span>
                    <span className="text-sm font-black text-white font-mono">Burbn (Check-In App)</span>
                  </div>

                  <div className="p-3 bg-neutral-900/90 rounded-2xl border border-red-500/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                      <span>🍸 Burbn Mobile v1.0</span>
                      <span className="text-red-400 font-bold">Severe Friction</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-xs font-mono text-center">
                      <div className="p-2 bg-neutral-950 rounded-xl border border-white/5 text-neutral-400">Check-In 📍</div>
                      <div className="p-2 bg-neutral-950 rounded-xl border border-white/5 text-neutral-400">Plans 📅</div>
                      <div className="p-2 bg-neutral-950 rounded-xl border border-white/5 text-neutral-400">Points 🏆</div>
                      <div className="p-2 bg-neutral-950 rounded-xl border border-white/5 text-neutral-400">Badges 🎖️</div>
                      <div className="p-2 bg-neutral-950 rounded-xl border border-white/5 text-neutral-400">Friends 👥</div>
                      <div className="p-2 bg-neutral-950 rounded-xl border border-red-500/30 text-amber-300 font-bold">Photos 📸</div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed font-medium">
                    Kevin Systrom & Mike Krieger's original app tried to do everything: check-ins, location gaming, hangout planning, and photo sharing. Too cluttered — users abandoned it.
                  </p>
                </div>

                <div className="p-3 bg-red-950/40 border border-red-500/20 rounded-xl text-xs font-mono text-red-300 font-bold">
                  ❌ Cognitive Overload & High Friction = Failed Launch
                </div>
              </div>

              {/* After: Instagram */}
              <div className="apple-card p-5 rounded-3xl border border-emerald-500/30 bg-neutral-950/90 space-y-3 shadow-xl backdrop-blur-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
                      AFTER • OCT 6, 2010
                    </span>
                    <span className="text-sm font-black text-white font-mono">Instagram (Instant Photo)</span>
                  </div>

                  <div className="p-3 bg-neutral-900/90 rounded-2xl border border-emerald-500/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-bold">✨ Stripped to 1 Action:</span>
                      <span className="text-emerald-300 font-bold">25,000 Users Day 1</span>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-emerald-950/50 to-teal-950/50 rounded-xl border border-emerald-500/30 text-center space-y-1">
                      <div className="text-sm sm:text-base font-black text-white">Snap Photo → Apply Filter → Instant Share</div>
                      <div className="text-xs text-emerald-300 font-mono">Zero cognitive friction • Pure visual dopamine</div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed font-medium">
                    They eliminated 80% of the features, keeping only square photos, added instant vintage filters, and made posting effortless. <strong className="text-emerald-400 font-mono">25,000 users signed up on day one.</strong>
                  </p>
                </div>

                <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-xs font-mono text-emerald-300 font-bold">
                  ✅ 1-Tap Instant Gratification = Multi-Billion Dollar Engine
                </div>
              </div>
            </div>

            {/* Pitch Thesis Box */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-600/20 via-pink-600/20 to-purple-600/20 border border-pink-500/30 text-center space-y-0.5 shadow-lg backdrop-blur-md">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-300 font-black">
                THE PITCH THESIS
              </div>
              <p className="text-xs sm:text-sm text-neutral-100 font-sans font-medium italic">
                "Instagram won not by inventing new technologies, but by systematically engineering human psychology. Every single feature was a deliberate hook to keep attention in, and convert it into valuation."
              </p>
            </div>

            {/* Transition Moment Card to Scene 8 */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950/80 via-neutral-900/90 to-purple-950/80 border border-red-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl backdrop-blur-md">
              <div className="text-left space-y-0.5">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-red-400">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                  <span>SCENE BREAKPOINT • READY FOR SCENE 8</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  Next: What is Social Media Addiction?
                </div>
                <div className="text-[11px] text-neutral-400 font-light">
                  15 years of engineered dopamine hooks rewired human neurochemistry. Discover the 4 biological traps.
                </div>
              </div>
              <button
                onClick={handleProceedToNextScene}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-black text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(239,68,68,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <span>Enter Scene 8 →</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* =================================================================== */}
      {/* 3. FOOTER SCROLL CUE & SCENE 8 ADVANCE TRIGGER                      */}
      {/* =================================================================== */}
      <footer className="relative z-20 max-w-6xl mx-auto w-full flex items-center justify-between text-xs font-mono text-neutral-400 py-1 border-t border-white/5">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
          <span>
            {viewMode === 'timeline'
              ? `Year ${activePhase.year} (${selectedYearIndex + 1}/${EVOLUTION_PHASES.length})`
              : viewMode === 'hookLoop'
              ? `Habit Stage ${selectedHookStage + 1}/4: ${HOOK_STAGES[selectedHookStage].name}`
              : 'Pivot Origin Analysis'}
          </span>
        </div>

        {scrollProgress >= 0.88 || viewMode === 'burbnOrigin' ? (
          <button
            onClick={handleProceedToNextScene}
            className="flex items-center space-x-2 px-3 py-1 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-mono font-bold shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse hover:scale-105 transition-all cursor-pointer"
          >
            <span>Proceed to: What is Social Media Addiction?</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="flex items-center space-x-1.5 text-pink-400/90 hover:text-pink-300 font-medium">
            <span>Scroll to explore timeline</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        )}
      </footer>

      {/* =================================================================== */}
      {/* 4. CINEMATIC FULLSCREEN TRANSITION WARP OVERLAY TO SCENE 8          */}
      {/* =================================================================== */}
      <AnimatePresence>
        {isTransitioningToNext && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.15, filter: 'blur(20px)' }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-red-600 via-pink-600 to-purple-600 flex items-center justify-center shadow-[0_0_60px_rgba(239,68,68,0.8)] border border-white/30 mb-5"
            >
              <Brain className="w-10 h-10 text-white animate-pulse" />
            </motion.div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-red-400 bg-red-950/80 border border-red-500/40 px-4 py-1.5 rounded-full mb-3 animate-pulse">
              ⚠️ NEURAL BREAKPOINT DETECTED
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
              Entering: What is Social Media Addiction?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-md mb-6 leading-relaxed font-light">
              15 years of engineered dopamine, infinite feeds, and invisible algorithms have rewired human neurochemistry. Discover the 4 biological traps now.
            </p>
            <div className="w-48 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// =========================================================================
// HELPER: RENDER COMFORTABLE & PROMINENT MOCKUP PANELS
// Kept "a bit big in size", with easily visible hearts, likes, and natural images
// =========================================================================
interface MockupHelpers {
  activeFilter: FilterType;
  setActiveFilter: (f: FilterType) => void;
  activePhotoKey: string;
  setActivePhotoKey: (k: string) => void;
  activePhoto: { label: string; url: string; fallback: string };
  activeFilterObj: FilterOption;
  likesCount2010: number;
  setLikesCount2010: React.Dispatch<React.SetStateAction<number>>;
  hasLiked2010: boolean;
  handleToggleLike2010: () => void;
  showHeartBurst: boolean;
  setShowHeartBurst: (v: boolean) => void;
  activeHashtag: string;
  setActiveHashtag: (h: string) => void;
  androidDownloadSpeed: number;
  setAndroidDownloadSpeed: React.Dispatch<React.SetStateAction<number>>;
  isPlaying15sVideo: boolean;
  setIsPlaying15sVideo: React.Dispatch<React.SetStateAction<boolean>>;
  chatMessageInput: string;
  setChatMessageInput: React.Dispatch<React.SetStateAction<string>>;
  chatMessages: string[];
  setChatMessages: React.Dispatch<React.SetStateAction<string[]>>;
  productInspected: boolean;
  setProductInspected: React.Dispatch<React.SetStateAction<boolean>>;
  pollVote: 'yes' | 'no' | null;
  setPollVote: (v: 'yes' | 'no') => void;
  currentStoryIndex: number;
  setCurrentStoryIndex: React.Dispatch<React.SetStateAction<number>>;
  carouselSlide: number;
  setCarouselSlide: React.Dispatch<React.SetStateAction<number>>;
  reelsLikesCount: number;
  setReelsLikesCount: React.Dispatch<React.SetStateAction<number>>;
  hasLikedReels: boolean;
  setHasLikedReels: React.Dispatch<React.SetStateAction<boolean>>;
  aiInterestTag: string;
  setAiInterestTag: (t: string) => void;
}

function renderComfortableMockup(year: string, helpers: MockupHelpers) {
  const {
    activeFilter,
    setActiveFilter,
    activePhotoKey,
    setActivePhotoKey,
    activePhoto,
    activeFilterObj,
    likesCount2010,
    hasLiked2010,
    handleToggleLike2010,
    showHeartBurst,
    setShowHeartBurst,
    activeHashtag,
    setActiveHashtag,
    androidDownloadSpeed,
    setAndroidDownloadSpeed,
    isPlaying15sVideo,
    setIsPlaying15sVideo,
    chatMessageInput,
    setChatMessageInput,
    chatMessages,
    setChatMessages,
    productInspected,
    setProductInspected,
    pollVote,
    setPollVote,
    currentStoryIndex,
    setCurrentStoryIndex,
    carouselSlide,
    setCarouselSlide,
    reelsLikesCount,
    setReelsLikesCount,
    hasLikedReels,
    setHasLikedReels,
    aiInterestTag,
    setAiInterestTag,
  } = helpers;

  switch (year) {
    case '2010': {
      return (
        <div className="w-full h-[470px] sm:h-[485px] rounded-3xl bg-neutral-900/95 border border-amber-500/40 p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Post Header */}
          <div className="flex items-center justify-between text-xs font-mono text-neutral-300 border-b border-white/10 pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-amber-700 flex items-center justify-center font-bold text-[10px] text-black">
                K
              </div>
              <div className="text-left leading-tight">
                <span className="font-bold text-white block">@kevin</span>
                <span className="text-[10px] text-amber-400/90">📍 Todos Santos, Mexico</span>
              </div>
            </div>

            {/* Switch Natural Photo Pills */}
            <div className="flex items-center space-x-1 bg-black/60 px-1.5 py-0.5 rounded-full border border-white/10 text-[10px]">
              {Object.entries(NATURAL_PHOTOS).map(([k, p]) => (
                <button
                  key={k}
                  onClick={() => {
                    soundEngine.playClickTone();
                    setActivePhotoKey(k);
                  }}
                  className={`px-1.5 py-0.5 rounded-full cursor-pointer transition-all ${
                    activePhotoKey === k
                      ? 'bg-amber-500 text-black font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title={`Switch to ${p.label}`}
                >
                  {p.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* 1:1 Square Photographic Container with Real Natural Image */}
          <div
            onDoubleClick={() => {
              handleToggleLike2010();
            }}
            className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden border border-white/15 shadow-inner group cursor-pointer bg-neutral-950 flex items-center justify-center"
          >
            {/* Real Natural Image that visibly transforms with authentic vintage filters */}
            <img
              src={activePhoto.url}
              alt="Authentic 2010 Instagram Shot"
              className="w-full h-full object-cover transition-all duration-300 select-none"
              style={{ filter: activeFilterObj.cssFilter }}
              onError={(e) => {
                // Fallback to local image asset if network issue
                const target = e.currentTarget;
                if (target.src !== activePhoto.fallback) {
                  target.src = activePhoto.fallback;
                }
              }}
            />

            {/* Authentic Photographic Vignette Overlay */}
            {activeFilterObj.vignette !== 'none' && (
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-300"
                style={{ background: activeFilterObj.vignette }}
              />
            )}

            {/* Top Date & Location Overlay */}
            <div className="absolute top-2 left-2 pointer-events-none bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-[10px] font-mono text-amber-200 font-bold">
              📸 Oct 6, 2010
            </div>

            {/* Current Filter Watermark */}
            <div className="absolute top-2 right-2 pointer-events-none bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[10px] font-mono text-amber-300 font-black uppercase">
              {activeFilterObj.label}
            </div>

            {/* Double Tap Instruction / Heart Burst */}
            <AnimatePresence>
              {showHeartBurst && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 1 }}
                  exit={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                >
                  <Heart className="w-16 h-16 fill-rose-500 text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.9)]" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute bottom-1.5 inset-x-0 flex justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-mono text-white/90 bg-black/70 px-2 py-0.5 rounded-full backdrop-blur-sm">
                Double tap photo to like ❤️
              </span>
            </div>
          </div>

          {/* Social Feedback Bar (PROMINENT HEART & LIKES COUNT) */}
          <div className="flex items-center justify-between py-1 px-1">
            <button
              onClick={handleToggleLike2010}
              className="group flex items-center space-x-2.5 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <Heart
                className={`w-6 h-6 transition-all duration-300 ${
                  hasLiked2010
                    ? 'fill-rose-500 text-rose-500 filter drop-shadow-[0_0_10px_rgba(244,63,94,0.8)] scale-110'
                    : 'text-neutral-300 group-hover:text-rose-400 stroke-[2.2]'
                }`}
              />
              <span className="text-sm sm:text-base font-bold text-white font-sans tracking-tight">
                {likesCount2010.toLocaleString()} likes
              </span>
            </button>

            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40">
              1-Tap Ego Reward
            </span>
          </div>

          {/* Retro Film Filters Strip (EASILY VISIBLE & CLICKABLE) */}
          <div className="space-y-1.5 border-t border-white/10 pt-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-300">
              <span className="font-bold text-amber-200">RETRO FILM FILTER:</span>
              <span className="text-amber-400 font-bold uppercase">{activeFilterObj.label}</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {VINTAGE_FILTERS.map((f) => {
                const isCurrent = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      soundEngine.playClickTone();
                      setActiveFilter(f.id);
                    }}
                    className={`py-1.5 px-1 rounded-xl cursor-pointer text-center transition-all border ${
                      isCurrent
                        ? 'bg-amber-500 text-neutral-950 font-black border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.6)] scale-102'
                        : 'bg-neutral-800/90 text-neutral-300 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] sm:text-xs font-mono truncate font-bold">
                      {f.label.replace(' ★', '')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    case '2011': {
      return (
        <div className="w-full h-[470px] sm:h-[485px] rounded-3xl bg-neutral-900/95 border border-cyan-500/40 p-4 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
          {/* Explore Search Header */}
          <div className="p-2.5 bg-neutral-950 rounded-2xl border border-white/10 flex items-center space-x-2 text-xs font-mono text-neutral-300">
            <Search className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-cyan-300 font-bold">{activeHashtag}</span>
            <span className="text-xs text-neutral-500 ml-auto">2.4M posts</span>
          </div>

          {/* Interactive Hashtag Tags */}
          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
            {['#urbanphotography', '#wanderlust', '#sunset', '#streetstyle', '#vintage'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  soundEngine.playClickTone();
                  setActiveHashtag(tag);
                }}
                className={`px-2.5 py-1 rounded-xl border transition-all cursor-pointer ${
                  activeHashtag === tag
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500/60 font-bold scale-102 shadow-md'
                    : 'bg-neutral-850 text-neutral-400 border-white/10 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* High-Res Discovery Grid */}
          <div className="grid grid-cols-2 gap-2.5 flex-1 my-1">
            <div className="rounded-2xl relative overflow-hidden group shadow-md border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80"
                alt="Tokyo Neon"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-2.5 flex flex-col justify-between text-left">
                <span className="text-[10px] text-cyan-300 font-bold bg-black/60 px-2 py-0.5 rounded-full w-fit">
                  FEATURED
                </span>
                <div>
                  <div className="font-bold text-xs text-white">Tokyo Neon Rain</div>
                  <div className="text-[10px] text-cyan-200">❤️ 28.4K likes</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl relative overflow-hidden group shadow-md border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
                alt="Alpine Peak"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-2.5 flex flex-col justify-between text-left">
                <span className="text-[10px] text-teal-300 font-bold bg-black/60 px-2 py-0.5 rounded-full w-fit">
                  MATCH
                </span>
                <div>
                  <div className="font-bold text-xs text-white">Alpine Sunset 35mm</div>
                  <div className="text-[10px] text-teal-200">❤️ 41.2K likes</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs font-mono text-neutral-400 text-center border-t border-white/10 pt-2">
            Infinite personalized rabbit hole with zero end point 🧭
          </div>
        </div>
      );
    }

    case '2012': {
      return (
        <div className="w-full h-[470px] sm:h-[485px] rounded-3xl bg-neutral-900/95 border border-blue-500/40 p-4 flex flex-col justify-between shadow-2xl text-left backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-2">
            <span className="text-blue-400 font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>THE $1 BILLION HEIST</span>
            </span>
            <span className="text-emerald-400 font-bold">April 9, 2012</span>
          </div>

          {/* Interactive Android Download Surge */}
          <div className="p-4 bg-neutral-950 rounded-2xl border border-white/10 space-y-2.5 my-auto">
            <div className="text-xs font-mono text-emerald-400 font-bold flex items-center justify-between">
              <span>Google Play Android Installs</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-black">
                {androidDownloadSpeed.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-neutral-800 h-3 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: ['40%', '98%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full rounded-full"
              />
            </div>
            <button
              onClick={() => {
                soundEngine.playClickTone();
                setAndroidDownloadSpeed((prev) => prev + 500000);
              }}
              className="w-full py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-900/80 cursor-pointer transition-colors shadow-md"
            >
              + Surge 500k Installs (Tap to simulate)
            </button>
          </div>

          {/* Acquisition Valuation Certificate */}
          <div className="p-4 bg-gradient-to-r from-blue-950 via-indigo-950 to-neutral-950 rounded-2xl border border-blue-500/40 space-y-1.5">
            <div className="text-amber-300 font-black text-base sm:text-lg font-mono">
              $1,000,000,000 Acquisition
            </div>
            <p className="text-xs text-neutral-300 font-sans font-medium leading-relaxed">
              13 employees, $0 revenue. Mark Zuckerberg acquired Instagram to eliminate the only existential threat to Facebook's mobile dominance.
            </p>
          </div>
        </div>
      );
    }

    case '2013': {
      return (
        <div className="w-full h-[470px] sm:h-[485px] rounded-3xl bg-neutral-900/95 border border-pink-500/40 p-4 flex flex-col justify-between shadow-2xl text-left backdrop-blur-xl">
          {/* Direct Chat Header */}
          <div className="flex items-center justify-between text-xs font-mono text-neutral-300 border-b border-white/10 pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                S
              </div>
              <span className="font-bold text-white">@sarah_friend</span>
            </div>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Direct Active</span>
            </span>
          </div>

          {/* Interactive Chat Stream */}
          <div className="space-y-2 flex-1 flex flex-col justify-between my-2">
            <div className="space-y-2 text-xs font-mono">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-2xl text-xs ${
                    idx % 2 === 0
                      ? 'bg-neutral-800 text-neutral-200 rounded-tl-none max-w-[85%]'
                      : 'bg-pink-950/80 border border-pink-500/30 text-pink-200 ml-auto max-w-[85%] text-right'
                  }`}
                >
                  {msg}
                </div>
              ))}
            </div>

            {/* Playable 15-Sec Video Clip */}
            <div
              onClick={() => {
                soundEngine.playClickTone();
                setIsPlaying15sVideo(!isPlaying15sVideo);
              }}
              className="p-3 bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl text-white space-y-1.5 border border-pink-500/40 cursor-pointer hover:border-pink-300 transition-colors shadow-lg"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 font-bold">
                  {isPlaying15sVideo ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  15-Sec Video Player
                </span>
                <span className="text-pink-300 font-bold">{isPlaying15sVideo ? 'Playing • 0:11' : 'Paused'}</span>
              </div>
              <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                <div className={`bg-pink-400 h-full rounded-full ${isPlaying15sVideo ? 'w-[75%] animate-pulse' : 'w-[40%]'}`} />
              </div>
            </div>

            {/* Send Message Input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={chatMessageInput}
                onChange={(e) => setChatMessageInput(e.target.value)}
                placeholder="Send private message..."
                className="flex-1 bg-black/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500 font-mono"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && chatMessageInput.trim()) {
                    setChatMessages([...chatMessages, chatMessageInput.trim()]);
                    setChatMessageInput('');
                    soundEngine.playNotificationPing();
                  }
                }}
              />
              <button
                onClick={() => {
                  if (chatMessageInput.trim()) {
                    setChatMessages([...chatMessages, chatMessageInput.trim()]);
                    setChatMessageInput('');
                    soundEngine.playNotificationPing();
                  }
                }}
                className="p-2 rounded-xl bg-pink-600 text-white hover:bg-pink-500 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    case '2015': {
      return (
        <div className="w-full h-[470px] sm:h-[485px] rounded-3xl bg-neutral-900/95 border border-amber-500/40 p-4 flex flex-col justify-between shadow-2xl text-left backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-300 border-b border-white/10 pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-xs font-bold text-black">
                N
              </div>
              <span className="font-bold text-white">Nike Sportswear</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 text-xs font-bold">
              Sponsored
            </span>
          </div>

          {/* Shoppable Product Display */}
          <div className="flex-1 rounded-2xl bg-gradient-to-tr from-neutral-800 via-neutral-900 to-amber-950 p-4 flex flex-col justify-between border border-white/10 relative overflow-hidden shadow-lg my-2">
            <div className="text-xs font-mono text-neutral-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Nike Air Retro • $159.00</span>
              </span>
              <span className="text-amber-400 font-bold">★★★★★ (4.9)</span>
            </div>

            {/* Interactive Product Tag */}
            <div className="flex justify-center my-3">
              <button
                onClick={() => {
                  soundEngine.playClickTone();
                  setProductInspected(!productInspected);
                }}
                className="px-3.5 py-1.5 rounded-full bg-black/80 border border-amber-400 text-white font-mono text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer flex items-center space-x-1.5"
              >
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>{productInspected ? '✓ Tag Inspected: In Stock' : 'Tap Tag: Nike Air Retro ($159)'}</span>
              </button>
            </div>

            {/* 1-Click CTA */}
            <button
              onClick={() => soundEngine.playNotificationPing()}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black font-mono text-xs rounded-xl shadow-xl flex items-center justify-center space-x-1.5 cursor-pointer hover:scale-102 active:scale-98 transition-transform"
            >
              <span>Shop Now (1-Click Buy)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs font-mono text-neutral-400 text-center border-t border-white/10 pt-2">
            Aesthetic inspiration instantly converted into commerce 💳
          </div>
        </div>
      );
    }

    case '2016': {
      return (
        <div className="w-full h-[470px] sm:h-[485px] rounded-3xl bg-neutral-900/95 border border-pink-500/40 p-4 flex flex-col justify-between shadow-2xl text-left backdrop-blur-xl">
          {/* Stories Avatar Ring Tray */}
          <div className="flex items-center space-x-3 border-b border-white/10 pb-2 overflow-x-auto">
            {['You', '@alex', '@creator', '@dj_live'].map((u, i) => (
              <button
                key={u}
                onClick={() => {
                  soundEngine.playClickTone();
                  setCurrentStoryIndex(i);
                }}
                className="flex flex-col items-center space-y-0.5 shrink-0 cursor-pointer"
              >
                <div className={`p-0.5 rounded-full ${currentStoryIndex === i ? 'bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 scale-105' : 'bg-neutral-800'}`}>
                  <div className="w-8 h-8 rounded-full bg-neutral-900 border-2 border-black flex items-center justify-center text-[10px] font-bold text-white">
                    {u[1] || 'U'}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-neutral-300 font-bold">{u}</span>
              </button>
            ))}
          </div>

          {/* Ephemeral Story Screen */}
          <div className="flex-1 rounded-2xl bg-gradient-to-b from-purple-950 via-pink-950 to-neutral-950 p-4 space-y-3 border border-pink-500/30 shadow-lg flex flex-col justify-between my-2">
            <div className="flex items-center justify-between text-xs font-mono text-pink-300 font-bold">
              <span>⚡ 24H EPHEMERAL FOMO</span>
              <span className="text-amber-300 bg-black/40 px-2 py-0.5 rounded">Expires in 2h</span>
            </div>

            {/* Interactive Poll Sticker */}
            <div className="p-3 bg-black/60 rounded-2xl border border-white/15 text-center space-y-2">
              <div className="text-xs font-mono text-white font-bold">
                Did you check Instagram first thing this morning?
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  onClick={() => {
                    soundEngine.playClickTone();
                    setPollVote('yes');
                  }}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    pollVote === 'yes' ? 'bg-pink-500 text-white scale-102 ring-1 ring-white shadow-md' : 'bg-pink-600/70 text-white hover:bg-pink-600'
                  }`}
                >
                  YES ({pollVote === 'yes' ? '92%' : '88%'})
                </button>
                <button
                  onClick={() => {
                    soundEngine.playClickTone();
                    setPollVote('no');
                  }}
                  className={`p-2 rounded-xl cursor-pointer transition-all ${
                    pollVote === 'no' ? 'bg-neutral-700 text-white scale-102 ring-1 ring-white shadow-md' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-750'
                  }`}
                >
                  NO ({pollVote === 'no' ? '12%' : '12%'})
                </button>
              </div>
            </div>

            <div className="text-xs font-mono text-neutral-400 text-center">
              Weaponized FOMO: 500 million daily morning logins ⏰
            </div>
          </div>
        </div>
      );
    }

    case '2017-18': {
      return (
        <div className="w-full h-[470px] sm:h-[485px] rounded-3xl bg-neutral-900/95 border border-purple-500/40 p-4 flex flex-col justify-between shadow-2xl text-left backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-300 border-b border-white/10 pb-2">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-white">@travel_nomad</span>
              <span className="text-cyan-400 font-bold">✓</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 text-xs font-bold">
              Slide {carouselSlide} of 10
            </span>
          </div>

          {/* Carousel Slide Card */}
          <div className="flex-1 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-neutral-900 p-4 flex flex-col justify-between border border-white/10 relative shadow-lg my-2">
            <div className="flex justify-between items-center text-xs font-mono text-neutral-200">
              <span className="font-bold">10x Dwell Time Multiplier</span>
              <Repeat className="w-4 h-4 text-purple-400" />
            </div>

            <div className="text-center space-y-1 my-auto">
              <div className="text-lg font-black text-white font-sans">
                Post Photo #{carouselSlide}
              </div>
              <div className="text-xs text-purple-200 font-mono">
                Horizontal thumb swipes lock user dwell time
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  soundEngine.playClickTone();
                  setCarouselSlide((prev) => Math.max(1, prev - 1));
                }}
                className="p-1.5 rounded-xl bg-black/60 text-white hover:bg-black/90 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex justify-center space-x-1.5">
                {[1, 2, 3, 4, 5, 6, 7].map((dot) => (
                  <div
                    key={dot}
                    className={`h-1.5 rounded-full transition-all ${dot === carouselSlide ? 'w-6 bg-purple-400' : 'w-1.5 bg-white/30'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  soundEngine.playClickTone();
                  setCarouselSlide((prev) => Math.min(10, prev + 1));
                }}
                className="p-1.5 rounded-xl bg-black/60 text-white hover:bg-black/90 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-xs font-mono text-neutral-400 text-center border-t border-white/10 pt-2">
            Multiplied user thumb swipe duration by 10x 🔁
          </div>
        </div>
      );
    }

    case '2020': {
      return (
        <div className="w-full h-[470px] sm:h-[485px] rounded-3xl bg-neutral-950 border border-rose-500/50 p-3 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Reels Smartphone Frame */}
          <div className="flex-1 rounded-2xl bg-gradient-to-b from-purple-950 via-neutral-900 to-pink-950 p-4 relative flex flex-col justify-between border border-pink-500/30 shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono text-white">
              <div className="flex items-center space-x-1.5 font-black">
                <Film className="w-4 h-4 text-rose-400" />
                <span className="text-sm">Reels</span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-pink-950 border border-pink-500/50 text-pink-300 animate-pulse font-bold">
                140B DAILY PLAYS
              </span>
            </div>

            {/* Action Rail */}
            <div className="absolute right-3.5 bottom-6 flex flex-col items-center space-y-3 text-white text-xs font-mono z-10">
              <button
                onClick={() => {
                  soundEngine.playClickTone();
                  if (!hasLikedReels) {
                    setReelsLikesCount((prev) => prev + 1);
                    setHasLikedReels(true);
                  } else {
                    setReelsLikesCount((prev) => prev - 1);
                    setHasLikedReels(false);
                  }
                }}
                className="flex flex-col items-center cursor-pointer hover:scale-110 active:scale-90 transition-transform"
              >
                <div className={`p-2.5 rounded-full border border-white/10 ${hasLikedReels ? 'bg-rose-600' : 'bg-black/60'} shadow-lg`}>
                  <Heart className={`w-4 h-4 ${hasLikedReels ? 'text-white fill-white' : 'text-rose-500 fill-rose-500 animate-bounce'}`} />
                </div>
                <span className="text-[10px] mt-0.5 font-bold">{(reelsLikesCount / 1000000).toFixed(2)}M</span>
              </button>

              <div className="flex flex-col items-center">
                <div className="p-2.5 rounded-full bg-black/60 border border-white/10">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] mt-0.5 font-bold">42.8K</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="p-2.5 rounded-full bg-black/60 border border-white/10">
                  <Share2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] mt-0.5 font-bold">310K</span>
              </div>

              <div className="p-2 rounded-full bg-neutral-900 border border-white/20 animate-spin">
                <Music className="w-3.5 h-3.5 text-rose-400" />
              </div>
            </div>

            {/* Caption */}
            <div className="pr-14 text-left space-y-1">
              <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                <span>@viral_creator</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500 text-white font-bold">Follow</span>
              </div>
              <p className="text-xs text-neutral-200 font-sans line-clamp-2 font-medium">
                The algorithm hooks your attention within 3 seconds and never lets go 🔥 #viral #reels
              </p>
              <div className="flex items-center space-x-1.5 text-xs font-mono text-pink-300">
                <Music className="w-3 h-3" />
                <span className="truncate">Original Sound - Trending Audio</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case '2022-25':
    default: {
      return (
        <div className="w-full h-[470px] sm:h-[485px] rounded-3xl bg-neutral-900/95 border border-cyan-500/40 p-4 flex flex-col justify-between shadow-2xl text-left backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-2">
            <div className="flex items-center space-x-1.5 text-cyan-400 font-bold">
              <Zap className="w-4 h-4" />
              <span>Suggested for You (Neural Ranker)</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-bold">
              99.4% Match
            </span>
          </div>

          <div className="space-y-1.5 my-2">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">Simulate User Interest Graph:</span>
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {['Street Photography', 'Tech Hardware', 'Short Comedy', 'Deep Architecture'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    soundEngine.playClickTone();
                    setAiInterestTag(tag);
                  }}
                  className={`px-3 py-1 rounded-xl border transition-all cursor-pointer ${
                    aiInterestTag === tag
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold scale-102 shadow-md'
                      : 'bg-black/50 text-neutral-400 border-white/10 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-gradient-to-r from-purple-950/80 via-neutral-900 to-cyan-950/80 rounded-2xl border border-cyan-500/30 space-y-1.5 shadow-md">
            <div className="text-xs font-mono text-purple-300 flex items-center justify-between">
              <span>Dynamic AI Inference</span>
              <span className="text-cyan-300 font-bold">Active Prediction</span>
            </div>
            <p className="text-xs text-neutral-200 font-sans font-medium leading-relaxed">
              "Because you paused on 3 {aiInterestTag.toLowerCase()} clips, your feed is populated with unfollowed content to maximize session dwell time."
            </p>
          </div>

          <div className="p-2.5 bg-neutral-950 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>💬 Broadcast Channels (120k members)</span>
            <span className="text-cyan-400 font-bold">Threads Integration ↗</span>
          </div>
        </div>
      );
    }
  }
}

// =========================================================================
// HELPER: RENDER HABIT LOOP MOCKUPS (Trigger, Action, Reward, Investment)
// =========================================================================
function renderHabitMockup(stageIndex: number) {
  switch (stageIndex) {
    case 0: // Trigger
      return (
        <div className="w-full h-[380px] rounded-3xl bg-neutral-950 border border-amber-500/50 p-4 flex flex-col justify-between shadow-2xl text-left backdrop-blur-xl">
          <div className="text-xs font-mono text-neutral-400 flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold">LOCK SCREEN PUSH ALERT</span>
            <span className="text-amber-400 font-black">9:41 AM</span>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/90 border border-amber-500/30 backdrop-blur-md space-y-2 shadow-lg my-auto">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-white">
              <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-amber-500 to-pink-500 flex items-center justify-center text-[10px]">
                📸
              </div>
              <span>INSTAGRAM</span>
              <span className="text-xs text-neutral-500 ml-auto">now</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed">
              <strong>@alex_friend</strong> and 14 others liked your story. 2 new DMs waiting.
            </p>
            <div className="text-xs font-mono text-amber-400 font-bold">
              🔴 Involuntary impulse to tap & unlock phone
            </div>
          </div>

          <div className="text-[11px] font-mono text-neutral-500 text-center">
            Zero cognitive barrier: Red badges trigger biological alertness
          </div>
        </div>
      );

    case 1: // Action
      return (
        <div className="w-full h-[380px] rounded-3xl bg-neutral-950 border border-pink-500/50 p-4 flex flex-col justify-between shadow-2xl text-center backdrop-blur-xl">
          <div className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider border-b border-white/10 pb-2">
            Zero-Friction Swipe Action
          </div>
          <div className="p-5 bg-neutral-900/90 rounded-2xl border border-pink-500/30 flex flex-col items-center justify-center space-y-2 shadow-lg my-auto">
            <div className="w-12 h-12 rounded-full border-2 border-pink-500/60 flex items-center justify-center animate-spin">
              <Repeat className="w-6 h-6 text-pink-400" />
            </div>
            <div className="text-sm sm:text-base font-mono text-white font-black">Pull to Refresh Feed</div>
            <div className="text-xs text-neutral-400 font-mono">180ms biometric unlock & immediate load</div>
          </div>
          <div className="text-[11px] font-mono text-neutral-500">
            One thumb flick refreshes the global feed instantly
          </div>
        </div>
      );

    case 2: // Reward
      return (
        <div className="w-full h-[380px] rounded-3xl bg-neutral-950 border border-purple-500/50 p-4 flex flex-col justify-between shadow-2xl text-center backdrop-blur-xl">
          <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider border-b border-white/10 pb-2">
            Variable Dopamine Reward
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-950/70 via-pink-950/70 to-purple-950/70 rounded-2xl border border-purple-500/30 space-y-2 shadow-lg my-auto">
            <div className="flex justify-center space-x-3 text-rose-500">
              <Heart className="w-8 h-8 fill-rose-500 animate-bounce" />
              <Heart className="w-8 h-8 fill-rose-500 animate-pulse" />
              <Heart className="w-8 h-8 fill-rose-500 animate-bounce" />
            </div>
            <div className="text-base font-mono text-white font-black">+142 New Likes & Comments</div>
            <div className="text-xs font-mono text-neutral-300 font-medium">
              Unpredictable reward timing creates psychological addiction
            </div>
          </div>
          <div className="text-[11px] font-mono text-neutral-500">
            Variable schedules stimulate dopamine 300% more than fixed rewards
          </div>
        </div>
      );

    case 3: // Investment
    default:
      return (
        <div className="w-full h-[380px] rounded-3xl bg-neutral-950 border border-cyan-500/50 p-4 flex flex-col justify-between shadow-2xl text-left backdrop-blur-xl">
          <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider border-b border-white/10 pb-2">
            Irreversible Switching Cost
          </div>
          <div className="p-4 bg-neutral-900/90 rounded-2xl border border-cyan-500/30 space-y-2 shadow-lg my-auto">
            <div className="flex justify-between items-center text-xs font-mono text-white font-bold">
              <span>Your Profile Archive:</span>
              <span className="text-cyan-400 font-bold">10 Years</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
              <div className="p-2 bg-black/60 rounded-xl text-neutral-300">1,248<br /><span className="text-[10px] text-neutral-500">Posts</span></div>
              <div className="p-2 bg-black/60 rounded-xl text-neutral-300">18.4K<br /><span className="text-[10px] text-neutral-500">Followers</span></div>
              <div className="p-2 bg-black/60 rounded-xl text-neutral-300">5,400<br /><span className="text-[10px] text-neutral-500">DMs</span></div>
            </div>
            <div className="text-xs text-neutral-300 font-sans italic font-medium">
              "Leaving means destroying your decade-long social archive."
            </div>
          </div>
          <div className="text-[11px] font-mono text-neutral-500 text-center">
            Every photo uploaded permanently locks the user in
          </div>
        </div>
      );
  }
}
