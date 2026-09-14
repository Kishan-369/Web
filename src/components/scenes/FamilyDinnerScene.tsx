import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  PhoneOff, 
  VolumeX, 
  MessageSquareOff, 
  MessageSquare, 
  Sparkles, 
  Heart, 
  AlertCircle,
  Eye, 
  EyeOff, 
  Flame, 
  Bell, 
  Briefcase, 
  RefreshCw,
  Utensils
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface FamilyMember {
  id: 'father' | 'mother' | 'son' | 'daughter';
  name: string;
  role: string;
  age: string;
  position: 'left' | 'top' | 'bottom' | 'right';
  app: string;
  appColor: string;
  glowColor: string;
  screenLight: string;
  activeNotification: string;
  distractionReason: string;
  phoneFeedSnippet: string;
  excuse: string;
  realConversation: string;
  unnoticedMoment: string;
}

const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'father',
    name: 'David',
    role: 'Father',
    age: '46',
    position: 'left',
    app: 'Slack & Stocks',
    appColor: 'from-blue-500 to-indigo-600',
    glowColor: 'rgba(59, 130, 246, 0.6)',
    screenLight: '#3b82f6',
    activeNotification: 'Slack: "Need Q3 deck approval ASAP"',
    distractionReason: 'Checking urgent client emails & market drops',
    phoneFeedSnippet: '▼ NASDAQ -1.4% • 18 unread emails • 4 Slack pings',
    excuse: '"Just a sec guys, let me just send this one reply..."',
    realConversation: '"Leo, tell me about your track meet! Did you beat your record?"',
    unnoticedMoment: 'Missed seeing his daughter share her school certificate across the table.'
  },
  {
    id: 'mother',
    name: 'Sarah',
    role: 'Mother',
    age: '43',
    position: 'top',
    app: 'Instagram & Reels',
    appColor: 'from-fuchsia-500 to-rose-500',
    glowColor: 'rgba(236, 72, 153, 0.6)',
    screenLight: '#ec4899',
    activeNotification: 'Instagram: "24 friends liked your story"',
    distractionReason: 'Endless vertical scrolling through recipes & aesthetic homes',
    phoneFeedSnippet: 'Reels: "10 Habits of Ultra-Organized Moms" (1.4M views)',
    excuse: '"I was just checking a quick message in the neighborhood group..."',
    realConversation: '"David, how was the stressful meeting today? Let me get you warm soup."',
    unnoticedMoment: 'The homemade lasagna she cooked is getting cold and nobody has tasted it.'
  },
  {
    id: 'son',
    name: 'Leo',
    role: 'Son',
    age: '16',
    position: 'bottom',
    app: 'TikTok & Discord',
    appColor: 'from-cyan-400 to-emerald-500',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    screenLight: '#06b6d4',
    activeNotification: 'Discord: "Lobby is full, get in right now!"',
    distractionReason: 'Rapid 15-second dopamine loops with one earbud in',
    phoneFeedSnippet: 'Swipe Next ▶ Viral GTA stunt video • 99+ comments',
    excuse: '"I\'m listening! I can multitask, you don\'t have to yell..."',
    realConversation: '"Dad, I made varsity captain today! Coach said I led the defense!"',
    unnoticedMoment: 'Sitting with shoulders hunched, neck strained, chewing without tasting.'
  },
  {
    id: 'daughter',
    name: 'Maya',
    role: 'Daughter',
    age: '12',
    position: 'right',
    app: 'Snapchat & BeReal',
    appColor: 'from-amber-400 to-yellow-500',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    screenLight: '#f59e0b',
    activeNotification: 'Snapchat: "🔥 184-Day Streak with Chloe ending!"',
    distractionReason: 'Panic over losing streak scores and photo filters',
    phoneFeedSnippet: 'Send Snap to 26 people to keep streak alive • 32m left',
    excuse: '"Wait mom, don\'t touch the pasta! I need to take a photo first!"',
    realConversation: '"Mom, can we bake the apple pie together this Saturday like we used to?"',
    unnoticedMoment: 'Seeking validation from 184 streaks instead of the family right in front of her.'
  }
];

