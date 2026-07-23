import React, { useCallback, useEffect, useRef } from 'react';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

const MARQUEE_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
];

interface FloatingGif {
  id: number;
  x: number;
  y: number;
  rotation: number;
  src: string;
  opacity: number;
  scale: number;
}

let gifIdCounter = 0;

export const PartnerSection: React.FC = () => {
  const { ref: sectionRef, inView } = useInViewAnimation(0.1);
  const containerRef = useRef<HTMLDivElement>(null);
  const gifsRef = useRef<FloatingGif[]>([]);
  const domGifsRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const lastSpawnRef = useRef<number>(0);
  const animRef = useRef<number>(0);
  const imageIndexRef = useRef(0);

  const spawnGif = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastSpawnRef.current < 80) return;
    lastSpawnRef.current = now;

    const rotation = (Math.random() - 0.5) * 20; // -10 to +10
    const src = MARQUEE_IMAGES[imageIndexRef.current % MARQUEE_IMAGES.length];
    imageIndexRef.current++;

    const gif: FloatingGif = {
      id: gifIdCounter++,
      x,
      y,
      rotation,
      src,
      opacity: 1,
      scale: 1,
    };

    gifsRef.current.push(gif);

    // Create DOM element directly
    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      width: 180px;
      height: 120px;
      border-radius: 12px;
      overflow: hidden;
      pointer-events: none;
      z-index: 10;
      left: ${x - 90}px;
      top: ${y - 60}px;
      transform: rotate(${rotation}deg) scale(1);
      opacity: 1;
      transition: opacity 1000ms ease, transform 1000ms ease;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    `;
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
    el.appendChild(img);

    if (containerRef.current) {
      containerRef.current.appendChild(el);
      domGifsRef.current.set(gif.id, el);
    }

    // Fade out after 100ms
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = `rotate(${rotation}deg) scale(0.9)`;
    }, 100);

    // Remove after 1100ms
    setTimeout(() => {
      el.remove();
      domGifsRef.current.delete(gif.id);
      gifsRef.current = gifsRef.current.filter((g) => g.id !== gif.id);
    }, 1100);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnGif(x, y);
    },
    [spawnGif]
  );

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section className="w-full py-12 px-6">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative max-w-7xl mx-auto py-48 rounded-[40px] overflow-hidden flex flex-col items-center justify-center cursor-crosshair"
        style={{ boxShadow: '0 2px 40px rgba(0,0,0,0.06)', background: 'white' }}
      >
        {/* Background subtle texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, rgba(5,26,36,0.02) 0%, transparent 70%)'
        }} />

        {/* Heading */}
        <div
          ref={sectionRef as React.RefObject<HTMLDivElement>}
          className={`relative z-20 text-center ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <h2
            className="text-[48px] md:text-[64px] lg:text-[80px] text-[#0D212C] mb-12 tracking-tight leading-[1.05]"
            style={{ fontFamily: "'PP Mondwest', Georgia, serif" }}
          >
            Partner with us
          </h2>

          {/* CTA button */}
          <button
            onClick={() => {
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 cursor-pointer"
            style={{
              backgroundColor: '#051A24',
              boxShadow:
                '0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0), inset 0 2px 8px 0 rgba(255,255,255,0.5)',
            }}
          >
            <img
              src="/Assets/logo.png"
              alt="Dreamscape Designs Logo"
              className="w-8 h-8 rounded-full object-contain bg-white p-1"
            />
            Start chat with Maneesh Amindu
          </button>
        </div>
      </div>
    </section>
  );
};
