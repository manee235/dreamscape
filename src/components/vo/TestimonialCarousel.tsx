import React, { useEffect, useRef, useState } from 'react';
import { ReviewModal } from '../ReviewModal';
import { supabase } from '../../lib/supabase';

interface SupabaseTestimonialRow {
  id: string;
  testimonial_name: string;
  description: string;
  profile_picture: string;
  rating?: number;
  created_at?: string;
}

interface Testimonial {
  id: string | number;
  quote: string;
  author: string;
  role: string;
  date: string;
  avatar: string;
}

export const TestimonialCarousel: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch live testimonials directly from Supabase dreamscape_testimonials table
  useEffect(() => {
    const fetchSupabaseTestimonials = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('dreamscape_testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase fetch error:', error);
          setIsLoading(false);
          return;
        }

        if (data && data.length > 0) {
          const mapped: Testimonial[] = (data as SupabaseTestimonialRow[]).map((item) => {
            const dateObj = new Date(item.created_at || Date.now());
            const formattedDate = `${dateObj.toLocaleString('default', { month: 'short' }).toUpperCase()} ${dateObj.getFullYear()}`;
            return {
              id: item.id,
              quote: item.description,
              author: item.testimonial_name,
              role: 'CLIENT',
              date: formattedDate,
              avatar: item.profile_picture || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1',
            };
          });
          setTestimonials(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch testimonials from Supabase:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupabaseTestimonials();
  }, []);

  const handleAddReview = (newReview: {
    quote: string;
    author: string;
    role: string;
    date: string;
    avatar: string;
  }) => {
    const created: Testimonial = {
      id: Date.now(),
      ...newReview,
    };
    setTestimonials((prev) => [created, ...prev]);
    setActiveIndex(0);
  };

  // Moving particles canvas effect in background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2.5 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="relative w-full py-28 px-6 bg-white text-slate-900 overflow-hidden font-poppins flex flex-col items-center justify-center">
      
      {/* Background Animated Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {isLoading ? (
          <div className="py-16 text-xs font-mono text-slate-400 animate-pulse">
            Loading client testimonials from Supabase database...
          </div>
        ) : activeTestimonial ? (
          <>
            {/* Quote Marks & Headline Quote */}
            <div className="relative my-6 px-8 sm:px-16">
              <span className="absolute left-0 top-0 text-4xl sm:text-6xl font-serif text-slate-300 font-extrabold select-none">
                “
              </span>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.25] transition-all duration-500">
                {activeTestimonial.quote}
              </h2>

              <span className="absolute right-0 bottom-0 text-4xl sm:text-6xl font-serif text-slate-300 font-extrabold select-none">
                ”
              </span>
            </div>

            {/* Date & Role Tag */}
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase mt-4 mb-8">
              {activeTestimonial.role} • {activeTestimonial.date}
            </span>
          </>
        ) : (
          <div className="py-12 text-sm text-slate-500 font-medium">
            No testimonials in Supabase yet. Be the first to leave a review!
          </div>
        )}

        {/* Dynamic Capsule Avatar Row (Exact match to reference screenshot) */}
        {testimonials.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10 min-h-[64px]">
            {testimonials.map((item, idx) => {
              const isActive = idx === activeIndex;
              if (isActive) {
                return (
                  /* Expanded Active Capsule with Profile Ring + Bold Name */
                  <div
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className="flex items-center space-x-3.5 px-4 py-2 rounded-full bg-slate-950 text-white shadow-2xl transition-all duration-300 transform scale-105 cursor-pointer border border-slate-800"
                  >
                    <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 flex items-center justify-center shrink-0">
                      <img
                        src={item.avatar}
                        alt={item.author}
                        className="w-full h-full rounded-full object-cover border border-white"
                      />
                    </div>
                    <span className="text-sm sm:text-base font-bold font-poppins text-white pr-2">
                      {item.author}
                    </span>
                  </div>
                );
              }

              return (
                /* Unselected Inactive Circular Profile Avatar */
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className="w-11 h-11 rounded-full overflow-hidden border-2 border-slate-200 hover:border-emerald-500 opacity-75 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer shadow-sm"
                  title={item.author}
                >
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Leave a Review Button */}
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
        >
          Leave a Review
        </button>

      </div>

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onAddReview={handleAddReview}
      />
    </section>
  );
};
