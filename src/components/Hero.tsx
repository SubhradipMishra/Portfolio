'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Download } from 'lucide-react';
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
        
        <div className="hero-line flex flex-col md:flex-row items-center gap-4">
          <div className="border border-structure-grey bg-void/80 backdrop-blur-md px-5 py-3 flex flex-col md:flex-row items-center gap-4 md:gap-6 shadow-2xl">
            <span className="font-mono text-muted text-xs tracking-widest uppercase flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
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

          <a 
            href="/subhradip_resume.pdf"
            download="Subhradip_Mishra_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-mono text-xs uppercase tracking-widest px-6 py-3 border border-white/20 bg-void/90 hover:bg-white hover:text-black text-off-white backdrop-blur-md transition-all duration-300 flex items-center gap-3 overflow-hidden shadow-2xl hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-300 text-cyan-400 group-hover:text-black" />
            <span>RESUME</span>
            <span className="text-[10px] text-muted-grey group-hover:text-black/60 font-mono">[PDF]</span>
          </a>
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
