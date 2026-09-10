import React from 'react';
import { motion } from 'motion/react';
import { Heart, MessageSquareOff, UserX } from 'lucide-react';

export const RelationshipsScene: React.FC = () => {
  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-center items-center py-8 px-4 snap-start snap-always shrink-0 overflow-hidden">
      <div className="max-w-4xl w-full mx-auto space-y-6 relative z-10 my-auto text-center">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-pink-500 bg-pink-950/40 border border-pink-500/30 px-4 py-1.5 rounded-full">
            Emotional Impact
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            The Digital Wall Between Us
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-sans">
            Connected to 1,000 online acquaintances, yet feeling deeply alone in real life.
          </p>
        </div>

        {/* 3 Impact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="apple-card p-5 rounded-3xl border border-pink-500/30 bg-neutral-950/80 space-y-3 text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <MessageSquareOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Superficial Chats</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Replacing deep, empathetic human conversations with quick emojis, memes, and short video clips.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="apple-card p-5 rounded-3xl border border-pink-500/30 bg-neutral-950/80 space-y-3 text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <UserX className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Erosion of Empathy</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Screen-mediated communication hides non-verbal cues, increasing misunderstandings and social irritability.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="apple-card p-5 rounded-3xl border border-pink-500/30 bg-neutral-950/80 space-y-3 text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Isolation Paradox</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              High social media usage correlates directly with increased subjective feelings of social loneliness.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
