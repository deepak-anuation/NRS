import React, { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { VerticalSlider } from './VerticalSlider';
import { KineticWireframes } from './KineticWireframes';

interface HeroSectionProps {
  onExploreClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const [phrasing, setPhrasing] = useState<'driving' | 'nextgen'>('driving');

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] bg-[#fafbfc] text-slate-900 flex items-center justify-center overflow-hidden py-15 sm:py-10">
      {/* Background ambient lighting in clean light palette */}
      <div className="absolute top-1/3 right-1/4 w-[540px] h-[540px] bg-gradient-to-tr from-teal-100/40 via-emerald-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Discreet Phrasing Switcher (Top Right) */}
      {/* <div className="absolute top-6 right-6 sm:top-8 sm:right-12 z-30">
        <button
          type="button"
          onClick={() => setPhrasing(phrasing === 'driving' ? 'nextgen' : 'driving')}
          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/90 text-slate-600 hover:text-slate-900 border border-slate-200/90 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          title="Toggle between Driving Business and The Next Generation phrasing"
        >
          <Sparkles className="w-3 h-3 text-teal-600" />
          <span>{phrasing === 'driving' ? 'Format: Driving Business' : 'Format: The Next Gen'}</span>
        </button>
      </div> */}

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: 2-Column Hero layout with Heading + Subtitle + Button */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col justify-center z-20">
            
            {/* Kinetic Wireframe art */}
            <KineticWireframes />

            {/* 
              Main Heading in Exact Format from Reference Image (Light Theme):
              - Line 1: [Italic Serif] [Roman Classical Serif]
              - Line 2: [Roman Classical Serif with Crimson Red Accent Dot]
              - Line 3: [Italic Serif] [Roman Classical Serif]
            */}
            {phrasing === 'driving' ? (
              <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-[74px] xl:text-[82px] leading-[1.02] tracking-tight text-slate-950">
                {/* Line 1: *Driving* Business */}
                <div className="flex items-baseline">
                  <span className="italic font-normal mr-3 sm:mr-4 text-slate-600">
                    Driving
                  </span>
                  <span className="font-medium text-slate-950">
                    Business
                  </span>
                </div>

                {/* Line 2: Excellence with Crimson Red Accent Dot */}
                <div className="font-medium text-slate-950 flex items-baseline">
                  <span>Excellence</span>
                  <span 
                    className="w-2.5 h-2.5 rounded-full bg-rose-500 ml-2.5 mb-2 inline-block shadow-[0_0_8px_rgba(244,63,94,0.6)]" 
                    title="Accent Dot"
                  />
                </div>

                {/* Line 3: *with* ERP & AI. */}
                <div className="flex items-baseline">
                  <span className="italic font-normal mr-3 sm:mr-4 text-slate-600">
                    with
                  </span>
                  <span className="font-medium text-slate-950">
                    ERP &amp; AI.
                  </span>
                </div>
              </h1>
            ) : (
              <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-[74px] xl:text-[82px] leading-[1.02] tracking-tight text-slate-950">
                {/* Line 1: *The* Next */}
                <div className="flex items-baseline">
                  <span className="italic font-normal mr-3 sm:mr-4 text-slate-600">
                    The
                  </span>
                  <span className="font-medium text-slate-950">
                    Next
                  </span>
                </div>

                {/* Line 2: Generation with Red Accent Dot over i */}
                <div className="font-medium text-slate-950 flex items-baseline">
                  <span>Generat</span>
                  <span className="relative inline-block">
                    i
                    <span className="absolute -top-1 left-0.5 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  </span>
                  <span>on</span>
                </div>

                {/* Line 3: *of* ERP & AI. */}
                <div className="flex items-baseline">
                  <span className="italic font-normal mr-3 sm:mr-4 text-slate-600">
                    of
                  </span>
                  <span className="font-medium text-slate-950">
                    ERP &amp; AI.
                  </span>
                </div>
              </h1>
            )}

            {/* Subtitle in Clean Light Theme Slate */}
            <p className="mt-7 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              Transform traditional freight forwarding operations into a fully digital,
              automated workflow—from customer enquiry to final shipment delivery.
            </p>

            {/* Elevated Primary CTA Button */}
            <div className="mt-10 flex items-center">
              <div className="relative group">
                {/* Diagonal lines pattern backdrop */}
                <div 
                  className="absolute -inset-x-3 -inset-y-3 pattern-diagonal-hatch rounded-xl opacity-80 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />

                <button
                  type="button"
                  onClick={() => {
                    if (onExploreClick) {
                      onExploreClick();
                    } else {
                      document.getElementById('why-choose-us')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="relative z-10 px-8 py-4 bg-[#0d828a] hover:bg-[#096b72] text-white font-semibold rounded-xl shadow-[0_8px_20px_rgba(13,130,138,0.28)] hover:shadow-[0_12px_28px_rgba(13,130,138,0.36)] hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm sm:text-base tracking-wide flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Explore More</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Vertical Slider with 4 Divs in Zig-Zag Formation Sliding Upwards */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center w-full">
            <VerticalSlider />
          </div>

        </div>
      </div>
    </section>
  );
};
