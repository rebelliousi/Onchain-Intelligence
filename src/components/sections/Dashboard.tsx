"use client";

import React from 'react';

// --- Mock Data ---
const STATS = [
  { label: "Total Revenue", value: "$45,231.89", growth: "+20.1%", icon: "💰" },
  { label: "Active Users", value: "2,350", growth: "+15.2%", icon: "👥" },
  { label: "Sales", value: "+12,234", growth: "+19%", icon: "📈" },
  { label: "Active Now", value: "573", growth: "+201 since last hour", icon: "⚡" },
];

const TRANSACTIONS = [
  { id: 1, name: "Apple Store", date: "Oct 24, 2023", amount: "-$999.00", status: "Completed" },
  { id: 2, name: "Stripe Payout", date: "Oct 23, 2023", amount: "+$2,500.00", status: "Pending" },
  { id: 3, name: "Zapier Inc", date: "Oct 22, 2023", amount: "-$29.00", status: "Completed" },
];

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* --- CSS STYLES --- */}
      <style jsx global>{`
        :root {
          --bg: #f8fafc;
          --sidebar: #ffffff;
          --primary: #6366f1;
          --text-main: #1e293b;
          --text-muted: #64748b;
          --border: #e2e8f0;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --radius: 12px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; background: var(--bg); color: var(--text-main); }

        .dashboard-container {
          display: flex;
          min-height: 100vh;
        }

        /* Sidebar Styling */
        .sidebar {
          width: 260px;
          background: var(--sidebar);
          border-right: 1px solid var(--border);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
        }

        .logo { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 2.5rem; display: flex; align-items: center; gap: 8px; }
        
        .nav-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .nav-item { 
          padding: 0.75rem 1rem; 
          border-radius: var(--radius); 
          cursor: pointer; 
          color: var(--text-muted); 
          transition: 0.2s;
          font-weight: 500;
        }
        .nav-item:hover { background: #f1f5f9; color: var(--primary); }
        .nav-item.active { background: #eef2ff; color: var(--primary); }

        /* Main Content Styling */
        .main-content {
          flex: 1;
          padding: 2rem 3rem;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .user-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 6px 16px 6px 6px;
          border-radius: 50px;
          border: 1px solid var(--border);
        }
        .avatar { width: 32px; height: 32px; background: var(--primary); border-radius: 50%; color: white; display: grid; place-items: center; font-size: 0.8rem; font-weight: bold; }

        /* Grid Layout */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .card {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }

        .card-header { display: flex; justify-content: space-between; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem; }
        .card-value { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; }
        .card-trend { font-size: 0.85rem; color: #10b981; font-weight: 600; }

        /* Table Section */
        .section-white {
          background: white;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          padding: 1.5rem;
        }

        .section-title { margin-bottom: 1.5rem; font-size: 1.1rem; font-weight: 700; }

        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th { text-align: left; padding: 1rem; border-bottom: 1px solid var(--border); color: var(--text-muted); font-weight: 500; font-size: 0.9rem; }
        .data-table td { padding: 1rem; border-bottom: 1px solid var(--border); font-size: 0.95rem; }
        
        .status-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          background: #f1f5f9;
        }

        @media (max-width: 1024px) {
          .sidebar { width: 80px; padding: 2rem 0.5rem; align-items: center; }
          .nav-item span, .logo span { display: none; }
          .main-content { padding: 1.5rem; }
        }
      `}</style>

      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="logo">
          <span>🚀</span> <span>DashCore</span>
        </div>
        <ul className="nav-list">
          <li className="nav-item active">🏠 <span>Overview</span></li>
          <li className="nav-item">📊 <span>Analytics</span></li>
          <li className="nav-item">💳 <span>Payments</span></li>
          <li className="nav-item">⚙️ <span>Settings</span></li>
        </ul>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="main-content">
        <header className="header">
          <div>
            <h1>Dashboard</h1>
            <p style={{ color: 'var(--text-muted)' }}>Welcome back, Alex.</p>
          </div>
          <div className="user-pill">
            <div className="avatar">AD</div>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Alex Doe</span>
          </div>
        </header>

        {/* --- STATS GRID --- */}
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div key={i} className="card">
              <div className="card-header">
                <span>{stat.label}</span>
                <span>{stat.icon}</span>
              </div>
              <div className="card-value">{stat.value}</div>
              <div className="card-trend">{stat.growth}</div>
            </div>
          ))}
        </div>

        {/* --- TABLE SECTION --- */}
        <div className="section-white">
          <h2 className="section-title">Recent Transactions</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 500 }}>{t.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{t.date}</td>
                  <td style={{ fontWeight: 600 }}>{t.amount}</td>
                  <td><span className="status-badge">{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}