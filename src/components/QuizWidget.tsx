import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface QuizWidgetProps {
  quizNumber: number; // 1, 2, 3, or 4
  totalQuizzes?: number;
  question: string;
  optionA: string;
  optionB: string;
  insightA: string;
  insightB: string;
}

export const QuizWidget: React.FC<QuizWidgetProps> = ({
  quizNumber,
  totalQuizzes = 4,
  question,
  optionA,
  optionB,
  insightA,
  insightB,
}) => {
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);

  const handleSelect = (option: 'A' | 'B') => {
    if (option === 'A') {
      soundEngine.playGlitchSound();
    } else {
      soundEngine.playNotificationPing();
    }
    setSelectedOption(option);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="apple-card p-5 sm:p-6 rounded-3xl border border-red-500/30 bg-neutral-950/80 max-w-xl mx-auto w-full text-left space-y-4 shadow-xl backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2 text-red-500">
          <HelpCircle className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="text-xs font-mono uppercase font-bold tracking-wider">
            SELF-ASSESSMENT QUIZ 0{quizNumber} / 0{totalQuizzes}
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-white/10 px-2.5 py-0.5 rounded-full">
          Interactive Checkpoint
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
          {question}
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <button
          onClick={() => handleSelect('A')}
          className={`p-3 rounded-2xl text-xs text-left font-medium transition-all border flex items-start space-x-2 ${
            selectedOption === 'A'
              ? 'bg-red-600/30 border-red-500 text-white glow-red font-bold'
              : 'bg-neutral-900 border-white/10 text-neutral-300 hover:border-white/30 hover:bg-neutral-850'
          }`}
        >
          <span className="text-red-400 font-mono font-bold mt-0.5">A.</span>
          <span className="flex-1">{optionA}</span>
        </button>

        <button
          onClick={() => handleSelect('B')}
          className={`p-3 rounded-2xl text-xs text-left font-medium transition-all border flex items-start space-x-2 ${
            selectedOption === 'B'
              ? 'bg-emerald-600/30 border-emerald-500 text-white glow-blue font-bold'
              : 'bg-neutral-900 border-white/10 text-neutral-300 hover:border-white/30 hover:bg-neutral-850'
          }`}
        >
          <span className="text-emerald-400 font-mono font-bold mt-0.5">B.</span>
          <span className="flex-1">{optionB}</span>
        </button>
      </div>

      {selectedOption && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`p-3.5 rounded-2xl border text-xs leading-relaxed space-y-1 ${
            selectedOption === 'A'
              ? 'bg-red-950/30 border-red-500/40 text-red-200'
              : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
          }`}
        >
          <div className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[10px]">
            {selectedOption === 'A' ? (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                <span>Behavioral Insight</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Healthy Mindset Insight</span>
              </>
            )}
          </div>
          <p>{selectedOption === 'A' ? insightA : insightB}</p>
        </motion.div>
      )}
    </motion.div>
  );
};
