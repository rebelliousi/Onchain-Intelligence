'use client'

import { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SCAN_ITEMS = [
  { name: '$BONK', score: 97, status: 'SAFE' },
  { name: '$RUGX', score: 12, status: 'RISK' },
  { name: '$NOVA', score: 94, status: 'SAFE' },
  { name: '$SCAM', score: 8,  status: 'RISK' },
  { name: '$AURA', score: 99, status: 'SAFE' },
]

export default function GuardianSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scanIndex, setScanIndex] = useState(0)
  const [splineLoaded, setSplineLoaded] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef)

  // Scan döngüsü
  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setScanIndex(prev => (prev + 1) % SCAN_ITEMS.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [isInView])

  const currentItem = SCAN_ITEMS[scanIndex]
  const isSafe = currentItem.status === 'SAFE'

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex items-center py-20">
      
      {/* ATMOSPHERE: Arka plan ışığı merkeze daha yakın */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[#8B5CF6]/5 blur-[180px] rounded-full" />
      </div>

      <div 
        ref={containerRef} 
        className="container mx-auto px-6 grid lg:grid-cols-12 gap-8 items-center z-10"
      >
        
        {/* LEFT: THE ROBOT (Dengeli pozisyon) */}
        <div className="relative h-[500px] lg:h-[800px] lg:col-span-7 flex items-center justify-center lg:translate-x-10 z-20 overflow-hidden">
          <div className={`relative w-full h-[110%] -bottom-10 transition-opacity duration-1000 ${splineLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Spline 
              scene="https://prod.spline.design/A8v7lmJVwj6wMkfa/scene.splinecode" 
              onLoad={() => setSplineLoaded(true)}
            />
          </div>
          
          {/* Scanning Beam */}
          {splineLoaded && (
             <motion.div 
              animate={{ opacity: [0, 1, 0], x: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute w-[1px] h-64 bg-[#00FFD1] blur-sm hidden lg:block"
              style={{ right: '15%' }}
             />
          )}
        </div>

        {/* RIGHT: CONTENT (Daha yakın ve hizalı) */}
        <div className="flex flex-col gap-8 lg:col-span-5 lg:pl-10 z-10">
          
          {/* Label */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#8B5CF6]/10 rounded-lg border border-[#8B5CF6]/20">
                <Shield size={14} className="text-[#8B5CF6]" />
            </div>
            <span className="text-[10px] tracking-[0.5em] text-[#8B5CF6] font-bold uppercase">
              AI Sentinel Engine
            </span>
          </div>

          {/* Headline */}
          <div>
            <h2 className="text-white text-5xl md:text-7xl font-extralight tracking-tighter leading-[1.05]">
              Meet Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#a78bfa] to-[#00FFD1] font-medium">
                Autonomous Guardian
              </span>
            </h2>
            <p className="text-white/40 text-lg font-light mt-6 max-w-sm leading-relaxed">
              Our Sentinel scans Birdeye’s token stream in milliseconds, neutralizing threats before they reach your wallet.
            </p>
          </div>

          {/* HUD SCAN CARD */}
          <motion.div 
            className={`relative p-6 border-l-2 backdrop-blur-3xl transition-all duration-500 bg-white/[0.01] max-w-[380px]
              ${isSafe ? 'border-[#00FFD1] shadow-[0_0_50px_rgba(0,255,209,0.02)]' : 'border-[#FFB800] shadow-[0_0_50px_rgba(255,184,0,0.02)]'}`}
          >
            <div className="flex justify-between items-start mb-6">
               <div>
                  <p className="text-[9px] tracking-[0.3em] text-white/30 uppercase mb-1 font-mono">Target Identified</p>
                  <motion.h3 
                    key={currentItem.name} 
                    initial={{ opacity: 0, x: -5 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className="text-2xl font-mono text-white tracking-wider"
                  >
                    {currentItem.name}
                  </motion.h3>
               </div>
               <div className="text-right">
                  <p className="text-[9px] tracking-[0.3em] text-white/30 uppercase mb-1 font-mono">Trust Score</p>
                  <p className={`text-2xl font-bold font-mono ${isSafe ? 'text-[#00FFD1]' : 'text-[#FFB800]'}`}>
                    {currentItem.score}<span className="text-xs text-white/20">/100</span>
                  </p>
               </div>
            </div>

            {/* Status Bar */}
            <div className="h-[1px] w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${currentItem.score}%` }}
                className={`h-full ${isSafe ? 'bg-[#00FFD1]' : 'bg-[#FFB800]'}`}
               />
            </div>

            <div className="mt-4 flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <div className={`w-1 h-1 rounded-full animate-pulse ${isSafe ? 'bg-[#00FFD1]' : 'bg-[#FFB800]'}`} />
                 <span className={`text-[9px] font-bold tracking-[0.2em] uppercase ${isSafe ? 'text-[#00FFD1]' : 'text-[#FFB800]'}`}>
                   Verdict: {currentItem.status}
                 </span>
               </div>
               <span className="text-[8px] text-white/20 font-mono tracking-widest">LATENCY: 12MS</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-2">
             <button className="px-10 py-4 bg-[#8B5CF6] text-white text-[10px] font-bold tracking-[0.2em] rounded-sm hover:brightness-110 transition-all shadow-xl shadow-[#8B5CF6]/20">
                LAUNCH SENTINEL
             </button>
             <button className="px-10 py-4 border border-white/10 text-white/40 text-[10px] font-bold tracking-[0.2em] rounded-sm hover:border-[#00FFD1] hover:text-[#00FFD1] transition-all">
                API DOCS
             </button>
          </div>

        </div>
      </div>
    </section>
  )
}