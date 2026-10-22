import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ProcessItem {
  id: string;
  number: string;
  badgeNumber: string;
  title: string;
  linkText: string;
  description: string;
  tags: string[];
}

const PROCESS_ITEMS: ProcessItem[] = [
  {
    id: 'strategy',
    number: '01',
    badgeNumber: '01',
    title: 'Secure Cloud ERP',
    linkText: 'SEO-driven design',
    description:
      "Our web design goes beyond the surface. We start by getting to know your business and your industry, rooted in your actual needs. By studying your current performance and the market around you, we'll show you how an SEO-driven design can help improve your visibility and support an increase in traffic.",
    tags: ['Market Research', 'Competitive Matrix', 'Digital Roadmapping'],
  },
  {
    id: 'branding',
    number: '02',
    badgeNumber: '02',
    title: 'Business AI',
    linkText: 'Brand Identity Framework',
    description:
      "We see branding as much more than visual appearance—it's the foundation of your business identity, shaping how customers perceive you. Strong digital branding builds trust, credibility, and authority without using unnecessary gimmicks, turning casual visitors into long-term brand advocates.",
    tags: ['Visual Design System', 'Tone of Voice', 'Motion Guidelines'],
  },
  {
    id: 'experience',
    number: '03',
    badgeNumber: '03',
    title: 'Smarter Decisions',
    linkText: 'Human-Centered UX/UI',
    description:
      "Creating interfaces that feel effortless to navigate and exhilarating to experience. We balance aesthetic refinement with behavioral psychology to architect digital interfaces that drive measurable engagement and elevated brand sentiment.",
    tags: ['Micro-Interactions', 'Design Systems', 'WCAG Accessibility'],
  },
  {
    id: 'engineering',
    number: '04',
    badgeNumber: '04',
    title: 'Real Time Visibility',
    linkText: 'High-Performance WebGL',
    description:
      "From enterprise React applications to real-time WebGL spatial experiences. We engineer clean, highly maintainable codebases built for sub-second page transitions, robust security, and seamless multi-device fidelity.",
    tags: ['Three.js & Shaders', 'Full-Stack Architecture', 'Edge Performance'],
  },
  // {
  //   id: 'scale',
  //   number: '05',
  //   badgeNumber: '05',
  //   title: 'Scale & Growth',
  //   linkText: 'Data-Driven Optimization',
  //   description:
  //     "Continuous telemetry auditing, conversion rate optimization (CRO), and automated performance loops. We ensure your digital assets continuously evolve and compound value alongside your enterprise objectives.",
  //   tags: ['Conversion Rate Optimization', 'Telemetry Loops', 'Global CDN Velocity'],
  // },
];

interface CircularProcessSectionProps {
  onSelectTopic?: (topic: string) => void;
}

