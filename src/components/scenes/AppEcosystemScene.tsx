import React, { useState } from 'react';
import { AppEcosystemCanvas } from '../3d/AppEcosystemCanvas';
import { motion } from 'motion/react';
import { soundEngine } from '../../utils/soundEngine';
import { Radio } from 'lucide-react';

export const AppEcosystemScene: React.FC = () => {
  // Exploded is always true now, we remove the toggle functionality
  const exploded = true;
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const apps = [
    { name: 'Instagram', labelEn: 'Short Reels & Feeds', color: 'border-pink-500/40 text-pink-400', iconIndex: 0 },
    { name: 'YouTube', labelEn: 'Endless Video Queue', color: 'border-red-500/40 text-red-500', iconIndex: 1 },
    { name: 'Facebook', labelEn: 'Social Network Matrix', color: 'border-blue-500/40 text-blue-400', iconIndex: 2 },
    { name: 'WhatsApp', labelEn: 'Instant Ping Stream', color: 'border-emerald-500/40 text-emerald-400', iconIndex: 3 },
  ];

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between py-10 px-4 overflow-hidden snap-start snap-always shrink-0">
      {/* 3D Canvas Background */}
      <AppEcosystemCanvas exploded={exploded} selectedAppIndex={selectedApp ? apps.find(a => a.name === selectedApp)?.iconIndex ?? null : null} />

      {/* Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-2 pt-4">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3.5 py-1.5 rounded-full backdrop-blur-md">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>The App Ecosystem Explosion</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Designed to capture every second of your attention.
        </h2>
        <p className="text-sm sm:text-base text-neutral-300 font-sans">
          Engineered by world-class behavioral scientists to maximize time-on-screen.
        </p>
      </div>

      {/* Interactive Controls Overlay - Moved to the right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-end items-center flex-1 pr-4 sm:pr-12 pointer-events-none">
        
        {/* Orbiting App Cards List - Pointer events auto to allow clicking */}
        <div className="flex flex-col gap-4 pointer-events-auto w-full max-w-[280px]">
          {apps.map((app, idx) => {
            const isSelected = selectedApp === app.name;
            const isBlurred = selectedApp !== null && !isSelected;

            return (
              <motion.button
                key={app.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => {
                  if (soundEngine.playClickTone) {
                    soundEngine.playClickTone();
                  }
                  setSelectedApp(isSelected ? null : app.name);
                }}
                className={`apple-card p-4 rounded-2xl border ${app.color} text-left space-y-1 backdrop-blur-md bg-neutral-950/80 transition-all duration-300 ${
                  isSelected ? 'scale-105 z-20 shadow-2xl shadow-current translate-x-[-10px]' : 'scale-100 z-10 hover:scale-105'
                } ${isBlurred ? 'blur-sm opacity-40' : 'opacity-100'}`}
              >
                <div className="text-sm font-bold font-sans">{app.name}</div>
                <div className="text-xs text-neutral-400">{app.labelEn}</div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Quote */}
      <div className="relative z-10 text-center text-[11px] text-neutral-500 font-mono pb-2">
        Every icon and animation is optimized to trigger emotional attachment and repeat opens.
      </div>
    </section>
  );
};
