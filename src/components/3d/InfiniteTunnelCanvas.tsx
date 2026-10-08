import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InfiniteTunnelCanvasProps {
  isRunning?: boolean;
  speedResetTrigger?: number;
  onSpeedChange?: (speedMultiplier: number) => void;
}

const EMOJI_LIST = [
  '📱', '❤️', '🔥', '💬', '⚡', '🔔', '😱', '🍕',
  '🚀', '💸', '🎮', '🍔', '🎁', '🎬', '🍿', '👑',
  '💎', '🏆', '📸', '✨', '💯', '🤩', '🍩', '🛍️',
  '🧠', '👀', '🎯', '🚨', '🍬', '☕', '🎪', '🎉',
];

const NEON_COLORS = [
  0x00f0ff, // Cyan
  0xff007f, // Neon Pink
  0x7928ca, // Electric Violet
  0xff0055, // Hot Magenta
  0x00ffcc, // Bright Mint
  0xffbe0b, // Cyber Amber
];

function createEmojiTexture(emoji: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 128, 128);

    // Subtle dark circular badge background with neon rim glow
    ctx.beginPath();
    ctx.arc(64, 64, 52, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(12, 12, 22, 0.82)';
    ctx.fill();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
    ctx.stroke();

    // High quality emoji rendering with standard emoji fonts
    ctx.font = '64px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Android Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 64, 68);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

export const InfiniteTunnelCanvas: React.FC<InfiniteTunnelCanvasProps> = ({
  isRunning = true,
  speedResetTrigger = 0,
  onSpeedChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(0.4); // Start at comfortable energetic vortex speed
  const targetSpeedRef = useRef(0.4);
  const isRunningRef = useRef(isRunning);
  const onSpeedChangeRef = useRef(onSpeedChange);
  const isFirstMount = useRef(true);

  useEffect(() => {
    isRunningRef.current = isRunning;
    targetSpeedRef.current = isRunning ? Math.max(0.4, speedRef.current) : 0.08;
  }, [isRunning]);

  useEffect(() => {
    onSpeedChangeRef.current = onSpeedChange;
  }, [onSpeedChange]);

  // Reset speed when reset trigger fires
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    speedRef.current = 0.4;
    targetSpeedRef.current = 0.4;
    if (onSpeedChangeRef.current) {
      onSpeedChangeRef.current(0.4);
    }
  }, [speedResetTrigger]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Get current dimensions with reliable window fallbacks
    const getWidth = () => container.clientWidth || window.innerWidth;
    const getHeight = () => container.clientHeight || window.innerHeight;

    let width = getWidth();
    let height = getHeight();

    // Setup Three.js Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.028);

    // Perspective Camera at (0, 0, 2)
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
    camera.position.set(0, 0, 2);

    // High performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const canvasEl = renderer.domElement;
    canvasEl.style.position = 'absolute';
    canvasEl.style.top = '0';
    canvasEl.style.left = '0';
    canvasEl.style.width = '100%';
    canvasEl.style.height = '100%';
    canvasEl.style.display = 'block';
    canvasEl.style.pointerEvents = 'none';
    container.appendChild(canvasEl);

    // Pre-render Emoji Canvas Textures
    const emojiTextures = EMOJI_LIST.map((emoji) => createEmojiTexture(emoji));

    // 1. Distant Black Hole Singularity at Z = -50
    const blackHoleGroup = new THREE.Group();
    blackHoleGroup.position.set(0, 0, -50);

    const holeGeo = new THREE.SphereGeometry(2.8, 32, 32);
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const holeMesh = new THREE.Mesh(holeGeo, holeMat);
    blackHoleGroup.add(holeMesh);

    // Glowing Accretion Disk around Black Hole
    const diskGeo = new THREE.RingGeometry(3.0, 7.5, 64);
    const diskMat = new THREE.MeshBasicMaterial({
      color: 0xff0055,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const diskMesh = new THREE.Mesh(diskGeo, diskMat);
    blackHoleGroup.add(diskMesh);

    // Secondary Pulsing Inner Ring
    const innerDiskGeo = new THREE.RingGeometry(2.8, 3.8, 48);
    const innerDiskMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const innerDiskMesh = new THREE.Mesh(innerDiskGeo, innerDiskMat);
    blackHoleGroup.add(innerDiskMesh);

    scene.add(blackHoleGroup);

    // 2. Concentric Neon Tunnel Rings (Moving forward towards camera)
    const ringCount = 32;
    const ringZMin = -50;
    const ringZMax = 3.5;
    const ringZSpan = ringZMax - ringZMin;
    const rings: { mesh: THREE.Mesh; baseZ: number; colorIndex: number }[] = [];

    const ringGeometry = new THREE.RingGeometry(3.6, 3.82, 40);

    for (let i = 0; i < ringCount; i++) {
      const colorIndex = i % NEON_COLORS.length;
      const mat = new THREE.MeshBasicMaterial({
        color: NEON_COLORS[colorIndex],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });
      const mesh = new THREE.Mesh(ringGeometry, mat);
      const initialZ = ringZMin + (i / ringCount) * ringZSpan;
      mesh.position.set(0, 0, initialZ);
      scene.add(mesh);
      rings.push({ mesh, baseZ: initialZ, colorIndex });
    }

    // 3. Radial Laser Stream Pathway Lines along Tunnel Walls
    const lineCount = 18;
    const pathwayGroup = new THREE.Group();
    const pathwayLines: THREE.Line[] = [];

    for (let l = 0; l < lineCount; l++) {
      const angle = (l / lineCount) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      const segments = 20;

      for (let s = 0; s <= segments; s++) {
        const frac = s / segments;
        const curZ = -50 + frac * 53; // From -50 to +3
        const r = 3.7 + Math.sin(frac * Math.PI) * 0.2;
        const curAngle = angle + frac * 0.6; // subtle spiral twist
        points.push(new THREE.Vector3(Math.cos(curAngle) * r, Math.sin(curAngle) * r, curZ));
      }

      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: l % 2 === 0 ? 0x00f0ff : 0xff007f,
        transparent: true,
        opacity: 0.45,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      pathwayGroup.add(line);
      pathwayLines.push(line);
    }
    scene.add(pathwayGroup);

    // 4. Cyber Space Star Dust Particles
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starVelocities = new Float32Array(starCount);

    for (let s = 0; s < starCount; s++) {
      const starAngle = Math.random() * Math.PI * 2;
      const starRadius = 0.5 + Math.random() * 3.8;
      starPositions[s * 3] = Math.cos(starAngle) * starRadius;
      starPositions[s * 3 + 1] = Math.sin(starAngle) * starRadius;
      starPositions[s * 3 + 2] = -50 + Math.random() * 52;
      starVelocities[s] = 0.4 + Math.random() * 0.6;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const starParticles = new THREE.Points(starGeo, starMat);
    scene.add(starParticles);

    // 5. Swirling Emojis rushing towards the user
    const emojiCount = 30;
    const emojiGroup = new THREE.Group();
    const emojiItems: {
      sprite: THREE.Sprite;
      angle: number;
      radius: number;
      z: number;
      speedZ: number;
      swirlRate: number;
      baseScale: number;
    }[] = [];

    for (let i = 0; i < emojiCount; i++) {
      const tex = emojiTextures[i % emojiTextures.length];
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0.95,
      });
      const sprite = new THREE.Sprite(mat);
      const baseScale = 0.9 + Math.random() * 0.4;
      sprite.scale.set(baseScale, baseScale, 1);

      const angle = (i / emojiCount) * Math.PI * 2 + Math.random() * 0.2;
      const radius = 1.4 + Math.random() * 2.2;
      const z = -48 + (i / emojiCount) * 50;

      sprite.position.x = Math.cos(angle) * radius;
      sprite.position.y = Math.sin(angle) * radius;
      sprite.position.z = z;

      emojiGroup.add(sprite);
      emojiItems.push({
        sprite,
        angle,
        radius,
        z,
        speedZ: 0.35 + Math.random() * 0.25,
        swirlRate: (Math.random() > 0.5 ? 1 : -1) * (0.015 + Math.random() * 0.02),
        baseScale,
      });
    }
    scene.add(emojiGroup);

    // Dynamic Resizing handler
    const handleResize = () => {
      if (!container) return;
      width = getWidth();
      height = getHeight();
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Double-check dimensions after layout tick
    const initTimer = setTimeout(handleResize, 60);

    // Animation Loop
    let reqId: number;
    let clock = new THREE.Clock();
    let frameCounter = 0;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.08); // cap max delta on tab switch
      const isLive = isRunningRef.current;

      // Smooth interpolation of speed towards target
      if (isLive) {
        if (targetSpeedRef.current < 0.9) {
          targetSpeedRef.current += 0.0015; // self-accelerates gently up to 0.9
        }
      }

      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08;
      const curSpeed = isLive ? speedRef.current : 0.06;

      frameCounter++;
      if (isLive && frameCounter % 15 === 0 && onSpeedChangeRef.current) {
        onSpeedChangeRef.current(curSpeed);
      }

      // Rotate Black hole accretion disks
      diskMesh.rotation.z -= 0.018 * curSpeed * (60 * delta);
      innerDiskMesh.rotation.z += 0.032 * curSpeed * (60 * delta);
      pathwayGroup.rotation.z += 0.005 * curSpeed * (60 * delta);

      // Pulse accretion disk scale
      const pulse = 1 + Math.sin(frameCounter * 0.05) * 0.05;
      diskMesh.scale.set(pulse, pulse, 1);

      // Move Rings forward towards camera (+Z)
      const ringSpeed = 12.0 * curSpeed * delta;
      rings.forEach((item) => {
        item.mesh.position.z += ringSpeed;
        item.mesh.rotation.z += 0.004 * curSpeed * (60 * delta);

        // Calculate opacity based on Z depth
        const z = item.mesh.position.z;
        const mat = item.mesh.material as THREE.MeshBasicMaterial;

        if (z < -40) {
          // Fade in near distant singularity
          mat.opacity = Math.max(0, (z + 50) / 10) * 0.75;
        } else if (z > 1.2) {
          // Fade out as it passes camera
          mat.opacity = Math.max(0, (3.2 - z) / 2.0) * 0.75;
        } else {
          mat.opacity = 0.75;
        }

        // Recycle ring back to distant singularity
        if (item.mesh.position.z > ringZMax) {
          item.mesh.position.z = ringZMin + (item.mesh.position.z - ringZMax);
        }
      });

      // Move Star Particles forward
      const posAttr = starGeo.getAttribute('position') as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const starBaseSpeed = 24.0 * curSpeed * delta;

      for (let s = 0; s < starCount; s++) {
        let starZ = posArray[s * 3 + 2] + starBaseSpeed * starVelocities[s];
        if (starZ > 2.5) {
          starZ = -50;
        }
        posArray[s * 3 + 2] = starZ;
      }
      posAttr.needsUpdate = true;

      // Move Emojis forward towards camera along spiral vortex
      const emojiSpeed = 16.0 * curSpeed * delta;
      emojiItems.forEach((item) => {
        item.z += emojiSpeed * item.speedZ;
        item.angle += item.swirlRate * (60 * delta) * curSpeed;

        // As it approaches camera, spiral radius expands slightly into periphery
        const zFrac = Math.max(0, Math.min(1, (item.z + 50) / 52));
        const currentR = item.radius * (0.35 + zFrac * 0.65);

        item.sprite.position.x = Math.cos(item.angle) * currentR;
        item.sprite.position.y = Math.sin(item.angle) * currentR;
        item.sprite.position.z = item.z;

        // Scale & opacity based on depth
        const mat = item.sprite.material as THREE.SpriteMaterial;
        if (item.z > 1.0) {
          // Fade out before clipping camera plane
          mat.opacity = Math.max(0, (2.2 - item.z) / 1.2);
        } else if (item.z < -42) {
          mat.opacity = Math.max(0, (item.z + 48) / 6);
        } else {
          mat.opacity = 0.95;
        }

        // Recycle emoji back to singularity
        if (item.z > 2.2) {
          item.z = -50 + Math.random() * 4;
          item.angle = Math.random() * Math.PI * 2;
          item.radius = 1.4 + Math.random() * 2.2;
          // Randomize texture on respawn for variety
          const newTex = emojiTextures[Math.floor(Math.random() * emojiTextures.length)];
          mat.map = newTex;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      clearTimeout(initTimer);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();

      if (container.contains(canvasEl)) {
        container.removeChild(canvasEl);
      }

      // Dispose Resources
      ringGeometry.dispose();
      holeGeo.dispose();
      holeMat.dispose();
      diskGeo.dispose();
      diskMat.dispose();
      innerDiskGeo.dispose();
      innerDiskMat.dispose();
      starGeo.dispose();
      starMat.dispose();

      emojiTextures.forEach((t) => t.dispose());
      emojiItems.forEach((item) => {
        item.sprite.material.dispose();
      });
      rings.forEach((r) => {
        (r.mesh.material as THREE.Material).dispose();
      });
      pathwayLines.forEach((l) => {
        l.geometry.dispose();
        (l.material as THREE.Material).dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full absolute inset-0 pointer-events-none opacity-90 select-none overflow-hidden"
    />
  );
};
