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
  isRunning = true,
  speedResetTrigger = 0,
  onSpeedChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(0.35); // Start at comfortable vortex speed, accelerating up to 0.9 (36 km/h)
  const isRunningRef = useRef(isRunning);
  const onSpeedChangeRef = useRef(onSpeedChange);
  const isFirstMount = useRef(true);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    onSpeedChangeRef.current = onSpeedChange;
  }, [onSpeedChange]);

  // Reset speed when reset trigger fires (skipping initial mount)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    speedRef.current = 0.35;
    if (onSpeedChangeRef.current) {
      onSpeedChangeRef.current(0.35);
    }
  }, [speedResetTrigger]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 6, 50);

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create Canvas Textures for Emojis with high-compatibility emoji font stack
    const emojiTextures = EMOJI_LIST.map((emoji) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 128, 128);
        ctx.font = '72px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Android Emoji", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, 64, 66);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
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

    // Tunnel Rings (Spanning smoothly between z = 1.5 and z = -44)
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
      ring.position.z = 1.5 - i * 1.6;
      scene.add(ring);
      rings.push(ring);
    }

    // Swirling Emoji Particle Vortex being sucked into Black Hole
    const emojiCount = 36;
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
    const ghostCount = 1;

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

      // 360-degree distribution around outer screen edge, strictly in front of camera (Z <= 0.5)
      const angle = (i / emojiCount) * Math.PI * 2 + Math.random() * 0.2;
      const radius = 5.0 + Math.random() * 3.5;
      const z = -Math.random() * 44; // Distributed safely along tunnel

      sprite.position.x = Math.cos(angle) * radius;
      sprite.position.y = Math.sin(angle) * radius;
      sprite.position.z = z;

      // Trailing ghost sprites for visible motion pathway
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
        const curZ = 0 - frac * 45; // z from 0 to -45
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
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    let reqId: number;
    let frameCounter = 0;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Active vs paused velocity multiplier
      const isLive = isRunningRef.current;
      const currentMultiplier = isLive ? speedRef.current : 0.12; // Slow aesthetic ambient drift when paused

      // Rotate Accretion Disk & Pathway Lines continuously
      accretionDisk.rotation.z += 0.02 * currentMultiplier;
      pathwayGroup.rotation.z += 0.004 * currentMultiplier;

      // Make pathway lines glow brightly at higher speeds
      pathwayLines.forEach((line) => {
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = Math.min(0.85, 0.25 + currentMultiplier * 0.18);
      });

      // GRADUAL SELF-ACCELERATION when running: smoothly accelerate up to 0.9x (36 km/h)
      if (isLive && speedRef.current < 0.9) {
        speedRef.current += 0.0025;
      }

      frameCounter++;
      if (isLive && frameCounter % 15 === 0 && onSpeedChangeRef.current) {
        onSpeedChangeRef.current(currentMultiplier);
      }

      // Move tunnel rings towards camera (giving inward pull illusion)
      rings.forEach((ring) => {
        ring.position.z += 0.06 * currentMultiplier; // Calibrated for 36 km/h
        ring.rotation.z += 0.0025 * currentMultiplier;
        if (ring.position.z > 1.8) {
          ring.position.z = -44;
        }
      });

      // Swirl and suck emojis into the central black hole (Z = -44)
      emojiItems.forEach((item) => {
        // Advance item deeper into the black hole singularity
        item.z -= item.speedZ * 0.3 * currentMultiplier;
        item.angle += item.swirlSpeed * 0.75 * currentMultiplier;

        // Calculate progress t from front (Z=0) to black hole center (Z=-44)
        const t = Math.max(0, Math.min(1, -item.z / 44));

        // Spiral radius shrinks from outer screen edge down to center
        const currentRadius = Math.max(0.1, item.radius * Math.pow(1 - t, 1.3));
        const spiralAngle = item.angle + t * 2.5;

        item.sprite.position.x = Math.cos(spiralAngle) * currentRadius;
        item.sprite.position.y = Math.sin(spiralAngle) * currentRadius;
        item.sprite.position.z = item.z;

        // Scale sprite as it gets sucked into the singularity
        const currentScale = Math.max(0.2, item.baseSize * (1 - t * 0.7));
        item.sprite.scale.set(currentScale, currentScale, 1);

        // Update motion trail ghost sprites behind the main emoji
        const trailOffset = 1.2 * (0.3 + currentMultiplier * 0.4);
        item.trailSprites.forEach((trailSprite, idx) => {
          const trailZ = item.z + (idx + 1) * trailOffset;
          const trailT = Math.max(0, Math.min(1, -trailZ / 44));
          const trailRadius = Math.max(0.1, item.radius * Math.pow(1 - trailT, 1.3));
          const trailSpiralAngle = item.angle - (idx + 1) * 0.1 + trailT * 2.5;

          trailSprite.position.x = Math.cos(trailSpiralAngle) * trailRadius;
          trailSprite.position.y = Math.sin(trailSpiralAngle) * trailRadius;
          trailSprite.position.z = trailZ;

          const trailScale = Math.max(0.15, currentScale * (0.85 - idx * 0.2));
          trailSprite.scale.set(trailScale, trailScale, 1);

          const trailMat = trailSprite.material as THREE.SpriteMaterial;
          trailMat.opacity = Math.min(0.8, (0.35 / (idx + 1)) * (0.6 + currentMultiplier * 0.3));
        });

        // Respawn emoji at outer screen perimeter when swallowed by black hole at Z <= -44
        if (item.z <= -44) {
          item.z = 0;
          item.angle = Math.random() * Math.PI * 2;
          item.radius = 5.0 + Math.random() * 3.5;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      emojiTextures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full absolute inset-0 pointer-events-none opacity-80" />;
};

