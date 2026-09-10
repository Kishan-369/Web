import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundEngine } from '../../utils/soundEngine';
import { AlertCircle, Zap, ShieldAlert, Cpu } from 'lucide-react';

export const DefinitionScene: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      titleEn: '1. Compulsion to Refresh',
      descEn: 'An uncontrollable urge to check notification feeds every few minutes, even when no message has arrived.',
      icon: Zap,
    },
    {
      titleEn: '2. Escalation & Tolerance',
      descEn: 'Needing progressively higher screen time to achieve the same emotional stimulation or escape boredom.',
      icon: Cpu,
    },
    {
      titleEn: '3. Phantom Vibrations',
      descEn: 'Sensing your phone vibrating or ringing in your pocket when it is completely silent or not present.',
      icon: AlertCircle,
    },
    {
      titleEn: '4. Separation Anxiety',
      descEn: 'Experiencing irritability, restlessness, and brain fog when separated from your smartphone.',
      icon: ShieldAlert,
    },
  ];

  const handlePillarClick = (idx: number) => {
    soundEngine.playNotificationPing();
    setActivePillar(idx);
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-center items-center py-8 px-4 snap-start snap-always shrink-0 overflow-hidden">
      <div className="max-w-4xl w-full mx-auto space-y-6 relative z-10 my-auto">
        {/* Definition Header */}
        <div className="text-center space-y-3">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-red-500 bg-red-950/40 border border-red-500/30 px-4 py-1.5 rounded-full">
            Behavioral Definition
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-snug">
            What is Social Media Addiction?
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            "A behavioral state where compulsive scrolling overrides sleep, face-to-face conversations, career focus, and mental clarity."
          </p>
        </div>

        {/* 4 Interactive Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activePillar === idx;
            return (
              <motion.div
                key={item.titleEn}
                whileHover={{ scale: 1.01 }}
                onClick={() => handlePillarClick(idx)}
                className={`apple-card p-5 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'border-red-500 bg-neutral-900/90 glow-red'
                    : 'border-white/10 hover:border-white/20 bg-neutral-950/60'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-red-600 text-white shadow-lg' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.titleEn}</h3>
                  </div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">{item.descEn}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
