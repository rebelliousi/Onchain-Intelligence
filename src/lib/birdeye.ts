// src/lib/birdeye.ts

export async function fetchFromBirdeye(
  endpoint: string, 
  section: 'BENTO' | 'GUARDIAN' | 'PULSE' | 'DASHBOARD' | 'AI',
  queryParams: string = ''
) {
  // Use the specific key for this section
  const apiKey = process.env[`BIRDEYE_KEY_${section}`] || '';

  const response = await fetch(`https://public-api.birdeye.so${endpoint}${queryParams}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': apiKey,
      'x-chain': 'solana',
      'accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Birdeye Error (${section}):`, errorText);
    throw new Error('Birdeye request failed');
  }

  return response.json();
}