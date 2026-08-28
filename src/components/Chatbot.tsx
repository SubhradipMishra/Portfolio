'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "System initialized. Accessing central intelligence... How can I assist you in exploring Subhradip's technical architecture?",
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    
    // Animate the newest message
    if (chatContainerRef.current) {
      const children = chatContainerRef.current.children;
      // The last element is the scroll anchor, so the newest message is children.length - 2
      // Or children.length - 3 if isLoading is true (since isLoading adds a loader block)
      const targetIndex = isLoading ? children.length - 3 : children.length - 2;
      
      if (targetIndex >= 0) {
        const lastElement = children[targetIndex] as HTMLElement;
        gsap.fromTo(
          lastElement, 
          { opacity: 0, y: 15, scale: 0.98 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
        );
      }

      // Also animate the loader if it just appeared
      if (isLoading) {
        const loaderElement = children[children.length - 2] as HTMLElement;
        gsap.fromTo(
          loaderElement,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  }, [messages, isLoading]);

  // Section entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.chat-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: 'user' as const, content: trimmed }];
    setInput('');
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      let data: { text?: string; error?: string } = {};
      try {
        data = await response.json();
      } catch {
        // Handle non-JSON
      }

      if (!response.ok || data.error) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: '[ERR] Failed to communicate with the system.' },
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: data.text ?? '[ERR] Empty response from system.' },
        ]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '[ERR] Connection lost.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  return (
    <section ref={sectionRef} className="relative w-full py-32 px-6 md:px-12 lg:px-24 border-t border-structure bg-void overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left side: Context/Title */}
        <div className="flex-1 w-full relative z-10 chat-reveal">
          <div className="font-mono text-xs text-muted uppercase tracking-widest mb-6 flex items-center gap-4">
            <span className="w-2 h-2 bg-white rounded-sm animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            [05] Neural_Interface
          </div>
          
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none tracking-tight mb-8">
            Query The <br/> System
          </h2>
          
          <p className="font-mono text-muted text-sm md:text-base max-w-md leading-relaxed mb-12">
            // Access the central intelligence. Interact with an AI trained on my technical stack, past projects, and operational methodology. The system is online and awaiting your input.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => handlePromptClick("What is your core tech stack?")}
              className="text-[10px] md:text-xs font-mono uppercase border border-structure px-4 py-2 text-structure-grey hover:border-white hover:text-white transition-colors duration-300 backdrop-blur-sm bg-void/50"
            >
              [+] Tech_Stack
            </button>
            <button 
              onClick={() => handlePromptClick("Tell me about your architectural approach")}
              className="text-[10px] md:text-xs font-mono uppercase border border-structure px-4 py-2 text-structure-grey hover:border-white hover:text-white transition-colors duration-300 backdrop-blur-sm bg-void/50"
            >
              [+] Architecture
            </button>
            <button 
              onClick={() => handlePromptClick("How can I contact you?")}
              className="text-[10px] md:text-xs font-mono uppercase border border-structure px-4 py-2 text-structure-grey hover:border-white hover:text-white transition-colors duration-300 backdrop-blur-sm bg-void/50"
            >
              [+] Contact
            </button>
          </div>
        </div>

        {/* Right side: Chatbot Interface */}
        <div className="flex-[1.2] w-full relative group chat-reveal">
          
          {/* Premium Glowing Border Effect */}
          <div className="absolute -inset-[1px] bg-gradient-to-b from-structure-grey via-transparent to-structure-grey opacity-20 blur-[2px] group-hover:opacity-50 transition-opacity duration-1000 rounded-sm"></div>
          
          <div className="relative h-[600px] flex flex-col bg-[#020202]/90 backdrop-blur-2xl border border-structure rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-structure flex justify-between items-center bg-[#050505] relative z-10">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse' : 'bg-structure-grey'}`}></div>
                <span className="font-mono text-xs uppercase text-off-white tracking-widest">SYS.AI // ONLINE</span>
              </div>
              <div className="font-mono text-[10px] text-muted flex items-center gap-2">
                <span className="hidden md:inline">ENCRYPTED_CHANNEL</span>
                <span className="w-4 h-4 border border-structure flex justify-center items-center rounded-sm">x</span>
              </div>
            </div>

            {/* Chat Area */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8 scrollbar-thin scrollbar-thumb-structure scrollbar-track-transparent relative z-10"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col max-w-[90%] md:max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  <span className="font-mono text-[9px] md:text-[10px] uppercase text-structure-grey mb-2 tracking-widest flex items-center gap-2">
                    {msg.role === 'user' ? (
                      <>USER_QUERY <span className="w-1 h-1 bg-structure-grey rounded-full"></span></>
                    ) : (
                      <><span className="w-1 h-1 bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)] rounded-full animate-pulse"></span> SYS_RESPONSE</>
                    )}
                  </span>
                  <div 
                    className={`px-5 py-4 font-mono text-sm leading-relaxed border ${
                      msg.role === 'user' 
                        ? 'bg-structure/20 border-structure text-off-white rounded-l-lg rounded-br-none rounded-tr-lg backdrop-blur-sm' 
                        : 'bg-[#050505] border-structure-grey/40 text-white rounded-r-lg rounded-bl-none rounded-tl-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="self-start max-w-[85%] flex flex-col items-start">
                  <span className="font-mono text-[9px] uppercase text-structure-grey mb-2 tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)] rounded-full animate-pulse"></span> SYS_RESPONSE
                  </span>
                  <div className="px-5 py-4 font-mono text-sm border bg-[#050505] border-structure-grey/40 text-white rounded-r-lg rounded-bl-none rounded-tl-lg flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                    Processing
                    <span className="flex gap-1">
                      <span className="animate-[bounce_1s_infinite]">.</span>
                      <span className="animate-[bounce_1s_infinite_100ms]">.</span>
                      <span className="animate-[bounce_1s_infinite_200ms]">.</span>
                    </span>
                  </div>
                </div>
              )}
              
              {/* Scroll Anchor */}
              <div ref={endOfMessagesRef} className="h-1" />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 md:p-6 border-t border-structure bg-[#020202] relative z-10">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-structure-grey/50 to-transparent"></div>
              
              <div className="flex items-center gap-4 bg-[#050505] border border-structure p-2 focus-within:border-structure-grey transition-colors shadow-inner rounded-sm">
                <span className="pl-4 font-mono text-muted text-sm">{'>'}</span>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  placeholder={isLoading ? "System computing..." : "Enter query here..."}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-white placeholder-structure-grey disabled:opacity-50"
                  autoComplete="off"
                  spellCheck="false"
                />
                
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3 font-mono text-[10px] md:text-xs uppercase tracking-widest bg-white text-black hover:bg-off-white disabled:opacity-30 disabled:hover:bg-white transition-colors cursor-pointer rounded-sm font-bold flex items-center gap-2 group/btn"
                >
                  EXECUTE
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </section>
  );
}