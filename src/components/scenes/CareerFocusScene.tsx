import React from 'react';
import { motion } from 'motion/react';
import { Target, Zap, Clock } from 'lucide-react';
import { QuizWidget } from '../QuizWidget';

export const CareerFocusScene: React.FC = () => {
  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-center items-center py-6 px-4 snap-start snap-always shrink-0 overflow-hidden">
      <div className="max-w-4xl w-full mx-auto space-y-4 relative z-10 my-auto text-center">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-4 py-1 rounded-full">
            Career & Deep Work
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            The Cost of Task Switching
          </h2>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
          <div className="apple-card p-4 rounded-2xl border border-cyan-500/30 bg-neutral-950/80 space-y-1.5">
            <div className="flex items-center space-x-2 text-cyan-400">
              <Clock className="w-4 h-4" />
              <h3 className="text-sm font-bold text-white">23 Minutes Lost</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              It takes an average of 23 minutes and 15 seconds to return to peak focus after a single phone interruption.
            </p>
          </div>

          <div className="apple-card p-4 rounded-2xl border border-cyan-500/30 bg-neutral-950/80 space-y-1.5">
            <div className="flex items-center space-x-2 text-cyan-400">
              <Target className="w-4 h-4" />
              <h3 className="text-sm font-bold text-white">Deep Work Advantage</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              In an age of constant distraction, the ability to focus without interruption is a rare superpower.
            </p>
          </div>
        </div>

        {/* Quiz 04 Integration */}
        <QuizWidget
          quizNumber={4}
          question="When working or studying, how long can you sustain deep concentration before checking your phone?"
          optionA="Less than 15-20 minutes before checking"
          optionB="1+ hour of uninterrupted, continuous focus"
          insightA="Fragmented focus: Repeated switching burns cognitive energy, leaving you exhausted with low quality output."
          insightB="Deep Work mastery! Protecting uninterrupted focus is your single greatest competitive advantage."
        />
      </div>
    </section>
  );
};
