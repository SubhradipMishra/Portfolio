'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = textRef.current?.querySelectorAll('.reveal-line');
      
      if (lines) {
        gsap.fromTo(
          lines,
          { y: 60, opacity: 0, skewY: 5, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[80vh] flex items-center justify-center px-6 md:px-12 lg:px-24 border-t border-structure py-32 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
      
      <div className="absolute top-6 left-6 font-mono text-xs text-muted uppercase">
        [01] Identity_Manifesto
      </div>
      
      {/* Decorative large braces */}
      <div className="absolute left-4 md:left-12 lg:left-24 text-[30vh] font-mono text-[#0A0A0A] font-bold pointer-events-none select-none">
        {'{'}
      </div>
      <div className="absolute right-4 md:right-12 lg:right-24 text-[30vh] font-mono text-[#0A0A0A] font-bold pointer-events-none select-none">
        {'}'}
      </div>

      <div className="max-w-4xl relative z-10 text-center" ref={textRef}>
        <div className="text-3xl md:text-5xl lg:text-6xl font-display uppercase leading-[1.1] tracking-tighter text-off-white mix-blend-difference">
          <div className="overflow-hidden pb-4"><span className="reveal-line block transform origin-left">I am a 4th-year CS Engineering student at Chitkara University,</span></div>
          <div className="overflow-hidden pb-4"><span className="reveal-line block text-transparent bg-clip-text bg-gradient-to-r from-structure-grey to-white transform origin-left">a full-stack developer, DevOps engineer, and systems thinker.</span></div>
          <div className="overflow-hidden pb-4"><span className="reveal-line block text-muted-grey font-sans font-light tracking-normal text-xl md:text-3xl mt-6 normal-case transform origin-left">I am drawn to building for scale and architecting robust backends.</span></div>
          <div className="overflow-hidden pb-4"><span className="reveal-line block text-xl md:text-3xl font-sans font-light tracking-normal mt-4 normal-case text-off-white transform origin-left">I build things to help other students grow,</span></div>
          <div className="overflow-hidden pb-4"><span className="reveal-line block text-xl md:text-3xl font-sans font-light tracking-normal normal-case text-off-white transform origin-left">and I thrive when leading projects and teams.</span></div>
        </div>
      </div>
    </section>
  );
}
