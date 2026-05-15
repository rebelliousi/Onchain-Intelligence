'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, TrendingUp, Zap, Radio, Activity, Globe, Wifi, Terminal, Clock } from 'lucide-react'

// Import our live hooks
import { 
  useTrendingTokens, 
  useNewListings, 
  useMarketStats 
} from '@/hooks/useMarketData'

gsap.registerPlugin(ScrollTrigger)

// --- Shared Glass Style ---
const glassStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '24px',
  padding: '24px',
  overflow: 'hidden',
  position: 'relative',
  height: '100%', 
  display: 'flex',
  flexDirection: 'column'
}

export default function BentoGrid() {
  const gridRef = useRef(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, margin: '-100px' })

  // 1. DATA FETCHING (Using real hooks)
  const { data: trending, isLoading: loadingTrending } = useTrendingTokens()
  const { data: listings } = useNewListings()
  const { data: stats } = useMarketStats()

  // Slicing larger amounts to fill the long vertical columns
  const trendingList = trending?.slice(0, 7) || []
  const listingsList = listings?.slice(0, 6) || []

  // 2. SIMULATED LIVE DATA (To fill HUD gaps)
  const [blockHeight, setBlockHeight] = useState(284910242)
  useEffect(() => {
    const interval = setInterval(() => setBlockHeight(prev => prev + Math.floor(Math.random() * 2)), 1500)
    return () => clearInterval(interval)
  }, [])

  // 3. GSAP ANIMATIONS
  useEffect(() => {
    if (!headlineRef.current) return
    gsap.fromTo(
      headlineRef.current.querySelectorAll('.gsap-word'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' } }
    )
  }, [])

  // SAFE SCORE COUNTER
  useEffect(() => {
    const el = document.getElementById('security-score')
    if (!el || !stats?.score) return
    const counterObj = { val: parseInt(el.textContent || "0") }
    gsap.to(counterObj, {
      val: stats.score,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => { if (el) el.textContent = Math.round(counterObj.val).toString() }
    })
  }, [stats?.score])

  return (
    <section style={{ background: '#050505', padding: '100px 5vw', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Mesh */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 50% 50% at 80% 20%, rgba(139,92,246,0.05) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,255,209,0.04) 0%, transparent 70%)` }} />

      {/* Header */}
      <div ref={headlineRef} style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span className="gsap-word" style={{ display: 'inline-block', fontSize: '0.65rem', letterSpacing: '0.5em', color: '#00FFD1', textTransform: 'uppercase', marginBottom: '16px' }}>THE LOGIC</span>
        <h2 className="gsap-word" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>Raw Data. <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>Pure Intelligence.</span></h2>
      </div>

      {/* --- GRID START --- */}
      <motion.div
        ref={gridRef}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gridTemplateRows: '400px 220px 240px', // Precise row sizing to eliminate gaps
          gap: '16px', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}
      >
        {/* COLUMN 1: TRENDING (Spans Row 1 & 2) */}
        <div style={{ gridColumn: '1', gridRow: '1 / 3' }}>
          <motion.div style={glassStyle}>
            <TrendGlow />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={14} color="#00FFD1" />
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#00FFD1', fontWeight: 600 }}>TRENDING NOW</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {trendingList.map((token, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{token.symbol}</div>
                    <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.2)' }}>{token.name?.slice(0, 15)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#fff', fontFamily: 'monospace' }}>{token.price}</div>
                    <div style={{ fontSize: '0.65rem', color: token.up ? '#00FFD1' : '#FF4D4D' }}>{token.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* COLUMN 2 - TOP: SECURITY SHIELD (Fills Space with Logs) */}
        <div style={{ gridColumn: '2', gridRow: '1' }}>
          <motion.div style={{ ...glassStyle, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
             <ShieldGlow />
             <Shield size={20} color="#00FFD1" style={{ marginBottom: '10px' }} />
             <div style={{ fontSize: '6rem', fontWeight: 900, color: '#00FFD1', lineHeight: 1 }} id="security-score">0</div>
             <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3em', marginTop: '5px' }}>AURA TRUST INDEX</div>
             
             {/* LIVE TERMINAL FILLER */}
             <div style={{ marginTop: '25px', width: '100%', padding: '15px', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,255,209,0.1)', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Terminal size={10} color="#00FFD1" />
                    <span style={{ fontSize: '0.5rem', color: '#00FFD1', fontFamily: 'monospace' }}>SENTINEL_ACTIVE</span>
                </div>
                <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', lineHeight: 1.5 }}>
                   {`> SYNCING_POOL_METRICS... DONE`} <br />
                   {`> LATENCY_THRESHOLD: ${stats?.latency}ms`} <br />
                   {`> SCANNING_MINT_AUTHORITY... OK`}
                </div>
             </div>
          </motion.div>
        </div>

        {/* COLUMN 2 - MIDDLE: NETWORK LOAD (Fills Middle Gap) */}
        <div style={{ gridColumn: '2', gridRow: '2' }}>
          <motion.div style={{ ...glassStyle, background: 'rgba(139,92,246,0.03)', borderColor: 'rgba(139,92,246,0.1)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Activity size={14} color="#8B5CF6" />
                      <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#8B5CF6' }}>NETWORK LOAD</span>
                   </div>
                   <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff' }}>{stats?.tps || "2,423"} <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>TPS</span></div>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.2)', marginBottom: '4px' }}>BLOCK HEIGHT</div>
                   <div style={{ fontSize: '0.8rem', color: '#8B5CF6', fontFamily: 'monospace' }}>{blockHeight.toLocaleString()}</div>
                </div>
             </div>
             <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginTop: 'auto', overflow: 'hidden' }}>
                <motion.div animate={{ width: stats?.tps ? `${(parseInt(stats.tps.replace(',','')) / 3000) * 100}%` : '40%' }} style={{ height: '100%', background: '#8B5CF6' }} />
             </div>
          </motion.div>
        </div>

        {/* COLUMN 3: NEW LISTINGS (Spans Row 1 & 2) */}
        <div style={{ gridColumn: '3', gridRow: '1 / 3' }}>
          <motion.div style={glassStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Radio size={14} color="#8B5CF6" />
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#8B5CF6' }}>NEW LISTINGS</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              {listingsList.map((token, i) => (
                <div key={i} style={{ padding: '12px 14px', borderRadius: '14px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>{token.name}</span>
                  <span style={{ fontSize: '0.5rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(0,255,209,0.05)', color: '#00FFD1', border: '1px solid rgba(0,255,209,0.2)' }}>SAFE</span>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '20px', padding: '15px', borderRadius: '16px', background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.1)', textAlign: 'center' }}>
               <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#8B5CF6' }}>{stats?.latency || '14.0'}<span style={{ fontSize: '0.7rem', opacity: 0.5, marginLeft: '4px' }}>ms</span></div>
               <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>DATA LATENCY</div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM ROW: VOLUME PULSE (Spans Col 1 & 2) */}
        <div style={{ gridColumn: '1 / 3', gridRow: '3' }}>
          <motion.div style={glassStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={14} color="#FFB800" />
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#FFB800' }}>GLOBAL VOLUME PULSE</span>
               </div>
               <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFB800' }}>${stats?.volume || "2.4B"}</span>
            </div>
            <VolumeBars inView={inView} />
          </motion.div>
        </div>

        {/* BOTTOM ROW: SYSTEM STATUS (Spans Col 3) */}
        <div style={{ gridColumn: '3', gridRow: '3' }}>
           <motion.div style={{ ...glassStyle, background: 'rgba(0,255,209,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                 <Wifi size={12} color="#00FFD1" />
                 <div style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)' }}>SYSTEM STATUS</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: 1 }}>
                 {[
                   { label: 'API POOL', val: 'Online (8)' },
                   { label: 'RPC NODE', val: 'Optimal' },
                   { label: 'ENGINE', val: 'Active' },
                   { label: 'UPTIME', val: '99.9%' }
                 ].map(item => (
                    <div key={item.label} style={{ padding: '10px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.03)' }}>
                       <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.2)', marginBottom: '4px' }}>{item.label}</div>
                       <div style={{ fontSize: '0.7rem', color: '#00FFD1', fontWeight: 600 }}>{item.val}</div>
                    </div>
                 ))}
              </div>
           </motion.div>
        </div>

      </motion.div>
    </section>
  )
}

function VolumeBars({ inView }: { inView: boolean }) {
  const bars = [40, 65, 35, 80, 55, 90, 70, 45, 85, 60, 75, 95, 40, 60, 80, 50, 70, 90]
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '100px' }}>
      {bars.map((h, i) => (
        <motion.div 
          key={i} 
          animate={{ height: inView ? [`${h}%`, `${h+10}%`, `${h}%`] : '10%' }} 
          transition={{ repeat: Infinity, duration: 2 + Math.random(), delay: i * 0.05 }}
          style={{ flex: 1, borderRadius: '3px', background: `rgba(255,184,0,${0.2 + (h / 100) * 0.6})` }} 
        />
      ))}
    </div>
  )
}

function TrendGlow() {
  return <div style={{ position: 'absolute', top: -50, left: -50, width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,209,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
}

function ShieldGlow() {
  return <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,209,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
}