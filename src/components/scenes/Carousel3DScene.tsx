import React, { useState, useEffect } from 'react';

export interface NewsItem {
  id: number;
  src: string;
  tag: string;
  title: string;
  verdict: string;
  factCheckLabel: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 1,
    src: '/image1.jpeg',
    tag: 'Policy & Regulation',
    title: 'Govt Mandates 2-Hour Daily Screen Time Limit',
    verdict: '100% FALSE CLAIM',
    factCheckLabel: 'GOVT SCREEN TIME • FABRICATED',
  },
  {
    id: 2,
    src: '/image2.jpeg',
    tag: 'Tech Industry',
    title: 'Meta to Launch Mandatory Paid Subscriptions',
    verdict: '100% FABRICATED',
    factCheckLabel: 'META SUBSCRIPTION • FALSE',
  },
  {
    id: 3,
    src: '/image3.jpeg',
    tag: 'City Updates',
    title: 'AMC Announces Strict New Guidelines For City Residents',
    verdict: '100% MISLEADING',
    factCheckLabel: 'AMC GUIDELINES • UNVERIFIED',
  },
];

interface Carousel3DSceneProps {
  isEmbedded?: boolean;
  className?: string;
  scrollProgress?: number; // 0.0 to 1.0 driving the newspaper page folds and finale
}

