'use client'

import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useParallax } from '@/hooks/useParallax'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const splineWrapRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Parallax hooks
  const splineRef = useParallax<HTMLDivElement>({ speed: 0.6, direction: 'up', scrub: 2 })
  const headlineRef = useParallax<HTMLDivElement>({ speed: 1, direction: 'up', scrub: 1.5, opacity: true })
  const orbLeftRef = useParallax<HTMLDivElement>({ speed: 0.4, direction: 'down', scrub: 3 })
  const orbRightRef = useParallax<HTMLDivElement>({ speed: 0.3, direction: 'up', scrub: 3 })

  useEffect(() => {
    // Master GSAP timeline — runs once on page load
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Step 1 — Black overlay fades out (like a cinema opening)
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
    })

    // Step 2 — Spline coin scales up from small + fades in
    .fromTo(splineWrapRef.current,
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' },
      '-=0.6' // overlap with overlay fade
    )

    // Step 3 — Small label flies up
    .fromTo(labelRef.current,
      { opacity: 0, y: 20, letterSpacing: '0.8em' },
      { opacity: 1, y: 0, letterSpacing: '0.4em', duration: 0.9 },
      '-=0.4'
    )

    // Step 4 — AURA title slams in with slight scale
    .fromTo(titleRef.current,
      { opacity: 0, y: 50, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out' },
      '-=0.5'
    )

    // Step 5 — Sub text fades in
    .fromTo(subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    )

    // Step 6 — Button pops in with bounce
    .fromTo(btnRef.current,
      { opacity: 0, y: 16, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)' },
      '-=0.4'
    )

    // Step 7 — Scroll indicator fades in last
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 0.4, duration: 0.8 },
      '-=0.2'
    )

    // Orbs fade in gently
    .fromTo([orbLeftRef.current, orbRightRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 2, stagger: 0.3 },
      0.4
    )

    return () => { tl.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#050505',
      }}
    >
      {/* Cinema black overlay — fades out on load */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0,
          background: '#000000',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Background glow orbs */}
      <div ref={orbLeftRef} style={{
        position: 'absolute', top: '20%', left: '5%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,209,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0, opacity: 0,
      }} />
      <div ref={orbRightRef} style={{
        position: 'absolute', top: '30%', right: '5%',
        width: '250px', height: '250px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0, opacity: 0,
      }} />

      {/* Spline coin — parallax + entrance */}
      <div ref={splineRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <div
          ref={splineWrapRef}
          style={{ width: '100%', height: '100%', opacity: 0 }}
        >
          <Spline
            scene="https://prod.spline.design/1Nb5xa6Ivshw5ftR/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Mesh gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 40% 40% at 10% 10%, rgba(0,255,209,0.05) 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 90% 90%, rgba(139,92,246,0.05) 0%, transparent 70%)
        `,
      }} />

      {/* Text layer — parallax + entrance */}
      <div ref={headlineRef} style={{
        position: 'absolute', bottom: '10%',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 3, textAlign: 'center', width: '100%',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '12px',
        }}>
          {/* Label */}
          <span
            ref={labelRef}
            style={{
              fontSize: '0.7rem', fontWeight: 300,
              letterSpacing: '0.4em', color: '#00FFD1',
              textTransform: 'uppercase', opacity: 0,
              display: 'block',
            }}
          >
            Onchain Intelligence
          </span>

          {/* AURA */}
          <h1
            ref={titleRef}
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 700, color: '#FFFFFF',
              letterSpacing: '0.05em', lineHeight: 1,
              opacity: 0, margin: 0,
            }}
          >
            AURA
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              fontWeight: 200, color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.1em', opacity: 0, margin: 0,
            }}
          >
            The Alpha Standard.
          </p>

          {/* Button */}
          <button
            ref={btnRef}
            style={{
              marginTop: '8px', padding: '14px 36px',
              borderRadius: '100px',
              border: '1px solid rgba(0,255,209,0.3)',
              background: 'rgba(0,255,209,0.08)',
              color: '#00FFD1', fontSize: '0.8rem',
              fontWeight: 400, letterSpacing: '0.2em',
              cursor: 'pointer', transition: 'all 0.3s ease',
              opacity: 0,
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
      <div
        ref={scrollRef}
        style={{
          position: 'absolute', bottom: '2%', left: '50%',
          transform: 'translateX(-50%)', zIndex: 4,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '6px', opacity: 0,
        }}
      >
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: '#fff' }}>
          SCROLL
        </span>
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