'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="logo-container">
        <span className="logo-text">AURA</span>
        <span className="logo-dot" />
      </Link>

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
          border: 1px solid #000000; 
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.8);
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          margin-left: 5px; 
        }

        .logo-text {
          font-size: 1.2rem;
          font-weight: 900;
          color: #00ffd1; 
          letter-spacing: 0.4em;
        }

        .logo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00ffd1;
          box-shadow: 0 0 10px #00ffd1;
        }

        .nav-links {
          display: flex;
          gap: 3rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .navbar { padding: 0 1.5rem; }
          .nav-links { display: none; }
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
      `}</style>
    </nav>
  )
}

function NavLink({ 
  href, 
  children, 
  target, 
  isButton 
}: { 
  href: string; 
  children: React.ReactNode; 
  target?: string;
  isButton?: boolean;
}) {
  const isInternal = href.startsWith('/');
  const linkClass = isButton ? "nav-button-item" : "nav-link-item";

  return (
    <>
      {isInternal ? (
        <Link href={href} className={linkClass}>
          {children}
        </Link>
      ) : (
        <a href={href} target={target} rel="noopener noreferrer" className={linkClass}>
          {children}
        </a>
      )}
      
      <style jsx>{`
        /* Standard Link Styles */
        .nav-link-item {
          position: relative;
          text-decoration: none;
          font-size: 0.7rem;
          font-weight: 600;
          color: rgba(0, 255, 209, 0.6); 
          letter-spacing: 0.25em;
          text-transform: uppercase;
          transition: color 0.3s ease;
          cursor: pointer;
          display: inline-block;
        }
        .nav-link-item:hover { color: #00ffd1; }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0;
          height: 1px;
          background: #00ffd1;
          transition: width 0.3s ease;
        }
        .nav-link-item:hover::after { width: 100%; }

        /* Button Link Styles */
        .nav-button-item {
          text-decoration: none;
          font-size: 0.7rem;
          font-weight: 700;
          color: #00ffd1;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 10px 24px;
          border: 1px solid rgba(0, 255, 209, 0.5);
          border-radius: 50px; /* Makes it fully rounded */
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-block;
          background: rgba(0, 255, 209, 0.05);
        }
        .nav-button-item:hover {
          background: rgba(0, 255, 209, 0.15);
          border-color: #00ffd1;
          box-shadow: 0 0 15px rgba(0, 255, 209, 0.3);
          transform: translateY(-1px);
        }
      `}</style>
    </>
  )
}