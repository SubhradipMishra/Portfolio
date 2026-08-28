'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const phases = [
  {
    id: '01',
    title: 'Architecture & System Design',
    desc: 'Mapping core infrastructure, databases, and structural flow. Blueprinting robust, scalable systems before a single line of code is written.',
    specs: ['SYSTEM_DIAGRAMS', 'SCHEMA_DESIGN', 'TECH_STACK']
  },
  {
    id: '02',
    title: 'Frontend Engineering',
    desc: 'Constructing pixel-perfect, fluid, and highly performant interfaces. Bridging the gap between design aesthetics and technical constraints.',
    specs: ['REACT/NEXT.JS', 'WEBGL/GSAP', 'ACCESSIBILITY']
  },
  {
    id: '03',
    title: 'Backend Integration',
    desc: 'Forging secure APIs, efficient microservices, and seamless data pipelines to power complex client-side applications.',
    specs: ['NODE.JS', 'DATABASES', 'CLOUD_SERVICES']
  },
  {
    id: '04',
    title: 'Optimization & Scale',
    desc: 'Rigorous testing, CI/CD pipelines, and performance fine-tuning to ensure the application thrives under global load.',
    specs: ['CI/CD', 'PERF_AUDIT', 'SECURITY']
  }
];

export default function HowIWork() {
  const containerRef = useRef<HTMLElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Animate the connectors
      const connectPaths = containerRef.current?.querySelectorAll('.connect-path');
      connectPaths?.forEach((path) => {
        const p = path as SVGPathElement;
        const length = p.getTotalLength();
        gsap.set(p, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(p, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: p,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1,
          }
        });
      });

      // Animate each phase block
      phaseRefs.current.forEach((phase, index) => {
        if (!phase) return;
        const isEven = index % 2 === 0;
        
        // Block fade and slide
        gsap.fromTo(
          phase,
          { opacity: 0.2, x: isEven ? -50 : 50, borderColor: 'var(--structure-grey)' },
          {
            opacity: 1,
            x: 0,
            borderColor: 'var(--off-white)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: phase,
              start: 'top 80%',
              end: 'top 60%',
              scrub: 1,
            }
          }
        );

        // Sub-elements stagger
        const elements = phase.querySelectorAll('.phase-anim');
        gsap.fromTo(
          elements,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            scrollTrigger: {
              trigger: phase,
              start: 'top 75%',
              end: 'top 55%',
              scrub: 1,
            }
          }
        );
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen py-32 border-t border-structure bg-void grid-bg overflow-hidden"
    >
      <div className="absolute top-6 left-6 font-mono text-xs text-muted uppercase tracking-widest z-10">
        [SYS_PROCESS] Operating_Route
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-24 text-center relative z-10">
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none tracking-tight mb-6">
            Architectural <br className="hidden md:block"/> Route
          </h2>
          <p className="font-mono text-muted text-sm md:text-base max-w-xl mx-auto">
            // Mapping the journey from conceptual blueprint to scalable execution. A precise, winding path of technical delivery.
          </p>
        </div>

        <div className="relative w-full flex flex-col">
          {phases.map((phase, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={phase.id} className="w-full flex flex-col relative">
                
                {/* Card */}
                <div 
                  ref={(el) => { phaseRefs.current[i] = el; }}
                  className={`relative z-10 w-full md:w-[45%] border border-structure p-8 md:p-12 bg-void/80 backdrop-blur-md 
                    ${isEven ? 'self-start' : 'self-end'}`}
                >
                  {/* Decorative corner brackets */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-foreground/30"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-foreground/30"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-foreground/30"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-foreground/30"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-6">
                    <span className="font-mono text-4xl md:text-5xl text-muted phase-anim">
                      {phase.id}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl uppercase tracking-wider phase-anim">
                      {phase.title}
                    </h3>
                  </div>
                  
                  <p className="text-off-white/70 text-lg mb-8 phase-anim leading-relaxed">
                    {phase.desc}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {phase.specs.map(spec => (
                      <span 
                        key={spec}
                        className="font-mono text-xs text-muted border border-structure px-3 py-1 bg-structure/20 phase-anim"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SVG Segment Connector */}
                {i < phases.length - 1 && (
                  <div className="w-full h-32 md:h-48 -my-6 md:-my-12 relative z-0 pointer-events-none flex justify-center">
                    <svg 
                      className="w-full h-full" 
                      preserveAspectRatio="none" 
                      viewBox="0 0 100 100"
                    >
                      {/* Background dashed path */}
                      <path 
                        d={isEven ? "M 22.5 0 C 22.5 50, 77.5 50, 77.5 100" : "M 77.5 0 C 77.5 50, 22.5 50, 22.5 100"} 
                        fill="none" 
                        stroke="var(--structure-grey)" 
                        strokeWidth="1" 
                        vectorEffect="non-scaling-stroke" 
                        strokeDasharray="4 4" 
                      />
                      {/* Animated solid path */}
                      <path 
                        className="connect-path"
                        d={isEven ? "M 22.5 0 C 22.5 50, 77.5 50, 77.5 100" : "M 77.5 0 C 77.5 50, 22.5 50, 22.5 100"} 
                        fill="none" 
                        stroke="var(--off-white)" 
                        strokeWidth="3" 
                        vectorEffect="non-scaling-stroke" 
                        style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' }}
                      />
                    </svg>
                  </div>
                )}
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
