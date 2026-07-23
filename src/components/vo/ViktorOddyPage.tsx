import React from 'react';
import { TestimonialSection } from './TestimonialSection';
import { SyncServicesSection } from '../SyncServicesSection';
import { TestimonialCarousel } from './TestimonialCarousel';
import { ProjectsSection } from './ProjectsSection';
import { PartnerSection } from './PartnerSection';
import { VOFooter } from './VOFooter';

/* ─────────────────────────────────────────────────────────── */
/* MARQUEE IMAGES                                              */
/* ─────────────────────────────────────────────────────────── */
const MARQUEE_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
];

const MarqueeStrip: React.FC = () => {
  const doubled = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <div className="w-full overflow-hidden mt-16 md:mt-20 mb-16">
      <div className="flex vo-marquee">
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Project preview ${(i % MARQUEE_IMAGES.length) + 1}`}
            className="h-[280px] md:h-[500px] object-cover mx-3 rounded-2xl shadow-lg shrink-0"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────── */
/* MAIN DREAMSCAPE DESIGNS LANDING PAGE                         */
/* ─────────────────────────────────────────────────────────── */
export const ViktorOddyPage: React.FC = () => {
  return (
    <div
      className="relative bg-white text-[#051A24]"
      style={{
        fontFamily: "'Poppins', 'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      {/* 1. INFINITE MARQUEE */}
      <MarqueeStrip />

      {/* 2. ABOUT US SECTION */}
      <section id="about">
        <TestimonialSection />
      </section>

      {/* 3. SYNCED SCROLL SERVICES SECTION */}
      <SyncServicesSection />

      {/* 4. TESTIMONIAL CAROUSEL */}
      <TestimonialCarousel />

      {/* 5. SELECTED PROJECTS */}
      <section id="work">
        <ProjectsSection />
      </section>

      {/* 6. PARTNER CTA */}
      <PartnerSection />

      {/* 7. FOOTER */}
      <VOFooter />
    </div>
  );
};
