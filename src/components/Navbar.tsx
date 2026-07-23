import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onScheduleClick?: () => void;
  onContactClick?: () => void;
  onNavClick: (section: string) => void;
  activeSection?: string;
  scrollProgress?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScheduleClick,
  onContactClick,
  onNavClick,
  activeSection = 'home',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Selected Work', id: 'work' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'contact') {
      if (onContactClick) onContactClick();
    } else {
      onNavClick(id);
    }
  };

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 pointer-events-auto transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-full bg-slate-950/85 backdrop-blur-xl border border-white/15 shadow-2xl">
        
        {/* Left: Dreamscape Designs Logo + Brand Name */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          onClick={() => handleLinkClick('home')}
        >
          <img
            src="/Assets/logo.png"
            alt="Dreamscape Designs Logo"
            className="h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-base font-extrabold tracking-wider text-white uppercase font-sans">
            DREAMSCAPE
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-950 font-bold shadow-md scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right: Start a Chat / Get a Quote CTA Button */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={onContactClick || onScheduleClick}
            className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-white text-slate-950 hover:bg-emerald-400 font-bold text-xs uppercase tracking-wider transition-all shadow-md group cursor-pointer active:scale-95"
          >
            <span>Start a chat</span>
            <div className="w-5 h-5 rounded-full bg-slate-900 group-hover:bg-slate-950 text-white flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={onContactClick || onScheduleClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-white"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Chat
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white bg-white/10 rounded-full focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto rounded-3xl bg-slate-950 text-white p-5 shadow-2xl border border-white/15 animate-fade-in space-y-3 pointer-events-auto">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeSection === link.id
                    ? 'bg-white text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
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
