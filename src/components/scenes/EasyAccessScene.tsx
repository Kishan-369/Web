import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Smartphone, Fingerprint, Bell, DollarSign, MousePointer, ShieldAlert, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  delay: string;
  icon: any;
  iconBg: string;
  badge: string;
  accentColor: string;
  description: string;
  stat: string;
  statLabel: string;
}

const ACCESS_PILLARS: Pillar[] = [
  {
    id: 'biometrics',
    title: 'Zero-Password Biometrics',
    subtitle: 'Instant Face ID & Fingerprint Access',
    delay: '0.2 Seconds',
    icon: Fingerprint,
    iconBg: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
    badge: '200ms Unlock',
    accentColor: 'border-emerald-500/40',
    description: 'Apps eliminate passwords entirely. A quick glance or thumb touch bypasses conscious reflection before your brain can ask "Do I actually need to open this?"',
    stat: '< 0.2s',
    statLabel: 'Time from urge to feed',
  },
  {
    id: 'notifications',
    title: 'Subconscious Push Triggers',
    subtitle: 'Lock-screen Haptic Ping Alerts',
    delay: 'Instant Recall',
    icon: Bell,
    iconBg: 'bg-amber-950/80 text-amber-400 border-amber-500/40',
    badge: '150+ Daily Pings',
    accentColor: 'border-amber-500/40',
    description: 'Vibrations and bright badges create a sensory reflex loop. You pick up the phone involuntarily even when no new notification has arrived.',
    stat: '150x',
    statLabel: 'Daily involuntary phone checks',
  },
  {
    id: 'zero-cost',
    title: 'Zero Financial & Setup Barrier',
    subtitle: 'Free-To-Play Business Model',
    delay: '$0.00 Entry',
    icon: DollarSign,
    iconBg: 'bg-cyan-950/80 text-cyan-400 border-cyan-500/40',
    badge: 'Infinite Free Content',
    accentColor: 'border-cyan-500/40',
    description: 'Subsidized data plans and free downloads mean there is zero financial barrier to starting. You pay with your attention rather than your wallet.',
    stat: '$0',
    statLabel: 'Upfront cost to start scrolling',
  },
  {
    id: 'ergonomics',
    title: 'One-Thumb Minimal Effort',
    subtitle: 'Hyper-Optimized Mobile Layouts',
    delay: '1 Swipe',
    icon: MousePointer,
    iconBg: 'bg-pink-950/80 text-pink-400 border-pink-500/40',
    badge: 'Zero Mental Effort',
    accentColor: 'border-pink-500/40',
    description: 'Controls are placed within natural thumb reach. No searching, typing, or heavy cognitive load — just effortless upward flicking.',
    stat: '98%',
    statLabel: 'Thumb reach optimization',
  },
];

export const EasyAccessScene: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>(ACCESS_PILLARS[0].id);
  const [isSimulatingUnlock, setIsSimulatingUnlock] = useState(false);
  const [unlockedCount, setUnlockedCount] = useState(0);

  const activePillar = ACCESS_PILLARS.find((p) => p.id === activePillarId) || ACCESS_PILLARS[0];

  const handleSelectPillar = (id: string) => {
    soundEngine.playClickTone();
    setActivePillarId(id);
  };

  const handleSimulateUnlock = () => {
    soundEngine.playNotificationPing();
    setIsSimulatingUnlock(true);
    setUnlockedCount((prev) => prev + 1);

    setTimeout(() => {
      setIsSimulatingUnlock(false);
    }, 1200);
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between py-6 px-4 snap-start snap-always shrink-0 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial from-emerald-950/20 via-black to-black opacity-90 pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-1.5 pt-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-1 rounded-full backdrop-blur-md shadow-lg">
          <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Frictionless Access Engine</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          Why Social Media Is Effortlessly Easy To Access
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-xl mx-auto">
          Tech companies removed every single layer of friction — making opening an app <strong className="text-emerald-400 font-mono">100x easier</strong> than reading a book, exercising, or focusing.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="relative z-10 max-w-4xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left Column: 4 Frictionless Access Pillars */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2 pl-1">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>The 4 Friction-Removal Pillars</span>
          </div>

          <div className="space-y-2">
            {ACCESS_PILLARS.map((pillar) => {
              const isSelected = activePillarId === pillar.id;
              const IconComponent = pillar.icon;

              return (
                <div
                  key={pillar.id}
                  onClick={() => handleSelectPillar(pillar.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? `bg-neutral-900/95 ${pillar.accentColor} shadow-xl scale-[1.01]`
                      : 'bg-neutral-950/60 border-white/5 hover:border-white/20 hover:bg-neutral-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl border ${pillar.iconBg}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-extrabold text-white flex items-center gap-2 font-sans">
                          <span>{pillar.title}</span>
                          {isSelected && (
                            <span className="text-[9px] bg-emerald-500 text-black px-1.5 py-0.5 rounded-full font-mono font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono">{pillar.subtitle}</div>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-lg">
                      {pillar.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Spotlight & Live Simulator */}
        <div className="lg:col-span-5">
          <div className="apple-card p-5 rounded-3xl border border-emerald-500/40 bg-neutral-950/95 space-y-4 shadow-2xl relative overflow-hidden backdrop-blur-md">
            {/* Header Detail */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-xl border ${activePillar.iconBg}`}>
                  {React.createElement(activePillar.icon, { className: 'w-4 h-4' })}
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-black text-white font-sans">{activePillar.title}</h3>
                  <div className="text-[10px] font-mono text-neutral-400">{activePillar.badge}</div>
                </div>
              </div>
              <span className="text-xs font-mono font-extrabold text-emerald-400">
                {activePillar.stat}
              </span>
            </div>

            {/* Description Box */}
            <p className="text-xs text-neutral-300 font-sans leading-relaxed text-left bg-neutral-900/80 p-3 rounded-2xl border border-white/5">
              {activePillar.description}
            </p>

            {/* Live Instant Unlock Demo Simulator */}
            <div className="space-y-2 pt-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 text-left">
                Interactive Friction Test
              </div>

              <button
                onClick={handleSimulateUnlock}
                disabled={isSimulatingUnlock}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center space-x-2 glow-emerald active:scale-98"
              >
                <Fingerprint className={`w-4 h-4 ${isSimulatingUnlock ? 'animate-bounce text-yellow-300' : ''}`} />
                <span>
                  {isSimulatingUnlock ? 'Bypassing Conscious Brain (200ms)...' : 'Test One-Tap Instant Unlock'}
                </span>
              </button>

              {unlockedCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2.5 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-left text-[11px] font-mono text-emerald-300 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Unlocked instantly in 0.18s!</span>
                  </span>
                  <span className="text-neutral-400">Total Unlocks: {unlockedCount}</span>
                </motion.div>
              )}
            </div>

            {/* Comparison Pill */}
            <div className="p-2.5 bg-neutral-900/90 rounded-xl border border-white/5 text-[11px] font-mono text-neutral-300 text-left flex justify-between items-center">
              <span>App Open Effort: <strong className="text-emerald-400">0.2 seconds</strong></span>
              <span className="text-neutral-500">vs</span>
              <span>Book Read Effort: <strong className="text-amber-400">15.0 seconds</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 text-center text-[11px] font-mono text-neutral-400 pb-1">
        Assembly Reality Check • Frictionless UX & Behavioral Conditioning • Designed for Instant Habit Formation
      </div>
    </section>
  );
};
