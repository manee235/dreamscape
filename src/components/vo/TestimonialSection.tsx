import React from 'react';
import { Home, Compass, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import CardSwap, { Card } from '../CardSwap';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

export const TestimonialSection: React.FC = () => {
  const { ref: sectionRef, inView } = useInViewAnimation(0.1);

  const cardsData = [
    {
      title: 'House Planning & Layouts',
      subtitle: 'Custom floor plans & council approval drawings',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      badge: '01 / PLANNING',
      icon: Home,
    },
    {
      title: '3D Elevation & Renderings',
      subtitle: 'Photorealistic 3D interior & exterior visualizations',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      badge: '02 / 3D VISUALS',
      icon: Compass,
    },
    {
      title: 'Interior & Exterior Spatial Design',
      subtitle: 'Cohesive lighting, material palettes & landscapes',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      badge: '03 / INTERIORS',
      icon: Layers,
    },
    {
      title: 'Structural Consulting',
      subtitle: 'BIM engineering, site visits & safety checks',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      badge: '04 / CONSULTING',
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden bg-white text-slate-900 font-poppins"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: About Text & Headlines */}
        <div
          className={`lg:col-span-6 flex flex-col items-start space-y-6 ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.1s' }}
        >
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full inline-block">
            ABOUT DREAMSCAPE DESIGNS
          </span>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
            Architectural innovation, crafted for modern Sri Lankan living.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Welcome to <strong className="text-slate-900 font-semibold">Dreamscape Designs</strong> — dedicated to innovative house planning, 3D architectural design, and structural consulting in Kurunegala, Sri Lanka.
          </p>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            We turn architectural concepts into clean, scalable, and timeless residential spaces tailored for your family needs. Every project gets personal attention from initial sketches through final construction drawings.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('work');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Right Side: Interactive React Bits CardSwap Component */}
        <div
          className={`lg:col-span-6 flex items-center justify-center relative min-h-[460px] ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.3s' }}
        >
          <div className="w-full flex items-center justify-center">
            <CardSwap
              width={380}
              height={320}
              cardDistance={40}
              verticalDistance={45}
              delay={3500}
              pauseOnHover={true}
              skewAmount={5}
            >
              {cardsData.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <Card key={idx} className="overflow-hidden p-0 border-white/20 shadow-2xl">
                    <div className="relative w-full h-full group">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

                      {/* Top Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                          {card.badge}
                        </span>
                      </div>

                      {/* Bottom Info */}
                      <div className="absolute bottom-5 left-5 right-5 z-10 space-y-1">
                        <div className="flex items-center space-x-2 text-white">
                          <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                          <h3 className="text-base font-bold tracking-tight text-white">
                            {card.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-300 font-normal leading-snug">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>

      </div>
    </section>
  );
};
