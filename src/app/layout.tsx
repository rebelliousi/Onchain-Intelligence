import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import CustomCursor from '@/components/ui/CustomCursor'
import { cn } from "@/lib/utils"
import ChatWidget from '@/components/ui/ChatWidget'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700'],
  variable: '--font-geist-sans',
})

export const metadata: Metadata = {
  title: 'AURA — The Alpha Standard',
  description: 'Onchain Intelligence. Visualizing the Pulse of the Blockchain.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body
        className={inter.variable}
        style={{ background: '#000000', margin: 0 }}
      >
        <Providers>

          {/* Custom glowing teal cursor */}
          <CustomCursor />

          {/* 
            Film grain overlay
            zIndex: 50 → sits above background but below navbar (9999) 
            and below chat widget (99998)
          */}
          <div
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              pointerEvents: 'none',
              opacity: 0.035,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '128px 128px',
            }}
          />

          {/* 
            Floating AI Chat Widget
            Shows on every page (landing + dashboard)
            zIndex: 99998 → above everything except cursor
          */}
          <ChatWidget />

          {children}

        </Providers>
      </body>
    </html>
  )
}