import React, { useState, useEffect } from 'react';
import { AppEcosystemCanvas } from '../3d/AppEcosystemCanvas';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../../utils/soundEngine';

interface AppItem {
  name: string;
  color: string;
  borderColor: string;
  glowClass: string;
  badgeBg: string;
  iconIndex: number;
}

interface AppEcosystemSceneProps {
  isEmbedded?: boolean;
  phoneZoomProgress?: number; // 0.0 = super zoomed in (12x, no outline), 1.0 = normal settled size
  activeAppIndex?: number | null; // null = no app, 0 = Instagram, 1 = YouTube, 2 = Facebook, 3 = WhatsApp
  onNextScene?: () => void;
}

export const AppEcosystemScene: React.FC<AppEcosystemSceneProps> = ({
  isEmbedded = false,
  phoneZoomProgress,
  activeAppIndex,
  onNextScene,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dynamic phone zoom-out calculation from scroll progress
  const zoomP = phoneZoomProgress !== undefined ? Math.max(0, Math.min(1, phoneZoomProgress)) : 1.0;
  // Smooth cubic ease out
  const easeZoom = 1 - Math.pow(1 - zoomP, 3);

  // Settled target dimensions: perfectly proportioned phone with clean breathing room
  const settledScale = isMobile ? 0.95 : 1.12;
  const settledOffsetX = isMobile ? 0 : -1.6;
  const settledOffsetY = isMobile ? -0.8 : -1.15;

  // Starting at 12.0x (huge screen glass only, 0 outline) and zooming out to settled dimensions
  const currentZoomScale = phoneZoomProgress !== undefined ? 12.0 - easeZoom * (12.0 - settledScale) : settledScale;
  const currentOffsetX = phoneZoomProgress !== undefined ? 0 + easeZoom * settledOffsetX : settledOffsetX;
  const currentOffsetY = phoneZoomProgress !== undefined ? 0 + easeZoom * settledOffsetY : settledOffsetY;
  const currentOutlineOpacity = phoneZoomProgress !== undefined ? Math.max(0, (zoomP - 0.25) / 0.75) * 0.9 : 0.9;
  const headerOpacity = phoneZoomProgress !== undefined ? Math.max(0, (zoomP - 0.30) / 0.70) : 1.0;
  const headerTranslateY = phoneZoomProgress !== undefined ? (1 - headerOpacity) * -30 : 0;

  const apps: AppItem[] = [
    {
      name: 'Instagram',
      color: 'text-pink-400',
      borderColor: 'border-pink-500/60',
      glowClass: 'shadow-[0_0_50px_rgba(236,72,153,0.35)]',
      badgeBg: 'bg-pink-950/70 text-pink-300 border-pink-500/50',
      iconIndex: 0,
    },
    {
      name: 'YouTube',
      color: 'text-red-500',
      borderColor: 'border-red-500/60',
      glowClass: 'shadow-[0_0_50px_rgba(239,68,68,0.35)]',
      badgeBg: 'bg-red-950/70 text-red-300 border-red-500/50',
      iconIndex: 1,
    },
    {
      name: 'Facebook',
      color: 'text-blue-400',
      borderColor: 'border-blue-500/60',
      glowClass: 'shadow-[0_0_50px_rgba(59,130,246,0.35)]',
      badgeBg: 'bg-blue-950/70 text-blue-300 border-blue-500/50',
      iconIndex: 2,
    },
    {
      name: 'WhatsApp',
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/60',
      glowClass: 'shadow-[0_0_50px_rgba(16,185,129,0.35)]',
      badgeBg: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50',
      iconIndex: 3,
    },
  ];

  // Pure scroll-driven app selection (removes click requirement)
  const currentApp =
    activeAppIndex !== undefined && activeAppIndex !== null && activeAppIndex >= 0 && activeAppIndex < apps.length
      ? apps[activeAppIndex]
      : null;

  return (
    <section
      className={`w-full text-white relative flex flex-col justify-between py-6 sm:py-8 px-4 overflow-hidden select-none pointer-events-none group ${
        isEmbedded ? 'h-full bg-transparent' : 'h-screen bg-black snap-start snap-always shrink-0'
      }`}
    >
      {/* 3D Canvas: Dynamic phone zoom-out from center glass to left docked */}
      <AppEcosystemCanvas
        exploded={true}
        phoneVisible={true}
        zoomScale={currentZoomScale}
        offsetX={currentOffsetX}
        offsetY={currentOffsetY}
        outlineOpacity={currentOutlineOpacity}
        selectedAppIndex={currentApp ? currentApp.iconIndex : null}
      />

      {/* Header - Visible at top, slides and fades in smoothly as phone zooms out */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerTranslateY}px)`,
        }}
        className="relative z-20 max-w-4xl mx-auto text-center pt-2 sm:pt-4 pointer-events-none transition-all duration-150"
      >
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-snug">
          Designed to capture every second of your attention.
        </h2>
      </div>

      {/* Right Side App Name Only - Positioned comfortably to the right without overlapping phone */}
      {zoomP >= 0.75 && (
        <div className="relative z-20 w-full max-w-6xl mx-auto flex justify-end items-center flex-1 pr-6 sm:pr-14 md:pr-24 pointer-events-none my-auto">
          <AnimatePresence mode="wait">
            {currentApp && (
              <motion.div
                key={currentApp.name}
                initial={{ opacity: 0, x: 40, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.92 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto"
              >
                <div
                  className={`px-8 py-5 sm:px-10 sm:py-6 rounded-3xl border-2 ${currentApp.borderColor} bg-neutral-950/90 backdrop-blur-2xl shadow-2xl ${currentApp.glowClass} flex items-center justify-center`}
                >
                  <span
                    className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-wide ${currentApp.color}`}
                  >
                    {currentApp.name}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Bottom spacer for balance */}
      <div className="h-6 pointer-events-none" />
    </section>
  );
};

