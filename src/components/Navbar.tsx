import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onScheduleClick: () => void;
  onContactClick: () => void;
  onNavClick: (section: string) => void;
  activeSection?: string;
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScheduleClick,
  onContactClick,
  onNavClick,
  activeSection = 'home',
  scrollProgress,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navbar reveals as user scrolls toward final frames (from 40% scroll progress up to 90%)
  const navOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.40) * 2.0));
  const navTranslateY = (1 - navOpacity) * -20;

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Features', id: 'features' },
    { name: 'Designs', id: 'designs' },
    { name: 'Contact Us', id: 'contact' },
    { name: 'Client Portal', id: 'portal' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'contact') {
      onContactClick();
    } else {
      onNavClick(id);
    }
  };

  return (
    <header
      className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 transition-all duration-300 pointer-events-none"
      style={{
        opacity: navOpacity,
        transform: `translateY(${navTranslateY}px)`,
        pointerEvents: navOpacity > 0.05 ? 'auto' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo (Clean, no circular background border) */}
        <div
          className="flex items-center cursor-pointer select-none group py-1"
          onClick={() => onNavClick('home')}
        >
          <img
            src="/Assets/logo.png"
            alt="Dreamscape Designs Logo"
            className="h-9 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-md"
          />
        </div>

        {/* Center: Floating Dark Pill Nav */}
        <nav className="hidden md:inline-flex items-center p-1.5 rounded-full bg-slate-950/95 backdrop-blur-xl border border-white/10 shadow-2xl space-x-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-slate-950 shadow-md scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right: Dark Pill CTA Button with Green Dot */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onScheduleClick}
            className="inline-flex items-center space-x-2.5 px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-xl border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm" />
            <span>Schedule A Visit</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={onScheduleClick}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-950 text-white text-xs font-semibold shadow-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Visit</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-950 bg-white/90 backdrop-blur-md rounded-full shadow-md border border-gray-200 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto rounded-3xl bg-slate-950 text-white p-5 shadow-2xl border border-white/10 animate-fade-in space-y-3 pointer-events-auto">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeSection === link.id
                    ? 'bg-white text-slate-950 font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
