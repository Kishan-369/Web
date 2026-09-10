import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ShieldCheck, ArrowRight, TrendingUp, Share2, Eye, Flame, FileText, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface FakeNewsSceneProps {
  storyIndex: 1 | 2 | 3;
  onNextStory: () => void;
}

const FAKE_NEWS_DATA = [
  {
    id: 1,
    issue: 'ISSUE 01 • CYBER LEGISLATION',
    category: 'BREAKING VIRAL HOAX',
    date: 'CURRENT AFFAIRS EDITORIAL',
    headline: 'Govt Mandates 2-Hour Daily Screen Time Limit for Under-21s with AI Router Shutdowns',
    subheadline: 'New cyber-health regulations alleged to mandate ISPs automatically cut home Wi-Fi to youth devices past 10:00 PM.',
    views: '42.8M Views',
    shares: '1.4M Shares',
    platform: 'TikTok & X (Twitter) Trend #1',
    mockPost: {
      author: '@youth_news_daily',
      avatar: '🚨',
      time: '2h ago • Viral',
      content: 'URGENT: Starting Monday, Wi-Fi routers will automatically block phones of anyone under 21 after 2 hours of daily screen time! Govt passing new digital health law. Tag your friends before it shuts down! 😱📉 #ScreenTimeLimit #WifiBan #GovtCutoff',
      likes: '890K Likes',
      comments: '124K Comments',
    },
    whyBelieved: 'Sounded like strict digital curfew laws passed in other countries. Thousands of teens re-shared short panic clips without checking official government gazettes or ISP statements.',
    realityCheck: 'DEBUNKED / 100% FAKE NEWS',
    factDetail: 'Originated from a satirical commentary video edited with fake news broadcast graphics. No government body or ISP has implemented or proposed automated router shutdowns or screen time caps.',
    accentColor: 'from-amber-600 via-red-600 to-pink-600',
    borderColor: 'border-amber-500/50',
    tagBg: 'bg-amber-950/80 text-amber-400 border-amber-500/40',
  },
  {
    id: 2,
    issue: 'ISSUE 02 • SOCIAL MEDIA HOAX',
    category: 'CHAIN LETTER SCAM',
    date: 'CURRENT AFFAIRS EDITORIAL',
    headline: 'Instagram & Reels to Charge $19.99/Month Unless You Share This Post by Midnight',
    subheadline: 'Leaked internal memo claims free accounts will be deleted by midnight unless re-posted to story with hashtag #KeepInstaFree.',
    views: '85.2M Views',
    shares: '6.8M Story Reshares',
    platform: 'Instagram Reels & Stories Trend',
    mockPost: {
      author: '@tech_insider_leaks',
      avatar: '📱',
      time: '4h ago • Trending',
      content: 'IT IS OFFICIAL: Meta is removing free accounts! To keep your account FREE, copy this exact image to your story and tag 5 friends within 3 hours. Internal servers will verify your badge! ⚠️🔥 #KeepFree #MetaUpdate #InstaPaywall',
      likes: '2.4M Likes',
      comments: '412K Comments',
    },
    whyBelieved: 'Fear of losing personal photos, social status, and direct messages created instant urgency. The "midnight deadline" bypassed critical thinking and verification.',
    realityCheck: 'DEBUNKED / CLASSIC HOAX',
    factDetail: 'A modern spin on 1990s chain letters. Major platforms generate billions from targeted advertising; they never charge mandatory subscription fees enforced by story reshares.',
    accentColor: 'from-purple-600 via-pink-600 to-red-600',
    borderColor: 'border-pink-500/50',
    tagBg: 'bg-pink-950/80 text-pink-400 border-pink-500/40',
  },
  {
    id: 3,
    issue: 'ISSUE 03 • AI SURVEILLANCE PANIC',
    category: 'DEEPFAKE OUTRAGE',
    date: 'CURRENT AFFAIRS EDITORIAL',
    headline: 'AI Exam Proctoring System Auto-Fails Students Who Look Away From Screen for 3 Seconds',
    subheadline: 'Automated exam software updated with eye-tracking neural nets allegedly flagging blinking or background noise as instant cheating.',
    views: '31.5M Views',
    shares: '980K Shares',
    platform: 'WhatsApp Student Groups & Reels',
    mockPost: {
      author: '@student_rights_now',
      avatar: '🎓',
      time: '1d ago • High Engagement',
      content: 'BEWARE STUDENTS! The new AI proctoring tool automatically fails you if you look down to write on paper or blink twice! Thousands of students allegedly failed midterms today! Share with all classmates! 😡❌ #AIFail #ExamPanic #StudentRights',
      likes: '1.1M Likes',
      comments: '88K Comments',
    },
    whyBelieved: 'Academic stress and anxiety about growing AI surveillance made students instantly resonate with outrage bait, mistaking synthetic video for authentic reporting.',
    realityCheck: 'DEBUNKED / MANUFACTURED OUTRAGE',
    factDetail: 'Created using a synthetic AI deepfake voiceover on stock exam footage designed specifically to farm rage-bait engagement from stressed high school and college students.',
    accentColor: 'from-cyan-600 via-blue-600 to-indigo-600',
    borderColor: 'border-cyan-500/50',
    tagBg: 'bg-cyan-950/80 text-cyan-400 border-cyan-500/40',
  },
];

