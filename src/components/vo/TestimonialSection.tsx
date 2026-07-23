import React from 'react';
import { Compass, Home, Layers, ShieldCheck } from 'lucide-react';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

export const TestimonialSection: React.FC = () => {
  const { ref: sectionRef, inView } = useInViewAnimation(0.1);

  const features = [
    {
      icon: Home,
      title: 'House Planning & Layouts',
      description: 'Custom floor plans, approval drawings, and optimal spatial organization.',
    },
    {
      icon: Compass,
      title: '3D Elevation & Renderings',
      description: 'Photorealistic 3D interior & exterior architectural visualizations.',
    },
    {
      icon: Layers,
      title: 'Interior & Exterior Design',
      description: 'Cohesive material selection, lighting, and modern aesthetic integration.',
    },
    {
      icon: ShieldCheck,
      title: 'Structural & Design Consulting',
      description: 'Expert engineering advice, site visits, and construction guidance.',
    },
  ];

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-20 px-6 mx-auto max-w-4xl flex flex-col items-center text-center bg-white"
    >
      {/* Featured About Statement */}
      <div
        className={`max-w-2xl mb-14 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.1s' }}
      >
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4 inline-block font-semibold">
          About Us
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-[#051A24] leading-relaxed tracking-tight">
          Welcome to <span className="text-emerald-600 font-extrabold">Dreamscape Designs</span> — dedicated to innovative house planning, 3D architectural design, and structural consulting.
        </h2>
        <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed font-normal">
          We turn architectural concepts into clean, scalable, and timeless residential spaces tailored for modern living across Sri Lanka.
        </p>
      </div>

      {/* 4 Feature Badges / Highlights */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-6 w-full text-left ${
          inView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.3s' }}
      >
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all shadow-sm flex flex-col items-start gap-3"
            >
              <div className="p-2.5 rounded-xl bg-white text-[#051A24] shadow-sm border border-slate-100">
                <Icon className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#051A24]">{feat.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feat.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
