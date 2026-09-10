import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Flame,
  ThumbsDown,
  ThumbsUp,
  Eye,
  TrendingUp,
  Brain,
  Zap,
  Users,
  Award,
  BookOpen,
  TrendingDown,
  Sparkles,
  AlertTriangle,
  Play,
  Share2
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface VideoMetric {
  type: 'educational' | 'brainrot';
  tag: string;
  title: string;
  channel: string;
  views: string;
  likes: string;
  watchTime: string;
  algoBoost: string;
  thumbnailEmoji: string;
  thumbnailBg: string;
  borderColor: string;
  retention: string;
  impactNote: string;
}

const COMPARISON_VIDEOS: VideoMetric[] = [
  {
    type: 'educational',
    tag: 'EDUCATIONAL & SKILL BUILDING',
    title: 'Complete Full-Stack Engineering & AI Systems Deep Dive (Free 10-Hour Masterclass)',
    channel: '@IndiaTechAcademy',
    views: '142K Views',
    likes: '8.4K Likes',
    watchTime: '1m 45s Avg',
    algoBoost: 'Low Algorithm Boost (1.2x)',
    thumbnailEmoji: '💻',
    thumbnailBg: 'from-blue-900 to-indigo-950',
    borderColor: 'border-blue-500/40',
    retention: 'Low Initial Dopamine • Requires Focus',
    impactNote: 'Builds real national human capital, critical thinking & technological independence.',
  },
  {
    type: 'brainrot',
    tag: 'VIRAL BRAINROT & OUTRAGE BAIT',
    title: 'INSANE PRANK ON DELHI METRO!! (POLICE CALLED 😱💥) SHOCKING INFLUENCER FIGHT',
    channel: '@Viral_Delhi_Bros',
    views: '64.8M Views',
    likes: '4.2M Likes',
    watchTime: '18m 20s Avg',
    algoBoost: 'HYPER ALGORITHM BOOST (85x)',
    thumbnailEmoji: '🚨',
    thumbnailBg: 'from-red-900 via-amber-900 to-red-950',
    borderColor: 'border-red-500/60',
    retention: 'Extreme Shock Value • Auto-Looping',
    impactNote: 'Fragmented attention spans, zero skill value, drains thousands of productive youth hours.',
  },
  {
    type: 'educational',
    tag: 'SCIENTIFIC & RESEARCH SKILLS',
    title: 'Quantum Physics & Semiconductor Manufacturing in India — National Research Series',
    channel: '@IndianScienceJournal',
    views: '88K Views',
    likes: '5.1K Likes',
    watchTime: '2m 10s Avg',
    algoBoost: 'Suppressed by Feed Algorithms',
    thumbnailEmoji: '🔬',
    thumbnailBg: 'from-teal-900 to-cyan-950',
    borderColor: 'border-teal-500/40',
    retention: 'High Value • Demands Mental Effort',
    impactNote: 'Crucial for R&D and manufacturing self-reliance.',
  },
  {
    type: 'brainrot',
    tag: 'SENSATIONALIST CELEBRITY DRAMA',
    title: 'HE SAID WHAT?! LEAKED AUDIOS OF TOP CREATORS ROASTING EACH OTHER 😱🔥 #STORYTIME',
    channel: '@Gossip_Central_IN',
    views: '82.5M Views',
    likes: '6.8M Likes',
    watchTime: '24m 10s Avg',
    algoBoost: 'MAXIMUM VIRAL DISTRIBUTION (120x)',
    thumbnailEmoji: '🔥',
    thumbnailBg: 'from-pink-900 via-purple-900 to-red-950',
    borderColor: 'border-pink-500/60',
    retention: 'Manufactured Anger • High Comment Rage',
    impactNote: 'Generates tribal outrage, polarizes youth, maximizes ad revenue for platforms.',
  },
];

