import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import ThreeQuestionMarkCanvas from './ThreeQuestionMarkCanvas';

interface WhyChooseUsSectionProps {
  onRequestConsultation?: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ onRequestConsultation: _onRequestConsultation }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [spinSpeed, setSpinSpeed] = useState<number>(1.2);

  // 4 reasons
  const reasons = [
    {
      id: 1,
      tag: '01',
      title: 'Flexible Deployment',
    },
    {
      id: 2,
      tag: '02',
      title: 'Plug and Play Integration',
    },
    {
      id: 3,
      tag: '03',
      title: 'Scaleable Architecture',
    },
    {
      id: 4,
      tag: '04 ',
      title: 'AI-Enabled Innovation',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative z-20 w-full py-20 sm:py-24 bg-gradient-to-b from-white via-slate-50/40 to-white text-slate-900 border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-10 space-y-3">
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.035em] text-[#0A0D14]">
            Why Choose us
          </h2>
        </div>

        {/* The 3D Falling Question Mark + 4 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Question Mark Showcase with Falling Animation in #0C8E92 & #79CBC4 */}
          <div className="lg:col-span-5 relative flex items-center justify-center h-[420px] md:h-[540px]">
            {/* Concentric radar backdrop effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[340px] h-[340px] rounded-full border border-teal-200/60 animate-[pulse_6s_ease-in-out_infinite]" />
              <div className="w-[480px] h-[480px] rounded-full border border-dashed border-teal-100" />
            </div>

            {/* Three.js 3D Question Mark Canvas */}
            <div className="w-full h-full relative z-10">
              <ThreeQuestionMarkCanvas
                spinSpeed={spinSpeed}
                autoRotate={autoRotate}
                className="w-full h-full"
              />
            </div>
          </div>
          {/* 4 Cards (2x2 Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 order-2 lg:order-2">
            {reasons.map((item) => {
              const isHovered = activeCard === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveCard(item.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={`group relative p-7 rounded-2xl border transition-all duration-300 bg-white cursor-pointer ${isHovered
                      ? 'border-[#0C8E92] shadow-[0_10px_30px_rgba(12,142,146,0.12)] -translate-y-1'
                      : 'border-slate-200/80 shadow-xs hover:border-slate-300'
                    }`}
                >
                  <div
                    className={`absolute top-0 left-6 right-6 h-[2px] transition-colors duration-300 ${isHovered ? 'bg-[#0C8E92]' : 'bg-transparent'
                      }`}
                  />

                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                      {item.tag}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isHovered
                          ? 'bg-[#0C8E92] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-400 group-hover:text-slate-700'
                        }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#0C8E92] transition-colors mb-2.5">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Soft natural shadow transition into the dark RibbonHeroSection */}
      <div 
        className="absolute bottom-0 inset-x-0 h-36 sm:h-48 bg-gradient-to-b from-transparent via-[#02181a]/30 via-75% to-[#02181a] pointer-events-none z-20" 
        aria-hidden="true"
      />
    </section>
  );
};
