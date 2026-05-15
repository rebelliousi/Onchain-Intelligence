import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

const SYSTEM_PROMPT = `You are AURA AI, an intelligent crypto assistant powered by Groq and Birdeye data.

Your personality:
- Sharp, fast, and precise
- You speak like a crypto expert but keep things simple
- You are honest about risks — never hype tokens
- You use emojis sparingly but effectively

Your knowledge:
- You understand DeFi, tokens, rugpulls, liquidity, and market momentum
- You know about Birdeye's security scores (0-100)
- Score 90-100 = Very Safe ✅
- Score 70-89 = Moderate risk ⚠️  
- Score below 50 = High risk / possible rugpull 🚨
- You understand whale movements, volume spikes, and market signals

Rules:
- Keep answers short and clear (max 3-4 sentences)
- Always mention risk when discussing tokens
- If asked about a specific token address, say you can scan it via the Security tab
- Never give financial advice — say "this is not financial advice"
- End responses with a helpful follow-up suggestion when relevant`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-10), // keep last 10 messages for context
        ],
        max_tokens: 300,
        temperature: 0.7,
        stream: false,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Groq error:', error)
      return NextResponse.json({ error: 'Groq API error' }, { status: 500 })
    }

    const data = await response.json()
    const message = data.choices?.[0]?.message?.content || 'Sorry, I could not process that.'

    return NextResponse.json({ message })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}