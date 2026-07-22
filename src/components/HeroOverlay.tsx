import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeroOverlayProps {
  scrollProgress: number;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({ scrollProgress }) => {
  // First image: clean video canvas (no text).
  // As user scrubs towards the last image (progress from 0.55 to 0.95), hero titles appear!
  const opacity = Math.max(0, Math.min(1, (scrollProgress - 0.55) * 2.5));
  const translateY = (1 - opacity) * 40;

  // Minimal initial scroll prompt visible only at the very start (progress < 0.25)
  const promptOpacity = Math.max(0, 1 - scrollProgress * 5);

  return (
    <>
      {/* Initial Scroll Cue at Frame 1 */}
      {promptOpacity > 0.01 && (
        <div
          className="fixed bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-30 flex flex-col items-center space-y-2 transition-opacity duration-300"
          style={{ opacity: promptOpacity }}
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/80 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
            Scroll down to scrub timeline
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
            <div className="w-1.5 h-2.5 bg-white rounded-full animate-bounce mt-1" />
          </div>
        </div>
      )}

      {/* Main Hero Overlay - Appears at the last frames */}
      {opacity > 0.01 && (
        <div
          className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-center items-center text-center px-4 transition-all duration-200 ease-out"
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
          }}
        >
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-2xl">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-widest text-gray-200 uppercase">
                Dreamscape Designs Studio
              </span>
            </div>

            {/* Subtitle strictly matched from screenshot */}
            <h2 className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.35em] text-white/95 uppercase mb-4 drop-shadow-md">
              DREAMS INTO REALITY THROUGH THOUGHTFUL DESIGN
            </h2>

            {/* Main Hero Title strictly matched from screenshot */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight drop-shadow-2xl leading-none font-sans">
              Designed for You
            </h1>

          </div>
        </div>
      )}
    </>
  );
};
