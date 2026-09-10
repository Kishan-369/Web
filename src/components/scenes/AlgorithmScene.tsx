import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Eye, Filter } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export const AlgorithmScene: React.FC = () => {
  const [interest, setInterest] = useState<'gaming' | 'fashion' | 'fitness'>('gaming');

  const handleInterestSelect = (type: 'gaming' | 'fashion' | 'fitness') => {
    soundEngine.playGlitchSound();
    setInterest(type);
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-center items-center py-8 px-4 snap-start snap-always shrink-0 overflow-hidden">
      <div className="max-w-4xl w-full mx-auto space-y-6 relative z-10 my-auto text-center">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-4 py-1.5 rounded-full">
            AI Profiling Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            The Algorithm Knows You Better Than You Know Yourself.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-sans">
            It tracks every millisecond you linger on a photo, your scroll velocity, and your emotional vulnerabilities.
          </p>
        </div>

        {/* Algorithm Interest Profiling Box */}
        <div className="apple-card p-6 rounded-3xl border-cyan-500/30 max-w-xl mx-auto space-y-4 bg-neutral-950/90 glow-blue text-left">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2 text-cyan-400">
              <Cpu className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase">AI PROFILE ENGINE v9.2</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 animate-pulse">ACTIVE TRACKING</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-neutral-400 font-mono">Select Linger Interest:</label>
            <div className="flex space-x-2">
              <button
                onClick={() => handleInterestSelect('gaming')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  interest === 'gaming' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-neutral-900 border-white/10 text-neutral-400'
                }`}
              >
                🎮 Gaming & Esports
              </button>
              <button
                onClick={() => handleInterestSelect('fashion')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  interest === 'fashion' ? 'bg-pink-600 border-pink-400 text-white' : 'bg-neutral-900 border-white/10 text-neutral-400'
                }`}
              >
                👗 Luxury & Fashion
              </button>
              <button
                onClick={() => handleInterestSelect('fitness')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  interest === 'fitness' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-neutral-900 border-white/10 text-neutral-400'
                }`}
              >
                💪 Fitness & Lifestyle
              </button>
            </div>
          </div>

          <div className="bg-neutral-900 p-4 rounded-2xl border border-white/5 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-neutral-400">Targeted Content Bubble:</span>
              <span className="text-cyan-400 font-bold">{interest.toUpperCase()} FEED LOCKED</span>
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              {interest === 'gaming' && 'The AI feeds you non-stop gaming clips, loot box drama, and stream highlights to keep you awake past 3 AM.'}
              {interest === 'fashion' && 'The AI feeds you body comparison reels, luxury haul trends, and unboxing videos to trigger shopping impulses.'}
              {interest === 'fitness' && 'The AI feeds you extreme fitness standards, supplement ads, and body dysmorphia triggers to drive engagement.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
