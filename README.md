# AURA — The Alpha Standard

> Onchain Intelligence. Visualizing the Pulse of the Blockchain.

![AURA Banner](public/banner.png)

---

## What is AURA?

AURA is a real-time onchain intelligence platform built for the Solana ecosystem. It combines beautiful 3D visuals, AI-powered analytics, and live Birdeye market data to help traders find safe, high-momentum tokens before everyone else.

Built for the **Birdeye Sprint Competition**.

---

## Live Demo

🌐 [aura-app.vercel.app](https://aura-app.vercel.app)
🤖 Telegram Bot: [@alphaEyeAlertBot](https://t.me/alphaEyeAlertBot)

---

## Features

### 🏠 Landing Page
- **Hero Section** — 3D animated coin (Spline) with cinematic GSAP entrance
- **Bento Grid** — Live trending tokens, security scores, volume pulse, new listings
- **Guardian Section** — AI Sentinel robot scanner with live token scanning
- **Pulse Section** — 3D coverflow carousel of top safe tokens
- **Smooth Scroll** — Lenis-powered silk-smooth scrolling
- **Custom Cursor** — Glowing teal cursor with mouse delay
- **Film Grain** — Cinematic texture overlay

### 📊 Dashboard
- **Real-time Stats** — SOL 24H volume, top gainers, network TPS, latency
- **Smart Money Table** — Whale accumulation tracking with win rates
- **Live Charts** — Neural throughput visualization (Recharts)
- **Telegram Broadcast** — One-click alpha signal broadcasting

### 🤖 AI Chat Widget
- Floating chatbot powered by **Groq (LLaMA3)**
- Context-aware — understands DeFi, tokens, rugpulls
- Quick suggestion buttons
- Real-time typing indicators
- Persistent conversation history

### 🛡️ Security Scanner
- Paste any token address → get instant security audit
- Powered by Birdeye `/defi/token_security`
- Safety Score 0–100 with color indicators
- Rugpull risk detection

### 📱 Telegram Alerts
- Real-time alerts when safe high-score tokens are detected
- 3 alert types: Safety Alert, Whale Alert, Rug Warning
- Powered by Birdeye `/v2/tokens/new_listing` + `/token_security`

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16.2.6 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| 3D Engine | Spline |
| Animations | GSAP 3.15 + ScrollTrigger |
| UI Animations | Framer Motion 12 |
| Smooth Scroll | Lenis |
| Data Fetching | TanStack React Query 5 |
| HTTP Client | Axios |
| Charts | Recharts 3.8 |
| AI | Groq (LLaMA3-8b) |
| Market Data | Birdeye API |
| Icons | Lucide React |
| Components | Radix UI + shadcn/ui |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/              # Groq AI chatbot endpoint
│   │   ├── analysis/          # AI analysis endpoints
│   │   └── market/
│   │       ├── trending/      # Trending tokens
│   │       ├── listings/      # New token listings
│   │       ├── stats/         # Market statistics
│   │       ├── smart-money/   # Whale tracking
│   │       ├── top-gainer/    # Top performing tokens
│   │       ├── guardian-feed/ # Robot scanner data
│   │       ├── pulse/         # Carousel data
│   │       ├── meme-monitor/  # Meme coin tracking
│   │       └── telegram-signal/ # Broadcasting
│   ├── dashboard/             # Dashboard page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── components/
│   ├── Navbar.tsx
│   ├── providers.tsx
│   ├── sections/
│   │   ├── Hero.tsx           # 3D coin hero
│   │   ├── BentoGrid.tsx      # Live market grid
│   │   ├── Guardian.tsx       # AI robot scanner
│   │   ├── Pulse.tsx          # Token carousel
│   │   ├── Dashboard.tsx      # Dashboard view
│   │   └── Footer.tsx
│   └── ui/
│       ├── ChatWidget.tsx     # Floating AI chat
│       └── CustomCursor.tsx   # Glowing cursor
├── hooks/
│   ├── useParallax.ts         # Scroll parallax
│   ├── useDashboard.ts        # Dashboard data
│   ├── useGuardian.ts         # Scanner data
│   ├── useMarketData.ts       # Market data
│   └── usePulse.ts            # Carousel data
└── lib/
    ├── birdeye.ts             # API + rate limit manager
    └── utils.ts               # Utilities
```

---

## Birdeye API Usage

| Feature | Endpoint |
|---|---|
| Trending tokens | `/defi/token_trending` |
| New listings | `/v2/tokens/new_listing` |
| Security scan | `/defi/token_security` |
| Token price | `/defi/price` |
| Market stats | `/defi/v3/search` |

### Rate Limit Strategy
Each section uses a **dedicated API key** to bypass Birdeye's 1 RPS limit:

```env
BIRDEYE_KEY_BENTO_1=...
BIRDEYE_KEY_BENTO_2=...
BIRDEYE_KEY_GUARDIAN=...
BIRDEYE_KEY_PULSE=...
```

Smart caching with **60 second revalidation** protects API budget.

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/aura.git
cd aura
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
# Birdeye API Keys (one per section for rate limit bypass)
BIRDEYE_API_KEY=your_main_key
BIRDEYE_KEY_BENTO_1=your_key
BIRDEYE_KEY_BENTO_2=your_key
BIRDEYE_KEY_GUARDIAN=your_key
BIRDEYE_KEY_PULSE=your_key

# Groq AI
GROQ_API_KEY=your_groq_key

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `BIRDEYE_API_KEY` | ✅ | Main Birdeye API key |
| `BIRDEYE_KEY_BENTO_1` | ✅ | Bento grid key 1 |
| `BIRDEYE_KEY_BENTO_2` | ✅ | Bento grid key 2 |
| `BIRDEYE_KEY_GUARDIAN` | ✅ | Guardian scanner key |
| `BIRDEYE_KEY_PULSE` | ✅ | Pulse carousel key |
| `GROQ_API_KEY` | ✅ | Groq AI chat key |
| `TELEGRAM_BOT_TOKEN` | ✅ | Telegram bot token |
| `TELEGRAM_CHAT_ID` | ✅ | Telegram channel ID |

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## Color Palette

| Name | Hex | Used For |
|---|---|---|
| Obsidian | `#050505` | Main background |
| Teal | `#00FFD1` | Primary accent, safe tokens, buttons |
| Purple | `#8B5CF6` | AI Sentinel, highlights |
| Amber | `#FFB800` | Warnings, risk alerts |
| White | `#FFFFFF` | Headlines |
| Gray | `#A0A0A0` | Sub text |

---

## Animation Architecture

```
GSAP ScrollTrigger  → Scroll-based parallax + section reveals
GSAP Timeline       → Hero cinematic entrance sequence
Framer Motion       → UI micro-interactions, chat widget
Lenis               → Silk-smooth scroll feel
Spline              → 3D coin + robot scenes
```

---

## Sprints

| Sprint | What Was Built |
|---|---|
| Sprint 1 | Groq AI integration + market analysis |
| Sprint 2 | Telegram bot + real-time alerts |
| Sprint 3/4 | AURA full platform (this repo) |

---

## License

MIT © 2025 AURA

---

<div align="center">
  <strong>Built with ⚡ for the Birdeye Sprint Competition</strong>
  <br />
  <sub>Powered by Birdeye · Groq · Next.js · Spline</sub>
</div>