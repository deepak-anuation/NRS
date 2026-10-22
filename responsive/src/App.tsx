import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import RibbonHeroSection from './components/RibbonHeroSection';
import { CircularProcessSection } from './components/CircularProcessSection';
import { IntelligentPlatformWheel, IntelligentPillar } from './components/IntelligentPlatformWheel.tsx';
import { X, CheckCircle2, ArrowRight, Mail, Sparkles, Check } from 'lucide-react';

export default function App() {
  const [selectedPillar, setSelectedPillar] = useState<IntelligentPillar | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState('Bespoke Digital Consultation');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleOpenContact = (topic: string = 'Bespoke Digital Consultation') => {
    setContactTopic(topic);
    setIsContactOpen(true);
    setContactSubmitted(false);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setIsContactOpen(false);
      setContactSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-clip">
      {/* Top Navigation Bar */}
      <Navbar onContactClick={() => handleOpenContact('Executive Freight Forwarding Consultation')} />

      {/* Main Content Sections */}
      <main className="w-full flex-1 flex flex-col">
        {/* Hero Section with Cormorant Garamond Typography & Vertical Zig-Zag Slider */}
        <HeroSection onExploreClick={() => scrollToSection('why-choose-us')} />

        {/* Why Choose Us Section with Falling 3D Question Mark Canvas & Feature Cards */}
        <WhyChooseUsSection
          onRequestConsultation={() => handleOpenContact('Why Choose Us Inquiry')}
        />

        {/* Business Benefits 3D Ribbon Section with Scroll-linked Interactive Physics */}
        <RibbonHeroSection
          onScrollToNext={() => scrollToSection('circular-process-section')}
        />

        {/* Interactive Circular Process Arc Section */}
        <CircularProcessSection
          onSelectTopic={(topic) => handleOpenContact(`${topic} Strategy Inquiry`)}
        />

        {/* One Intelligent Platform Wheel Section */}
        <div className="py-20 sm:py-24 bg-gradient-to-b from-white via-slate-50/40 to-white border-t border-slate-100">
          <IntelligentPlatformWheel
            onSelectPillar={(pillar) => setSelectedPillar(pillar)}
          />
        </div>
      </main>

      {/* Elegant Domain-Native Footer */}
      {/* <footer className="w-full bg-[#031b1d] text-slate-400 border-t border-teal-900/40 py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-6 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 42 28" className="w-full h-full" fill="none">
                <ellipse 
                  cx="14" 
                  cy="17" 
                  rx="9.5" 
                  ry="6" 
                  transform="rotate(-26 14 17)" 
                  stroke="#5eead4" 
                  strokeWidth="2.8" 
                  opacity="0.95"
                />
                <ellipse 
                  cx="24" 
                  cy="11" 
                  rx="9.5" 
                  ry="6" 
                  transform="rotate(-26 24 11)" 
                  stroke="#0d828a" 
                  strokeWidth="2.8" 
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Nacreous</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <a href="#home" className="hover:text-teal-300 transition-colors">Home</a>
            <a href="#why-choose-us" className="hover:text-teal-300 transition-colors">Why Choose Us</a>
            <a href="#ribbon-hero" className="hover:text-teal-300 transition-colors">Benefits</a>
            <a href="#circular-process-section" className="hover:text-teal-300 transition-colors">Process</a>
            <button 
              onClick={() => handleOpenContact('General Enterprise Inquiry')}
              className="hover:text-teal-300 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          <p className="text-xs text-slate-500 text-center md:text-right">
            &copy; {new Date().getFullYear()} Nacreous & LogiCore AI. All rights reserved.
          </p>
        </div>
      </footer> */}

      {/* Intelligent Pillar Deep-Dive Modal */}
      {selectedPillar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="h-1.5 w-full"
              style={{ background: selectedPillar.gradientBar || selectedPillar.color }} 
            />

            <div className="p-6 sm:p-8">
              <button
                onClick={() => setSelectedPillar(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                  style={{ backgroundColor: selectedPillar.color }}
                >
                  <selectedPillar.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-teal-700 font-bold">
                    Platform Pillar
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {selectedPillar.pillarName}
                  </h3>
                </div>
              </div>

              {selectedPillar.headline && (
                <p className="text-base font-semibold text-slate-800 mb-2">
                  {selectedPillar.headline}
                </p>
              )}

              {/* Subfeatures */}
              {selectedPillar.subfeatures && (
                <div className="space-y-2 mb-6">
                  {selectedPillar.subfeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Metrics Grid */}
              {selectedPillar.metrics && selectedPillar.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  {selectedPillar.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 tabular-nums">
                        {metric.value}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Capabilities */}
              {selectedPillar.capabilities && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Automated Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedPillar.capabilities.map((cap, idx) => (
                      <div key={idx} className="text-xs text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedPillar(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const name = selectedPillar.pillarName;
                    setSelectedPillar(null);
                    handleOpenContact(`${name} Architecture Inquiry`);
                  }}
                  className="px-5 py-2.5 bg-[#0d828a] hover:bg-[#096b72] text-white font-semibold text-xs rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Deployment Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Contact / Consultation Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Consultation Enquiry</h3>
                  <p className="text-xs text-slate-500">{contactTopic}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsContactOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {contactSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-teal-600 animate-bounce" />
                <h4 className="text-lg font-bold text-slate-900">Enquiry Confirmed</h4>
                <p className="text-sm text-slate-500 max-w-xs">
                  Our enterprise supply chain and ERP specialists will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Corporate Email
                  </label>
                  <input 
                    type="email" 
                    required 
                    placeholder="alex@enterprisefreight.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Topic of Interest
                  </label>
                  <input 
                    type="text" 
                    value={contactTopic} 
                    onChange={(e) => setContactTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50 font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Shipment Volume / Logistics Requirements
                  </label>
                  <textarea 
                    rows={3} 
                    placeholder="Briefly describe your logistics corridors, cargo types, or ERP requirements..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3 bg-[#0d828a] hover:bg-[#096b72] text-white font-semibold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
