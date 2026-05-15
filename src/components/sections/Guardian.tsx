'use client'

import { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Loader2, CheckCircle, AlertTriangle } from 'lucide-react'
// 1. Import the live data hook
import { useGuardianFeed } from '@/hooks/useGuardian'

gsap.registerPlugin(ScrollTrigger)

export default function GuardianSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef)
  
  // 2. LIVE DATA HOOK
  const { data: feed, isLoading } = useGuardianFeed()
  const [scanIndex, setScanIndex] = useState(0)
  const [splineLoaded, setSplineLoaded] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // 3. SCANNING LOOP: Cycles through real tokens every 4 seconds
  useEffect(() => {
    if (!isInView || !feed || feed.length === 0) return

    const interval = setInterval(() => {
      // Small "Thinking" delay to make the scan feel real
      setIsAnalyzing(true)
      setTimeout(() => {
        setIsAnalyzing(false)
        setScanIndex(prev => (prev + 1) % feed.length)
      }, 800) // Analysis time
    }, 4000)

    return () => clearInterval(interval)
  }, [isInView, feed])

  // Current token being "targeted" by the robot
  const currentItem = feed?.[scanIndex] || { name: 'IDLE', score: 0, status: 'SAFE', liquidity: '0' }
  const isSafe = currentItem.status === 'SAFE'

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex items-center py-20">
      
      {/* ATMOSPHERE: Central Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[#8B5CF6]/5 blur-[180px] rounded-full" />
      </div>

      <div 
        ref={containerRef} 
        className="container mx-auto px-6 grid lg:grid-cols-12 gap-8 items-center z-10"
      >
        
        {/* LEFT: THE ROBOT */}
        <div className="relative h-[500px] lg:h-[800px] lg:col-span-7 flex items-center justify-center lg:translate-x-10 z-20 overflow-hidden">
          <div className={`relative w-full h-[110%] -bottom-10 transition-opacity duration-1000 ${splineLoaded ? 'opacity-100' : 'opacity-20'}`}>
            <Spline 
              scene="https://prod.spline.design/A8v7lmJVwj6wMkfa/scene.splinecode" 
              onLoad={() => setSplineLoaded(true)}
            />
          </div>
          
          {/* Scanning Beam (Active when Robot is on screen) */}
          {splineLoaded && (
             <motion.div 
              animate={{ 
                opacity: [0, 1, 0], 
                x: [0, 30, 0],
                scaleY: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute w-[1px] h-96 bg-[#00FFD1] blur-md hidden lg:block"
              style={{ right: '15%', boxShadow: '0 0 50px #00FFD1' }}
             />
          )}
        </div>

        {/* RIGHT: CONTENT */}
        <div className="flex flex-col gap-8 lg:col-span-5 lg:pl-10 z-10">
          
          {/* Section Header Label */}
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
              Scanning Birdeye’s new token stream in real-time. Neutralizing threats before they reach your wallet.
            </p>
          </div>

          {/* HUD SCAN CARD (Drives the "Real" feeling) */}
          <AnimatePresence mode='wait'>
            <motion.div 
              key={currentItem.name + scanIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className={`relative p-8 border-l-2 backdrop-blur-3xl transition-all duration-500 bg-white/[0.01] max-w-[400px]
                ${isSafe ? 'border-[#00FFD1] shadow-[0_0_60px_rgba(0,255,209,0.03)]' : 'border-[#FFB800] shadow-[0_0_60px_rgba(255,184,0,0.03)]'}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                    <p className="text-[9px] tracking-[0.3em] text-white/30 uppercase mb-2 font-mono">Target Identified</p>
                    <h3 className="text-3xl font-mono text-white tracking-widest uppercase">
                      ${currentItem.name}
                    </h3>
                </div>
                <div className="text-right">
                    <p className="text-[9px] tracking-[0.3em] text-white/30 uppercase mb-2 font-mono">Safety Index</p>
                    <div className="flex items-baseline justify-end gap-1">
                      <p className={`text-3xl font-bold font-mono ${isSafe ? 'text-[#00FFD1]' : 'text-[#FFB800]'}`}>
                        {isAnalyzing ? "???" : currentItem.score}
                      </p>
                      <span className="text-xs text-white/20">/100</span>
                    </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden mb-6">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: isAnalyzing ? '100%' : `${currentItem.score}%` }}
                  transition={{ duration: isAnalyzing ? 0.8 : 1.2 }}
                  className={`h-full ${isSafe ? 'bg-[#00FFD1]' : 'bg-[#FFB800]'}`}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isSafe ? (
                    <CheckCircle size={16} className="text-[#00FFD1]" />
                  ) : (
                    <AlertTriangle size={16} className="text-[#FFB800]" />
                  )}
                  <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${isSafe ? 'text-[#00FFD1]' : 'text-[#FFB800]'}`}>
                    {isAnalyzing ? "ANALYZING..." : `VERDICT: ${currentItem.status}`}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-white/20 font-mono block">LIQUIDITY: {currentItem.liquidity}</span>
                  <span className="text-[8px] text-white/20 font-mono uppercase">Sync: Optimal</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-2">
             <button 
              onClick={() => window.location.href = '/dashboard'}
              className="px-10 py-4 bg-[#8B5CF6] text-white text-[10px] font-bold tracking-[0.2em] rounded-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#8B5CF6]/20"
             >
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