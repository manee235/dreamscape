import React, { useState } from 'react';
import { X, MessageSquare, Mail, Send, CheckCircle2, ChevronRight, ChevronLeft, User, Home, Wallet, SendHorizontal } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'contact' | 'portal';
}

const SERVICE_OPTIONS = [
  {
    title: 'House Planning & Layout Design',
    desc: 'Custom floor plans, site orientation & approval drawings.',
  },
  {
    title: '3D Elevation & Photorealistic Renderings',
    desc: '3D exterior & interior visualizations before building.',
  },
  {
    title: 'Interior & Exterior Spatial Design',
    desc: 'Lighting, materials, joinery & landscape integration.',
  },
  {
    title: 'Structural & Construction Consulting',
    desc: 'Engineering guidance, site visits & structural calculations.',
  },
];

const BUDGET_OPTIONS = [
  { label: 'LKR 30,000 - 50,000', detail: 'Basic Layout & Consultation' },
  { label: 'LKR 50,000 - 100,000', detail: 'Complete 2D Architectural Drawings' },
  { label: 'LKR 100,000 - 200,000', detail: 'Full 3D Elevation & Renderings' },
  { label: 'LKR 200,000 - 500,000+', detail: 'Turnkey Architectural & Engineering Package' },
];

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  mode = 'contact',
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sendMethod, setSendMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState(SERVICE_OPTIONS[0].title);
  const [designStyle, setDesignStyle] = useState('Modern Minimalist');
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_OPTIONS[1].label);
  const [description, setDescription] = useState('');
  const [accessCode, setAccessCode] = useState('');

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const messageText = 
      `*New Project Request - Dreamscape Designs*\n\n` +
      `*Full Name:* ${fullName}\n` +
      `*Phone/WhatsApp:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Service Required:* ${selectedService}\n` +
      `*Design Preference:* ${designStyle}\n` +
      `*Approximate Budget:* ${selectedBudget}\n\n` +
      `*Project Description:*\n${description || 'N/A'}`;

    if (sendMethod === 'whatsapp') {
      const whatsappUrl = `https://wa.me/94779962051?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      const mailtoUrl = `mailto:dreamscapedesigns.lk@gmail.com?subject=${encodeURIComponent(
        `Project Inquiry: ${selectedService} - ${fullName}`
      )}&body=${encodeURIComponent(messageText)}`;
      window.location.href = mailtoUrl;
    }

    setSubmitted(true);
  };

  const steps = [
    { num: 1, label: 'Personal Info', icon: User },
    { num: 2, label: 'Design Service', icon: Home },
    { num: 3, label: 'Budget & Details', icon: Wallet },
    { num: 4, label: 'Dispatch', icon: SendHorizontal },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto font-poppins">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8 text-slate-900">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-900" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 rounded-full bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {mode === 'contact' ? (
          <div>
            {/* Header */}
            <div className="mb-6 text-center sm:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-2 font-semibold">
                Dreamscape Designs
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Start Your Project
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Located in Kurunegala, Sri Lanka. Contact us directly via WhatsApp (077 996 2051).
              </p>
            </div>

            {/* Stepper Header Bar (Exact React Bits Style) */}
            <div className="mb-8">
              <div className="flex items-center justify-between max-w-md mx-auto relative px-2">
                {/* Connector Bar */}
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
                <div
                  className="absolute top-4 left-6 h-0.5 bg-emerald-500 transition-all duration-500 -z-0"
                  style={{
                    width: `${((currentStep - 1) / (steps.length - 1)) * 88}%`,
                  }}
                />

                {steps.map((step) => {
                  const isActive = currentStep === step.num;
                  const isDone = currentStep > step.num;

                  return (
                    <div
                      key={step.num}
                      onClick={() => {
                        if (step.num < currentStep || fullName) setCurrentStep(step.num);
                      }}
                      className="flex flex-col items-center z-10 cursor-pointer group"
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isActive
                            ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)] scale-110'
                            : isDone
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : step.num}
                      </div>
                      <span
                        className={`text-[11px] font-medium mt-1.5 hidden sm:block ${
                          isActive ? 'text-slate-900 font-bold' : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleFormSubmit}>
                {/* ── STEP 1: Personal Information ── */}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b pb-2">
                      Step 1: Personal Information
                    </h3>

                    <div>
                      <label className="block text-xs text-slate-700 font-semibold mb-1">
                        Full Name <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maneesh Amindu"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-700 font-semibold mb-1">
                        Phone / WhatsApp Number <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0779962051"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-700 font-semibold mb-1">
                        Email Address <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Service & Design Type ── */}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b pb-2">
                      Step 2: Select Service & Design Style
                    </h3>

                    <div>
                      <label className="block text-xs text-slate-700 font-semibold mb-2">
                        Required Service
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {SERVICE_OPTIONS.map((srv) => (
                          <div
                            key={srv.title}
                            onClick={() => setSelectedService(srv.title)}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                              selectedService === srv.title
                                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <h4 className="text-xs font-bold">{srv.title}</h4>
                            <p
                              className={`text-[11px] mt-1 ${
                                selectedService === srv.title ? 'text-slate-300' : 'text-slate-500'
                              }`}
                            >
                              {srv.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-700 font-semibold mb-1.5">
                        Preferred Design Style
                      </label>
                      <select
                        value={designStyle}
                        onChange={(e) => setDesignStyle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:bg-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                      >
                        <option value="Modern Minimalist">Modern Minimalist Villa</option>
                        <option value="Tropical Sri Lankan">Traditional Sri Lankan Contemporary</option>
                        <option value="Luxury Glass Estate">Luxury Glass & Steel Residence</option>
                        <option value="Commercial Complex">Commercial & Multi-Storey</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Budget Selection (No Sliders) & Description ── */}
                {currentStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b pb-2">
                      Step 3: Approximate Budget & Requirements
                    </h3>

                    <div>
                      <label className="block text-xs text-slate-700 font-semibold mb-2">
                        Select Approximate Budget Package
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {BUDGET_OPTIONS.map((bgt) => (
                          <div
                            key={bgt.label}
                            onClick={() => setSelectedBudget(bgt.label)}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                              selectedBudget === bgt.label
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                                : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <h4 className="text-xs font-bold">{bgt.label}</h4>
                            <p
                              className={`text-[11px] mt-1 ${
                                selectedBudget === bgt.label ? 'text-emerald-100' : 'text-slate-500'
                              }`}
                            >
                              {bgt.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-700 font-semibold mb-1">
                        Project Description / Specific Details
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Land size (perches), number of floors/bedrooms, location details..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* ── STEP 4: Dispatch Choice & Confirmation ── */}
                {currentStep === 4 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b pb-2">
                      Step 4: Dispatch Method & Summary
                    </h3>

                    {/* Summary Card */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Name:</span>
                        <span className="font-bold text-slate-900">{fullName || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Phone / WhatsApp:</span>
                        <span className="font-bold text-slate-900">{phone || '0779962051'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Service:</span>
                        <span className="font-bold text-slate-900">{selectedService}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Budget:</span>
                        <span className="font-bold text-emerald-600">{selectedBudget}</span>
                      </div>
                    </div>

                    {/* Sending Method Selection */}
                    <div>
                      <label className="block text-xs text-slate-700 font-semibold mb-2">
                        Preferred Delivery Platform
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setSendMethod('whatsapp')}
                          className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                            sendMethod === 'whatsapp'
                              ? 'bg-emerald-500 text-white border-emerald-500 shadow-md'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>WhatsApp Direct</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSendMethod('email')}
                          className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                            sendMethod === 'email'
                              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <Mail className="w-4 h-4" />
                          <span>Email Dispatch</span>
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center space-x-2 cursor-pointer mt-4 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        SEND VIA {sendMethod === 'whatsapp' ? 'WHATSAPP' : 'EMAIL'}
                      </span>
                    </button>
                  </div>
                )}

                {/* Stepper Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                  ) : <div />}

                  {currentStep < 4 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!fullName && currentStep === 1}
                      className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold cursor-pointer transition-all shadow-md ml-auto"
                    >
                      <span>Next Step</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>
            ) : (
              /* Success Confirmation */
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-slate-900">Project Details Sent!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your project details have been dispatched via {sendMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}. Dreamscape Designs will contact you promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Client Portal View */
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Client Portal Access</h2>
            <p className="text-xs text-slate-500 mb-6">
              Access live 3D models and blueprint files for active projects.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs text-slate-700 font-semibold mb-1">Client Email</label>
                <input
                  type="email"
                  required
                  placeholder="client@dreamscapedesigns.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-700 font-semibold mb-1">Passcode / Access Key</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
              >
                Login to Portal
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
