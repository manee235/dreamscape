import React from 'react';
import { ArrowRight, LayoutGrid, Sparkles } from 'lucide-react';

interface HeroOverlayProps {
  scrollProgress: number;
  onScheduleClick?: () => void;
  onExploreClick?: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  scrollProgress,
  onScheduleClick,
  onExploreClick,
}) => {
  // First image: clean video canvas with simple "Scroll down..." cue.
  // As user scrubs towards the last image (progress from 0.40 to 0.95), hero titles appear gracefully!
  const opacity = Math.max(0, Math.min(1, (scrollProgress - 0.40) * 2.0));
  const translateY = (1 - opacity) * 30;

  // Minimal initial "Scroll down..." prompt in pure white color (visible at start, progress < 0.25)
  const promptOpacity = Math.max(0, 1 - scrollProgress * 5);

  return (
    <>
      {/* Clean "Scroll down..." Prompt in White Color */}
      {promptOpacity > 0.01 && (
        <div
          className="fixed bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-30 flex flex-col items-center space-y-2 transition-opacity duration-300"
          style={{ opacity: promptOpacity }}
        >
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Scroll down...
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-white flex items-start justify-center p-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            <div className="w-1.5 h-2.5 bg-white rounded-full animate-bounce mt-1" />
          </div>
        </div>
      )}

      {/* Hero Overlay - Ultra Clean, Minimalist Luxury Architecture UI (Pro Max UI/UX) */}
      {opacity > 0.01 && (
        <div
          className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-center items-center text-center px-4 transition-all duration-200 ease-out"
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
          }}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 pointer-events-auto">
            
            {/* Elegant Small Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 shadow-xl">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase">
                DREAMS INTO REALITY THROUGH THOUGHTFUL DESIGN
              </span>
            </div>

            {/* Main Hero Headline - Ultra Crisp White */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)] leading-none font-sans">
              Designed for You.
            </h1>

            {/* Concise 1-Line Tagline */}
            <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-xl mx-auto font-medium drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Bespoke glass pavilion sanctuaries & luxury estates in Kurunegala, Sri Lanka.
            </p>

            {/* Clean Pill Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={onScheduleClick}
                className="px-7 py-3.5 rounded-full bg-slate-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-2xl border border-white/20 flex items-center space-x-2"
              >
                <span>Schedule a Visit</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-full bg-white/90 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center space-x-2"
              >
                <LayoutGrid className="w-4 h-4 text-slate-950" />
                <span>View Gallery</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
