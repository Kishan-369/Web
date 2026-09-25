import React, { useState, useEffect, useRef } from 'react';
import { CursorSpotlight } from './components/CursorSpotlight';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from './utils/soundEngine';

// Scenes
import { TheLoopOpeningScene } from './components/scenes/TheLoopOpeningScene';
import { QuizTimeScene } from './components/scenes/QuizTimeScene';
import { FakeNewsScene } from './components/scenes/FakeNewsScene';
import { Carousel3DScene } from './components/scenes/Carousel3DScene';
import { WorldUsageScene } from './components/scenes/WorldUsageScene';
import { IndiaUsageScene } from './components/scenes/IndiaUsageScene';
import { InstagramEvolutionScene } from './components/scenes/InstagramEvolutionScene';
import { DefinitionScene } from './components/scenes/DefinitionScene';
import { HealthyVsAddictionScene } from './components/scenes/HealthyVsAddictionScene';
import { BlankPauseScene } from './components/scenes/BlankPauseScene';
import { DopamineScene } from './components/scenes/DopamineScene';
import { InfiniteScrollScene } from './components/scenes/InfiniteScrollScene';
import { EasyAccessScene } from './components/scenes/EasyAccessScene';
import { IndiaYouthImpactScene } from './components/scenes/IndiaYouthImpactScene';
import { LifeCalculatorInfographicScene } from './components/scenes/LifeCalculatorInfographicScene';
import { StatisticsScene } from './components/scenes/StatisticsScene';
import { FamilyDinnerScene } from './components/scenes/FamilyDinnerScene';
import { RelationshipsScene } from './components/scenes/RelationshipsScene';
import { CareerFocusScene } from './components/scenes/CareerFocusScene';
import { TheLoopClosingScene } from './components/scenes/TheLoopClosingScene';

