import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { soundEngine } from '../../utils/soundEngine';

interface Props {
  onScrollToNext: () => void;
}

export const TheLoopOpeningScene: React.FC<Props> = ({ onScrollToNext }) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleClick = () => {
    soundEngine.playSubBassImpact();
    soundEngine.playNotificationPing();
    onScrollToNext();
  };

  // Subtle Parallax Tilt calculations
  const rotateX = (mousePos.y - 0.5) * -12;
  const rotateY = (mousePos.x - 0.5) * 16;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      className="h-screen w-full bg-black flex flex-col justify-center items-center relative overflow-hidden px-4 snap-start snap-always shrink-0 select-none cursor-pointer group"
    >
      {/* Dynamic Ambient Cinematic Glow responsive to cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(220, 38, 38, 0.18) 0%, rgba(15, 5, 5, 0.6) 40%, #000000 75%)`,
        }}
      />

      {/* Hypnotic Subtle Concentric Loops (The Trap Effect) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-30">
        <div className="w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] border border-red-500/15 rounded-full animate-ping [animation-duration:6s]" />
        <div className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] border border-red-500/10 rounded-full animate-pulse [animation-duration:4s]" />
        <div className="absolute w-[700px] h-[700px] sm:w-[950px] sm:h-[950px] border border-white/[0.03] rounded-full" />
      </div>

      {/* Minimalist Centerpiece: Strictly "the loop" */}
      <motion.div
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        className="relative z-10 flex flex-col items-center justify-center text-center transition-transform duration-200"
      >
        {/* "the" — refined, understated, short size compared to LOOP */}
        <motion.div
          initial={{ opacity: 0, y: -10, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.7em' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm md:text-base font-mono uppercase text-neutral-400 font-medium pl-3 sm:pl-4 mb-2 sm:mb-4 select-none flex items-center space-x-3"
        >
          <span className="w-5 sm:w-8 h-[1px] bg-neutral-700" />
          <span>the</span>
          <span className="w-5 sm:w-8 h-[1px] bg-neutral-700" />
        </motion.div>

        {/* "LOOP" — The Magnetic Visual Masterpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center relative select-none"
        >
          {/* Ambient Behind-Word Volumetric Red Bloom */}
          <div
            className={`absolute -inset-10 rounded-full bg-red-600/20 blur-[90px] pointer-events-none transition-all duration-700 ${
              isHovered ? 'opacity-100 scale-110' : 'opacity-70 scale-100'
            }`}
          />

          {/* Letter: L */}
          <span className="text-8xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500 uppercase leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] pr-1 sm:pr-2">
            L
          </span>

          {/* INFINITY SYMBOL (00 / OO) — Custom Crafted Double Möbius Laser Track */}
          <div className="relative inline-flex items-center justify-center px-1 sm:px-2 md:px-3 mx-1">
            {/* Core SVG Canvas */}
            <svg
              viewBox="0 0 240 120"
              className="w-28 h-14 sm:w-44 sm:h-22 md:w-60 md:h-30 lg:w-72 lg:h-36 drop-shadow-[0_0_35px_rgba(239,68,68,0.9)] overflow-visible"
            >
              <defs>
                {/* Flowing Laser Gradient */}
                <linearGradient id="laserLoopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="25%" stopColor="#ff4d6d" />
                  <stop offset="50%" stopColor="#fb923c" />
                  <stop offset="75%" stopColor="#ff0055" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>

                <linearGradient id="innerWhiteCore" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#ffe4e6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
                </linearGradient>

                {/* Multilayer Bloom Filter */}
                <filter id="cinematicNeonGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feGaussianBlur stdDeviation="14" result="outerBlur" />
                  <feMerge>
                    <feMergeNode in="outerBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Exact Mathematically Balanced Lemniscate Path */}
              {/* Box 240x120, Center (120, 60), Left loop center (60, 60), Right loop center (180, 60) */}
              <g filter="url(#cinematicNeonGlow)">
                {/* Deep Outer Halo Path */}
                <path
                  d="M 120,60 C 90,20 30,20 30,60 C 30,100 90,100 120,60 C 150,20 210,20 210,60 C 210,100 150,100 120,60 Z"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="18"
                  strokeOpacity="0.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Vivid Main Colored Laser Tube */}
                <path
                  d="M 120,60 C 90,20 30,20 30,60 C 30,100 90,100 120,60 C 150,20 210,20 210,60 C 210,100 150,100 120,60 Z"
                  fill="none"
                  stroke="url(#laserLoopGrad)"
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all"
                />

                {/* Ultra-hot White-plasma Core Filament */}
                <path
                  d="M 120,60 C 90,20 30,20 30,60 C 30,100 90,100 120,60 C 150,20 210,20 210,60 C 210,100 150,100 120,60 Z"
                  fill="none"
                  stroke="url(#innerWhiteCore)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Primary High-speed Orbiting Dopamine Pulse (White Hot Light) */}
              <circle r="4.5" fill="#ffffff" className="drop-shadow-[0_0_12px_#ffffff]">
                <animateMotion
                  path="M 120,60 C 90,20 30,20 30,60 C 30,100 90,100 120,60 C 150,20 210,20 210,60 C 210,100 150,100 120,60 Z"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Trailing Secondary Energy Spark (Trailing at 50% phase) */}
              <circle r="3" fill="#ff7170" opacity="0.85">
                <animateMotion
                  path="M 120,60 C 90,20 30,20 30,60 C 30,100 90,100 120,60 C 150,20 210,20 210,60 C 210,100 150,100 120,60 Z"
                  dur="3.2s"
                  begin="1.6s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          {/* Letter: P */}
          <span className="text-8xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500 uppercase leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] pl-1 sm:pl-2">
            P
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
