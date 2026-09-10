import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Clock, Users, Sparkles, TrendingUp, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export const InstagramLogo = ({ className = "w-7 h-7" }: { className?: string }) => (
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

export const YouTubeLogo = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#FF0000" />
    <path d="M9.8 8.5L15.5 12L9.8 15.5V8.5Z" fill="white" />
  </svg>
);

export const FacebookLogo = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path d="M14 12.5H12.2V18H9.8V12.5H8.5V10.3H9.8V8.8C9.8 7.3 10.6 6 12.8 6C13.7 6 14.4 6.1 14.4 6.1V8.2H13.5C12.7 8.2 12.2 8.6 12.2 9.3V10.3H14.4L14 12.5Z" fill="white" />
  </svg>
);

export const WhatsAppLogo = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#25D366" />
    <path d="M12 4C7.58 4 4 7.58 4 12C4 13.52 4.42 14.94 5.16 16.16L4 20L7.96 18.88C9.14 19.58 10.52 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM15.82 14.88C15.6 15.5 14.54 16.02 14.02 16.08C13.52 16.14 12.88 16.18 10.72 15.28C8.18 14.22 6.54 11.64 6.42 11.48C6.3 11.32 5.4 10.12 5.4 8.88C5.4 7.64 6.04 7.04 6.28 6.78C6.52 6.52 6.8 6.46 7.02 6.46C7.24 6.46 7.42 6.46 7.58 6.48C7.76 6.5 7.92 6.44 8.08 6.84C8.26 7.28 8.7 8.36 8.76 8.48C8.82 8.6 8.86 8.74 8.78 8.9C8.7 9.06 8.64 9.16 8.52 9.3C8.4 9.44 8.26 9.62 8.16 9.72C8.04 9.84 7.92 9.98 8.06 10.22C8.2 10.46 8.68 11.24 9.38 11.86C10.28 12.66 11.02 12.92 11.26 13.04C11.5 13.16 11.64 13.14 11.78 12.98C11.92 12.82 12.38 12.28 12.54 12.06C12.7 11.84 12.86 11.88 13.08 11.96C13.3 12.04 14.48 12.62 14.72 12.74C14.96 12.86 15.12 12.92 15.18 13.02C15.24 13.12 15.24 13.62 15.02 14.24" fill="white" />
  </svg>
);

interface PlatformWorldData {
  id: string;
  name: string;
  totalGlobalUsers: string;
  totalUsersNum: string;
  monthlyHoursPerUser: string;
  dailyActive: string;
  category: string;
  logo: React.FC<{ className?: string }>;
  accentColor: string;
  borderColor: string;
  badge: string;
  topCountries: string[];
  keyGlobalFact: string;
  mapPulseColor: string;
}

const WORLD_PLATFORMS: PlatformWorldData[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    totalGlobalUsers: '2.40 Billion',
    totalUsersNum: '2,400,000,000 Global Users',
    monthlyHoursPerUser: '33.1 Hrs / Month',
    dailyActive: '1.4 Billion Daily',
    category: 'Visual Media, Reels & Stories',
    logo: InstagramLogo,
    accentColor: 'from-pink-500 via-purple-500 to-amber-500',
    borderColor: 'border-pink-500/50',
    badge: '#1 Visual Media',
    topCountries: ['India (385M)', 'USA (160M)', 'Brazil (135M)', 'Indonesia (100M)'],
    keyGlobalFact: 'Over 500 Million users create or watch Stories daily across 190+ countries.',
    mapPulseColor: '#ec4899',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    totalGlobalUsers: '2.70 Billion',
    totalUsersNum: '2,700,000,000 Global Users',
    monthlyHoursPerUser: '28.5 Hrs / Month',
    dailyActive: '1.9 Billion Daily',
    category: 'Video Streaming & Shorts',
    logo: YouTubeLogo,
    accentColor: 'from-red-600 to-rose-600',
    borderColor: 'border-red-500/50',
    badge: '#1 Video Platform',
    topCountries: ['India (462M)', 'USA (245M)', 'Brazil (142M)', 'Indonesia (139M)'],
    keyGlobalFact: '1 Billion hours of video are watched globally on YouTube every single day.',
    mapPulseColor: '#ef4444',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    totalGlobalUsers: '3.05 Billion',
    totalUsersNum: '3,050,000,000 Global Users',
    monthlyHoursPerUser: '19.8 Hrs / Month',
    dailyActive: '2.09 Billion Daily',
    category: 'Social Networking & Communities',
    logo: FacebookLogo,
    accentColor: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-500/50',
    badge: '#1 Largest Social Network',
    topCountries: ['India (315M)', 'USA (175M)', 'Indonesia (120M)', 'Brazil (110M)'],
    keyGlobalFact: 'First platform in human history to surpass 3 Billion monthly active users.',
    mapPulseColor: '#3b82f6',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    totalGlobalUsers: '2.78 Billion',
    totalUsersNum: '2,780,000,000 Global Users',
    monthlyHoursPerUser: '17.5 Hrs / Month',
    dailyActive: '2.2 Billion Daily',
    category: 'Instant Messaging & Voice Calls',
    logo: WhatsAppLogo,
    accentColor: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/50',
    badge: '#1 Messaging App',
    topCountries: ['India (535M)', 'Brazil (140M)', 'Indonesia (112M)', 'Mexico (77M)'],
    keyGlobalFact: 'Over 140 Billion text, voice, and media messages are delivered daily worldwide.',
    mapPulseColor: '#10b981',
  },
];

