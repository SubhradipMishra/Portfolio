'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  {
    id: 'frontend',
    title: 'Frontend Client',
    tech: 'React, Next.js, TypeScript, Tailwind, GSAP, Three.js',
    pos: { x: 20, y: 20 }
  },
  {
    id: 'backend',
    title: 'API / Microservices',
    tech: 'Node.js, Express, .NET, C#',
    pos: { x: 60, y: 50 }
  },
  {
    id: 'data',
    title: 'Persistence Layer',
    tech: 'MongoDB, PostgreSQL, Redis',
    pos: { x: 20, y: 80 }
  },
  {
    id: 'devops',
    title: 'Infrastructure',
    tech: 'Docker, Kubernetes, AWS, CI/CD',
    pos: { x: 80, y: 20 }
  },
  {
    id: 'other',
    title: 'Integrations',
    tech: 'Gemini AI, Auth, Payment Gateways',
    pos: { x: 80, y: 80 }
  }
];

export default function TechStack() {
  const containerRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const solidPaths = svgRef.current?.querySelectorAll('.solid-lines path');
      const flowPaths = svgRef.current?.querySelectorAll('.flow-path');
      const nodes = nodesRef.current?.querySelectorAll('.tech-node');

      if (!solidPaths || !nodes || !flowPaths) return;

      // Initial drawing effect for solid lines
      solidPaths.forEach(path => {
        const p = path as SVGPathElement;
        const length = p.getTotalLength();
        p.style.strokeDasharray = `${length}`;
        p.style.strokeDashoffset = `${length}`;
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1,
        }
      });

      tl.to(solidPaths, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'none',
        stagger: 0.2
      })
      .fromTo(
        nodes,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.5)' },
        '<0.5'
      );

      // Continuous flow animation for dashed lines (pulse effect)
      gsap.fromTo(flowPaths, 
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 3,
          ease: 'none',
          stagger: 0.5,
          repeat: -1
        }
      );
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 border-t border-structure bg-void overflow-hidden"
    >
      <div className="absolute top-6 left-6 font-mono text-xs text-muted uppercase">
        [02] System_Architecture
      </div>

      {/* Decorative Scanner Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-20 shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-[scan_4s_ease-in-out_infinite_alternate] pointer-events-none"></div>

      <h2 className="font-display font-bold text-5xl md:text-7xl uppercase mb-16 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-structure-grey">Tech Stack</h2>

      <div className="relative w-full h-[60vh] md:h-[70vh] border border-structure bg-[#020202] overflow-hidden rounded-sm shadow-2xl">
        {/* Background Grid */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>

        {/* SVG Connective Lines */}
        <svg 
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none" 
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" fill="#7a7a7a">
              <polygon points="0 0, 6 3, 0 6" />
            </marker>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <g className="solid-lines">
            <path d="M 20 20 C 40 20, 40 50, 60 50" stroke="var(--structure-grey)" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 60 50 C 40 50, 40 80, 20 80" stroke="var(--structure-grey)" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 60 50 C 70 50, 70 20, 80 20" stroke="var(--structure-grey)" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 60 50 C 70 50, 70 80, 80 80" stroke="var(--structure-grey)" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 20 20 C 50 10, 50 10, 80 20" stroke="#222" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 20 80 C 50 90, 50 90, 80 80" stroke="#222" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" markerEnd="url(#arrowhead)" />
          </g>
          <g className="flow-lines opacity-100" filter="url(#glow)">
            <path d="M 20 20 C 40 20, 40 50, 60 50" stroke="var(--off-white)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="5 30" fill="none" className="flow-path drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <path d="M 60 50 C 40 50, 40 80, 20 80" stroke="var(--off-white)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="5 30" fill="none" className="flow-path drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <path d="M 60 50 C 70 50, 70 20, 80 20" stroke="var(--off-white)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="5 30" fill="none" className="flow-path drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <path d="M 60 50 C 70 50, 70 80, 80 80" stroke="var(--off-white)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="5 30" fill="none" className="flow-path drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <path d="M 20 20 C 50 10, 50 10, 80 20" stroke="var(--muted-grey)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeDasharray="5 30" fill="none" className="flow-path drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]" />
            <path d="M 20 80 C 50 90, 50 90, 80 80" stroke="var(--muted-grey)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeDasharray="5 30" fill="none" className="flow-path drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]" />
          </g>
        </svg>

        {/* Nodes */}
        <div ref={nodesRef} className="absolute inset-0 w-full h-full pointer-events-none">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className="tech-node absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center group pointer-events-auto"
              style={{ left: `${cat.pos.x}%`, top: `${cat.pos.y}%` }}
            >
              <div className="w-4 h-4 bg-white mb-2 relative flex items-center justify-center rounded-sm">
                <div className="absolute inset-0 bg-white animate-ping opacity-40 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-black"></div>
              </div>
              <div className="bg-structure-grey px-4 py-1.5 font-mono text-xs uppercase mb-1 border border-[#444] text-white group-hover:border-white transition-colors">
                {cat.title}
              </div>
              <div className="font-sans text-sm text-off-white max-w-[200px] leading-tight bg-[#0A0A0A]/90 backdrop-blur-md px-3 py-2 border border-structure shadow-lg">
                {cat.tech}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