export const IndiaYouthImpactScene: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'educational' | 'brainrot'>('all');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(1); // default to brainrot showcase

  const filteredVideos = activeCategory === 'all'
    ? COMPARISON_VIDEOS
    : COMPARISON_VIDEOS.filter((v) => v.type === activeCategory);

  const activeVideo = COMPARISON_VIDEOS[selectedVideoIndex] || COMPARISON_VIDEOS[1];

  const handleSelectCategory = (cat: 'all' | 'educational' | 'brainrot') => {
    soundEngine.playClickTone();
    setActiveCategory(cat);
  };

  const handleSelectVideo = (idx: number) => {
    soundEngine.playClickTone();
    setSelectedVideoIndex(idx);
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between py-5 px-4 snap-start snap-always shrink-0 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial from-red-950/25 via-amber-950/10 to-black opacity-90 pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-1 pt-1">
        <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-500/40 px-3.5 py-1 rounded-full backdrop-blur-md shadow-lg">
          <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>DEMOGRAPHIC THREAT • WHY INDIA’S YOUTH IS MOST TARGETED</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-sans">
          Algorithmic Suppression of India’s Growth Engine
        </h2>

        <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-xl mx-auto">
          With <strong className="text-amber-400 font-mono">65% of its population under 35</strong>, India is the prime target for engagement algorithms that reward sensationalist "brainrot" over constructive education.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="relative z-10 max-w-4xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-4 items-center py-1">
        {/* Left Column: Feed Comparison Breakdown */}
        <div className="lg:col-span-7 space-y-2.5 text-left">
          {/* Category Filter Bar */}
          <div className="flex items-center justify-between bg-neutral-950/90 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
            <span className="text-[11px] font-mono font-bold text-neutral-300 flex items-center gap-1.5 pl-2">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Algorithm View Disparity</span>
            </span>

            <div className="flex items-center space-x-1 text-[10px] font-mono">
              <button
                onClick={() => handleSelectCategory('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeCategory === 'all'
                    ? 'bg-amber-500 text-black font-extrabold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                All (4)
              </button>
              <button
                onClick={() => handleSelectCategory('educational')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeCategory === 'educational'
                    ? 'bg-blue-500 text-white font-extrabold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Good Videos
              </button>
              <button
                onClick={() => handleSelectCategory('brainrot')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeCategory === 'brainrot'
                    ? 'bg-red-600 text-white font-extrabold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Viral Brainrot
              </button>
            </div>
          </div>

          {/* Videos List Cards */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-none">
            {filteredVideos.map((video, idx) => {
              const realIndex = COMPARISON_VIDEOS.findIndex((v) => v.title === video.title);
              const isSelected = selectedVideoIndex === realIndex;
              const isBrainrot = video.type === 'brainrot';

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectVideo(realIndex)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? `bg-neutral-900/95 ${video.borderColor} shadow-xl scale-[1.01]`
                      : 'bg-neutral-950/70 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{video.thumbnailEmoji}</span>
                      <div>
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                          isBrainrot
                            ? 'bg-red-950/80 text-red-400 border-red-500/40'
                            : 'bg-blue-950/80 text-blue-400 border-blue-500/40'
                        }`}>
                          {video.tag}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-mono shrink-0">
                      <span className={`text-sm font-black ${isBrainrot ? 'text-red-500' : 'text-blue-400'}`}>
                        {video.views}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-white font-sans line-clamp-1 text-left">
                    {video.title}
                  </h4>

                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-1">
                    <span>{video.channel}</span>
                    <span className="text-amber-400 font-bold">{video.algoBoost}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: High Impact Video Screenshot Mockup & Analytical Breakdown */}
        <div className="lg:col-span-5">
          <div className={`apple-card p-4 rounded-3xl border ${activeVideo.borderColor} bg-neutral-950/95 space-y-3 shadow-2xl relative overflow-hidden backdrop-blur-md text-left`}>
            {/* Simulated Video Player Header */}
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${activeVideo.thumbnailBg} border border-white/10 space-y-2 relative overflow-hidden`}>
              <div className="flex items-center justify-between text-[10px] font-mono text-white/80">
                <span className="bg-black/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Play className="w-3 h-3 text-red-500 fill-current" />
                  <span>SIMULATED FEED SCREENSHOT</span>
                </span>
                <span className="font-bold text-amber-300">{activeVideo.watchTime}</span>
              </div>

              <div className="py-2 text-center">
                <span className="text-4xl animate-bounce inline-block">{activeVideo.thumbnailEmoji}</span>
              </div>

              <h3 className="text-xs font-black text-white font-sans leading-tight line-clamp-2">
                "{activeVideo.title}"
              </h3>

              {/* Engagement Bar */}
              <div className="flex items-center justify-between text-[11px] font-mono text-white pt-1 border-t border-white/10">
                <span className="font-extrabold text-amber-400">{activeVideo.views}</span>
                <span>{activeVideo.likes}</span>
                <span className="text-cyan-300 font-bold">100% Boosted</span>
              </div>
            </div>

            {/* Cognitive Impact Analysis */}
            <div className="space-y-2 text-xs font-sans">
              <div className="p-2.5 bg-neutral-900/90 rounded-xl border border-white/5 space-y-1">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Brain className="w-3.5 h-3.5 text-amber-400" />
                  <span>Why The Algorithm Favors It</span>
                </div>
                <p className="text-neutral-300 font-sans text-xs">
                  {activeVideo.retention}
                </p>
              </div>

              <div className="p-2.5 bg-neutral-900/90 rounded-xl border border-white/5 space-y-1">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>Impact on India’s Youth Growth</span>
                </div>
                <p className="text-neutral-300 font-sans text-xs">
                  {activeVideo.impactNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* National Youth Demographic Callout Footer */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="p-2.5 rounded-2xl bg-neutral-950/90 border border-amber-500/30 text-center flex flex-wrap items-center justify-around gap-2 text-xs font-mono shadow-xl backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>65% India Population &lt; 35 Yrs</span>
          </span>
          <span className="text-neutral-500">|</span>
          <span className="flex items-center gap-1.5 text-red-400 font-bold">
            <TrendingDown className="w-3.5 h-3.5 text-red-400" />
            <span>Attention Spans Decreased to 8.2s</span>
          </span>
          <span className="text-neutral-500">|</span>
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Solution: High-Intent Digital Literacy</span>
          </span>
        </div>
      </div>
    </section>
  );
};
