import React, { useState } from 'react';
import { ChevronDown, X, Mail, Phone, ArrowRight, CheckCircle2, Menu } from 'lucide-react';

interface NavbarProps {
  onContactClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setIsContactModalOpen(false);
      setFormSubmitted(false);
    }, 1800);
  };

  const handleTriggerContact = () => {
    setIsMobileMenuOpen(false);
    if (onContactClick) {
      onContactClick();
    } else {
      setIsContactModalOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          
          {/* LEFT ZONE: Exact Logo & "Nacreous" Brand Wordmark */}
          <a href="/" className="flex items-center gap-3 group select-none shrink-0">
            {/* Two Interlocking Rings Logo (Exact match to reference image) */}
            <div className="relative w-9 h-7 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 42 28" className="w-full h-full" fill="none">
                {/* Light Cyan/Teal Under-Loop */}
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
                {/* Dark Teal Interlinked Over-Loop */}
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

            {/* Brand Title: Nacreous */}
            <span className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight font-sans">
              Nacreous
            </span>
          </a>

          {/* RIGHT ZONE: Desktop Nav Links & Action */}
          <div className="flex items-center gap-4 sm:gap-8">
            
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 sm:gap-9 text-[15px] font-medium font-sans">
              
              {/* Home (Active with solid teal underline bar matching reference) */}
              <a 
                href="#home" 
                className="relative py-2 text-[#0d828a] font-semibold transition-colors flex flex-col items-center"
              >
                <span>Home</span>
                {/* Solid teal underline bar placed directly below Home */}
                <span className="absolute bottom-0 inset-x-0 h-[2.5px] bg-[#0d828a] rounded-full" />
              </a>

              {/* Solutions (with dropdown chevron) */}
              <div 
                className="relative"
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onMouseLeave={() => setIsSolutionsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                  className="flex items-center gap-1.5 py-2 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
                >
                  <span>Solutions</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180 text-teal-700' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isSolutionsOpen && (
                  <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-fadeIn">
                    <a 
                      href="#freight" 
                      onClick={() => setIsSolutionsOpen(false)}
                      className="block p-2.5 rounded-lg hover:bg-teal-50/70 transition-colors"
                    >
                      <div className="text-sm font-bold text-slate-900">Freight Forwarding</div>
                      <div className="text-xs text-slate-500">Ocean & Air Cargo Orchestration</div>
                    </a>
                    <a 
                      href="#road" 
                      onClick={() => setIsSolutionsOpen(false)}
                      className="block p-2.5 rounded-lg hover:bg-teal-50/70 transition-colors"
                    >
                      <div className="text-sm font-bold text-slate-900">Fleet &amp; Dispatch</div>
                      <div className="text-xs text-slate-500">Real-Time Road Telematics</div>
                    </a>
                    <a 
                      href="#warehouse" 
                      onClick={() => setIsSolutionsOpen(false)}
                      className="block p-2.5 rounded-lg hover:bg-teal-50/70 transition-colors"
                    >
                      <div className="text-sm font-bold text-slate-900">Smart Storage</div>
                      <div className="text-xs text-slate-500">Automated Robotics &amp; ASRS</div>
                    </a>
                    <a 
                      href="#rail" 
                      onClick={() => setIsSolutionsOpen(false)}
                      className="block p-2.5 rounded-lg hover:bg-teal-50/70 transition-colors"
                    >
                      <div className="text-sm font-bold text-slate-900">Yard Automation</div>
                      <div className="text-xs text-slate-500">Intermodal Rail Coupling</div>
                    </a>
                  </div>
                )}
              </div>

            </nav>

            {/* Primary Action Button: "Get in Touch" (visible on desktop and tablet) */}
            <button
              type="button"
              onClick={handleTriggerContact}
              className="hidden sm:inline-flex px-5 py-2.5 bg-[#0d828a] hover:bg-[#0a6c73] active:bg-[#095f65] text-white font-medium text-sm tracking-wide rounded-[3px] shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer select-none"
            >
              Get in Touch
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-lg animate-fadeIn flex flex-col gap-4">
            <a 
              href="#home" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 text-base font-semibold text-[#0d828a] border-b border-slate-100 flex items-center justify-between"
            >
              <span>Home</span>
              <span className="w-2 h-2 rounded-full bg-[#0d828a]" />
            </a>

            <div className="py-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Logistics Solutions
              </span>
              <div className="grid grid-cols-1 gap-2 pl-2">
                <a 
                  href="#freight" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1.5 text-sm font-medium text-slate-700 hover:text-teal-700 transition-colors"
                >
                  Freight Forwarding
                </a>
                <a 
                  href="#road" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1.5 text-sm font-medium text-slate-700 hover:text-teal-700 transition-colors"
                >
                  Fleet &amp; Dispatch
                </a>
                <a 
                  href="#warehouse" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1.5 text-sm font-medium text-slate-700 hover:text-teal-700 transition-colors"
                >
                  Smart Storage &amp; Robotics
                </a>
                <a 
                  href="#rail" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1.5 text-sm font-medium text-slate-700 hover:text-teal-700 transition-colors"
                >
                  Yard Automation
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={handleTriggerContact}
              className="w-full py-3 bg-[#0d828a] hover:bg-[#0a6c73] active:bg-[#095f65] text-white font-medium text-sm tracking-wide rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* Interactive "Get in Touch" Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Get in Touch with Nacreous</h3>
                  <p className="text-xs text-slate-500">Enterprise Logistics &amp; ERP AI Consultation</p>
                </div>
              </div>
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formSubmitted ? (
              <div className="py-10 flex flex-col items-center justify-center text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-teal-600 animate-bounce" />
                <h4 className="text-lg font-bold text-slate-900">Enquiry Received</h4>
                <p className="text-sm text-slate-500 max-w-xs">
                  Our enterprise supply chain architects will connect with you within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email
                  </label>
                  <input 
                    type="email" 
                    required 
                    placeholder="sarah@globalfreight.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Logistics Interest
                  </label>
                  <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600">
                    <option>Autonomous Freight Forwarding</option>
                    <option>Fleet &amp; Dispatch Telematics</option>
                    <option>Smart Warehouse &amp; Robotics</option>
                    <option>Intermodal Rail Yard Automation</option>
                    <option>Full ERP &amp; AI Integration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message / Corridor Requirements
                  </label>
                  <textarea 
                    rows={3} 
                    placeholder="Describe your current trade lanes and monthly shipment volume..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3 bg-[#0d828a] hover:bg-[#096b72] text-white font-semibold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Enquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
