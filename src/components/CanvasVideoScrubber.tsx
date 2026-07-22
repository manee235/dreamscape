import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { FrameSequenceManager } from '../utils/frameSequence';
import { Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CanvasVideoScrubberProps {
  onProgressUpdate?: (progress: number, frameIndex: number) => void;
  children?: (progress: number) => React.ReactNode;
}

export const CanvasVideoScrubber: React.FC<CanvasVideoScrubberProps> = ({
  onProgressUpdate,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<FrameSequenceManager | null>(null);

  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isInitialReady, setIsInitialReady] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);

  const lastDrawnFrameRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  const totalFrames = 116; // 116 images in /Assets/scene 1/

  // Initialize Frame Manager and Preloader
  useEffect(() => {
    const manager = new FrameSequenceManager({
      folderPath: '/Assets/scene 1',
      filenamePrefix: 'ezgif-frame-',
      filenameSuffix: '.jpg',
      totalFrames,
      padLength: 3,
      initialChunkSize: 15,
    });

    managerRef.current = manager;

    manager.preload((progress) => {
      setLoadingProgress(progress);
      if (progress >= 0.12 && !isInitialReady) {
        setIsInitialReady(true);
      }
    });

    return () => {
      managerRef.current = null;
    };
  }, []);

  // Handle Canvas Resize
  const updateCanvasBounds = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    lastDrawnFrameRef.current = -1;
  }, []);

  // Set up Lenis & GSAP ScrollTrigger with Pinning
  useEffect(() => {
    if (!isInitialReady || !containerRef.current) return;

    updateCanvasBounds();
    window.addEventListener('resize', updateCanvasBounds);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // GSAP ScrollTrigger with PINNING: pins container while scrubbing video sequence
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=350%', // Pin for 3.5 viewport heights of scroll distance
      pin: true,
      pinSpacing: true,
      scrub: 0.15, // Smooth scrubbing
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.floor(progress * (totalFrames - 1));
        
        setScrollProgress(progress);
        setCurrentFrameIndex(index);
        if (onProgressUpdate) {
          onProgressUpdate(progress, index);
        }
      },
    });

    return () => {
      trigger.kill();
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateCanvasBounds);
    };
  }, [isInitialReady, updateCanvasBounds, onProgressUpdate]);

  // RequestAnimationFrame Render Loop
  useEffect(() => {
    const renderLoop = () => {
      const canvas = canvasRef.current;
      const manager = managerRef.current;

      if (canvas && manager) {
        const ctx = canvas.getContext('2d');
        if (ctx && currentFrameIndex !== lastDrawnFrameRef.current) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const virtualCanvas = {
            width: canvas.width / dpr,
            height: canvas.height / dpr,
          } as HTMLCanvasElement;

          manager.render(ctx, virtualCanvas, currentFrameIndex);
          lastDrawnFrameRef.current = currentFrameIndex;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [currentFrameIndex]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Loading Overlay */}
      {!isInitialReady && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950 text-white space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <img
              src="/Assets/logo.png"
              alt="Dreamscape Designs Logo"
              className="h-12 w-auto object-contain mb-2"
            />
          </div>

          <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-white to-sky-400 transition-all duration-200"
              style={{ width: `${Math.round(loadingProgress * 100)}%` }}
            />
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-400 font-mono">
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Preloading cinematic frames... {Math.round(loadingProgress * 100)}%</span>
          </div>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover block"
      />

      {/* Floating Scroll Progress Indicator Badge bottom right */}
      <div className="absolute bottom-6 right-6 z-30 pointer-events-none bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-gray-300 flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>FRAME: {String(currentFrameIndex + 1).padStart(3, '0')} / {totalFrames}</span>
        <span className="text-gray-500">|</span>
        <span>{Math.round(scrollProgress * 100)}%</span>
      </div>

      {/* Children Overlays */}
      {children && children(scrollProgress)}
    </div>
  );
};
