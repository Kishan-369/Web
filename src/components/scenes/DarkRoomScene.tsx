import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Bell, Heart, MessageSquare, Repeat } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export const DarkRoomScene: React.FC = () => {
  const [notificationCount, setNotificationCount] = useState(12);

  const spawnMoreNotifications = () => {
    soundEngine.playGlitchSound();
    soundEngine.playNotificationPing();
    setNotificationCount((prev) => prev + 5);
  };

  const notificationIcons = [Bell, Heart, MessageSquare, Repeat];
  const notificationTexts = [
    '❤️ Someone liked your photo',
    '💬 New comment on video',
    '🔥 5 Friends posted stories',
    '🔔 Mentioned in group chat',
    '⚡ Trending: Watch this reel!',
  ];

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col items-center justify-center overflow-hidden px-4 py-6 snap-start snap-always shrink-0">
      {/* Dark Room Atmosphere Glow */}
      <div className="absolute inset-0 bg-radial from-blue-950/20 via-black to-black opacity-80 pointer-events-none" />

      {/* Floating Notifications Web Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        {Array.from({ length: notificationCount }).map((_, i) => {
          const Icon = notificationIcons[i % notificationIcons.length];
          const text = notificationTexts[i % notificationTexts.length];
          const top = Math.sin(i * 37) * 42 + 50;
          const left = Math.cos(i * 23) * 42 + 50;
          const size = 0.7 + (i % 3) * 0.2;

          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: size,
                opacity: [0.3, 0.8, 0.4],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: (i % 10) * 0.2,
              }}
              style={{
                position: 'absolute',
                top: `${top}%`,
                left: `${left}%`,
              }}
              className="apple-card px-3 py-1.5 rounded-2xl flex items-center space-x-2 text-[11px] border-white/10 text-neutral-300 backdrop-blur-md shadow-lg"
            >
              <Icon className="w-3.5 h-3.5 text-red-500" />
              <span>{text}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl w-full mx-auto text-center relative z-10 space-y-6 max-h-[92vh] flex flex-col justify-center">
        {/* Headings */}
        <div className="space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
          >
            Are you controlling your phone...
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-cyan-400 tracking-tight leading-tight text-glow-red"
          >
            ...or is it controlling you?
          </motion.h2>
        </div>

        {/* Interactive Phone Graphic + Trigger */}
        <div className="flex justify-center items-center gap-6">
          <div className="relative w-36 sm:w-44 h-48 sm:h-56 rounded-[30px] border-2 border-neutral-800 bg-neutral-950 p-3 shadow-xl flex flex-col justify-between overflow-hidden border-cyan-500/30 glow-blue">
            <div className="w-16 h-3 bg-black rounded-full mx-auto relative z-20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
            </div>

            <div className="relative z-20 my-auto text-center space-y-2">
              <Smartphone className="w-8 h-8 text-cyan-400 mx-auto animate-bounce" />
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300">
                {notificationCount} Alerts Pending
              </div>
              <button
                onClick={spawnMoreNotifications}
                className="px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[11px] font-semibold hover:bg-cyan-500/40 transition-all glow-blue"
              >
                + Trigger Storm
              </button>
            </div>

            <div className="w-12 h-1 bg-neutral-700 rounded-full mx-auto relative z-20" />
          </div>
        </div>

        <p className="text-xs text-neutral-400 font-mono">
          "The average user checks their phone every 10 minutes, generating thousands of micro-interruptions daily."
        </p>
      </div>
    </section>
  );
};
