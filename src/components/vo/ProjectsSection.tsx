import React, { useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useInViewAnimation } from '../../hooks/useInViewAnimation';

interface ProjectCardData {
  id: number;
  title: string;
  category: string;
  image: string;
  avatars: string[];
}

const PROJECTS_DATA: ProjectCardData[] = [
  {
    id: 1,
    title: 'EcoHarvest Business Center',
    category: 'Commercial & Office',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    avatars: [
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1',
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1',
    ],
  },
  {
    id: 2,
    title: 'AquaVista Marina Build',
    category: 'Luxury Coastal Villa',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    avatars: [
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1',
    ],
  },
  {
    id: 3,
    title: 'BioUrban Living Complex',
    category: 'Multi-Family Residence',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    avatars: [
      'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1',
    ],
  },
  {
    id: 4,
    title: 'TechHaven Residences',
    category: 'Smart Modern Home',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
    avatars: [
      'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1',
    ],
  },
  {
    id: 5,
    title: 'Serendib Heights Villa',
    category: 'Hill Country Estate',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
    avatars: [],
  },
];

interface ProjectsSectionProps {
  onStartProject?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onStartProject }) => {
  const { ref: sectionRef, inView } = useInViewAnimation(0.1);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  // Mouse Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="w-full py-20 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto overflow-hidden select-none"
    >
      {/* ── Top Header Section (Exact Match to Reference Image) ── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        
        {/* Left Side: Badge + Floating Avatars Header */}
        <div className="flex flex-col items-start max-w-3xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-semibold tracking-wider uppercase mb-4 ${
              inView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-white shadow-sm inline-block -ml-1">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=120&q=80"
                alt="Project Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
            <span>248+ PROJECTS CLOSED</span>
          </div>

          {/* Large Main Heading with Floating Overlapping Thumbnails */}
          <div
            className={`relative text-[36px] sm:text-[52px] lg:text-[64px] font-bold text-slate-900 leading-[1.08] tracking-tight ${
              inView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            Building visions &<br />
            creating{' '}
            <span className="italic font-serif font-normal text-emerald-600">
              reality
            </span>{' '}
            with Dreamscape
            
            {/* Floating Circular Image Avatar 1 */}
            <div className="hidden sm:inline-block relative -top-3 left-2 w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-xl transform rotate-6 align-middle inline-flex">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80"
                alt="Floating Avatar 1"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Circular Image Avatar 2 */}
            <div className="hidden sm:inline-block relative -top-8 -left-3 w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-xl transform -rotate-12 align-middle inline-flex">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=200&q=80"
                alt="Floating Avatar 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Description & Start Project Buttons */}
        <div
          className={`flex flex-col items-start gap-6 max-w-md ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.3s' }}
        >
          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
            <strong className="text-slate-900 font-semibold">About us.</strong> We are an innovative architectural and house planning studio focused on futuristic design, 3D visualization, and structural sustainability.
          </p>

          {/* Action Buttons: START A PROJECT + Circular Arrow */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('home');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                if (onStartProject) onStartProject();
              }}
              className="px-7 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer active:scale-95"
            >
              START A PROJECT
            </button>

            {/* Circular Next/Prev Arrow */}
            <button
              onClick={scrollNext}
              aria-label="Scroll next"
              className="w-12 h-12 rounded-full border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center transition-all shadow-sm cursor-pointer active:scale-90"
            >
              <ChevronRight className="w-5 h-5 text-slate-800" />
            </button>
          </div>
        </div>

      </div>

      {/* ── Soft Rounded Backdrop Container for Carousel Cards ── */}
      <div
        className={`relative bg-slate-100/80 rounded-[32px] sm:rounded-[44px] p-4 sm:p-6 md:p-8 overflow-hidden shadow-inner ${
          inView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.4s' }}
      >
        {/* Floating DRAG Indicator Pill */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-white/90 backdrop-blur-md shadow-2xl border border-white/60 animate-pulse text-[11px] font-mono font-bold tracking-widest text-slate-800">
          &lt; DRAG &gt;
        </div>

        {/* Scrollable Track */}
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing py-2 pr-12"
        >
          {PROJECTS_DATA.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setSelectedCardId(selectedCardId === project.id ? null : project.id)}
              className={`group relative shrink-0 w-[290px] sm:w-[350px] md:w-[380px] h-[460px] sm:h-[520px] rounded-[28px] overflow-hidden bg-slate-900 shadow-xl transition-all duration-700 ease-out transform ${
                inView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: `${idx * 150}ms`,
              }}
            >
              {/* Card Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Left Badge: LEARN DETAILS */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold tracking-wider text-slate-900 uppercase shadow-md inline-block">
                  LEARN DETAILS
                </span>
              </div>

              {/* Top Right Badge: Circle Arrow Button */}
              <div className="absolute top-4 right-4 z-20">
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md group-hover:bg-white transition-all transform group-hover:rotate-45">
                  <ArrowRight className="w-4 h-4 text-slate-900" />
                </div>
              </div>

              {/* Right Side Vertical Dot Indicators (Matching Image) */}
              <div className="absolute right-4 bottom-20 z-20 flex flex-col items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/50 backdrop-blur-sm" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/50 backdrop-blur-sm" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/50 backdrop-blur-sm" />
                <div className="w-5 h-5 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center mt-1">
                  <X className="w-3 h-3 text-slate-900" />
                </div>
              </div>

              {/* Bottom Title Box Overlay (Exact White Pill Card Style) */}
              <div className="absolute bottom-5 left-5 right-14 z-20">
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/80 transition-all transform group-hover:translate-y-1">
                  <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider block mb-0.5">
                    {project.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
