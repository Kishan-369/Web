import React, { useState } from 'react';
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
  Film,
  Compass,
  DollarSign,
  UserPlus,
  ShieldAlert,
  ArrowRight,
  Check,
  ChevronRight,
  Flame,
  Award,
  Clock
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface PhaseData {
  year: string;
  title: string;
  subtitle: string;
  isTurningPoint?: boolean;
  features: {
    name: string;
    hook: string;
    icon: any;
  }[];
  psychologyInsight: string;
}

const EVOLUTION_PHASES: PhaseData[] = [
  {
    year: '2010',
    title: 'Launch — Instant Gratification',
    subtitle: 'Burbn pivot to 1-tap beautiful photo sharing',
    features: [
      { name: 'Filters', hook: 'Amateur phone photos instantly look professional — first dopamine reward.', icon: Sparkles },
      { name: 'Likes & Follows', hook: 'Social validation turned into a visible dopamine scoreboard.', icon: Heart },
      { name: 'Instant Feed', hook: 'Personalized stream unique to you, creating a daily return impulse.', icon: Smartphone },
    ],
    psychologyInsight: 'Stripped away cluttered check-in app "Burbn" complexity. Focused 100% on instant visual reward.',
  },
  {
    year: '2011',
    title: 'Discovery — Widen the Net',
    subtitle: 'Hashtags & Explore tab algorithm birth',
    features: [
      { name: 'Hashtags (#)', hook: 'Categorized human interests for endless hyper-niche rabbit holes.', icon: Compass },
      { name: 'Explore Tab', hook: 'Replaced chronological limits with algorithmic discovery.', icon: Zap },
    ],
    psychologyInsight: 'Transformed Instagram from a friend network into a global content discovery engine.',
  },
  {
    year: '2012',
    title: 'Scale — 10x the User Base',
    subtitle: 'Facebook Acquisition & Android Explosion',
    features: [
      { name: 'Android Release', hook: '1 Million downloads in 12 hours across the globe.', icon: Smartphone },
      { name: '$1 Billion Acquisition', hook: 'Facebook backed the platform with world-class engineering & data.', icon: Award },
    ],
    psychologyInsight: 'Leveraged scale to make Instagram the default mobile camera and photo identity for Gen Z.',
  },
  {
    year: '2013',
    title: 'Lock-In — Move Relationships Inside',
    subtitle: 'Direct Messages & Video Clips',
    features: [
      { name: 'Instagram Direct (DMs)', hook: 'Trapped private chats inside the app so users never needed SMS.', icon: MessageCircle },
      { name: '15-Sec Video', hook: 'Added motion and audio to double average time spent per session.', icon: Video },
    ],
    psychologyInsight: 'By shifting private social messaging inside, leaving Instagram meant losing touch with friends.',
  },
  {
    year: '2015',
    title: 'Monetise — Attention into Revenue',
    subtitle: 'Targeted In-Feed Ads & Shopping CTAs',
    isTurningPoint: true,
    features: [
      { name: 'Algorithmic Ads', hook: 'Native sponsored posts matched to exact user browsing habits.', icon: DollarSign },
      { name: 'Shop Now Buttons', hook: 'Turned visual inspiration directly into 1-click impulse purchases.', icon: Flame },
    ],
    psychologyInsight: '⭐ Turning Point: User attention was directly converted into targeted advertising dollars.',
  },
  {
    year: '2016',
    title: 'Stories — Defensive Masterstroke',
    subtitle: '24-Hour Ephemeral Content (Snapchat Rival)',
    isTurningPoint: true,
    features: [
      { name: '24h Stories Ring', hook: 'FOMO driven: Content disappears in 24h, compelling daily logins.', icon: Clock },
      { name: 'Story Stickers & Polls', hook: 'Interactive micro-actions that gather deep user preference data.', icon: Sparkles },
    ],
    psychologyInsight: '⭐ Turning Point: Weaponized Fear Of Missing Out to lock in morning & night browsing rituals.',
  },
  {
    year: '2017-18',
    title: 'Creator Economy — Keep Everyone Inside',
    subtitle: 'Carousels, IGTV & Influencer Ecosystem',
    features: [
      { name: '10-Photo Carousels', hook: 'Multiplied swipe engagement per post by 10x.', icon: Repeat },
      { name: 'Creator Shopping & IGTV', hook: 'Monetized influencers so creators never left for YouTube.', icon: UserPlus },
    ],
    psychologyInsight: 'Built an economic lock-in for creators, ensuring a continuous stream of fresh viral content.',
  },
  {
    year: '2020',
    title: 'Reels — Survive the TikTok War',
    subtitle: 'Full-Screen Algorithmic Short Video',
    isTurningPoint: true,
    features: [
      { name: 'Infinite Reels Scroll', hook: 'AI recommendation engine feeding endless 15s addictive clips.', icon: Film },
      { name: 'Audio Remixing', hook: 'Viral audio trends that turn viewers into active content producers.', icon: Play },
    ],
    psychologyInsight: '⭐ Turning Point: Shifted from social graph (friends) to AI interest graph (hypnotic scroll).',
  },
  {
    year: '2022-25',
    title: 'Attention Lock-In — Maximise Everything',
    subtitle: 'AI Recommendations, Threads & Channels',
    features: [
      { name: 'Suggested Feed AI', hook: 'Unfollowed AI recommended posts fill over 50% of the feed.', icon: Zap },
      { name: 'Broadcast Channels & Threads', hook: 'Captured text & community chats into one Meta ecosystem.', icon: MessageCircle },
    ],
    psychologyInsight: 'Complete psychological lock-in: Algorithms curate 100% of human focus for maximum ad delivery.',
  },
];

