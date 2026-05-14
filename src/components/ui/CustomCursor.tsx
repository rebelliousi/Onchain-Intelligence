'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`
        dotRef.current.style.top = `${mouseY}px`
      }
    }

    // Big circle follows with delay (lerp)
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.08
      cursorY += (mouseY - cursorY) * 0.08

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX}px`
        cursorRef.current.style.top = `${cursorY}px`
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    animate()

    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      {/* Big glowing circle - follows with delay */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 255, 209, 0.5)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s, height 0.2s',
          boxShadow: '0 0 10px rgba(0, 255, 209, 0.2)',
        }}
      />
      {/* Small dot - follows instantly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: '#00FFD1',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          boxShadow: '0 0 6px #00FFD1',
        }}
      />
    </>
  )
}