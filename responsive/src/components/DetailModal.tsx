import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { CraneIcon, PyramidIcon, TimerHandIcon } from './Icons';

export type PillarId = 'purpose-built' | 'modern-simple' | 'go-live';

interface PillarData {
  id: PillarId;
  title: string;
  tagline: string;
  description: string;
  iconType: 'crane' | 'pyramid' | 'timer';
  highlights: { title: string; desc: string }[];
  statLabel: string;
  statValue: string;
}

const PILLAR_DETAILS: Record<PillarId, PillarData> = {
  'purpose-built': {
    id: 'purpose-built',
    title: 'Purpose-built for construction',
    tagline: 'Engineered for jobsite realities, not generic spreadsheets',
    description: 'Every feature addresses real contractor challenges. No generic workflows or irrelevant modules - only tools that drive profitability in construction.',
    iconType: 'crane',
    statValue: '2.8x',
    statLabel: 'Faster field RFI resolution with zero office backlog',
    highlights: [
      {
        title: 'Real-Time Labor & Equipment Costing',
        desc: 'Direct capture of daily logs, certified payroll hours, and heavy equipment run-time matching budget codes in seconds.'
      },
      {
        title: 'Zero Bloat Architecture',
        desc: 'Stripped of non-construction clutter found in legacy ERPs—focusing purely on contract margin preservation and subcontractor compliance.'
      },
      {
        title: 'Subcontractor Portal & Lien Waiver Automation',
        desc: 'Automate conditional/unconditional lien waivers and pay application approvals without paper chasing.'
      }
    ]
  },
  'modern-simple': {
    id: 'modern-simple',
    title: 'Modern, powerful, simple',
    tagline: 'Consumer-grade speed with industrial-grade AI horsepower',
    description: 'Enterprise functionality with consumer-grade usability. Advanced AI integration without complexity.',
    iconType: 'pyramid',
    statValue: '<150ms',
    statLabel: 'Average response time for multi-gigabyte project sheets & models',
    highlights: [
      {
        title: 'Instant 2D/3D BIM Plan Navigation',
        desc: 'Load 500+ sheet drawing sets instantly on field tablets with intelligent vector rendering and offline caching.'
      },
      {
        title: 'Submittal & Spec Sheet AI Copilot',
        desc: 'Parse 1,000-page project specifications in seconds to highlight discrepancies, warranty terms, and submittal requirements.'
      },
      {
        title: 'Frictionless Mobile Adoption',
        desc: 'Superintendents and foremen master the interface in under 15 minutes without mandatory classroom seminars.'
      }
    ]
  },
  'go-live': {
    id: 'go-live',
    title: 'Go live in as few as 60 days',
    tagline: 'Turnkey onboarding led by former construction executives',
    description: 'Ready-to-deploy templates, data, and workflows. Our expert implementation team gets you operational in 60 days, not 6 months.',
    iconType: 'timer',
    statValue: '60 Days',
    statLabel: 'Guaranteed go-live SLA vs. typical 180-day enterprise slog',
    highlights: [
      {
        title: 'Weeks 1–2: Automated Historical Migration',
        desc: 'Our automated ETL pipeline ingests historical cost codes, vendor master files, and ongoing estimates.'
      },
      {
        title: 'Weeks 3–4: Jobsite Workflow Calibration',
        desc: 'Customization of approval limits, change order thresholds, and accounting ERP bi-directional sync.'
      },
      {
        title: 'Weeks 5–8: Staged Jobsite Rollout & Full Go-Live',
        desc: 'Field superintendents live pilot on active jobs with dedicated on-site implementation partner support.'
      }
    ]
  }
};

interface DetailModalProps {
  pillarId: PillarId | null;
  onClose: () => void;
  onOpenDemo: () => void;
}

export function DetailModal({ pillarId, onClose, onOpenDemo }: DetailModalProps) {
  if (!pillarId) return null;
  const pillar = PILLAR_DETAILS[pillarId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-[#0c0c11] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full bg-gradient-to-r from-[#0C8E92] via-[#79CBC4] to-[#0C8E92]" />
        
        <div className="p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5 mb-4">
            {pillar.iconType === 'crane' && (
              <div className="w-11 h-11 rounded-xl bg-[#0C8E92] border border-[#79CBC4]/40 flex items-center justify-center text-white shadow-[0_0_20px_rgba(12,142,146,0.4)]">
                <CraneIcon className="w-5 h-5" />
              </div>
            )}
            {pillar.iconType === 'pyramid' && (
              <div className="w-11 h-11 rounded-xl bg-[#0C8E92]/20 border border-[#79CBC4]/30 flex items-center justify-center text-[#79CBC4]">
                <PyramidIcon className="w-6 h-6" />
              </div>
            )}
            {pillar.iconType === 'timer' && (
              <div className="w-11 h-11 rounded-xl bg-[#0C8E92]/20 border border-[#79CBC4]/30 flex items-center justify-center text-[#79CBC4]">
                <TimerHandIcon className="w-6 h-6" />
              </div>
            )}

            <div>
              <span className="text-xs uppercase tracking-wider text-[#79CBC4] font-semibold">
                Pillar Deep Dive
              </span>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                {pillar.title}
              </h2>
            </div>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed mb-6">
            {pillar.description}
          </p>

          {/* Metric highlight box */}
          <div className="p-4 rounded-xl bg-[#0C8E92]/15 border border-[#79CBC4]/30 mb-6 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#79CBC4] tabular-nums tracking-tight">
              {pillar.statValue}
            </span>
            <span className="text-xs text-zinc-300">
              {pillar.statLabel}
            </span>
          </div>

          {/* 3 highlights */}
          <div className="space-y-3 mb-6">
            {pillar.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/60">
                <CheckCircle2 className="w-4 h-4 text-[#79CBC4] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">{h.title}</h4>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-normal">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
            <button
              onClick={onClose}
              className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenDemo();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0C8E92] hover:bg-[#097376] border border-[#79CBC4]/40 text-white text-xs font-medium transition-all shadow-[0_2px_12px_rgba(12,142,146,0.35)] cursor-pointer active:scale-95"
            >
              Book a live demo
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
