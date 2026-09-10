import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, BarChart3, QrCode, CheckCircle2, Users, X, Sparkles, ExternalLink, Activity } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export interface QuizOption {
  id: string;
  label: string;
  sublabel?: string;
  percentage: number; // Assembly consensus percentage
}

interface AssemblyQuizWidgetProps {
  quizNumber: number;
  totalQuizzes?: number;
  title: string;
  question: string;
  options: QuizOption[];
  totalVotes?: number;
  insightText: string;
  googleFormUrl?: string;
}

export const AssemblyQuizWidget: React.FC<AssemblyQuizWidgetProps> = ({
  quizNumber,
  totalQuizzes = 3,
  title,
  question,
  options,
  totalVotes = 348,
  insightText,
  googleFormUrl = 'https://forms.google.com/',
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleSelectOption = (id: string) => {
    soundEngine.playNotificationPing();
    setSelectedOptionId(id);
    if (!showResults) {
      setShowResults(true);
    }
  };

  const toggleResults = () => {
    soundEngine.playSubBassImpact();
    setShowResults(!showResults);
  };

  const toggleQrModal = () => {
    soundEngine.playNotificationPing();
    setShowQrModal(!showQrModal);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="apple-card p-5 sm:p-6 rounded-3xl border border-red-500/30 bg-neutral-950/90 max-w-2xl mx-auto w-full text-left space-y-4 shadow-2xl backdrop-blur-md relative overflow-hidden"
      >
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
          <div className="flex items-center space-x-2 text-red-500">
            <HelpCircle className="w-4.5 h-4.5 text-red-500 animate-pulse" />
            <span className="text-xs font-mono uppercase font-bold tracking-wider">
              ASSEMBLY QUIZ 0{quizNumber} / 0{totalQuizzes} • {title}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Live Indicator */}
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-full flex items-center space-x-1 animate-pulse">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>LIVE POLL</span>
            </span>

            {/* Live QR Button */}
            <button
              onClick={toggleQrModal}
              className="px-2.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 hover:border-red-400 text-red-400 text-[11px] font-mono flex items-center space-x-1.5 transition-all glow-red"
              title="Scan QR Code to vote anonymously on your phone"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan QR / Link</span>
            </button>

            <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-white/10 px-2.5 py-1 rounded-full flex items-center space-x-1">
              <Users className="w-3 h-3 text-cyan-400" />
              <span>{totalVotes} Votes</span>
            </span>
          </div>
        </div>

        {/* Question Title */}
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug">
            {question}
          </h3>
          <p className="text-xs text-neutral-400 mt-1 font-sans">
            Cast your anonymous vote below or scan the QR code to submit responses via Google Form live.
          </p>
        </div>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {options.map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;
            const letter = String.fromCharCode(65 + idx);

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-3.5 rounded-2xl text-xs text-left font-medium transition-all border relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-red-600/30 border-red-500 text-white glow-red font-bold ring-1 ring-red-500'
                    : 'bg-neutral-900/90 border-white/10 text-neutral-300 hover:border-white/30 hover:bg-neutral-850'
                }`}
              >
                <div className="flex items-start justify-between w-full space-x-2">
                  <div className="flex items-start space-x-2">
                    <span className="text-red-400 font-mono font-bold">{letter}.</span>
                    <div>
                      <div className="font-bold text-white text-xs sm:text-sm">{opt.label}</div>
                      {opt.sublabel && <div className="text-[11px] text-neutral-400 font-normal">{opt.sublabel}</div>}
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
                </div>

                {/* Animated Vote Bar if Results Visible */}
                {showResults && (
                  <div className="w-full mt-2 pt-2 border-t border-white/10 space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-neutral-400">Consensus Vote:</span>
                      <span className="text-cyan-400 font-bold">{opt.percentage}%</span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${opt.percentage}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          opt.percentage >= 40
                            ? 'bg-gradient-to-r from-red-500 to-pink-500'
                            : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls: Show Live Consensus Button & Direct Google Form Link */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10">
          <button
            onClick={toggleResults}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-xs font-bold font-mono text-cyan-300 flex items-center space-x-2 transition-all hover:border-cyan-500/50"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>{showResults ? 'Hide Assembly Mean Answers' : 'Show Showcase Mean Answers (Assembly Consensus)'}</span>
          </button>

          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-red-950/80 hover:bg-red-900/80 border border-red-500/40 text-xs font-bold font-mono text-red-300 flex items-center space-x-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Google Form</span>
          </a>
        </div>

        {/* Insight Panel */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3.5 rounded-2xl bg-neutral-900/90 border border-cyan-500/30 text-xs text-neutral-300 leading-relaxed space-y-1 font-sans"
            >
              <div className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[10px] text-cyan-400 font-mono">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Assembly Audience Synthesis & Mean Answer Analysis</span>
              </div>
              <p>{insightText}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* QR Code Modal Dialog */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="apple-card p-6 rounded-3xl border border-red-500/50 bg-neutral-950 max-w-sm w-full text-center space-y-4 shadow-2xl glow-red relative"
            >
              <button
                onClick={toggleQrModal}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-900 text-neutral-400 hover:text-white border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 bg-red-950/60 border border-red-500/30 px-3 py-1 rounded-full">
                  Assembly Live Polling
                </span>
                <h4 className="text-lg font-black text-white">Scan QR to Answer Anonymously</h4>
                <p className="text-xs text-neutral-400">
                  Point your phone camera at the QR code below or click the button to open the Google Form poll for Quiz 0{quizNumber}.
                </p>
              </div>

              {/* Vector SVG QR Code */}
              <div className="p-4 bg-white rounded-2xl max-w-[200px] mx-auto shadow-inner flex flex-col items-center">
                <svg viewBox="0 0 100 100" className="w-36 h-36 fill-black">
                  {/* Position detection patterns */}
                  <path d="M0,0 h30 v30 h-30 z M5,5 h20 v20 h-20 z M10,10 h10 v10 h-10 z" />
                  <path d="M70,0 h30 v30 h-30 z M75,5 h20 v20 h-20 z M80,10 h10 v10 h-10 z" />
                  <path d="M0,70 h30 v30 h-30 z M5,75 h20 v20 h-20 z M10,80 h10 v10 h-10 z" />
                  {/* QR Matrix Data Dots */}
                  <rect x="35" y="5" width="8" height="8" />
                  <rect x="48" y="5" width="8" height="8" />
                  <rect x="35" y="18" width="8" height="8" />
                  <rect x="58" y="18" width="8" height="8" />
                  <rect x="5" y="38" width="8" height="8" />
                  <rect x="18" y="48" width="8" height="8" />
                  <rect x="35" y="38" width="12" height="12" />
                  <rect x="52" y="38" width="8" height="8" />
                  <rect x="68" y="38" width="12" height="8" />
                  <rect x="85" y="38" width="8" height="8" />
                  <rect x="35" y="58" width="8" height="12" />
                  <rect x="48" y="58" width="12" height="8" />
                  <rect x="65" y="58" width="8" height="8" />
                  <rect x="78" y="58" width="12" height="12" />
                  <rect x="35" y="75" width="12" height="8" />
                  <rect x="52" y="75" width="8" height="12" />
                  <rect x="68" y="75" width="12" height="8" />
                  <rect x="85" y="85" width="8" height="8" />
                </svg>
                <span className="text-[9px] font-mono text-neutral-800 font-bold tracking-widest mt-2 uppercase">
                  GOOGLE FORM POLL Q{quizNumber}
                </span>
              </div>

              <div className="space-y-2 pt-1">
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-lg glow-red"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Google Form Live</span>
                </a>
                <p className="text-[10px] font-mono text-neutral-400">
                  Assembly URL: <span className="text-cyan-400 font-bold">forms.google.com/assembly-q{quizNumber}</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