export const Carousel3DScene: React.FC<Carousel3DSceneProps> = ({
  isEmbedded = false,
  className = '',
  scrollProgress = 0,
}) => {
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const p = Math.max(0, Math.min(1, scrollProgress));

  // =========================================================================
  // SCROLL PROGRESS PHASES (0.0 to 1.0):
  // -------------------------------------------------------------------------
  // Phase 1: Image 1 (Sheet 1)
  //   0.00 -> 0.08: Flat, uncut, motionless, resting stable!
  //   0.08 -> 0.35: Middle-fold turn 1: Right half folds along center crease
  //                 to the left, revealing Image 2!
  // Phase 2: Image 2 (Sheet 2)
  //   0.35 -> 0.44: Flat, uncut, motionless, resting stable!
  //   0.44 -> 0.70: Middle-fold turn 2: Right half folds along center crease
  //                 to the left, revealing Image 3!
  // Phase 3: Image 3 (Sheet 3)
  //   0.70 -> 0.78: Flat, uncut, motionless, resting stable!
  // Phase 4: The Grand Finale (ALL 3 IMAGES APPEAR & SPREAD)
  //   0.78 -> 0.90: All 3 images smoothly spread out across the screen!
  //   0.90 -> 1.00: ONE SINGLE massive "FAKE NEWS" stamp spans across ALL 3 images!
  // =========================================================================

  // Turn 1 calculation (Image 1 -> Image 2)
  let turn1 = 0;
  if (p >= 0.08 && p <= 0.35) {
    const raw = (p - 0.08) / 0.27;
    turn1 = raw * raw * (3 - 2 * raw); // Smooth cubic hermite
  } else if (p > 0.35) {
    turn1 = 1;
  }

  // Turn 2 calculation (Image 2 -> Image 3)
  let turn2 = 0;
  if (p >= 0.44 && p <= 0.70) {
    const raw = (p - 0.44) / 0.26;
    turn2 = raw * raw * (3 - 2 * raw);
  } else if (p > 0.70) {
    turn2 = 1;
  }

  // Spread calculation for the finale (All 3 images appear side by side)
  let spreadT = 0;
  if (p >= 0.78) {
    const raw = Math.min(1, (p - 0.78) / 0.12); // 0.78 to 0.90
    spreadT = raw * raw * (3 - 2 * raw);
  }

  // Unified Fake News stamp slam calculation (Applied ONE single stamp across ALL 3 images)
  const isStampVisible = p >= 0.88;
  const stampProgress = isStampVisible ? Math.min(1, (p - 0.88) / 0.12) : 0;
  const stampScale = Math.max(1, 3.0 - stampProgress * 2.0);
  const stampOpacity = Math.min(1, stampProgress * 3.5);

  // Physical recoil vibration of the underlying news documents when the heavy stamp strikes
  let stampImpactShake = 0;
  if (stampProgress >= 0.65 && stampProgress <= 0.90) {
    const st = (stampProgress - 0.65) / 0.25;
    stampImpactShake = Math.sin(st * Math.PI * 5) * (1 - st) * 7;
  }

  const isDesktop = viewportWidth >= 768;

  return (
    <section
      className={`w-full h-full relative flex flex-col justify-center items-center overflow-hidden py-2 sm:py-4 px-2 select-none ${
        isEmbedded ? 'bg-transparent' : 'h-screen bg-black snap-start snap-always'
      } ${className}`}
    >
      {/* Background ambient lighting aura (shifts to intense dark red emergency aura on Fake News) */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: isStampVisible
            ? 'radial-gradient(ellipse at center, rgba(185, 28, 28, 0.28) 0%, rgba(0, 0, 0, 0.96) 75%)'
            : 'radial-gradient(ellipse at center, rgba(127, 29, 29, 0.12) 0%, rgba(0, 0, 0, 0.95) 75%)',
        }}
      />

      {/* ===================================================================== */}
      {/* MODE A: 3-IMAGE EXPANDED SPREAD & AUTHENTIC GOVERNMENT 'FAKE NEWS' STAMP */}
      {/* When the user scrolls to the finale, ALL 3 images spread out together */}
      {/* and ONE SINGLE official government rubber stamp slams across all 3 images! */}
      {/* Zero black box: all 3 news images remain 100% visible beneath the red ink! */}
      {/* ===================================================================== */}
      {spreadT > 0 && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none overflow-hidden"
          style={{
            opacity: spreadT,
            perspective: 2000,
          }}
        >
          <div className="relative w-full max-w-[1440px] h-[82vh] flex items-center justify-center">
            {/* The 3 Clean, Uncut News Images Spread Side-By-Side */}
            {NEWS_DATA.map((item, index) => {
              let transX = 0;
              let transY = 0;
              let rotZ = 0;
              let rotY = 0;
              let cardScale = 1;

              if (isDesktop) {
                // Desktop / Laptop: Sleek 3-panel horizontal triptych
                if (index === 0) {
                  transX = -spreadT * (viewportWidth > 1280 ? 33 : 31);
                  transY = -spreadT * 6;
                  rotZ = -spreadT * 2.5;
                  rotY = spreadT * 4;
                  cardScale = 1 - spreadT * 0.36;
                } else if (index === 1) {
                  transX = 0;
                  transY = -spreadT * 12;
                  rotZ = 0;
                  rotY = 0;
                  cardScale = 1 - spreadT * 0.32;
                } else {
                  transX = spreadT * (viewportWidth > 1280 ? 33 : 31);
                  transY = -spreadT * 6;
                  rotZ = spreadT * 2.5;
                  rotY = -spreadT * 4;
                  cardScale = 1 - spreadT * 0.36;
                }
              } else {
                // Mobile: Dynamic angled stack where all 3 remain visible
                if (index === 0) {
                  transX = -spreadT * 18;
                  transY = -spreadT * 22;
                  rotZ = -spreadT * 4;
                  cardScale = 1 - spreadT * 0.38;
                } else if (index === 1) {
                  transX = 0;
                  transY = -spreadT * 4;
                  rotZ = 0;
                  cardScale = 1 - spreadT * 0.34;
                } else {
                  transX = spreadT * 18;
                  transY = spreadT * 15;
                  rotZ = spreadT * 4;
                  cardScale = 1 - spreadT * 0.38;
                }
              }

              return (
                <div
                  key={item.id}
                  className="absolute will-change-transform rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] bg-neutral-900 overflow-hidden"
                  style={{
                    width: 'min(92vw, calc(72vh * 1.544))',
                    maxHeight: '72vh',
                    aspectRatio: '1558 / 1009',
                    transform: isDesktop
                      ? `translateX(${transX}vw) translateY(${transY + stampImpactShake}px) scale(${cardScale}) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`
                      : `translateX(${transX}vw) translateY(${transY + stampImpactShake}vh) scale(${cardScale}) rotateZ(${rotZ}deg)`,
                    zIndex: index === 1 ? 25 : 20,
                    transformOrigin: 'center center',
                  }}
                >
                  {/* Clean, 100% Uncut Full News Clipping Image */}
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover block select-none pointer-events-none"
                  />

                  {/* Center paper crease shadow */}
                  <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/25 z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-full w-8 bg-gradient-to-r from-transparent to-black/15 z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 w-8 bg-gradient-to-l from-transparent to-black/15 z-10 pointer-events-none" />
                </div>
              );
            })}

            {/* =============================================================== */}
            {/* AUTHENTIC GOVERNMENT RUBBER STAMP: "Fake News" */}
            {/* Strictly in ONE line (whitespace-nowrap) across all 3 news images! */}
            {/* Background is semi-transparent so all 3 news images remain visible! */}
            {/* =============================================================== */}
            {isStampVisible && (
              <div
                className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center will-change-transform px-4"
                style={{
                  transform: `scale(${stampScale}) rotate(-12deg)`,
                  opacity: stampOpacity,
                  transformOrigin: 'center center',
                }}
              >
                <div
                  className="border-[6px] sm:border-[8px] md:border-[12px] lg:border-[14px] border-red-600 text-red-600 font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-wider px-6 py-2 sm:px-10 sm:py-3.5 md:px-14 md:py-5 rounded-2xl sm:rounded-3xl bg-black/40 backdrop-blur-sm shadow-[0_0_60px_rgba(220,38,38,0.85)] whitespace-nowrap select-none flex items-center justify-center"
                  style={{
                    textShadow:
                      '0 0 25px rgba(220,38,38,0.95), 0 0 50px rgba(220,38,38,0.6)',
                    boxShadow:
                      'inset 0 0 30px rgba(220,38,38,0.4), 0 0 60px rgba(220,38,38,0.8)',
                  }}
                >
                  Fake News
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE B: 3D NEWSPAPER MIDDLE-FOLD TURNING STAGE (spreadT < 1) */}
      {/* Newspaper page folding directly on the pure uncut news images! */}
      {/* NO white background page: the turned flap carries the next news's left half! */}
      {/* ===================================================================== */}
      {spreadT < 1 && (
        <div
          className="relative flex items-center justify-center pointer-events-none overflow-visible will-change-transform"
          style={{
            width: 'min(92vw, calc(74vh * 1.544))',
            maxHeight: '74vh',
            aspectRatio: '1558 / 1009',
            perspective: 2600,
            opacity: 1 - spreadT,
          }}
        >
          {/* ================================================================= */}
          {/* SHEET 3: Image 3 (/image3.jpeg - Bottom Sheet) */}
          {/* ================================================================= */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] bg-neutral-900"
            style={{ zIndex: 10 }}
          >
            {/* 100% Full Uncut News Image 3 */}
            <img
              src={NEWS_DATA[2].src}
              alt={NEWS_DATA[2].title}
              className="w-full h-full object-cover block select-none pointer-events-none"
            />
            {/* Center crease */}
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/25 z-20 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-full w-8 bg-gradient-to-r from-transparent to-black/15 z-20 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-8 bg-gradient-to-l from-transparent to-black/15 z-20 pointer-events-none" />
          </div>

          {/* ================================================================= */}
          {/* SHEET 2: Image 2 (/image2.jpeg - Middle Sheet with Middle Fold) */}
          {/* ================================================================= */}
          {turn2 < 1 && (
            <div
              className="absolute inset-0 rounded-xl overflow-visible shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] bg-neutral-900"
              style={{
                zIndex: 20,
                transformStyle: 'preserve-3d',
              }}
            >
              {turn2 === 0 ? (
                // RESTING FLAT SHEET 2 (100% Uncut Image 2)
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    src={NEWS_DATA[1].src}
                    alt={NEWS_DATA[1].title}
                    className="w-full h-full object-cover block select-none pointer-events-none"
                  />
                  <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/25 z-20 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-full w-8 bg-gradient-to-r from-transparent to-black/15 z-20 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 w-8 bg-gradient-to-l from-transparent to-black/15 z-20 pointer-events-none" />
                </div>
              ) : (
                // 3D MIDDLE FOLD SHEET 2 (Right half folds over center crease)
                <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Left Half (Underneath: transitions smoothly to Image 3's left half as turn completes) */}
                  <div className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden z-10 rounded-l-xl">
                    <div className="absolute top-0 bottom-0 left-0 w-[200%] h-full">
                      <img
                        src={turn2 > 0.5 ? NEWS_DATA[2].src : NEWS_DATA[1].src}
                        alt={turn2 > 0.5 ? NEWS_DATA[2].title : NEWS_DATA[1].title}
                        className="w-full h-full object-cover block select-none pointer-events-none"
                      />
                    </div>
                    {/* Shadow deepening on left as right folds over */}
                    {turn2 > 0.35 && (
                      <div
                        className="absolute inset-0 bg-black pointer-events-none"
                        style={{ opacity: (turn2 - 0.35) * 0.45 }}
                      />
                    )}
                  </div>

                  {/* Right Half (Folds and turns across the middle crease to the left!) */}
                  <div
                    className="absolute top-0 bottom-0 left-1/2 w-1/2 overflow-visible z-30 will-change-transform rounded-r-xl"
                    style={{
                      transformOrigin: 'left center', // The center crease!
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${-turn2 * 180}deg) rotateZ(${-Math.sin(turn2 * Math.PI) * 3.5}deg) scale(${
                        1 - Math.sin(turn2 * Math.PI) * 0.02
                      })`,
                    }}
                  >
                    {/* Front of right half: Image 2 right half (visible 0 to 90 deg) */}
                    <div
                      className="absolute inset-0 overflow-hidden rounded-r-xl"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="absolute top-0 bottom-0 left-[-100%] w-[200%] h-full">
                        <img
                          src={NEWS_DATA[1].src}
                          alt={NEWS_DATA[1].title}
                          className="w-full h-full object-cover block select-none pointer-events-none"
                        />
                      </div>
                      {/* Spine crease shadow gradient */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none"
                        style={{ opacity: Math.sin(turn2 * Math.PI) * 0.65 }}
                      />
                    </div>

                    {/* Back of right half: THE LEFT HALF OF NEXT IMAGE (Image 3: /image3.jpeg) */}
                    {/* NO white background page! It reveals the left side of the next news! */}
                    <div
                      className="absolute inset-0 rounded-l-xl overflow-hidden"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <div className="absolute top-0 bottom-0 left-0 w-[200%] h-full">
                        <img
                          src={NEWS_DATA[2].src}
                          alt={NEWS_DATA[2].title}
                          className="w-full h-full object-cover block select-none pointer-events-none"
                        />
                      </div>
                      {/* Spine crease shadow gradient on fold */}
                      <div
                        className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-transparent pointer-events-none"
                        style={{ opacity: Math.sin(turn2 * Math.PI) * 0.55 }}
                      />
                      <div
                        className="absolute inset-0 bg-black pointer-events-none"
                        style={{ opacity: Math.max(0, (1 - turn2) * 0.35) }}
                      />
                    </div>
                  </div>

                  {/* Underneath right side: Sheet 3 right half is revealed */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-1/2 overflow-hidden z-0 rounded-r-xl">
                    <div className="absolute top-0 bottom-0 left-[-100%] w-[200%] h-full">
                      <img
                        src={NEWS_DATA[2].src}
                        alt={NEWS_DATA[2].title}
                        className="w-full h-full object-cover block select-none pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Center Crease Divider */}
                  <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/40 z-40 pointer-events-none" />
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* SHEET 1: Image 1 (/image1.jpeg - Top Sheet with Middle Fold) */}
          {/* ================================================================= */}
          {turn1 < 1 && (
            <div
              className="absolute inset-0 rounded-xl overflow-visible shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] bg-neutral-900"
              style={{
                zIndex: 30,
                transformStyle: 'preserve-3d',
              }}
            >
              {turn1 === 0 ? (
                // RESTING FLAT SHEET 1 (100% Uncut Image 1, stable & motionless)
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    src={NEWS_DATA[0].src}
                    alt={NEWS_DATA[0].title}
                    className="w-full h-full object-cover block select-none pointer-events-none"
                  />
                  <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/25 z-20 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-full w-8 bg-gradient-to-r from-transparent to-black/15 z-20 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 w-8 bg-gradient-to-l from-transparent to-black/15 z-20 pointer-events-none" />
                </div>
              ) : (
                // 3D MIDDLE FOLD SHEET 1 (Right half folds over center crease)
                <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Left Half (Underneath: transitions smoothly to Image 2's left half as turn completes) */}
                  <div className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden z-10 rounded-l-xl">
                    <div className="absolute top-0 bottom-0 left-0 w-[200%] h-full">
                      <img
                        src={turn1 > 0.5 ? NEWS_DATA[1].src : NEWS_DATA[0].src}
                        alt={turn1 > 0.5 ? NEWS_DATA[1].title : NEWS_DATA[0].title}
                        className="w-full h-full object-cover block select-none pointer-events-none"
                      />
                    </div>
                    {/* Shadow deepening on left as right folds over */}
                    {turn1 > 0.35 && (
                      <div
                        className="absolute inset-0 bg-black pointer-events-none"
                        style={{ opacity: (turn1 - 0.35) * 0.45 }}
                      />
                    )}
                  </div>

                  {/* Right Half (Folds and turns across the middle crease to the left!) */}
                  <div
                    className="absolute top-0 bottom-0 left-1/2 w-1/2 overflow-visible z-30 will-change-transform rounded-r-xl"
                    style={{
                      transformOrigin: 'left center', // The center crease!
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${-turn1 * 180}deg) rotateZ(${-Math.sin(turn1 * Math.PI) * 3.5}deg) scale(${
                        1 - Math.sin(turn1 * Math.PI) * 0.02
                      })`,
                    }}
                  >
                    {/* Front of right half: Image 1 right half (visible 0 to 90 deg) */}
                    <div
                      className="absolute inset-0 overflow-hidden rounded-r-xl"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="absolute top-0 bottom-0 left-[-100%] w-[200%] h-full">
                        <img
                          src={NEWS_DATA[0].src}
                          alt={NEWS_DATA[0].title}
                          className="w-full h-full object-cover block select-none pointer-events-none"
                        />
                      </div>
                      {/* Spine crease shadow gradient */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none"
                        style={{ opacity: Math.sin(turn1 * Math.PI) * 0.65 }}
                      />
                    </div>

                    {/* Back of right half: THE LEFT HALF OF NEXT IMAGE (Image 2: /image2.jpeg) */}
                    {/* NO white background page! It reveals the left side of the next news! */}
                    <div
                      className="absolute inset-0 rounded-l-xl overflow-hidden"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <div className="absolute top-0 bottom-0 left-0 w-[200%] h-full">
                        <img
                          src={NEWS_DATA[1].src}
                          alt={NEWS_DATA[1].title}
                          className="w-full h-full object-cover block select-none pointer-events-none"
                        />
                      </div>
                      {/* Spine crease shadow gradient on fold */}
                      <div
                        className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-transparent pointer-events-none"
                        style={{ opacity: Math.sin(turn1 * Math.PI) * 0.55 }}
                      />
                      <div
                        className="absolute inset-0 bg-black pointer-events-none"
                        style={{ opacity: Math.max(0, (1 - turn1) * 0.35) }}
                      />
                    </div>
                  </div>

                  {/* Underneath right side: Sheet 2 right half is revealed */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-1/2 overflow-hidden z-0 rounded-r-xl">
                    <div className="absolute top-0 bottom-0 left-[-100%] w-[200%] h-full">
                      <img
                        src={NEWS_DATA[1].src}
                        alt={NEWS_DATA[1].title}
                        className="w-full h-full object-cover block select-none pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Center Crease Divider */}
                  <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/40 z-40 pointer-events-none" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