export const FakeNewsScene: React.FC<FakeNewsSceneProps> = ({ storyIndex, onNextStory }) => {
  const data = FAKE_NEWS_DATA[storyIndex - 1] || FAKE_NEWS_DATA[0];

  const handleNext = () => {
    soundEngine.playNotificationPing();
    onNextStory();
  };

  return (
    <section className="h-screen w-full bg-black text-white relative flex flex-col justify-between py-6 px-4 snap-start snap-always shrink-0 overflow-hidden">
      {/* Background Radial Glow */}
      <div className={`absolute inset-0 bg-radial ${storyIndex === 1 ? 'from-amber-950/30' : storyIndex === 2 ? 'from-pink-950/30' : 'from-cyan-950/30'} via-black to-black opacity-90 pointer-events-none`} />

      {/* Top Editorial Header */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-1.5 pt-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 border-b border-white/10 pb-2">
          <span className="font-bold tracking-widest text-red-500 uppercase flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-red-500" />
            <span>VIRAL TRUTH MAGAZINE</span>
          </span>
          <span className="bg-neutral-900 px-3 py-0.5 rounded-full border border-white/10 font-mono text-white">
            {data.issue}
          </span>
          <span className="text-neutral-500 hidden sm:inline">{data.date}</span>
        </div>

        <div className="pt-1">
          <div className={`inline-flex items-center space-x-1.5 text-[11px] font-mono font-bold uppercase tracking-widest border px-3 py-0.5 rounded-full ${data.tagBg}`}>
            <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
            <span>{data.category}</span>
          </div>
        </div>
      </div>

      {/* Main Magazine Layout Container */}
      <div className="relative z-10 max-w-4xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left Column: Bold Headline & Editorial Breakdown */}
        <div className="lg:col-span-7 space-y-4 text-left">
          {/* Main Headline */}
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white font-serif italic">
            "{data.headline}"
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed border-l-2 border-red-500 pl-3">
            {data.subheadline}
          </p>

          {/* Viral Metrics Pill Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
            <span className="bg-neutral-900 border border-white/10 px-2.5 py-1 rounded-lg text-amber-400 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-500" />
              <span>{data.views}</span>
            </span>
            <span className="bg-neutral-900 border border-white/10 px-2.5 py-1 rounded-lg text-pink-400 flex items-center gap-1">
              <Share2 className="w-3 h-3 text-pink-500" />
              <span>{data.shares}</span>
            </span>
            <span className="bg-neutral-900 border border-white/10 px-2.5 py-1 rounded-lg text-cyan-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-cyan-400" />
              <span>{data.platform}</span>
            </span>
          </div>

          {/* Reality Check Callout Box */}
          <div className="apple-card p-3.5 sm:p-4 rounded-2xl border border-red-500/40 bg-neutral-950/90 space-y-2 glow-red">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <span className="text-xs font-mono font-black text-red-500 flex items-center gap-1.5 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                <span>{data.realityCheck}</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-400">FACT-CHECKED</span>
            </div>

            <p className="text-xs text-neutral-200 font-sans leading-relaxed">
              {data.factDetail}
            </p>

            <div className="pt-1 text-[11px] font-mono text-amber-400 bg-amber-950/40 border border-amber-500/20 p-2 rounded-xl">
              <strong className="text-white">Why Youths Believed It:</strong> {data.whyBelieved}
            </div>
          </div>
        </div>

        {/* Right Column: Realistic Social Media Feed Post Card */}
        <div className="lg:col-span-5">
          <div className={`apple-card p-4 rounded-3xl border ${data.borderColor} bg-neutral-950/95 space-y-3 shadow-2xl relative overflow-hidden`}>
            {/* Post Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-sm shadow-md">
                  {data.mockPost.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono flex items-center gap-1">
                    <span>{data.mockPost.author}</span>
                    <span className="text-[9px] bg-red-600 text-white px-1 rounded">FAKE</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">{data.mockPost.time}</div>
                </div>
              </div>
              <Eye className="w-4 h-4 text-neutral-500" />
            </div>

            {/* Post Body Content */}
            <div className="p-3 bg-neutral-900/90 rounded-2xl border border-white/5 space-y-2 text-xs font-sans text-neutral-200 leading-relaxed text-left">
              {data.mockPost.content}
            </div>

            {/* Post Engagement Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1">
              <span className="text-pink-400 font-bold">{data.mockPost.likes}</span>
              <span className="text-cyan-400">{data.mockPost.comments}</span>
              <span className="text-amber-400 font-bold">100% Hoax</span>
            </div>

            {/* Large STAMP OVERLAY */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="rotate-[-14deg] border-4 border-red-600 text-red-600 font-black text-2xl sm:text-3xl px-6 py-2 rounded-2xl uppercase tracking-widest bg-black/80 backdrop-blur-sm shadow-2xl animate-pulse">
                FAKE NEWS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls: Next Fake News Button */}
      <div className="relative z-10 max-w-md mx-auto w-full text-center space-y-2 pb-2">
        <button
          onClick={handleNext}
          className={`w-full py-3.5 px-6 rounded-full bg-gradient-to-r ${data.accentColor} hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-2xl flex items-center justify-center space-x-2.5 glow-red hover:scale-102 active:scale-98`}
        >
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          <span>
            {storyIndex < 3
              ? `Read Next Fake News Headline (${storyIndex + 1}/3)`
              : 'Continue to Next Assembly Scene'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-[10px] font-mono text-neutral-500">
          Assembly Reality Check • Story {storyIndex} of 3 • Critical Media Literacy
        </div>
      </div>
    </section>
  );
};
