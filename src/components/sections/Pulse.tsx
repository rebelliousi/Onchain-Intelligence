'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Shield, Zap, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useWhaleRadar } from '@/hooks/usePulse'

gsap.registerPlugin(ScrollTrigger)

export default function PulseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef(null)
  
  // 1. DATA HOOK
  const { data: whaleTokens, isLoading } = useWhaleRadar()
  
  /**
   * FIX: Starting index at 2 ensures that on first load, 
   * the carousel is balanced with cards on both sides (Image 1 look).
   */
  const [active, setActive] = useState(2)

  const tokens = whaleTokens || []

  // Entrance Animations
  useEffect(() => {
    if (!titleRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current!.querySelectorAll('.reveal'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 80%' } }
      )
    })
    return () => ctx.revert()
  }, [])

  const handleMove = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && active > 0) setActive(prev => prev - 1)
    if (direction === 'next' && active < tokens.length - 1) setActive(prev => prev + 1)
  }

  return (
    <section ref={sectionRef} style={{ background: '#050505', padding: '120px 0', position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      {/* Background Atmosphere */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(circle at 20% 50%, rgba(139,92,246,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,255,209,0.03) 0%, transparent 50%)` }} />

      {/* Header */}
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '80px', zIndex: 10 }}>
        <span className="reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', opacity: 0, fontSize: '0.65rem', letterSpacing: '0.5em', color: '#8B5CF6', marginBottom: '16px', fontWeight: 600 }}>
          <Zap size={12} fill="#8B5CF6" /> WHALE RADAR
        </span>
        <h2 className="reveal" style={{ opacity: 0, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>
            The Pulse of <br /> 
            <span style={{ background: 'linear-gradient(to right, #8B5CF6, #00FFD1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Big Money.</span>
        </h2>
      </div>

      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* THE 3D CAROUSEL */}
        <div 
          ref={carouselRef}
          style={{
            position: 'relative',
            height: '540px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px', // FIX: Lower perspective creates deeper 3D depth
          }}
        >
          {isLoading ? (
             <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-[#00FFD1]" size={30} />
                <span className="text-[10px] text-white/20 tracking-[0.4em] uppercase">Initializing Pulse...</span>
             </div>
          ) : (
            tokens.map((token, i) => {
              const offset = i - active
              const absOffset = Math.abs(offset)
              
              // Only render the center card + 2 on each side
              if (absOffset > 2) return null 

              return (
                <motion.div
                  key={token.name + i}
                  onClick={() => setActive(i)}
                  initial={false}
                  animate={{
                    /**
                     * MATH FIX: Matches Image 1 layout exactly.
                     * Side cards are pushed back further (-350z) and rotated (-45deg).
                     */
                    x: offset * 330, 
                    z: absOffset === 0 ? 0 : -350 * absOffset,
                    rotateY: offset * -45,
                    opacity: 1 - absOffset * 0.4,
                    scale: 1 - absOffset * 0.1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 18,
                  }}
                  style={{
                    position: 'absolute',
                    zIndex: tokens.length - absOffset,
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <TokenCard token={token} isActive={i === active} />
                </motion.div>
              )
            })
          )}
        </div>

        {/* NAVIGATION DOTS */}
        {!isLoading && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '60px', zIndex: 20 }}>
            {tokens.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                animate={{
                  width: i === active ? 32 : 8,
                  background: i === active ? '#00FFD1' : 'rgba(255,255,255,0.1)',
                }}
                style={{ height: '6px', borderRadius: '100px', border: 'none', cursor: 'pointer', padding: 0 }}
              />
            ))}
          </div>
        )}

        {/* NAVIGATION ARROWS */}
        {/* <div style={{ display: 'flex', gap: '20px', marginTop: '30px', zIndex: 20 }}>
          <button onClick={() => handleMove('prev')} disabled={active === 0} className="nav-btn"> <ChevronLeft size={20} /> </button>
          <button onClick={() => handleMove('next')} disabled={active === tokens.length - 1} className="nav-btn"> <ChevronRight size={20} /> </button>
        </div> */}
      </div>

      <style jsx>{`
        .nav-btn {
          width: 54px; height: 54px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02); color: white; cursor: pointer; transition: 0.3s;
          display: flex; align-items: center; justify-content: center;
        }
        .nav-btn:hover:not(:disabled) { border-color: #8B5CF6; color: #8B5CF6; background: rgba(139,92,246,0.05); }
        .nav-btn:disabled { opacity: 0.1; cursor: default; }
      `}</style>
    </section>
  )
}

function TokenCard({ token, isActive }: any) {
  const isUp = !token.change.startsWith('-')

  return (
    <div style={{
      width: '340px', 
      padding: '40px 32px',
      background: isActive ? 'rgba(10,10,10,0.98)' : 'rgba(5,5,5,0.6)',
      borderLeft: `2px solid ${isActive ? '#00FFD1' : 'rgba(255,255,255,0.1)'}`,
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderRight: '1px solid rgba(255,255,255,0.03)',
      borderBottom: '1px solid rgba(255,255,255,0.03)',
      borderRadius: '2px', // Sharp HUD Corners
      backdropFilter: 'blur(30px)',
      boxShadow: isActive ? `0 60px 100px rgba(0,0,0,0.9)` : 'none',
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Corner Detail */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)', opacity: isActive ? 1 : 0 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <span style={{ fontSize: '0.65rem', color: '#00FFD1', fontWeight: 800, letterSpacing: '0.25em' }}>
          WHALE TARGET
        </span>
        <Shield size={18} color={isActive ? '#00FFD1' : '#333'} />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '3.2rem', fontWeight: 200, color: '#fff', margin: 0, letterSpacing: '-0.05em' }}>{token.name}</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '12px' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', fontFamily: 'monospace' }}>{token.price}</span>
          <span style={{ color: isUp ? '#00FFD1' : '#FF4D4D', fontWeight: 600, fontSize: '0.8rem', background: isUp ? 'rgba(0,255,209,0.05)' : 'rgba(255,77,77,0.05)', padding: '4px 10px', borderRadius: '4px' }}>{token.change}</span>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginBottom: '12px', letterSpacing: '0.1em' }}>
          <span>SAFETY INDEX</span>
          <span style={{ color: '#fff' }}>{token.score}<span style={{ opacity: 0.3 }}>/100</span></span>
        </div>
        <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={isActive ? { width: `${token.score}%` } : { width: 0 }}
            transition={{ duration: 1.5, ease: 'circOut' }}
            style={{ height: '100%', background: 'linear-gradient(to right, #00FFD1, transparent)' }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
        <div>
          <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', margin: '0 0 6px 0', letterSpacing: '0.1em' }}>24H WHALE VOL</p>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', margin: 0, fontFamily: 'monospace' }}>{token.vol}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', margin: '0 0 6px 0', letterSpacing: '0.1em' }}>AI VERDICT</p>
          <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#00FFD1', margin: 0 }}>SECURE</p>
        </div>
      </div>
    </div>
  )
}