import React from 'react';
import { ArrowUpRight, MapPin, Phone, MessageSquare, Compass, Globe, Share2 } from 'lucide-react';

interface VOFooterProps {
  onContactClick?: () => void;
}

export const VOFooter: React.FC<VOFooterProps> = ({ onContactClick }) => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#050B14] text-white pt-20 pb-10 px-6 sm:px-10 lg:px-16 border-t border-slate-800/80 font-poppins">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
        
        {/* Left Column: Logo Squircle Box + Info & CTAs */}
        <div className="flex flex-col items-start gap-6 max-w-md">
          
          {/* Logo Header */}
          <div className="flex items-center gap-3">
            {/* Squircle White Box with Logo SVG */}
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xl p-2 shrink-0">
              <img
                src="/Assets/logo.svg"
                alt="Dreamscape Designs Logo"
                className="w-full h-full object-contain filter invert drop-shadow-sm"
              />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-white block leading-none font-sans">
                Dreamscape Designs
              </span>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-emerald-400 mt-1 block">
                HOUSE PLANNING & 3D DESIGN
              </span>
            </div>
          </div>

          {/* Description Paragraph */}
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
            Crafting modern house plans, 3D elevation renderings, interior layouts, and structural engineering solutions tailored for living spaces across Sri Lanka.
          </p>

          {/* Quick Badges Row */}
          <div className="flex flex-wrap gap-2.5 w-full text-xs">
            <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Kurunegala, Sri Lanka</span>
            </div>

            <a
              href="https://wa.me/94779962051"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 hover:text-white font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>WhatsApp: 077 996 2051</span>
            </a>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center space-x-3 pt-1">
            <a
              href="https://wa.me/94779962051"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 border border-slate-800 text-slate-300 flex items-center justify-center transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href="tel:0779962051"
              aria-label="Phone Call"
              className="w-9 h-9 rounded-full bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 border border-slate-800 text-slate-300 flex items-center justify-center transition-all shadow-md"
            >
              <Phone className="w-4 h-4" />
            </a>
            <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
          </div>

          {/* START A PROJECT CTA Button */}
          <button
            onClick={onContactClick}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl cursor-pointer active:scale-95 mt-2"
          >
            <Compass className="w-4 h-4" />
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Navigation Columns */}
        <div className="flex flex-wrap items-start gap-12 lg:gap-16 pt-2">
          
          {/* Services Column */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 mb-1">
              SERVICES
            </span>
            <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')} className="text-xs text-slate-300 hover:text-emerald-400 transition-colors font-medium">
              House Planning & Layouts
            </a>
            <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')} className="text-xs text-slate-300 hover:text-emerald-400 transition-colors font-medium">
              3D Elevation Renderings
            </a>
            <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')} className="text-xs text-slate-300 hover:text-emerald-400 transition-colors font-medium">
              Interior & Exterior Design
            </a>
            <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')} className="text-xs text-slate-300 hover:text-emerald-400 transition-colors font-medium">
              Structural Consulting
            </a>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 mb-1">
              COMPANY
            </span>
            <a href="#about" onClick={(e) => handleAnchorClick(e, '#about')} className="text-xs text-slate-300 hover:text-emerald-400 transition-colors font-medium">
              About Us
            </a>
            <a href="#work" onClick={(e) => handleAnchorClick(e, '#work')} className="text-xs text-slate-300 hover:text-emerald-400 transition-colors font-medium">
              Selected Work
            </a>
            <button onClick={onContactClick} className="text-left text-xs text-slate-300 hover:text-emerald-400 transition-colors font-medium">
              Contact Us
            </button>
          </div>

          {/* Connect Column */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 mb-1">
              CONNECT WITH US
            </span>
            <a href="tel:0779962051" className="text-xs text-emerald-400 font-bold hover:underline flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>077 996 2051</span>
            </a>
            <a href="https://wa.me/94779962051" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-300 hover:text-emerald-400 transition-colors font-medium">
              WhatsApp (077 996 2051)
            </a>
            <a href="tel:0779962051" className="text-xs text-slate-300 hover:text-emerald-400 transition-colors font-medium">
              Direct Call (077 996 2051)
            </a>
          </div>

        </div>

      </div>

      {/* Bottom Inset Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <span>© {new Date().getFullYear()} Dreamscape Designs Ltd. All Rights Reserved.</span>
        <div className="flex items-center space-x-4">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="text-emerald-400 font-medium">Kurunegala, Sri Lanka</span>
        </div>
      </div>
    </footer>
  );
};
