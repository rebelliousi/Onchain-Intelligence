// src/hooks/useMarketData.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// This is the structure of the data we expect
interface TrendingToken {
  name: string;
  price: string;
  change: string;
  up: boolean;
}

export function useTrendingTokens() {
  return useQuery<TrendingToken[]>({
    queryKey: ['trending-tokens'],
    queryFn: async () => {
      // We call our internal "Middleman" API
      const response = await axios.get('/api/market/trending');
      return response.data;
    },
    // Settings:
    refetchInterval: 15000, // Refresh every 15 seconds
    staleTime: 10000,       // Consider data old after 10 seconds
  });
}