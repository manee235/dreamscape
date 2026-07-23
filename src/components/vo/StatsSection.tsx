import React, { useEffect, useState, useRef } from 'react';

interface StatItemProps {
  end: number;
  suffix?: string;
  label: string;
  inView: boolean;
}

const StatCounter: React.FC<StatItemProps> = ({ end, suffix = '', label, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = Math.floor(easedProgress * end);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [inView, end]);

  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 font-poppins">
        {count}
        {suffix}
      </div>
      <div className="text-xs sm:text-sm font-medium text-slate-500 tracking-wide font-poppins">
        {label}
      </div>
    </div>
  );
};

export const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-16 px-6 sm:px-10 lg:px-16 font-poppins">
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto bg-white rounded-[40px] border border-slate-200/80 p-8 sm:p-14 lg:p-20 shadow-2xl transition-all duration-700 hover:shadow-3xl"
        style={{
          boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.05), 0 0 1px 1px rgba(0,0,0,0.03)',
        }}
      >
        {/* Header Tag + Headline */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-widest text-emerald-600 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>By the numbers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
            Proof in the work, not the words.
          </h2>
        </div>

        {/* 4 Animated Numbers Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 pt-4 border-t border-slate-100">
          <StatCounter end={50} suffix="+" label="Projects & designs" inView={inView} />
          <StatCounter end={100} suffix="+" label="Happy clients & families" inView={inView} />
          <StatCounter end={5} suffix="+" label="Years of craft" inView={inView} />
          <StatCounter end={99} suffix="%" label="Client satisfaction" inView={inView} />
        </div>
      </div>
    </section>
  );
};
