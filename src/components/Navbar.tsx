'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>

      {/* LEFT — Logo */}
      <Link href="/" className="logo-container">
        <span className="logo-text">AURA</span>
        <motion.span
          className="logo-dot"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </Link>

      {/* RIGHT — Dashboard Button */}
      <div className="nav-links">
        <Link href="/dashboard" className="dashboard-btn">
          {/* Sweep glow */}
          <motion.span
            className="btn-sweep"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          />
          {/* Pulse dot */}
          <motion.span
            className="btn-dot"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="btn-text">Dashboard</span>
          {/* Arrow */}
          <motion.span
            className="btn-arrow"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.span>
        </Link>
      </div>

      <style jsx>{`
        /* ── Navbar shell ── */
        .navbar {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4rem;
          z-index: 9999;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          background: transparent;
          border: none !important;
          outline: none !important;
        }
        .navbar.scrolled {
          top: 20px;
          width: 90%;
          max-width: 1200px;
          height: 64px;
          border-radius: 20px;
          padding: 0 2.5rem;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(0, 255, 209, 0.08) !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.8);
        }

        /* ── Logo ── */
        .logo-container {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-left: 5px;
        }
        .logo-text {
          font-size: 1.2rem;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.4em;
        }
        .logo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00ffd1;
          box-shadow: 0 0 10px #00ffd1;
          display: inline-block;
        }

        .nav-links {
          display: flex;
          align-items: center;
        }

        /* ── Dashboard button ── */
        .dashboard-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          padding: 11px 26px;
          border-radius: 100px;
          background: rgba(0, 255, 209, 0.06);
          border: 1px solid rgba(0, 255, 209, 0.25);
          overflow: hidden;
          transition: all 0.35s ease;
        }
        .dashboard-btn:hover {
          background: rgba(0, 255, 209, 0.12);
          border-color: rgba(0, 255, 209, 0.55);
          box-shadow:
            0 0 24px rgba(0, 255, 209, 0.18),
            inset 0 0 24px rgba(0, 255, 209, 0.04);
          transform: translateY(-1px);
        }
        .dashboard-btn:active {
          transform: translateY(0px);
        }

        /* Sweep glow that moves across the button */
        .btn-sweep {
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(0, 255, 209, 0.14),
            transparent
          );
          pointer-events: none;
          display: block;
        }

        /* Small glowing dot left of text */
        .btn-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00ffd1;
          box-shadow: 0 0 8px #00ffd1;
          display: inline-block;
          flex-shrink: 0;
        }

        .btn-text {
          font-size: 0.72rem;
          font-weight: 700;
          color: #00ffd1;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          position: relative;
        }

        .btn-arrow {
          font-size: 0.9rem;
          color: rgba(0, 255, 209, 0.7);
          display: inline-block;
          position: relative;
        }

        @media (max-width: 768px) {
          .navbar { padding: 0 1.5rem; }
          .nav-links { display: none; }
        }
      `}</style>
    </nav>
  )
}