import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, Eye, ShoppingCart } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export const AttentionEconomyScene: React.FC = () => {
  const [adClickCount, setAdClickCount] = useState(0);

  const handleAdClick = () => {
    soundEngine.playDopamineTrigger();
    setAdClickCount((prev) => prev + 1);
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-center items-center py-8 px-4 snap-start snap-always shrink-0 overflow-hidden">
      <div className="max-w-4xl w-full mx-auto space-y-6 relative z-10 my-auto text-center">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-4 py-1.5 rounded-full">
            Attention Economy
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            "If you're not paying for the product...
          </h2>
          <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-red-500 tracking-tight text-glow-red">
            ...YOU ARE THE PRODUCT."
          </h2>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="apple-card p-5 rounded-2xl border-emerald-500/30 bg-neutral-950/80 space-y-2 text-center"
          >
            <Eye className="w-6 h-6 text-emerald-400 mx-auto" />
            <div className="text-lg font-bold text-white font-mono">$180 Billion</div>
            <div className="text-xs text-neutral-400 font-sans">Global Social Ad Revenue Harvested Annually</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="apple-card p-5 rounded-2xl border-emerald-500/30 bg-neutral-950/80 space-y-2 text-center"
          >
            <DollarSign className="w-6 h-6 text-emerald-400 mx-auto" />
            <div className="text-lg font-bold text-white font-mono">$0.45 per hour</div>
            <div className="text-xs text-neutral-400 font-sans">The Value Advertisers Pay for Your Screentime Attention</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="apple-card p-5 rounded-2xl border-emerald-500/30 bg-neutral-950/80 space-y-2 text-center"
          >
            <ShoppingCart className="w-6 h-6 text-emerald-400 mx-auto" />
            <div className="text-lg font-bold text-white font-mono">Behavior Modification</div>
            <div className="text-xs text-neutral-400 font-sans">Altering Your Buying Habits and Daily Routine</div>
          </motion.div>
        </div>

        {/* Interactive Ad Click Sim */}
        <div className="apple-card p-5 rounded-3xl border-white/10 max-w-md mx-auto space-y-3 bg-neutral-950/90">
          <div className="text-xs font-mono text-emerald-400">YOUR ATTENTION HARVEST SIMULATOR</div>
          <button
            onClick={handleAdClick}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2"
          >
            <DollarSign className="w-4 h-4" />
            <span>Sell 1 Minute of Focus (+${(adClickCount * 0.15).toFixed(2)})</span>
          </button>
          <div className="text-[11px] text-neutral-400 font-mono">
            Total Revenue Generated for Tech Platforms from your clicks: <span className="text-emerald-400 font-bold">${(adClickCount * 0.15).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
