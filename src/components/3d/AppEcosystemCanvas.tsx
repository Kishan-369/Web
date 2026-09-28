import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createAllAppScreenTextures } from './appScreenTextures';

interface Props {
  exploded?: boolean;
  selectedAppIndex: number | null;
  phoneVisible?: boolean;
  zoomScale?: number;
  offsetX?: number;
  offsetY?: number;
  outlineOpacity?: number;
  whatsappLaunchProgress?: number;
  onWhatsAppScreenPosition?: (pos: { x: number; y: number; size: number }) => void;
}

const createRoundedRectShape = (width: number, height: number, radius: number) => {
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2 + radius, -height / 2);
  shape.lineTo(width / 2 - radius, -height / 2);
  shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
  shape.lineTo(width / 2, height / 2 - radius);
  shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
  shape.lineTo(-width / 2 + radius, height / 2);
  shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
  shape.lineTo(-width / 2, -height / 2 + radius);
  shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);
  return shape;
};

export const AppEcosystemCanvas: React.FC<Props> = ({
  exploded = true,
  selectedAppIndex,
  phoneVisible = true,
  zoomScale,
  offsetX,
  offsetY,
  outlineOpacity,
  whatsappLaunchProgress = 0,
  onWhatsAppScreenPosition,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Use refs for props so we don't recreate the scene on change
  const explodedRef = useRef(exploded);
  const selectedAppIndexRef = useRef(selectedAppIndex);
  const phoneVisibleRef = useRef(phoneVisible);
  const zoomScaleRef = useRef(zoomScale ?? 1.12);
  const offsetXRef = useRef(offsetX ?? -1.6);
  const offsetYRef = useRef(offsetY ?? -1.15);
  const outlineOpacityRef = useRef(outlineOpacity ?? 0.9);
  const whatsappLaunchProgressRef = useRef(whatsappLaunchProgress);
  const onWhatsAppScreenPositionRef = useRef(onWhatsAppScreenPosition);

  useEffect(() => {
    explodedRef.current = exploded;
    selectedAppIndexRef.current = selectedAppIndex;
    phoneVisibleRef.current = phoneVisible;
    if (zoomScale !== undefined) zoomScaleRef.current = zoomScale;
    if (offsetX !== undefined) offsetXRef.current = offsetX;
    if (offsetY !== undefined) offsetYRef.current = offsetY;
    if (outlineOpacity !== undefined) outlineOpacityRef.current = outlineOpacity;
    whatsappLaunchProgressRef.current = whatsappLaunchProgress;
    onWhatsAppScreenPositionRef.current = onWhatsAppScreenPosition;
  }, [exploded, selectedAppIndex, phoneVisible, zoomScale, offsetX, offsetY, outlineOpacity, whatsappLaunchProgress, onWhatsAppScreenPosition]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.03);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 1. Central Phone Mesh (iPhone Style)
    const phoneGroup = new THREE.Group();
    // Position phone according to dynamic initial offsets
    phoneGroup.position.set(offsetXRef.current, offsetYRef.current, 0);
    if (!phoneVisibleRef.current) {
      phoneGroup.scale.set(0.0001, 0.0001, 0.0001);
      phoneGroup.visible = false;
    } else {
      phoneGroup.scale.setScalar(zoomScaleRef.current);
    }
    
    const phoneWidth = 4.2;
    const phoneHeight = 8.6;
    const phoneRadius = 0.65;
    
    const bodyShape = createRoundedRectShape(phoneWidth, phoneHeight, phoneRadius);
    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05
    };
    const phoneGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
    phoneGeo.translate(0, 0, -0.15); // Center the depth
    
    const phoneMat = new THREE.MeshPhysicalMaterial({
      color: 0x2a2a2a,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: 0x111111,
    });
    const phoneMesh = new THREE.Mesh(phoneGeo, phoneMat);
    phoneGroup.add(phoneMesh);

    // Add a visible outline to the phone edges
    const edges = new THREE.EdgesGeometry(phoneGeo, 15); 
    const outlineMat = new THREE.LineBasicMaterial({
      color: 0x666666,
      transparent: true,
      opacity: 0.9,
    });
    const phoneOutline = new THREE.LineSegments(edges, outlineMat);
    phoneGroup.add(phoneOutline);

    // Phone Screen Glass Glow
    const screenWidth = phoneWidth - 0.3;
    const screenHeight = phoneHeight - 0.3;
    const screenRadius = phoneRadius - 0.15;
    const screenShape = createRoundedRectShape(screenWidth, screenHeight, screenRadius);
    const screenGeo = new THREE.ShapeGeometry(screenShape);

    // Normalize screenGeo UV coordinates so app UI canvas textures map accurately across phone screen (0..1)
    const pos = screenGeo.attributes.position;
    const uvs = screenGeo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const u = (x + screenWidth / 2) / screenWidth;
      const v = (y + screenHeight / 2) / screenHeight;
      uvs.setXY(i, u, v);
    }
    uvs.needsUpdate = true;

    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x080808, // Dark OLED screen
      transparent: true,
      opacity: 0.95,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.202; // Mounted on front face of phone body (z = 0.20)
    phoneGroup.add(screenMesh);

    // App-specific UI Screen Layers (frosted/blurred app interface visible behind the icon)
    const appScreenTextures = createAllAppScreenTextures();
    const uiScreenMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < 4; i++) {
      const uiMat = new THREE.MeshBasicMaterial({
        map: appScreenTextures[i],
        transparent: true,
        opacity: 0.0, // All start invisible so phone is clean and blank initially
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(screenGeo, uiMat);
      mesh.position.z = 0.206; // Layered cleanly on front of screen glass
      phoneGroup.add(mesh);
      uiScreenMeshes.push(mesh);
    }
    
    // Dynamic Island
    const islandGroup = new THREE.Group();
    islandGroup.position.set(0, screenHeight / 2 - 0.35, 0.212); // Above the screen and UI layers

    // Main pill
    const islandBaseWidth = 1.3;
    const islandHeight = 0.38;
    const islandRadius = 0.19;
    const islandShape = createRoundedRectShape(islandBaseWidth, islandHeight, islandRadius);
    const islandGeo = new THREE.ShapeGeometry(islandShape);
    const islandMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const islandMesh = new THREE.Mesh(islandGeo, islandMat);
    islandGroup.add(islandMesh);
    
    // Add a subtle rim/glow to the island so it's always slightly visible
    const islandRimGeo = new THREE.EdgesGeometry(islandGeo, 15);
    const islandRimMat = new THREE.LineBasicMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0.8,
    });
    const islandRim = new THREE.LineSegments(islandRimGeo, islandRimMat);
    islandRim.position.z = 0.01;
    islandGroup.add(islandRim);

    // Camera lens
    const lensGeo = new THREE.CircleGeometry(0.12, 16);
    const lensMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const lensMesh = new THREE.Mesh(lensGeo, lensMat);
    lensMesh.position.set(0.42, 0, 0.01);
    islandGroup.add(lensMesh);

    // Camera lens reflection
    const reflectionGeo = new THREE.CircleGeometry(0.04, 8);
    const reflectionMat = new THREE.MeshBasicMaterial({ color: 0x223344 });
    const reflectionMesh = new THREE.Mesh(reflectionGeo, reflectionMat);
    reflectionMesh.position.set(0.44, 0.03, 0.02);
    islandGroup.add(reflectionMesh);

    // Dynamic Island Content (Notification dot)
    const dotGeo = new THREE.CircleGeometry(0.06, 16);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Will update color
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    dotMesh.position.set(-0.45, 0, 0.01);
    dotMesh.scale.set(0, 0, 0); // Hidden initially
    islandGroup.add(dotMesh);

    phoneGroup.add(islandGroup);

    scene.add(phoneGroup);

    // 2. Holographic App Icons
    const appCount = 4;

    const WHATSAPP_SVG_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 30 30" width="256" height="256">
  <circle cx="12" cy="12" r="12" fill="#25D366" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.4 12.05C18.4 8.54 15.54 5.68 12.03 5.68C8.52 5.68 5.66 8.54 5.66 12.05C5.66 13.23 5.98 14.34 6.55 15.3L5.6 18.4L8.79 17.48C9.72 18.01 10.84 18.42 12.03 18.42C15.54 18.42 18.4 15.56 18.4 12.05ZM12.03 7.03C14.8 7.03 17.05 9.28 17.05 12.05C17.05 14.82 14.8 17.07 12.03 17.07C10.96 17.07 9.96 16.73 9.14 16.16L8.91 16L6.96 16.56L7.54 14.65L7.38 14.4C6.77 13.43 6.48 12.65 6.48 12.05C6.48 9.28 8.73 7.03 12.03 7.03ZM14.73 13.62C14.59 13.55 13.91 13.21 13.78 13.16C13.65 13.11 13.56 13.09 13.47 13.23C13.38 13.37 13.13 13.67 13.06 13.75C12.99 13.83 12.92 13.84 12.78 13.77C12.64 13.7 12.05 13.51 11.35 12.89C10.81 12.4 10.45 11.8 10.38 11.66C10.31 11.52 10.37 11.45 10.44 11.38C10.5 11.32 10.57 11.23 10.64 11.15C10.71 11.07 10.74 11.01 10.79 10.91C10.84 10.81 10.81 10.73 10.77 10.66C10.73 10.59 10.37 9.7 10.22 9.33C10.07 8.97 9.92 9.02 9.81 9.01C9.71 9.01 9.6 9.01 9.49 9.01C9.38 9.01 9.2 9.05 9.05 9.21C8.9 9.37 8.48 9.76 8.48 10.56C8.48 11.36 9.06 12.13 9.14 12.24C9.22 12.35 10.29 13.99 11.93 14.69C12.32 14.86 12.62 14.96 12.86 15.04C13.26 15.17 13.62 15.15 13.91 15.11C14.23 15.06 14.89 14.71 15.03 14.32C15.17 13.93 15.17 13.6 15.13 13.53C15.09 13.46 14.87 13.69 14.73 13.62Z" fill="white"/>
