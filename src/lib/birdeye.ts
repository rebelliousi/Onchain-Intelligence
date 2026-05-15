/**
 * AURA Birdeye Utility - Dedicated Section Strategy
 * Every section gets its own API key to bypass the 1 RPS limit.
 */

// Define the available sections for better coding safety
type BirdeyeSection = 
  | 'BENTO_1'   // Used for Trending List
  | 'BENTO_2'   // Used for Market Stats
  | 'BENTO_3'   // Used for New Listings
  | 'GUARDIAN'  // Used for Robot Scanner
  | 'PULSE'     // Used for 3D Carousel
  | 'DASHBOARD' // Used for Pro Table
  | 'AI';       // Used for Chatbot

export async function fetchFromBirdeye(
  endpoint: string, 
  section: BirdeyeSection, 
  params: string = ''
) {
  // 1. SELECT THE DEDICATED KEY
  // This automatically checks for BIRDEYE_KEY_BENTO_1, BIRDEYE_KEY_BENTO_2, etc.
  const apiKey = (
    process.env[`BIRDEYE_KEY_${section}`] || 
    process.env.BIRDEYE_API_KEY || 
    ''
  ).trim();

  // Safety check to ensure we don't send an empty key
  if (!apiKey) {
    console.error(`❌ NO API KEY CONFIGURED FOR: ${section}`);
    return null;
  }

  const url = `https://public-api.birdeye.so${endpoint}${params}`;

  try {
    // 2. NATIVE FETCH WITH SMART CACHING
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey,
        'x-chain': 'solana',
        'accept': 'application/json'
      },
      /**
       * BUDGET PROTECTION: 
       * revalidate: 60 means Next.js saves the data for 1 minute.
       * Even if 1,000 people visit, you only use 1 request from your 30k monthly budget.
       */
      next: { revalidate: 60 } 
    });

    // Check if Birdeye rejected the request (e.g., out of credits or 1 RPS hit)
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`🚨 Birdeye ${section} Error:`, response.status, errorText);
      return null;
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error(`🚨 Network Failure in ${section}:`, (error as Error).message);
    return null;
  }
}