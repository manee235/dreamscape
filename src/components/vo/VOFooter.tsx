import React from 'react';
import { ArrowUpRight, MapPin, Phone, MessageSquare, Compass } from 'lucide-react';

interface VOFooterProps {
  onContactClick?: () => void;
}

export const VOFooter: React.FC<VOFooterProps> = ({ onContactClick }) => {
  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'About Us', href: '#about' },
  ];

  const socialLinks = [
    { label: 'WhatsApp (077 996 2051)', href: 'https://wa.me/94779962051', external: true },
    { label: 'Direct Call (077 996 2051)', href: 'tel:0779962051', external: true },
  ];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-slate-950 text-white pt-20 pb-12 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-12">
        
        {/* Left Column: Visible Logo + Brand Info & Badges */}
        <div className="flex flex-col items-start gap-6 max-w-md">
          
          {/* Logo Container with High Contrast Visibility */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-slate-200">
              <img
                src="/Assets/logo.png"
                alt="Dreamscape Designs Logo"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div>
              <span
                className="text-2xl font-bold tracking-tight text-white block"
                style={{ fontFamily: "'PP Mondwest', Georgia, serif" }}
              >
                Dreamscape Designs
              </span>
              <span className="text-xs text-emerald-400 font-mono font-medium tracking-wider uppercase">
                House Planning & 3D Design
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            Crafting modern house plans, 3D elevation renderings, interior layouts, and structural engineering solutions tailored for living spaces across Sri Lanka.
          </p>

          {/* Location & WhatsApp Badges */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Kurunegala, Sri Lanka</span>
            </div>

            <a
              href="https://wa.me/94779962051"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 px-4 py-2.5 rounded-xl transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp: 077 996 2051</span>
            </a>
          </div>

          {/* Action Button */}
          <button
            onClick={onContactClick}
            className="mt-2 px-7 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center space-x-2 cursor-pointer active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>Start a Project</span>
          </button>
        </div>

        {/* Right Column: Navigation & Connect Links */}
        <div className="flex flex-wrap items-start gap-16">
          <ArrowUpRight className="w-7 h-7 text-emerald-400 shrink-0 hidden sm:block" />

          {/* Column 1: Navigation */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold mb-1">
              NAVIGATION
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm text-slate-300 hover:text-emerald-400 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 2: Connect */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold mb-1">
              CONNECT WITH US
            </span>
            <a
              href="tel:0779962051"
              className="text-sm text-emerald-400 font-bold hover:underline flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>077 996 2051</span>
            </a>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-sm text-slate-300 hover:text-emerald-400 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Copyright Strip */}
      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <span>© {new Date().getFullYear()} Dreamscape Designs Ltd. All Rights Reserved.</span>
        <span>Kurunegala, Sri Lanka · Tel / WhatsApp: <a href="https://wa.me/94779962051" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-semibold hover:underline">077 996 2051</a></span>
      </div>
    </footer>
  );
};