</svg>`)}`;
    
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');
    const iconUrls = [
      'https://img.icons8.com/fluency/144/instagram-new.png',
      'https://img.icons8.com/color/144/youtube-play.png',
      'https://img.icons8.com/fluency/144/facebook-new.png',
      WHATSAPP_SVG_DATA_URL,
    ];
    const textures = iconUrls.map(url => {
      const tex = textureLoader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace; // Ensures bright, original colors
      return tex;
    });
    
    // Create materials for each icon
    const materials = textures.map(texture => 
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.0, // Start invisible!
        side: THREE.DoubleSide,
        depthTest: false, // Prevents z-fighting if it gets close to screen
      })
    );

    // Restored icon size back to original (3.5 x 3.5)
    const particleGeos = new THREE.PlaneGeometry(3.5, 3.5);

    const appParticles: { mesh: THREE.Mesh; targetPos: THREE.Vector3; initialPos: THREE.Vector3; speed: number, iconIndex: number, material: THREE.MeshBasicMaterial }[] = [];

    for (let i = 0; i < appCount; i++) {
      const iconIndex = i % materials.length;
      const mat = materials[iconIndex];
      const mesh = new THREE.Mesh(particleGeos, mat);

      // Initial position (hidden inside/behind the phone screen)
      const initialPos = new THREE.Vector3(0, 0, 0.22);
      
      // Target position when selected (popping out of the screen)
      const targetPos = new THREE.Vector3(0, 0, 1.8);

      mesh.position.copy(initialPos);
      phoneGroup.add(mesh); // Added to phone group so it rotates WITH the phone

      appParticles.push({
        mesh,
        initialPos,
        targetPos,
        speed: 0.1,
        iconIndex,
        material: mat,
      });
    }

    // 3. Ambient Star / Particle Dust
    const dustGeo = new THREE.BufferGeometry();
    const dustCount = 600;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 40;
      dustPositions[i + 1] = (Math.random() - 0.5) * 40;
      dustPositions[i + 2] = (Math.random() - 0.5) * 40;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.3,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xe50914, 3, 30);
    redLight.position.set(5, 5, 5);
    scene.add(redLight);

    const blueLight = new THREE.PointLight(0x00d9ff, 3, 30);
    blueLight.position.set(-5, -5, 5);
    scene.add(blueLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // App glow colors for screen
    const appColors = [
      0x4a102e, // Instagram pink-dark
      0x400000, // YouTube red-dark
      0x0a224a, // Facebook blue-dark
      0x0c3b1e, // WhatsApp green-dark
    ];

    // Brighter colors for the phone outline
    const appOutlineColors = [
      0xff3388, // Instagram pink
      0xff0000, // YouTube red
      0x3388ff, // Facebook blue
      0x25D366, // WhatsApp green
    ];

    // Animation Loop
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      const selAppIndex = selectedAppIndexRef.current;
      const isPhoneVisible = phoneVisibleRef.current;

      // Animate phone appearance/disappearance with dynamic zoomScale
      const targetPhoneScale = isPhoneVisible ? zoomScaleRef.current : 0.0001;
      phoneGroup.scale.x = THREE.MathUtils.lerp(phoneGroup.scale.x, targetPhoneScale, 0.12);
      phoneGroup.scale.y = THREE.MathUtils.lerp(phoneGroup.scale.y, targetPhoneScale, 0.12);
      phoneGroup.scale.z = THREE.MathUtils.lerp(phoneGroup.scale.z, targetPhoneScale, 0.12);
      phoneGroup.visible = phoneGroup.scale.x > 0.02;

      // Position lerp (transitions from screen center to docked left)
      phoneGroup.position.x = THREE.MathUtils.lerp(phoneGroup.position.x, offsetXRef.current, 0.12);
      phoneGroup.position.y = THREE.MathUtils.lerp(phoneGroup.position.y, offsetYRef.current, 0.12);

      // Outline and island rim opacity lerp (invisible when zoomed in, fades in as phone zooms out)
      outlineMat.opacity = THREE.MathUtils.lerp(outlineMat.opacity, outlineOpacityRef.current, 0.15);
      islandRimMat.opacity = THREE.MathUtils.lerp(islandRimMat.opacity, outlineOpacityRef.current * 0.8, 0.15);

      // Update screen color based on selection
      const targetScreenColor = new THREE.Color(
        selAppIndex !== null ? appColors[selAppIndex] : 0x111111
      );
      screenMat.color.lerp(targetScreenColor, 0.08);

      // Update UI screen opacity based on selected app (frosted/blurred app interface)
      uiScreenMeshes.forEach((mesh, idx) => {
        // Only the actively selected app gets opacity; when selAppIndex is null, phone stays completely blank
        const isTarget = selAppIndex === idx;
        const targetOpacity = isTarget ? 0.90 : 0.0;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.12);
      });

      // Update phone outline color based on selection
      const targetOutlineColor = new THREE.Color(
        selAppIndex !== null ? appOutlineColors[selAppIndex] : 0x555555
      );
      outlineMat.color.lerp(targetOutlineColor, 0.08);

      // Dynamic Island Animation
      const isAppSelected = selAppIndex !== null;
      const targetIslandScaleX = isAppSelected ? 1.6 : 1.0;
      islandMesh.scale.x = THREE.MathUtils.lerp(islandMesh.scale.x, targetIslandScaleX, 0.1);
      islandRim.scale.x = islandMesh.scale.x; // Make sure the rim scales with it
      
      // Move camera lens to keep it looking right
      const targetLensX = isAppSelected ? 0.65 : 0.42;
      lensMesh.position.x = THREE.MathUtils.lerp(lensMesh.position.x, targetLensX, 0.1);
      reflectionMesh.position.x = THREE.MathUtils.lerp(reflectionMesh.position.x, targetLensX + 0.02, 0.1);

      // Notification dot
      if (isAppSelected) {
        dotMat.color.setHex(appOutlineColors[selAppIndex]);
      }
      const targetDotScale = isAppSelected ? 1.0 : 0.0;
      dotMesh.scale.setScalar(THREE.MathUtils.lerp(dotMesh.scale.x, targetDotScale, 0.1));
      const targetDotX = isAppSelected ? -0.7 : -0.45;
      dotMesh.position.x = THREE.MathUtils.lerp(dotMesh.position.x, targetDotX, 0.1);

      // WhatsApp Launch Transition
      const launchP = whatsappLaunchProgressRef.current;
      const shouldShowPhone = isPhoneVisible;

      phoneGroup.visible = shouldShowPhone && phoneGroup.scale.x > 0.02;
      phoneMesh.visible = shouldShowPhone;
      phoneOutline.visible = shouldShowPhone;
      screenMesh.visible = shouldShowPhone;
      islandGroup.visible = shouldShowPhone;
      uiScreenMeshes.forEach((mesh) => {
        mesh.visible = shouldShowPhone;
      });

      // Track exact WhatsApp icon 2D screen coordinates
      if (appParticles[3] && renderer && camera) {
        const wp = new THREE.Vector3();
        appParticles[3].mesh.getWorldPosition(wp);
        wp.project(camera);
        const rect = renderer.domElement.getBoundingClientRect();
        const sx = rect.left + (wp.x * 0.5 + 0.5) * rect.width;
        const sy = rect.top + (-wp.y * 0.5 + 0.5) * rect.height;

        // Project edge to calculate on-screen pixel diameter for WhatsApp circle
        // Green circle has radius 12 inside the 30-wide box on 3.5-wide geometry: (12 / 30) * 3.5 = 1.40
        const wpEdge = new THREE.Vector3(1.4, 0, 0);
        appParticles[3].mesh.localToWorld(wpEdge);
        wpEdge.project(camera);
        const sxEdge = rect.left + (wpEdge.x * 0.5 + 0.5) * rect.width;
        const pSize = Math.abs(sxEdge - sx) * 2;

        if (onWhatsAppScreenPositionRef.current && (selAppIndex === 3 || launchP > 0)) {
          onWhatsAppScreenPositionRef.current({
            x: sx,
            y: sy,
            size: Math.max(30, pSize),
          });
        }
      }

      // Update material opacities and positions
      appParticles.forEach((item) => {
        const isSelected = selAppIndex === item.iconIndex;
        const isLaunchingWhatsApp = isSelected && item.iconIndex === 3 && launchP > 0;

        if (!shouldShowPhone || (item.iconIndex === 3 && launchP > 0.01)) {
          item.mesh.visible = false;
        } else {
          item.mesh.visible = true;
          // Opacity lerp (fade in if selected, fade out if not)
          let targetOpacity = isSelected ? 1.0 : 0.0;
          if (isLaunchingWhatsApp) {
            targetOpacity = Math.max(0, 1.0 - launchP * 4.0);
          }
          item.material.opacity = THREE.MathUtils.lerp(item.material.opacity, targetOpacity, 0.15);

          // Position lerp (pop out if selected, hide inside if not)
          const dest = isSelected ? item.targetPos : item.initialPos;
          item.mesh.position.lerp(dest, item.speed);
          
          // Add a slight hover animation when selected
          if (isSelected) {
             item.mesh.position.y = dest.y + Math.sin(elapsedTime * 2) * 0.15;
          }
          item.mesh.scale.setScalar(1.0);
        }
      });

      // Phone Rotation - follow mouse slightly and slowly rotate, damped when zoomed in
      const rotDamp = THREE.MathUtils.clamp(1 - (zoomScaleRef.current - 1.12) / 4.0, 0, 1);
      phoneGroup.rotation.y = (Math.sin(elapsedTime * 0.2) * 0.15 + mouseX * 0.4) * rotDamp;
      phoneGroup.rotation.x = (Math.sin(elapsedTime * 0.3) * 0.1 + mouseY * 0.2) * rotDamp;

      dustPoints.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      appScreenTextures.forEach(t => t.dispose());
      uiScreenMeshes.forEach(m => (m.material as THREE.Material).dispose());
      materials.forEach(m => m.dispose());
      textures.forEach(t => t.dispose());
      screenMat.dispose();
      islandMat.dispose();
      islandRimMat.dispose();
      lensMat.dispose();
      reflectionMat.dispose();
      dotMat.dispose();
      outlineMat.dispose();
      dustMat.dispose();
      phoneMat.dispose();
      particleGeos.dispose();
      dustGeo.dispose();
      edges.dispose();
      phoneGeo.dispose();
      screenGeo.dispose();
      islandGeo.dispose();
      islandRimGeo.dispose();
      lensGeo.dispose();
      reflectionGeo.dispose();
      dotGeo.dispose();
      renderer.dispose();
    };
  }, []); // Empty dependency array, scene created only once!

  return <div ref={mountRef} className="w-full h-full absolute inset-0 pointer-events-none" />;
};
