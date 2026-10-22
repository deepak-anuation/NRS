import React, { useState } from 'react';
import {
  Layers,
  Zap,
  Globe2
} from 'lucide-react';

export interface IntelligentPillar {
  id: string;
  pillarName: string;
  color: string;
  gradientBar: string;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  icon: React.ElementType;
  headline?: string;
  subfeatures?: string[];
  capabilities?: string[];
  metrics?: { label: string; value: string }[];
}

export const INTELLIGENT_PILLARS: IntelligentPillar[] = [
  {
    id: 'one-platform',
    pillarName: 'One Platform',
    color: '#0284c7', // Sky Blue / Ocean Teal
    gradientBar: 'linear-gradient(to bottom, #0284c7 0%, #06b6d4 100%)',
    startAngle: 300,
    endAngle: 60,
    midAngle: 0, // Top
    icon: Layers,
    headline: 'Unified Logistics Operating System',
    subfeatures: [
      'Eliminates fragmented tools & multi-software chaos',
      'Unified TMS, WMS, CRM, and Freight Billing in one pane',
      'Real-time automated document processing & e-filing'
    ],
    capabilities: [
      'Centralized Rate Quotations & Tariff Engine',
      'Automated Bill of Lading (B/L) & Delivery Notes',
      'Single-pane Milestone Tracking across Air, Sea & Land',
      'Multi-currency Financial Ledger & Invoicing'
    ],
    metrics: [
      { label: 'System Consolidation', value: '4 into 1' },
      { label: 'Doc Generation Speed', value: '3.2 sec' },
      { label: 'Data Accuracy', value: '99.9%' }
    ]
  },
  {
    id: 'unlimited-possibilities',
    pillarName: 'Unlimited Possibilities',
    color: '#0ea5e9', // Vibrant Electric Cyan-Blue
    gradientBar: 'linear-gradient(to bottom, #0ea5e9 0%, #2dd4bf 100%)',
    startAngle: 60,
    endAngle: 180,
    midAngle: 120, // Right / 4 o'clock
    icon: Zap,
    headline: 'Extensible Multi-Modal Engine',
    subfeatures: [
      'Plug-and-play REST APIs & custom webhook automation',
      'AI dynamic multi-modal route & carrier optimization',
      'Scales seamlessly from regional 3PL to global enterprise'
    ],
    capabilities: [
      'Automated Smart Route Selection (Cost vs. Speed)',
      'Custom Workflow Builder & Triggered Notifications',
      'Carrier Capacity Matching & Drayage Optimization',
      'Enterprise ERP & Warehouse Integration'
    ],
    metrics: [
      { label: 'Carrier Network', value: '500+ Connected' },
      { label: 'Route Optimization', value: '-18% Cost' },
      { label: 'API Response', value: '85ms' }
    ]
  },
  {
    id: 'connected-ecosystem',
    pillarName: 'Connected Logistics Ecosystem',
    color: '#14b8a6', // Deep Emerald Teal
    gradientBar: 'linear-gradient(to bottom, #0d9488 0%, #10b981 100%)',
    startAngle: 180,
    endAngle: 300,
    midAngle: 240, // Left-Bottom / 8 o'clock
    icon: Globe2,
    headline: 'Collaborative Multi-Stakeholder Mesh',
    subfeatures: [
      'Live synchronized data fabric for all freight actors',
      'Instant visibility for Shippers, Forwarders, Terminals & Customs',
      'Automated status broadcasts & exception management'
    ],
    capabilities: [
      'Shipper Self-Service Live Tracking Portal',
      'Direct Terminal & Port Authority EDI Integrations',
      'Automated Customs Clearance Authorizations',
      'Driver Mobile App & Digital Proof of Delivery (e-POD)'
    ],
    metrics: [
      { label: 'Stakeholder Sync', value: 'Real-time' },
      { label: 'Status Latency', value: '< 2 mins' },
      { label: 'Global Ports', value: '180+ Active' }
    ]
  }
];

