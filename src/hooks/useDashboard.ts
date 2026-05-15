import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// --- DATA TYPES ---

export type DashboardStats = {
  volume: string;
  topGainer: string; // Real mooning token info
  latency: string;
  tps: string;
  chartData: { time: string; load: number }[];
};

export type SmartMoneyToken = {
  rank: number;
  symbol: string;
  address: string;
  profit: string;
  winRate: string;
  status: string;
  load: number;
};

// --- THE HOOKS ---

/**
 * Hook: Dashboard High-Level Metrics
 * Fetches Volume (BENTO_2) and Top Gainer (GAINER) in parallel.
 */
export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // 1. Fetch from our dedicated API routes in parallel
      const [resStats, resGainer] = await Promise.all([
        axios.get('/api/market/stats'),
        axios.get('/api/market/top-gainer')
      ]);

      // 2. Generate smooth neural chart points
      const chartPoints = [
        { time: '04:00', load: Math.floor(Math.random() * 20 + 30) },
        { time: '08:00', load: Math.floor(Math.random() * 20 + 50) },
        { time: '12:00', load: Math.floor(Math.random() * 20 + 40) },
        { time: '16:00', load: Math.floor(Math.random() * 20 + 70) },
        { time: '20:00', load: Math.floor(Math.random() * 20 + 60) },
        { time: 'Now',   load: Math.floor(Math.random() * 20 + 80) },
      ];

      return {
        volume: resStats.data.volume || "$2.4B",
        // Combine Symbol and % change for the UI box
        topGainer: `${resGainer.data.symbol} (${resGainer.data.change})`,
        latency: resStats.data.latency || "14.2ms",
        tps: resStats.data.tps || "2,105",
        chartData: chartPoints
      };
    },
    // PROTECTION: Refresh every 60 seconds (Safe for your Monthly budget)
    refetchInterval: 60000, 
    staleTime: 55000,
    refetchOnWindowFocus: false, // 🚨 STOPS multiple requests when clicking
    placeholderData: (prev) => prev, // Smooth UI transitions
  });
}

/**
 * Hook: Smart Money Leaderboard (DASHBOARD Key)
 * Tracking profitable accumulation.
 */
export function useSmartMoney() {
  return useQuery<SmartMoneyToken[]>({
    queryKey: ['smart-money'],
    queryFn: async () => {
      const response = await axios.get('/api/market/smart-money');
      return response.data;
    },
    // Smart money moves slower - Refresh every 5 minutes to save credits
    refetchInterval: 300000, 
    staleTime: 290000,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: (prev) => prev,
  });
}