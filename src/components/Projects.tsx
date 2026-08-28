'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: '01',
    name: 'AlgoVista',
    desc: 'AI-powered e-learning platform for developers.',
    problem: 'Students needed a unified environment with integrated tools to learn and code simultaneously.',
    system: 'Docker-managed coding sandbox, courses, 25+ integrated dev tools, mentorship, AI-driven guidance.',
    stack: 'React, Tailwind, Redux, GSAP, Node.js, Express, Mongoose, bcrypt, JWT, Razorpay, Docker, Socket.IO, Gemini AI.',
    why: 'Built to help other students grow.',
    link: 'https://github.com/SubhradipMishra/AlgoVista'
  },
  {
    id: '02',
    name: 'Codexa',
    desc: 'AI-powered developer platform to build, review, test, secure, and deploy code from one place.',
    problem: 'Context-switching between review, CI/CD, and deployment tools slows down developer velocity.',
    system: 'AI code review, codebase assistant, CI/CD, security analysis pipeline using RAG and Kafka.',
    stack: 'React, TypeScript, Tailwind, Node.js, Express, PostgreSQL, Redis, Kafka, Python, FastAPI, Gemini AI, RAG, Docker, Kubernetes, AWS.',
    why: 'Wanted software development to be smarter, faster, and easier while solving real developer problems.',
    link: 'https://github.com/SubhradipMishra/Codexa'
  },
  {
    id: '03',
    name: 'Smart Logistics',
    desc: 'Platform for managing orders, deliveries, inventory, drivers, and real-time shipment tracking.',
    problem: 'Manual logistics processes lacked transparency and real-time visibility.',
    system: 'Automated workflows and real-time analytics with map integration.',
    stack: 'React, Tailwind, Redux, GSAP, Node.js, Express, MongoDB, Socket.IO, Google Maps API, Docker.',
    why: 'Wanted logistics to be more organized, transparent, and efficient — less manual work, real-time visibility.',
    link: 'https://github.com/SubhradipMishra/'
  },
  {
    id: '04',
    name: 'Nexora',
    desc: 'Modern digital platform for smart, scalable business solutions.',
    problem: 'Businesses struggled with fragmented service management and automation tools.',
    system: 'Service management, automation, analytics, real-time communication engine.',
    stack: 'React, Tailwind, Redux, GSAP, Node.js, Express, MongoDB, Socket.IO, Docker, AWS.',
    why: 'Wanted a scalable real-world platform blending modern tech with practical business value.',
    link: 'https://github.com/SubhradipMishra/'
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${100 + i * 40}`,
          endTrigger: containerRef.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full pb-48 pt-24 px-6 md:px-12 lg:px-24 border-t border-structure bg-background"
    >
      <div className="absolute top-6 left-6 font-mono text-xs text-muted uppercase z-10">
        [03] Case_Studies
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-[20vh] mt-12">
        {projects.map((proj, i) => (
          <div 
            key={proj.id} 
            className="project-card relative w-full bg-void border border-structure p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8"
            style={{ zIndex: i + 10 }}
          >
            <div className="flex-1">
              <div className="font-mono text-muted mb-4">CASE_{proj.id}</div>
              <h3 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-2">{proj.name}</h3>
              <p className="text-xl font-light text-off-white mb-8">{proj.desc}</p>
              
              <div className="flex flex-col gap-6 font-sans text-sm">
                <div>
                  <div className="text-muted font-mono uppercase text-xs mb-1 border-b border-structure pb-1 inline-block">Problem</div>
                  <p className="text-off-white">{proj.problem}</p>
                </div>
                <div>
                  <div className="text-muted font-mono uppercase text-xs mb-1 border-b border-structure pb-1 inline-block">System Design</div>
                  <p className="text-off-white">{proj.system}</p>
                </div>
                <div>
                  <div className="text-muted font-mono uppercase text-xs mb-1 border-b border-structure pb-1 inline-block">Why</div>
                  <p className="text-white font-medium italic">"{proj.why}"</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 flex flex-col justify-between border-l border-structure pl-0 md:pl-8 pt-8 md:pt-0 mt-8 md:mt-0">
              <div>
                <div className="text-muted font-mono uppercase text-xs mb-4">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {proj.stack.split(', ').map(t => (
                    <span key={t} className="px-2 py-1 bg-structure-grey text-off-white font-mono text-[10px] uppercase border border-[#333]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              
              <a 
                href={proj.link} 
                target="_blank" 
                rel="noreferrer"
                className="mt-12 inline-flex items-center justify-between group border border-structure p-4 hover:bg-white hover:text-black transition-colors duration-300"
              >
                <span className="font-mono text-sm uppercase">View Source</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
