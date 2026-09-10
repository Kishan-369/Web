import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HumanBrainCanvas } from '../3d/HumanBrainCanvas';
import { InfiniteTunnelCanvas } from '../3d/InfiniteTunnelCanvas';
import { soundEngine } from '../../utils/soundEngine';
import { Heart, Zap, Gauge, RefreshCw, ChevronDown, Play, Square, RotateCcw } from 'lucide-react';

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
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactive Tunnel State (for the Infinite Scroll Tunnel card)
  const [postsGenerated, setPostsGenerated] = useState(12);
  const [tunnelSpeed, setTunnelSpeed] = useState(0.15);
  const [isRunning, setIsRunning] = useState(true);
  const [hasStarted, setHasStarted] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);

  // Track scroll position of Scene 12 sticky container relative to viewport
  useEffect(() => {
    const handleScroll = () => {
      if (!sceneRef.current) return;
      const stickyWrapper = sceneRef.current.closest('.sticky-scene-container') || sceneRef.current.parentElement;
      const target = stickyWrapper || sceneRef.current;
      const rect = target.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = rect.height - windowHeight;

      if (scrollableDistance > 0) {
        const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    const scrollContainer = sceneRef.current?.closest('.overflow-y-scroll') || window;
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    }, 1200);

    return () => clearInterval(interval);
  }, [triggerDopamineHit]);

  const handleImpact = useCallback((text: string) => {
    soundEngine.playNotificationPing();
    setImpactHistory((prev) => [text, ...prev.slice(0, 3)]);
  }, []);

  // Tunnel control handlers
  const handleSimulatedScroll = () => {
    soundEngine.playGlitchSound();
    setPostsGenerated((prev) => prev + 1);
  };

  const handleStartTunnel = () => {
    soundEngine.playNotificationPing();
    setIsRunning(true);
    setHasStarted(true);
  };

  const handleToggleStartStop = () => {
    soundEngine.playClickTone();
    setIsRunning(!isRunning);
    if (!hasStarted) setHasStarted(true);
  };

  const handleResetSpeed = () => {
    soundEngine.playNotificationPing();
    setIsRunning(true);
    setHasStarted(true);
    setResetTrigger((prev) => prev + 1);
  };

  const handleSpeedUpdate = useCallback((speed: number) => {
    setTunnelSpeed(speed);
  }, []);

  // Calculate UI overlay opacity based on scroll completion
  // 0.0 to 0.65 -> Brain & notifications
  // 0.65 to 0.85 -> Brain zooms & tunnel scales to full screen
  // 0.70 to 1.00 -> UI Overlay (Title, Card, Quote) fades in smoothly
  const uiOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.68) / 0.28));

  return (
    <section ref={sceneRef} className="h-screen w-full bg-black text-white relative flex flex-col justify-between items-center overflow-hidden snap-start snap-always shrink-0 p-4 sm:p-6">
      {/* 3D Infinite Tunnel emerging right from center of human brain */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-75 ease-out"
        style={{
          opacity: Math.max(0, Math.min(1, scrollProgress * 1.6)),
          transform: `scale(${0.2 + scrollProgress * 0.8})`,
          transformOrigin: '50% 41%', // Aligned with center of brain
        }}
      >
        <InfiniteTunnelCanvas
          isRunning={isRunning}
          speedResetTrigger={resetTrigger}
          onSpeedChange={handleSpeedUpdate}
        />
      </div>

      {/* Background Human Anatomical Brain Canvas */}
      <HumanBrainCanvas
        activePulse={pulseActive}
        incomingTrigger={incomingTrigger}
        onImpact={handleImpact}
        scrollProgress={scrollProgress}
      />

      {/* Header Overlay (Fades in when scroll enters tunnel) */}
      <div
        className="relative z-20 max-w-4xl mx-auto text-center space-y-2 pt-2 transition-opacity duration-300"
        style={{
          opacity: uiOpacity,
          pointerEvents: uiOpacity > 0.5 ? 'auto' : 'none',
        }}
      >
        <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-pink-400 bg-pink-950/70 border border-pink-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
          <Zap className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>THE EMOJI BLACK HOLE VORTEX</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-lg">
          The Infinite Scroll Tunnel
        </h2>
      </div>

      {/* Interactive Infinite Scroll Simulator Widget Overlay */}
      <div
        className="relative z-20 max-w-sm w-full mx-auto my-auto transition-all duration-300"
        style={{
          opacity: uiOpacity,
          transform: `scale(${0.9 + uiOpacity * 0.1})`,
          pointerEvents: uiOpacity > 0.5 ? 'auto' : 'none',
        }}
      >
        <div className="apple-card p-4 sm:p-5 rounded-3xl border-cyan-500/30 text-center space-y-3 glow-blue bg-neutral-950/90 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 border-b border-white/10 pb-2">
            <span className="flex items-center gap-1.5 font-bold">
              <Gauge className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>TUNNEL SPEED: {(tunnelSpeed * 10).toFixed(1)}x</span>
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
              {isRunning ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
                  <span>Eating Emojis...</span>
                </>
              ) : (
                <span className="text-amber-400">Tunnel Paused</span>
              )}
            </span>
          </div>

          {/* Fake Feed Content Box */}
          <div className="h-28 sm:h-32 bg-neutral-900 rounded-2xl p-3 flex flex-col justify-between text-left overflow-hidden border border-white/5">
            <div className="space-y-1">
              <div className="text-xs font-bold text-white flex justify-between">
                <span>@viral_creator_{postsGenerated}</span>
                <span className="text-[10px] text-neutral-500">Sponsored</span>
              </div>
              <p className="text-xs text-neutral-300 font-sans line-clamp-2">
                "You won't believe what happened next! Emojis getting swallowed by the infinite vortex..."
              </p>
            </div>

            <button
              onClick={handleSimulatedScroll}
              className="w-full py-1.5 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/40 rounded-xl text-xs font-bold text-cyan-300 flex items-center justify-center space-x-1 transition-all"
            >
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              <span>Scroll Down ({postsGenerated} Posts)</span>
            </button>
          </div>

          {/* Live Scroll Meters */}
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="bg-neutral-900 p-2.5 rounded-xl border border-white/5">
              <div className="text-[10px] text-neutral-400 uppercase font-mono">VORTEX VELOCITY</div>
              <div className="text-sm font-bold text-red-500 font-mono">
                {isRunning ? `${Math.round(tunnelSpeed * 65)} km/h` : '0 km/h (Stopped)'}
              </div>
            </div>
            <div className="bg-neutral-900 p-2.5 rounded-xl border border-white/5">
              <div className="text-[10px] text-neutral-400 uppercase font-mono">BOTTOM FOUND?</div>
              <div className="text-sm font-bold text-cyan-400 font-mono">NEVER (0%)</div>
            </div>
          </div>

          {/* Tunnel Controls: Start, Stop, Reset */}
          {!hasStarted ? (
            <button
              onClick={handleStartTunnel}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-black font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center space-x-2 glow-blue animate-pulse"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>START TUNNEL & EAT EMOJIS</span>
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleToggleStartStop}
                className={`py-2 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-all border ${
                  isRunning
                    ? 'bg-red-950/80 border-red-500/50 text-red-400 hover:bg-red-900/80 shadow-lg'
                    : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 hover:bg-emerald-900/80 shadow-lg'
                }`}
              >
                {isRunning ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>STOP Tunnel</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>RESUME Tunnel</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetSpeed}
                className="py-2 px-3 bg-neutral-900 hover:bg-neutral-800 border border-white/20 rounded-xl text-xs font-mono text-neutral-200 hover:text-white flex items-center justify-center space-x-1.5 transition-all shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>RESET Speed</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Brain Hits Reel (Fades out when scrolling into tunnel) */}
      {impactHistory.length > 0 && uiOpacity < 0.3 && (
        <div
          className="relative z-10 max-w-lg w-full mx-auto mb-2 p-3 rounded-2xl bg-neutral-950/80 border border-white/10 text-center space-y-1.5 backdrop-blur-md shadow-2xl transition-opacity duration-150"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
        >
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest flex items-center justify-center space-x-1.5">
            <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>RECENT SOCIAL SIGNALS INGESTED BY BRAIN:</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5">
            {impactHistory.map((line, idx) => (
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

      {/* Footer Quote Overlay (Fades in smoothly at completion of scroll) */}
      <div
        className="relative z-20 max-w-xl mx-auto text-center text-[11px] sm:text-xs text-neutral-300 font-mono pb-2 transition-opacity duration-300"
        style={{
          opacity: uiOpacity,
          pointerEvents: uiOpacity > 0.5 ? 'auto' : 'none',
        }}
      >
        <p className="bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-xl leading-relaxed">
          "In 2006, infinite scroll was invented to eliminate page pauses. Its creator later expressed deep regret for <span className="text-pink-400 font-semibold underline decoration-pink-500/50">stripping humans of natural stopping points</span>."
        </p>
      </div>
    </section>
  );
};



