import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, QrCode } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';
import { MENTIMETER_CONFIG } from './QuizTimeScene';
import { Carousel3DScene } from './Carousel3DScene';
import { AppEcosystemScene } from './AppEcosystemScene';

interface Props {
  onScrollToNext: () => void;
  onScrollToQuiz?: () => void;
  onScrollToNews?: () => void;
  onScrollToPhone?: () => void;
}

export const TheLoopOpeningScene: React.FC<Props> = ({
  onScrollToNext,
  onScrollToQuiz,
  onScrollToNews,
  onScrollToPhone,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [showLargeQr, setShowLargeQr] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Layout Refs for dynamic measurement
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const lRef = useRef<HTMLSpanElement>(null);
  const pRef = useRef<HTMLSpanElement>(null);

  // Viewport dimensions
  const [viewport, setViewport] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // Stored layout offsets (screen pixels)
  const [offsets, setOffsets] = useState({
    svgWidth: 240,
    svgHeight: 120,
    lDockedX: -140,
    lDockedY: 0,
    pDockedX: 140,
    pDockedY: 0,
  });

  // Scroll Progress & Smoothing
  const targetProgressRef = useRef(0);
  const displayProgressRef = useRef(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const hasDockedSoundPlayedRef = useRef(false);
  const hasGlitchSoundPlayedRef = useRef(false);
  const hasBounceSoundPlayedRef = useRef(false);
  const hasNewsLandedSoundPlayedRef = useRef(false);
  const hasPage1TurnSoundPlayedRef = useRef(false);
  const hasPage2TurnSoundPlayedRef = useRef(false);
  const hasFakeNewsStampSoundPlayedRef = useRef(false);
  const hasZoomOutSoundPlayedRef = useRef(false);
  const hasPhoneSettledSoundPlayedRef = useRef(false);
  const hasInstagramSoundPlayedRef = useRef(false);
  const hasYouTubeSoundPlayedRef = useRef(false);
  const hasFacebookSoundPlayedRef = useRef(false);
  const hasWhatsAppSoundPlayedRef = useRef(false);

  // Measure untransformed docking positions
  const updateMeasurements = useCallback(() => {
    if (!svgWrapperRef.current || !lRef.current || !pRef.current) return;
    const svgW = svgWrapperRef.current.offsetWidth;
    const svgH = svgWrapperRef.current.offsetHeight;
    const lW = lRef.current.offsetWidth;
    const pW = pRef.current.offsetWidth;

    if (svgW === 0) return;

    // Center-to-center rest distances
    const lDockedX = -(svgW / 2 + lW / 2);
    const pDockedX = svgW / 2 + pW / 2;

    setOffsets({
      svgWidth: svgW,
      svgHeight: svgH,
      lDockedX,
      lDockedY: 0,
      pDockedX,
      pDockedY: 0,
    });

    setViewport({
      w: window.innerWidth,
      h: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    updateMeasurements();
    const handleResize = () => {
      updateMeasurements();
    };
    window.addEventListener('resize', handleResize);
    const t1 = setTimeout(updateMeasurements, 150);
    const t2 = setTimeout(updateMeasurements, 600);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [updateMeasurements]);

  // Track parent scroll container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const stickyWrapper =
        containerRef.current.closest('.sticky-scene-container') ||
        containerRef.current.parentElement;
      const target = stickyWrapper || containerRef.current;
      const rect = target.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = rect.height - windowHeight;

      if (scrollableDistance > 0) {
        const raw = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
        targetProgressRef.current = raw;
      } else {
        targetProgressRef.current = 0;
      }
    };

    const scrollContainer =
      containerRef.current?.closest('.overflow-y-scroll') || window;
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    // Smooth 60fps / 120fps interpolation loop with cinematic damping
    let animId: number;
    const animate = () => {
      const current = displayProgressRef.current;
      const target = targetProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0002) {
        const next = current + diff * 0.085;
        displayProgressRef.current = next;
        setDisplayProgress(next);

        // Audio cue on letter docking
        if (next >= 0.28 && !hasDockedSoundPlayedRef.current) {
          hasDockedSoundPlayedRef.current = true;
          soundEngine.playClickTone();
        } else if (next < 0.20) {
          hasDockedSoundPlayedRef.current = false;
        }

        // Cyber Glitch audio cue on entering the glitch transition phase
        if (next >= 0.36 && !hasGlitchSoundPlayedRef.current) {
          hasGlitchSoundPlayedRef.current = true;
          soundEngine.playGlitchSound();
        } else if (next < 0.30) {
          hasGlitchSoundPlayedRef.current = false;
        }

        // Bounce Transition audio cue as QR screen launches towards bottom-right
        if (next >= 0.60 && !hasBounceSoundPlayedRef.current) {
          hasBounceSoundPlayedRef.current = true;
          soundEngine.playClickTone();
        } else if (next < 0.54) {
          hasBounceSoundPlayedRef.current = false;
        }

        // First News bounce landing impact audio cue as it settles at center
        if (next >= 0.69 && !hasNewsLandedSoundPlayedRef.current) {
          hasNewsLandedSoundPlayedRef.current = true;
          soundEngine.playSubBassImpact();
        } else if (next < 0.62) {
          hasNewsLandedSoundPlayedRef.current = false;
        }

        // Newspaper page 1 turn rustle sound (Middle-fold page turn)
        if (next >= 0.72 && !hasPage1TurnSoundPlayedRef.current) {
          hasPage1TurnSoundPlayedRef.current = true;
          soundEngine.playPaperTurnSound();
        } else if (next < 0.69) {
          hasPage1TurnSoundPlayedRef.current = false;
        }

        // Newspaper page 2 turn rustle sound (Middle-fold page turn)
        if (next >= 0.75 && !hasPage2TurnSoundPlayedRef.current) {
          hasPage2TurnSoundPlayedRef.current = true;
          soundEngine.playPaperTurnSound();
        } else if (next < 0.72) {
          hasPage2TurnSoundPlayedRef.current = false;
        }

        // Official government rubber stamp impact sound (Slam down across ALL 3 images)
        if (next >= 0.78 && !hasFakeNewsStampSoundPlayedRef.current) {
          hasFakeNewsStampSoundPlayedRef.current = true;
          soundEngine.playRubberStampSound();
        } else if (next < 0.76) {
          hasFakeNewsStampSoundPlayedRef.current = false;
        }

        // Cinematic Zoom-out vacuum suck sound (Fake news shrinks into mobile phone)
        if (next >= 0.80 && !hasZoomOutSoundPlayedRef.current) {
          hasZoomOutSoundPlayedRef.current = true;
          soundEngine.playZoomOutSuckSound();
        } else if (next < 0.78) {
          hasZoomOutSoundPlayedRef.current = false;
        }

        // Phone settled impact tone
        if (next >= 0.85 && !hasPhoneSettledSoundPlayedRef.current) {
          hasPhoneSettledSoundPlayedRef.current = true;
          soundEngine.playClickTone();
        } else if (next < 0.83) {
          hasPhoneSettledSoundPlayedRef.current = false;
        }

        // Instagram notification ping on scroll
        if (next >= 0.88 && !hasInstagramSoundPlayedRef.current) {
          hasInstagramSoundPlayedRef.current = true;
          soundEngine.playNotificationPing();
        } else if (next < 0.86) {
          hasInstagramSoundPlayedRef.current = false;
        }

        // YouTube notification ping on scroll
        if (next >= 0.91 && !hasYouTubeSoundPlayedRef.current) {
          hasYouTubeSoundPlayedRef.current = true;
          soundEngine.playNotificationPing();
        } else if (next < 0.89) {
          hasYouTubeSoundPlayedRef.current = false;
        }

        // Facebook notification ping on scroll
        if (next >= 0.94 && !hasFacebookSoundPlayedRef.current) {
          hasFacebookSoundPlayedRef.current = true;
          soundEngine.playNotificationPing();
        } else if (next < 0.92) {
          hasFacebookSoundPlayedRef.current = false;
        }

        // WhatsApp notification ping on scroll
        if (next >= 0.97 && !hasWhatsAppSoundPlayedRef.current) {
          hasWhatsAppSoundPlayedRef.current = true;
          soundEngine.playNotificationPing();
        } else if (next < 0.95) {
          hasWhatsAppSoundPlayedRef.current = false;
        }
      } else if (Math.abs(diff) <= 0.0002 && current !== target) {
        displayProgressRef.current = target;
        setDisplayProgress(target);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (showLargeQr) return;
    if (displayProgress < 0.44) {
      if (onScrollToQuiz) {
        onScrollToQuiz();
      } else {
        onScrollToNext();
      }
    } else if (displayProgress < 0.70) {
      if (onScrollToNews) {
        onScrollToNews();
      } else {
        onScrollToNext();
      }
    } else if (displayProgress < 0.90) {
      if (onScrollToPhone) {
        onScrollToPhone();
      } else {
        onScrollToNext();
      }
    } else {
      onScrollToNext();
    }
  };

  const toggleModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundEngine.playNotificationPing();
    setShowLargeQr((prev) => !prev);
  };

  // Subtle Parallax Tilt
  const rotateX = (mousePos.y - 0.5) * -10;
  const rotateY = (mousePos.x - 0.5) * 14;

  // -------------------------------------------------------------------------
  // Screen-Wide Lemniscate (Infinity Loop: ∞) Flight Mathematics
  // -------------------------------------------------------------------------
  const ampX = Math.max(180, Math.min(viewport.w * 0.42, 680));
  const ampY = Math.max(90, Math.min(viewport.h * 0.30, 300));

  let opacity_L = 0;
  let opacity_P = 0;
  let scale_L = 0;
  let scale_P = 0;
  let transX_L = 0;
  let transY_L = 0;
  let transX_P = 0;
  let transY_P = 0;
  let tilt_L = 0;
  let tilt_P = 0;
  let isDocked = false;

  const trailPositions: Array<{ x: number; y: number; opacity: number; size: number }> = [];

  // =========================================================================
  // SCENE PHASES TIMELINE:
  // 0.00 -> 0.02: Initial resting void (only glowing ∞ in center)
  // 0.02 -> 0.22: Screen-wide infinity orbit of L and P
  // 0.22 -> 0.30: Smooth docking into "L ∞ P" (LOOP)
  // 0.30 -> 0.35: LOOP locked & glowing in full glory
  // 0.35 -> 0.44: Apple-Grade Glitch Transition into Live Quiz
  // 0.44 -> 0.60: STABLE ZONE 1: Live Quiz & QR Code in full prominence
  //               (16% wide rock-solid resting zone! Zero jitter or movement)
  // 0.60 -> 0.70: SLOW SMOOTH BOUNCE TRANSITION:
  //               - QR code screen exits with bounce to bottom-right corner!
  //               - First news appears with bounce from left-upper corner!
  // 0.70 -> 0.80: STABLE ZONE 2: First News Broadsheet is 100% STABLE & RESTED!
  //               (10% wide rock-solid resting zone! No folding or peeling yet)
  // 0.80 -> 1.00: 3D NEWSPAPER MIDDLE-FOLD READING EXPERIENCE:
  //               - One-by-one realistic page folds driven by scrolling!
  //               - Sheet 1 -> Sheet 2 -> Sheet 3 -> "Fake News" Stamp!
  // =========================================================================

  // Calculate Glitch & Cross-transition variables
  let loopOpacity = 1;
  let loopScale = 1;
  let loopGlitchIntensity = 0;
  let loopJitterX = 0;
  let loopJitterY = 0;

  let quizOpacity = 0;
  let quizScale = 0.88;
  let quizGlitchIntensity = 0;
  let quizJitterX = 0;

  // Scroll-Driven Bounce Transition Variables (Quiz -> First News)
  let quizExitX = 0;
  let quizExitY = 0;
  let quizExitRotate = 0;
  let quizExitScale = 1;
  let quizExitOpacity = 1;

  let newsX = 0;
  let newsY = 0;
  let newsRotate = 0;
  let newsScale = 1;
  let newsOpacity = 0;
  let newsReadingProgress = 0;
  let phoneZoomProgress = 0;
  let activeAppIndex: number | null = null;

  if (displayProgress <= 0.02) {
    // 1. Initial State: Only ∞ loop visible, L and P disappeared
    opacity_L = 0;
    opacity_P = 0;
    scale_L = 0;
    scale_P = 0;
    loopOpacity = 1;
    quizOpacity = 0;
  } else if (displayProgress < 0.22) {
    // 2. Grand Screen-Wide Infinity Orbit Phase
    const orbitProgress = (displayProgress - 0.02) / 0.20; // 0 to 1
    const alpha = Math.min(1, orbitProgress * 3.5);
    opacity_L = alpha;
    opacity_P = alpha;

    const baseScale = 0.26 + orbitProgress * 0.66; // 0.26 -> 0.92
    scale_L = baseScale;
    scale_P = baseScale;
    loopOpacity = 1;
    quizOpacity = 0;

    const cycles = 1.5;
    const t_L = 1.5 * Math.PI - (1 - orbitProgress) * (cycles * 2 * Math.PI);
    const t_P = 0.5 * Math.PI - (1 - orbitProgress) * (cycles * 2 * Math.PI);

    const rawX_L = ampX * Math.sin(t_L);
    const rawY_L = ampY * Math.sin(2 * t_L);
    const rawX_P = ampX * Math.sin(t_P);
    const rawY_P = ampY * Math.sin(2 * t_P);

    transX_L = rawX_L - offsets.lDockedX;
    transY_L = rawY_L - offsets.lDockedY;
    transX_P = rawX_P - offsets.pDockedX;
    transY_P = rawY_P - offsets.pDockedY;

    tilt_L = Math.cos(t_L) * 16;
    tilt_P = Math.cos(t_P) * 16;

    if (orbitProgress > 0.08) {
      const trail1_L = t_L + 0.12;
      const trail2_L = t_L + 0.24;
      const trail1_P = t_P + 0.12;
      const trail2_P = t_P + 0.24;

      trailPositions.push(
        { x: ampX * Math.sin(trail1_L), y: ampY * Math.sin(2 * trail1_L), opacity: alpha * 0.6, size: 5 },
        { x: ampX * Math.sin(trail2_L), y: ampY * Math.sin(2 * trail2_L), opacity: alpha * 0.3, size: 3.5 },
        { x: ampX * Math.sin(trail1_P), y: ampY * Math.sin(2 * trail1_P), opacity: alpha * 0.6, size: 5 },
        { x: ampX * Math.sin(trail2_P), y: ampY * Math.sin(2 * trail2_P), opacity: alpha * 0.3, size: 3.5 }
      );
    }
  } else if (displayProgress < 0.30) {
    // 3. Smooth Docking Transition into LOOP
    const dockRaw = (displayProgress - 0.22) / 0.08;
    const dockEase = dockRaw * dockRaw * (3 - 2 * dockRaw);

    opacity_L = 1;
    opacity_P = 1;
    scale_L = 0.92 + dockEase * 0.08;
    scale_P = 0.92 + dockEase * 0.08;

    const curX_L = (1 - dockEase) * -ampX + dockEase * offsets.lDockedX;
    const curY_L = (1 - dockEase) * 0 + dockEase * offsets.lDockedY;
    transX_L = curX_L - offsets.lDockedX;
    transY_L = curY_L - offsets.lDockedY;

    const curX_P = (1 - dockEase) * ampX + dockEase * offsets.pDockedX;
    const curY_P = (1 - dockEase) * 0 + dockEase * offsets.pDockedY;
    transX_P = curX_P - offsets.pDockedX;
    transY_P = curY_P - offsets.pDockedY;

    tilt_L = (1 - dockEase) * -8;
    tilt_P = (1 - dockEase) * 8;
  } else if (displayProgress < 0.35) {
    // 4. Fully Docked "L ∞ P" (LOOP)
    opacity_L = 1;
    opacity_P = 1;
    scale_L = 1;
    scale_P = 1;
    transX_L = 0;
    transY_L = 0;
    transX_P = 0;
    transY_P = 0;
    tilt_L = 0;
    tilt_P = 0;
    isDocked = true;
    loopOpacity = 1;
    quizOpacity = 0;
  } else if (displayProgress < 0.44) {
    // 5. THE APPLE-GRADE GLITCH TRANSITION:
    // LOOP dissolves with chromatic digital glitch, while Quiz materializes gracefully!
    isDocked = true;
    const transPhase = Math.max(0, Math.min(1, (displayProgress - 0.35) / 0.09));
    const smoothEase = transPhase * transPhase * (3 - 2 * transPhase); // hermite smooth cubic

    loopGlitchIntensity = Math.sin(transPhase * Math.PI);
    quizGlitchIntensity = Math.sin(transPhase * Math.PI);

    loopOpacity = Math.max(0, 1 - smoothEase);
    loopScale = 1 - transPhase * 0.06;
    loopJitterX = loopGlitchIntensity > 0.04 ? Math.sin(displayProgress * 90) * 7 * loopGlitchIntensity : 0;
    loopJitterY = loopGlitchIntensity > 0.04 ? Math.cos(displayProgress * 70) * 3 * loopGlitchIntensity : 0;

    opacity_L = loopOpacity;
    opacity_P = loopOpacity;
    scale_L = loopScale;
    scale_P = loopScale;

    quizOpacity = smoothEase;
    quizScale = 0.88 + smoothEase * 0.12;
    quizJitterX = quizGlitchIntensity > 0.04 ? Math.sin(displayProgress * 100) * 6 * quizGlitchIntensity : 0;
  } else if (displayProgress < 0.60) {
    // 6. STABLE ZONE 1: LIVE QUIZ STAGE (16% wide rock-solid resting zone! Zero jitter or movement)
    isDocked = true;
    loopOpacity = 0;
    opacity_L = 0;
    opacity_P = 0;
    quizOpacity = 1;
    quizScale = 1;
    quizGlitchIntensity = 0;
    quizExitOpacity = 1;
    quizExitX = 0;
    quizExitY = 0;
    quizExitRotate = 0;
    quizExitScale = 1;
  } else if (displayProgress < 0.70) {
    // 7. SLOW SMOOTH BOUNCE TRANSITION:
    // QR code screen exits with bounce towards bottom-right corner!
    // First news appears with bounce from left-upper corner!
    isDocked = true;
    loopOpacity = 0;
    opacity_L = 0;
    opacity_P = 0;
    quizOpacity = 1;
    quizScale = 1;
    quizGlitchIntensity = 0;

    const bT = Math.max(0, Math.min(1, (displayProgress - 0.60) / 0.10));

    // A) QR Screen Elastic Bounce Exit to Bottom-Right Corner
    const elasticExitFactor = Math.pow(bT, 1.45);
    const bounceWobble = Math.sin(bT * Math.PI * 3) * (1 - bT) * 16;

    const maxExitDistX = viewport.w * 0.95 + 400;
    const maxExitDistY = viewport.h * 0.95 + 400;

    quizExitX = elasticExitFactor * maxExitDistX + bounceWobble;
    quizExitY = elasticExitFactor * maxExitDistY + bounceWobble * 0.5;
    quizExitRotate = bT * 18 + bounceWobble * 0.2;
    quizExitScale = Math.max(0.6, 1 - elasticExitFactor * 0.38);
    quizExitOpacity = Math.max(0, 1 - Math.pow(bT, 1.8));

    // B) First News Elastic Bounce Entrance from Left-Upper Corner
    const baseTravel = bT * bT * (3 - 2 * bT);

    let springOvershoot = 0;
    if (bT > 0.45) {
      const settleT = (bT - 0.45) / 0.55;
      springOvershoot = Math.sin(settleT * Math.PI * 2.5) * Math.exp(-settleT * 3.6) * 0.08;
    }

    const effectiveT = Math.min(1.04, baseTravel + springOvershoot);
    const maxEnterDistX = viewport.w * 0.85 + 350;
    const maxEnterDistY = viewport.h * 0.85 + 350;

    newsX = (1 - effectiveT) * -maxEnterDistX;
    newsY = (1 - effectiveT) * -maxEnterDistY;
    newsRotate = (1 - effectiveT) * -16;
    newsScale = 0.65 + effectiveT * 0.35;
    newsOpacity = Math.min(1, bT * 2.4);
    newsReadingProgress = 0;
  } else if (displayProgress < 0.68) {
    // 8. STABLE ZONE 2: FIRST NEWS IS 100% STABLE & RESTED!
    // (Rock-solid resting zone! Zero movement, no folding yet)
    isDocked = true;
    loopOpacity = 0;
    opacity_L = 0;
    opacity_P = 0;
    quizOpacity = 0;
    quizExitOpacity = 0;

    newsX = 0;
    newsY = 0;
    newsRotate = 0;
    newsScale = 1;
    newsOpacity = 1;
    newsReadingProgress = 0.0;
    phoneZoomProgress = 0.0;
    activeAppIndex = null;
  } else {
    // 9. 3D NEWSPAPER READING, FAKE NEWS, GRAND PHONE ZOOM-OUT & SCROLL-DRIVEN APPS
    isDocked = true;
    loopOpacity = 0;
    opacity_L = 0;
    opacity_P = 0;
    quizOpacity = 0;
    quizExitOpacity = 0;

    newsX = 0;
    newsY = 0;
    newsRotate = 0;
    newsScale = 1;

    // Smoothly map displayProgress:
    // 0.68 -> 0.80: Newspaper page folds, 3-image spread, and FAKE NEWS stamp slam
    // 0.80 -> 0.85: Fake news vacuum shrinks into center & Phone zooms out from 12x to settled scale
    // 0.85 -> 0.88: Phone settled clean resting state
    // 0.88 -> 0.91: App 1: Instagram
    // 0.91 -> 0.94: App 2: YouTube
    // 0.94 -> 0.97: App 3: Facebook
    // 0.97 -> 1.00: App 4: WhatsApp
    if (displayProgress < 0.80) {
      newsReadingProgress = Math.max(0, Math.min(0.90, (displayProgress - 0.68) / 0.12));
      phoneZoomProgress = 0;
      newsOpacity = 1;
      activeAppIndex = null;
    } else if (displayProgress < 0.85) {
      phoneZoomProgress = Math.max(0, Math.min(1, (displayProgress - 0.80) / 0.05));
      // Drive fake news vacuum shrink towards 1.0
      newsReadingProgress = 0.91 + phoneZoomProgress * 0.09;
      // Fade out the news layer as phone settles
      newsOpacity = displayProgress > 0.83 ? Math.max(0, 1 - (displayProgress - 0.83) / 0.02) : 1;
      activeAppIndex = null;
    } else {
      phoneZoomProgress = 1.0;
      newsReadingProgress = 1.0;
      newsOpacity = 0;

      // Apps appear one by one as the user scrolls down!
      if (displayProgress >= 0.97) {
        activeAppIndex = 3; // WhatsApp
      } else if (displayProgress >= 0.94) {
        activeAppIndex = 2; // Facebook
      } else if (displayProgress >= 0.91) {
        activeAppIndex = 1; // YouTube
      } else if (displayProgress >= 0.88) {
        activeAppIndex = 0; // Instagram
      } else {
        activeAppIndex = null; // Clean settled phone with title
      }
    }
  }

  // Chromatic text shadow strings for glitch effects
  const loopChromaticShadow =
    loopGlitchIntensity > 0.05
      ? `${-loopGlitchIntensity * 14}px 0 rgba(0, 240, 255, ${0.75 * loopGlitchIntensity}), ${loopGlitchIntensity * 14}px 0 rgba(255, 0, 80, ${0.75 * loopGlitchIntensity}), 0 4px 30px rgba(0,0,0,0.8)`
      : '0 4px 30px rgba(0,0,0,0.8)';

  const quizTitleChromaticShadow =
    quizGlitchIntensity > 0.05
      ? `${-quizGlitchIntensity * 16}px 0 rgba(0, 240, 255, ${0.85 * quizGlitchIntensity}), ${quizGlitchIntensity * 16}px 0 rgba(255, 0, 80, ${0.85 * quizGlitchIntensity}), 0 4px 30px rgba(0,0,0,0.8)`
      : '0 4px 30px rgba(0,0,0,0.8)';

  const quizSubtitleChromaticShadow =
    quizGlitchIntensity > 0.05
      ? `${-quizGlitchIntensity * 12}px 0 rgba(0, 240, 255, 0.9), ${quizGlitchIntensity * 12}px 0 rgba(255, 0, 80, 0.9), 0 0 25px rgba(239,68,68,0.9)`
      : '0 0 25px rgba(239,68,68,0.8)';

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleBackgroundClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      className="h-screen w-full bg-black flex flex-col justify-center items-center relative overflow-hidden px-4 select-none cursor-pointer group"
    >
      {/* Dynamic Ambient Background Glow (Subtle & clean during Quiz phase) */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(220, 38, 38, ${0.30 * loopOpacity + 0.03 * quizOpacity}) 0%, rgba(35, 8, 8, ${0.75 * loopOpacity}) 45%, #000000 85%)`,
        }}
      />

      {/* Ambient Concentric Rings (Expansive, cinematic presentation) */}
      <div
        style={{ opacity: 0.25 * loopOpacity + 0.08 * quizOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden transition-opacity duration-300"
      >
        <div className="w-[520px] h-[520px] sm:w-[750px] sm:h-[750px] md:w-[1000px] md:h-[1000px] border border-white/10 rounded-full" />
        <div className="absolute w-[850px] h-[850px] sm:w-[1200px] sm:h-[1200px] md:w-[1550px] md:h-[1550px] border border-white/[0.04] rounded-full" />
      </div>

      {/* Cyberpunk Glitch Scanlines & Digital Distortion Slices during transition */}
      {(loopGlitchIntensity > 0.05 || quizGlitchIntensity > 0.05) && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          <div className="absolute inset-0 scanlines opacity-40" />
          <div
            className="absolute left-0 right-0 h-2 sm:h-3 bg-cyan-400/25 blur-[1px] transition-transform duration-75"
            style={{
              top: `${(Math.sin(displayProgress * 70) * 0.4 + 0.5) * 100}%`,
              transform: `translateX(${loopJitterX * 2.5}px)`,
            }}
          />
          <div
            className="absolute left-0 right-0 h-3 sm:h-4 bg-red-500/30 blur-[1px] transition-transform duration-75"
            style={{
              top: `${(Math.cos(displayProgress * 85) * 0.4 + 0.5) * 100}%`,
              transform: `translateX(${-loopJitterX * 3}px)`,
            }}
          />
        </div>
      )}

      {/* Trailing Energy Sparks following the Letters along the Infinity Flight */}
      {loopOpacity > 0.05 &&
        trailPositions.map((p, idx) => (
          <div
            key={idx}
            className="absolute top-1/2 left-1/2 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 blur-[1px] bg-red-400 drop-shadow-[0_0_8px_#ef4444]"
            style={{
              transform: `translate(${p.x}px, ${p.y}px)`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity * loopOpacity,
            }}
          />
        ))}

      {/* =================================================================== */}
      {/* LAYER 1: PURE "L ∞ P" (LOOP) FORMATION */}
      {/* Glitches and gently dissolves without leaving an empty black screen */}
      {/* =================================================================== */}
      {loopOpacity > 0.005 && (
        <div
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${loopScale}) translate(${loopJitterX}px, ${loopJitterY}px)`,
            opacity: loopOpacity,
            pointerEvents: loopOpacity > 0.5 ? 'auto' : 'none',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-150 overflow-visible z-10"
        >
          <div className="flex items-center justify-center relative select-none overflow-visible">
            {/* Ambient Volumetric Red Bloom (Fills center with rich warmth) */}
            <div
              className={`absolute -inset-10 sm:-inset-16 md:-inset-24 rounded-full bg-radial from-red-600/30 via-red-950/15 to-transparent blur-[70px] pointer-events-none transition-all duration-700 ${
                isHovered ? 'opacity-100 scale-110' : 'opacity-80 scale-100'
              }`}
            />

            {/* Letter: L */}
            <span
              ref={lRef}
              style={{
                opacity: opacity_L,
                transform: `translate(${transX_L}px, ${transY_L}px) scale(${scale_L}) rotate(${tilt_L}deg)`,
                transformOrigin: 'center center',
                textShadow: loopChromaticShadow,
              }}
              className={`inline-block overflow-visible text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-black tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500 uppercase leading-none pl-2 sm:pl-3 pr-1 sm:pr-2 py-1 will-change-transform ${
                !isDocked && displayProgress > 0.05
                  ? 'drop-shadow-[0_0_24px_rgba(239,68,68,0.85)] drop-shadow-[0_0_10px_rgba(255,255,255,0.85)]'
                  : ''
              }`}
            >
              L
            </span>

            {/* INFINITY SYMBOL (00 / OO) - Balanced Medium Size */}
            <div
              ref={svgWrapperRef}
              style={{
                filter:
                  loopGlitchIntensity > 0.05
                    ? `drop-shadow(${-loopGlitchIntensity * 10}px 0 rgba(0,240,255,0.7)) drop-shadow(${loopGlitchIntensity * 10}px 0 rgba(255,0,80,0.7))`
                    : undefined,
              }}
              className="relative inline-flex items-center justify-center px-1 sm:px-2 md:px-3 mx-1 shrink-0 z-10 overflow-visible"
            >
              <svg
                viewBox="0 0 240 120"
                className="w-36 h-18 sm:w-48 sm:h-24 md:w-64 md:h-32 lg:w-80 lg:h-40 xl:w-[360px] xl:h-[180px] drop-shadow-[0_0_28px_rgba(239,68,68,0.85)] drop-shadow-[0_0_12px_rgba(255,255,255,0.75)] overflow-visible transition-all duration-300"
              >
                <defs>
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

                <g filter="url(#cinematicNeonGlow)">
                  <path
                    d="M 120,60 C 90,20 30,20 30,60 C 30,100 90,100 120,60 C 150,20 210,20 210,60 C 210,100 150,100 120,60 Z"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="19"
                    strokeOpacity="0.30"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 120,60 C 90,20 30,20 30,60 C 30,100 90,100 120,60 C 150,20 210,20 210,60 C 210,100 150,100 120,60 Z"
                    fill="none"
                    stroke="url(#laserLoopGrad)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 120,60 C 90,20 30,20 30,60 C 30,100 90,100 120,60 C 150,20 210,20 210,60 C 210,100 150,100 120,60 Z"
                    fill="none"
                    stroke="url(#innerWhiteCore)"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                <circle r="6" fill="#ffffff" className="drop-shadow-[0_0_16px_#ffffff]">
                  <animateMotion
                    path="M 120,60 C 90,20 30,20 30,60 C 30,100 90,100 120,60 C 150,20 210,20 210,60 C 210,100 150,100 120,60 Z"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>

                <circle r="4.2" fill="#ff7170" opacity="0.9">
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
            <span
              ref={pRef}
              style={{
                opacity: opacity_P,
                transform: `translate(${transX_P}px, ${transY_P}px) scale(${scale_P}) rotate(${tilt_P}deg)`,
                transformOrigin: 'center center',
                textShadow: loopChromaticShadow,
              }}
              className={`inline-block overflow-visible text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] font-black tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500 uppercase leading-none pl-1 sm:pl-2 pr-4 sm:pr-6 md:pr-8 py-1 will-change-transform ${
                !isDocked && displayProgress > 0.05
                  ? 'drop-shadow-[0_0_30px_rgba(239,68,68,0.9)] drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]'
                  : ''
              }`}
            >
              P
            </span>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* LAYER 2: THE LIVE QUIZ & QR CODE WITH GLITCH TRANSITION & BOUNCE EXIT */}
      {/* Appears smoothly via Glitch Transition; exits via scroll bounce to bottom-right! */}
      {/* =================================================================== */}
      {quizOpacity > 0.005 && quizExitOpacity > 0.005 && (
        <div
          style={{
            opacity: quizOpacity * quizExitOpacity,
            transform: `translate(${quizExitX + quizJitterX}px, ${quizExitY}px) rotate(${quizExitRotate}deg) scale(${quizScale * quizExitScale})`,
            pointerEvents: quizOpacity > 0.4 && quizExitOpacity > 0.5 ? 'auto' : 'none',
            transformOrigin: 'bottom right',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 will-change-transform"
        >
          <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl xl:max-w-5xl w-full text-center">
            {/* Text 1: Where Do You Stand? — Strictly ONE Single Line */}
            <h2
              id="quiz-scene-title"
              style={{
                textShadow: quizTitleChromaticShadow,
              }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] leading-none select-none px-2"
            >
              Where Do You Stand?
            </h2>

            {/* Text 2: Scan to Join Live Quiz */}
            <h3
              style={{
                textShadow: quizSubtitleChromaticShadow,
              }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-widest text-red-500 uppercase mt-5 sm:mt-6 select-none transition-all flex items-center justify-center gap-2"
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>Scan to Join Live Quiz</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            </h3>

            {/* Big High-Visibility Clean QR Code Card for Assembly Presentation */}
            <div
              id="quiz-main-container"
              style={{
                filter:
                  quizGlitchIntensity > 0.05
                    ? `drop-shadow(${-quizGlitchIntensity * 6}px 0 rgba(0,240,255,0.4)) drop-shadow(${quizGlitchIntensity * 6}px 0 rgba(255,0,80,0.4))`
                    : undefined,
              }}
              className="relative mt-6 sm:mt-8 group cursor-pointer"
              onClick={toggleModal}
              title="Click to view full screen"
            >
              {/* Very Subtle Ambient Depth Aura (Reduced red effect, clean Apple aesthetic) */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-red-600/[0.06] blur-2xl pointer-events-none transition-all duration-700" />

              {/* Clean White High-Resolution QR Card with Pure Neutral Shadows */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-6 sm:p-8 md:p-9 bg-white rounded-3xl sm:rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_15px_rgba(255,255,255,0.05)] border-2 sm:border-4 border-neutral-800 transition-colors duration-300 overflow-hidden"
              >
                {/* Subtle Refined Laser Scanning Line */}
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/60 to-transparent shadow-[0_0_6px_rgba(239,68,68,0.3)] z-20 pointer-events-none"
                  animate={{ top: ['4%', '94%', '4%'] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Subtle Minimal Corner Tech Accents */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-4 h-4 border-t-2 border-l-2 border-neutral-400 z-10 pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-4 h-4 border-t-2 border-r-2 border-neutral-400 z-10 pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-4 h-4 border-b-2 border-l-2 border-neutral-400 z-10 pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-4 h-4 border-b-2 border-r-2 border-neutral-400 z-10 pointer-events-none" />

                {/* Large QR Code Vector Representation (Pure Black & White Matrix) */}
                {MENTIMETER_CONFIG.customQrCodeImageUrl ? (
                  <img
                    src={MENTIMETER_CONFIG.customQrCodeImageUrl}
                    alt="Live Quiz QR Code"
                    className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[320px] lg:h-[320px] object-contain mx-auto relative z-0"
                  />
                ) : (
                  <svg viewBox="0 0 100 100" className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[320px] lg:h-[320px] fill-black mx-auto relative z-0">
                    <path d="M0,0 h30 v30 h-30 z M5,5 h20 v20 h-20 z M10,10 h10 v10 h-10 z" />
                    <path d="M70,0 h30 v30 h-30 z M75,5 h20 v20 h-20 z M80,10 h10 v10 h-10 z" />
                    <path d="M0,70 h30 v30 h-30 z M5,75 h20 v20 h-20 z M10,80 h10 v10 h-10 z" />
                    <rect x="35" y="5" width="8" height="8" />
                    <rect x="48" y="5" width="8" height="8" />
                    <rect x="35" y="18" width="8" height="8" />
                    <rect x="52" y="18" width="8" height="8" />
                    <rect x="5" y="35" width="8" height="8" />
                    <rect x="18" y="35" width="8" height="8" />
                    <rect x="35" y="35" width="10" height="10" />
                    <rect x="50" y="35" width="10" height="10" />
                    <rect x="65" y="35" width="8" height="8" />
                    <rect x="80" y="35" width="8" height="8" />
                    <rect x="35" y="52" width="8" height="8" />
                    <rect x="48" y="52" width="8" height="8" />
                    <rect x="70" y="52" width="8" height="8" />
                    <rect x="85" y="52" width="8" height="8" />
                    <rect x="35" y="70" width="8" height="8" />
                    <rect x="50" y="70" width="8" height="8" />
                    <rect x="65" y="70" width="8" height="8" />
                    <rect x="85" y="70" width="8" height="8" />
                    <rect x="40" y="85" width="8" height="8" />
                    <rect x="60" y="85" width="8" height="8" />
                    <rect x="85" y="85" width="8" height="8" />
                  </svg>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* LAYER 3: 3D NEWSPAPER READING SCENE (Scroll-Driven Page Turn Experience) */}
      {/* Appears smoothly via scroll bounce from top-left, then flips pages on scroll */}
      {/* =================================================================== */}
      {newsOpacity > 0.005 && (
        <div
          style={{
            transform: `translate(${newsX}px, ${newsY}px) rotate(${newsRotate}deg) scale(${newsScale})`,
            opacity: newsOpacity,
            pointerEvents: 'none',
            transformOrigin: 'top left',
          }}
          className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden will-change-transform"
        >
          <Carousel3DScene isEmbedded={true} scrollProgress={newsReadingProgress} />
        </div>
      )}

      {/* =================================================================== */}
      {/* LAYER 4: PHONE ZOOM-OUT & APP ECOSYSTEM SCENE */}
      {/* Starting super zoomed-in (only center glass visible, zero outline) */}
      {/* then smoothly zooming out as Fake News shrinks into the phone glass */}
      {/* and presenting each app icon one-by-one as the user scrolls */}
      {/* =================================================================== */}
      {displayProgress >= 0.79 && (
        <div
          style={{
            opacity: Math.min(1, (displayProgress - 0.79) / 0.02),
            pointerEvents: 'none',
          }}
          className="absolute inset-0 z-20 overflow-hidden will-change-transform"
        >
          <AppEcosystemScene
            isEmbedded={true}
            phoneZoomProgress={phoneZoomProgress}
            activeAppIndex={activeAppIndex}
            onNextScene={onScrollToNext}
          />
        </div>
      )}

      {/* =================================================================== */}
      {/* Fullscreen Big QR Code Modal (Available on click) */}
      {/* =================================================================== */}
      <AnimatePresence>
        {showLargeQr && (
          <div
            id="fullscreen-qr-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
            onClick={toggleModal}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="apple-card p-6 sm:p-8 rounded-3xl border border-red-500/40 max-w-md w-full bg-neutral-950 text-center space-y-6 shadow-2xl relative"
            >
              <button
                id="close-fullscreen-qr-btn"
                onClick={toggleModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="text-xs uppercase font-bold tracking-widest text-red-500">Live Assembly Participation</div>
                <h3 className="text-2xl font-black text-white">Scan to Join Quiz</h3>
              </div>

              {/* Large Centered QR Code with High Visibility */}
              <div className="p-6 bg-white rounded-2xl shadow-[0_0_40px_rgba(239,68,68,0.3)] max-w-[280px] mx-auto border-2 border-neutral-900">
                {MENTIMETER_CONFIG.customQrCodeImageUrl ? (
                  <img
                    src={MENTIMETER_CONFIG.customQrCodeImageUrl}
                    alt="Live Quiz QR Code High Resolution"
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <svg viewBox="0 0 100 100" className="w-full h-auto fill-black">
                    <path d="M0,0 h30 v30 h-30 z M5,5 h20 v20 h-20 z M10,10 h10 v10 h-10 z" />
                    <path d="M70,0 h30 v30 h-30 z M75,5 h20 v20 h-20 z M80,10 h10 v10 h-10 z" />
                    <path d="M0,70 h30 v30 h-30 z M5,75 h20 v20 h-20 z M10,80 h10 v10 h-10 z" />
                    <rect x="35" y="5" width="8" height="8" />
                    <rect x="48" y="5" width="8" height="8" />
                    <rect x="35" y="18" width="8" height="8" />
                    <rect x="52" y="18" width="8" height="8" />
                    <rect x="5" y="35" width="8" height="8" />
                    <rect x="18" y="35" width="8" height="8" />
                    <rect x="35" y="35" width="10" height="10" fill="#ef4444" />
                    <rect x="50" y="35" width="10" height="10" />
                    <rect x="65" y="35" width="8" height="8" />
                    <rect x="80" y="35" width="8" height="8" />
                    <rect x="35" y="52" width="8" height="8" />
                    <rect x="48" y="52" width="8" height="8" />
                    <rect x="70" y="52" width="8" height="8" />
                    <rect x="85" y="52" width="8" height="8" />
                    <rect x="35" y="70" width="8" height="8" />
                    <rect x="50" y="70" width="8" height="8" />
                    <rect x="65" y="70" width="8" height="8" />
                    <rect x="85" y="70" width="8" height="8" />
                    <rect x="40" y="85" width="8" height="8" />
                    <rect x="60" y="85" width="8" height="8" />
                    <rect x="85" y="85" width="8" height="8" />
                  </svg>
                )}
              </div>

              {/* Instructions & Link */}
              <div className="space-y-3">
                <div className="text-xs text-neutral-400">
                  Open your camera and point it at the code, or go to{' '}
                  <span className="text-white font-mono font-semibold">menti.com</span>
                </div>
                <div className="inline-block px-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-lg font-mono font-bold tracking-widest text-red-400">
                  {MENTIMETER_CONFIG.mentiCode}
                </div>
              </div>

              <div>
                <a
                  href={MENTIMETER_CONFIG.mentiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                >
                  <span>Open quiz directly in browser</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
