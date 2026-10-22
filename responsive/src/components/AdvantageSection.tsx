import React, { useState } from 'react';
import { CloudMarkIcon, CraneIcon, PyramidIcon, TimerHandIcon, PdfDocIcon } from './Icons.tsx';
import { DemoModal } from './DemoModal.tsx';
import { WhitepaperModal } from './WhitepaperModal.tsx';
import { DetailModal, PillarId } from './DetailModal.tsx';

interface AdvantageSectionProps {
  showHeading?: boolean;
}

export function AdvantageSection({ showHeading = false }: AdvantageSectionProps) {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  const [activePillar, setActivePillar] = useState<PillarId | null>(null);

  return (
    <section
      id="advantage-section"
      aria-label="Competitive Advantage"
      className="relative w-full text-white  overflow-hidden selection:bg-[#0C8E92] selection:text-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Centered Section Header - Hidden per user request */}
        {showHeading && (
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
            <h2 className="text-[32px] sm:text-[24px] md:text-[32px] lg:text-[56px] font-normal md:font-medium tracking-tight text-white leading-[1.38] text-balance">
              Business Benefits
            </h2>
          </div>
        )}

        {/* 3 Horizontal Advantage Rows */}
        <div className="w-full divide-y divide-[#0C8E92]/20">

          {/* ROW 1: Purpose-built for construction */}
          <div
            onClick={() => setActivePillar('purpose-built')}
            className="group py-9 md:py-11 transition-colors duration-200 hover:bg-[#0C8E92]/[0.06] px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-xl cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12">

              {/* Left Column: Icon + Title */}
              <div className="flex items-center gap-5 sm:gap-6 lg:w-[48%] shrink-0">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#0C8E92] flex items-center justify-center text-white shrink-0 shadow-[0_0_24px_rgba(12,142,146,0.55)] group-hover:scale-105 transition-transform duration-200 border border-[#79CBC4]/40"
                  aria-hidden="true"
                >
                  <CraneIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl sm:text-[27px] md:text-[31px] font-medium text-white tracking-tight leading-snug group-hover:text-[#79CBC4] transition-colors">
                  Increase Profitability
                </h3>
              </div>

              {/* Right Column: Description */}
              <div className="lg:w-[52%]">
                <p className="text-[15px] sm:text-[16px] text-zinc-300/90 leading-relaxed font-normal">
                  Real-Time Shipment Visibility. Track & Trace Across Carriers.Exception Alerts. Proactive Notifications.Milestone Monitoring.
                </p>
              </div>

            </div>
          </div>

          {/* ROW 2: Modern, powerful, simple */}
          <div
            onClick={() => setActivePillar('modern-simple')}
            className="group py-9 md:py-11 transition-colors duration-200 hover:bg-white/[0.015] px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-xl cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12">

              {/* Left Column: Wireframe Pyramid Icon + Title */}
              <div className="flex items-center gap-5 sm:gap-6 lg:w-[48%] shrink-0">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-zinc-200 shrink-0 group-hover:text-white group-hover:scale-105 transition-all duration-200"
                  aria-hidden="true"
                >
                  <PyramidIcon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl sm:text-[27px] md:text-[31px] font-medium text-white tracking-tight leading-snug">
                  Reduce Complexity
                </h3>
              </div>

              {/* Right Column: Description + PDF Brochure Badge */}
              <div className="flex items-center justify-between gap-5 lg:w-[52%]">
                <p className="text-[15px] sm:text-[16px] text-zinc-300/90 leading-relaxed font-normal flex-1">
                  Automated Shipment Workflows.Reduced Manual Touchpoints.Process Standardization.Automated Task Management
                </p>
              </div>

            </div>
          </div>

          {/* ROW 3: Go live in as few as 60 days */}
          <div
            onClick={() => setActivePillar('go-live')}
            className="group py-9 md:py-11 transition-colors duration-200 hover:bg-[#0C8E92]/[0.06] px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-xl cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12">

              {/* Left Column: Timer in Hand Icon + Title */}
              <div className="flex items-center gap-5 sm:gap-6 lg:w-[48%] shrink-0">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-zinc-200 shrink-0 group-hover:text-[#79CBC4] group-hover:scale-105 transition-all duration-200"
                  aria-hidden="true"
                >
                  <TimerHandIcon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl sm:text-[27px] md:text-[31px] font-medium text-white tracking-tight leading-snug group-hover:text-[#79CBC4] transition-colors">
                  Improve Customer
                </h3>
              </div>

              {/* Right Column: Description + "Book a demo" Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 lg:w-[52%]">
                <p className="text-[15px] sm:text-[16px] text-zinc-300/90 leading-relaxed font-normal flex-1">
                  Shipment Margin Analysis.Customer Profitability.Trade Lane Analysis.Revenue vs Expense Tracking
                </p>


              </div>

            </div>
          </div>

          {/* ROW 4: */}
          <div
            onClick={() => setActivePillar('go-live')}
            className="group py-9 md:py-11 transition-colors duration-200 hover:bg-[#0C8E92]/[0.06] px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-xl cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12">

              {/* Left Column: Timer in Hand Icon + Title */}
              <div className="flex items-center gap-5 sm:gap-6 lg:w-[48%] shrink-0">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-zinc-200 shrink-0 group-hover:text-[#79CBC4] group-hover:scale-105 transition-all duration-200"
                  aria-hidden="true"
                >
                  <TimerHandIcon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl sm:text-[27px] md:text-[31px] font-medium text-white tracking-tight leading-snug group-hover:text-[#79CBC4] transition-colors">
                  Accelerate Customer
                </h3>
              </div>

              {/* Right Column: Description + "Book a demo" Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 lg:w-[52%]">
                <p className="text-[15px] sm:text-[16px] text-zinc-300/90 leading-relaxed font-normal flex-1">
                  Shipment Margin Analysis.Customer Profitability.Trade Lane Analysis.Revenue vs Expense Tracking
                </p>


              </div>

            </div>
          </div>
        </div>



      </div>

      {/* Interactive Modals */}
      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

      <WhitepaperModal
        isOpen={isWhitepaperOpen}
        onClose={() => setIsWhitepaperOpen(false)}
      />

      <DetailModal
        pillarId={activePillar}
        onClose={() => setActivePillar(null)}
        onOpenDemo={() => {
          setActivePillar(null);
          setIsDemoOpen(true);
        }}
      />
    </section>
  );
}
