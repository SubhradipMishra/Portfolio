'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AmbientBackground from './AmbientBackground';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text roughly by lines/words for staggered fade + upward translate
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-line',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, delay: 0.2 }
      ).fromTo(
        subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.8'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-background"
    >
      <AmbientBackground />
      
      {/* Decorative Crosshairs & Borders */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 border-t border-l border-structure-grey opacity-50"></div>
      <div className="absolute top-1/4 right-1/4 w-4 h-4 border-t border-r border-structure-grey opacity-50"></div>
      <div className="absolute bottom-1/4 left-1/4 w-4 h-4 border-b border-l border-structure-grey opacity-50"></div>
      <div className="absolute bottom-1/4 right-1/4 w-4 h-4 border-b border-r border-structure-grey opacity-50"></div>
      
      <div className="relative z-10 w-full flex flex-col items-center mt-[-5vh]">
        <h1 
          ref={textRef}
          className="font-display font-bold text-[15vw] md:text-[12vw] leading-[0.8] tracking-tighter uppercase mb-10 mix-blend-difference text-transparent bg-clip-text bg-gradient-to-b from-white via-off-white to-muted-grey filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <div className="hero-line overflow-hidden pb-4">
            <span className="block translate-y-[50px]">I design</span>
          </div>
          <div className="hero-line overflow-hidden pb-4 flex items-center justify-center gap-4">
            <span className="block h-[2px] w-[10vw] bg-structure-grey translate-y-[50px]"></span>
            <span className="block text-structure-grey translate-y-[50px]">systems,</span>
            <span className="block h-[2px] w-[10vw] bg-structure-grey translate-y-[50px]"></span>
          </div>
          <div className="hero-line overflow-hidden pb-4">
            <span className="block translate-y-[50px]">not just screens.</span>
          </div>
        </h1>
        
        <div className="hero-line border border-structure-grey bg-void/80 backdrop-blur-md p-4 flex flex-col md:flex-row items-center gap-6">
          <span className="font-mono text-muted text-xs tracking-widest uppercase flex items-center gap-2">
            <div className="w-2 h-2 bg-white animate-pulse"></div>
            Status: Online
          </span>
          <div className="hidden md:block w-px h-4 bg-structure-grey"></div>
          <p 
            ref={subRef}
            className="font-mono text-off-white text-sm md:text-base uppercase tracking-widest"
          >
            Subhradip Mishra <span className="text-muted-grey mx-2">/</span> Full-Stack <span className="text-muted-grey mx-2">/</span> DevOps
          </p>
        </div>
      </div>
      
      {/* Scroll Cue */}
      <div className="absolute bottom-12 font-mono text-[10px] tracking-widest text-muted uppercase flex flex-col items-center gap-4">
        <div className="w-px h-24 bg-structure-grey relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/4 bg-white animate-[bounce_2s_infinite]"></div>
        </div>
        <span className="bg-background px-2">Scroll Sequence</span>
      </div>
    </section>
  );
}
