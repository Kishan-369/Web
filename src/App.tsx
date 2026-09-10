import React, { useState, useEffect, useRef } from 'react';
import { CursorSpotlight } from './components/CursorSpotlight';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from './utils/soundEngine';

// Scenes
import { HeroScene } from './components/scenes/HeroScene';
import { QuizTimeScene } from './components/scenes/QuizTimeScene';
import { FakeNewsScene } from './components/scenes/FakeNewsScene';
import { DarkRoomScene } from './components/scenes/DarkRoomScene';
import { AppEcosystemScene } from './components/scenes/AppEcosystemScene';
import { DefinitionScene } from './components/scenes/DefinitionScene';
import { WorldUsageScene } from './components/scenes/WorldUsageScene';
import { IndiaUsageScene } from './components/scenes/IndiaUsageScene';
import { HealthyVsAddictionScene } from './components/scenes/HealthyVsAddictionScene';
import { DopamineScene } from './components/scenes/DopamineScene';
import { InfiniteScrollScene } from './components/scenes/InfiniteScrollScene';
import { EasyAccessScene } from './components/scenes/EasyAccessScene';
import { InstagramEvolutionScene } from './components/scenes/InstagramEvolutionScene';
import { IndiaYouthImpactScene } from './components/scenes/IndiaYouthImpactScene';
import { LifeCalculatorInfographicScene } from './components/scenes/LifeCalculatorInfographicScene';
import { AttentionEconomyScene } from './components/scenes/AttentionEconomyScene';
import { AlgorithmScene } from './components/scenes/AlgorithmScene';
import { StatisticsScene } from './components/scenes/StatisticsScene';
import { PositiveSideScene } from './components/scenes/PositiveSideScene';
import { FamilyDinnerScene } from './components/scenes/FamilyDinnerScene';
import { RelationshipsScene } from './components/scenes/RelationshipsScene';
import { CareerFocusScene } from './components/scenes/CareerFocusScene';
import { MentalHealthDetoxScene } from './components/scenes/MentalHealthDetoxScene';
import { FinalAwakeningScene } from './components/scenes/FinalAwakeningScene';

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
        {/* Scene 1: Title Page */}
        <div ref={(el) => (sceneRefs.current[0] = el)} data-scene-id="1" className="h-screen w-full snap-start snap-always">
          <HeroScene onScrollToNext={() => scrollToScene(2)} />
        </div>

        {/* Scene 2: Dedicated Assembly Live Quiz Time */}
        <div ref={(el) => (sceneRefs.current[1] = el)} data-scene-id="2" className="h-screen w-full snap-start snap-always">
          <QuizTimeScene />
        </div>

        {/* Scene 3: Fake News Magazine Story 1 */}
        <div ref={(el) => (sceneRefs.current[2] = el)} data-scene-id="3" className="h-screen w-full snap-start snap-always">
          <FakeNewsScene storyIndex={1} onNextStory={() => scrollToScene(4)} />
        </div>

        {/* Scene 4: Fake News Magazine Story 2 */}
        <div ref={(el) => (sceneRefs.current[3] = el)} data-scene-id="4" className="h-screen w-full snap-start snap-always">
          <FakeNewsScene storyIndex={2} onNextStory={() => scrollToScene(5)} />
        </div>

        {/* Scene 5: Fake News Magazine Story 3 */}
        <div ref={(el) => (sceneRefs.current[4] = el)} data-scene-id="5" className="h-screen w-full snap-start snap-always">
          <FakeNewsScene storyIndex={3} onNextStory={() => scrollToScene(6)} />
        </div>

        {/* Scene 6: Dark Room Scene */}
        <div ref={(el) => (sceneRefs.current[5] = el)} data-scene-id="6" className="h-screen w-full snap-start snap-always">
          <DarkRoomScene />
        </div>

        {/* Scene 7: App Ecosystem Explosion */}
        <div ref={(el) => (sceneRefs.current[6] = el)} data-scene-id="7" className="h-screen w-full snap-start snap-always">
          <AppEcosystemScene />
        </div>

        {/* Scene 8: Behavioral Definition */}
        <div ref={(el) => (sceneRefs.current[7] = el)} data-scene-id="8" className="h-screen w-full snap-start snap-always">
          <DefinitionScene />
        </div>

        {/* Scene 9: World's Digital Screen Reality */}
        <div ref={(el) => (sceneRefs.current[8] = el)} data-scene-id="9" className="h-screen w-full snap-start snap-always">
          <WorldUsageScene />
        </div>

        {/* Scene 10: India's Digital Screen Reality */}
        <div ref={(el) => (sceneRefs.current[9] = el)} data-scene-id="10" className="h-screen w-full snap-start snap-always">
          <IndiaUsageScene />
        </div>

        {/* Scene 11: Healthy Balance vs. Digital Chaos */}
        <div ref={(el) => (sceneRefs.current[10] = el)} data-scene-id="11" className="h-screen w-full snap-start snap-always">
          <HealthyVsAddictionScene />
        </div>

        {/* Scene 12: Dopamine Loop & Infinite Scroll Tunnel */}
        <div ref={(el) => (sceneRefs.current[11] = el)} data-scene-id="12" className="h-[300vh] w-full snap-start relative sticky-scene-container">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <DopamineScene />
          </div>
        </div>

        {/* Scene 14: Easy Access & Frictionless Addiction */}
        <div ref={(el) => (sceneRefs.current[13] = el)} data-scene-id="14" className="h-screen w-full snap-start snap-always">
          <EasyAccessScene />
        </div>

        {/* Scene 15: The Instagram Trap — Feature Evolution & Psychology */}
        <div ref={(el) => (sceneRefs.current[14] = el)} data-scene-id="15" className="h-screen w-full snap-start snap-always">
          <InstagramEvolutionScene />
        </div>

        {/* Scene 16: Why India's Youth Is Most Targeted */}
        <div ref={(el) => (sceneRefs.current[15] = el)} data-scene-id="16" className="h-screen w-full snap-start snap-always">
          <IndiaYouthImpactScene />
        </div>

        {/* Scene 17: Life Expectancy & Social Media Reality Check */}
        <div ref={(el) => (sceneRefs.current[16] = el)} data-scene-id="17" className="h-screen w-full snap-start snap-always">
          <LifeCalculatorInfographicScene />
        </div>

        {/* Scene 18: Attention Economy */}
        <div ref={(el) => (sceneRefs.current[17] = el)} data-scene-id="18" className="h-screen w-full snap-start snap-always">
          <AttentionEconomyScene />
        </div>

        {/* Scene 19: Algorithm Machine */}
        <div ref={(el) => (sceneRefs.current[18] = el)} data-scene-id="19" className="h-screen w-full snap-start snap-always">
          <AlgorithmScene />
        </div>

        {/* Scene 20: Global Statistics */}
        <div ref={(el) => (sceneRefs.current[19] = el)} data-scene-id="20" className="h-screen w-full snap-start snap-always">
          <StatisticsScene />
        </div>

        {/* Scene 21: Positive Side of Technology */}
        <div ref={(el) => (sceneRefs.current[20] = el)} data-scene-id="21" className="h-screen w-full snap-start snap-always">
          <PositiveSideScene />
        </div>

        {/* Scene 22: Family Dinner Table */}
        <div ref={(el) => (sceneRefs.current[21] = el)} data-scene-id="22" className="h-screen w-full snap-start snap-always">
          <FamilyDinnerScene />
        </div>

        {/* Scene 23: Human Relationships */}
        <div ref={(el) => (sceneRefs.current[22] = el)} data-scene-id="23" className="h-screen w-full snap-start snap-always">
          <RelationshipsScene />
        </div>

        {/* Scene 24: Career Focus & Deep Work */}
        <div ref={(el) => (sceneRefs.current[23] = el)} data-scene-id="24" className="h-screen w-full snap-start snap-always">
          <CareerFocusScene />
        </div>

        {/* Scene 25: Mental Health & Digital Detox */}
        <div ref={(el) => (sceneRefs.current[24] = el)} data-scene-id="25" className="h-screen w-full snap-start snap-always">
          <MentalHealthDetoxScene />
        </div>

        {/* Scene 26: Final Awakening */}
        <div ref={(el) => (sceneRefs.current[25] = el)} data-scene-id="26" className="h-screen w-full snap-start snap-always">
          <FinalAwakeningScene />
        </div>
      </main>
    </div>
  );
}