export const FamilyDinnerScene: React.FC = () => {
  const [mode, setMode] = useState<'silence' | 'connection'>('silence');
  const [selectedMember, setSelectedMember] = useState<FamilyMember>(FAMILY_MEMBERS[0]);
  const [attemptingSpeech, setAttemptingSpeech] = useState(false);
  const [speechResult, setSpeechResult] = useState<string | null>(null);
  const [notificationTick, setNotificationTick] = useState(38);

  // Periodic notification simulation to reflect real-world distraction rate
  useEffect(() => {
    if (mode !== 'silence') return;
    const interval = setInterval(() => {
      setNotificationTick((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [mode]);

  const toggleMode = (newMode: 'silence' | 'connection') => {
    setMode(newMode);
    setSpeechResult(null);
    setAttemptingSpeech(false);
    if (newMode === 'connection') {
      soundEngine.playClickTone();
    } else {
      soundEngine.playNotificationPing();
    }
  };

  const handleSpeakAttempt = () => {
    if (attemptingSpeech) return;
    setAttemptingSpeech(true);
    soundEngine.playClickTone();

    setTimeout(() => {
      soundEngine.playNotificationPing();
      setSpeechResult(
        'Result: Nobody looked up. Father typed an email. Son scrolled to the next reel. Daughter snapped a photo. Conversation died in 3 seconds.'
      );
      setAttemptingSpeech(false);
    }, 1200);
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between items-center py-4 px-3 sm:px-6 snap-start snap-always shrink-0 overflow-hidden select-none">
      {/* Ambient background glow depending on active state */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          mode === 'silence'
            ? 'bg-radial from-blue-950/20 via-transparent to-black'
            : 'bg-radial from-amber-950/30 via-transparent to-black'
        }`}
      />

      {/* Top Header & Context */}
      <div className="w-full max-w-5xl mx-auto text-center space-y-2 relative z-10 pt-2 shrink-0">
        <div className="flex items-center justify-center gap-2">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border transition-colors ${
            mode === 'silence'
              ? 'text-red-400 bg-red-950/40 border-red-500/40'
              : 'text-amber-300 bg-amber-950/40 border-amber-500/40'
          }`}>
            {mode === 'silence' ? (
              <>
                <MessageSquareOff className="w-3.5 h-3.5 animate-pulse text-red-400" />
                The Phubbing Epidemic • 8:30 PM Dinner
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Warm Presence • Screens Put Away
              </>
            )}
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center justify-center gap-2">
          The Silent Dinner Table
        </h2>

        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-sans leading-relaxed">
          {mode === 'silence'
            ? 'Sitting inches apart at the family meal, yet trapped in four separate algorithmically curated worlds.'
            : 'When screens are turned face down, genuine eye contact, laughter, and family bonds return to life.'}
        </p>

        {/* State Toggle Buttons */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <button
            onClick={() => toggleMode('silence')}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border transition-all ${
              mode === 'silence'
                ? 'bg-red-950/60 border-red-500 text-white shadow-lg shadow-red-900/30 ring-1 ring-red-500/50'
                : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-red-400" />
            <span>Digital Isolation (Present Day)</span>
          </button>

          <button
            onClick={() => toggleMode('connection')}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border transition-all ${
              mode === 'connection'
                ? 'bg-amber-950/70 border-amber-400 text-amber-200 shadow-lg shadow-amber-900/30 ring-1 ring-amber-400/50'
                : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <PhoneOff className="w-3.5 h-3.5 text-amber-400" />
            <span>Human Connection (Phones Away)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage: The Dinner Table */}
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-center gap-4 relative z-10 my-1 py-1 min-h-0">
        
        {/* Table Canvas / Visual Arena */}
        <div className="w-full lg:w-7/12 aspect-square max-h-[380px] sm:max-h-[420px] relative rounded-3xl bg-neutral-950/90 border border-white/10 p-4 flex items-center justify-center overflow-hidden shadow-2xl">
          
          {/* Subtle wooden floor texture pattern */}
          <div className="absolute inset-0 bg-radial from-neutral-900/50 to-neutral-950 pointer-events-none" />

          {/* Severed Connection Lines or Warm Golden Connection Waves */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
            {mode === 'silence' ? (
              // Broken connection lines with X or warning markers
              <g className="transition-opacity duration-700">
                {/* Cross diagonal connections - Severed */}
                <line x1="100" y1="200" x2="300" y2="200" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.35" />
                <line x1="200" y1="100" x2="200" y2="300" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.35" />
                <line x1="100" y1="200" x2="200" y2="100" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 5" opacity="0.25" />
                <line x1="300" y1="200" x2="200" y2="100" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 5" opacity="0.25" />
                <line x1="100" y1="200" x2="200" y2="300" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 5" opacity="0.25" />
                <line x1="300" y1="200" x2="200" y2="300" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 5" opacity="0.25" />

                {/* Severed Badges in the center */}
                <circle cx="200" cy="200" r="18" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" opacity="0.8" />
                <text x="200" y="204" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  0 CONV
                </text>
              </g>
            ) : (
              // Warm golden woven connection lines connecting everyone
              <g className="transition-opacity duration-700">
                <circle cx="200" cy="200" r="85" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4" strokeDasharray="6 4" className="animate-spin" style={{ animationDuration: '30s' }} />
                <line x1="100" y1="200" x2="300" y2="200" stroke="#fbbf24" strokeWidth="2" opacity="0.6" />
                <line x1="200" y1="100" x2="200" y2="300" stroke="#fbbf24" strokeWidth="2" opacity="0.6" />
                <line x1="100" y1="200" x2="200" y2="100" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4" />
                <line x1="300" y1="200" x2="200" y2="100" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4" />
                <line x1="100" y1="200" x2="200" y2="300" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4" />
                <line x1="300" y1="200" x2="200" y2="300" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4" />

                <circle cx="200" cy="200" r="22" fill="#78350f" stroke="#fbbf24" strokeWidth="2" opacity="0.9" />
                <text x="200" y="204" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">
                  HEART
                </text>
              </g>
            )}

            {/* Ripple when attempting to speak */}
            {attemptingSpeech && (
              <circle cx="200" cy="200" r="140" fill="none" stroke="#60a5fa" strokeWidth="2.5" opacity="0.7">
                <animate attributeName="r" from="20" to="160" dur="1s" repeatCount="1" />
                <animate attributeName="opacity" from="0.9" to="0" dur="1s" repeatCount="1" />
              </circle>
            )}
          </svg>

          {/* Physical Dinner Table Centerpiece */}
          <div className="w-[190px] h-[190px] sm:w-[220px] sm:h-[220px] rounded-full border border-neutral-700 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 flex items-center justify-center relative shadow-2xl z-10 transition-transform duration-500">
            
            {/* Table inner grain & rim */}
            <div className="absolute inset-2 rounded-full border border-neutral-700/60 bg-gradient-to-b from-amber-950/20 via-neutral-900/90 to-neutral-950 flex items-center justify-center">
              
              {/* Untouched food bowls & plates */}
              {/* North plate (Mother's untouched salad / pasta) */}
              <div className="absolute top-2.5 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center text-[9px] shadow-sm">
                  🍝
                </div>
                {mode === 'silence' && (
                  <span className="text-[7px] text-neutral-500 font-mono scale-90">Untouched</span>
                )}
              </div>

              {/* South plate (Son's plate) */}
              <div className="absolute bottom-2.5 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center text-[9px] shadow-sm">
                  🍕
                </div>
                {mode === 'silence' && (
                  <span className="text-[7px] text-neutral-500 font-mono scale-90">Getting Cold</span>
                )}
              </div>

              {/* West plate (Father's plate) */}
              <div className="absolute left-2.5 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center text-[9px] shadow-sm">
                  🍲
                </div>
                {mode === 'silence' && (
                  <span className="text-[7px] text-neutral-500 font-mono scale-90">Untouched</span>
                )}
              </div>

              {/* East plate (Daughter's plate) */}
              <div className="absolute right-2.5 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center text-[9px] shadow-sm">
                  🥗
                </div>
                {mode === 'silence' && (
                  <span className="text-[7px] text-neutral-500 font-mono scale-90">Untouched</span>
                )}
              </div>

              {/* Centerpiece: Candle & Bread Basket */}
              <div className="relative flex flex-col items-center justify-center">
                {/* Candle flame */}
                <motion.div
                  animate={{
                    scale: mode === 'silence' ? [0.9, 1.05, 0.95] : [1.1, 1.35, 1.15],
                    opacity: mode === 'silence' ? 0.4 : 1,
                  }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className={`w-3.5 h-3.5 rounded-full ${
                    mode === 'silence'
                      ? 'bg-amber-500/50 blur-[2px]'
                      : 'bg-amber-400 shadow-[0_0_25px_8px_rgba(251,191,36,0.6)]'
                  }`}
                />
                <div className="w-4 h-6 bg-neutral-300 rounded-t-sm shadow-inner" />
                <span className={`text-[8px] font-mono tracking-tight mt-1 transition-colors ${
                  mode === 'silence' ? 'text-neutral-500' : 'text-amber-300 font-bold'
                }`}>
                  {mode === 'silence' ? 'Drowned Out' : 'Warm Flame'}
                </span>
              </div>
            </div>
          </div>

          {/* 4 FAMILY MEMBERS POSITIONED AROUND THE TABLE */}
          {FAMILY_MEMBERS.map((member) => {
            const isSelected = selectedMember.id === member.id;
            
            // Positioning coordinates around the circle
            let posClass = '';
            if (member.position === 'top') posClass = 'top-1 sm:top-2 left-1/2 -translate-x-1/2';
            if (member.position === 'bottom') posClass = 'bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2';
            if (member.position === 'left') posClass = 'left-1 sm:left-2 top-1/2 -translate-y-1/2';
            if (member.position === 'right') posClass = 'right-1 sm:right-2 top-1/2 -translate-y-1/2';

            return (
              <div
                key={member.id}
                onClick={() => {
                  setSelectedMember(member);
                  soundEngine.playClickTone();
                }}
                className={`absolute ${posClass} z-20 cursor-pointer group flex flex-col items-center transition-all duration-300`}
              >
                {/* Digital Isolation Cone / Glare (Active only in Silence mode) */}
                {mode === 'silence' && (
                  <motion.div
                    animate={{
                      opacity: [0.6, 0.9, 0.65],
                      scale: [0.95, 1.05, 0.97],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: Math.random() }}
                    className="absolute -top-3 w-16 h-16 rounded-full blur-xl pointer-events-none"
                    style={{ backgroundColor: member.screenLight, opacity: 0.35 }}
                  />
                )}

                {/* Notification Bubble hovering above their head in Silence mode */}
                {mode === 'silence' && (
                  <motion.div
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: [0, -3, 0], opacity: 1 }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="mb-1 text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded-full bg-neutral-900/95 border border-red-500/40 text-red-300 shadow-md flex items-center gap-1 max-w-[110px] sm:max-w-[130px] truncate"
                  >
                    <Bell className="w-2.5 h-2.5 text-red-400 shrink-0 animate-bounce" />
                    <span className="truncate">{member.activeNotification.split(':')[0]}</span>
                  </motion.div>
                )}

                {/* When in Connection Mode: Speech dialogue snippet hovering */}
                {mode === 'connection' && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-1 text-[8px] sm:text-[9px] font-sans px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-400/50 text-amber-200 shadow-md flex items-center gap-1 max-w-[110px] sm:max-w-[130px] truncate"
                  >
                    <MessageSquare className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                    <span className="truncate">"Listening with love"</span>
                  </motion.div>
                )}

                {/* Character Avatar Box */}
                <div
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex flex-col items-center justify-center relative border transition-all duration-300 ${
                    isSelected
                      ? 'border-white ring-2 ring-white/40 scale-105 bg-neutral-800'
                      : 'border-neutral-700 bg-neutral-900/90 hover:border-neutral-500'
                  }`}
                >
                  {/* Head posture representation */}
                  <div className="relative flex flex-col items-center">
                    {/* Face / Head */}
                    <div 
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold transition-all ${
                        mode === 'silence'
                          ? 'border-neutral-500 bg-neutral-800 text-neutral-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]'
                          : 'border-amber-400/60 bg-amber-950/50 text-amber-200'
                      }`}
                      style={{
                        boxShadow: mode === 'silence' ? `0 0 10px ${member.screenLight}` : undefined
                      }}
                    >
                      {member.name[0]}
                    </div>

                    {/* Smartphone in hands emitting glow or face-down */}
                    <div className="mt-0.5 flex items-center gap-0.5">
                      {mode === 'silence' ? (
                        <div 
                          className="w-3.5 h-5 rounded-[2px] bg-neutral-950 border border-white/60 relative overflow-hidden flex items-center justify-center"
                          style={{ boxShadow: `0 0 8px ${member.screenLight}` }}
                        >
                          {/* Screen flickering glare */}
                          <div 
                            className="w-full h-full opacity-85 animate-pulse"
                            style={{ backgroundColor: member.screenLight }}
                          />
                        </div>
                      ) : (
                        <div className="w-3.5 h-5 rounded-[2px] bg-neutral-800 border border-amber-500/40 flex items-center justify-center">
                          <span className="text-[6px] text-amber-400 font-mono">OFF</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Indicator Pip */}
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-black flex items-center justify-center text-[7px] ${
                    mode === 'silence' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                  }`}>
                    {mode === 'silence' ? '!' : '✓'}
                  </div>
                </div>

                {/* Name & Role Label */}
                <div className="mt-1 text-center">
                  <div className="text-[10px] sm:text-xs font-bold text-white leading-none">
                    {member.name}
                  </div>
                  <div className={`text-[8px] font-mono leading-tight ${
                    mode === 'silence' ? 'text-red-400' : 'text-amber-400'
                  }`}>
                    {mode === 'silence' ? member.app.split('&')[0] : 'Engaged'}
                  </div>
                </div>
              </div>
            );
          })}

          {/* In-Canvas "Try Speaking" Action Pill (Bottom of stage) */}
          {mode === 'silence' && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30">
              <button
                onClick={handleSpeakAttempt}
                disabled={attemptingSpeech}
                className="text-[10px] sm:text-xs font-mono px-3 py-1 rounded-full bg-red-950/90 hover:bg-red-900 border border-red-500/50 text-red-200 transition-all shadow-lg flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
              >
                <MessageSquare className="w-3 h-3 text-red-400" />
                <span>{attemptingSpeech ? 'Speaking: "How was school today?"...' : 'Speak: "How was everyone\'s day?"'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Detailed Inspector Panel (Right side or bottom on mobile) */}
        <div className="w-full lg:w-5/12 flex flex-col justify-between rounded-3xl bg-neutral-950/95 border border-white/10 p-4 sm:p-5 shadow-xl relative overflow-hidden">
          
          {/* Subtle accent border at top */}
          <div className={`absolute top-0 inset-x-0 h-1 transition-colors duration-500 ${
            mode === 'silence' ? 'bg-red-500' : 'bg-amber-400'
          }`} />

          <div className="space-y-3">
            {/* Header of selected member */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                  style={{ backgroundColor: selectedMember.screenLight }}
                >
                  {selectedMember.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white">{selectedMember.name}</h3>
                    <span className="text-[10px] text-neutral-400 font-mono">({selectedMember.role}, {selectedMember.age})</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    {mode === 'silence' ? `Hijacked by: ${selectedMember.app}` : 'Full attention on family'}
                  </div>
                </div>
              </div>

              <div className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                mode === 'silence'
                  ? 'bg-red-950/40 border-red-500/40 text-red-400'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
              }`}>
                {mode === 'silence' ? 'EYES ON SCREEN' : 'EYES ON FAMILY'}
              </div>
            </div>

            {/* In Silence Mode: What Their Screen Is Doing */}
            {mode === 'silence' ? (
              <div className="space-y-2.5">
                {/* Phone screen simulation box */}
                <div className="p-3 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Smartphone className="w-3 h-3 text-cyan-400" />
                      What Their Eyes Are Glued To:
                    </span>
                    <span className="text-red-400 font-bold">ACTIVE</span>
                  </div>
                  <div className="text-xs text-cyan-200 font-mono bg-black/60 p-2 rounded-xl border border-cyan-500/20">
                    "{selectedMember.phoneFeedSnippet}"
                  </div>
                </div>

                {/* The Internal Excuse vs The Unnoticed Family Moment */}
                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-neutral-300">
                    <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block font-bold mb-0.5">
                      Their Internal Justification
                    </span>
                    <p className="italic text-neutral-200">{selectedMember.excuse}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-white/5 text-neutral-400">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold mb-0.5">
                      The Real Moment Being Lost Right Now
                    </span>
                    <p className="text-neutral-300">{selectedMember.unnoticedMoment}</p>
                  </div>
                </div>
              </div>
            ) : (
              /* In Connection Mode: Heartwarming dialogue */
              <div className="space-y-3 py-1">
                <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1.5">
                  <div className="text-[10px] text-amber-400 font-mono uppercase tracking-wider font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    What They Are Saying Right Now:
                  </div>
                  <p className="text-sm text-amber-100 font-sans italic">
                    "{selectedMember.realConversation}"
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-neutral-900/80 border border-white/5 text-xs text-neutral-300 space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                    The Impact of Turning Phones Down:
                  </div>
                  <p className="text-neutral-400 leading-relaxed text-[11px]">
                    Children who have regular device-free family dinners show 40% higher academic resilience, richer vocabulary, and drastically lower rates of adolescent anxiety.
                  </p>
                </div>
              </div>
            )}

            {/* Dynamic Speech Attempt Feedback */}
            {speechResult && mode === 'silence' && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs font-sans leading-relaxed"
              >
                {speechResult}
              </motion.div>
            )}
          </div>

          {/* Member selector switcher chips */}
          <div className="pt-3 border-t border-white/10 mt-2">
            <div className="text-[10px] font-mono text-neutral-400 mb-1.5">
              Inspect Family Member:
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {FAMILY_MEMBERS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMember(m);
                    soundEngine.playClickTone();
                  }}
                  className={`py-1 px-1.5 rounded-lg text-[10px] font-mono text-center truncate transition-all ${
                    selectedMember.id === m.id
                      ? 'bg-white text-black font-bold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/5'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Live Metrics Bar */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 pb-2 shrink-0 z-10">
        <div className="apple-card p-2.5 rounded-2xl border border-white/10 bg-neutral-950/80 text-center">
          <div className="text-[10px] font-mono text-neutral-400 flex items-center justify-center gap-1">
            <EyeOff className={`w-3 h-3 ${mode === 'silence' ? 'text-red-400' : 'text-amber-400'}`} />
            <span>Eye Contact</span>
          </div>
          <div className={`text-base font-black ${mode === 'silence' ? 'text-red-400' : 'text-amber-300'}`}>
            {mode === 'silence' ? '0 Seconds' : '100% Shared'}
          </div>
          <div className="text-[9px] text-neutral-500">
            {mode === 'silence' ? 'All gaze tilted 45° down' : 'Warm smiles exchanged'}
          </div>
        </div>

        <div className="apple-card p-2.5 rounded-2xl border border-white/10 bg-neutral-950/80 text-center">
          <div className="text-[10px] font-mono text-neutral-400 flex items-center justify-center gap-1">
            <MessageSquareOff className={`w-3 h-3 ${mode === 'silence' ? 'text-red-400' : 'text-emerald-400'}`} />
            <span>Words Exchanged</span>
          </div>
          <div className={`text-base font-black ${mode === 'silence' ? 'text-red-400' : 'text-emerald-400'}`}>
            {mode === 'silence' ? '0 Words' : 'Rich Stories'}
          </div>
          <div className="text-[9px] text-neutral-500">
            {mode === 'silence' ? 'Dead silence & typing' : 'Active listening'}
          </div>
        </div>

        <div className="apple-card p-2.5 rounded-2xl border border-white/10 bg-neutral-950/80 text-center">
          <div className="text-[10px] font-mono text-neutral-400 flex items-center justify-center gap-1">
            <Bell className="w-3 h-3 text-cyan-400" />
            <span>Screen Pings</span>
          </div>
          <div className="text-base font-black text-cyan-400 font-mono">
            {mode === 'silence' ? `${notificationTick} Alerts` : 'Muted & Silenced'}
          </div>
          <div className="text-[9px] text-neutral-500">
            {mode === 'silence' ? 'Every 8 seconds' : 'Zero interruptions'}
          </div>
        </div>

        <div className="apple-card p-2.5 rounded-2xl border border-white/10 bg-neutral-950/80 text-center">
          <div className="text-[10px] font-mono text-neutral-400 flex items-center justify-center gap-1">
            <Heart className={`w-3 h-3 ${mode === 'silence' ? 'text-neutral-500' : 'text-rose-400'}`} />
            <span>Connection</span>
          </div>
          <div className={`text-base font-black ${mode === 'silence' ? 'text-neutral-400' : 'text-rose-400'}`}>
            {mode === 'silence' ? 'DISCONNECTED' : 'REUNITED'}
          </div>
          <div className="text-[9px] text-neutral-500">
            {mode === 'silence' ? 'Physical presence only' : 'Genuine emotional bond'}
          </div>
        </div>
      </div>
    </section>
  );
};
