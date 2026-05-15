'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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
        {/* FIX: Changed #dashboard to /dashboard to match your file structure */}
        <NavLink href="/dashboard">Dashboard</NavLink>
        
        {/* External link keeps target="_blank" */}
        <NavLink href="https://t.me/yourlink" target="_blank">Telegram</NavLink>
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
      `}</style>
    </nav>
  )
}

function NavLink({ href, children, target }: { href: string; children: React.ReactNode; target?: string }) {
  // Check if it's an internal route or external URL
  const isInternal = href.startsWith('/');

  return (
    <>
      {isInternal ? (
        <Link href={href} className="nav-link-item">
          {children}
        </Link>
      ) : (
        <a href={href} target={target} rel="noopener noreferrer" className="nav-link-item">
          {children}
        </a>
      )}
      
      <style jsx>{`
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
      `}</style>
    </>
  )
}