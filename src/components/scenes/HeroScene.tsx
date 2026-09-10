import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, ArrowDown, Sparkles, Smartphone, Eye } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface Props {
  onScrollToNext: () => void;
}

export const HeroScene: React.FC<Props> = ({ onScrollToNext }) => {
  const [hasClickedPing, setHasClickedPing] = useState(false);

  const handleNotificationClick = () => {
    soundEngine.playNotificationPing();
    soundEngine.playSubBassImpact();
    setHasClickedPing(true);
  };

  return (
    <section className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden px-4 snap-start snap-always shrink-0 select-none">
      {/* Suggestive Dark Atmospheric Radial Mesh Background */}
      <div className="absolute inset-0 bg-radial from-red-950/30 via-neutral-950 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.12)_0%,transparent_70%)] animate-pulse pointer-events-none" />

      {/* Subtle Floating Ambient Dust / Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-cyan-600/10 blur-3xl" />
      </div>

      {/* Main Title Page Header */}
      <div className="max-w-3xl w-full mx-auto text-center space-y-6 relative z-10 my-auto">
        {/* Subtle Title Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-red-500 bg-red-950/40 border border-red-500/30 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>Understanding Social Media Addiction</span>
        </motion.div>

        {/* Big Bold Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-3"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-none">
            IT ALL STARTS WITH
          </h1>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-cyan-400 uppercase leading-none text-glow-red">
            ONE NOTIFICATION.
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-base sm:text-lg text-neutral-400 font-sans max-w-xl mx-auto font-normal leading-relaxed"
        >
          How a single ping rewires your attention, fragments your focus, and captures your youth without you ever realizing it.
        </motion.p>

        {/* Center Interactive Single Notification Box */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          onClick={handleNotificationClick}
          className={`apple-card p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-500 transform hover:scale-105 max-w-md mx-auto text-left relative overflow-hidden shadow-2xl ${
            hasClickedPing ? 'glow-red border-red-500 bg-neutral-900/90' : 'border-white/20 hover:border-red-500/50 bg-neutral-950/80'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg glow-red">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <span>1 NEW NOTIFICATION</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
                </div>
                <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Just now • Social App</div>
              </div>
            </div>
            <span className="text-[10px] text-neutral-400 bg-neutral-800 border border-white/10 px-2.5 py-1 rounded-full font-mono">
              Tap to unveil
            </span>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/10">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Someone mentioned you in a post.</span>
              <Eye className="w-4 h-4 text-red-400" />
            </h3>
            <p className="text-xs text-neutral-400 mt-1 font-sans">
              "You have 1 unread message waiting for you..."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        onClick={onScrollToNext}
        className="relative z-10 mb-6 flex flex-col items-center space-y-1.5 cursor-pointer group"
      >
        <span className="text-[11px] uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors font-mono">
          Scroll down to explore
        </span>
        <ArrowDown className="w-4 h-4 text-red-500 group-hover:translate-y-1 transition-transform" />
      </motion.div>
    </section>
  );
};
