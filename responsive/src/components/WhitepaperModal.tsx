import React, { useState } from 'react';
import { X, Download, FileText, Check, ShieldCheck, Cpu, ArrowUpRight, Sparkles } from 'lucide-react';
import { PdfDocIcon } from './Icons';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhitepaperModal({ isOpen, onClose }: WhitepaperModalProps) {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      // Simulate file download
      const element = document.createElement('a');
      const file = new Blob([
        `ConstructIQ Technical Whitepaper: Modern Construction Intelligence Architecture\n\n1. Purpose-Built Construction Data Pipeline\n2. Real-Time Field-to-Financial Sync\n3. Consumer-Grade Usability & Sub-second Query Latency\n4. 60-Day Implementation Framework\n\nSecurity: SOC 2 Type II Certified, ISO 27001, End-to-end encryption.`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'ConstructIQ-Architecture-Whitepaper-2026.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-[#0c0c10] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#0C8E92] via-[#79CBC4] to-[#0C8E92]" />

        <div className="p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#0C8E92]/15 border border-[#79CBC4]/30 flex items-center justify-center text-[#79CBC4] shrink-0">
              <PdfDocIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#79CBC4]">
                <span>Executive Technical Brief</span>
                <span>·</span>
                <span>14 Pages PDF</span>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-white mt-1">
                Modern Construction Tech & AI Integration Blueprint
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-sm text-zinc-300">
            <p className="leading-relaxed text-zinc-400">
              This publication breaks down how modern general contractors eliminate multi-million dollar job costing leaks by replacing legacy monolithic ERP software with real-time field telemetry and consumer-grade AI tools.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <Cpu className="w-4 h-4 text-[#79CBC4] mb-2" />
                <div className="text-xs font-medium text-white">Sub-100ms Query</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Real-time job costing sync from jobsite mobile apps.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <Sparkles className="w-4 h-4 text-[#79CBC4] mb-2" />
                <div className="text-xs font-medium text-white">Zero Hallucination</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">RFI & change order AI grounded strictly in verified BIM models.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <ShieldCheck className="w-4 h-4 text-[#79CBC4] mb-2" />
                <div className="text-xs font-medium text-white">Enterprise Guardrails</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">SOC 2 Type II certified and field role-based permissions.</div>
              </div>
            </div>

            <div className="border-t border-zinc-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-500">
                Format: <span className="text-zinc-300">PDF (5.4 MB)</span> · Published: <span className="text-zinc-300">Q1 2026</span>
              </div>
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0C8E92] hover:bg-[#097376] border border-[#79CBC4]/40 text-white text-sm font-medium transition-all shadow-lg shadow-[#0C8E92]/30 cursor-pointer active:scale-95"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    Downloaded
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Executive Spec
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
