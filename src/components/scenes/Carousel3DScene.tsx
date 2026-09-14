import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../../utils/soundEngine';

const NEWS_DATA = [
  {
    src: '/image1.jpeg',
    tag: 'Policy & Regulation',
    title: 'Govt Mandates 2-Hour Daily Screen Time Limit'
  },
  {
    src: '/image2.jpeg',
    tag: 'Tech Industry',
    title: 'Meta to Launch Mandatory Paid Subscriptions'
  },
  {
    src: '/image3.jpeg',
    tag: 'Ahmedabad Updates',
    title: 'AMC Announces Strict New Guidelines For City Residents'
  }
];

export const Carousel3DScene: React.FC = () => {
  // Step 0: Image 1, Step 1: Image 2, Step 2: Image 3, Step 3: Fake News Reveal
  const [step, setStep] = useState(0);

  const isRevealed = step === 3;
  const currentIndex = step < 3 ? step : 0;

  const handleNext = () => {
    soundEngine.playNotificationPing();
    setStep((prev) => (prev + 1) % 4); // Loops back to 0 after step 3 (Fake News)
  };

  const handlePrev = () => {
    if (step === 0) return; // Prevent wrapping to fake news from the first image
    soundEngine.playClickTone();
    setStep((prev) => prev - 1);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="h-screen w-full bg-black relative flex flex-col justify-center items-center overflow-hidden snap-start snap-always py-6 md:py-10 px-4 select-none">
      {/* Background radial */}
      <div className="absolute inset-0 bg-radial from-red-950/30 via-black to-black opacity-90 pointer-events-none" />

      {/* Invisible Full-Screen Left Click Area (Click anywhere on the left half to go previous) */}
      <div 
        onClick={handlePrev}
        className={`absolute inset-y-0 left-0 w-1/2 z-40 ${step === 0 ? 'cursor-default' : 'cursor-pointer'}`}
        aria-label="Previous Slide"
      />

      {/* Invisible Full-Screen Right Click Area (Click anywhere on the right half to go next / loop back) */}
      <div 
        onClick={handleNext}
        className="absolute inset-y-0 right-0 w-1/2 z-40 cursor-pointer"
        aria-label="Next Slide"
      />

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div 
            key={`heading-${currentIndex}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
            className="z-30 text-center w-full px-4 mb-2 md:mb-6 pointer-events-none"
          >
            <div className="inline-flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest mb-2 md:mb-3 shadow-[0_0_15px_rgba(220,38,38,0.6)]">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>{NEWS_DATA[currentIndex].tag}</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-serif italic font-bold text-white tracking-tight drop-shadow-lg">
              {NEWS_DATA[currentIndex].title}
            </h2>
          </motion.div>
        ) : (
          <motion.div 
            key="reveal-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="z-30 text-center w-full px-4 mb-2 md:mb-6 pointer-events-none"
          >
            <div className="inline-flex items-center space-x-2 bg-red-600 text-white px-3.5 py-1 rounded-sm text-xs font-bold uppercase tracking-widest mb-2 md:mb-3 shadow-[0_0_15px_rgba(220,38,38,0.6)]">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Reality Check</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-serif italic font-bold text-white tracking-tight drop-shadow-lg">
              Don't Believe Everything You See
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="relative w-full max-w-5xl h-[66vh] md:h-[72vh] flex items-center justify-center pointer-events-none"
        style={{ perspective: 1200 }}
      >
        <AnimatePresence>
          {NEWS_DATA.map((item, index) => {
             const offset = (index - currentIndex + NEWS_DATA.length) % NEWS_DATA.length;

             let animateProps: any = {
               scale: 1,
               x: 0,
               y: 0,
               z: 0,
               rotateX: 0,
               rotateY: 0,
               rotateZ: 0,
               opacity: 1,
               filter: "blur(0px)",
               zIndex: 30
             };

             if (isRevealed) {
               if (index === 0) {
                 animateProps = { scale: 0.65, x: "-20vw", y: "-6vh", z: 0, rotateX: 0, rotateY: 0, rotateZ: -12, opacity: 0.8, filter: "blur(0px)", zIndex: 10 };
               } else if (index === 1) {
                 animateProps = { scale: 0.7, x: "20vw", y: "-2vh", z: 0, rotateX: 0, rotateY: 0, rotateZ: 8, opacity: 0.9, filter: "blur(0px)", zIndex: 20 };
               } else if (index === 2) {
                 animateProps = { scale: 0.8, x: "0vw", y: "4vh", z: 0, rotateX: 0, rotateY: 0, rotateZ: -4, opacity: 1, filter: "blur(0px)", zIndex: 30 };
               }
             } else {
               if (offset === 1) {
                 // Right position
                 animateProps = {
                   scale: 0.75,
                   x: "35vw",
                   y: 0,
                   z: -150,
                   rotateX: 0,
                   rotateY: -25,
                   rotateZ: 0,
                   opacity: 0.6,
                   filter: "blur(8px)",
                   zIndex: 20
                 };
               } else if (offset === 2) {
                 // Left position
                 animateProps = {
                   scale: 0.75,
                   x: "-35vw",
                   y: 0,
                   z: -150,
                   rotateX: 0,
                   rotateY: 25,
                   rotateZ: 0,
                   opacity: 0.6,
                   filter: "blur(8px)",
                   zIndex: 20
                 };
               }
             }

             return (
               <motion.div
                 key={index}
                 className="absolute w-full max-w-[900px] flex items-center justify-center pointer-events-none"
                 initial={false}
                 animate={{
                   zIndex: animateProps.zIndex,
                   scale: animateProps.scale,
                   x: animateProps.x,
                   y: animateProps.y,
                   z: animateProps.z,
                   opacity: animateProps.opacity,
                   filter: animateProps.filter,
                   rotateX: animateProps.rotateX,
                   rotateY: animateProps.rotateY,
                   rotateZ: animateProps.rotateZ
                 }}
                 transition={{
                   duration: 0.5,
                   ease: [0.32, 0.72, 0, 1] // sleek ease-out
                 }}
                 style={{
                   transformStyle: "preserve-3d",
                   transformOrigin: "bottom center"
                 }}
               >
                 <img src={item.src} alt={`Fake News Story ${index + 1}`} className="max-w-full max-h-[66vh] md:max-h-[72vh] w-auto h-auto object-contain pointer-events-none rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10" />
                 {/* Fallback overlay in case image not found */}
                 <div className="absolute inset-0 flex items-center justify-center -z-10 text-neutral-600 font-mono text-xs p-4 text-center">
                   Please upload {item.src} to the public folder
                 </div>
               </motion.div>
             );
          })}
          {isRevealed && (
            <motion.div
              initial={{ scale: 4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.1 }}
              className="absolute inset-0 z-35 pointer-events-none flex flex-col items-center justify-center"
            >
              <div 
                className="border-[6px] md:border-[12px] border-red-600 text-red-600 font-black text-6xl md:text-[8rem] uppercase tracking-tighter px-6 py-2 md:px-12 md:py-4 rounded-3xl transform -rotate-12 bg-black/40 backdrop-blur-sm shadow-[0_0_40px_rgba(220,38,38,0.6)]"
                style={{
                  textShadow: "0 0 20px rgba(220,38,38,0.8)", 
                  boxShadow: "inset 0 0 30px rgba(220,38,38,0.6), 0 0 40px rgba(220,38,38,0.6)"
                }}
              >
                Fake News
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