export default function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Set up intersection observer for scene tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-scene-id'));
            if (index) {
              setCurrentScene(index);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    sceneRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToScene = (sceneId: number) => {
    const targetRef = sceneRefs.current[sceneId - 1];
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    if (!nextMuted) {
      soundEngine.playNotificationPing();
    }
  };

  return (
    <div className="bg-black text-white h-screen w-full selection:bg-red-600 selection:text-white font-sans overflow-y-scroll snap-y snap-mandatory scroll-smooth relative">
      {/* Ambient Lighting Cursor Spotlight */}
      <CursorSpotlight />

      {/* Discrete Bottom-Right Audio Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleSound}
          className={`p-3 rounded-full border transition-all shadow-2xl backdrop-blur-md ${
            !isMuted
              ? 'bg-red-600/30 border-red-500 text-red-400 glow-red'
              : 'bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white'
          }`}
          title={isMuted ? 'Enable Sound' : 'Mute Sound'}
        >
          {!isMuted ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Sequential Full-Page Snap Scenes */}
      <main className="w-full relative z-10">
        {/* Unified Scene 1, 2, 3 & 4: The Loop Opening, Live Quiz, 3D Newspaper, & App Ecosystem Phone Zoom Out */}
        <div
          ref={(el) => (sceneRefs.current[0] = el)}
          data-scene-id="1"
          className="h-[1850vh] w-full snap-start relative sticky-scene-container"
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <TheLoopOpeningScene
              onScrollToNext={() => scrollToScene(5)}
              onScrollToQuiz={() => scrollToScene(2)}
              onScrollToNews={() => scrollToScene(3)}
              onScrollToPhone={() => scrollToScene(4)}
            />
          </div>
          {/* Subtle progressive scroll snap guides */}
          <div className="absolute top-[16%] h-px w-full snap-start pointer-events-none" />
          {/* Scene 2 Anchor: Live Quiz Stage (QR Code) */}
          <div
            ref={(el) => (sceneRefs.current[1] = el)}
            data-scene-id="2"
            className="absolute top-[48%] h-px w-full snap-start pointer-events-none"
          />
          {/* Scene 3 Anchor: First News Broadsheet */}
          <div
            ref={(el) => (sceneRefs.current[2] = el)}
            data-scene-id="3"
            className="absolute top-[66%] h-px w-full snap-start pointer-events-none"
          />
          {/* Scene 4 Anchor: App Ecosystem Phone Settled Stage */}
          <div
            ref={(el) => (sceneRefs.current[3] = el)}
            data-scene-id="4"
            className="absolute top-[85%] h-px w-full snap-start pointer-events-none"
          />
        </div>

        {/* Scene 5: World's Digital Screen Reality */}
        <div ref={(el) => (sceneRefs.current[4] = el)} data-scene-id="5" className="h-screen w-full snap-start snap-always">
          <WorldUsageScene />
        </div>

        {/* Scene 6: India's Digital Screen Reality */}
        <div ref={(el) => (sceneRefs.current[5] = el)} data-scene-id="6" className="h-screen w-full snap-start snap-always">
          <IndiaUsageScene />
        </div>

        {/* Scene 7: The Instagram Trap — Feature Evolution & Psychology (How Every Feature Was Engineered To Glue Users In) */}
        <div ref={(el) => (sceneRefs.current[6] = el)} data-scene-id="7" className="h-screen w-full snap-start snap-always">
          <InstagramEvolutionScene />
        </div>

        {/* Scene 8: Behavioral Definition */}
        <div ref={(el) => (sceneRefs.current[7] = el)} data-scene-id="8" className="h-screen w-full snap-start snap-always">
          <DefinitionScene />
        </div>

        {/* Scene 9: Healthy Balance vs. Digital Chaos */}
        <div ref={(el) => (sceneRefs.current[8] = el)} data-scene-id="9" className="h-screen w-full snap-start snap-always">
          <HealthyVsAddictionScene />
        </div>

        {/* Scene 10: Pause & Reflection (Blank emotional transition to Brain) */}
        <div ref={(el) => (sceneRefs.current[9] = el)} data-scene-id="10" className="h-screen w-full snap-start snap-always">
          <BlankPauseScene />
        </div>

        {/* Scene 11: Dopamine Loop & Infinite Scroll Tunnel */}
        <div ref={(el) => (sceneRefs.current[10] = el)} data-scene-id="11" className="h-[300vh] w-full snap-start relative sticky-scene-container">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <DopamineScene />
          </div>
        </div>

        {/* Scene 12: Easy Access & Frictionless Addiction */}
        <div ref={(el) => (sceneRefs.current[11] = el)} data-scene-id="12" className="h-screen w-full snap-start snap-always">
          <EasyAccessScene />
        </div>

        {/* Scene 13: Why India's Youth Is Most Targeted */}
        <div ref={(el) => (sceneRefs.current[12] = el)} data-scene-id="13" className="h-screen w-full snap-start snap-always">
          <IndiaYouthImpactScene />
        </div>

        {/* Scene 14: Life Expectancy & Social Media Reality Check */}
        <div ref={(el) => (sceneRefs.current[13] = el)} data-scene-id="14" className="h-screen w-full snap-start snap-always">
          <LifeCalculatorInfographicScene />
        </div>

        {/* Scene 15: Global Statistics */}
        <div ref={(el) => (sceneRefs.current[14] = el)} data-scene-id="15" className="h-screen w-full snap-start snap-always">
          <StatisticsScene />
        </div>

        {/* Scene 16: Family Dinner Table */}
        <div ref={(el) => (sceneRefs.current[15] = el)} data-scene-id="16" className="h-screen w-full snap-start snap-always">
          <FamilyDinnerScene />
        </div>

        {/* Scene 17: Human Relationships */}
        <div ref={(el) => (sceneRefs.current[16] = el)} data-scene-id="17" className="h-screen w-full snap-start snap-always">
          <RelationshipsScene />
        </div>

        {/* Scene 18: Career Focus & Deep Work */}
        <div ref={(el) => (sceneRefs.current[17] = el)} data-scene-id="18" className="h-screen w-full snap-start snap-always">
          <CareerFocusScene />
        </div>

        {/* Scene 19: The Loop Closing Scene */}
        <div ref={(el) => (sceneRefs.current[18] = el)} data-scene-id="19" className="h-screen w-full snap-start snap-always">
          <TheLoopClosingScene onRestart={() => scrollToScene(1)} />
        </div>
      </main>
    </div>
  );
}
