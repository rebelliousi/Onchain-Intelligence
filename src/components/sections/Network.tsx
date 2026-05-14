'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Zap, TrendingUp, Activity, Globe } from 'lucide-react'
import Spline from '@splinetool/react-spline'

gsap.registerPlugin(ScrollTrigger)

export default function NetworkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // Sayı sayacı animasyonu
  useEffect(() => {
    const counters = [
      { id: 'net-tokens', target: 10247 },
      { id: 'net-security', target: 94 },
      { id: 'net-volume', target: 2.4 },
    ]

    counters.forEach(({ id, target }) => {
      const el = document.getElementById(id)
      if (!el) return

      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            { val: 0 },
            {
              val: target,
              duration: 2.5,
              ease: 'power3.out',
              onUpdate: function () {
                const v = this.targets()[0].val
                el.textContent = target < 10 
                  ? v.toFixed(1) 
                  : Math.round(v).toLocaleString()
              },
            }
          )
        },
      })
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#050505',
        padding: '160px 5vw',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* 1. ARKA PLAN: Premium Mesh Gradients */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(circle at 20% 40%, rgba(0,255,209,0.07) 0%, transparent 50%),
          radial-gradient(circle at 80% 60%, rgba(139,92,246,0.08) 0%, transparent 50%)
        `,
      }} />

      {/* 2. BAŞLIK ALANI */}
      <div style={{ textAlign: 'center', marginBottom: '100px', position: 'relative', zIndex: 10 }}>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{
            fontSize: '0.65rem', fontWeight: 400,
            letterSpacing: '0.6em', color: '#00FFD1',
            textTransform: 'uppercase', display: 'block',
            marginBottom: '20px',
          }}
        >
          Neural Infrastructure
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 800, color: '#FFFFFF',
            lineHeight: 0.9, letterSpacing: '-0.04em',
          }}
        >
          The Intelligence <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 200 }}>Grid.</span>
        </motion.h2>
      </div>

      {/* 3. ANA İÇERİK: Spline (Sol) + HUD Cards (Sağ) */}
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 5
        }}
      >
        
        {/* SOL TARAF: Spline Neural Network */}
        <div style={{ 
          position: 'relative', 
          width: '600px', 
          height: '600px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          {/* Tarama Halkası Efekti (Spline Arkasında) */}
          <div className="absolute w-full h-full rounded-full border border-teal-500/10 animate-[ping_5s_infinite] pointer-events-none" />
          
          <div style={{ width: '100%', height: '100%', transform: 'scale(1.2)' }}>
            <Spline scene="https://prod.spline.design/h1aTd4gY6NLiRz8u/scene.splinecode" />
          </div>
        </div>

        {/* SAĞ TARAF: Modern HUD Cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '420px',
        }}>
          
          {/* Card 1: Network Load */}
          <HUDCard 
            icon={<Activity size={18} />} 
            label="Real-time Throughput"
            valueId="net-tokens"
            unit="TPS"
            color="#00FFD1"
            delay={0.2}
          />

          {/* Card 2: Security Index */}
          <HUDCard 
            icon={<Shield size={18} />} 
            label="Security Protocol"
            valueId="net-security"
            unit="% Integrity"
            color="#8B5CF6"
            delay={0.4}
          />

          {/* Card 3: Global Volume (Mini Chart) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              padding: '24px',
              borderRadius: '1px', // Köşeli tasarım daha modern durur
              background: 'rgba(255,255,255,0.02)',
              borderLeft: '2px solid #FFB800',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
             {/* İç Tarama Çizgisi Animasyonu */}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'linear-gradient(to bottom, transparent, rgba(255,184,0,0.05), transparent)',
              animation: 'scan 3s linear infinite'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)' }}>MARKET PULSE</span>
              <Zap size={14} color="#FFB800" />
            </div>
            
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '5px' }}>
              $<span id="net-volume">0</span>B
            </div>
            <div style={{ height: '40px', width: '100%', opacity: 0.5 }}>
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                <path d="M0 15 L10 12 L20 18 L30 10 L40 14 L50 5 L60 12 L70 8 L80 15 L90 3 L100 10" fill="none" stroke="#FFB800" strokeWidth="1" />
              </svg>
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  )
}

// Özel HUD Kart Bileşeni
function HUDCard({ icon, label, valueId, unit, color, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: '24px',
        background: 'rgba(255,255,255,0.01)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderLeft: `2px solid ${color}`,
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* İkon Kutusu */}
      <div style={{
        width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${color}10`,
        color: color
      }}>
        {icon}
      </div>

      <div>
        <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '4px' }}>
          {label}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span id={valueId} style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }}>0</span>
          <span style={{ fontSize: '0.7rem', color: color, fontWeight: 500, letterSpacing: '0.1em' }}>{unit}</span>
        </div>
      </div>

      {/* Modern Köşe Süslemesi */}
      <div style={{ position: 'absolute', top: '0', right: '0', width: '10px', height: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }} />
    </motion.div>
  )
}