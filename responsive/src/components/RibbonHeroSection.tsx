import React, { useState, useRef, useEffect, useCallback } from 'react';
import ThreeRibbonCanvas from './ThreeRibbonCanvas';
import { Sparkles, ArrowDown } from 'lucide-react';
import { AdvantageSection } from './AdvantageSection.tsx';

interface RibbonHeroSectionProps {
  scrollProgress?: number;
  onScrollToNext?: () => void;
}

export default function RibbonHeroSection({
  onScrollToNext,
}: RibbonHeroSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [targetProgress, setTargetProgress] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  // Real-time bidirectional scroll tracking:
  // - Top to Bottom: As user scrolls down, progress goes 0.0 -> 1.0 (icon slowly descends & enlarges, text slowly rises)
  // - Bottom to Top: As user scrolls up, progress goes 1.0 -> 0.0 (text slowly descends, icon slowly shrinks & ascends back)
  const computeScrollProgress = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Gradual scroll zone across ~850px of natural scroll travel:
    // Starts when section top enters bottom of viewport (rect.top = windowH * 0.95 -> 0.0)
    // Finishes when section is centered/filling viewport (rect.top = windowH * 0.15 -> 1.0)
    const startY = windowH * 0.95;
    const endY = windowH * 0.15;

    if (rect.top >= startY) {
      return 0.0;
    }
    if (rect.top <= endY) {
      return 1.0;
    }
    return (startY - rect.top) / (startY - endY);
  }, []);

  // Listen exclusively to user scroll (pure scroll-driven, no cursor/hover triggers)
  useEffect(() => {
    const handleScroll = () => {
      const p = computeScrollProgress();
      setTargetProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [computeScrollProgress]);

  // Silky smooth physical lerp interpolation:
  useEffect(() => {
    let animId: number;
    const lerp = () => {
      setProgress((prev) => {
        const delta = targetProgress - prev;
        if (Math.abs(delta) < 0.001) return targetProgress;
        return prev + delta * 0.10; // luxurious, gradual transition
      });
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [targetProgress]);

  const handleScrollDown = () => {
    if (onScrollToNext) {
      onScrollToNext();
    } else {
      const el = document.getElementById('circular-process-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isCentered = progress >= 0.85;
  const isRevealed = progress >= 0.65;
  // Listing reveals smoothly as the 3D ribbon animation completes
  const listingOpacity = Math.max(0, Math.min(1, (progress - 0.65) / 0.30));
  const listingTranslateY = Math.max(0, (1 - listingOpacity) * 40);

  return (
    <section
      id="ribbon-hero"
      ref={containerRef}
      className="relative z-10 min-h-[750px] w-full bg-gradient-to-b from-[#02181a] via-[#05282c] to-[#011416] text-white selection:bg-[#0C8E92] selection:text-white py-20 sm:py-24 flex flex-col justify-between overflow-hidden"
    >
      {/* Soft downward shadow reflection from the white section above (replaces harsh border line) */}
      <div 
        className="absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none z-30" 
        aria-hidden="true"
      />

      {/* Background ambient radial glows */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-[#0C8E92]/20 blur-[150px] rounded-full pointer-events-none -z-10" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/4 left-1/3 w-[420px] h-[420px] bg-[#79CBC4]/15 blur-[120px] rounded-full pointer-events-none -z-10" 
        aria-hidden="true"
      />

      {/* Top Header Status */}
    
      {/* Dynamic Center Stage:
          1. 3D Icon starts extra small at TOP-MID (scale 0.11, y = 1.50) and slowly moves down while gradually enlarging
          2. Text starts at BOTTOM-MID (translateY +240px) and slowly glides up as user scrolls
          3. When both reach center, size stops increasing and continuous 3D idle floating/rotation activates
          4. When scrolling bottom to top, everything slowly reverses back to the initial small/bottom state */}
      <div className="relative flex-1 flex items-center justify-center my-4 min-h-[440px] sm:min-h-[500px] md:min-h-[540px] w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 overflow-hidden">
        {/* 3D WebGL Mesh Canvas */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto">
          <ThreeRibbonCanvas
            progress={progress}
            isCentered={isCentered}
            className="w-full h-full max-w-4xl"
          />
        </div>

        {/* Typographic Headline:
            Glides slowly from BOTTOM-MID (+240px) to CENTER (0px) proportional to scroll.
            Reverses slowly when scrolling up! */}
        <div 
          className="relative z-20 pointer-events-none text-center px-4 w-full will-change-transform will-change-opacity"
          style={{
            transform: `translateY(${(1 - progress) * 240}px)`,
            opacity: 0.2 + progress * 0.8,
            filter: progress < 0.95 ? `blur(${(1 - progress) * 2.5}px)` : 'none',
          }}
        >
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C8E92]/20 border border-[#79CBC4]/40 text-[#79CBC4] text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#79CBC4] animate-pulse" />
            Strategic Precision & Scale
          </div> */}

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white drop-shadow-[0_12px_35px_rgba(2,24,26,0.9)] select-none">
            <span>Business </span>
            <span className="font-editorial italic font-normal text-[#79CBC4]">Benefits</span>
          </h2>

          {/* <p className="mt-4 text-sm sm:text-base md:text-lg text-[#79CBC4]/80 font-light max-w-xl mx-auto drop-shadow-md">
            Interactive multidimensional architecture scaled in real-time with your digital journey.
          </p> */}
        </div>
      </div>

      {/* Advantage Section Listings: Revealed smoothly inside RibbonHeroSection after animation completes */}
      <div 
        className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 transition-all duration-300"
        style={{
          opacity: listingOpacity,
          transform: `translateY(${listingTranslateY}px)`,
          pointerEvents: isRevealed ? 'auto' : 'none',
        }}
      >
        <AdvantageSection showHeading={false} />
      </div>

     
      
    </section>
  );
}
