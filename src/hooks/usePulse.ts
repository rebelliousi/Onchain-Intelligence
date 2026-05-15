import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface PulseToken {
  name: string;
  price: string;
  change: string;
  vol: string;    // 24h Volume (Whale activity)
  score: number;  // Safety index
  status: string;
}

export function useWhaleRadar() {
  return useQuery<PulseToken[]>({
    queryKey: ['whale-radar'],
    queryFn: async () => {
      const response = await axios.get('/api/market/pulse');
      return response.data;
    },
    // Budget Protection: Refresh every 60 seconds
    refetchInterval: 60000,
    staleTime: 55000,
    refetchOnWindowFocus: false,
    retry: false,
  });
}