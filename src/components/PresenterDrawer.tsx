import React from 'react';
import { X, Play, Volume2, Sparkles, Tv } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface SceneItem {
  id: number;
  title: string;
  gujaratiTitle: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  scenes: SceneItem[];
  activeScene: number;
  onSelectScene: (sceneId: number) => void;
}

export const PresenterDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  scenes,
  activeScene,
  onSelectScene,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity animate-fade-in">
      <div className="w-full max-w-md bg-neutral-950 border-l border-white/10 h-full flex flex-col shadow-2xl p-6 overflow-y-auto">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <div className="text-xs uppercase font-semibold text-red-500 tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hariprabodham Presenter Suite</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">17 Cinematic Scenes</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presenter Quick Audio Trigger Controls */}
        <div className="my-4 p-4 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-2">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-red-500" />
            <span>Speaker Sound Cues</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => soundEngine.playSubBassImpact()}
              className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/5 font-medium transition-all text-left flex items-center justify-between"
            >
              <span>Bass Impact</span>
              <Play className="w-3 h-3 text-red-500" />
            </button>
            <button
              onClick={() => soundEngine.playNotificationPing()}
              className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/5 font-medium transition-all text-left flex items-center justify-between"
            >
              <span>Phone Alert</span>
              <Play className="w-3 h-3 text-cyan-400" />
            </button>
            <button
              onClick={() => soundEngine.playSingleHeartbeat()}
              className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/5 font-medium transition-all text-left flex items-center justify-between"
            >
              <span>Heartbeat</span>
              <Play className="w-3 h-3 text-red-500" />
            </button>
            <button
              onClick={() => soundEngine.playDopamineTrigger()}
              className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/5 font-medium transition-all text-left flex items-center justify-between"
            >
              <span>Dopamine Chime</span>
              <Play className="w-3 h-3 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Scene List */}
        <div className="flex-1 space-y-2 py-2 overflow-y-auto pr-1">
          {scenes.map((scene) => {
            const isActive = activeScene === scene.id;
            return (
              <button
                key={scene.id}
                onClick={() => {
                  onSelectScene(scene.id);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                  isActive
                    ? 'bg-red-600/15 border-red-500/60 text-white glow-red'
                    : 'bg-neutral-900/50 hover:bg-neutral-900 border-white/5 hover:border-white/20 text-neutral-300'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5 ${
                    isActive ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {String(scene.id).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold flex items-center justify-between">
                    <span className="truncate">{scene.title}</span>
                    {isActive && <Tv className="w-3.5 h-3.5 text-red-500 shrink-0 ml-1" />}
                  </div>
                  <div className="text-xs text-red-400 font-gujarati mt-0.5 font-medium truncate">
                    {scene.gujaratiTitle}
                  </div>
                  <div className="text-[11px] text-neutral-400 line-clamp-1 mt-1 font-sans">
                    {scene.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-white/10 text-center text-xs text-neutral-500">
          Hariprabodham Youth Assembly Presentation Mode • 120 FPS Cinematic Storytelling
        </div>
      </div>
    </div>
  );
};
