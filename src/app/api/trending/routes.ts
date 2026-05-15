import { fetchFromBirdeye } from '@/lib/birdeye';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. We ask for the top 5 ranked tokens for the last 24h
    const params = '?sort_by=rank&interval=24h&sort_type=asc&limit=5';
    const json = await fetchFromBirdeye('/defi/token_trending', 'BENTO', params);
    
    // 2. We map the data using the field names you found in the documentation
    const formatted = json.data.tokens.map((token: any) => ({
      name: `$${token.symbol}`,
      price: token.price < 0.01 
        ? `$${token.price.toFixed(8)}` // For cheap meme coins
        : `$${token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
      change: `${token.price24hChangePercent.toFixed(1)}%`,
      up: token.price24hChangePercent > 0,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Trending' }, { status: 500 });
  }
}