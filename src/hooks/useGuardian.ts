import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// --- DATA TYPES ---

export interface GuardianToken {
  address: string;
  name: string;      // The token symbol
  score: number;     // Simulated security score for the UI
  status: 'SAFE' | 'RISK';
  liquidity: string; // Formatted liquidity string
}

/**
 * Hook to power the AI Sentinel (Robot) scanner.
 * Fetches the newest 10 tokens to be scanned one by one.
 */
export function useGuardianFeed() {
  return useQuery<GuardianToken[]>({
    queryKey: ['guardian-feed'],
    queryFn: async () => {
      // Calls your internal proxy: /api/market/guardian-feed
      const response = await axios.get('/api/market/guardian-feed');
      return response.data;
    },

    // --- BUDGET PROTECTION SETTINGS ---

    /** 
     * Refresh every 2 minutes (120,000ms).
     * New listings don't appear every second, so we save 
     * your Birdeye credits by fetching slowly.
     */
    refetchInterval: 120000, 
    
    // Consider data fresh for 110 seconds
    staleTime: 110000,

    // STOP multiple requests when you click the browser window
    refetchOnWindowFocus: false,
    
    // STOP requests when internet flickers
    refetchOnReconnect: false,

    // Do not spam the server if the 1 RPS limit is hit
    retry: false,

    // Keep the robot "busy" with old tokens while new ones download
    placeholderData: (previousData) => previousData,
  });
}