import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeQuestionMarkCanvasProps {
  className?: string;
  spinSpeed?: number;
  autoRotate?: boolean;
}

export default function ThreeQuestionMarkCanvas({
  className = '',
  spinSpeed = 1.0,
  autoRotate = true,
}: ThreeQuestionMarkCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const stateRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    questionGroup?: THREE.Group;
    ringsGroup?: THREE.Group;
    isDragging: boolean;
    prevX: number;
    prevY: number;
    rotX: number;
    rotY: number;
    velX: number;
    velY: number;
    animFrameId?: number;
    autoRotate: boolean;
    spinSpeed: number;
  }>({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    rotX: 0.05,
    rotY: -0.2,
    velX: 0,
    velY: 0,
    autoRotate,
    spinSpeed,
  });

  useEffect(() => {
    stateRef.current.autoRotate = autoRotate;
    stateRef.current.spinSpeed = spinSpeed;
  }, [autoRotate, spinSpeed]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // 2. Renderer with transparent background
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Lighting (Teal / Emerald Studio Lighting matching Image 4)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.8);
    mainLight.position.set(4, 5, 6);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const tealRim = new THREE.PointLight(0x0C8E92, 5.5, 15);
    tealRim.position.set(-4, 2, 3);
    scene.add(tealRim);

    const softFill = new THREE.DirectionalLight(0x79CBC4, 1.8);
    softFill.position.set(0, -3, 4);
    scene.add(softFill);

    // 4. Build 3D Question Mark Group
    const questionGroup = new THREE.Group();

    // Material matching brand colors #0C8E92 & #79CBC4
    const tealMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0C8E92),
      emissive: new THREE.Color(0x03282b),
      emissiveIntensity: 0.18,
      roughness: 0.14,
      metalness: 0.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      transmission: 0.05,
      ior: 1.5,
    });

    // Create 3D hook shape for Question Mark
    // We create a clean geometric path of the "?" hook
    const hookShape = new THREE.Shape();

    // Trace question mark outer curve & inner hole
    // Outer boundary
    hookShape.moveTo(-0.15, 0.25);
    hookShape.lineTo(0.28, 0.25);
    hookShape.lineTo(0.28, 0.75);
    // Curve up to top right
    hookShape.bezierCurveTo(0.28, 1.2, 0.95, 1.35, 1.05, 1.95);
    hookShape.bezierCurveTo(1.15, 2.5, 0.75, 3.1, -0.15, 3.1);
    hookShape.bezierCurveTo(-1.0, 3.1, -1.35, 2.45, -1.35, 1.85);
    hookShape.lineTo(-0.95, 1.85);
    // Inner loop back
    hookShape.bezierCurveTo(-0.95, 2.2, -0.65, 2.65, -0.15, 2.65);
    hookShape.bezierCurveTo(0.42, 2.65, 0.65, 2.25, 0.65, 1.9);
    hookShape.bezierCurveTo(0.65, 1.45, 0.1, 1.25, -0.15, 0.9);
    hookShape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      steps: 2,
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 5,
    };

    const hookGeometry = new THREE.ExtrudeGeometry(hookShape, extrudeSettings);
    hookGeometry.center();
    const hookMesh = new THREE.Mesh(hookGeometry, tealMaterial);
    hookMesh.position.y = 0.55;
    hookMesh.castShadow = true;
    questionGroup.add(hookMesh);

    // Question Mark Dot (In Image 4, it's a stylish beveled square block)
    const dotShape = new THREE.Shape();
    const r = 0.22;
    dotShape.moveTo(-r, -r);
    dotShape.lineTo(r, -r);
    dotShape.lineTo(r, r);
    dotShape.lineTo(-r, r);
    dotShape.closePath();

    const dotGeometry = new THREE.ExtrudeGeometry(dotShape, {
      steps: 1,
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.08,
      bevelSegments: 4,
    });
    dotGeometry.center();
    const dotMesh = new THREE.Mesh(dotGeometry, tealMaterial);
    dotMesh.position.set(0.05, -1.45, 0);
    dotMesh.castShadow = true;
    questionGroup.add(dotMesh);

    // Glowing core edge highlight
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x5eead4,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wireHook = new THREE.Mesh(hookGeometry.clone(), wireMat);
    wireHook.position.copy(hookMesh.position);
    wireHook.scale.set(1.01, 1.01, 1.01);
    questionGroup.add(wireHook);

    // Subtle downward spotlight cone (matching Image 4's faint light cone beneath the question mark)
    const coneGeo = new THREE.ConeGeometry(1.6, 2.4, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const lightCone = new THREE.Mesh(coneGeo, coneMat);
    lightCone.position.set(0.1, -1.1, -0.3);
    lightCone.rotation.x = Math.PI;
    questionGroup.add(lightCone);

    scene.add(questionGroup);

    // 5. Concentric Orbit Rings in background (Image 4)
    const ringsGroup = new THREE.Group();
    const ringRadii = [2.2, 3.4, 4.6];

    ringRadii.forEach((radius, idx) => {
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const ringSegments = 96;
      for (let i = 0; i <= ringSegments; i++) {
        const theta = (i / ringSegments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, -0.8));
      }
      ringGeo.setFromPoints(points);

      const ringMat = new THREE.LineDashedMaterial({
        color: 0x99f6e4,
        dashSize: idx === 0 ? 0.35 : 0.2,
        gapSize: 0.15,
        transparent: true,
        opacity: 0.35 - idx * 0.08,
        linewidth: 1,
      });

      const line = new THREE.Line(ringGeo, ringMat);
      line.computeLineDistances();
      ringsGroup.add(line);

      // Add a couple orbit dots
      const dotGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0x2dd4bf,
        transparent: true,
        opacity: 0.8,
      });
      const orbDot = new THREE.Mesh(dotGeo, dotMat);
      const angle = (idx * Math.PI) / 2 + 0.4;
      orbDot.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, -0.8);
      ringsGroup.add(orbDot);
    });

    scene.add(ringsGroup);

    stateRef.current.renderer = renderer;
    stateRef.current.scene = scene;
    stateRef.current.camera = camera;
    stateRef.current.questionGroup = questionGroup;
    stateRef.current.ringsGroup = ringsGroup;

    // Pointer controls for 3D drag
    const handlePointerDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.prevX = e.clientX;
      stateRef.current.prevY = e.clientY;
      stateRef.current.velX = 0;
      stateRef.current.velY = 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!stateRef.current.isDragging) return;
      const dx = e.clientX - stateRef.current.prevX;
      const dy = e.clientY - stateRef.current.prevY;
      stateRef.current.prevX = e.clientX;
      stateRef.current.prevY = e.clientY;

      stateRef.current.rotY += dx * 0.01;
      stateRef.current.rotX += dy * 0.008;
      stateRef.current.velY = dx * 0.01;
      stateRef.current.velX = dy * 0.008;
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let clock = 0;
    const animate = () => {
      stateRef.current.animFrameId = requestAnimationFrame(animate);
      clock += 0.016;

      const state = stateRef.current;

      // Auto rotation ("ghum rha ho")
      if (state.autoRotate && !state.isDragging) {
        state.rotY += 0.018 * state.spinSpeed;
      }

      // Inertia on drag release
      if (!state.isDragging) {
        state.rotX += state.velX;
        state.rotY += state.velY;
        state.velX *= 0.92;
        state.velY *= 0.92;
      }

      if (questionGroup) {
        // Floating motion
        questionGroup.position.y = Math.sin(clock * 1.6) * 0.12;
        // 3D rotation
        questionGroup.rotation.y = state.rotY;
        questionGroup.rotation.x = Math.max(-0.6, Math.min(0.6, state.rotX + Math.sin(clock * 0.8) * 0.05));
        questionGroup.rotation.z = Math.cos(clock * 1.1) * 0.04;
      }

      if (ringsGroup) {
        // Radar ring slow counter-rotation
        ringsGroup.rotation.z = -clock * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (stateRef.current.animFrameId) {
        cancelAnimationFrame(stateRef.current.animFrameId);
      }
      dom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      hookGeometry.dispose();
      dotGeometry.dispose();
      coneGeo.dispose();
      tealMaterial.dispose();
      wireMat.dispose();
      coneMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      title="3D Rotating Question Mark - Click & drag to rotate freely"
    >
      {isHovered && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-md text-[11px] font-medium text-teal-800 shadow-sm border border-teal-100 pointer-events-none transition-opacity">
          Drag to spin 3D Question Mark
        </div>
      )}
    </div>
  );
}
