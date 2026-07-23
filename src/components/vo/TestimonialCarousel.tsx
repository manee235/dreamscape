import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      'Dreamscape Designs transformed our rough floor plan sketch into an extraordinary 3D elevation. Maneesh Amindu provided invaluable advice on natural ventilation and spatial layout.',
    author: 'Marcus Anderson',
    role: 'Homeowner, Kurunegala',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1',
  },
  {
    id: 2,
    quote:
      'Maneesh completed our two-storey house plans ahead of schedule. The council approval drawings passed without a single alteration required!',
    author: 'Alex Perera',
    role: 'Property Owner, Kandy',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1',
  },
  {
    id: 3,
    quote:
      'Working with Dreamscape Designs was seamless. Their 3D walkthrough renderings gave us complete confidence before breaking ground on our villa project.',
    author: 'James Mitchell',
    role: 'Developer, Southern Coast',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1',
  },
  {
    id: 4,
    quote:
      'The architectural aesthetics and interior planning exceeded our expectations. Clean, modern, and perfectly suited to our land topology.',
    author: 'Rachel Foster',
    role: 'Residential Client, Colombo',
    avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1',
  },
  {
    id: 5,
    quote:
      'Outstanding consultation service. Maneesh saved us significantly on structural costs while preserving the open-concept design we envisioned.',
    author: 'David Zhang',
    role: 'Homeowner, Galle',
    avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1',
  },
];

// Triple for infinite scroll
const ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
const CARD_WIDTH_DESKTOP = 427.5;
const CARD_GAP = 24;

export const TestimonialCarousel: React.FC = () => {
  const { ref: headerRef, inView: headerInView } = useInViewAnimation(0.1);
  const [current, setCurrent] = useState(TESTIMONIALS.length); // start at middle copy
  const [transitioning, setTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setTransitioning(true);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo(current - 1);
  }, [current, goTo]);

  // Auto scroll
  useEffect(() => {
    if (isHovered) return;
    intervalRef.current = setInterval(() => next(), 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovered, next]);

  // Handle infinite loop: when transition ends, snap without animation
  useEffect(() => {
    const len = TESTIMONIALS.length;
    if (current < len) {
      setTimeout(() => {
        setTransitioning(false);
        setCurrent(current + len);
      }, 820);
    } else if (current >= len * 2) {
      setTimeout(() => {
        setTransitioning(false);
        setCurrent(current - len);
      }, 820);
    }
  }, [current]);

  // Re-enable transition after snap
  useEffect(() => {
    if (!transitioning) {
      const t = setTimeout(() => setTransitioning(true), 50);
      return () => clearTimeout(t);
    }
  }, [transitioning]);

  return (
    <section className="w-full py-20 overflow-hidden">
      {/* Header row */}
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className="px-6 md:max-w-4xl md:ml-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12"
      >
        <h2
          className={`text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight ${headerInView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          What{' '}
          <span style={{ fontFamily: "'PP Mondwest', Georgia, serif" }}>builders</span>{' '}
          say
        </h2>

        <div
          className={`flex items-center gap-3 ${headerInView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-black text-black" />
            ))}
          </div>
          <span className="text-sm font-medium text-[#051A24]">Clutch 5/5</span>
        </div>
      </div>

      {/* Carousel + controls */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Prev / Next buttons */}
        <div className="absolute right-6 -top-16 flex gap-3 z-10">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center transition-shadow hover:shadow-md"
            style={{ border: '1px solid rgba(13,33,44,0.2)' }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-[#0D212C]" />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center transition-shadow hover:shadow-md"
            style={{ border: '1px solid rgba(13,33,44,0.2)' }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-[#0D212C]" />
          </button>
        </div>

        {/* Track */}
        <div ref={containerRef} className="overflow-visible pl-6">
          <div
            className="flex"
            style={{
              gap: CARD_GAP,
              transform: `translateX(calc(-${current} * (${CARD_WIDTH_DESKTOP}px + ${CARD_GAP}px)))`,
              transition: transitioning
                ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none',
            }}
          >
            {ITEMS.map((t, i) => {
              const isActive = i === current;
              return (
                <div
                  key={`${t.id}-${i}`}
                  className="shrink-0 bg-white rounded-[32px] md:rounded-[40px] px-6 md:pl-10 md:pr-24 py-8 flex flex-col gap-6"
                  style={{
                    width: `min(${CARD_WIDTH_DESKTOP}px, calc(100vw - 48px))`,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    opacity: isActive ? 1 : 0.8,
                    transform: isActive ? 'scale(1)' : 'scale(0.98)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                  }}
                >
                  {/* SVG quote mark */}
                  <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
                    <path
                      d="M0 28V17.6C0 11.627 2.32267 6.81733 6.968 3.188 11.6133 -0.440667 17.4507 -1.064 24.48 1.316L22.4 6.664C19.168 5.72933 16.3093 5.65333 13.824 6.44533C11.3387 7.16267 9.408 8.744 8.032 11.188H14.4V28H0ZM17.6 28V17.6C17.6 11.627 19.9227 6.81733 24.568 3.188C29.2133 -0.440667 35.0507 -1.064 42.08 1.316L40 6.664C36.768 5.72933 33.9093 5.65333 31.424 6.44533C28.9387 7.16267 27.008 8.744 25.632 11.188H32V28H17.6Z"
                      fill="#0D212C"
                      fillOpacity="0.12"
                    />
                  </svg>

                  {/* Quote text */}
                  <p className="text-base text-[#0D212C] leading-relaxed">{t.quote}</p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm text-[#0D212C]">{t.author}</p>
                      <p className="text-xs text-[#273C46]">→ {t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
