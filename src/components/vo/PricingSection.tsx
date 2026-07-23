import React from 'react';
import { Button } from './Button';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

const PRIMARY_INSET_SHADOW =
  '0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0), inset 0 2px 8px 0 rgba(255,255,255,0.15), inset 0 0 0 1px rgba(255,255,255,0.08)';

export const PricingSection: React.FC = () => {
  const { ref: sectionRef, inView } = useInViewAnimation(0.1);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="w-full py-12 px-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-4xl md:ml-auto">
        {/* Card 1: Complete House Design */}
        <div
          className={`rounded-[40px] pl-10 pr-10 md:pr-24 pt-3 pb-10 flex flex-col gap-6 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{
            backgroundColor: '#051A24',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)',
            animationDelay: '0.1s',
          }}
        >
          {/* Title */}
          <div className="mt-4">
            <h3 className="text-[22px] font-medium" style={{ color: '#F6FCFF' }}>
              Full House Planning & 3D
            </h3>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: '#E0EBF0' }}>
              Architectural floor plans, 3D renderings, & council approval drawings.<br />
              Direct consultation with Maneesh Amindu.
            </p>
          </div>

          {/* Price */}
          <div>
            <span className="text-2xl font-semibold" style={{ color: '#F6FCFF' }}>Custom Package</span>
            <p className="text-xs mt-1" style={{ color: '#E0EBF0', opacity: 0.7 }}>Tailored to land size & budget</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-[#051A24] bg-[#F6FCFF] transition-opacity hover:opacity-90 cursor-pointer"
              style={{ boxShadow: PRIMARY_INSET_SHADOW }}
            >
              Get Free Consultation
            </button>
          </div>
        </div>

        {/* Card 2: Structural & Design Consulting */}
        <div
          className={`rounded-[40px] pl-10 pr-10 md:pr-24 pt-3 pb-10 flex flex-col gap-6 bg-white ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            animationDelay: '0.2s',
          }}
        >
          {/* Title */}
          <div className="mt-4">
            <h3 className="text-[22px] font-medium text-[#051A24]">Design & Structural Consulting</h3>
            <p className="text-sm mt-2 leading-relaxed text-[#051A24]" style={{ opacity: 0.7 }}>
              Site inspection, structural optimization, material advice & layout redesign.
            </p>
          </div>

          {/* Price */}
          <div>
            <span className="text-2xl font-semibold text-[#0D212C]">Flexible Advisory</span>
            <p className="text-xs mt-1 text-[#051A24]" style={{ opacity: 0.5 }}>Per project / Per session</p>
          </div>

          {/* Button */}
          <div>
            <Button variant="tertiary">Book a Call</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
