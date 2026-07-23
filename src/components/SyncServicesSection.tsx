import React from 'react';
import { Sparkles, CheckCircle2, Home, Compass, Leaf, ShieldCheck } from 'lucide-react';

export const SyncServicesSection: React.FC = () => {
  return (
    <section id="services" className="w-full py-28 px-6 sm:px-10 lg:px-16 bg-white text-slate-900 font-poppins">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Top Centered Pill Tag */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold tracking-wider uppercase mb-6 shadow-sm">
          <span>FEATURES</span>
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 text-center max-w-3xl leading-[1.15] mb-4">
          Finally bring your dream home vision to life
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-500 text-center max-w-2xl font-normal leading-relaxed mb-16">
          Seamlessly plan, visualize, and execute your residential build with expert architectural house planning, 3D renderings, and structural consulting.
        </p>

        {/* 2x2 Bento Grid Cards Container (Exact match to screenshot UI layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
          {/* Card 1: Customer-Centric Planning */}
          <div className="group rounded-[32px] bg-slate-50 border border-slate-200/80 p-8 sm:p-10 flex flex-col justify-between hover:border-slate-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
            
            {/* Top Interactive Mockup Display */}
            <div className="w-full h-56 sm:h-64 rounded-2xl bg-white border border-slate-200/80 p-6 flex flex-col items-center justify-center shadow-sm relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
              
              {/* Floating Customer Consultation Cards (Screenshot style) */}
              <div className="flex items-center gap-4 max-w-md w-full">
                
                {/* Person Card 1 */}
                <div className="flex-1 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-xs">
                  <div className="w-10 h-10 rounded-full overflow-hidden mx-auto mb-2 border border-slate-300">
                    <img
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1"
                      alt="Architect"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="block text-xs font-bold text-slate-900">Maneesh A.</span>
                  <span className="block text-[10px] text-slate-400 font-mono">Principal Architect</span>
                  <div className="mt-2 flex flex-wrap gap-1 justify-center">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[9px] font-semibold">House Plan</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[9px] font-semibold">2D Layout</span>
                  </div>
                </div>

                {/* Person Card 2 (Active Center) */}
                <div className="flex-1 p-4 rounded-2xl bg-white border-2 border-emerald-500 shadow-xl text-center transform -translate-y-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-2 border-2 border-emerald-400">
                    <img
                      src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1"
                      alt="Homeowner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="block text-xs font-extrabold text-slate-900">Client Review</span>
                  <span className="block text-[10px] text-emerald-600 font-bold font-mono">1-on-1 Session</span>
                  <div className="mt-2 flex flex-wrap gap-1 justify-center">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500 text-white text-[9px] font-bold">Approved</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Text Content */}
            <div className="mt-8">
              <div className="flex items-center space-x-2.5 mb-2">
                <div className="p-2 rounded-xl bg-slate-200 text-slate-900">
                  <Home className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Customer-Centric House Planning
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                Personalized 1-on-1 house layout consultations tailored around your family lifestyle, spatial flow, land topology, and municipal requirements.
              </p>
            </div>

          </div>

          {/* Card 2: Modern 3D Elevation & Renderings */}
          <div className="group rounded-[32px] bg-slate-50 border border-slate-200/80 p-8 sm:p-10 flex flex-col justify-between hover:border-slate-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
            
            {/* Top Interactive Mockup Display */}
            <div className="w-full h-56 sm:h-64 rounded-2xl bg-white border border-slate-200/80 p-6 flex flex-col justify-center shadow-sm relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
              
              {/* Checklist & Plan Execution Card (Screenshot style) */}
              <div className="max-w-xs mx-auto w-full bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs font-bold text-slate-900">3D Visualization Pipeline</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    100% Ready
                  </span>
                </div>

                <div className="flex items-center space-x-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>01. 3D Exterior Villa Elevation</span>
                </div>

                <div className="flex items-center space-x-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>02. Photorealistic Interior Renderings</span>
                </div>

                <div className="flex items-center space-x-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>03. Material & Lighting Walkthrough</span>
                </div>
              </div>

            </div>

            {/* Bottom Text Content */}
            <div className="mt-8">
              <div className="flex items-center space-x-2.5 mb-2">
                <div className="p-2 rounded-xl bg-slate-200 text-slate-900">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Modern Architectural 3D Designs
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                Photorealistic 3D interior and exterior renderings allowing you to experience every room, texture, and daylight angle before construction begins.
              </p>
            </div>

          </div>

          {/* Card 3: Eco-Friendly & Sustainable Design */}
          <div className="group rounded-[32px] bg-slate-50 border border-slate-200/80 p-8 sm:p-10 flex flex-col justify-between hover:border-slate-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
            
            {/* Top Interactive Mockup Display */}
            <div className="w-full h-56 sm:h-64 rounded-2xl bg-white border border-slate-200/80 p-6 flex items-center justify-center shadow-sm relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
              
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <Leaf className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <span className="block text-xs font-bold text-emerald-950">Cross Ventilation</span>
                  <span className="block text-[10px] text-emerald-700">Natural Cooling</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <Sparkles className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                  <span className="block text-xs font-bold text-amber-950">Sunlight Paths</span>
                  <span className="block text-[10px] text-amber-700">Daylight Passive Energy</span>
                </div>
              </div>

            </div>

            {/* Bottom Text Content */}
            <div className="mt-8">
              <div className="flex items-center space-x-2.5 mb-2">
                <div className="p-2 rounded-xl bg-slate-200 text-slate-900">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Eco-Friendly & Sustainable Living
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                Energy-efficient layouts designed to maximize natural ventilation, tropical airflow, and sun paths customized for Sri Lankan climatic conditions.
              </p>
            </div>

          </div>

          {/* Card 4: Structural Engineering & Consulting */}
          <div className="group rounded-[32px] bg-slate-50 border border-slate-200/80 p-8 sm:p-10 flex flex-col justify-between hover:border-slate-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
            
            {/* Top Interactive Mockup Display */}
            <div className="w-full h-56 sm:h-64 rounded-2xl bg-white border border-slate-200/80 p-6 flex flex-col items-center justify-center shadow-sm relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
              
              <div className="w-full max-w-xs bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold font-mono text-emerald-400">STRUCTURAL BARS</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-[11px] text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Council Blueprints:</span>
                    <span className="text-emerald-400 font-bold">100% Passed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Site Visits & Audits:</span>
                    <span className="text-emerald-400 font-bold">Active</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Text Content */}
            <div className="mt-8">
              <div className="flex items-center space-x-2.5 mb-2">
                <div className="p-2 rounded-xl bg-slate-200 text-slate-900">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Structural Engineering & Consulting
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                Complete structural calculation reports, municipal council approval drawings, and on-site construction guidance to guarantee building safety.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
