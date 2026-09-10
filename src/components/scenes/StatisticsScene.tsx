import React from 'react';
import { motion } from 'motion/react';
import { Clock, TrendingUp, AlertOctagon, HeartHandshake } from 'lucide-react';

export const StatisticsScene: React.FC = () => {
  const stats = [
    {
      value: '4.8 Hours',
      label: 'Average Daily Screentime for Youth',
      sub: 'Equates to over 73 full days lost every single year.',
      icon: Clock,
      color: 'border-red-500/40 text-red-500',
    },
    {
      value: '2,617 Times',
      label: 'Daily Phone Touches & Swipes',
      sub: 'Subconscious muscle memory triggering involuntary opens.',
      icon: TrendingUp,
      color: 'border-cyan-500/40 text-cyan-400',
    },
    {
      value: '145%',
      label: 'Rise in Youth Anxiety & Depression',
      sub: 'Strongly correlated with smartphone adoption since 2012.',
      icon: AlertOctagon,
      color: 'border-pink-500/40 text-pink-400',
    },
    {
      value: '9 Years',
      label: 'Total Lifetime Spent Looking at Phone Screens',
      sub: 'Time stolen from career mastery, relationships, and peace.',
      icon: HeartHandshake,
      color: 'border-emerald-500/40 text-emerald-400',
    },
  ];

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-center items-center py-8 px-4 snap-start snap-always shrink-0 overflow-hidden">
      <div className="max-w-5xl w-full mx-auto space-y-6 relative z-10 my-auto text-center">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-red-500 bg-red-950/40 border border-red-500/30 px-4 py-1.5 rounded-full">
            Apple-Style Metrics
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            The Staggering Reality in Numbers
          </h2>
        </div>

        {/* 4 Apple-Style Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`apple-card p-6 rounded-3xl border ${item.color} bg-neutral-950/80 space-y-2 text-left backdrop-blur-md`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                    {item.value}
                  </div>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-neutral-200">{item.label}</div>
                <div className="text-xs text-neutral-400 font-sans leading-relaxed">{item.sub}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
