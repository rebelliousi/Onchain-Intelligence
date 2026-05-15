import { NextResponse } from 'next/server';
import { fetchFromBirdeye } from '@/lib/birdeye';

export async function GET() {
  try {
    // Uses BENTO_2 key
    const json = await fetchFromBirdeye('/defi/market_v2', 'BENTO_2');

    if (!json || !json.success) {
      return NextResponse.json({ volume: "2.4B" }); // Fallback
    }

    // Convert big number like 2400000000 to "2.4B"
    const vol = json.data.volume24h;
    const formatted = vol >= 1_000_000_000 
      ? (vol / 1_000_000_000).toFixed(1) + "B"
      : (vol / 1_000_000).toFixed(1) + "M";

    return NextResponse.json({ volume: formatted });
  } catch (error) {
    return NextResponse.json({ volume: "2.4B" });
  }
}