import React from 'react';
import { Button } from './Button';

interface BottomNavProps {
  onContactClick?: () => void;
}

export const CopyrightBar: React.FC = () => (
  <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 border-t border-slate-100">
    <span>© {new Date().getFullYear()} Dreamscape Designs Ltd. All Rights Reserved.</span>
    <span>Kurunegala, Sri Lanka · Tel / WhatsApp: <a href="https://wa.me/94779962051" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-semibold hover:underline">077 996 2051</a></span>
  </div>
);

export const BottomNav: React.FC<BottomNavProps> = ({ onContactClick }) => (
  <div
    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-full bg-white/95 backdrop-blur-md px-5 py-2 border border-slate-200/80"
    style={{
      boxShadow:
        '0 0 0 0.5px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.07), 0 12px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
    }}
  >
    <img
      src="/Assets/logo.png"
      alt="Dreamscape Designs"
      className="h-7 w-auto object-contain"
    />
    <span className="hidden sm:inline text-xs font-semibold text-[#051A24] tracking-tight whitespace-nowrap">
      Dreamscape Designs
    </span>
    <Button
      variant="primary"
      id="vo-bottom-nav-start-chat"
      onClick={onContactClick}
    >
      Start a chat
    </Button>
  </div>
);
