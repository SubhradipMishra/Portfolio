'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the massive text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 90%',
            end: 'bottom 80%',
            scrub: 1,
          }
        }
      );

      // Cards stagger reveal
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={containerRef} className="relative w-full pt-40 border-t border-structure bg-void text-center flex flex-col items-center overflow-hidden">
      
      {/* Dynamic Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-structure-grey rounded-[100%] blur-[120px] opacity-20 pointer-events-none mix-blend-screen"></div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none mix-blend-screen"></div>
      
      {/* Scanner Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-off-white to-transparent opacity-30 shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-[scan_6s_ease-in-out_infinite_alternate] pointer-events-none"></div>

      <div className="absolute top-8 left-6 md:left-12 font-mono text-xs text-muted uppercase tracking-widest flex items-center gap-4 z-20">
        <span className="w-2 h-2 bg-red-600 rounded-sm animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"></span>
        [SYS_TERM] Terminate_Session
      </div>

      <div className="absolute top-6 right-6 md:right-12 z-20">
        <button 
          onClick={scrollToTop}
          className="font-mono text-xs text-muted uppercase tracking-widest hover:text-off-white transition-colors border border-structure px-4 py-2 bg-[#050505] hover:bg-structure group flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <span className="group-hover:-translate-y-1 transition-transform text-white">^</span> RETURN_TO_TOP
        </button>
      </div>

      {/* Massive Interactive Typography */}
      <div className="relative w-full px-6 flex justify-center items-center h-[50vh] mt-12 z-10">
        <h2 
          ref={textRef}
          className="relative font-display font-black uppercase tracking-tighter leading-[0.85] select-none text-[15vw] md:text-[12vw] text-transparent cursor-default group"
          style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)' }}
        >
          READY TO <br/> ARCHITECT
          
          <span 
            className="absolute inset-0 flex flex-col justify-center text-transparent bg-clip-text bg-gradient-to-b from-white to-[#333] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ WebkitTextStroke: '0px' }}
          >
            <span>READY TO</span>
            <span>ARCHITECT</span>
          </span>
        </h2>
      </div>

      {/* Social Links Grid */}
      <div ref={cardsRef} className="w-full max-w-6xl pt-16 flex flex-col md:flex-row justify-between gap-8 md:gap-12 font-mono uppercase text-muted px-6 relative z-10">
        
        {/* Data Card 1 */}
        <div className="flex-1 flex flex-col items-start gap-4 border border-structure bg-[#020202]/80 backdrop-blur-md p-8 relative group hover:border-muted-grey transition-colors duration-500 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
          
          <span className="text-structure-grey text-[10px] md:text-xs tracking-widest border-b border-structure pb-3 mb-4 w-full flex justify-between items-center">
            <span>Connect // Socials</span>
            <span className="animate-pulse w-2 h-2 bg-structure-grey"></span>
          </span>
          
          <a href="https://github.com/SubhradipMishra/" target="_blank" rel="noreferrer" className="text-2xl md:text-4xl font-display tracking-tight text-off-white hover:text-white transition-colors duration-300 flex items-center gap-4 group/link w-full">
            <span className="text-muted-grey opacity-0 group-hover/link:opacity-100 transition-all -translate-x-4 group-hover/link:translate-x-0 transform duration-300">{'>>'}</span>
            GITHUB
          </a>
          
          <a href="https://www.linkedin.com/in/subhradip-mishra-253258296" target="_blank" rel="noreferrer" className="text-2xl md:text-4xl font-display tracking-tight text-off-white hover:text-white transition-colors duration-300 flex items-center gap-4 group/link w-full">
            <span className="text-muted-grey opacity-0 group-hover/link:opacity-100 transition-all -translate-x-4 group-hover/link:translate-x-0 transform duration-300">{'>>'}</span>
            LINKEDIN
          </a>
        </div>
        
        {/* Data Card 2 */}
        <div className="flex-1 flex flex-col items-start gap-4 border border-structure bg-[#020202]/80 backdrop-blur-md p-8 relative group hover:border-muted-grey transition-colors duration-500 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
          
          <span className="text-structure-grey text-[10px] md:text-xs tracking-widest border-b border-structure pb-3 mb-4 w-full flex justify-between items-center">
            <span>Direct_Comm //</span>
            <span className="animate-pulse w-2 h-2 bg-structure-grey"></span>
          </span>
          
          <a href="mailto:mishrasubhradip2005@gmail.com" className="text-base md:text-xl text-off-white hover:text-white transition-colors duration-300 flex items-center gap-4 group/link lowercase w-full truncate">
            <span className="text-muted-grey opacity-0 group-hover/link:opacity-100 transition-all -translate-x-4 group-hover/link:translate-x-0 transform duration-300">{'>>'}</span>
            mishrasubhradip2005@gmail.com
          </a>
          
          <a href="tel:7501833895" className="text-base md:text-xl text-off-white hover:text-white transition-colors duration-300 flex items-center gap-4 group/link w-full">
            <span className="text-muted-grey opacity-0 group-hover/link:opacity-100 transition-all -translate-x-4 group-hover/link:translate-x-0 transform duration-300">{'>>'}</span>
            +91 7501833895
          </a>
        </div>
      </div>
      
      {/* Infinite Scrolling Marquee */}
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