export const WorldUsageScene: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');

  const active = WORLD_PLATFORMS.find((p) => p.id === selectedPlatform) || WORLD_PLATFORMS[0];
  const ActiveLogo = active.logo;

  const handleSelect = (id: string) => {
    soundEngine.playClickTone();
    setSelectedPlatform(id);
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between py-5 px-4 snap-start snap-always shrink-0 overflow-hidden">
      {/* Background World Glow */}
      <div className="absolute inset-0 bg-radial from-blue-950/20 via-black to-black opacity-90 pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-1 pt-1">
        <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-500/40 px-3.5 py-1 rounded-full backdrop-blur-md shadow-lg">
          <Globe className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>GLOBAL PERSPECTIVE • 5.3+ BILLION SOCIAL MEDIA USERS</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-sans">
          World’s Digital Screen Reality
        </h2>

        <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-xl mx-auto">
          Over <strong className="text-cyan-400 font-mono">5.3 Billion human beings</strong> actively log into social platforms every month across every continent on Earth.
        </p>
      </div>

      {/* Centerpiece Container: Tabs for 4 Platforms + World Map + Stats */}
      <div className="relative z-10 max-w-4xl w-full mx-auto my-auto space-y-3">
        {/* 4 App Tabs with Official Logos & Total Users */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {WORLD_PLATFORMS.map((platform) => {
            const isSelected = selectedPlatform === platform.id;
            const LogoComp = platform.logo;

            return (
              <button
                key={platform.id}
                onClick={() => handleSelect(platform.id)}
                className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-2 relative overflow-hidden ${
                  isSelected
                    ? `bg-neutral-900/95 ${platform.borderColor} shadow-2xl scale-[1.02] ring-2 ring-white/20`
                    : 'bg-neutral-950/70 border-white/10 hover:border-white/25 hover:bg-neutral-900/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <LogoComp className="w-7 h-7" />
                  <span className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white text-black' : 'bg-neutral-900 text-neutral-400 border border-white/10'
                  }`}>
                    {platform.badge}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-black text-white font-sans">{platform.name}</div>
                  <div className="text-xs font-mono font-extrabold text-cyan-400 mt-0.5">
                    {platform.totalGlobalUsers}
                  </div>
                  <div className="text-[9px] text-neutral-400 font-mono">Total Global Users</div>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="world-tab-active"
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${platform.accentColor}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* World Map & Selected App Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* World Map Interactive Centerpiece */}
          <div className="lg:col-span-7 apple-card p-4 rounded-3xl border border-white/10 bg-neutral-950/90 relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Global User Concentration • {active.name}</span>
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                Live World Map
              </span>
            </div>

            {/* World Map SVG with glowing continent contours & pulse hubs */}
            <div className="relative w-full h-[180px] sm:h-[210px] flex items-center justify-center bg-black/40 rounded-2xl border border-white/5 overflow-hidden p-2">
              <svg className="w-full h-full opacity-80" viewBox="0 0 1000 500" fill="none">
                {/* World Map Continents Contour Path */}
                {/* North America */}
                <path d="M150 120 Q 220 80, 290 110 T 320 220 T 200 240 T 130 180 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                {/* South America */}
                <path d="M280 260 Q 340 280, 320 380 T 260 460 T 230 350 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                {/* Europe */}
                <path d="M460 100 Q 540 80, 580 130 T 520 180 T 450 140 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                {/* Africa */}
                <path d="M450 200 Q 560 210, 550 330 T 480 400 T 430 280 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                {/* Asia */}
                <path d="M590 90 Q 750 70, 850 150 T 800 280 T 630 220 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                {/* Australia */}
                <path d="M780 340 Q 860 330, 880 400 T 800 430 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />

                {/* Grid latitude lines */}
                <line x1="0" y1="125" x2="1000" y2="125" stroke="#ffffff10" strokeDasharray="3 3" />
                <line x1="0" y1="250" x2="1000" y2="250" stroke="#ffffff15" strokeDasharray="4 4" />
                <line x1="0" y1="375" x2="1000" y2="375" stroke="#ffffff10" strokeDasharray="3 3" />

                {/* Animated Global Data Nodes & Pulsing Signal Arcs */}
                {/* North America Node (NYC/LA) */}
                <circle cx="230" cy="160" r="6" fill={active.mapPulseColor} className="animate-pulse" />
                <circle cx="230" cy="160" r="14" stroke={active.mapPulseColor} strokeWidth="1" fill="none" className="animate-ping opacity-75" />

                {/* South America Node (Brazil) */}
                <circle cx="310" cy="330" r="5" fill={active.mapPulseColor} className="animate-pulse" />

                {/* Europe Node (London/Paris) */}
                <circle cx="500" cy="130" r="5" fill={active.mapPulseColor} className="animate-pulse" />

                {/* India Node (HIGHLIGHTED LARGEST HUB) */}
                <circle cx="710" cy="220" r="9" fill={active.mapPulseColor} className="animate-pulse" />
                <circle cx="710" cy="220" r="22" stroke={active.mapPulseColor} strokeWidth="1.5" fill="none" className="animate-ping opacity-90" />
                <text x="710" y="250" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  #1 User Market
                </text>

                {/* Southeast Asia Node (Indonesia) */}
                <circle cx="810" cy="270" r="5" fill={active.mapPulseColor} className="animate-pulse" />

                {/* Data Signal Arcs connecting India to Global Hubs */}
                <path d="M710 220 Q 470 80, 230 160" stroke={active.mapPulseColor} strokeWidth="1.5" strokeDasharray="4 4" fill="none" className="opacity-60" />
                <path d="M710 220 Q 600 120, 500 130" stroke={active.mapPulseColor} strokeWidth="1.5" strokeDasharray="4 4" fill="none" className="opacity-60" />
                <path d="M710 220 Q 510 300, 310 330" stroke={active.mapPulseColor} strokeWidth="1.5" strokeDasharray="4 4" fill="none" className="opacity-60" />
              </svg>

              {/* Overlay Country Badge Pills */}
              <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center justify-between gap-1 text-[9px] font-mono text-neutral-300 bg-black/80 p-1.5 rounded-xl border border-white/10">
                <span className="text-amber-400 font-bold">Top Global Country Markets:</span>
                <div className="flex items-center space-x-1.5 overflow-x-auto">
                  {active.topCountries.map((c, idx) => (
                    <span key={idx} className="bg-neutral-900 border border-white/10 px-1.5 py-0.5 rounded text-white font-bold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Platform Detail Card */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`apple-card p-4 rounded-3xl border ${active.borderColor} bg-neutral-950/95 space-y-3 shadow-2xl backdrop-blur-md text-left`}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center space-x-2">
                    <ActiveLogo className="w-8 h-8" />
                    <div>
                      <h3 className="text-lg font-black text-white font-sans">{active.name}</h3>
                      <div className="text-[10px] font-mono text-neutral-400">{active.category}</div>
                    </div>
                  </div>
                </div>

                {/* Primary Stat Block */}
                <div className="p-3 bg-neutral-900/90 rounded-2xl border border-white/5 space-y-1 text-center">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    Total Global Audience
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">
                    {active.totalGlobalUsers}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-300">
                    Daily Active Users: <strong className="text-amber-400">{active.dailyActive}</strong>
                  </div>
                </div>

                {/* Average Global Monthly Usage */}
                <div className="p-2.5 bg-black/60 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Avg Monthly Screen Time:</span>
                  </span>
                  <span className="font-extrabold text-amber-400">{active.monthlyHoursPerUser}</span>
                </div>

                {/* Key Global Insight */}
                <div className="p-2.5 bg-neutral-900/90 rounded-xl border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span>Global Impact Fact</span>
                  </div>
                  <p className="text-xs text-neutral-200 font-sans leading-snug">
                    {active.keyGlobalFact}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="relative z-10 text-center text-[10px] font-mono text-neutral-400">
        Global Social Media Statistics 2026 • Data Sources: Meta, Alphabet, DataReportal
      </div>
    </section>
  );
};
