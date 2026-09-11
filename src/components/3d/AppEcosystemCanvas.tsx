import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  exploded: boolean;
  selectedAppIndex: number | null;
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

export const AppEcosystemCanvas: React.FC<Props> = ({ exploded, selectedAppIndex }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Use refs for props so we don't recreate the scene on change
  const explodedRef = useRef(exploded);
  const selectedAppIndexRef = useRef(selectedAppIndex);

  useEffect(() => {
    explodedRef.current = exploded;
    selectedAppIndexRef.current = selectedAppIndex;
  }, [exploded, selectedAppIndex]);

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
    container.appendChild(renderer.domElement);

    // 1. Central Phone Mesh (iPhone Style)
    const phoneGroup = new THREE.Group();
    phoneGroup.position.y = -1.2; // Move phone slightly down to align with side buttons
    
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
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x080808, // Dark OLED screen
      transparent: true,
      opacity: 0.95,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.16; // Just above the body
    phoneGroup.add(screenMesh);
    
    // Dynamic Island
    const islandShape = createRoundedRectShape(1.3, 0.38, 0.19);
    const islandGeo = new THREE.ShapeGeometry(islandShape);
    const islandMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const islandMesh = new THREE.Mesh(islandGeo, islandMat);
    islandMesh.position.set(0, screenHeight / 2 - 0.28, 0.17);
    phoneGroup.add(islandMesh);

    scene.add(phoneGroup);

    // 2. Holographic App Icons
    const appCount = 4;
    
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');
    const iconUrls = [
      'https://img.icons8.com/fluency/144/instagram-new.png',
      'https://img.icons8.com/color/144/youtube-play.png',
      'https://img.icons8.com/fluency/144/facebook-new.png',
      'https://img.icons8.com/fluency/144/whatsapp.png',
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

    const particleGeos = new THREE.PlaneGeometry(3.5, 3.5);

    const appParticles: { mesh: THREE.Mesh; targetPos: THREE.Vector3; initialPos: THREE.Vector3; speed: number, iconIndex: number, material: THREE.MeshBasicMaterial }[] = [];

    for (let i = 0; i < appCount; i++) {
      const iconIndex = i % materials.length;
      const mat = materials[iconIndex];
      const mesh = new THREE.Mesh(particleGeos, mat);

      // Initial position (hidden inside/behind the phone screen)
      const initialPos = new THREE.Vector3(0, 0, 0.16);
      
      // Target position when selected (popping out of the screen)
      const targetPos = new THREE.Vector3(0, 0, 2.0);

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

      // Update screen color based on selection
      const targetScreenColor = new THREE.Color(
        selAppIndex !== null ? appColors[selAppIndex] : 0x111111
      );
      screenMat.color.lerp(targetScreenColor, 0.08);

      // Update phone outline color based on selection
      const targetOutlineColor = new THREE.Color(
        selAppIndex !== null ? appOutlineColors[selAppIndex] : 0x555555
      );
      outlineMat.color.lerp(targetOutlineColor, 0.08);

      // Update material opacities and positions
      appParticles.forEach((item) => {
        const isSelected = selAppIndex === item.iconIndex;
        
        // Opacity lerp (fade in if selected, fade out if not)
        const targetOpacity = isSelected ? 1.0 : 0.0;
        item.material.opacity = THREE.MathUtils.lerp(item.material.opacity, targetOpacity, 0.1);

        // Position lerp (pop out if selected, hide inside if not)
        const dest = isSelected ? item.targetPos : item.initialPos;
        item.mesh.position.lerp(dest, item.speed);
        
        // Add a slight hover animation when selected
        if (isSelected) {
           item.mesh.position.y = dest.y + Math.sin(elapsedTime * 2) * 0.15;
        }
      });

      // Phone Rotation - follow mouse slightly and slowly rotate
      phoneGroup.rotation.y = Math.sin(elapsedTime * 0.2) * 0.15 + mouseX * 0.4;
      phoneGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1 + mouseY * 0.2;

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
      materials.forEach(m => m.dispose());
      textures.forEach(t => t.dispose());
      screenMat.dispose();
      islandMat.dispose();
      outlineMat.dispose();
      dustMat.dispose();
      phoneMat.dispose();
      particleGeos.dispose();
      dustGeo.dispose();
      edges.dispose();
      phoneGeo.dispose();
      screenGeo.dispose();
      islandGeo.dispose();
      renderer.dispose();
    };
  }, []); // Empty dependency array, scene created only once!

  return <div ref={mountRef} className="w-full h-full absolute inset-0 pointer-events-none" />;
};
