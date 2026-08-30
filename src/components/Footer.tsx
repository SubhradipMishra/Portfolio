'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll on the full-screen backdrop portrait
      gsap.fromTo(
        backdropRef.current,
        { scale: 1.15, y: -40, opacity: 0.2 },
        {
          scale: 1,
          y: 30,
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        }
      );

      // Reveal the massive text with letter spacing / scale
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 80, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 90%',
            end: 'bottom 75%',
            scrub: 1,
          }
        }
      );

      // Cards stagger reveal
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen pt-40 border-t border-structure bg-void text-center flex flex-col items-center overflow-hidden select-none"
    >
      {/* 1. FULL-SCREEN SCREEN-BLENDED PORTRAIT BACKDROP */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        style={{
          transform: `translate3d(${coords.x * -25}px, ${coords.y * -25}px, 0)`,
          transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <img 
          src="/subha.jpg" 
          alt="Subhradip Mishra Full Screen Backdrop"
          className="w-full h-full object-cover object-[50%_20%] mix-blend-screen filter grayscale contrast-150 brightness-80 opacity-30 md:opacity-45"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 75%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 75%, transparent 100%)',
          }}
        />

        {/* Cybernetic Ambient Volumetric Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen animate-pulse"></div>
      </div>

      {/* 2. COOL CYBERNETIC HUD & RADAR OVERLAYS */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center"
        style={{
          transform: `translate3d(${coords.x * 35}px, ${coords.y * 35}px, 0)`,
          transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {/* Giant Rotating Radar Circles */}
        <div className="relative w-[600px] h-[600px] md:w-[850px] md:h-[850px] lg:w-[1000px] lg:h-[1000px] flex items-center justify-center opacity-30">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_80s_linear_infinite]"></div>
          <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-cyan-400/20 animate-[spin_40s_linear_infinite_reverse]"></div>
          <div className="absolute w-[50%] h-[50%] rounded-full border border-white/5"></div>
          
          {/* Radar Sweep Effect */}
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(6,182,212,0.15)_360deg)] animate-[spin_6s_linear_infinite]"></div>

          {/* HUD Crosshairs */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>

      {/* 3. DYNAMIC LASER SCANNER & EQUALIZER VISUALIZERS */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 shadow-[0_0_15px_rgba(6,182,212,0.9)] animate-[scan_5s_ease-in-out_infinite_alternate] pointer-events-none z-10"></div>
      
      {/* Top Bar Header Navigation */}
      <div className="absolute top-8 left-6 md:left-12 font-mono text-xs text-muted uppercase tracking-widest flex items-center gap-4 z-20">
        <span className="w-2 h-2 bg-emerald-400 rounded-sm animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
        [SYS_TERM] ARCHITECTURE_ENGAGED // v4.2.0
      </div>

      <div className="absolute top-6 right-6 md:right-12 z-20">
        <button 
          onClick={scrollToTop}
          className="font-mono text-xs text-muted uppercase tracking-widest hover:text-off-white transition-all border border-structure hover:border-cyan-400/40 px-4 py-2 bg-[#050505]/80 backdrop-blur-md hover:bg-structure group flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <span className="group-hover:-translate-y-1 transition-transform text-white">^</span> RETURN_TO_TOP
        </button>
      </div>

      {/* 4. MASSIVE INTERACTIVE TYPOGRAPHY */}
      <div className="relative w-full px-6 flex justify-center items-center h-[45vh] md:h-[50vh] mt-12 z-10">
        <h2 
          ref={textRef}
          className="relative font-display font-black uppercase tracking-tighter leading-[0.85] select-none text-[15vw] md:text-[12vw] text-transparent cursor-default group"
          style={{ WebkitTextStroke: '2px rgba(255,255,255,0.18)' }}
        >
          READY TO <br/> ARCHITECT
          
          <span 
            className="absolute inset-0 flex flex-col justify-center text-transparent bg-clip-text bg-gradient-to-b from-white via-off-white to-[#444] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            style={{ WebkitTextStroke: '0px' }}
          >
            <span>READY TO</span>
            <span>ARCHITECT</span>
          </span>
        </h2>
      </div>

      {/* 5. TELEMETRY & AUDIO WAVEFORM EQUALIZER */}
      <div className="w-full max-w-6xl px-6 flex items-center justify-between font-mono text-[10px] text-muted-grey uppercase tracking-widest mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400">// NEURAL_SYNC:</span>
          <span className="text-off-white">99.8% OPTIMAL</span>
        </div>
        
        {/* Animated Equalizer Bars */}
        <div className="flex items-end gap-1 h-3">
          <span className="w-1 bg-cyan-400/80 animate-[pulse_1s_infinite] h-2"></span>
          <span className="w-1 bg-cyan-400/60 animate-[pulse_0.7s_infinite] h-3"></span>
          <span className="w-1 bg-cyan-400/90 animate-[pulse_1.2s_infinite] h-1.5"></span>
          <span className="w-1 bg-cyan-400/70 animate-[pulse_0.8s_infinite] h-2.5"></span>
          <span className="w-1 bg-cyan-400/50 animate-[pulse_1.1s_infinite] h-3"></span>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-cyan-400">// LOCATION:</span>
          <span className="text-off-white">30.5162° N, 76.6572° E</span>
        </div>
      </div>

      {/* 6. HOLOGRAPHIC DATA CARDS GRID */}
      <div ref={cardsRef} className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 font-mono uppercase text-muted px-6 relative z-10">
        
        {/* Holographic Operator Card */}
        <div className="flex flex-col items-start gap-4 border border-structure-grey bg-[#020202]/90 backdrop-blur-xl p-6 md:p-8 relative group hover:border-cyan-500/50 transition-all duration-500 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
          
          <span className="text-structure-grey text-[10px] md:text-xs tracking-widest border-b border-structure pb-3 mb-1 w-full flex justify-between items-center">
            <span>Operator // Identity</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]"></span>
          </span>

          <div className="flex items-center gap-4 mt-2 w-full">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/20 ring-1 ring-white/10 shrink-0 bg-void group-hover:border-cyan-400 transition-colors duration-500">
              <img 
                src="/subha.jpg" 
                alt="Subhradip Mishra" 
                className="w-full h-full object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
              {/* Corner brackets */}
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-cyan-400"></div>
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-cyan-400"></div>
            </div>
            
            <div className="flex flex-col text-left overflow-hidden">
              <span className="font-display text-lg md:text-xl text-off-white font-bold tracking-tight truncate group-hover:text-white transition-colors">Subhradip Mishra</span>
              <span className="font-mono text-[11px] text-muted-grey tracking-wider mt-0.5">CS Engineering // Chitkara</span>
              <div className="flex items-center gap-1.5 mt-2 font-mono text-[9px] text-emerald-400 bg-emerald-950/50 border border-emerald-700/50 px-2 py-0.5 rounded w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                ACTIVE FOR HIRE
              </div>
            </div>
          </div>
        </div>

        {/* Data Card 1: Socials */}
        <div className="flex flex-col items-start gap-4 border border-structure-grey bg-[#020202]/90 backdrop-blur-xl p-6 md:p-8 relative group hover:border-cyan-500/50 transition-all duration-500 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
          
          <span className="text-structure-grey text-[10px] md:text-xs tracking-widest border-b border-structure pb-3 mb-1 w-full flex justify-between items-center">
            <span>Connect // Socials</span>
            <span className="animate-pulse w-2 h-2 bg-structure-grey"></span>
          </span>
          
          <a href="https://github.com/SubhradipMishra/" target="_blank" rel="noreferrer" className="text-xl md:text-2xl font-display tracking-tight text-off-white hover:text-white transition-colors duration-300 flex items-center gap-3 group/link w-full mt-2">
            <span className="text-cyan-400 opacity-0 group-hover/link:opacity-100 transition-all -translate-x-4 group-hover/link:translate-x-0 transform duration-300">{'>>'}</span>
            GITHUB
          </a>
          
          <a href="https://www.linkedin.com/in/subhradip-mishra-253258296" target="_blank" rel="noreferrer" className="text-xl md:text-2xl font-display tracking-tight text-off-white hover:text-white transition-colors duration-300 flex items-center gap-3 group/link w-full">
            <span className="text-cyan-400 opacity-0 group-hover/link:opacity-100 transition-all -translate-x-4 group-hover/link:translate-x-0 transform duration-300">{'>>'}</span>
            LINKEDIN
          </a>
        </div>
        
        {/* Data Card 2: Direct Contact */}
        <div className="flex flex-col items-start gap-4 border border-structure-grey bg-[#020202]/90 backdrop-blur-xl p-6 md:p-8 relative group hover:border-cyan-500/50 transition-all duration-500 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
          
          <span className="text-structure-grey text-[10px] md:text-xs tracking-widest border-b border-structure pb-3 mb-1 w-full flex justify-between items-center">
            <span>Direct_Comm // Line</span>
            <span className="animate-pulse w-2 h-2 bg-structure-grey"></span>
          </span>
          
          <a href="mailto:mishrasubhradip2005@gmail.com" className="text-sm md:text-base text-off-white hover:text-white transition-colors duration-300 flex items-center gap-2 group/link lowercase w-full truncate mt-2">
            <span className="text-cyan-400 opacity-0 group-hover/link:opacity-100 transition-all -translate-x-4 group-hover/link:translate-x-0 transform duration-300">{'>>'}</span>
            mishrasubhradip2005@gmail.com
          </a>
          
          <a href="tel:7501833895" className="text-sm md:text-base text-off-white hover:text-white transition-colors duration-300 flex items-center gap-2 group/link w-full">
            <span className="text-cyan-400 opacity-0 group-hover/link:opacity-100 transition-all -translate-x-4 group-hover/link:translate-x-0 transform duration-300">{'>>'}</span>
            +91 7501833895
          </a>
        </div>
      </div>
      
      {/* 7. INFINITE SCROLLING MARQUEE */}
      <div className="w-full mt-32 border-y border-structure py-4 flex overflow-hidden whitespace-nowrap bg-[#020202] relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none"></div>
        
        <div className="animate-[slide_30s_linear_infinite] flex items-center gap-16 font-mono text-sm uppercase text-structure-grey opacity-70">
          <span>// END_OF_FILE</span>
          <span className="text-muted-grey">•</span>
          <span>SYSTEM OFFLINE</span>
          <span className="text-muted-grey">•</span>
          <span>© {new Date().getFullYear()} SUBHRADIP MISHRA</span>
          <span className="text-muted-grey">•</span>
          <span>ALL SYSTEMS NOMINAL</span>
          <span className="text-muted-grey">•</span>
          <span>// END_OF_FILE</span>
          <span className="text-muted-grey">•</span>
          <span>SYSTEM OFFLINE</span>
          <span className="text-muted-grey">•</span>
          <span>© {new Date().getFullYear()} SUBHRADIP MISHRA</span>
          <span className="text-muted-grey">•</span>
          <span>ALL SYSTEMS NOMINAL</span>
          <span className="text-muted-grey">•</span>
          <span>// END_OF_FILE</span>
          <span className="text-muted-grey">•</span>
          <span>SYSTEM OFFLINE</span>
          <span className="text-muted-grey">•</span>
          <span>© {new Date().getFullYear()} SUBHRADIP MISHRA</span>
          <span className="text-muted-grey">•</span>
          <span>ALL SYSTEMS NOMINAL</span>
        </div>
      </div>
    </footer>
  );
}
