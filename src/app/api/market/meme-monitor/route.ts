import { NextResponse } from 'next/server';
import { fetchFromBirdeye } from '@/lib/birdeye';

export async function GET() {
  try {
    // Fetch the 15 newest tokens appearing on Solana
    const json = await fetchFromBirdeye('/defi/v2/tokens/new_listing', 'AI', '?limit=15');

    if (!json?.success) return NextResponse.json([]);

    const tokens = json.data.items.map((t: any) => ({
      symbol: t.symbol || '???',
      name: t.name || 'Unknown',
      address: t.address,
      liquidity: t.liquidity ? `$${(t.liquidity / 1000).toFixed(1)}k` : 'Very Low',
      age: 'New'
    }));

    return NextResponse.json(tokens);
  } catch {
    return NextResponse.json([]);
  }
}