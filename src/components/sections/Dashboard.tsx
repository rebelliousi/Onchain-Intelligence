"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { 
  AreaChart, Area, Tooltip, ResponsiveContainer, XAxis 
} from 'recharts';
import { 
  LayoutDashboard, 
  Activity, 
  ShieldAlert, 
  Send, 
  Settings, 
  BarChart3, 
  Zap,
  Globe,
  Loader2
} from 'lucide-react';
import { useDashboardStats, useSmartMoney } from '@/hooks/useDashboard';

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBroadcasting, setIsAnalyzing] = useState(false);

  // 1. DATA HOOKS
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: smartMoney, isLoading: tableLoading } = useSmartMoney();

  // 2. TELEGRAM BROADCAST LOGIC
  const handleBroadcast = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/market/telegram-signal', { method: 'POST' });
      if (res.ok) {
        alert("ALPHA SIGNAL DISPATCHED TO TELEGRAM CHANNEL");
      }
    } catch (e) {
      console.error("Link Failure");
    } finally {
      setTimeout(() => setIsAnalyzing(false), 2000);
    }
  };

  // 3. MAP LIVE STATS
  const STATS_CARDS = [
    { label: "Solana 24H Volume", value: stats?.volume || "---", icon: <Globe size={16}/>, color: "#00FFD1" },
    { label: "Top Gainer (Alpha)", value: stats?.topGainer || "Scanning...", icon: <Zap size={16}/>, color: "#8B5CF6" },
    { label: "Neural Latency", value: stats?.latency || "---", icon: <Activity size={16}/>, color: "#FFB800" },
    { label: "Network Load", value: (stats?.tps || "---") + " TPS", icon: <ShieldAlert size={16}/>, color: "#fff" },
  ];

  // 4. ANIMATIONS
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sidebar", { x: -100, opacity: 0, duration: 1, ease: "power4.out" });
      gsap.from(".header-info", { y: -20, opacity: 0, duration: 0.8, delay: 0.2 });
      gsap.from(".stat-card", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, delay: 0.4 });
      gsap.from(".section-box", { y: 30, opacity: 0, duration: 0.8, delay: 0.6 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="aura-dashboard" ref={containerRef}>
      <style jsx global>{`
        :root {
          --aura-bg: #050505;
          --aura-panel: rgba(255,255,255,0.03);
          --aura-border: rgba(255,255,255,0.06);
          --aura-teal: #00FFD1;
          --aura-purple: #8B5CF6;
        }

        body { background: var(--aura-bg); color: #fff; margin: 0; overflow-x: hidden; }

        .aura-dashboard { display: flex; min-height: 100vh; }

        /* Sidebar */
        .sidebar {
          width: 260px;
          background: rgba(0,0,0,0.4);
          border-right: 1px solid var(--aura-border);
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          backdrop-filter: blur(10px);
        }

        .logo { font-size: 1.5rem; font-weight: 900; color: var(--aura-teal); letter-spacing: 0.3em; display: flex; align-items: center; gap: 12px; }
        .nav-item { 
          display: flex; align-items: center; gap: 12px; padding: 0.8rem 1rem; 
          border-radius: 12px; color: rgba(255,255,255,0.4); cursor: pointer; transition: 0.3s;
          font-size: 0.85rem; font-weight: 500;
        }
        .nav-item:hover, .nav-item.active { background: var(--aura-panel); color: var(--aura-teal); }

        /* Main Content */
        .main-content { flex: 1; padding: 3rem; position: relative; }

        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .header-info h1 { font-size: 2rem; font-weight: 800; letter-spacing: -1px; }

        /* Broadcast Button */
        .btn-broadcast {
          background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3);
          color: var(--aura-purple); padding: 12px 24px; border-radius: 100px;
          font-weight: 700; font-size: 0.7rem; letter-spacing: 0.2em; cursor: pointer;
          display: flex; align-items: center; gap: 10px; transition: 0.3s;
        }
        .btn-broadcast:hover { background: var(--aura-purple); color: #fff; box-shadow: 0 0 20px rgba(139,92,246,0.4); }

        /* Stats */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
        .stat-card { 
          background: var(--aura-panel); border: 1px solid var(--aura-border); padding: 1.5rem; 
          border-radius: 20px; transition: 0.3s;
        }
        .stat-card:hover { border-color: var(--aura-teal); transform: translateY(-5px); }
        .stat-label { font-size: 0.65rem; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px; display: block; }
        .stat-value { font-size: 1.4rem; font-weight: 700; font-family: 'Monospace', courier; }

        /* Sections */
        .section-box { 
          background: var(--aura-panel); border: 1px solid var(--aura-border); 
          border-radius: 24px; padding: 2rem; margin-bottom: 2rem;
        }

        .data-table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; }
        .data-table th { text-align: left; padding: 1rem; color: rgba(255,255,255,0.2); font-size: 0.7rem; text-transform: uppercase; border-bottom: 1px solid var(--aura-border); }
        .data-table td { padding: 1.2rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.02); font-size: 0.85rem; }

        @media (max-width: 1100px) { .stats-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>

      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="logo">
           <div style={{ width: '12px', height: '12px', background: 'var(--aura-teal)', borderRadius: '50%', boxShadow: '0 0 10px var(--aura-teal)' }} />
           <span>AURA</span>
        </div>
        <nav className="nav-list">
           <div className="nav-item active"><LayoutDashboard size={18}/> <span>Intelligence</span></div>
           <div className="nav-item"><BarChart3 size={18}/> <span>Market Flow</span></div>
           <div className="nav-item"><Send size={18}/> <span>Signals</span></div>
           <div className="nav-item"><Settings size={18}/> <span>Node Config</span></div>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="main-content">
        <header className="header">
          <div className="header-info">
            <h1>System Overview</h1>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>Protocol status: <span style={{ color: 'var(--aura-teal)' }}>Operational</span></p>
          </div>
          
          <button className="btn-broadcast" onClick={handleBroadcast} disabled={isBroadcasting}>
            {isBroadcasting ? <Loader2 size={14} className="animate-spin"/> : <Send size={14}/>}
            {isBroadcasting ? "DISPATCHING..." : "BROADCAST ALPHA"}
          </button>
        </header>

        {/* --- STATS GRID --- */}
        <div className="stats-grid">
          {STATS_CARDS.map((stat, i) => (
            <div key={i} className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="stat-label">{stat.label}</span>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* --- CHART SECTION --- */}
        <div className="section-box">
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 800 }}>Neural Throughput</h2>
              <span style={{ fontSize: '0.6rem', color: 'var(--aura-teal)', letterSpacing: '2px' }}>LIVE PULSE</span>
           </div>
           <div style={{ height: '300px', marginTop: '2rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.chartData || []}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--aura-teal)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--aura-teal)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{ background: '#000', border: '1px solid var(--aura-border)' }} />
                  <Area type="monotone" dataKey="load" stroke="var(--aura-teal)" strokeWidth={2} fill="url(#colorLoad)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* --- SMART MONEY TABLE --- */}
        <div className="section-box">
          <h2 style={{ fontSize: '1rem', fontWeight: 800 }}>Smart Money Accumulation</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Target Asset</th>
                <th>24H Net Profit</th>
                <th>Win Rate</th>
                <th>Cluster Load</th>
              </tr>
            </thead>
            <tbody>
              {tableLoading ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '40px', opacity: 0.2 }}>SYNCING NETWORK...</td></tr>
              ) : (
                smartMoney?.map((t, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700, color: 'var(--aura-teal)' }}>{t.symbol}</td>
                    <td style={{ fontWeight: 600 }}>{t.profit}</td>
                    <td style={{ color: 'var(--aura-purple)', fontWeight: 600 }}>{t.winRate}</td>
                    <td style={{ width: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                           <div style={{ width: `${t.load}%`, height: '100%', background: 'var(--aura-teal)' }} />
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>{t.load}%</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}