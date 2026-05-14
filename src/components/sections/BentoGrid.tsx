'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, TrendingUp, Zap, Radio } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Static fake data ──────────────────────────────────────
const TRENDING = [
  { name: '$BONK',  price: '$0.0000234', change: '+12.4%', up: true  },
  { name: '$WIF',   price: '$2.341',     change: '+8.7%',  up: true  },
  { name: '$POPCAT',price: '$0.821',     change: '-3.2%',  up: false },
  { name: '$MEW',   price: '$0.00912',   change: '+21.1%', up: true  },
  { name: '$BOME',  price: '$0.00741',   change: '-1.4%',  up: false },
]

const NEW_LISTINGS = [
  { name: '$AURA',  score: 98, status: 'SAFE'   },
  { name: '$NOVA',  score: 91, status: 'SAFE'   },
  { name: '$FLOKI', score: 44, status: 'RISK'   },
  { name: '$LUNAR', score: 87, status: 'SAFE'   },
]

// ── Animation variants ────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const boxVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Shared glass box style ────────────────────────────────
const glassStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '20px',
  padding: '24px',
  overflow: 'hidden',
  position: 'relative',
}

export default function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // GSAP headline animation
  useEffect(() => {
    if (!headlineRef.current) return

    gsap.fromTo(
      headlineRef.current.querySelectorAll('.gsap-word'),
      { opacity: 0, y: 50, skewY: 4 },
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  // GSAP number counter for security score
  useEffect(() => {
    const el = document.getElementById('security-score')
    if (!el) return

    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          { val: 0 },
          {
            val: 95,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val).toString()
            },
          }
        )
      },
    })
  }, [])

  // GSAP latency counter
  useEffect(() => {
    const el = document.getElementById('latency-val')
    if (!el) return

    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          { val: 500 },
          {
            val: 0.1,
            duration: 1.8,
            ease: 'power3.out',
            onUpdate: function () {
              const v = this.targets()[0].val
              el.textContent = v < 1 ? v.toFixed(1) : Math.round(v).toString()
            },
          }
        )
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#050505',
        padding: '120px 5vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background mesh */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 50% 50% at 80% 20%, rgba(139,92,246,0.07) 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,255,209,0.05) 0%, transparent 70%)
        `,
      }} />

      {/* Section headline */}
      <div ref={headlineRef} style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span className="gsap-word" style={{
          display: 'inline-block', opacity: 0,
          fontSize: '0.7rem', fontWeight: 300,
          letterSpacing: '0.4em', color: '#00FFD1',
          textTransform: 'uppercase', marginBottom: '16px',
        }}>
          THE LOGIC
        </span>

        <div style={{ overflow: 'hidden' }}>
          <h2 className="gsap-word" style={{
            display: 'block', opacity: 0,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700, color: '#FFFFFF',
            lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            Raw Data.
          </h2>
          <h2 className="gsap-word" style={{
            display: 'block', opacity: 0,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 100, color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            Pure Intelligence.
          </h2>
        </div>

        <p className="gsap-word" style={{
          opacity: 0, marginTop: '20px',
          fontSize: '0.9rem', fontWeight: 300,
          color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em',
        }}>
          Powered by Birdeye. Every token. Every trade. Every second.
        </p>
      </div>

      {/* BENTO GRID */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto',
          gap: '16px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >

        {/* BOX 1 — TRENDING NOW (big, spans 2 rows) */}
        <motion.div variants={boxVariants} style={{
          ...glassStyle,
          gridColumn: '1',
          gridRow: '1 / 3',
        }}>
          <TrendGlow />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <TrendingUp size={14} color="#00FFD1" />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#00FFD1', fontWeight: 400 }}>
              TRENDING NOW
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {TRENDING.map((token, i) => (
              <motion.div
                key={token.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#fff' }}>
                  {token.name}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                  {token.price}
                </span>
                <span style={{
                  fontSize: '0.75rem', fontWeight: 600,
                  color: token.up ? '#00FFD1' : '#FF4D4D',
                }}>
                  {token.change}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* BOX 2 — SECURITY SHIELD */}
        <motion.div variants={boxVariants} style={{
          ...glassStyle,
          gridColumn: '2',
          gridRow: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '220px',
        }}>
          <ShieldGlow />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Shield size={14} color="#00FFD1" />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#00FFD1' }}>
              SECURITY SHIELD
            </span>
          </div>

          {/* Big score number */}
          <div style={{ position: 'relative' }}>
            <span id="security-score" style={{
              fontSize: '4rem', fontWeight: 700,
              color: '#00FFD1',
              textShadow: '0 0 40px rgba(0,255,209,0.4)',
              lineHeight: 1,
            }}>
              0
            </span>
            <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.3)', fontWeight: 200 }}>
              /100
            </span>
          </div>
          <span style={{
            marginTop: '8px', fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em',
          }}>
            AVG SAFETY SCORE
          </span>
        </motion.div>

        {/* BOX 3 — NEW LISTINGS */}
        <motion.div variants={boxVariants} style={{
          ...glassStyle,
          gridColumn: '3',
          gridRow: '1 / 3',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Radio size={14} color="#8B5CF6" />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#8B5CF6' }}>
              NEW LISTINGS
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {NEW_LISTINGS.map((token, i) => (
              <motion.div
                key={token.name}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${token.status === 'SAFE' ? 'rgba(0,255,209,0.15)' : 'rgba(255,184,0,0.15)'}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>
                    {token.name}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>
                    Score: {token.score}/100
                  </div>
                </div>
                <span style={{
                  fontSize: '0.6rem', fontWeight: 600,
                  letterSpacing: '0.1em', padding: '4px 10px',
                  borderRadius: '100px',
                  background: token.status === 'SAFE' ? 'rgba(0,255,209,0.1)' : 'rgba(255,184,0,0.1)',
                  color: token.status === 'SAFE' ? '#00FFD1' : '#FFB800',
                  border: `1px solid ${token.status === 'SAFE' ? 'rgba(0,255,209,0.3)' : 'rgba(255,184,0,0.3)'}`,
                }}>
                  {token.status}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Latency */}
          <div style={{
            marginTop: '20px', padding: '14px',
            borderRadius: '12px',
            background: 'rgba(139,92,246,0.08)',
            border: '1px solid rgba(139,92,246,0.2)',
            textAlign: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Zap size={12} color="#8B5CF6" />
              <span id="latency-val" style={{
                fontSize: '1.5rem', fontWeight: 700, color: '#8B5CF6',
              }}>500</span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>ms</span>
            </div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
              DATA LATENCY
            </div>
          </div>
        </motion.div>

        {/* BOX 4 — VOLUME PULSE */}
        <motion.div variants={boxVariants} style={{
          ...glassStyle,
          gridColumn: '2',
          gridRow: '2',
          minHeight: '180px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Zap size={14} color="#FFB800" />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#FFB800' }}>
              VOLUME PULSE
            </span>
          </div>

          {/* Mini bar chart */}
          <VolumeBars inView={inView} />

          <div style={{
            marginTop: '12px', display: 'flex',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>24h Volume</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFB800' }}>$2.4B</span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}

// ── Mini components ───────────────────────────────────────

function VolumeBars({ inView }: { inView: boolean }) {
  const bars = [40, 65, 35, 80, 55, 90, 70, 45, 85, 60, 75, 95]

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px' }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.6 + i * 0.05, duration: 0.5, ease: 'backOut' }}
          style={{
            flex: 1,
            height: `${h}%`,
            borderRadius: '3px 3px 0 0',
            background: `rgba(255,184,0,${0.3 + (h / 100) * 0.7})`,
            transformOrigin: 'bottom',
          }}
        />
      ))}
    </div>
  )
}

// Decorative glow behind trending box
function TrendGlow() {
  return (
    <div style={{
      position: 'absolute', top: -40, left: -40,
      width: '150px', height: '150px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,255,209,0.08) 0%, transparent 70%)',
      pointerEvents: 'none',
    }} />
  )
}

// Decorative glow behind shield box
function ShieldGlow() {
  return (
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '140px', height: '140px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0,255,209,0.06) 0%, transparent 70%)',
      pointerEvents: 'none',
    }} />
  )
}