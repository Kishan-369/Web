import React, { useState } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const isRevealed = clickCount >= 3;

  const handleClick = () => {
    if (isRevealed) return; // Prevent clicking after reveal

    soundEngine.playNotificationPing();
    setClickCount((prev) => prev + 1);
    
    if (clickCount < 2) {
      setCurrentIndex((prev) => (prev + 1) % NEWS_DATA.length);
    }
  };

  return (
    <section className="h-screen w-full bg-black relative flex flex-col justify-center items-center overflow-hidden snap-start snap-always py-10 px-4">
      {/* Background radial */}
      <div className="absolute inset-0 bg-radial from-red-950/30 via-black to-black opacity-90 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div 
            key={`heading-${currentIndex}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
            className="z-40 text-center w-full px-4 mb-4 md:mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(220,38,38,0.6)]">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>{NEWS_DATA[currentIndex].tag}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif italic font-bold text-white tracking-tight drop-shadow-lg">
              {NEWS_DATA[currentIndex].title}
            </h2>
          </motion.div>
        ) : (
          <motion.div 
            key="reveal-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="z-40 text-center w-full px-4 mb-0"
          >
            <div className="inline-flex items-center space-x-2 bg-neutral-800 text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest mb-3 border border-neutral-700">
              <span>Reality Check</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif italic font-bold text-white tracking-tight drop-shadow-lg">
              Don't Believe Everything You See
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center cursor-pointer"
        style={{ perspective: 1200 }}
        onClick={handleClick}
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
               rotateZ: 0,
               opacity: 1,
               zIndex: 30
             };

             if (isRevealed) {
               if (index === 0) {
                 animateProps = { scale: 0.65, x: "-20vw", y: "-6vh", z: 0, rotateX: 0, rotateZ: -12, opacity: 0.8, zIndex: 10 };
               } else if (index === 1) {
                 animateProps = { scale: 0.7, x: "20vw", y: "-2vh", z: 0, rotateX: 0, rotateZ: 8, opacity: 0.9, zIndex: 20 };
               } else if (index === 2) {
                 animateProps = { scale: 0.8, x: "0vw", y: "4vh", z: 0, rotateX: 0, rotateZ: -4, opacity: 1, zIndex: 30 };
               }
             } else {
               if (offset === 1) {
                 animateProps = {
                   scale: 0.9,
                   x: 0,
                   y: -40,
                   z: -100,
                   rotateX: 5,
                   rotateZ: 0,
                   opacity: 0.8,
                   zIndex: 20
                 };
               } else if (offset === 2) {
                 animateProps = {
                   scale: 0.8,
                   x: 0,
                   y: -80,
                   z: -200,
                   rotateX: 10,
                   rotateZ: 0,
                   opacity: 0.4,
                   zIndex: 10
                 };
               }
             }

             return (
               <motion.div
                 key={index}
                 className="absolute w-full max-w-[900px] flex items-center justify-center"
                 initial={false}
                 animate={{
                   zIndex: animateProps.zIndex,
                   scale: animateProps.scale,
                   x: animateProps.x,
                   y: animateProps.y,
                   z: animateProps.z,
                   opacity: animateProps.opacity,
                   rotateX: animateProps.rotateX,
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
                 <img src={item.src} alt={`Fake News Story ${index + 1}`} className="max-w-full max-h-[70vh] w-auto h-auto object-contain pointer-events-none rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10" />
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
              transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.1 }}
              className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center"
            >
              <div 
                className="border-[6px] md:border-[12px] border-red-600 text-red-600 font-black text-6xl md:text-[8rem] uppercase tracking-tighter px-6 py-2 md:px-12 md:py-4 rounded-3xl transform -rotate-12 bg-black/40 backdrop-blur-sm"
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
