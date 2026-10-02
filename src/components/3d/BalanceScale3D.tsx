import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface BalanceScale3DProps {
  chaosLevel: number; // 0 (100% Zen) to 100 (100% Chaos)
  className?: string;
  onPanClick?: (side: 'healthy' | 'chaos') => void;
  impulseTrigger?: number;
  impulseDirection?: 'healthy' | 'chaos';
}

export const BalanceScale3D: React.FC<BalanceScale3DProps> = ({
  chaosLevel,
  className = '',
  onPanClick,
  impulseTrigger = 0,
  impulseDirection = 'healthy',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const chaosRef = useRef(chaosLevel);
  const impulseRef = useRef(0);
  const [hoveredPan, setHoveredPan] = useState<'healthy' | 'chaos' | null>(null);

  // Sync ref
  useEffect(() => {
    chaosRef.current = chaosLevel;
  }, [chaosLevel]);

  // Apply impulse when triggered externally (e.g. card item click)
  useEffect(() => {
    if (impulseTrigger > 0) {
      if (impulseDirection === 'healthy') {
        impulseRef.current += 0.085;
      } else {
        impulseRef.current -= 0.085;
      }
    }
  }, [impulseTrigger, impulseDirection]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 150;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 9.2);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(2, 6, 5);
    scene.add(dirLight);

    // Point lights for dual glows
    const greenPointLight = new THREE.PointLight(0x10b981, 2.5, 8);
    greenPointLight.position.set(-3.2, 1.2, 1);
    scene.add(greenPointLight);

    const redPointLight = new THREE.PointLight(0xef4444, 2.5, 8);
    redPointLight.position.set(3.2, 1.2, 1);
    scene.add(redPointLight);

    // 3. Central Fulcrum Base
    const fulcrumGroup = new THREE.Group();
    scene.add(fulcrumGroup);

    // Base pedestal
    const baseGeo = new THREE.CylinderGeometry(0.7, 0.9, 0.15, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.85,
      roughness: 0.25,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -1.1;
    fulcrumGroup.add(baseMesh);

    // Glowing base ring
    const ringGeo = new THREE.TorusGeometry(0.78, 0.03, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -1.02;
    fulcrumGroup.add(ringMesh);

    // Center vertical pillar
    const pillarGeo = new THREE.CylinderGeometry(0.12, 0.18, 1.6, 24);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.9,
      roughness: 0.2,
    });
    const pillarMesh = new THREE.Mesh(pillarGeo, pillarMat);
    pillarMesh.position.y = -0.3;
    fulcrumGroup.add(pillarMesh);

    // Pivot sphere
    const pivotSphereGeo = new THREE.SphereGeometry(0.24, 32, 32);
    const pivotSphereMat = new THREE.MeshStandardMaterial({
      color: 0xa1a1aa,
      metalness: 0.95,
      roughness: 0.1,
    });
    const pivotSphere = new THREE.Mesh(pivotSphereGeo, pivotSphereMat);
    pivotSphere.position.y = 0.52;
    fulcrumGroup.add(pivotSphere);

    // 4. Rotating Beam Assembly (Pivots on the Fulcrum)
    const beamGroup = new THREE.Group();
    beamGroup.position.set(0, 0.52, 0);
    scene.add(beamGroup);

    const beamArmHalfLength = 3.1;

    // Main horizontal crossbar
    const beamGeo = new THREE.BoxGeometry(beamArmHalfLength * 2, 0.08, 0.14);
    const beamMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.15,
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamGroup.add(beamMesh);

    // Decorative gradient core strip on the beam
    const stripGeo = new THREE.BoxGeometry(beamArmHalfLength * 1.95, 0.03, 0.16);
    const stripMat = new THREE.MeshStandardMaterial({
      color: 0x52525b,
      metalness: 0.5,
      roughness: 0.5,
    });
    const stripMesh = new THREE.Mesh(stripGeo, stripMat);
    beamGroup.add(stripMesh);

    // 5. Left Suspension & Pan (Mind & Rest - Emerald Zen)
    const leftHook = new THREE.Group();
    leftHook.position.set(-beamArmHalfLength, 0, 0);
    beamGroup.add(leftHook);

    // Left pan hanger cords
    const cordMaterial = new THREE.LineBasicMaterial({ color: 0x71717a, transparent: true, opacity: 0.8 });
    const cordGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.55, -1.3, 0.35),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.55, -1.3, 0.35),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -1.3, -0.6),
    ]);
    const cordsLeft = new THREE.LineSegments(cordGeo, cordMaterial);
    leftHook.add(cordsLeft);

    // Left Pan plate
    const panGeo = new THREE.CylinderGeometry(0.75, 0.6, 0.08, 32);
    const leftPanMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      metalness: 0.6,
      roughness: 0.3,
      emissive: 0x065f46,
      emissiveIntensity: 0.2,
    });
    const leftPan = new THREE.Mesh(panGeo, leftPanMat);
    leftPan.position.y = -1.34;
    leftHook.add(leftPan);

    // Left Pan glowing rim
    const leftRimGeo = new THREE.TorusGeometry(0.75, 0.03, 16, 48);
    const leftRimMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const leftRim = new THREE.Mesh(leftRimGeo, leftRimMat);
    leftRim.rotation.x = Math.PI / 2;
    leftRim.position.y = -1.3;
    leftHook.add(leftRim);

    // Left Payload: Zen Floating Crystal / Gem Stack
    const crystalGroup = new THREE.Group();
    crystalGroup.position.set(0, -1.05, 0);
    leftHook.add(crystalGroup);

    // Main Zen Emerald Octahedron
    const crystalGeo = new THREE.OctahedronGeometry(0.42, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.5,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.65,
      ior: 1.5,
      thickness: 0.5,
    });
    const mainCrystal = new THREE.Mesh(crystalGeo, crystalMat);
    crystalGroup.add(mainCrystal);

    // Wireframe overlay for cyber-zen aesthetic
    const wireGeo = new THREE.WireframeGeometry(crystalGeo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.6 });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    crystalGroup.add(wireMesh);

    // Orbiting mini zen orbs
    const orbitOrbGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const orbitOrbMat = new THREE.MeshStandardMaterial({
      color: 0xa7f3d0,
      emissive: 0x34d399,
      emissiveIntensity: 0.8,
    });
    const orbitOrbs: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const orb = new THREE.Mesh(orbitOrbGeo, orbitOrbMat);
      crystalGroup.add(orb);
      orbitOrbs.push(orb);
    }

    // 6. Right Suspension & Pan (Digital Chaos - Neon Red Overload)
    const rightHook = new THREE.Group();
    rightHook.position.set(beamArmHalfLength, 0, 0);
    beamGroup.add(rightHook);

    const cordsRight = new THREE.LineSegments(cordGeo, cordMaterial);
    rightHook.add(cordsRight);

    // Right Pan plate
    const rightPanMat = new THREE.MeshStandardMaterial({
      color: 0x450a0a,
      metalness: 0.6,
      roughness: 0.3,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.2,
    });
    const rightPan = new THREE.Mesh(panGeo, rightPanMat);
    rightPan.position.y = -1.34;
    rightHook.add(rightPan);

    // Right Pan glowing rim
    const rightRimMat = new THREE.MeshBasicMaterial({ color: 0xf87171 });
    const rightRim = new THREE.Mesh(leftRimGeo, rightRimMat);
    rightRim.rotation.x = Math.PI / 2;
    rightRim.position.y = -1.3;
    rightHook.add(rightRim);

    // Right Payload: Heavy Chaotic Pile of Notification Cubes & Spikes
    const chaosPileGroup = new THREE.Group();
    chaosPileGroup.position.set(0, -1.15, 0);
    rightHook.add(chaosPileGroup);

    // Notification cubes stack
    const cubeGeo = new THREE.BoxGeometry(0.24, 0.22, 0.24);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.5,
      metalness: 0.3,
      roughness: 0.2,
    });

    const chaosCubes: { mesh: THREE.Mesh; basePos: THREE.Vector3; jitterAmp: number }[] = [];
    const cubeOffsets = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.2, 0.12, 0.1),
      new THREE.Vector3(0.22, 0.1, -0.1),
      new THREE.Vector3(0, 0.3, 0.05),
      new THREE.Vector3(-0.12, 0.44, -0.08),
      new THREE.Vector3(0.14, 0.48, 0.06),
      new THREE.Vector3(0, 0.68, 0), // Top pinnacle notification
    ];

    cubeOffsets.forEach((pos, idx) => {
      const mesh = new THREE.Mesh(cubeGeo, cubeMat.clone());
      // Top cube has alert warning color
      if (idx === cubeOffsets.length - 1) {
        (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0xff0044);
        (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.0;
      }
      mesh.position.copy(pos);
      mesh.rotation.set((idx * 0.4) % 1, (idx * 0.7) % 1, (idx * 0.2) % 1);
      chaosPileGroup.add(mesh);
      chaosCubes.push({ mesh, basePos: pos.clone(), jitterAmp: (idx + 1) * 0.02 });
    });

    // 7. Interactive Physics Spring Simulation
    let currentAngle = 0;
    let targetAngle = 0;
    let angularVelocity = 0;
    const springConstant = 0.045;
    const damping = 0.88;
    let impulse = 0;

    // Raycaster for hover/clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([leftPan, rightPan, mainCrystal, ...chaosCubes.map((c) => c.mesh)], true);

      if (intersects.length > 0) {
        const hitX = intersects[0].point.x;
        if (hitX < 0) {
          setHoveredPan('healthy');
          container.style.cursor = 'pointer';
        } else {
          setHoveredPan('chaos');
          container.style.cursor = 'pointer';
        }
      } else {
        setHoveredPan(null);
        container.style.cursor = 'default';
      }
    };

    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([leftPan, rightPan, mainCrystal, ...chaosCubes.map((c) => c.mesh)], true);

      if (intersects.length > 0) {
        const hitX = intersects[0].point.x;
        if (hitX < 0) {
          impulse += 0.08; // Push left pan down
          onPanClick?.('healthy');
        } else {
          impulse -= 0.08; // Push right pan down
          onPanClick?.('chaos');
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onClick);

    // 8. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const currentChaos = chaosRef.current;

      // Calculate desired beam angle:
      // When chaosLevel = 50: angle = 0 (Level)
      // When chaosLevel = 100: right side heavy -> negative Z rotation (tips right down)
      // When chaosLevel = 0: left side heavy -> positive Z rotation (tips left down)
      const normalizedChaos = (currentChaos - 50) / 50; // -1 to +1

      // Subtle biological pendulum breathing: the scale gently bobs and sways like a real balance
      const idleBob = Math.sin(elapsedTime * 1.6) * 0.018 + Math.cos(elapsedTime * 2.8) * 0.007;
      targetAngle = -normalizedChaos * 0.32 + idleBob;

      // Consume any external impulse triggered by user clicks
      if (Math.abs(impulseRef.current) > 0.001) {
        impulse += impulseRef.current;
        impulseRef.current *= 0.5;
      }

      // Spring physics step
      const force = (targetAngle - currentAngle) * springConstant + impulse;
      impulse *= 0.85; // Dissipate impulse
      angularVelocity += force;
      angularVelocity *= damping;
      currentAngle += angularVelocity;

      // Apply beam tilt
      beamGroup.rotation.z = currentAngle;

      // Counter-rotate the hanging pans so they remain vertically aligned under gravity!
      leftHook.rotation.z = -currentAngle;
      rightHook.rotation.z = -currentAngle;

      // Zen Emerald Crystal Idle Levitation & Harmonic Spin with breathing light
      mainCrystal.rotation.y = elapsedTime * 0.8;
      mainCrystal.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;
      wireMesh.rotation.y = -elapsedTime * 0.4;
      crystalGroup.position.y = -1.05 + Math.sin(elapsedTime * 2) * 0.05;
      crystalMat.emissiveIntensity = 0.5 + Math.sin(elapsedTime * 2.2) * 0.25;

      // Orbiting zen beads
      orbitOrbs.forEach((orb, i) => {
        const angle = elapsedTime * 1.5 + (i * Math.PI * 2) / 3;
        const rad = 0.55 + Math.sin(elapsedTime * 3 + i) * 0.04;
        orb.position.set(Math.cos(angle) * rad, Math.sin(elapsedTime * 2 + i) * 0.08, Math.sin(angle) * rad);
      });

      // Digital Chaos Jitter & Alert Pulsing
      const chaosIntensity = Math.max(0, (currentChaos - 40) / 60); // 0 to 1
      chaosCubes.forEach(({ mesh, basePos, jitterAmp }, idx) => {
        if (chaosIntensity > 0.1) {
          const jitterX = (Math.random() - 0.5) * jitterAmp * chaosIntensity * 0.35;
          const jitterY = (Math.random() - 0.5) * jitterAmp * chaosIntensity * 0.35;
          const jitterZ = (Math.random() - 0.5) * jitterAmp * chaosIntensity * 0.35;
          mesh.position.set(basePos.x + jitterX, basePos.y + jitterY, basePos.z + jitterZ);
          mesh.rotation.y += 0.02 * chaosIntensity;
        } else {
          mesh.position.lerp(basePos, 0.1);
        }
      });

      // Dynamic light intensity based on active weight
      greenPointLight.intensity = 1.2 + (1 - currentChaos / 100) * 2.5;
      redPointLight.intensity = 1.2 + (currentChaos / 100) * 2.5;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 150;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onPanClick]);

  return (
    <div className={`relative w-full h-[140px] sm:h-[160px] flex items-center justify-center ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating status badges beneath pans for clear, playful context */}
      <div className="absolute inset-x-4 bottom-1 flex items-center justify-between pointer-events-none text-[11px] font-mono select-none px-4 sm:px-12">
        <div
          className={`flex items-center gap-1.5 transition-all duration-300 ${
            chaosLevel < 50 ? 'text-emerald-400 font-bold scale-105' : 'text-neutral-500'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Mind & Rest (Gravity: {100 - chaosLevel}%)</span>
        </div>

        <div
          className={`flex items-center gap-1.5 transition-all duration-300 ${
            chaosLevel > 50 ? 'text-red-400 font-bold scale-105' : 'text-neutral-500'
          }`}
        >
          <span>Digital Overload ({chaosLevel}%)</span>
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
        </div>
      </div>
    </div>
  );
};
