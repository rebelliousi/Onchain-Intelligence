import { NextResponse } from 'next/server';
import { fetchFromBirdeye } from '@/lib/birdeye';

export async function GET() {
  try {
    // 1. Ask for 20 trending tokens (This is a very stable request)
    const params = '?sort_by=rank&sort_type=asc&offset=0&limit=20';
    const json = await fetchFromBirdeye('/defi/token_trending', 'GAINER', params);

    // DEBUG: See what Birdeye is actually sending
    if (!json?.success || !json.data?.tokens) {
      console.error("🚨 Top Gainer API: No tokens returned from Birdeye");
      return NextResponse.json({ symbol: "OFFLINE", change: "0%" });
    }

    const tokens = json.data.tokens;

    // 2. Logic: Find the token in this list with the highest price change
    // We use a simple sort to find the winner
    const topMooner = [...tokens].sort((a, b) => 
      (b.price24hChangePercent || 0) - (a.price24hChangePercent || 0)
    )[0];

    if (!topMooner) {
       return NextResponse.json({ symbol: "WAITING", change: "0%" });
    }

    return NextResponse.json({
      symbol: topMooner.symbol || '???',
      change: `+${(topMooner.price24hChangePercent || 0).toFixed(1)}%`,
    });

  } catch (error: any) {
    console.error("🚨 Top Gainer Route Crash:", error.message);
    return NextResponse.json({ symbol: "RETRY", change: "0%" });
  }
}