const HOOK_STAGES = [
  {
    stage: 'STAGE 1',
    name: 'Trigger',
    sub: 'The Bait',
    desc: 'Push notifications ("X liked your photo", "3 new followers", red badge) pull you back involuntarily before you decide.',
    icon: Bell,
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/50',
    textColor: 'text-amber-400',
  },
  {
    stage: 'STAGE 2',
    name: 'Action',
    sub: 'The Scroll',
    desc: 'One thumb swipe opens the app & pulls down the feed — zero friction, 200ms biometric unlock.',
    icon: Smartphone,
    color: 'from-pink-600 to-rose-600',
    borderColor: 'border-pink-500/50',
    textColor: 'text-pink-400',
  },
  {
    stage: 'STAGE 3',
    name: 'Reward',
    sub: 'Dopamine Hit',
    desc: 'Variable rewards: Instant likes, unexpected viral Reels, comments, and high-contrast visuals.',
    icon: Heart,
    color: 'from-purple-600 to-indigo-600',
    borderColor: 'border-purple-500/50',
    textColor: 'text-purple-400',
  },
  {
    stage: 'STAGE 4',
    name: 'Investment',
    sub: 'Lock-In Data',
    desc: 'Posting a photo, sending DMs, tagging friends & building followers makes leaving impossible.',
    icon: Repeat,
    color: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-500/50',
    textColor: 'text-cyan-400',
  },
];

