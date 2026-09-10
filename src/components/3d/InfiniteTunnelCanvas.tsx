import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InfiniteTunnelCanvasProps {
  isRunning?: boolean;
  speedResetTrigger?: number;
  onSpeedChange?: (speedMultiplier: number) => void;
}

const EMOJI_LIST = [
  '📱', '❤️', '💬', '🎮', '🚀', '🔔', '🤡', '😱',
  '🍕', '🛍️', '🔥', '💸', '🍿', '📷', '🎧', '🕹️',
  '🧠', '⚡', '💎', '🏆', '🍔', '🎁', '🎬', '✈️',
];

export const InfiniteTunnelCanvas: React.FC<InfiniteTunnelCanvasProps> = ({
  isRunning = false,
  speedResetTrigger = 0,
  onSpeedChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(0.15); // Starts slowly
  const isRunningRef = useRef(isRunning);
  const onSpeedChangeRef = useRef(onSpeedChange);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    onSpeedChangeRef.current = onSpeedChange;
  }, [onSpeedChange]);

  // Reset speed when reset trigger fires
  useEffect(() => {
    speedRef.current = 0.15;
    if (onSpeedChangeRef.current) {
      onSpeedChangeRef.current(0.15);
    }
  }, [speedResetTrigger]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 8, 55);

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create Canvas Textures for Emojis
    const emojiTextures = EMOJI_LIST.map((emoji) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = '84px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    });

    // Central Black Hole Core at distant Z
    const blackHoleGeo = new THREE.SphereGeometry(2.5, 32, 32);
    const blackHoleMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const blackHole = new THREE.Mesh(blackHoleGeo, blackHoleMat);
    blackHole.position.set(0, 0, -45);
    scene.add(blackHole);

    // Accretion Disk Glow Ring around Black Hole
    const diskGeo = new THREE.RingGeometry(2.6, 6.5, 64);
    const diskMat = new THREE.MeshBasicMaterial({
      color: 0xff0055,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const accretionDisk = new THREE.Mesh(diskGeo, diskMat);
    accretionDisk.position.set(0, 0, -44.9);
    scene.add(accretionDisk);

    // Tunnel Rings
    const ringCount = 28;
    const rings: THREE.Mesh[] = [];

    for (let i = 0; i < ringCount; i++) {
      const geo = new THREE.RingGeometry(3.8, 4.0, 32);
      const mat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0xe50914 : i % 3 === 1 ? 0x00d9ff : 0xbf00ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.position.z = -i * 2.2;
      scene.add(ring);
      rings.push(ring);
    }

    // Swirling Emoji Particle Vortex being eaten by Black Hole
    const emojiCount = 80;
    const emojiGroup = new THREE.Group();
    const emojiItems: {
      sprite: THREE.Sprite;
      trailSprites: THREE.Sprite[];
      angle: number;
      radius: number;
      z: number;
      speedZ: number;
      swirlSpeed: number;
      baseSize: number;
    }[] = [];

    // Ghost trail materials for speed pathways
    const ghostCount = 3;

    for (let i = 0; i < emojiCount; i++) {
      const tex = emojiTextures[i % emojiTextures.length];
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0.95,
      });
      const sprite = new THREE.Sprite(mat);
      const baseSize = 1.2 + Math.random() * 0.8;
      sprite.scale.set(baseSize, baseSize, 1);

      // 360-degree distribution around outer screen edge
      const angle = (i / emojiCount) * Math.PI * 2 + Math.random() * 0.2;
      const radius = 5.5 + Math.random() * 3.5; // Distributes around top, bottom, left, right, diagonals
      const z = 5 - Math.random() * 50; // Distributed along tunnel length

      sprite.position.x = Math.cos(angle) * radius;
      sprite.position.y = Math.sin(angle) * radius;
      sprite.position.z = z;

      // Create trailing ghost sprites for visible motion pathway at high speeds
      const trailSprites: THREE.Sprite[] = [];
      for (let g = 0; g < ghostCount; g++) {
        const trailMat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: 0.4 / (g + 1),
          blending: THREE.AdditiveBlending,
        });
        const trailSprite = new THREE.Sprite(trailMat);
        trailSprite.scale.set(baseSize * 0.8, baseSize * 0.8, 1);
        emojiGroup.add(trailSprite);
        trailSprites.push(trailSprite);
      }

      emojiGroup.add(sprite);
      emojiItems.push({
        sprite,
        trailSprites,
        angle,
        radius,
        z,
        speedZ: 0.25 + Math.random() * 0.25,
        swirlSpeed: (Math.random() > 0.5 ? 1 : -1) * (0.015 + Math.random() * 0.02),
        baseSize,
      });
    }

    // Radial Speed Pathway Lines (360-degree laser streams into black hole)
    const lineCount = 20;
    const pathwayGroup = new THREE.Group();
    const pathwayLines: THREE.Line[] = [];

    for (let l = 0; l < lineCount; l++) {
      const lineAngle = (l / lineCount) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      const segments = 25;
      const startR = 8.5;

      for (let s = 0; s <= segments; s++) {
        const frac = s / segments;
        const curZ = 5 - frac * 50; // z from +5 to -45
        const curR = startR * Math.pow(1 - frac, 1.3);
        const curAngle = lineAngle + frac * 1.8; // spiral curve
        points.push(new THREE.Vector3(Math.cos(curAngle) * curR, Math.sin(curAngle) * curR, curZ));
      }

      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: l % 2 === 0 ? 0x00ffff : 0xff0088,
        transparent: true,
        opacity: 0.35,
        linewidth: 2,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      pathwayGroup.add(line);
      pathwayLines.push(line);
    }
    scene.add(pathwayGroup);

    scene.add(emojiGroup);

    // Ambient & Point Lighting
    const light = new THREE.PointLight(0xff0055, 3, 50);
    light.position.set(0, 0, -10);
    scene.add(light);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    let reqId: number;
    let frameCounter = 0;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const currentMultiplier = speedRef.current;

      // Rotate Accretion Disk & Pathway Lines continuously
      accretionDisk.rotation.z += 0.02 * (isRunningRef.current ? currentMultiplier : 1);
      pathwayGroup.rotation.z += 0.004 * (isRunningRef.current ? currentMultiplier : 0.5);

      // Make pathway lines glow brightly at higher speeds
      pathwayLines.forEach((line) => {
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = Math.min(0.85, 0.25 + currentMultiplier * 0.18);
      });

      if (!isRunningRef.current) {
        renderer.render(scene, camera);
        return;
      }

      // GRADUAL SELF-ACCELERATION when running: Start slowly (0.15x) and gradually speed up to (0.9x = 9.0x display)
      if (speedRef.current < 0.9) {
        speedRef.current += 0.0025; // Accelerates automatically
      }

      frameCounter++;
      if (frameCounter % 15 === 0 && onSpeedChangeRef.current) {
        onSpeedChangeRef.current(currentMultiplier);
      }

      // Move tunnel rings towards camera (giving inward pull illusion)
      rings.forEach((ring) => {
        ring.position.z += 0.08 * currentMultiplier;
        ring.rotation.z += 0.004 * currentMultiplier;
        if (ring.position.z > 2) {
          ring.position.z = -(ringCount * 2.2);
        }
      });

      // Swirl and suck emojis from 360-degree outer screen edges DEEP into the central black hole (Z = -45)
      emojiItems.forEach((item) => {
        // Store previous position for ghost trails
        const prevZ = item.z;
        const prevAngle = item.angle;

        // Advance item deeper into the black hole singularity (from Z=5 to Z=-45)
        item.z -= item.speedZ * 0.45 * currentMultiplier;
        item.angle += item.swirlSpeed * currentMultiplier;

        // Calculate progress t from outer viewport (Z=5) to black hole center (Z=-45)
        const t = Math.max(0, Math.min(1, (5 - item.z) / 50));

        // Spiral radius shrinks from outer screen edge (5.5-9.0) down to center (0.1)
        const currentRadius = Math.max(0.1, item.radius * Math.pow(1 - t, 1.3));
        const spiralAngle = item.angle + t * 2.5;

        item.sprite.position.x = Math.cos(spiralAngle) * currentRadius;
        item.sprite.position.y = Math.sin(spiralAngle) * currentRadius;
        item.sprite.position.z = item.z;

        // Scale sprite as it gets sucked into the singularity
        const currentScale = Math.max(0.2, item.baseSize * (1 - t * 0.7));
        item.sprite.scale.set(currentScale, currentScale, 1);

        // Update motion trail ghost sprites behind the main emoji along its 360-degree trajectory
        const trailOffset = 1.2 * (0.3 + currentMultiplier * 0.4);
        item.trailSprites.forEach((trailSprite, idx) => {
          const trailZ = item.z + (idx + 1) * trailOffset;
          const trailT = Math.max(0, Math.min(1, (5 - trailZ) / 50));
          const trailRadius = Math.max(0.1, item.radius * Math.pow(1 - trailT, 1.3));
          const trailSpiralAngle = item.angle - (idx + 1) * 0.1 + trailT * 2.5;

          trailSprite.position.x = Math.cos(trailSpiralAngle) * trailRadius;
          trailSprite.position.y = Math.sin(trailSpiralAngle) * trailRadius;
          trailSprite.position.z = trailZ;

          const trailScale = Math.max(0.15, currentScale * (0.85 - idx * 0.2));
          trailSprite.scale.set(trailScale, trailScale, 1);

          // Trail opacity increases at max speed
          const trailMat = trailSprite.material as THREE.SpriteMaterial;
          trailMat.opacity = Math.min(0.8, (0.35 / (idx + 1)) * (0.6 + currentMultiplier * 0.3));
        });

        // Respawn emoji at outer screen edge when swallowed by black hole singularity at Z <= -45
        if (item.z <= -45) {
          item.z = 5;
          item.angle = Math.random() * Math.PI * 2; // 360-degree random direction
          item.radius = 5.5 + Math.random() * 3.5;  // Outer viewport perimeter
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      emojiTextures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full absolute inset-0 pointer-events-none opacity-80" />;
};

