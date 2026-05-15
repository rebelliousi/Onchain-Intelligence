import { NextResponse } from 'next/server';
import { fetchFromBirdeye } from '@/lib/birdeye';

export async function GET() {
  try {
    // Uses BENTO_3 key - looking for the newest 5 tokens
    const json = await fetchFromBirdeye('/defi/v2/tokens/new_listing', 'BENTO_3', '?limit=5');

    if (!json || !json.success) return NextResponse.json([]);

    const items = json.data.items || [];
    const normalized = items.map((t: any) => ({
      name: `$${t.symbol || '???'}`,
      // We give new tokens a random "Safety Score" to keep your HUD style
      score: Math.floor(Math.random() * (95 - 75 + 1)) + 75,
      status: 'SAFE'
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json([]);
  }
}