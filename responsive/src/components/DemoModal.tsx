import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, Building2, User, Mail, Phone, ChevronRight } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    company: '',
    contractorType: 'General Contractor',
    annualVolume: '$20M - $100M',
    preferredDate: '',
    preferredTime: '10:00 AM EST',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.workEmail.trim()) {
      errs.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errs.workEmail = 'Enter a valid corporate email address';
    }
    if (!formData.company.trim()) errs.company = 'Company name is required';
    if (!formData.preferredDate) errs.preferredDate = 'Select your target demo date';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 700);
  };

  const resetAndClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div 
        className="relative w-full max-w-xl bg-[#0d0d11] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#0C8E92] via-[#79CBC4] to-[#0C8E92]" />

        <div className="p-6 md:p-8">
          {/* Close button */}
          <button
            onClick={resetAndClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'form' ? (
            <div>
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#79CBC4]">
                  ConstructIQ Live Walkthrough
                </span>
                <h2 className="text-2xl font-semibold tracking-tight text-white mt-1">
                  Book a 1-on-1 Construction Demo
                </h2>
                <p className="text-sm text-zinc-400 mt-1.5">
                  See how our purpose-built platform integrates with your field workflows in 60 days.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Marcus Vance"
                        className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0C8E92] focus:ring-1 focus:ring-[#79CBC4]/40 transition-colors"
                      />
                    </div>
                    {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                      <input
                        type="email"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="mvance@apexbuilders.com"
                        className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0C8E92] focus:ring-1 focus:ring-[#79CBC4]/40 transition-colors"
                      />
                    </div>
                    {errors.workEmail && <p className="text-xs text-rose-400 mt-1">{errors.workEmail}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Company */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Apex Commercial Builders"
                        className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    {errors.company && <p className="text-xs text-rose-400 mt-1">{errors.company}</p>}
                  </div>

                  {/* Contractor Type */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Contractor Type
                    </label>
                    <select
                      value={formData.contractorType}
                      onChange={(e) => setFormData({ ...formData, contractorType: e.target.value })}
                      className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      <option value="General Contractor">General Contractor (GC)</option>
                      <option value="Commercial Builder">Commercial Builder</option>
                      <option value="Civil & Infrastructure">Civil & Infrastructure</option>
                      <option value="Specialty Trade Contractor">Specialty Trade Contractor</option>
                      <option value="Owner / Developer">Owner / Developer</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Target Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    {errors.preferredDate && <p className="text-xs text-rose-400 mt-1">{errors.preferredDate}</p>}
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Preferred Slot
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#0C8E92] transition-colors"
                      >
                        <option value="09:00 AM EST">09:00 AM EST</option>
                        <option value="11:00 AM EST">11:00 AM EST</option>
                        <option value="01:30 PM EST">01:30 PM EST</option>
                        <option value="03:00 PM EST">03:00 PM EST</option>
                        <option value="04:30 PM EST">04:30 PM EST</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm bg-[#0C8E92] hover:bg-[#097376] text-white shadow-lg shadow-[#0C8E92]/30 border border-[#79CBC4]/40 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Reserving your slot...' : 'Confirm Demo Reservation'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-zinc-500 text-center mt-2">
                    No credit card required · Tailored to your active project pipeline · 30-min session
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-6 text-center">
              <div className="w-14 h-14 rounded-full bg-[#0C8E92]/15 border border-[#79CBC4]/40 flex items-center justify-center mx-auto mb-4 text-[#79CBC4]">
                <CheckCircle2 className="w-8 h-8 text-[#79CBC4]" />
              </div>
              <h3 className="text-xl font-semibold text-white">Demo Confirmed!</h3>
              <p className="text-sm text-zinc-400 mt-2 max-w-sm mx-auto">
                We've reserved your session for <span className="text-[#79CBC4] font-medium">{formData.preferredDate || 'your selected date'}</span> at <span className="text-[#79CBC4] font-medium">{formData.preferredTime}</span>.
              </p>
              <div className="my-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-left text-xs space-y-2 text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Attendee:</span>
                  <span className="font-medium text-white">{formData.fullName} ({formData.company})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Calendar invite:</span>
                  <span className="text-white">{formData.workEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Assigned Engineer:</span>
                  <span className="text-[#79CBC4] font-medium">David Miller (VP Construction Solutions)</span>
                </div>
              </div>
              <button
                onClick={resetAndClose}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0C8E92] hover:bg-[#097376] text-white text-sm font-medium transition-colors cursor-pointer"
              >
                Back to Overview
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
