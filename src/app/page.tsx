import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import HowIWork from '@/components/HowIWork';
import Chatbot from '@/components/Chatbot';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-background text-foreground overflow-hidden">
      {/* Structural grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 grid-bg opacity-30 mix-blend-overlay"></div>
      
      {/* Top/Bottom structural borders */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-[1px] bg-structure z-50"></div>
      <div className="pointer-events-none fixed bottom-0 left-0 w-full h-[1px] bg-structure z-50"></div>
      <div className="pointer-events-none fixed top-0 left-0 w-[1px] h-full bg-structure z-50"></div>
      <div className="pointer-events-none fixed top-0 right-0 w-[1px] h-full bg-structure z-50"></div>

      {/* Sections */}
      <Hero />
      <Manifesto />
      <TechStack />
      <Projects />
      <HowIWork />
      <Chatbot />
      <Footer />
    </main>
  );
}
