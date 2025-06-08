'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { getQueryClient } from '../lib'

export function TanstackQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(() => getQueryClient())

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
