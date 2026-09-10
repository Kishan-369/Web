import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Menu, Globe, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { LanguageMode } from '../types';

interface Props {
  currentScene: number;
  totalScenes: number;
  currentSceneTitle: string;
  onOpenDrawer: () => void;
  languageMode: LanguageMode;
  onLanguageChange: (mode: LanguageMode) => void;
}

export const NavigationHeader: React.FC<Props> = ({
  currentScene,
  totalScenes,
  currentSceneTitle,
  onOpenDrawer,
  languageMode,
  onLanguageChange,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    if (!nextMuted) {
      soundEngine.playNotificationPing();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Assembly Badge */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center glow-red">
            <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold flex items-center gap-1.5">
              <span>Hariprabodham Youth Assembly</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
            </div>
            <div className="text-sm font-bold text-white tracking-tight">
              Understanding Social Media Addiction
            </div>
          </div>
        </div>

        {/* Scene Progress Tracker */}
        <div className="hidden md:flex items-center space-x-3 bg-neutral-900/80 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          <span className="text-xs font-mono text-red-500 font-bold">
            SCENE {String(currentScene).padStart(2, '0')} / {String(totalScenes).padStart(2, '0')}
          </span>
          <span className="text-neutral-600">|</span>
          <span className="text-xs text-neutral-300 font-medium truncate max-w-[200px]">
            {currentSceneTitle}
          </span>
        </div>

        {/* Controls: Language, Sound, Fullscreen, Presenter Menu */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Language Selector */}
          <div className="relative group">
            <button
              className="flex items-center space-x-1.5 bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 text-neutral-300 text-xs px-3 py-1.5 rounded-full transition-all"
              title="Change Language Mode"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-medium uppercase">
                {languageMode === 'mixed' ? 'EN 70% + GU 30%' : languageMode === 'gujarati' ? 'ગુજરાતી' : 'ENGLISH'}
              </span>
            </button>
            <div className="absolute right-0 mt-2 w-44 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all p-1 z-50">
              <button
                onClick={() => onLanguageChange('mixed')}
                className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  languageMode === 'mixed' ? 'bg-red-600/20 text-red-400 font-bold' : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                <span>Mixed (70% EN + 30% GU)</span>
                {languageMode === 'mixed' && <span className="text-xs">✓</span>}
              </button>
              <button
                onClick={() => onLanguageChange('gujarati')}
                className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors flex items-center justify-between font-gujarati ${
                  languageMode === 'gujarati' ? 'bg-red-600/20 text-red-400 font-bold' : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                <span>ગુજરાતી focus</span>
                {languageMode === 'gujarati' && <span className="text-xs">✓</span>}
              </button>
              <button
                onClick={() => onLanguageChange('english')}
                className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  languageMode === 'english' ? 'bg-red-600/20 text-red-400 font-bold' : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                <span>English Only</span>
                {languageMode === 'english' && <span className="text-xs">✓</span>}
              </button>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
              !isMuted
                ? 'bg-red-600/20 border-red-500/50 text-red-400 glow-red'
                : 'bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white'
            }`}
            title={isMuted ? 'Enable Ambient Audio' : 'Mute Sound'}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span className="hidden sm:inline">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">MUTE</span>
              </>
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900/80 border border-white/10 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all"
            title="Toggle Fullscreen Projector Mode"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Chapter Drawer Trigger */}
          <button
            onClick={onOpenDrawer}
            className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg transition-all"
          >
            <Menu className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SCENES</span>
          </button>
        </div>
      </div>
    </header>
  );
};
