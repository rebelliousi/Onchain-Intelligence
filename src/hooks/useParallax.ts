'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxOptions {
  speed?: number      // how fast it moves. 0.5 = slow, 2 = fast. Default: 1
  direction?: 'up' | 'down' | 'left' | 'right'
  scrub?: number      // smoothness delay in seconds. 1 = smooth, 2 = very smooth
  opacity?: boolean   // fade out as you scroll?
  scale?: boolean     // shrink/grow as you scroll?
  rotate?: number     // rotate degrees as you scroll
}

export function useParallax<T extends HTMLElement>(options: ParallaxOptions = {}) {
  const ref = useRef<T>(null)

  const {
    speed = 1,
    direction = 'up',
    scrub = 1.5,
    opacity = false,
    scale = false,
    rotate = 0,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Calculate movement based on direction
    const distance = 80 * speed
    const moveX = direction === 'left' ? -distance : direction === 'right' ? distance : 0
    const moveY = direction === 'up' ? -distance : direction === 'down' ? distance : 0

    // Build animation object
    const animProps: gsap.TweenVars = {
      x: moveX,
      y: moveY,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub,         // scrub = smooth follow on scroll
      },
    }

    if (opacity) animProps.opacity = 0
    if (scale) animProps.scale = 0.92
    if (rotate) animProps.rotation = rotate

    const ctx = gsap.context(() => {
      gsap.to(el, animProps)
    })

    return () => ctx.revert()
  }, [speed, direction, scrub, opacity, scale, rotate])

  return ref
}


// ── Extra hooks for specific use cases ───────────────────

// For text that reveals word by word on scroll
export function useTextReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = el.querySelectorAll('.word')
    if (!words.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, y: 30, skewY: 3 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return ref
}


// For elements that fade + slide in on scroll
export function useFadeIn<T extends HTMLElement>(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  delay: number = 0
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fromX = direction === 'left' ? -40 : direction === 'right' ? 40 : 0
    const fromY = direction === 'up' ? 40 : direction === 'down' ? -40 : 0

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: fromX, y: fromY },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [direction, delay])

  return ref
}


// For a glowing orb that floats up slowly in the background
export function useFloatingOrb<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Float up and down on scroll
      gsap.to(el, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return ref
}