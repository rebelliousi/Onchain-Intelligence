"use client";

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// --- Types & Data ---
type Stat = { label: string; value: string; trend: string; color: string; icon: string };

const STATS: Stat[] = [
  { label: "Aura Balance", value: "$128,430.00", trend: "+12.5%", color: "var(--color-teal)", icon: "✨" },
  { label: "Neural Nodes", value: "42", trend: "Stable", color: "var(--color-purple)", icon: "🧠" },
  { label: "Aether Link", value: "99.98%", trend: "High", color: "var(--color-amber)", icon: "📡" },
  { label: "Compute Power", value: "842 TH/s", trend: "+2.4%", color: "var(--color-white)", icon: "⚡" },
];

const CHART_DATA = [
  { time: '00:00', load: 45 },
  { time: '04:00', load: 32 },
  { time: '08:00', load: 68 },
  { time: '12:00', load: 48 },
  { time: '16:00', load: 92 },
  { time: '20:00', load: 74 },
  { time: '23:59', load: 85 },
];

export default function AuraDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Fade for Header
      gsap.from(".header-content", { 
        y: -20, opacity: 0, duration: 1, ease: "power4.out" 
      });

      // 2. Staggered Stat Cards
      gsap.from(".stat-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.2
      });

      // 3. Chart Container Fade
      gsap.from(".chart-container", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: "power3.out"
      });

      // 4. Smooth Fade for Table
      gsap.from(".content-box", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
      });

      // 5. Floating Animation for Logo
      gsap.to(".logo-icon", {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="aura-wrapper" ref={containerRef}>
      <style jsx global>{`
        :root {
          --color-black: #050505;
          --color-teal: #00FFD1;
          --color-purple: #8B5CF6;
          --color-amber: #FFB800;
          --color-white: #FFFFFF;
          --color-gray: #A0A0A0;
          --max-width: 1200px;
        }

        .aura-wrapper {
          min-height: 100vh;
          background: var(--color-black);
          color: var(--color-white);
          font-family: 'Inter', system-ui, sans-serif;
          padding-bottom: 5rem;
          overflow-x: hidden;
          position: relative;
        }

        .aura-bg {
          position: fixed;
          top: -10%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 255, 209, 0.08) 0%, transparent 70%);
          filter: blur(60px);
          z-index: 0;
        }

        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          z-index: 1;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(5, 5, 5, 0.7);
        }

        .nav-container {
          max-width: var(--max-width);
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 2rem;
        }

        .logo {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--color-white);
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          letter-spacing: 2px;
        }

        .logo-icon {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, var(--color-teal), var(--color-purple));
          border-radius: 50%;
          box-shadow: 0 0 15px var(--color-teal);
        }

        .container {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 2rem;
        }

        .header-content { margin: 3rem 0; }
        .header-content h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          padding: 2rem;
          border-radius: 24px;
          transition: border-color 0.3s ease;
        }
        .stat-card:hover { border-color: var(--color-teal); }
        .stat-label { color: var(--color-gray); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
        .stat-value { font-size: 2.2rem; font-weight: 700; margin: 10px 0; }

        /* Recharts Section */
        .chart-container {
          padding: 2.5rem;
          border-radius: 30px;
          margin-bottom: 2rem;
          height: 400px; /* Fixed height for Recharts */
        }

        .content-box { padding: 2.5rem; border-radius: 30px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 2rem; }
        .table th { text-align: left; color: var(--color-gray); font-size: 0.8rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .table td { padding: 1.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }

        .btn-aura {
          background: transparent;
          border: 1px solid var(--color-teal);
          color: var(--color-teal);
          padding: 8px 20px;
          border-radius: 100px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-aura:hover {
          background: var(--color-teal);
          color: var(--color-black);
          box-shadow: 0 0 20px rgba(0, 255, 209, 0.3);
        }

        /* Customizing Recharts Tooltip styles via CSS */
        .recharts-tooltip-cursor { stroke: rgba(255,255,255,0.1); }
      `}</style>

      <div className="aura-bg" />

      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#" className="logo">
            <div className="logo-icon"></div>
            <span>AURA</span>
          </a>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <button className="btn-aura">Connect Node</button>
          </div>
        </div>
      </nav>

      <main className="container">
        <header className="header-content">
          <h1>System Overview</h1>
          <p style={{ color: 'var(--color-gray)' }}>Aura Neural Network is currently <span style={{ color: 'var(--color-teal)' }}>Stable</span>.</p>
        </header>

        {/* --- STATS --- */}
        <section className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="glass stat-card">
              <span className="stat-label">{s.label}</span>
              <div className="stat-value">{s.value}</div>
              <div style={{ color: s.color, fontWeight: 600, fontSize: '0.9rem' }}>{s.icon} {s.trend}</div>
            </div>
          ))}
        </section>

        {/* --- RECHARTS DIAGRAM --- */}
        <section className="glass chart-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3>Neural Throughput</h3>
            <span style={{ color: 'var(--color-purple)', fontSize: '0.9rem', fontWeight: 600 }}>Live Pulse</span>
          </div>

          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={CHART_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="auraGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-teal)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-teal)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(5, 5, 5, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}
                itemStyle={{ color: 'var(--color-teal)' }}
              />
              <Area 
                type="monotone" 
                dataKey="load" 
                stroke="var(--color-teal)" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#auraGradient)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </section>

        {/* --- DATA TABLE --- */}
        <section className="glass content-box">
          <h2 style={{ fontSize: '1.4rem' }}>Active Neural Clusters</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Cluster ID</th>
                <th>Priority</th>
                <th>Health</th>
                <th>Load</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--color-teal)' }}>#AURA-99-X</td>
                <td style={{ color: 'var(--color-purple)' }}>Urgent</td>
                <td>Healthy</td>
                <td>12%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--color-teal)' }}>#AURA-42-B</td>
                <td style={{ color: 'var(--color-gray)' }}>Normal</td>
                <td style={{ color: 'var(--color-amber)' }}>Throttled</td>
                <td>88%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--color-teal)' }}>#AURA-01-Z</td>
                <td style={{ color: 'var(--color-gray)' }}>Normal</td>
                <td>Healthy</td>
                <td>04%</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}