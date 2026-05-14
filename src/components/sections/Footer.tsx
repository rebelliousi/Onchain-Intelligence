'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ShieldCheck, Zap, Activity, Globe, Cpu, Terminal } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// --- SOSYAL MEDYA İKONLARI ---
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
);

export default function HybridFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["top bottom", "bottom bottom"]
  });

  const xPos = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal items on scroll
      gsap.from('.reveal-item', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
        duration: 1.5,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        }
      });

      // Ghost text parallax
      gsap.to('.ghost-aura', {
        y: -100,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-between overflow-hidden pt-32 pb-10 px-6 lg:px-16 border-t border-white/5"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <motion.h1 
          className="ghost-aura text-[45vw] font-black leading-none tracking-tighter select-none"
          style={{ 
            WebkitTextStroke: '1px rgba(0, 255, 209, 0.15)',
            color: 'transparent',
          }}
        >
          AURA
        </motion.h1>
      </div>

      {/* --- TOP HUD (SYSTEM STATUS) --- */}
      <div className="relative z-20 flex justify-between items-start w-full reveal-item">
        <div className="space-y-1">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FFD1] animate-pulse" />
                <span className="text-[10px] font-mono text-white/40 tracking-[0.3em] uppercase">Node Connectivity: Optimal</span>
            </div>
            <p className="text-[9px] font-mono text-white/10 pl-3.5">SECURE_TUNNEL_ID: 882-AX-09</p>
        </div>
        
        <div className="hidden md:flex gap-12 border-r border-white/10 pr-10">
            {[
                { label: 'Latency', val: '12ms' },
                { label: 'Uptime', val: '99.9%' },
                { label: 'Security', val: 'Level 5' }
            ].map((stat) => (
                <div key={stat.label} className="text-right">
                    <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-xs font-mono text-[#00FFD1]">{stat.val}</p>
                </div>
            ))}
        </div>
      </div>

      {/* --- MAIN CONTENT (MERGED STYLE) --- */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-20 items-end mt-20">
        
        {/* Left side: The Big List */}
        <div className="lg:col-span-7 space-y-4">
          {[
            { text: 'FAST', desc: 'Neural processing speed' },
            { text: 'SECURE', desc: 'Military grade encryption' },
            { text: 'GLOBAL', desc: 'Worldwide edge locations' }
          ].map((item, idx) => (
            <motion.div 
              key={item.text}
              whileHover={{ x: 20 }}
              className="group cursor-default border-b border-white/5 pb-4 flex items-end justify-between transition-all hover:border-[#00FFD1]/40"
            >
                <div className="flex items-baseline gap-6">
                    <span className="text-white/10 font-mono text-xs">0{idx + 1}</span>
                    <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-white transition-colors group-hover:text-[#00FFD1]">
                        {item.text}
                    </h2>
                </div>
                <div className="text-right mb-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <p className="text-[10px] font-mono text-[#00FFD1] uppercase tracking-[0.2em]">{item.desc}</p>
                    <ArrowUpRight className="inline-block text-[#00FFD1] mt-2" size={24} />
                </div>
            </motion.div>
          ))}
        </div>

        {/* Right side: Modern Bento Action */}
       
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="relative z-10 mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 reveal-item">
        
        <div className="flex items-center gap-12">
            {[
                { icon: <TwitterIcon />, label: 'TWITTER' },
                { icon: <DiscordIcon />, label: 'COMMUNITY' },
                { icon: <Terminal size={18} />, label: 'RESOURCES' }
            ].map(social => (
                <a key={social.label} href="#" className="flex flex-col gap-2 group">
                    <span className="text-white/30 group-hover:text-[#00FFD1] transition-colors">{social.icon}</span>
                    <span className="text-[8px] font-bold tracking-[0.3em] text-white/5 group-hover:text-white/20 transition-colors uppercase">{social.label}</span>
                </a>
            ))}
        </div>

        <div className="flex items-center gap-6">
            <div className="text-right">
                <p className="text-xl font-bold tracking-tighter text-white">
                    AURA<span className="text-[#00FFD1]">_</span>PROTOCOL
                </p>
                <p className="text-[8px] font-mono text-white/10 uppercase tracking-[0.4em]">
                    Intelligence Labs © {new Date().getFullYear()}
                </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center">
                <Activity size={20} className="text-[#00FFD1]" />
            </div>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l border-b border-[#00FFD1]/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-[#00FFD1]/20 pointer-events-none" />
    </footer>
  )
}