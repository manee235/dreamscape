import React, { useState } from 'react';
import { MapPin, Phone, Menu, X, ArrowUpRight } from 'lucide-react';

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

  // Navbar appears as user scrolls toward the last image (from 55% scroll progress up to 95%)
  const navOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.55) * 2.5));
  const navTranslateY = (1 - navOpacity) * -25;

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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-black/40 border-b border-white/10"
      style={{
        opacity: navOpacity,
        transform: `translateY(${navTranslateY}px)`,
        pointerEvents: navOpacity > 0.05 ? 'auto' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-white relative py-1 ${
                  activeSection === link.id
                    ? 'text-white font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white after:rounded-full'
                    : 'text-gray-300/90'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Center Logo Image */}
          <div
            className="flex items-center cursor-pointer select-none group py-1"
            onClick={() => onNavClick('home')}
          >
            <img
              src="/Assets/logo.png"
              alt="Dreamscape Designs Logo"
              className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-md"
            />
          </div>

          {/* Right Contact Info & CTA Button */}
          <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-200">
            {/* Location */}
            <div className="flex items-center space-x-2 text-xs font-medium text-gray-300/90 hover:text-white transition-colors cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-white/80" />
              <span>Kurunegala, Sri Lanka</span>
            </div>

            {/* Divider */}
            <span className="w-1 h-1 rounded-full bg-white/20" />

            {/* Phone */}
            <a
              href="tel:+94779962051"
              className="flex items-center space-x-2 text-xs font-medium text-gray-300/90 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-white/80" />
              <span>+94 77 996 2051</span>
            </a>

            {/* Schedule A Visit Button */}
            <button
              onClick={onScheduleClick}
              className="bg-white text-gray-950 font-semibold px-5 py-2.5 rounded-full text-xs hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-white/10 flex items-center space-x-1.5"
            >
              <span>Schedule A Visit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={onScheduleClick}
              className="bg-white text-gray-950 font-semibold px-3 py-1.5 rounded-full text-xs hover:bg-gray-100 transition-all"
            >
              Visit
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden backdrop-blur-xl bg-black/90 border-b border-white/10 animate-fade-in px-6 py-6 space-y-5">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left text-base font-medium text-gray-200 hover:text-white py-1 border-b border-white/5"
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="pt-4 space-y-3 text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-white/70" />
              <span>Kurunegala, Sri Lanka</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-white/70" />
              <a href="tel:+94779962051" className="hover:text-white">+94 77 996 2051</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
