import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Smartphone, RefreshCcw, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export const FinalAwakeningScene: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = '"You think you use apps... But I trained you."';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      if (index % 3 === 0) {
        soundEngine.playNotificationPing();
      }
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-center items-center py-8 px-4 overflow-hidden snap-start snap-always shrink-0">
      {/* Background Subtle Darkness */}
      <div className="absolute inset-0 bg-radial from-red-950/20 via-black to-black opacity-90 pointer-events-none" />

      <div className="max-w-3xl w-full mx-auto space-y-8 relative z-10 text-center my-auto">
        {/* Phone Frame Typing Screen */}
        <div className="apple-card p-6 sm:p-10 rounded-[36px] border-red-600/50 max-w-xl mx-auto space-y-4 bg-gradient-to-b from-neutral-950 to-black glow-red">
          <Smartphone className="w-10 h-10 text-red-500 mx-auto animate-pulse" />

          {/* Typing Display */}
          <div className="min-h-[80px] flex items-center justify-center">
            <h2 className="text-xl sm:text-3xl font-black font-mono tracking-tight text-white leading-tight">
              {typedText}
              <span className="inline-block w-2 h-6 bg-red-500 ml-1 animate-pulse" />
            </h2>
          </div>

          <p className="text-sm sm:text-base font-sans text-red-400 font-bold pt-1">
            Now the decision is yours—spend your time or build your life?
          </p>
        </div>

        {/* Closing Resolve Statement */}
        <div className="max-w-xl mx-auto space-y-3 bg-neutral-950/80 border border-white/10 p-5 rounded-3xl backdrop-blur-md">
          <div className="flex items-center justify-center space-x-2 text-xs font-mono uppercase tracking-wider text-red-400">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span>Reclaim Your Mind & Time Today</span>
          </div>
          <p className="text-xs text-neutral-300 font-sans leading-relaxed">
            Every moment you choose deep work, face-to-face conversation, and mental stillness over compulsive scrolling, you take back command of your future.
          </p>
        </div>
      </div>
    </section>
  );
};
