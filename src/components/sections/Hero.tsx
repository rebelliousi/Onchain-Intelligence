'use client'

import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useParallax } from '@/hooks/useParallax'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null)

  // Spline moves up slowly as user scrolls
  const splineRef = useParallax<HTMLDivElement>({ speed: 0.6, direction: 'up', scrub: 2 })

  // Headline moves up faster than spline = depth feeling
  const headlineRef = useParallax<HTMLDivElement>({ speed: 1, direction: 'up', scrub: 1.5, opacity: true })

  // Background orbs move in opposite directions
  const orbLeftRef = useParallax<HTMLDivElement>({ speed: 0.4, direction: 'down', scrub: 3 })
  const orbRightRef = useParallax<HTMLDivElement>({ speed: 0.3, direction: 'up', scrub: 3 })

  // Text entrance on page load
  useEffect(() => {
    if (!textRef.current) return
    gsap.fromTo(
      textRef.current.children,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  return (
    <section style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#050505',
    }}>

      {/* Background glow orbs with parallax */}
      <div ref={orbLeftRef} style={{
        position: 'absolute', top: '20%', left: '5%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,209,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div ref={orbRightRef} style={{
        position: 'absolute', top: '30%', right: '5%',
        width: '250px', height: '250px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Spline coin — moves up slowly on scroll */}
      <div ref={splineRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Spline
          scene="https://prod.spline.design/1Nb5xa6Ivshw5ftR/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Mesh gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 40% 40% at 10% 10%, rgba(0,255,209,0.05) 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 90% 90%, rgba(139,92,246,0.05) 0%, transparent 70%)
        `,
      }} />

      {/* Text — moves up faster on scroll */}
      <div ref={headlineRef} style={{
        position: 'absolute', bottom: '10%',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 3, textAlign: 'center', width: '100%',
      }}>
        <div ref={textRef} style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '12px',
        }}>
          <span style={{
            fontSize: '0.7rem', fontWeight: 300,
            letterSpacing: '0.4em', color: '#00FFD1',
            textTransform: 'uppercase', opacity: 0,
          }}>
            Onchain Intelligence
          </span>

          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 700, color: '#FFFFFF',
            letterSpacing: '0.05em', lineHeight: 1, opacity: 0,
          }}>
            AURA
          </h1>

          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            fontWeight: 200, color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.1em', opacity: 0,
          }}>
            The Alpha Standard.
          </p>

          <button
            style={{
              marginTop: '8px', padding: '14px 36px',
              borderRadius: '100px',
              border: '1px solid rgba(0,255,209,0.3)',
              background: 'rgba(0,255,209,0.08)',
              color: '#00FFD1', fontSize: '0.8rem',
              fontWeight: 400, letterSpacing: '0.2em',
              cursor: 'none', transition: 'all 0.3s ease', opacity: 0,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.background = 'rgba(0,255,209,0.15)'
              el.style.boxShadow = '0 0 30px rgba(0,255,209,0.25)'
              el.style.borderColor = 'rgba(0,255,209,0.6)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.background = 'rgba(0,255,209,0.08)'
              el.style.boxShadow = 'none'
              el.style.borderColor = 'rgba(0,255,209,0.3)'
            }}
            onClick={() => window.location.href = '/dashboard'}
          >
            ENTER DASHBOARD
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2%', left: '50%',
        transform: 'translateX(-50%)', zIndex: 4,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '6px', opacity: 0.4,
      }}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#fff' }}>SCROLL</span>
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(to bottom, #00FFD1, transparent)',
        }} />
      </div>

      {/* Bottom fade to next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '150px',
        background: 'linear-gradient(to bottom, transparent, #050505)',
        zIndex: 4, pointerEvents: 'none',
      }} />
    </section>
  )
}