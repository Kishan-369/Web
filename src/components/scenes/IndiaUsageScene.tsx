import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Clock, Users, Sparkles, TrendingUp, Award, BarChart3, Flame } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';
import { InstagramLogo, YouTubeLogo, FacebookLogo, WhatsAppLogo } from './WorldUsageScene';
import indiaStatesData from './indiaStatesData.json';

interface PlatformIndiaData {
  id: string;
  name: string;
  totalIndiaUsers: string;
  globalRank: string;
  monthlyHoursPerUser: string;
  daysPerYear: string;
  dailyAverage: string;
  category: string;
  logo: React.FC<{ className?: string }>;
  accentColor: string;
  borderColor: string;
  badge: string;
  keyIndiaFact: string;
  mapPulseColor: string;
  hubCities: string[];
}

const INDIA_PLATFORMS: PlatformIndiaData[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    totalIndiaUsers: '385 Million',
    globalRank: '#1 Market Globally',
    monthlyHoursPerUser: '49 Hours / Month',
    daysPerYear: '24.5 Days / Year',
    dailyAverage: '1.6 Hours / Day',
    category: 'Reels, Visual Posts & DM Network',
    logo: InstagramLogo,
    accentColor: 'from-pink-500 via-purple-500 to-amber-500',
    borderColor: 'border-pink-500/50',
    badge: '#1 Time Consumer in India',
    keyIndiaFact: 'India accounts for over 16% of total Instagram users worldwide. Short-form Reels drive over 70% of total in-app engagement.',
    mapPulseColor: '#ec4899',
    hubCities: ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Kolkata', 'Hyderabad'],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    totalIndiaUsers: '462 Million',
    globalRank: '#1 Market Globally',
    monthlyHoursPerUser: '47 Hours / Month',
    daysPerYear: '23.5 Days / Year',
    dailyAverage: '1.5 Hours / Day',
    category: 'Video Streaming, Shorts & Music',
    logo: YouTubeLogo,
    accentColor: 'from-red-600 to-rose-600',
    borderColor: 'border-red-500/50',
    badge: '#1 Video Platform in India',
    keyIndiaFact: 'India is YouTube’s single largest user base on Earth. YouTube Shorts generates billions of views daily across Indian tier-2 & tier-3 cities.',
    mapPulseColor: '#ef4444',
    hubCities: ['Delhi NCR', 'Mumbai', 'Chennai', 'Ahmedabad', 'Pune'],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    totalIndiaUsers: '315 Million',
    globalRank: '#1 Market Globally',
    monthlyHoursPerUser: '24 Hours / Month',
    daysPerYear: '12 Days / Year',
    dailyAverage: '48 Mins / Day',
    category: 'Social Networking, Groups & Marketplace',
    logo: FacebookLogo,
    accentColor: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-500/50',
    badge: '#1 Community Network',
    keyIndiaFact: 'India has more Facebook accounts than any other nation, serving as a primary news feed, community group hub, and seller marketplace.',
    mapPulseColor: '#3b82f6',
    hubCities: ['Kolkata', 'Mumbai', 'Jaipur', 'Lucknow', 'Bengaluru'],
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    totalIndiaUsers: '535 Million',
    globalRank: '#1 Market Globally',
    monthlyHoursPerUser: '18 Hours / Month',
    daysPerYear: '9 Days / Year',
    dailyAverage: '36 Mins / Day',
    category: 'Messaging, Group Chats & Payments',
    logo: WhatsAppLogo,
    accentColor: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/50',
    badge: '#1 Messaging OS in India',
    keyIndiaFact: 'WhatsApp functions as India’s default digital operating system — used by 535M+ citizens for family chats, business orders, and UPI payments.',
    mapPulseColor: '#10b981',
    hubCities: ['All 28 States & 8 UTs', 'Mumbai', 'Delhi', 'Bengaluru'],
  },
];

