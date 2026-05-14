'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 3rem',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        // Glass effect
        background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}
    >
      {/* 1. LEFT - Logo (flex-1 ensures it takes space) */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontSize: '1.3rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.2em',
            }}>
              AURA
            </span>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#00FFD1',
              boxShadow: '0 0 12px #00FFD1',
            }} />
          </div>
        </Link>
      </div>

      {/* 2. CENTER - Navigation Links (The Absolute Center) */}
      <div style={{
        display: 'flex',
        gap: '2.5rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {['Dashboard', 'Security', 'AI Sentinel'].map((link) => (
          <NavLink key={link} href={`/${link.toLowerCase().replace(' ', '-')}`}>
            {link}
          </NavLink>
        ))}
      </div>

      {/* 3. RIGHT - Actions (flex-1 matches the left side) */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        gap: '2rem' 
      }}>
        <div className="hidden lg:flex" style={{ gap: '2rem' }}>
          {['Telegram', 'Mission'].map((link) => (
            <NavLink key={link} href={`/${link.toLowerCase()}`}>
              {link}
            </NavLink>
          ))}
        </div>

        {/* Enter App Button */}
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <button style={{
            padding: '10px 24px',
            borderRadius: '100px',
            border: '1px solid rgba(0, 255, 209, 0.4)',
            background: 'rgba(0, 255, 209, 0.08)',
            color: '#00FFD1',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            cursor: 'none',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap'
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0, 255, 209, 0.2)'
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 25px rgba(0,255,209,0.3)'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0, 255, 209, 0.8)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0, 255, 209, 0.08)'
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0, 255, 209, 0.4)'
            }}
          >
            ENTER APP
          </button>
        </Link>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <span style={{
        fontSize: '0.8rem',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: '0.1em',
        transition: 'all 0.3s ease',
        cursor: 'none',
        whiteSpace: 'nowrap'
      }}
        onMouseEnter={e => {
          (e.target as HTMLElement).style.color = '#00FFD1'
          ;(e.target as HTMLElement).style.textShadow = '0 0 10px rgba(0,255,209,0.5)'
        }}
        onMouseLeave={e => {
          (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)'
          ;(e.target as HTMLElement).style.textShadow = 'none'
        }}
      >
        {children}
      </span>
    </Link>
  )
}