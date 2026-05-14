'use client'

import { ReactNode, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children }: { children: ReactNode }) {
  // We create the QueryClient inside a useState to ensure it is only 
  // created once per browser session, preventing data bugs.
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <ReactLenis 
        root 
        options={{ 
          lerp: 0.1,        // Smoothing factor (0.1 is very smooth)
          duration: 1.5,     // Scroll duration
          smoothWheel: true, // Enable for mouse wheels
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        }}
      >
        {children}
      </ReactLenis>
    </QueryClientProvider>
  )
}