import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeroOverlayProps {
  scrollProgress: number;
  onScheduleClick?: () => void;
  onContactClick?: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  scrollProgress,
  onScheduleClick,
  onContactClick,
}) => {
  // Reveal hero text content seamlessly as video scrub progresses (from 0.25 to 0.85)
  const opacity = Math.max(0, Math.min(1, (scrollProgress - 0.20) * 2.5));
  const translateY = (1 - opacity) * 20;

  return (
    <>
      {/* ── Main Hero UI Overlay (Exact Match to Reference Screenshot Layout using Poppins Font) ── */}
      {opacity > 0.01 && (
        <div
          className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-end pb-12 sm:pb-20 px-6 sm:px-12 transition-all duration-300 ease-out"
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pointer-events-auto">
            
            {/* Left Column (7 cols): Top Pill Tag + Big Headline */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-4">
              
              {/* Top Pill Tag */}
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium tracking-wide text-slate-100 font-poppins">
                  Welcome to Dreamscape Designs
                </span>
              </div>

              {/* Main Headline (Poppins Font) */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] font-poppins">
                Design your dream home, the right way.
              </h1>
            </div>

            {/* Right Column (5 cols): Description Paragraph + Check Availability / Quote Button */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end space-y-5 text-left lg:text-right">
              
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-md font-poppins">
                We specialize in house planning, 3D elevation renderings, interior design, and structural consulting in Kurunegala, Sri Lanka.
              </p>

              {/* Action Button: White pill with circular arrow icon */}
              <button
                onClick={onContactClick || onScheduleClick}
                className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-white text-slate-950 hover:bg-emerald-400 font-semibold text-xs tracking-wider transition-all shadow-2xl group cursor-pointer active:scale-95 font-poppins"
              >
                <span>Get a Free Quote</span>
                <div className="w-6 h-6 rounded-full bg-amber-600 group-hover:bg-slate-950 text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
