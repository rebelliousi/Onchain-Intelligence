'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, TrendingUp, Activity, Zap } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOKENS = [
  { name: '$BONK',   price: '$0.0000234', change: '+12.4%', score: 97, status: 'SAFE',   vol: '$2.3M' },
  { name: '$WIF',    price: '$2.341',     change: '+8.7%',  score: 91, status: 'SAFE',   vol: '$5.1M' },
  { name: '$AURA',   price: '$0.482',     change: '+34.2%', score: 99, status: 'SAFE',   vol: '$1.2M' },
  { name: '$NOVA',   price: '$0.00912',   change: '+21.1%', score: 88, status: 'SAFE',   vol: '$890K' },
  { name: '$RUGX',   price: '$0.00001',   change: '-54.2%', score: 8,  status: 'RISK',   vol: '$120K' },
  { name: '$POPCAT', price: '$0.821',     change: '-3.2%',  score: 72, status: 'SAFE',   vol: '$3.4M' },
]

export default function PulseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef(null)
  const inView = useInView(carouselRef, { once: true, margin: '-100px' })

  const [active, setActive] = useState(2)

  useEffect(() => {
    if (!titleRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current!.querySelectorAll('.reveal'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          stagger: 0.1, duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const handleMove = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && active > 0) setActive(prev => prev - 1)
    if (direction === 'next' && active < TOKENS.length - 1) setActive(prev => prev + 1)
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#050505',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* 1. PURPLE & TEAL ATMOSPHERE (Bağlantı burası) */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
            radial-gradient(circle at 20% 50%, rgba(139,92,246,0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(0,255,209,0.03) 0%, transparent 50%)
        `,
      }} />

      {/* Header */}
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '80px', zIndex: 10 }}>
        <span className="reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', opacity: 0, fontSize: '0.65rem', letterSpacing: '0.5em', color: '#8B5CF6', marginBottom: '16px', fontWeight: 600 }}>
          <Zap size={12} fill="#8B5CF6" /> THE PULSE
        </span>
        <h2 className="reveal" style={{ opacity: 0, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>
            Live Market <br /> 
            <span style={{ 
                background: 'linear-gradient(to right, #8B5CF6, #00FFD1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>Momentum.</span>
        </h2>
        <p className="reveal" style={{ opacity: 0, marginTop: '24px', color: 'rgba(255,255,255,0.4)', fontWeight: 300, letterSpacing: '0.05em' }}>Verified tokens passing Sentinel's core security check.</p>
      </div>

      {/* Carousel Container */}
      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div 
          ref={carouselRef}
          style={{
            position: 'relative',
            height: '520px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1500px',
          }}
        >
          {TOKENS.map((token, i) => {
            const offset = i - active
            const absOffset = Math.abs(offset)

            const rotateY = offset === 0 ? 0 : offset > 0 ? -45 : 45
            const translateX = offset * 300 
            const translateZ = absOffset === 0 ? 0 : -250 * absOffset
            const scale = 1 - absOffset * 0.15
            const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.4

            return (
              <motion.div
                key={token.name}
                onClick={() => setActive(i)}
                initial={false}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 22,
                }}
                style={{
                  position: 'absolute',
                  zIndex: TOKENS.length - absOffset,
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                }}
              >
                <TokenCard token={token} isActive={i === active} inView={inView} />
              </motion.div>
            )
          })}
        </div>

        {/* Navigation - Dots */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '50px', zIndex: 20 }}>
          {TOKENS.map((_, i) => (
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

        {/* Navigation - Arrows */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px', zIndex: 20 }}>
          <button 
            onClick={() => handleMove('prev')}
            disabled={active === 0}
            className="nav-btn"
            style={{ opacity: active === 0 ? 0.2 : 1 }}
          > ← </button>
          <button 
            onClick={() => handleMove('next')}
            disabled={active === TOKENS.length - 1}
            className="nav-btn"
            style={{ opacity: active === TOKENS.length - 1 ? 0.2 : 1 }}
          > → </button>
        </div>
      </div>

      <style jsx>{`
        .nav-btn {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          color: white;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }
        .nav-btn:hover:not(:disabled) {
          border-color: #8B5CF6;
          color: #8B5CF6;
          background: rgba(139,92,246,0.05);
          transform: scale(1.05);
        }
      `}</style>
    </section>
  )
}

function TokenCard({ token, isActive, inView }: any) {
  const isSafe = token.score > 70
  const isUp = token.change.startsWith('+')

  return (
    <div style={{
      width: '320px', 
      padding: '36px 32px',
      borderRadius: '2px', // Keskin köşeler daha HUD/Modern durur
      background: isActive ? 'rgba(15,15,15,0.95)' : 'rgba(10,10,10,0.4)',
      borderLeft: `2px solid ${isActive ? (isSafe ? '#00FFD1' : '#FFB800') : 'rgba(255,255,255,0.1)'}`,
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderRight: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      backdropFilter: 'blur(20px)',
      boxShadow: isActive ? `0 40px 100px rgba(0,0,0,0.8)` : 'none',
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* HUD Accent Corner */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)', opacity: isActive ? 1 : 0 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <span style={{ fontSize: '0.6rem', color: isSafe ? '#00FFD1' : '#FFB800', fontWeight: 800, letterSpacing: '0.2em' }}>
          {isSafe ? 'SENTINEL VERIFIED' : 'RISK DETECTED'}
        </span>
        <Shield size={16} color={isActive ? (isSafe ? '#00FFD1' : '#FFB800') : '#333'} />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '2.5rem', fontWeight: 200, color: '#fff', margin: 0, letterSpacing: '-0.05em' }}>{token.name}</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', fontWeight: 400, fontFamily: 'monospace' }}>{token.price}</span>
          <span style={{ color: isUp ? '#00FFD1' : '#FF4D4D', fontWeight: 600, fontSize: '0.8rem', background: isUp ? 'rgba(0,255,209,0.05)' : 'rgba(255,77,77,0.05)', padding: '2px 8px', borderRadius: '4px' }}>{token.change}</span>
        </div>
      </div>

      <div style={{ marginBottom: '35px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginBottom: '12px', fontWeight: 600, letterSpacing: '0.1em' }}>
          <span>SAFETY INDEX</span>
          <span style={{ color: '#fff' }}>{token.score}<span style={{ opacity: 0.3 }}>/100</span></span>
        </div>
        <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={isActive ? { width: `${token.score}%` } : { width: 0 }}
            transition={{ duration: 1.5, ease: 'circOut' }}
            style={{ height: '100%', background: `linear-gradient(to right, ${isSafe ? '#00FFD1' : '#FFB800'}, transparent)` }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
        <div>
          <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)', margin: '0 0 6px 0', letterSpacing: '0.1em', fontWeight: 700 }}>VOLUME 24H</p>
          <p style={{ fontSize: '1rem', fontWeight: 500, color: '#fff', margin: 0, fontFamily: 'monospace' }}>{token.vol}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)', margin: '0 0 6px 0', letterSpacing: '0.1em', fontWeight: 700 }}>AI VERDICT</p>
          <p style={{ fontSize: '0.7rem', fontWeight: 800, color: isSafe ? '#00FFD1' : '#FFB800', margin: 0, letterSpacing: '0.1em' }}>{isSafe ? 'SECURE' : 'CAUTION'}</p>
        </div>
      </div>
    </div>
  )
}