import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HumanBrainCanvas } from '../3d/HumanBrainCanvas';
import { soundEngine } from '../../utils/soundEngine';
import { Heart, Zap, Activity, Sparkles } from 'lucide-react';

const REWARD_FEED = [
  { text: '🚨 Shocking Highway Accident Video Released!', icon: '💥' },
  { text: '🍔 Secret Street Food Spot in Delhi You Must Try!', icon: '🍕' },
  { text: '🏷️ 70% OFF Flash Sale on Branded Clothes Today!', icon: '🛍️' },
  { text: '⚡ Viral Street Fight Video Trending in Metro!', icon: '📹' },
  { text: '🍜 Must-Visit Night Market Buffet at Flat 50% OFF', icon: '🔥' },
  { text: '😱 Unbelievable Horrific Crash Caught on Camera!', icon: '⚠️' },
  { text: '👗 Massive Clearance Sale near your City!', icon: '✨' },
  { text: '🍰 Best Desserts in Town — 1 Free on Every Order!', icon: '🎂' },
  { text: '📲 New Like on your Instagram Photo!', icon: '❤️' },
  { text: '💬 Someone commented on your Post!', icon: '💬' },
  { text: '🔥 Trending Reel: 10M Views in 1 Hour!', icon: '🔥' },
];

export const DopamineScene: React.FC = () => {
  const [pulseActive, setPulseActive] = useState(false);
  const [incomingTrigger, setIncomingTrigger] = useState<{ text: string; icon: string } | null>(null);
  const [impactHistory, setImpactHistory] = useState<string[]>([]);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Trigger dopamine notification flight straight to human brain
  const triggerDopamineHit = useCallback(() => {
    soundEngine.playDopamineTrigger();
    setPulseActive(true);

    const reward = REWARD_FEED[Math.floor(Math.random() * REWARD_FEED.length)];
    setIncomingTrigger({ text: `${reward.icon} ${reward.text}`, icon: '' });

    setTimeout(() => {
      setPulseActive(false);
    }, 1200);
  }, []);

  // Automatic periodic incoming notifications floating straight to brain
  useEffect(() => {
    triggerDopamineHit();

    const interval = setInterval(() => {
      triggerDopamineHit();
    }, 1800);

    return () => clearInterval(interval);
  }, [triggerDopamineHit]);

  const handleImpact = useCallback((text: string) => {
    soundEngine.playNotificationPing();
    setImpactHistory((prev) => [text, ...prev.slice(0, 2)]);
  }, []);

  return (
    <section
      ref={sceneRef}
      className="h-screen w-full bg-black text-white relative flex flex-col justify-between items-center overflow-hidden snap-start snap-always shrink-0 p-4 sm:p-6 select-none"
    >
      {/* Background Human Anatomical Brain Canvas */}
      <HumanBrainCanvas
        activePulse={pulseActive}
        incomingTrigger={incomingTrigger}
        onImpact={handleImpact}
        scrollProgress={0}
      />

      {/* Brain Scene Header */}
      <div className="relative z-20 max-w-4xl mx-auto text-center space-y-2 pt-2 sm:pt-4 pointer-events-none">
        <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Neurochemical Hijack • Dopamine Loop</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-lg">
          Inside Your Brain: The Reward Hijack
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto font-light">
          Every unexpected notification delivers a micro-surge of dopamine into the nucleus accumbens, rewiring natural human attention into a craving loop.
        </p>
      </div>

      {/* Interactive Dopamine Trigger Card */}
      <div className="relative z-20 max-w-md w-full mx-auto my-auto space-y-3">
        <div className="apple-card p-4 sm:p-5 rounded-3xl border-cyan-500/30 text-center space-y-3.5 glow-blue bg-neutral-950/85 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 border-b border-white/10 pb-2">
            <span className="flex items-center gap-1.5 font-bold">
              <Zap className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
              <span>NEURAL CIRCUIT: DOPAMINERGIC PATHWAY</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Active
            </span>
          </div>

          <p className="text-xs text-neutral-300 font-sans leading-relaxed">
            The algorithms engineer random variable reward schedules — identical to casino slot machines — to keep your brain firing anticipation signals.
          </p>

          <button
            onClick={triggerDopamineHit}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>TRIGGER DOPAMINE SURGE</span>
          </button>
        </div>
      </div>

      {/* Recent Brain Hits Reel */}
      {impactHistory.length > 0 && (
        <div className="relative z-20 max-w-lg w-full mx-auto mb-2 p-3 rounded-2xl bg-neutral-950/80 border border-white/10 text-center space-y-1.5 backdrop-blur-md shadow-2xl">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest flex items-center justify-center space-x-1.5">
            <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>RECENT SOCIAL SIGNALS INGESTED BY BRAIN:</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5">
            {impactHistory.slice(0, 3).map((line, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3.5 py-1 rounded-full bg-neutral-900/90 border border-cyan-500/20 text-cyan-300 shadow-sm transition-all"
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer Quote */}
      <div className="relative z-20 max-w-xl mx-auto text-center text-[11px] sm:text-xs text-neutral-400 font-mono pb-2">
        <p className="bg-black/75 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-xl leading-relaxed">
          "The human brain did not evolve to withstand thousands of artificial social validation stimuli every single day."
        </p>
      </div>
    </section>
  );
};
