import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import worldMapCountries from '../scenes/worldMapData.json';
import { PlatformStage } from '../scenes/WorldUsageScene';

interface GoogleEarth3DCanvasProps {
  activeStage: PlatformStage;
  scrollProgress: number;
  className?: string;
}

// Convert 1000x500 equirectangular map coords to 3D Cartesian coords on a sphere of radius R
export function mapXYToVector3(xMap: number, yMap: number, radius: number): THREE.Vector3 {
  // lon from -180 to +180
  const lon = (xMap / 1000) * 360 - 180;
  // lat from +90 to -90
  const lat = 90 - (yMap / 500) * 180;

  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

export const GoogleEarth3DCanvas: React.FC<GoogleEarth3DCanvasProps> = ({
  activeStage,
  scrollProgress,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // References to keep render loop in sync without recreating Three.js scene
  const stageRef = useRef(activeStage);
  const scrollProgressRef = useRef(scrollProgress);
  const currentThemeColorRef = useRef(new THREE.Color(activeStage.mapColor));
  const targetThemeColorRef = useRef(new THREE.Color(activeStage.mapColor));

  // Pre-parse Path2D objects once for high performance
  const countryPathObjects = useMemo(() => {
    return (worldMapCountries as Array<{ name: string; d: string }>).map((c) => ({
      name: c.name,
      path: new Path2D(c.d),
    }));
  }, []);

  // Update refs when props change
  useEffect(() => {
    stageRef.current = activeStage;
    targetThemeColorRef.current.set(activeStage.mapColor);
  }, [activeStage]);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 400;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Position camera closer for a larger, prominent Earth presence with clean margin
    camera.position.set(0, 0, 11.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Natural Space Lighting Setup (Clean Sun in Space + Ambient Space, NO colored rim outline)
    const ambientLight = new THREE.AmbientLight(0x162032, 1.3);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(12, 9, 14);
    scene.add(sunLight);

    // Gentle front-facing fill light for realistic dark side detail (no edge rim)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-10, 4, 10);
    scene.add(fillLight);

    // Soft front-facing platform accent light (directly facing front center, not grazing edges)
    const platformPointLight = new THREE.PointLight(activeStage.mapColor, 0.8, 20);
    platformPointLight.position.set(0, 0, 10);
    scene.add(platformPointLight);

    // 3. Deep Space Starfield Particles
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 25 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.15,
      transparent: true,
      opacity: 0.65,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. Central Earth Hierarchy Group (Holds all globe layers, rotates together)
    const globeGroup = new THREE.Group();
    // Perfectly centered in the viewport
    globeGroup.position.set(0, 0, 0);
    globeGroup.rotation.x = 0.18;
    globeGroup.rotation.z = -0.10;
    scene.add(globeGroup);

    const GLOBE_RADIUS = 3.65;

    // 5. High-Resolution Canvas Texture for Earth Continents & Country Glows
    const mapCanvas = document.createElement('canvas');
    mapCanvas.width = 2048;
    mapCanvas.height = 1024;
    const ctx = mapCanvas.getContext('2d');

    const earthTexture = new THREE.CanvasTexture(mapCanvas);
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;
    earthTexture.generateMipmaps = true;

    // Function to draw Google Earth styled continents, ocean grid, and glowing territories
    const updateEarthMapTexture = (stage: PlatformStage) => {
      if (!ctx) return;
      const w = mapCanvas.width;
      const h = mapCanvas.height;

      // Deep Cosmic Ocean Base
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
      oceanGrad.addColorStop(0, '#030814');
      oceanGrad.addColorStop(0.5, '#060d1f');
      oceanGrad.addColorStop(1, '#020610');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, w, h);

      // Subtle Ocean Grid (Longitude & Latitude Lines)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 6]);

      // Latitude lines
      for (let latY = h / 6; latY < h; latY += h / 6) {
        ctx.beginPath();
        ctx.moveTo(0, latY);
        ctx.lineTo(w, latY);
        ctx.stroke();
      }
      // Longitude lines
      for (let lonX = w / 8; lonX < w; lonX += w / 8) {
        ctx.beginPath();
        ctx.moveTo(lonX, 0);
        ctx.lineTo(lonX, h);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw all Country Polygons
      ctx.save();
      ctx.scale(w / 1000, h / 500);

      countryPathObjects.forEach(({ name, path }) => {
        const isHighlighted = stage.highlightedCountryNames.includes(name);

        if (isHighlighted) {
          // Highlighted Active Territories (Vibrant Google Earth Glowing Landmasses)
          ctx.shadowColor = stage.mapColor;
          ctx.shadowBlur = 12;
          ctx.fillStyle = stage.mapColor;
          ctx.globalAlpha = 0.92;
          ctx.fill(path);

          ctx.shadowBlur = 0;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.0;
          ctx.globalAlpha = 0.95;
          ctx.stroke(path);
        } else {
          // Standard Inactive Landmass (Deep Obsidian/Slate with clean boundaries)
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#0f1c30';
          ctx.globalAlpha = 0.85;
          ctx.fill(path);

          ctx.strokeStyle = '#1e2e4a';
          ctx.lineWidth = 0.55;
          ctx.globalAlpha = 0.45;
          ctx.stroke(path);
        }
      });

      // Scatter authentic Night City Lights across high-density regions
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.75;
      const seedPoints = [
        [718, 235], [730, 220], [705, 245], [745, 230], // India
        [515, 145], [525, 140], [505, 155], [535, 150], // Europe
        [215, 180], [240, 175], [195, 190], [260, 185], // USA
        [340, 335], [355, 320], [330, 350],             // Brazil
        [825, 295], [840, 290], [860, 235],             // Southeast Asia
        [515, 235], [525, 250],                         // West Africa
        [643, 209], [630, 200],                         // Middle East
        [890, 180], [880, 190], [905, 175],             // East Asia / Japan
      ];

      seedPoints.forEach(([cx, cy]) => {
        for (let k = 0; k < 6; k++) {
          const rx = cx + (Math.sin(k * 43.1) * 22);
          const ry = cy + (Math.cos(k * 29.3) * 16);
          ctx.fillStyle = k % 2 === 0 ? '#fef08a' : '#38bdf8';
          ctx.beginPath();
          ctx.arc(rx, ry, Math.random() * 1.6 + 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.restore();
      earthTexture.needsUpdate = true;
    };

    updateEarthMapTexture(activeStage);

    // 6. Base Earth Sphere Mesh
    const earthGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.42,
      metalness: 0.15,
      bumpScale: 0.05,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // 7. Outer Cloud Layer Sphere (Procedural wispy clouds for depth, no harsh outline)
    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 1024;
    cloudCanvas.height = 512;
    const cloudCtx = cloudCanvas.getContext('2d');
    if (cloudCtx) {
      cloudCtx.fillStyle = 'rgba(0, 0, 0, 0)';
      cloudCtx.fillRect(0, 0, 1024, 512);
      for (let i = 0; i < 90; i++) {
        const cx = Math.random() * 1024;
        const cy = Math.random() * 512;
        const cr = 20 + Math.random() * 50;
        const grad = cloudCtx.createRadialGradient(cx, cy, 0, cx, cy, cr);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
        grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.06)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        cloudCtx.fillStyle = grad;
        cloudCtx.beginPath();
        cloudCtx.arc(cx, cy, cr, 0, Math.PI * 2);
        cloudCtx.fill();
      }
    }
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    cloudTexture.wrapS = THREE.RepeatWrapping;
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.20,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    // Snug cloud layer that hugs the surface smoothly without forming any outer halo or perimeter outline
    const cloudGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.003, 48, 48);
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    globeGroup.add(cloudMesh);

    // 9. Interactive 3D Connection Arcs & Beacons
    const dynamicObjectsGroup = new THREE.Group();
    globeGroup.add(dynamicObjectsGroup);

    interface PulseParticle {
      curve: THREE.QuadraticBezierCurve3;
      mesh: THREE.Mesh;
      t: number;
      speed: number;
    }
    const pulseParticles: PulseParticle[] = [];
    const rippleMeshes: { mesh: THREE.Mesh; scale: number; maxScale: number }[] = [];

    const rebuildStageVisuals = (stage: PlatformStage) => {
      // Clear previous dynamic arcs and beacons
      while (dynamicObjectsGroup.children.length > 0) {
        const obj = dynamicObjectsGroup.children[0];
        dynamicObjectsGroup.remove(obj);
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      }
      pulseParticles.length = 0;
      rippleMeshes.length = 0;

      const stageColor = new THREE.Color(stage.mapColor);

      // A) Create 3D Intercontinental Leaping Arcs
      stage.arcs.forEach((arc) => {
        const p1 = mapXYToVector3(arc.from[0], arc.from[1], GLOBE_RADIUS);
        const p2 = mapXYToVector3(arc.to[0], arc.to[1], GLOBE_RADIUS);

        // Calculate elevated mid-point arched gracefully above globe
        const dist = p1.distanceTo(p2);
        const mid = p1.clone().add(p2).multiplyScalar(0.5);
        const altitude = GLOBE_RADIUS + Math.min(1.6, Math.max(0.4, dist * 0.35));
        mid.normalize().multiplyScalar(altitude);

        const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
        const points = curve.getPoints(50);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(points);

        const arcMat = new THREE.LineDashedMaterial({
          color: stageColor,
          linewidth: 2,
          scale: 1,
          dashSize: 0.35,
          gapSize: 0.15,
          transparent: true,
          opacity: 0.85,
        });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        arcLine.computeLineDistances();
        dynamicObjectsGroup.add(arcLine);

        // Traveling Light Pulse along each arc
        const pulseGeo = new THREE.SphereGeometry(0.09, 12, 12);
        const pulseMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.95,
        });
        const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
        dynamicObjectsGroup.add(pulseMesh);

        pulseParticles.push({
          curve,
          mesh: pulseMesh,
          t: Math.random(),
          speed: 0.005 + Math.random() * 0.004,
        });
      });

      // B) Create 3D Beacon Pins & Ground Ripple Waves at each Hub
      stage.hubs.forEach((hub) => {
        const hubPos = mapXYToVector3(hub.x, hub.y, GLOBE_RADIUS);

        // Glowing Surface Dot
        const dotGeo = new THREE.SphereGeometry(hub.isPrimary ? 0.11 : 0.07, 16, 16);
        const dotMat = new THREE.MeshBasicMaterial({ color: stageColor });
        const dotMesh = new THREE.Mesh(dotGeo, dotMat);
        dotMesh.position.copy(hubPos);
        dynamicObjectsGroup.add(dotMesh);

        // Vertical Laser Pillar
        const pillarHeight = hub.isPrimary ? 0.75 : 0.45;
        const pillarGeo = new THREE.CylinderGeometry(0.015, 0.025, pillarHeight, 8);
        const pillarMat = new THREE.MeshBasicMaterial({
          color: stageColor,
          transparent: true,
          opacity: 0.8,
        });
        const pillarMesh = new THREE.Mesh(pillarGeo, pillarMat);

        const normal = hubPos.clone().normalize();
        pillarMesh.position.copy(hubPos.clone().add(normal.clone().multiplyScalar(pillarHeight / 2)));
        pillarMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
        dynamicObjectsGroup.add(pillarMesh);

        // Pulsing Ground Ripple Ring
        const ringGeo = new THREE.RingGeometry(0.08, 0.14, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: stageColor,
          transparent: true,
          opacity: 0.75,
          side: THREE.DoubleSide,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(hubPos.clone().add(normal.clone().multiplyScalar(0.01)));
        ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
        dynamicObjectsGroup.add(ringMesh);

        rippleMeshes.push({
          mesh: ringMesh,
          scale: 1,
          maxScale: hub.isPrimary ? 3.5 : 2.5,
        });
      });
    };

    rebuildStageVisuals(activeStage);

    // 10. Smooth Interactive Drag Controls & Scroll-Driven Rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;
    let manualRotY = 0;
    let manualRotX = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
      dragVelocityX = 0;
      dragVelocityY = 0;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      dragVelocityX = deltaX * 0.0055;
      dragVelocityY = deltaY * 0.0055;
      manualRotY += dragVelocityX;
      manualRotX = Math.max(-0.65, Math.min(0.65, manualRotX + dragVelocityY));
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Track active stage changes to smoothly update textures and visuals
    let lastRenderedStageId = activeStage.id;

    // 11. Animation Loop (60 FPS smooth Three.js rendering)
    let animId: number;
    let idleRotationTimer = 0;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);

      // Check if stage changed
      if (lastRenderedStageId !== stageRef.current.id) {
        lastRenderedStageId = stageRef.current.id;
        updateEarthMapTexture(stageRef.current);
        rebuildStageVisuals(stageRef.current);
      }

      // Smooth color transitions for platform lights
      currentThemeColorRef.current.lerp(targetThemeColorRef.current, 0.06);
      platformPointLight.color.copy(currentThemeColorRef.current);

      // Calculate Rotation:
      // A) Scroll-driven rotation (smoothly turns across the globe as user scrolls)
      const scrollRot = scrollProgressRef.current * Math.PI * 2.8;

      // B) Gentle ambient Earth rotation when idle
      if (!isDragging) {
        dragVelocityX *= 0.93;
        dragVelocityY *= 0.93;
        manualRotY += dragVelocityX;
        manualRotX += dragVelocityY;
        idleRotationTimer += 0.0016;
      }

      // Apply combined rotation to globe
      globeGroup.rotation.y = -(scrollRot + manualRotY + idleRotationTimer);
      globeGroup.rotation.x = 0.18 + manualRotX;

      // Rotate cloud layer slightly independently for realistic atmospheric parallax
      cloudMesh.rotation.y += 0.0006;

      // Animate 3D pulse particles along connection arcs
      pulseParticles.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const pt = p.curve.getPoint(p.t);
        p.mesh.position.copy(pt);
      });

      // Animate ground ripple rings expanding outwards
      rippleMeshes.forEach((r) => {
        r.scale += 0.035;
        if (r.scale > r.maxScale) r.scale = 1.0;
        r.mesh.scale.set(r.scale, r.scale, r.scale);
        if (r.mesh.material instanceof THREE.MeshBasicMaterial) {
          r.mesh.material.opacity = Math.max(0, 0.8 * (1 - (r.scale - 1) / (r.maxScale - 1)));
        }
      });

      renderer.render(scene, camera);
    };

    renderLoop();

    // 12. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();

      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);

      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }

      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      earthTexture.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      cloudTexture.dispose();
      starGeo.dispose();
      starMat.dispose();
    };
  }, [countryPathObjects]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden ${className}`}
      style={{ touchAction: 'none' }}
      title="Click & drag to rotate Google Earth in 360°"
    >
      {/* Google Earth Control Hint Overlay */}
      <div className="absolute top-2.5 right-3 pointer-events-none z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono text-cyan-300">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>{isInteracting ? 'Rotating 3D Globe' : 'Drag to Rotate 3D Earth'}</span>
      </div>

      {/* Primary Key Hub Marker Badges (Floating on screen for quick orientation) */}
      <div className="absolute bottom-2 left-3 pointer-events-none z-10 flex items-center gap-2">
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-900/90 border border-white/10 text-[9px] font-mono text-neutral-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeStage.mapColor }} />
          <span>{activeStage.name} Hubs Connected</span>
        </div>
      </div>
    </div>
  );
};
