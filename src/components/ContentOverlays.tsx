import React from 'react';
import { Compass, Eye, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ContentOverlaysProps {
  scrollProgress: number;
  onExploreClick: () => void;
  onScheduleClick: () => void;
}

export const ContentOverlays: React.FC<ContentOverlaysProps> = ({
  scrollProgress,
  onExploreClick,
  onScheduleClick,
}) => {

  // Chapter 1 visibility (Progress ~ 0.15 to 0.40)
  const c1Opacity = Math.max(0, Math.min(1, (scrollProgress - 0.12) * 6)) * Math.max(0, Math.min(1, (0.42 - scrollProgress) * 6));
  
  // Chapter 2 visibility (Progress ~ 0.42 to 0.68)
  const c2Opacity = Math.max(0, Math.min(1, (scrollProgress - 0.40) * 6)) * Math.max(0, Math.min(1, (0.68 - scrollProgress) * 6));

  // Final Action CTAs at bottom (Progress ~ 0.70 to 1.0)
  const c3Opacity = Math.max(0, Math.min(1, (scrollProgress - 0.68) * 3));

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      
      {/* Chapter 1: Architectural Vision (Left Floating Glass Box) */}
      {c1Opacity > 0.01 && (
        <div
          className="absolute left-6 sm:left-16 bottom-16 sm:bottom-24 max-w-md p-6 sm:p-8 rounded-3xl bg-black/50 backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-300 pointer-events-auto"
          style={{ opacity: c1Opacity, transform: `translateY(${(0.28 - scrollProgress) * 40}px)` }}
        >
          <div className="flex items-center space-x-2 text-amber-300 mb-3">
            <Compass className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-widest uppercase">01 / Master Planning</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
            Harmonizing Nature & Modern Living
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            Every contour of our glass-pavilion designs is crafted to blend seamlessly into lush hillside landscapes, maximizing natural illumination and panoramic exterior views.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs text-gray-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Panoramic Glass</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Passive Solar</span>
            </div>
          </div>
        </div>
      )}

      {/* Chapter 2: Structural Elegance (Right Floating Card) */}
      {c2Opacity > 0.01 && (
        <div
          className="absolute right-6 sm:right-16 top-1/3 max-w-md p-6 sm:p-8 rounded-3xl bg-black/50 backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-300 pointer-events-auto"
          style={{ opacity: c2Opacity, transform: `translateY(${(0.55 - scrollProgress) * 40}px)` }}
        >
          <div className="flex items-center space-x-2 text-sky-400 mb-3">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-widest uppercase">02 / Engineering</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
            Cantilevered Infinity Structures
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            Pioneering architectural engineering with floating floorplates, warm timber ceilings, and frameless double-glazed thermal walls engineered for Sri Lanka's tropical climate.
          </p>
          <button
            onClick={onExploreClick}
            className="w-full py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2 border border-white/20"
          >
            <span>Explore Engineering Specs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom CTA bar at final image (Progress > 0.70) */}
      {c3Opacity > 0.01 && (
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex flex-col sm:flex-row items-center gap-4 transition-all duration-300"
          style={{ opacity: c3Opacity }}
        >
          <button
            onClick={onScheduleClick}
            className="px-8 py-4 rounded-full bg-white text-gray-950 font-bold text-sm hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 flex items-center space-x-2"
          >
            <span>Schedule A Visit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onExploreClick}
            className="px-8 py-4 rounded-full bg-black/60 backdrop-blur-md hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>View Designs Gallery</span>
          </button>
        </div>
      )}

    </div>
  );
};