export function IntelligentPlatformWheel({ onSelectPillar }: { onSelectPillar?: (pillar: IntelligentPillar) => void }) {
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  const cx = 260;
  const cy = 260;
  const rOuter = 210;
  const rInner = 114;
  const rIcon = (rOuter + rInner) / 2; // 162

  // Generate 3 equal 120-degree sectors
  const getSectorPath = (startDeg: number, endDeg: number): string => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1_out = cx + rOuter * Math.sin(toRad(startDeg));
    const y1_out = cy - rOuter * Math.cos(toRad(startDeg));
    const x2_out = cx + rOuter * Math.sin(toRad(endDeg));
    const y2_out = cy - rOuter * Math.cos(toRad(endDeg));

    const x2_in = cx + rInner * Math.sin(toRad(endDeg));
    const y2_in = cy - rInner * Math.cos(toRad(endDeg));
    const x1_in = cx + rInner * Math.sin(toRad(startDeg));
    const y1_in = cy - rInner * Math.cos(toRad(startDeg));

    return `M ${x1_out.toFixed(2)} ${y1_out.toFixed(2)} ` +
      `A ${rOuter} ${rOuter} 0 0 1 ${x2_out.toFixed(2)} ${y2_out.toFixed(2)} ` +
      `L ${x2_in.toFixed(2)} ${y2_in.toFixed(2)} ` +
      `A ${rInner} ${rInner} 0 0 0 ${x1_in.toFixed(2)} ${y1_in.toFixed(2)} Z`;
  };

  const getIconPosition = (midDeg: number) => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    return {
      x: cx + rIcon * Math.sin(toRad(midDeg)),
      y: cy - rIcon * Math.cos(toRad(midDeg)),
    };
  };

  const p1 = INTELLIGENT_PILLARS[0]; // One Platform
  const p2 = INTELLIGENT_PILLARS[1]; // Unlimited Possibilities
  const p3 = INTELLIGENT_PILLARS[2]; // Connected Logistics Ecosystem

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 select-none">
      
      {/* Title Header */}
      <div className="flex flex-col items-center pt-2 pb-6 sm:pb-12 text-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#042749] tracking-tight">
          One Intelligent Platform
        </h2>
      </div>

      {/* 3 Pillars Layout: Clean 3 Headings around the Central Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 py-2">
        
        {/* CENTER: Circular Hub Wheel (Mobile shows first at top for visual punch, desktop in center) */}
        <div className="lg:col-span-4 flex justify-center items-center py-2 sm:py-4 relative order-1 lg:order-2">
          <div className="relative w-[270px] h-[270px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] max-w-full flex items-center justify-center">
            
            <svg viewBox="0 0 520 520" className="w-full h-full drop-shadow-md">
              {/* 3 Radial Sectors */}
              <g>
                {INTELLIGENT_PILLARS.map((p) => {
                  const isHovered = hoveredPillar === p.id;
                  const d = getSectorPath(p.startAngle, p.endAngle);
                  return (
                    <path
                      key={p.id}
                      d={d}
                      fill={p.color}
                      stroke="#ffffff"
                      strokeWidth="6"
                      strokeLinejoin="miter"
                      className={`transition-all duration-200 cursor-pointer ${
                        isHovered ? 'filter brightness-110 drop-shadow-md' : 'hover:brightness-105'
                      }`}
                      onMouseEnter={() => setHoveredPillar(p.id)}
                      onMouseLeave={() => setHoveredPillar(null)}
                      onClick={() => onSelectPillar?.(p)}
                    />
                  );
                })}
              </g>

              {/* Inner White Disc Base */}
              <circle cx={cx} cy={cy} r={rInner} fill="#ffffff" stroke="#ffffff" strokeWidth="2" />

              {/* Icons on the 3 Sectors */}
              {INTELLIGENT_PILLARS.map((p) => {
                const { x, y } = getIconPosition(p.midAngle);
                const isHovered = hoveredPillar === p.id;
                const IconComp = p.icon;
                return (
                  <g
                    key={`icon-${p.id}`}
                    transform={`translate(${x - 20}, ${y - 20})`}
                    className={`pointer-events-none transition-transform duration-200 ${
                      isHovered ? 'scale-115' : ''
                    }`}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  >
                    <foreignObject width="40" height="40">
                      <div className="w-full h-full flex items-center justify-center text-white drop-shadow-xs">
                        <IconComp className="w-8.5 h-8.5" />
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>

            {/* Clean Static Center Core */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              style={{
                width: `${(rInner * 2 / 520) * 100}%`,
                height: `${(rInner * 2 / 520) * 100}%`,
                margin: 'auto',
              }}
            >
              <div 
                className="w-full h-full flex flex-col items-center justify-center text-center p-3 pointer-events-auto cursor-pointer group"
                onClick={() => onSelectPillar?.(p1)}
                title="Platform Core"
              >
                {/* 2 Stepped Cyan Brand Blocks */}
                <div className="relative w-8 h-8 mb-2">
                  <div className="absolute top-0 right-1 w-4 h-4 bg-[#00c5c8] rounded-xs shadow-2xs" />
                  <div className="absolute bottom-0 left-0 w-4.5 h-4.5 bg-[#00c5c8] rounded-xs shadow-2xs" />
                </div>

                {/* Central Typography */}
                <span className="text-[14px] sm:text-[15.5px] font-black text-[#042749] leading-[1.15] tracking-tight block">
                  One Intelligent<br />Platform
                </span>
                
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                  CargoWare
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* LEFT COLUMN: Card 1 (One Platform) & Card 3 (Connected Logistics Ecosystem) */}
        <div className="lg:col-span-4 flex flex-col justify-around h-auto lg:h-[460px] space-y-3 sm:space-y-4 lg:space-y-0 order-2 lg:order-1">
          {/* Card 1: One Platform */}
          <div
            onMouseEnter={() => setHoveredPillar('one-platform')}
            onMouseLeave={() => setHoveredPillar(null)}
            onClick={() => onSelectPillar?.(p1)}
            className={`group flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer ${
              hoveredPillar === 'one-platform'
                ? 'bg-sky-50/90 ring-1 ring-sky-500/40 scale-[1.02] shadow-sm'
                : 'hover:bg-slate-50/80 border border-slate-100/80 bg-white/60'
            }`}
          >
            {/* Vertical Gradient Bar (Left Side) */}
            <div
              className="w-[6px] sm:w-[8px] h-[40px] sm:h-[48px] shrink-0 rounded-[2px] transition-transform duration-300 group-hover:scale-y-110"
              style={{ background: p1.gradientBar }}
            />
            <div className="text-left">
              <h3 className="text-lg sm:text-xl lg:text-[26px] font-black text-[#111827] tracking-tight group-hover:text-sky-800 transition-colors leading-tight">
                {p1.pillarName}
              </h3>
            </div>
          </div>

          {/* Card 3: Connected Logistics Ecosystem */}
          <div
            onMouseEnter={() => setHoveredPillar('connected-ecosystem')}
            onMouseLeave={() => setHoveredPillar(null)}
            onClick={() => onSelectPillar?.(p3)}
            className={`group flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer ${
              hoveredPillar === 'connected-ecosystem'
                ? 'bg-teal-50/90 ring-1 ring-teal-500/40 scale-[1.02] shadow-sm'
                : 'hover:bg-slate-50/80 border border-slate-100/80 bg-white/60'
            }`}
          >
            {/* Vertical Gradient Bar (Left Side) */}
            <div
              className="w-[6px] sm:w-[8px] h-[40px] sm:h-[52px] shrink-0 rounded-[2px] transition-transform duration-300 group-hover:scale-y-110"
              style={{ background: p3.gradientBar }}
            />
            <div className="text-left">
              <h3 className="text-lg sm:text-xl lg:text-[26px] font-black text-[#111827] tracking-tight group-hover:text-teal-800 transition-colors leading-tight">
                {p3.pillarName}
              </h3>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Card 2 (Unlimited Possibilities) */}
        <div className="lg:col-span-4 flex flex-col justify-center h-auto lg:h-[460px] order-3">
          <div
            onMouseEnter={() => setHoveredPillar('unlimited-possibilities')}
            onMouseLeave={() => setHoveredPillar(null)}
            onClick={() => onSelectPillar?.(p2)}
            className={`group flex items-center lg:justify-end gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer ${
              hoveredPillar === 'unlimited-possibilities'
                ? 'bg-cyan-50/90 ring-1 ring-cyan-500/40 scale-[1.02] shadow-sm'
                : 'hover:bg-slate-50/80 border border-slate-100/80 bg-white/60'
            }`}
          >
            {/* Mobile gradient bar on left */}
            <div
              className="lg:hidden w-[6px] sm:w-[8px] h-[40px] sm:h-[48px] shrink-0 rounded-[2px] transition-transform duration-300 group-hover:scale-y-110"
              style={{ background: p2.gradientBar }}
            />
            <div className="text-left lg:text-right">
              <h3 className="text-lg sm:text-xl lg:text-[26px] font-black text-[#111827] tracking-tight group-hover:text-cyan-800 transition-colors leading-tight">
                {p2.pillarName}
              </h3>
            </div>
            {/* Desktop gradient bar on right */}
            <div
              className="hidden lg:block w-[8px] h-[48px] shrink-0 rounded-[2px] transition-transform duration-300 group-hover:scale-y-110"
              style={{ background: p2.gradientBar }}
            />
          </div>
        </div>

      </div>

    </div>
  );
}
