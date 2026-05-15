import { NextRequest, NextResponse } from 'next/server';
import { fetchFromBirdeye } from '@/lib/birdeye';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    // 1. GET ALPHA CONTEXT (Live Risky Tokens)
    const json = await fetchFromBirdeye('/defi/v2/tokens/new_listing', 'AI', '?limit=10');
    const memeData = json?.data?.items?.map((t: any) => ({
      symbol: t.symbol || '???',
      liq: t.liquidity ? `$${(t.liquidity / 1000).toFixed(1)}k` : 'Low',
    })) || [];

    // 2. DEFINE SYSTEM PROMPT (The "Brain" logic)
    const SYSTEM_PROMPT = {
      role: 'system',
      content: `You are AURA AI, an elite Onchain Intelligence agent. 
      Persona: Technical, mysterious terminal, precise.
      
      CURRENT LIVE MEME MONITOR DATA (Newest Listings):
      ${JSON.stringify(memeData)}

      Instructions:
      - Use the data above to answer questions about new coins or risky plays.
      - Mention liquidity to warn users of risk.
      - If they ask for advice, say: "Scanning the block. This is not financial advice."
      - Keep responses short (1-2 sentences).`
    };

    // 3. CALL GROQ API
    const GROQ_KEY = process.env.GROQ_API_KEY;
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // llama-3.3-70b is extremely fast and smart
        model: 'llama-3.3-70b-versatile',
        messages: [
          SYSTEM_PROMPT, 
          ...messages.slice(-10) // Send the last 10 messages for context
        ],
        temperature: 0.5,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq Error:', errorText);
      return NextResponse.json({ error: 'Groq link failed' }, { status: 500 });
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || "Link stable. Monitoring block...";

    return NextResponse.json({ message: aiMessage });

  } catch (error: any) {
    console.error('Chat API Crash:', error.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}