export function CircularProcessSection({ onSelectTopic }: CircularProcessSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [smoothProgress, setSmoothProgress] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  const [viewportDims, setViewportDims] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 750,
  });

  // Track dimensions of the stage for accurate circular arc geometry
  useEffect(() => {
    const handleResize = () => {
      const stage = stageRef.current;
      const container = containerRef.current;
      const w = stage?.clientWidth || container?.clientWidth || window.innerWidth;
      const h = stage?.clientHeight || Math.min(window.innerHeight, 750);
      setViewportDims({
        width: w,
        height: h,
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Maps scroll fraction [0, 1] into 5 distinct reading plateaus with smooth transitions:
  // - Top to bottom: Step 1 (detail) -> 1 to 2 -> Step 2 (detail) -> 2 to 3 -> Step 3 (detail) -> 3 to 4 -> Step 4 (detail) -> 4 to 5 -> Step 5 (detail), then exits to next section
  // - Bottom to top: Step 5 (detail) -> 5 to 4 -> Step 4 (detail) -> 4 to 3 -> Step 3 (detail) -> 3 to 2 -> Step 2 (detail) -> 2 to 1 -> Step 1 (detail), then exits to upper section
  const computeStepFromFraction = (rawFraction: number) => {
    const p = Math.max(0, Math.min(1, rawFraction));
    const totalTransitions = PROCESS_ITEMS.length - 1; // 4 transitions (0 to 1, 1 to 2, 2 to 3, 3 to 4)
    const segmentWidth = 1 / totalTransitions; // 0.25

    // Index of segment (0, 1, 2, 3)
    const segIndex = Math.min(totalTransitions - 1, Math.floor(p / segmentWidth));
    const segLocal = (p - segIndex * segmentWidth) / segmentWidth; // 0.0 to 1.0

    // Within each segment:
    // 0.00 to 0.18: rest on segIndex (stable, clear reading plateau)
    // 0.18 to 0.82: smooth cubic glide from segIndex to segIndex + 1
    // 0.82 to 1.00: rest on segIndex + 1 (stable, clear reading plateau)
    let localTransition = 0;
    if (segLocal < 0.18) {
      localTransition = 0;
    } else if (segLocal > 0.82) {
      localTransition = 1;
    } else {
      const norm = (segLocal - 0.18) / 0.64;
      // Cubic smoothstep for natural deceleration and acceleration
      localTransition = norm * norm * (3 - 2 * norm);
    }

    return segIndex + localTransition;
  };

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollableDist = el.offsetHeight - window.innerHeight;
      if (scrollableDist <= 0) return;

      // Above section: locked at Item 1 (0)
      if (rect.top > 0) {
        setScrollProgress(0);
        return;
      }

      // Past section: locked at Item 5 (4)
      if (-rect.top >= scrollableDist) {
        setScrollProgress(PROCESS_ITEMS.length - 1);
        return;
      }

      // Inside pinned scroll zone:
      const rawFraction = -rect.top / scrollableDist;
      const targetStepValue = computeStepFromFraction(rawFraction);
      setScrollProgress(targetStepValue);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Smooth lerp interpolation for silky 60fps wheel rotation & text transitions
  useEffect(() => {
    let animId: number;
    const lerp = () => {
      setSmoothProgress((prev) => {
        const delta = scrollProgress - prev;
        if (Math.abs(delta) < 0.001) return scrollProgress;
        return prev + delta * 0.22;
      });
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [scrollProgress]);

  // Optional auto-rotation through pillars
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      const nextIndex = (Math.round(scrollProgress) + 1) % PROCESS_ITEMS.length;
      scrollToStep(nextIndex);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoPlay, scrollProgress]);

  const isMobile = viewportDims.width < 768;

  // Geometric specifications for the HALF-HIDDEN wheel on the RIGHT side
  const radius = isMobile
    ? Math.min(230, Math.max(160, viewportDims.width * 0.44))
    : Math.min(540, Math.max(380, viewportDims.height * 0.65));

  // Place center OFF-SCREEN to the RIGHT so the right half is hidden and left curving arc is visible
  const cx = isMobile
    ? viewportDims.width + radius * 0.58
    : viewportDims.width + radius * 0.38;

  // Focal vertical line aligns with the active content center
  const cy = viewportDims.height * (isMobile ? 0.42 : 0.48);
  const angleStepDeg = isMobile ? 32 : 24; // Spacing in degrees between consecutive numbers along the arc

  // Jump to a specific step (0, 1, 2, 3, 4) with smooth window scrolling
  const scrollToStep = (index: number) => {
    const el = containerRef.current;
    if (!el) {
      setScrollProgress(index);
      return;
    }
    const scrollableDist = el.offsetHeight - window.innerHeight;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const totalTransitions = PROCESS_ITEMS.length - 1;
    let targetFraction = 0;
    if (index === 0) targetFraction = 0.02;
    else if (index === totalTransitions) targetFraction = 0.98;
    else targetFraction = index / totalTransitions;

    const targetScrollY = sectionTop + targetFraction * scrollableDist;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    if (isAutoPlay) setIsAutoPlay(false);
  };

  return (
    <section
      id="circular-process-section"
      ref={containerRef}
      className="relative w-full"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen w-full bg-[#EFECE6] text-[#1A1F24] border-t border-[#DED9D0] selection:bg-[#0C8E92] selection:text-white flex flex-col justify-between overflow-hidden select-none pt-16 sm:pt-20 z-20">
        {/* Subtle architectural dot grid background texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none -z-0"
          style={{
            backgroundImage: 'radial-gradient(#1A1F24 1.2px, transparent 1.2px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Top Header Bar with Digital Transformation Heading */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-2 sm:pt-5 pb-3 sm:pb-2 z-30 select-none shrink-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-black text-[#1A1F24] tracking-tight leading-tight text-center mt-4 sm:mt-0">
            Digital Transformation
          </h2>
        </div>

        {/* Main Split Stage: Left is Content, Right is Half-Hidden Wheel */}
        <div ref={stageRef} className="relative flex-1 w-full min-h-[380px] sm:min-h-[420px] overflow-hidden">

          {/* ========================================================================= */}
          {/* LEFT SIDE: EXACT 1-TO-1 CONTENT DISPLAY (1-1, 2-2, 3-3, 4-4, 5-5)        */}
          {/* ========================================================================= */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[85%] lg:w-[58%] xl:w-[54%] z-20 pointer-events-auto flex items-center px-6 sm:px-8 lg:px-12 py-4 sm:py-8 pr-16 sm:pr-8">
            <div className="relative w-full max-w-2xl min-h-[320px] sm:min-h-[360px] flex items-center">
              {PROCESS_ITEMS.map((item, idx) => {
                // Offset from the current smooth progress (-1 = passed above, 0 = active, +1 = below)
                const offset = idx - smoothProgress;
                const absOffset = Math.abs(offset);
                // Render if within reasonable visible range
                if (absOffset > 1.4) return null;

                const isActive = absOffset < 0.45;
                const translateY = offset * (isMobile ? 180 : 240); // Glides smoothly from bottom to top
                const opacity = Math.max(0, 1 - absOffset * 1.3);
                const scale = 1 - absOffset * 0.05;

                return (
                  <div
                    key={item.id}
                    className="absolute inset-x-0 transition-transform duration-75 will-change-transform"
                    style={{
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      opacity,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    {/* Small circular badge in brand teal (#0C8E92) */}
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold text-white bg-[#0C8E92] shadow-[0_0_14px_rgba(12,142,146,0.45)] shrink-0">
                        {item.badgeNumber}
                      </span>

                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-black text-[#1A1F24] tracking-tight leading-snug select-none font-sans">
                        {item.title}
                      </h3>
                    </div>

                    {/* Massive bold display typography headline */}

                    {/* Editorial paragraph description with underlined highlighted link */}
                    <p className="text-[15px] sm:text-[17px] text-[#555C63] leading-relaxed font-normal max-w-xl">
                      {item.description.split(item.linkText)[0]}
                      <span
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   onSelectTopic?.(item.title);
                        // }}
                        className="text-[#E65F38] hover:text-[#c94924] font-medium underline underline-offset-4 decoration-[#E65F38]/50 hover:decoration-[#E65F38] transition-colors cursor-pointer inline-flex items-center gap-0.5 ml-1 mr-1"
                      >
                        {item.linkText}
                        {/* <ArrowUpRight className="w-3.5 h-3.5 inline -translate-y-0.5" /> */}
                      </span>
                      {item.description.split(item.linkText)[1]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: HALF-HIDDEN CIRCULAR ARC (1, 2, 3, 4, 5 ROTATING UPWARDS)     */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {/* SVG Arc Geometry on Right Side */}
            <svg
              className="w-full h-full overflow-visible"
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              {/* Outer faint dashed circular guide */}
              <circle
                cx={cx}
                cy={cy}
                r={radius + 45}
                fill="none"
                stroke="#E2DDD5"
                strokeWidth="1.2"
                strokeDasharray="4 8"
              />

              {/* Main solid circular arc line curving into screen from right */}
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke="#D6D0C5"
                strokeWidth="2.2"
              />

              {/* Focal horizontal marker tick pointing left toward the active content */}
              <line
                x1={cx - radius - 28}
                y1={cy}
                x2={cx - radius + 20}
                y2={cy}
                stroke="#0C8E92"
                strokeWidth="3.2"
                strokeLinecap="round"
                className="opacity-95"
              />
            </svg>

            {/* Rotating Numbers rendered along the right-side circular arc */}
            <div className="absolute inset-0 pointer-events-auto">
              {PROCESS_ITEMS.map((item, idx) => {
                // Theta in degrees: 0 at focal point, positive = below, negative = above
                const thetaDeg = (idx - smoothProgress) * angleStepDeg;
                const thetaRad = (thetaDeg * Math.PI) / 180;

                // Coordinates along the right-hand circle:
                // At theta = 0, x = cx - radius (focal point pointing left toward content!)
                const x = cx - radius * Math.cos(thetaRad);
                const y = cy + radius * Math.sin(thetaRad);

                const distance = Math.abs(idx - smoothProgress);
                const isActive = distance < 0.45;
                const opacity = Math.max(0.18, Math.min(1.0, 1.25 - distance * 0.42));

                // Don't render if outside visible arc bounds
                if (thetaDeg < -85 || thetaDeg > 85) return null;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToStep(idx)}
                    title={`Jump to ${item.number} ${item.title}`}
                    className="absolute flex items-center gap-3 transition-transform duration-75 cursor-pointer group -translate-y-1/2 focus:outline-none"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      opacity,
                      // Tilt text tangent to the circular curve, following the arc naturally
                      transform: `translate(-18px, -50%) rotate(${thetaDeg * 0.82}deg) scale(${isActive ? 1.15 : 0.95})`,
                      transformOrigin: 'center center',
                    }}
                  >
                    {/* Number label on the left (closer to the content) */}
                    <span
                      className={`text-lg sm:text-3xl lg:text-4xl font-extrabold tracking-tight transition-colors duration-300 font-sans ${isActive
                          ? 'text-[#1A1F24] font-black'
                          : 'text-[#A09C94] group-hover:text-[#1A1F24]'
                        }`}
                    >
                      {item.number}
                    </span>

                    {/* Bullet dot sitting directly on the circular arc */}
                    <span
                      className={`rounded-full transition-all duration-300 shrink-0 ${isActive
                          ? 'w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#1A1F24] ring-4 ring-[#0C8E92]/30 scale-125'
                          : 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#9C968D] group-hover:bg-[#1A1F24]'
                        }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Mobile Quick Tap Stepper (visible on mobile screens only) */}
        <div className="md:hidden w-full px-5 py-2.5 bg-[#E8E4DC] border-t border-[#DED9D0] z-30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-[#0C8E92]">
              {PROCESS_ITEMS[Math.min(PROCESS_ITEMS.length - 1, Math.max(0, Math.round(smoothProgress)))]?.badgeNumber}
            </span>
            <span className="text-xs font-bold text-slate-800 truncate max-w-[170px]">
              {PROCESS_ITEMS[Math.min(PROCESS_ITEMS.length - 1, Math.max(0, Math.round(smoothProgress)))]?.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {PROCESS_ITEMS.map((_, i) => {
              const active = Math.min(PROCESS_ITEMS.length - 1, Math.max(0, Math.round(smoothProgress))) === i;
              return (
                <button
                  key={i}
                  onClick={() => scrollToStep(i)}
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                    active
                      ? 'bg-[#0C8E92] text-white shadow-sm scale-105'
                      : 'bg-[#1A1F24]/10 text-slate-700 hover:bg-[#1A1F24]/20'
                  }`}
                  aria-label={`Step ${i + 1}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
