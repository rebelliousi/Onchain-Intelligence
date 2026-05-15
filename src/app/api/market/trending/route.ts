import { NextResponse } from 'next/server';
import { fetchFromBirdeye } from '@/lib/birdeye';

/**
 * API Route: Trending Tokens
 * Uses Dedicated Key: BENTO_1
 */
export async function GET() {
  try {
    // 1. Fetch from Birdeye using the BENTO_1 pool
    const params = '?sort_by=rank&interval=24h&sort_type=asc&limit=15';
    const json = await fetchFromBirdeye('/defi/token_trending', 'BENTO_1', params);

    // 2. Error Check: If Birdeye rejected or key is empty
    if (!json || json.success === false) {
      console.error("❌ Trending API: Birdeye returned success=false or null");
      return NextResponse.json({ error: 'Source data unavailable' }, { status: 503 });
    }

    // 3. Extract tokens list
    const rawTokens = json.data?.tokens || [];
    
    if (rawTokens.length === 0) {
      return NextResponse.json([]);
    }

    // 4. Normalize data for the BentoGrid UI
    const normalized = rawTokens.map((t: any) => {
      // Price formatting: show more decimals for very cheap tokens
      const formattedPrice = t.price < 0.0001 
        ? `$${t.price.toFixed(8)}` 
        : t.price < 1 
        ? `$${t.price.toFixed(4)}` 
        : `$${t.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      return {
        address: t.address,
        symbol: t.symbol || '???',
        name: t.name || 'Unknown Token',
        price: formattedPrice,
        change: `${t.price24hChangePercent?.toFixed(1) || '0.0'}%`,
        up: (t.price24hChangePercent || 0) > 0,
      };
    });

    return NextResponse.json(normalized);

  } catch (error: any) {
    console.error("🚨 Critical API Route Error (Trending):", error.message);
    // Return empty array instead of crashing the UI
    return NextResponse.json([], { status: 200 });
  }
}