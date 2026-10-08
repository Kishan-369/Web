import React, { useState, useCallback } from 'react';
import { InfiniteTunnelCanvas } from '../3d/InfiniteTunnelCanvas';
import { soundEngine } from '../../utils/soundEngine';
import { ChevronDown, ChevronUp, RefreshCw, Gauge, RotateCcw, Zap, Play, Square, ArrowDown } from 'lucide-react';

interface InfiniteScrollSceneProps {
  onScrollToBrain?: () => void;
  onScrollToNext?: () => void;
}

export const InfiniteScrollScene: React.FC<InfiniteScrollSceneProps> = ({
  onScrollToBrain,
  onScrollToNext,
}) => {
  const [scrollMeters, setScrollMeters] = useState(140);
  const [postsGenerated, setPostsGenerated] = useState(12);
  const [tunnelSpeed, setTunnelSpeed] = useState(0.4);
  const [isRunning, setIsRunning] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleSimulatedScroll = () => {
    soundEngine.playGlitchSound();
    setScrollMeters((prev) => prev + Math.floor(Math.random() * 80 + 40));
    setPostsGenerated((prev) => prev + 1);
  };

  const handleToggleStartStop = () => {
    soundEngine.playClickTone();
    setIsRunning(!isRunning);
  };

  const handleResetSpeed = () => {
    soundEngine.playNotificationPing();
    setIsRunning(true);
    setResetTrigger((prev) => prev + 1);
  };

  const handleSpeedUpdate = useCallback((speed: number) => {
    setTunnelSpeed(speed);
  }, []);

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between py-6 sm:py-8 px-4 overflow-hidden snap-start snap-always shrink-0 select-none">
      {/* 3D Infinite Warp Tunnel Background */}
      <InfiniteTunnelCanvas
        isRunning={isRunning}
        speedResetTrigger={resetTrigger}
        onSpeedChange={handleSpeedUpdate}
      />

      {/* Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-1.5 pt-2">
        <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-pink-400 bg-pink-950/70 border border-pink-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
          <Zap className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>The Emoji Black Hole Vortex</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight drop-shadow-lg">
          The Infinite Scroll Tunnel
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto font-light">
          No page breaks. No natural stopping points. An endless digital vacuum sucking your time away.
        </p>
      </div>

      {/* Interactive Infinite Scroll Simulator Widget */}
      <div className="relative z-10 max-w-md w-full mx-auto my-auto space-y-3">
        <div className="apple-card p-4 sm:p-5 rounded-3xl border-cyan-500/30 text-center space-y-3 glow-blue bg-neutral-950/80 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 border-b border-white/10 pb-2">
            <span className="flex items-center gap-1.5 font-bold">
              <Gauge className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>TUNNEL SPEED: {(tunnelSpeed * 10).toFixed(1)}x</span>
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
              {isRunning ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
                  <span>Swallowing Content...</span>
                </>
              ) : (
                <span className="text-amber-400">Tunnel Paused</span>
              )}
            </span>
          </div>

          {/* Fake Feed Content Box */}
          <div className="h-28 bg-neutral-900/90 rounded-2xl p-3 flex flex-col justify-between text-left overflow-hidden border border-white/10 shadow-inner">
            <div className="space-y-1">
              <div className="text-xs font-bold text-white flex justify-between">
                <span>@viral_creator_{postsGenerated}</span>
                <span className="text-[10px] text-pink-400 font-mono">Just Now • Sponsored</span>
              </div>
              <p className="text-xs text-neutral-300 font-sans line-clamp-2">
                "You won't believe what happened next! Emojis getting swallowed into the infinite algorithmic vortex..."
              </p>
            </div>

            <button
              onClick={handleSimulatedScroll}
              className="w-full py-1.5 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/40 rounded-xl text-xs font-bold text-cyan-300 flex items-center justify-center space-x-1.5 transition-all cursor-pointer active:scale-95"
            >
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              <span>Scroll Down ({postsGenerated} Posts Consumed • {scrollMeters}m)</span>
            </button>
          </div>

          {/* Live Scroll Velocity & Bottom Detection */}
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="bg-neutral-900/90 p-2.5 rounded-xl border border-white/10">
              <div className="text-[10px] text-neutral-400 uppercase font-mono">Vortex Velocity</div>
              <div className="text-sm font-bold text-red-500 font-mono">
                {isRunning ? `${Math.min(48, Math.round(tunnelSpeed * 42))} km/h` : '0 km/h (Paused)'}
              </div>
            </div>
            <div className="bg-neutral-900/90 p-2.5 rounded-xl border border-white/10">
              <div className="text-[10px] text-neutral-400 uppercase font-mono">Bottom Found?</div>
              <div className="text-sm font-bold text-cyan-400 font-mono">NEVER (0%)</div>
            </div>
          </div>

          {/* Tunnel Controls: Stop / Resume and Reset */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleToggleStartStop}
              className={`py-2 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-all border cursor-pointer active:scale-95 ${
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
              className="py-2 px-3 bg-neutral-900 hover:bg-neutral-800 border border-white/20 rounded-xl text-xs font-mono text-neutral-200 hover:text-white flex items-center justify-center space-x-1.5 transition-all shadow-md cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>RESET Speed</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation & Creator Regret Quote */}
      <div className="relative z-10 max-w-xl mx-auto text-center space-y-2.5 pb-2">
        <p className="bg-black/75 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-xl text-[11px] text-neutral-400 font-mono leading-relaxed">
          "In 2006, infinite scroll was invented to eliminate page pauses. Its creator later expressed deep regret for stripping humans of natural stopping points."
        </p>

        {/* Transition Navigation Controls */}
        <div className="flex items-center justify-center gap-3">
          {onScrollToBrain && (
            <button
              onClick={onScrollToBrain}
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-neutral-400 hover:text-cyan-300 bg-neutral-900/80 hover:bg-neutral-800/90 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Brain Scene</span>
            </button>
          )}

          {onScrollToNext && (
            <button
              onClick={onScrollToNext}
              className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-cyan-300 hover:text-white bg-cyan-950/70 hover:bg-cyan-900/90 border border-cyan-500/40 hover:border-cyan-400 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg transition-all cursor-pointer"
            >
              <span>Next: Frictionless Addiction</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
