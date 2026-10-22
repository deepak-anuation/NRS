import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeRibbonCanvasProps {
  progress?: number; // 0 (compact small) to 1 (full size in center)
  isCentered?: boolean; // whether both text and icon reached center to start continuous idle loop
  interactive?: boolean;
  className?: string;
}

export default function ThreeRibbonCanvas({
  progress = 0,
  isCentered = false,
  interactive = true,
  className = '',
}: ThreeRibbonCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    meshGroup?: THREE.Group;
    lightsGroup?: THREE.Group;
    targetProgress: number;
    currentProgress: number;
    isCentered: boolean;
    idleTime: number;
    isDragging: boolean;
    prevMouseX: number;
    prevMouseY: number;
    userRotX: number;
    userRotY: number;
    userRotVelX: number;
    userRotVelY: number;
    animFrameId?: number;
  }>({
    targetProgress: progress,
    currentProgress: progress,
    isCentered,
    idleTime: 0,
    isDragging: false,
    prevMouseX: 0,
    prevMouseY: 0,
    userRotX: 0,
    userRotY: 0,
    userRotVelX: 0,
    userRotVelY: 0,
  });

  useEffect(() => {
    stateRef.current.targetProgress = progress;
    if (progress < 0.1) {
      stateRef.current.idleTime = 0;
    }
  }, [progress]);

  useEffect(() => {
    stateRef.current.isCentered = isCentered;
  }, [isCentered]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // 1. Scene & Camera with safe framing to prevent edge clipping
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.0);

    // 2. High-performance WebGL Renderer with alpha transparency
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting matching the glossy dual-ring image
    const lightsGroup = new THREE.Group();
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    lightsGroup.add(ambientLight);

    // Crisp white top-right key light for glossy ring bevel reflections
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(3.5, 5.0, 4.0);
    lightsGroup.add(keyLight);

    // Soft luminous aqua teal fill light (#79CBC4)
    const aquaFill = new THREE.PointLight(0x79CBC4, 5.5, 18);
    aquaFill.position.set(-3.5, 1.0, 3.5);
    lightsGroup.add(aquaFill);

    // Deep teal rim light (#0C8E92)
    const deepTealRim = new THREE.PointLight(0x0C8E92, 6.0, 18);
    deepTealRim.position.set(3.2, -1.0, -2.5);
    lightsGroup.add(deepTealRim);

    // Subtle upward ground bounce light
    const bounceLight = new THREE.DirectionalLight(0x79CBC4, 1.2);
    bounceLight.position.set(0, -3, 2);
    lightsGroup.add(bounceLight);

    scene.add(lightsGroup);

    // 4. Build the Dual Interlocking 3D Rings (#0C8E92 & #79CBC4) from the user image
    const meshGroup = new THREE.Group();

    // Material 1: Deep Vibrant Teal (#0C8E92)
    const deepTealMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0C8E92),
      emissive: new THREE.Color(0x03282b),
      emissiveIntensity: 0.22,
      roughness: 0.14,
      metalness: 0.65,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      side: THREE.DoubleSide,
    });

    // Material 2: Light Luminous Aqua Teal (#79CBC4)
    const lightAquaMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x79CBC4),
      emissive: new THREE.Color(0x094c50),
      emissiveIntensity: 0.25,
      roughness: 0.12,
      metalness: 0.55,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.98,
      side: THREE.DoubleSide,
    });

    // Torus Geometries: smooth circular bands
    const ring1Geo = new THREE.TorusGeometry(1.35, 0.22, 36, 120);
    const ring2Geo = new THREE.TorusGeometry(1.30, 0.20, 36, 120);

    // Ring 1 (Right / Upright deep teal ring in #0C8E92, tilted vertically)
    const ring1 = new THREE.Mesh(ring1Geo, deepTealMat);
    ring1.position.set(0.46, 0.18, -0.12);
    ring1.rotation.set(0.72, -0.42, 0.52);
    meshGroup.add(ring1);

    // Ring 2 (Left / Resting aqua teal ring in #79CBC4, interlocking through Ring 1)
    const ring2 = new THREE.Mesh(ring2Geo, lightAquaMat);
    ring2.position.set(-0.46, -0.20, 0.18);
    ring2.rotation.set(0.82, 0.45, -0.32);
    meshGroup.add(ring2);

    // 5. Procedural Ground Contact Shadow matching the teal puddle in the uploaded image
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 64, 5, 128, 64, 110);
      grad.addColorStop(0, 'rgba(12, 142, 146, 0.65)');
      grad.addColorStop(0.35, 'rgba(121, 203, 196, 0.42)');
      grad.addColorStop(0.75, 'rgba(121, 203, 196, 0.15)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.beginPath();
      sCtx.ellipse(128, 64, 120, 52, 0, 0, Math.PI * 2);
      sCtx.fill();
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.6, 1.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0.02, -1.30, -0.05);
    shadowMesh.rotation.x = -Math.PI / 2;
    meshGroup.add(shadowMesh);

    scene.add(meshGroup);

    stateRef.current.renderer = renderer;
    stateRef.current.scene = scene;
    stateRef.current.camera = camera;
    stateRef.current.meshGroup = meshGroup;
    stateRef.current.lightsGroup = lightsGroup;

    // Handle mouse drag for 3D interaction
    const handlePointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      stateRef.current.isDragging = true;
      stateRef.current.prevMouseX = e.clientX;
      stateRef.current.prevMouseY = e.clientY;
      stateRef.current.userRotVelX = 0;
      stateRef.current.userRotVelY = 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!stateRef.current.isDragging) return;
      const dx = e.clientX - stateRef.current.prevMouseX;
      const dy = e.clientY - stateRef.current.prevMouseY;
      stateRef.current.prevMouseX = e.clientX;
      stateRef.current.prevMouseY = e.clientY;

      stateRef.current.userRotY += dx * 0.008;
      stateRef.current.userRotX += dy * 0.008;
      stateRef.current.userRotVelY = dx * 0.008;
      stateRef.current.userRotVelX = dy * 0.008;
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Handle resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW === 0 || newH === 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let time = 0;
    const animate = () => {
      stateRef.current.animFrameId = requestAnimationFrame(animate);
      time += 0.016;

      // Smooth progress interpolation
      const state = stateRef.current;
      state.currentProgress += (state.targetProgress - state.currentProgress) * 0.12;
      // Clamp normalized progress between 0 and 1.0
      const p = Math.max(0, Math.min(1.0, state.currentProgress));

      // Advance idleTime only when centered (or almost fully centered)
      if (state.isCentered || p >= 0.96) {
        state.idleTime += 0.016;
      } else {
        // Gently damp idleTime when leaving center
        state.idleTime = Math.max(0, state.idleTime - 0.03);
      }

      // Inertia decay on drag
      if (!state.isDragging) {
        state.userRotX += state.userRotVelX;
        state.userRotY += state.userRotVelY;
        state.userRotVelX *= 0.92;
        state.userRotVelY *= 0.92;
      }

      if (meshGroup) {
        // Starts noticeably smaller (0.11) at top-mid, and smoothly increases in size slowly to full size (0.85) at center
        const dynamicScale = 0.11 + p * 0.74;
        meshGroup.scale.set(dynamicScale, dynamicScale, dynamicScale);

        // Position: starts at TOP-MID (1.50) and moves DOWN to CENTER (0.35)
        const baseY = 1.50 - p * 1.15;
        const levitation = state.idleTime > 0 ? Math.sin(state.idleTime * 1.5) * 0.035 : 0;
        const swayX = state.idleTime > 0 ? Math.cos(state.idleTime * 0.9) * 0.02 : 0;

        meshGroup.position.y = baseY + levitation;
        meshGroup.position.x = swayX;

        // Dynamic rotation:
        // Prior to reaching center, subtle rotation responsive to movement
        const entryRotX = -0.15 + p * 0.15;
        const entryRotY = 0.15 + p * 0.35;
        // Continuous rotation runs ONLY after reaching center!
        const autoIdleY = state.idleTime > 0 ? state.idleTime * 0.25 : 0;
        const wobbleZ = state.idleTime > 0 ? Math.sin(state.idleTime * 0.7) * 0.05 : 0;

        meshGroup.rotation.x = entryRotX + state.userRotX;
        meshGroup.rotation.y = entryRotY + autoIdleY + state.userRotY;
        meshGroup.rotation.z = wobbleZ;
      }

      // Shimmering reflection light
      if (aquaFill) {
        const lightTime = state.idleTime > 0 ? state.idleTime : time * 0.3;
        aquaFill.position.x = -3.5 + Math.cos(lightTime * 1.2) * 0.6;
        aquaFill.position.y = 1.0 + Math.sin(lightTime * 1.4) * 0.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (stateRef.current.animFrameId) {
        cancelAnimationFrame(stateRef.current.animFrameId);
      }
      domEl.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      deepTealMat.dispose();
      lightAquaMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      title="Interactive 3D Interlocking Rings - Click and drag to inspect"
    />
  );
}
