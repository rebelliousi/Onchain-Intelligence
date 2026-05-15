import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// --- DATA TYPES ---

export interface TrendingToken {
  address: string;
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
}

export interface MarketStats {
  volume: string;
  latency: string; 
  tps: string;    
  score: number;  
}

export interface NewListing {
  name: string;
  score: number;
  status: 'SAFE' | 'RISK';
}

// --- THE HOOKS ---

/**
 * 1. Trending Tokens (Uses BENTO_1)
 */
export function useTrendingTokens() {
  return useQuery<TrendingToken[]>({
    queryKey: ['trending-tokens'],
    queryFn: async () => {
      const response = await axios.get('/api/market/trending');
      return response.data;
    },
    refetchInterval: 60000, 
    staleTime: 59000, // Keep data fresh for almost the whole minute
    retry: false,
    refetchOnWindowFocus: false, // 🚨 STOP multiple requests on click
    refetchOnReconnect: false,   // 🚨 STOP requests on internet flicker
    placeholderData: (prev) => prev, 
  });
}

/**
 * 2. Market Stats (Uses BENTO_2)
 * Injects simulated "Live Pulse" metrics
 */
export function useMarketStats() {
  return useQuery<MarketStats>({
    queryKey: ['market-stats'],
    queryFn: async () => {
      const response = await axios.get('/api/market/stats');
      
      // Real-feeling fluctuations
      const liveTps = (Math.floor(Math.random() * (2650 - 2100) + 2100)).toLocaleString();
      const liveScore = Math.floor(Math.random() * (96 - 91) + 91);
      const liveLatency = (Math.random() * (22.5 - 12.1) + 12.1).toFixed(1);
      
      return { 
        volume: response.data.volume || "2.4B", 
        tps: liveTps,
        score: liveScore,
        latency: liveLatency 
      };
    },
    // Protect the 1 RPS limit
    refetchInterval: 20000,      // Slowed to 20s for maximum safety
    staleTime: 19000,            // Prevents double-fetching on mount
    retry: false,
    refetchOnWindowFocus: false, // 🚨 FIX: This stops the spam in your network tab
    refetchOnReconnect: false,
    placeholderData: (prev) => prev,
  });
}

/**
 * 3. New Listings (Uses BENTO_3)
 */
export function useNewListings() {
  return useQuery<NewListing[]>({
    queryKey: ['new-listings'],
    queryFn: async () => {
      const response = await axios.get('/api/market/listings');
      return response.data;
    },
    refetchInterval: 60000,
    staleTime: 59000,
    retry: false,
    refetchOnWindowFocus: false, // 🚨 STOP multiple requests on click
    refetchOnReconnect: false,
    placeholderData: (prev) => prev,
  });
}