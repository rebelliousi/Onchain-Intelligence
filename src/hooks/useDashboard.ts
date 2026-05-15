import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type DashboardStats = {
  volume: string;
  activeNodes: string;
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

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await axios.get('/api/market/stats');
      
      const chartPoints = [
        { time: '04:00', load: Math.floor(Math.random() * 20 + 30) },
        { time: '08:00', load: Math.floor(Math.random() * 20 + 50) },
        { time: '12:00', load: Math.floor(Math.random() * 20 + 40) },
        { time: '16:00', load: Math.floor(Math.random() * 20 + 70) },
        { time: '20:00', load: Math.floor(Math.random() * 20 + 60) },
        { time: 'Now',   load: Math.floor(Math.random() * 20 + 80) },
      ];

      return {
        volume: res.data.volume || "$2.4B",
        activeNodes: "48",
        latency: (Math.random() * (18 - 12) + 12).toFixed(1) + "ms",
        tps: (Math.floor(Math.random() * (2800 - 2200) + 2200)).toLocaleString(),
        chartData: chartPoints
      };
    },
    refetchInterval: 60000, 
    staleTime: 55000,
    refetchOnWindowFocus: false,
  });
}

export function useSmartMoney() {
  return useQuery<SmartMoneyToken[]>({
    queryKey: ['smart-money'],
    queryFn: async () => {
      const response = await axios.get('/api/market/smart-money');
      return response.data;
    },
    refetchInterval: 300000, 
    staleTime: 290000,
    refetchOnWindowFocus: false,
  });
}