export const IndiaUsageScene: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');

  const active = INDIA_PLATFORMS.find((p) => p.id === selectedPlatform) || INDIA_PLATFORMS[0];
  const ActiveLogo = active.logo;

  const handleSelect = (id: string) => {
    soundEngine.playClickTone();
    setSelectedPlatform(id);
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between py-5 px-4 snap-start snap-always shrink-0 overflow-hidden">
      {/* Background India Glow */}
      <div className="absolute inset-0 bg-radial from-orange-950/20 via-black to-black opacity-90 pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-1 pt-1">
        <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-amber-400 bg-amber-950/70 border border-amber-500/40 px-3.5 py-1 rounded-full backdrop-blur-md shadow-lg">
          <Smartphone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>NATIONAL FOOTPRINT • 750+ MILLION INDIAN SMARTPHONE USERS</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-sans">
          India’s Digital Screen Reality
        </h2>

        <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-xl mx-auto">
          India is the <strong className="text-amber-400 font-mono">#1 single largest market globally</strong> for Instagram, YouTube, Facebook, and WhatsApp.
        </p>
      </div>

      {/* Centerpiece Container: Tabs for 4 Platforms + India Map + Stats */}
      <div className="relative z-10 max-w-4xl w-full mx-auto my-auto space-y-3">
        {/* 4 App Tabs with Official Logos & Total India Users */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {INDIA_PLATFORMS.map((platform) => {
            const isSelected = selectedPlatform === platform.id;
            const LogoComp = platform.logo;

            return (
              <button
                key={platform.id}
                onClick={() => handleSelect(platform.id)}
                className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-2 relative overflow-hidden ${
                  isSelected
                    ? `bg-neutral-900/95 ${platform.borderColor} shadow-2xl scale-[1.02] ring-2 ring-amber-400/30`
                    : 'bg-neutral-950/70 border-white/10 hover:border-white/25 hover:bg-neutral-900/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <LogoComp className="w-7 h-7" />
                  <span className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-400 text-black' : 'bg-neutral-900 text-neutral-400 border border-white/10'
                  }`}>
                    {platform.globalRank}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-black text-white font-sans">{platform.name}</div>
                  <div className="text-xs font-mono font-extrabold text-amber-400 mt-0.5">
                    {platform.totalIndiaUsers}
                  </div>
                  <div className="text-[9px] text-neutral-400 font-mono">Active India Users</div>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="india-tab-active"
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${platform.accentColor}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* India Map & Selected App Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* India Map Interactive Centerpiece */}
          <div className="lg:col-span-7 apple-card p-4 rounded-3xl border border-white/10 bg-neutral-950/90 relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>India National Map • {active.name} Footprint</span>
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded-full">
                {active.globalRank}
              </span>
            </div>

            {/* India Map SVG with vector contours & city pulse nodes */}
            <div className="relative w-full h-[210px] sm:h-[240px] flex items-center justify-center bg-[#172554]/30 rounded-2xl border border-amber-500/20 overflow-hidden p-1 shadow-inner">
              <svg className="h-full w-auto max-w-full" viewBox="0 0 500 580" fill="none">
                {/* Background Ocean / Canvas Grid */}
                <rect width="500" height="580" fill="#0f172a" fillOpacity="0.4" />
                <g stroke="#f59e0b" strokeOpacity="0.08" strokeWidth="0.8" strokeDasharray="3 4">
                  <line x1="125" y1="0" x2="125" y2="580" />
                  <line x1="250" y1="0" x2="250" y2="580" />
                  <line x1="375" y1="0" x2="375" y2="580" />
                  <line x1="0" y1="145" x2="500" y2="145" />
                  <line x1="0" y1="290" x2="500" y2="290" />
                  <line x1="0" y1="435" x2="500" y2="435" />
                </g>

                {/* State Polygons with Distinct Reference Palette Colors & Dark State Boundaries */}
                <g stroke="#1e293b" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
                  {indiaStatesData.map((st, idx) => (
                    <path
                      key={idx}
                      d={st.d}
                      fill={st.color}
                      className="transition-colors hover:brightness-110 cursor-pointer"
                    >
                      <title>{st.name}</title>
                    </path>
                  ))}
                </g>

                {/* State Names Printed inside States Matching Reference Image */}
                <g pointerEvents="none">
                  {indiaStatesData.map((st, idx) => {
                    if (!st.label || !st.labelPos || st.labelPos[0] <= 0) return null;
                    return (
                      <text
                        key={`label-${idx}`}
                        x={st.labelPos[0]}
                        y={st.labelPos[1]}
                        fill="#0f172a"
                        fontSize="8.5"
                        fontWeight="700"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                        opacity="0.88"
                      >
                        {st.label}
                      </text>
                    );
                  })}
                </g>

                {/* Major Indian Tech & Consumption Metro Hubs */}
                {/* Delhi NCR */}
                <g>
                  <circle cx="165" cy="181" r="5.5" fill={active.mapPulseColor} className="animate-pulse" />
                  <circle cx="165" cy="181" r="14" stroke={active.mapPulseColor} strokeWidth="1.5" fill="none" className="animate-ping opacity-85" />
                  <text x="165" y="168" fill="#991b1b" stroke="#ffffff" strokeWidth="2.5" paintOrder="stroke" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">Delhi</text>
                </g>

                {/* Mumbai */}
                <g>
                  <circle cx="98" cy="354" r="5.5" fill={active.mapPulseColor} className="animate-pulse" />
                  <circle cx="98" cy="354" r="14" stroke={active.mapPulseColor} strokeWidth="1.5" fill="none" className="animate-ping opacity-85" />
                  <text x="70" y="358" fill="#991b1b" stroke="#ffffff" strokeWidth="2.5" paintOrder="stroke" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">Mumbai</text>
                </g>

                {/* Bengaluru */}
                <g>
                  <circle cx="171" cy="465" r="5.5" fill={active.mapPulseColor} className="animate-pulse" />
                  <circle cx="171" cy="465" r="14" stroke={active.mapPulseColor} strokeWidth="1.5" fill="none" className="animate-ping opacity-85" />
                  <text x="171" y="482" fill="#991b1b" stroke="#ffffff" strokeWidth="2.5" paintOrder="stroke" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">Bengaluru</text>
                </g>

                {/* Kolkata */}
                <g>
                  <circle cx="336" cy="290" r="5" fill={active.mapPulseColor} className="animate-pulse" />
                  <text x="365" y="294" fill="#991b1b" stroke="#ffffff" strokeWidth="2.5" paintOrder="stroke" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">Kolkata</text>
                </g>

                {/* Hyderabad */}
                <g>
                  <circle cx="185" cy="385" r="5" fill={active.mapPulseColor} className="animate-pulse" />
                  <text x="215" y="389" fill="#991b1b" stroke="#ffffff" strokeWidth="2.5" paintOrder="stroke" fontSize="8.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">Hyderabad</text>
                </g>

                {/* Chennai */}
                <g>
                  <circle cx="212" cy="463" r="5" fill={active.mapPulseColor} className="animate-pulse" />
                </g>

                {/* Ahmedabad */}
                <g>
                  <circle cx="94" cy="282" r="5" fill={active.mapPulseColor} className="animate-pulse" />
                </g>

                {/* Intercity High-Speed Digital Traffic Stream Lines */}
                <path d="M 165 181 L 98 354" stroke={active.mapPulseColor} strokeWidth="1.8" strokeDasharray="4 4" fill="none" className="opacity-80" />
                <path d="M 98 354 L 171 465" stroke={active.mapPulseColor} strokeWidth="1.8" strokeDasharray="4 4" fill="none" className="opacity-80" />
                <path d="M 165 181 L 336 290" stroke={active.mapPulseColor} strokeWidth="1.8" strokeDasharray="4 4" fill="none" className="opacity-80" />
                <path d="M 171 465 L 185 385" stroke={active.mapPulseColor} strokeWidth="1.8" strokeDasharray="4 4" fill="none" className="opacity-80" />
                <path d="M 98 354 L 94 282" stroke={active.mapPulseColor} strokeWidth="1.8" strokeDasharray="4 4" fill="none" className="opacity-80" />
              </svg>

              {/* Overlay Hub City Pills */}
              <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center justify-between gap-1 text-[9px] font-mono text-neutral-300 bg-black/85 p-1.5 rounded-xl border border-white/10">
                <span className="text-amber-400 font-bold">Top India Metros:</span>
                <div className="flex items-center space-x-1 overflow-x-auto">
                  {active.hubCities.map((city, idx) => (
                    <span key={idx} className="bg-neutral-900 border border-white/10 px-1.5 py-0.5 rounded text-white font-bold">
                      {city}
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
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    {active.badge}
                  </span>
                </div>

                {/* Primary Stat Block */}
                <div className="p-3 bg-neutral-900/90 rounded-2xl border border-white/5 space-y-1 text-center">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    Monthly Indian Usage Impact
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
                    {active.monthlyHoursPerUser}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-300">
                    Equates to <strong className="text-pink-400">{active.daysPerYear}</strong> spent exclusively on {active.name}!
                  </div>
                </div>

                {/* Daily Average */}
                <div className="p-2.5 bg-black/60 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Daily Indian Average:</span>
                  </span>
                  <span className="font-extrabold text-amber-400">{active.dailyAverage}</span>
                </div>

                {/* Key India Insight */}
                <div className="p-2.5 bg-neutral-900/90 rounded-xl border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span>India Market Reality</span>
                  </div>
                  <p className="text-xs text-neutral-200 font-sans leading-snug">
                    {active.keyIndiaFact}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="relative z-10 text-center text-[10px] font-mono text-neutral-400">
        Assembly Reality Check • Indian Smartphone Footprint • Data Sources: TRAI, App Annie, Meta Reports
      </div>
    </section>
  );
};