export const InstagramEvolutionScene: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2010');
  const [selectedHookStage, setSelectedHookStage] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'timeline' | 'hookLoop' | 'burbnOrigin'>('timeline');

  const activePhase = EVOLUTION_PHASES.find((p) => p.year === selectedYear) || EVOLUTION_PHASES[0];

  const handleYearSelect = (year: string) => {
    soundEngine.playClickTone();
    setSelectedYear(year);
  };

  const handleHookStageSelect = (idx: number) => {
    soundEngine.playClickTone();
    setSelectedHookStage(idx);
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between py-5 px-4 snap-start snap-always shrink-0 overflow-hidden">
      {/* Background Instagram Gradient Radial Glow */}
      <div className="absolute inset-0 bg-radial from-purple-950/25 via-pink-950/10 to-black opacity-90 pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-1 pt-1">
        <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-pink-400 bg-gradient-to-r from-purple-950/80 via-pink-950/80 to-amber-950/80 border border-pink-500/40 px-3.5 py-1 rounded-full backdrop-blur-md shadow-lg">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>PITCH NARRATIVE • THE INSTAGRAM TRAP ENGINE</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-sans">
          How Every Feature Was Engineered To Glue Users In
        </h2>

        {/* View Mode Selector Tabs */}
        <div className="flex items-center justify-center space-x-1.5 pt-1 text-[11px] font-mono">
          <button
            onClick={() => { soundEngine.playClickTone(); setViewMode('timeline'); }}
            className={`px-3 py-1 rounded-xl transition-all border ${
              viewMode === 'timeline'
                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-extrabold border-pink-400/80 shadow-lg'
                : 'bg-neutral-900/80 text-neutral-400 border-white/10 hover:text-white'
            }`}
          >
            Year-by-Year Evolution (2010–2025)
          </button>

          <button
            onClick={() => { soundEngine.playClickTone(); setViewMode('hookLoop'); }}
            className={`px-3 py-1 rounded-xl transition-all border ${
              viewMode === 'hookLoop'
                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-extrabold border-pink-400/80 shadow-lg'
                : 'bg-neutral-900/80 text-neutral-400 border-white/10 hover:text-white'
            }`}
          >
            The 4-Stage Habit Loop
          </button>

          <button
            onClick={() => { soundEngine.playClickTone(); setViewMode('burbnOrigin'); }}
            className={`px-3 py-1 rounded-xl transition-all border ${
              viewMode === 'burbnOrigin'
                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-extrabold border-pink-400/80 shadow-lg'
                : 'bg-neutral-900/80 text-neutral-400 border-white/10 hover:text-white'
            }`}
          >
            Burbn vs Instagram (2010 Origin)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-4xl w-full mx-auto my-auto py-2">
        {/* VIEW 1: Year-by-Year Evolution Timeline */}
        {viewMode === 'timeline' && (
          <div className="space-y-3">
            {/* Horizontal Timeline Scroller */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full px-1">
              {EVOLUTION_PHASES.map((phase) => {
                const isSelected = selectedYear === phase.year;
                return (
                  <button
                    key={phase.year}
                    onClick={() => handleYearSelect(phase.year)}
                    className={`shrink-0 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center space-x-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 text-white font-extrabold border-amber-400 shadow-xl scale-105'
                        : 'bg-neutral-950/80 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-900'
                    }`}
                  >
                    <span>{phase.year}</span>
                    {phase.isTurningPoint && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Phase Display Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase.year}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="apple-card p-4 sm:p-5 rounded-3xl border border-pink-500/40 bg-neutral-950/95 space-y-3 shadow-2xl backdrop-blur-md"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-2 gap-2">
                  <div className="text-left">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-black text-amber-400 bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                        PHASE {activePhase.year}
                      </span>
                      {activePhase.isTurningPoint && (
                        <span className="text-[10px] font-mono text-pink-400 bg-pink-950/80 border border-pink-500/40 px-2 py-0.5 rounded-full">
                          ⭐ TURNING POINT
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-2xl font-black text-white font-sans mt-1">
                      {activePhase.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono">{activePhase.subtitle}</p>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                  {activePhase.features.map((feat, idx) => {
                    const IconComp = feat.icon;
                    return (
                      <div
                        key={idx}
                        className="p-3 bg-neutral-900/90 rounded-2xl border border-white/5 space-y-1 text-left"
                      >
                        <div className="flex items-center space-x-2 text-xs font-extrabold text-pink-400 font-mono">
                          <div className="p-1.5 rounded-lg bg-pink-950/80 border border-pink-500/30">
                            <IconComp className="w-3.5 h-3.5 text-pink-400" />
                          </div>
                          <span>{feat.name}</span>
                        </div>
                        <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                          {feat.hook}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Psychological Insight Box */}
                <div className="p-3 bg-gradient-to-r from-purple-950/60 via-pink-950/60 to-neutral-950 rounded-2xl border border-purple-500/30 text-left space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Psychological Trap Insight</span>
                  </div>
                  <p className="text-xs text-neutral-200 font-sans italic">
                    "{activePhase.psychologyInsight}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* VIEW 2: The 4-Stage Habit Loop */}
        {viewMode === 'hookLoop' && (
          <div className="space-y-3">
            <div className="text-xs font-mono text-neutral-400 text-center">
              Every single feature introduced by Instagram feeds this repeating psychological loop:
            </div>

            {/* 4 Loop Buttons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {HOOK_STAGES.map((stg, idx) => {
                const isSelected = selectedHookStage === idx;
                const IconC = stg.icon;

                return (
                  <button
                    key={stg.stage}
                    onClick={() => handleHookStageSelect(idx)}
                    className={`p-3 rounded-2xl border transition-all text-left space-y-1 ${
                      isSelected
                        ? `bg-neutral-900/95 ${stg.borderColor} shadow-xl scale-[1.02]`
                        : 'bg-neutral-950/60 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold ${stg.textColor}`}>
                        {stg.stage}
                      </span>
                      <IconC className={`w-3.5 h-3.5 ${stg.textColor}`} />
                    </div>
                    <div className="text-sm font-black text-white">{stg.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{stg.sub}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Callout Card */}
            <div className={`apple-card p-4 sm:p-5 rounded-3xl border ${HOOK_STAGES[selectedHookStage].borderColor} bg-neutral-950/95 space-y-2 text-left`}>
              <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
                <span className={`text-xs font-mono font-bold ${HOOK_STAGES[selectedHookStage].textColor}`}>
                  {HOOK_STAGES[selectedHookStage].stage} • {HOOK_STAGES[selectedHookStage].name.toUpperCase()} ({HOOK_STAGES[selectedHookStage].sub})
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed pt-1">
                {HOOK_STAGES[selectedHookStage].desc}
              </p>

              <div className="p-2.5 bg-neutral-900/90 rounded-xl border border-white/5 text-[11px] font-mono text-neutral-300 flex items-center justify-between">
                <span>Loop Result: <strong className="text-amber-400">Automatic Habit Formation</strong></span>
                <span className="text-neutral-500">Repeats 50+ times/day</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: Burbn vs Instagram Origin (2010 Insight) */}
        {viewMode === 'burbnOrigin' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {/* Before 2010: Burbn */}
            <div className="apple-card p-4 rounded-3xl border border-red-500/40 bg-neutral-950/90 space-y-2.5">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono font-black text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-500/40">
                  BEFORE • 2010
                </span>
                <span className="text-xs font-black text-white">Burbn</span>
              </div>

              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Kevin Systrom & Mike Krieger's first app: check-ins, plans, gaming, and photos all crammed together. Too complex — nobody understood or stuck around.
              </p>

              <div className="p-2 bg-red-950/40 border border-red-500/20 rounded-xl text-[11px] font-mono text-red-300">
                ❌ High Friction & Cognitive Overload
              </div>
            </div>

            {/* After Oct 6, 2010: Instagram */}
            <div className="apple-card p-4 rounded-3xl border border-emerald-500/40 bg-neutral-950/90 space-y-2.5">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                  AFTER • OCT 6, 2010
                </span>
                <span className="text-xs font-black text-white">Instagram</span>
              </div>

              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Stripped everything except photo sharing, added filters to make phone photos look beautiful, and made posting instant. <strong className="text-emerald-400 font-mono">25,000 users on day one.</strong>
              </p>

              <div className="p-2 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-[11px] font-mono text-emerald-300">
                ✅ Instant Gratification & Zero Friction
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pitch Thesis Box */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-600/30 via-pink-600/30 to-purple-600/30 border border-pink-500/40 text-center space-y-0.5 shadow-xl backdrop-blur-md">
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
            THE PITCH THESIS
          </div>
          <p className="text-xs text-neutral-100 font-sans font-medium italic">
            "Instagram won not by inventing features, but by studying human psychology — each phase added a new hook that made staying more rewarding and leaving harder. Attention in, money out."
          </p>
        </div>
      </div>
    </section>
  );
};
