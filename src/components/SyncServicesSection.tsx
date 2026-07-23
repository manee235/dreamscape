import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 1,
    title: 'Crafted to Perfection',
    description:
      'Every element is intentionally designed with unmatched attention to detail. From premium materials to flawless finishes, each home reflects timeless craftsmanship and enduring quality.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 2,
    title: 'Designed Around You',
    description:
      'Tailored architectural layouts designed around your lifestyle, family needs, and spatial flow, ensuring every square foot serves a meaningful purpose.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 3,
    title: 'Iconic Locations',
    description:
      'Prime sites in Kurunegala and across Sri Lanka optimized for cross-ventilation, natural sunlight, and harmonious integration with the surrounding landscape.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 4,
    title: 'Innovation Meets Elegance',
    description:
      'Modern 3D BIM visualization, structural engineering precision, and sustainable smart living integration built into every blueprint.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 5,
    title: 'A Seamless Journey',
    description:
      'From initial concept sketches to approval drawings and site execution consulting — we guide you through every milestone with complete clarity.',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
  },
];

export const SyncServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Calculate progress ratio (0 to 1) while pinned
      const current = -rect.top;
      const ratio = Math.max(0, Math.min(1, current / totalScrollable));
      setScrollProgress(ratio);

      // Determine active feature index based on ratio
      const idx = Math.min(FEATURES.length - 1, Math.floor(ratio * FEATURES.length));
      setActiveIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="services"
      ref={containerRef}
      className="relative w-full bg-white"
      style={{ height: `${FEATURES.length * 75}vh` }}
    >
      {/* Pinned Sticky Section Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto overflow-hidden">
        
        {/* Top Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Architectural Excellence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Exceptional Living Crafted Through Every Detail
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal mt-2 max-w-2xl mx-auto">
            Every detail is crafted to elevate your living experience with style, comfort, and purpose.
          </p>

          {/* Sync Progress Bar */}
          <div className="w-48 h-1 bg-slate-100 rounded-full mx-auto mt-4 overflow-hidden border border-slate-200">
            <div
              className="h-full bg-emerald-500 transition-all duration-150 ease-out shadow-[0_0_8px_#10B981]"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Left Synced Image + Right Animated Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Pinned Synced House Image Container */}
          <div className="lg:col-span-6 relative h-[320px] sm:h-[420px] lg:h-[480px] rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 bg-slate-950 group">
            {FEATURES.map((feat, idx) => (
              <div
                key={feat.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  activeIndex === idx
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
              >
                <img
                  src={feat.image}
                  alt={feat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                {/* Floating Image Tag Badge */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wider">
                      Feature 0{idx + 1} / 0{FEATURES.length}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 font-mono">
                    Dreamscape Designs
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Interactive Synced Feature Items List */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4 pl-0 lg:pl-6">
            {FEATURES.map((feat, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={feat.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`p-5 sm:p-6 rounded-2xl transition-all duration-500 cursor-pointer border ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-800 shadow-xl scale-[1.02] translate-x-2'
                      : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-emerald-400 shadow-[0_0_10px_#10B981] scale-125'
                            : 'bg-slate-300'
                        }`}
                      />
                      <h3
                        className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                          isActive ? 'text-white' : 'text-slate-800'
                        }`}
                      >
                        {feat.title}
                      </h3>
                    </div>

                    <span
                      className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Expandable Paragraph for Active Item */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isActive ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-1 border-t border-slate-800/80">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};
