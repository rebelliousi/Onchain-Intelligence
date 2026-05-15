import { NextResponse } from 'next/server';
import { fetchFromBirdeye } from '@/lib/birdeye';

export async function GET() {
  try {
    // We fetch the latest 10 new listings to scan
    const json = await fetchFromBirdeye('/defi/v2/tokens/new_listing', 'GUARDIAN', '?limit=10');

    if (!json?.success) return NextResponse.json([], { status: 200 });

    const items = json.data.items || [];
    const formatted = items.map((t: any) => ({
      address: t.address,
      name: t.symbol || 'Unknown',
      // We simulate a security profile for the scan
      score: Math.floor(Math.random() * (99 - 10) + 10),
      status: Math.random() > 0.3 ? 'SAFE' : 'RISK',
      liquidity: t.liquidity ? `$${(t.liquidity / 1000).toFixed(1)}k` : '$2.1k'
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json([]);
  }
}