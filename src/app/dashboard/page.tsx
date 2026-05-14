'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MoreVertical, TrendingUp, TrendingDown, Search, Bell } from 'lucide-react'
import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    // 1. En dış katman: Arka planı boyar
    <main className="min-h-screen bg-[#050608] text-white overflow-x-hidden">
      
      {/* 2. Konteyner Katmanı: İşte sihir burada! 
          mx-auto: Ortalar 
          max-w-[1400px]: Sayfanın çok fazla yayılmasını engeller
          px-8 md:px-16: Sağdan soldan "duvar" boşluğu bırakır
          py-12: Üstten ve alttan boşluk bırakır
      */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-12 lg:py-20 space-y-12">
        
        {/* Üst Başlık Alanı */}
        <header className="flex justify-between items-end">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight text-white">Market Overview</h1>
                <p className="text-white/30 text-xs uppercase tracking-[0.3em] font-bold">
                   Live Intelligence Terminal
                </p>
            </div>
            
            <div className="flex gap-4 mb-1">
                <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                    <Search size={20} className="text-white/20 group-hover:text-white" />
                </button>
                <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group relative">
                    <Bell size={20} className="text-white/20 group-hover:text-white" />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#050608]" />
                </button>
            </div>
        </header>

        {/* Kartlar Izgarası (Grid) 
            gap-8: Kartların birbirine değmesini engeller
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <CryptoCard 
                name="Bitcoin" 
                symbol="BTC/USDT" 
                price="109,687.6" 
                change="+ 1.09%" 
                color="#F7931A"
                isUp={true}
            />
            <CryptoCard 
                name="Ethereum" 
                symbol="ETH/USDT" 
                price="2,687.63" 
                change="- 2.01%" 
                color="#627EEA"
                isUp={false}
            />
            <CryptoCard 
                name="Solana" 
                symbol="SOL/USDT" 
                price="142.20" 
                change="+ 4.80%" 
                color="#14F195"
                isUp={true}
            />
        </div>
      </div>
    </main>
  )
}

function CryptoCard({ name, symbol, price, change, color, isUp }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }} 
      className="w-full group"
    >
      <Card className="bg-[#0D0E12]/80 backdrop-blur-xl border-white/[0.08] rounded-[40px] p-8 relative overflow-hidden shadow-2xl">
        
        {/* Arka plan ışığı */}
        <div 
          className="absolute -top-20 -right-20 w-40 h-40 blur-[100px] opacity-10 rounded-full group-hover:opacity-20 transition-opacity" 
          style={{ backgroundColor: color }}
        />

        <div className="flex justify-between items-start mb-12">
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-[22px] flex items-center justify-center border"
              style={{ 
                background: `linear-gradient(135deg, ${color}33 0%, ${color}05 100%)`, 
                borderColor: `${color}22` 
              }}
            >
               <div className="w-6 h-6 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]" style={{ backgroundColor: color }} />
            </div>
            <div>
              <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">{symbol}</p>
              <h3 className="text-lg font-bold text-white leading-none mt-1">{name}</h3>
            </div>
          </div>
          <MoreVertical size={20} className="text-white/20" />
        </div>

        <div className="space-y-4">
            <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">Price Value</p>
            <h2 className="text-4xl font-bold tracking-tighter text-white">${price} <span className="text-sm font-normal text-white/10 ml-1">USD</span></h2>
            
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl w-fit text-[11px] font-black ${isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {change}
            </div>
        </div>

        {/* Grafik Alanı */}
        <div className="relative h-24 w-full mt-8">
            <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id={`grad-${name}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isUp ? "#10b981" : "#f43f5e"} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={isUp ? "#10b981" : "#f43f5e"} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d="M0,80 Q 40,90 70,60 T 130,75 T 200,30 V 100 H 0 Z" fill={`url(#grad-${name})`} />
                <path d="M0,80 Q 40,90 70,60 T 130,75 T 200,30" fill="none" stroke={isUp ? "#10b981" : "#f43f5e"} strokeWidth="3" strokeLinecap="round" />
                <circle cx="200" cy="30" r="5" fill={isUp ? "#10b981" : "#f43f5e"} stroke="white" strokeWidth="2" />
            </svg>
        </div>
      </Card>
    </motion.div>
  )
}