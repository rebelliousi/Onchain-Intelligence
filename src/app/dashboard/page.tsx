"use client";

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  AreaChart, 
  Area, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useDashboardStats, useSmartMoney } from '@/hooks/useDashboard';

export default function AuraDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. FETCH LIVE DATA
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: smartMoney, isLoading: tableLoading } = useSmartMoney();

  // Mapping live stats to your UI boxes
  const STATS_CARDS = [
    { label: "Solana 24H Volume", value: stats?.volume || "$2.4B", trend: "+2.4%", color: "var(--color-teal)", icon: "📊" },
    { label: "Neural Nodes", value: stats?.activeNodes || "42", trend: "Optimal", color: "var(--color-purple)", icon: "🧠" },
    { label: "Aether Latency", value: stats?.latency || "14.2ms", trend: "Stable", color: "var(--color-amber)", icon: "📡" },
    { label: "Network Throughput", value: (stats?.tps || "2,423") + " TPS", trend: "High", color: "var(--color-white)", icon: "⚡" },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".header-content", { y: -20, opacity: 0, duration: 1, ease: "power4.out" });
      gsap.from(".stat-card", { y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)", delay: 0.2 });
      gsap.from(".chart-container", { opacity: 0, y: 30, duration: 1, delay: 0.5 });
      gsap.from(".content-box", { opacity: 0, y: 30, duration: 1, delay: 0.7 });
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
        .aura-wrapper { min-height: 100vh; background: var(--color-black); color: var(--color-white); font-family: 'Inter', sans-serif; padding-bottom: 5rem; }
        .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.08); }
        .navbar { position: sticky; top: 0; z-index: 100; border-bottom: 1px solid rgba(255, 255, 255, 0.1); background: rgba(5, 5, 5, 0.8); }
        .nav-container { max-width: var(--max-width); margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 1.2rem 2rem; }
        .logo { font-size: 1.4rem; font-weight: 800; color: var(--color-white); display: flex; align-items: center; gap: 12px; text-decoration: none; letter-spacing: 2px; }
        .container { max-width: var(--max-width); margin: 0 auto; padding: 0 2rem; }
        .header-content { margin: 3rem 0; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .stat-card { padding: 2rem; border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); }
        .stat-label { color: var(--color-gray); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; }
        .stat-value { font-size: 2rem; font-weight: 700; margin: 10px 0; }
        .chart-container { padding: 2.5rem; border-radius: 30px; margin-bottom: 2rem; height: 400px; }
        .content-box { padding: 2.5rem; border-radius: 30px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 2rem; }
        .table th { text-align: left; color: var(--color-gray); font-size: 0.8rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .table td { padding: 1.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .btn-aura { background: transparent; border: 1px solid var(--color-teal); color: var(--color-teal); padding: 8px 20px; border-radius: 100px; font-weight: 600; cursor: pointer; }
      `}</style>

      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            <div style={{ width: '20px', height: '20px', background: 'var(--color-teal)', borderRadius: '50%', boxShadow: '0 0 15px var(--color-teal)' }}></div>
            <span>AURA</span>
          </a>
          <button className="btn-aura">Connected</button>
        </div>
      </nav>

      <main className="container">
        <header className="header-content">
          <h1>System Overview</h1>
          <p style={{ color: 'var(--color-gray)' }}>AURA Intelligence is currently <span style={{ color: 'var(--color-teal)' }}>Operational</span>.</p>
        </header>

        {/* --- STATS BOXES (LIVE) --- */}
        <section className="stats-grid">
          {STATS_CARDS.map((s, i) => (
            <div key={i} className="glass stat-card">
              <span className="stat-label">{s.label}</span>
              <div className="stat-value">{s.value}</div>
              <div style={{ color: s.color, fontWeight: 600, fontSize: '0.8rem' }}>{s.icon} {s.trend}</div>
            </div>
          ))}
        </section>

        {/* --- CHART (NEURAL THROUGHPUT) --- */}
        <section className="glass chart-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ fontWeight: 800 }}>Neural Throughput</h3>
            <span style={{ color: 'var(--color-teal)', fontSize: '0.8rem', fontWeight: 600 }}>LIVE FEED</span>
          </div>

          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={stats?.chartData || []}>
              <defs>
                <linearGradient id="auraGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-teal)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-teal)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(5, 5, 5, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: 'var(--color-teal)' }}
              />
              <Area type="monotone" dataKey="load" stroke="var(--color-teal)" strokeWidth={3} fill="url(#auraGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </section>

        {/* --- SMART MONEY TABLE (LIVE) --- */}
        <section className="glass content-box">
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Smart Money Accumulation</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Asset</th>
                <th>Profit (24H)</th>
                <th>Win Rate</th>
                <th>Scan Load</th>
              </tr>
            </thead>
            <tbody>
              {tableLoading ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '50px', opacity: 0.3 }}>SYNCING WALLET FEED...</td></tr>
              ) : (
                smartMoney?.map((trader) => (
                  <tr key={trader.rank}>
                    <td style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>#{trader.rank.toString().padStart(2, '0')}</td>
                    <td style={{ fontWeight: 700, color: 'var(--color-teal)' }}>{trader.symbol}</td>
                    <td style={{ fontWeight: 600 }}>{trader.profit}</td>
                    <td style={{ color: 'var(--color-purple)' }}>{trader.winRate}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ width: `${trader.load}%`, height: '100%', background: 'var(--color-teal)' }}></div>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>{trader.load}%</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}